module.exports = {
  async redirects() {
    return [
      {
        source: "/:path*", // キャッチオールパターンで全てのパスをリダイレクト
        destination: "https://f-brains.tokyo", // リダイレクト先
        permanent: true, // 永久的なリダイレクト（301）
      },
    ];
  },
};
