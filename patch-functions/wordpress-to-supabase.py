# %%
import os
from datetime import datetime

import requests
from supabase import Client, create_client

# --- 設定 (環境変数や直接入力で設定してください) ---
WP_API_URL = "https://www.f-brains.tokyo/wp/wp-json/wp/v2/posts?per_page=100"

# Supabase設定
SUPABASE_URL = "https://rghhugoavvwbkulrbcpr.supabase.co"
# ※注意: 書き込みを行うため、anon_keyではなく「service_role_key」を使ってください。
# (Project Settings > API > service_role で確認可能)
SUPABASE_KEY = "sb_secret_QgIozFuRaVF5kBGrc2QVOA_LIwwFyBR"

# Supabaseクライアントの初期化
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def migrate():
    print("⚔️  作戦開始: WordPressデータの抽出...")

    try:
        # 1. WordPressから記事取得
        response = requests.get(WP_API_URL)
        response.raise_for_status()
        wp_posts = response.json()

        print(f"📦 {len(wp_posts)} 件の記事を発見しました。")

        # 2. データを整形してSupabaseへ流し込む
        for post in wp_posts:
            # 日付の整形 (必要であれば ISO 8601形式に変換など)
            # WordPressの日付形式 "YYYY-MM-DDTHH:MM:SS" はPostgreSQLでそのまま扱える場合が多いです

            payload = {
                "wp_id": post["id"],
                "title": post["title"]["rendered"],
                "content": post["content"]["rendered"],  # HTMLのまま保存
                "slug": post["slug"],
                "created_at": post["date"],
                "status": "published",
            }

            # 3. Upsert（あれば更新、なければ挿入）実行
            # on_conflict引数で重複時のキーを指定します
            # 注意: Supabase側で wp_id カラムに UNIQUE 制約が必須です
            data, count = (
                supabase.table("posts").upsert(payload, on_conflict="wp_id").execute()
            )

            print(f"✅ 移行完了: {post['title']['rendered']}")

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
