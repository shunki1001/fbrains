# %%
import os
from datetime import datetime

import requests
from supabase import Client, create_client

# --- 設定 (環境変数や直接入力で設定してください) ---
WP_BASE_URL = "https://www.f-brains.tokyo/wp/wp-json/wp/v2"
CUSTOM_POST_TYPES = ["works"]  # 移行したいカスタム投稿タイプをここに追加

# Supabase設定
SUPABASE_URL = "https://rghhugoavvwbkulrbcpr.supabase.co"
# ※注意: 書き込みを行うため、anon_keyではなく「service_role_key」を使ってください。
# (Project Settings > API > service_role で確認可能)
SUPABASE_KEY = "sb_secret_QgIozFuRaVF5kBGrc2QVOA_LIwwFyBR"

# Supabaseクライアントの初期化
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def fetch_wp_data(endpoint_type):
    """WordPressから全データを取得する（ページネーション・アイキャッチ埋め込み対応）"""
    items = []
    page = 1
    while True:
        # _embedパラメータを追加して関連データ（アイキャッチなど）をレスポンスに含める
        url = f"{WP_BASE_URL}/{endpoint_type}?per_page=100&page={page}&_embed"
        print(f"📡 {endpoint_type} の {page} ページ目を取得中...")

        try:
            response = requests.get(url)
            if response.status_code == 400:  # ページ超過などで終了
                break
            response.raise_for_status()
            data = response.json()

            if not data:
                break

            items.extend(data)
            page += 1
        except Exception as e:
            print(f"⚠️ 取得終了またはエラー: {e}")
            break

    return items


def migrate():
    """WordPressから各種投稿データを取得し、Supabaseに移行するメイン関数"""
    print("⚔️  作戦開始: WordPressデータの抽出...")

    try:
        # 1. 投稿、固定ページ、カスタム投稿タイプを全て取得
        all_items = []
        # posts, pages は複数形なのでそのままリストに
        post_types_to_fetch = ["posts", "pages"] + CUSTOM_POST_TYPES

        total_counts = {}

        for post_type_endpoint in post_types_to_fetch:
            print(f"--- '{post_type_endpoint}' の取得を開始 ---")
            items = fetch_wp_data(post_type_endpoint)
            total_counts[post_type_endpoint] = len(items)

            # データを整形して追加
            for item in items:
                # APIエンドポイント名（例: 'posts'）から実際のタイプ名（例: 'post'）を決定
                # 'pages' -> 'page', 'works' -> 'work'
                type_slug = (
                    post_type_endpoint[:-1]
                    if post_type_endpoint.endswith("s")
                    else post_type_endpoint
                )
                item["custom_type"] = type_slug
                all_items.append(item)

        count_str = ", ".join(
            [f"{k}: {v}" for k, v in total_counts.items() if v > 0]
        )
        print(f"\n📦 合計 {len(all_items)} 件（{count_str}）を発見しました。")

        if not all_items:
            print("移行対象のデータが見つかりませんでした。処理を終了します。")
            return

        # 2. Supabaseへ流し込む
        print("\n🚀 Supabaseへのデータ移行を開始します...")
        for item in all_items:
            # アイキャッチ画像のURLを取得
            thumbnail_url = None
            if "_embedded" in item and "wp:featuredmedia" in item["_embedded"]:
                media_list = item["_embedded"]["wp:featuredmedia"]
                if media_list and isinstance(media_list, list) and "source_url" in media_list[0]:
                    thumbnail_url = media_list[0]["source_url"]

            payload = {
                "wp_id": item["id"],
                "title": item["title"]["rendered"],
                "content": item["content"]["rendered"],
                "slug": item["slug"],
                "created_at": item["date"],
                "post_type": item["custom_type"],
                "status": "published",
                "post_thumbnail": thumbnail_url,  # アイキャッチ画像のURLを追加
            }

            # 3. Upsert実行
            data, count = (
                supabase.table("posts").upsert(payload, on_conflict="wp_id").execute()
            )

            print(f"✅ 移行完了 [{item['custom_type']}]: {item['title']['rendered']}")

        print("\n🎉 作戦終了: 全軍移行完了しました。")

    except Exception as e:
        print(f"\n❌ 致命的なエラーが発生しました: {e}")

        # エラーコード 42P10 (ON CONFLICT時の制約不足) への対処ヒント
        if "42P10" in str(e) or "no unique or exclusion constraint" in str(e):
            print(
                '\n[ヒント] Supabaseのテーブル定義で "wp_id" に UNIQUE(一意)制約が設定されていないようです。'
            )
            print("SQL Editorで以下のコマンドを実行して制約を追加してください:")
            print("alter table posts add constraint posts_wp_id_key unique (wp_id);")


if __name__ == "__main__":
    migrate()
