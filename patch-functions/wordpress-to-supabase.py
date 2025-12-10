# %%
import os
from datetime import datetime

import requests
from supabase import Client, create_client

# --- 設定 (環境変数や直接入力で設定してください) ---
WP_BASE_URL = "https://www.f-brains.tokyo/wp/wp-json/wp/v2"

# Supabase設定
SUPABASE_URL = "https://rghhugoavvwbkulrbcpr.supabase.co"
# ※注意: 書き込みを行うため、anon_keyではなく「service_role_key」を使ってください。
# (Project Settings > API > service_role で確認可能)
SUPABASE_KEY = "sb_secret_QgIozFuRaVF5kBGrc2QVOA_LIwwFyBR"

# Supabaseクライアントの初期化
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def fetch_wp_data(endpoint_type):
    """WordPressから全データを取得する（ページネーション対応）"""
    items = []
    page = 1
    while True:
        url = f"{WP_BASE_URL}/{endpoint_type}?per_page=100&page={page}"
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
    print("⚔️  作戦開始: WordPressデータの抽出...")

    try:
        # 1. 投稿と固定ページの両方を取得
        posts = fetch_wp_data("posts")
        pages = fetch_wp_data("pages")

        all_items = []

        # 投稿データの整形
        for p in posts:
            p["custom_type"] = "post"
            all_items.append(p)

        # 固定ページデータの整形
        for p in pages:
            p["custom_type"] = "page"
            all_items.append(p)

        print(
            f"📦 合計 {len(all_items)} 件（投稿: {len(posts)}, 固定ページ: {len(pages)}）を発見しました。"
        )

        # 2. Supabaseへ流し込む
        for item in all_items:
            payload = {
                "wp_id": item["id"],
                "title": item["title"]["rendered"],
                "content": item["content"]["rendered"],
                "slug": item["slug"],
                "created_at": item["date"],
                "post_type": item["custom_type"],  # 'post' or 'page'
                "status": "published",
            }

            # 3. Upsert実行
            data, count = (
                supabase.table("posts").upsert(payload, on_conflict="wp_id").execute()
            )

            print(f"✅ 移行完了 [{item['custom_type']}]: {item['title']['rendered']}")

        print("🎉 作戦終了: 全軍移行完了しました。")

    except Exception as e:
        print(f"致命的なエラー: {e}")

        # エラーコード 42P10 (ON CONFLICT時の制約不足) への対処ヒント
        if "42P10" in str(e) or "no unique or exclusion constraint" in str(e):
            print(
                '\n[ヒント] Supabaseのテーブル定義で "wp_id" に UNIQUE(一意)制約が設定されていないようです。'
            )
            print("SQL Editorで以下のコマンドを実行して制約を追加してください:")
            print("alter table posts add constraint posts_wp_id_key unique (wp_id);")


if __name__ == "__main__":
    migrate()
