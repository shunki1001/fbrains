interface Advertisement {
  label: string;
  content: string;
}
interface Video {
  label: string;
  year: string;
}

interface HomePage {
  text: string;
  href: string;
}

export const advertisementList: Advertisement[] = [
  { label: "書籍出版社", content: "読売新聞、日経新聞　書籍広告" },
  {
    label: "ホテル事業会社",
    content:
      "新規オープンリゾートホテル　コミュニケーションプランニング　ＴＶＣＭ制作コンサルティング　テレビスポットバイイング　テレビ番組ＰＲ",
  },
  { label: "自転車メーカー", content: "新聞広告　メディアバイイング" },
  {
    label: "大手製薬会社",
    content: "セミナーの企画、全国紙での広告展開、雑誌広告",
  },
  { label: "観光局", content: "新聞広告、メディアバイイング、Youtube番組制作" },
  {
    label: "食品メーカー",
    content: "Web動画配信、コンテンツ制作、BS局番組制作",
  },
  {
    label: "健康食品メーカー",
    content: "テレビスポットバイイング、イベント協賛",
  },
];

export const movieList: string[] = [
  "津軽百年食堂",
  "スープ",
  "さよならドビュッシー",
  "罪の余白",
  "レディ in ホワイト",
];

export const videoList: Video[] = [
  { label: "日本酒姉妹", year: "2022年〜" },
  { label: "韓国好き芸能人大集合", year: "2022年" },
  { label: "ハンコサミット", year: "2021年" },
];

export const homepageList: HomePage[] = [
  { text: "大宝寿の店 様", href: "https://taihoukotobuki.vercel.app/" },
  { text: "名古屋大学サッカー部 様", href: "https://nagoyaunivfc.jp/" },
  { text: "日本酒姉妹と飲み倒す", href: "https://nihonshu-f58f5.web.app/" },
  {
    text: "フリーランスたじむら 様",
    href: "https://micro-cms-portfolio.vercel.app/web",
  },
];

export const OtherList: string[] = [
  "記者発表 企画製作",
  "不動産コンサルティング",
  "著作権管理",
  "実業団スポーツチームＰＲ",
  "タレントマネジメント",
];
