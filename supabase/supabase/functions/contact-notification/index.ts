import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    // DB Webhookからのリクエストデータを取得
    const payload = await req.json();

    // ログ出し（デバッグ用：SupabaseのFunction Logsで確認できます）
    console.log("Webhook received:", payload);

    // DBトリガーの場合、実際のデータは payload.record に入っています
    // ※ 直接呼び出しと互換性を持たせるため、recordがない場合は直のpayloadを使います
    const record = payload.record || payload;

    const { email, message, name } = record;

    // Slack Webhook URL を環境変数から取得
    const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");

    if (!slackWebhookUrl) {
      throw new Error("SLACK_WEBHOOK_URL is not set");
    }

    // Slackへの通知メッセージ構築
    const slackMessage = {
      text: "📩 新しい軍議（お問い合わせ）の申し込みがありました",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📩 新しい軍議（お問い合わせ）: DB保存完了",
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*お名前:*\n${name || "名無し"}`,
            },
            {
              type: "mrkdwn",
              text: `*連絡先:*\n${email || "不明"}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*用件:*\n${message}`,
          },
        },
      ],
    };

    // SlackへPOST送信
    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      throw new Error(`Slack API Error: ${response.statusText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
