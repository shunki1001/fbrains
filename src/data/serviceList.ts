interface Advertisement {
    label: String,
    content:String
}
interface Video {
    label: String,
    year:String,
}

export const advertisementList: Advertisement[] = [
    { label: "書籍出版社", content: "読売新聞、日経新聞　書籍広告" },
    { label: "ホテル事業会社", content: "新規オープンリゾートホテル　コミュニケーションプランニング　ＴＶＣＭ制作コンサルティング　テレビスポットバイイング　テレビ番組ＰＲ" },
    { label: "自転車メーカー", content: "新聞広告　メディアバイイング" },
    { label: "大手製薬会社", content: "セミナーの企画、全国紙での広告展開、雑誌広告" },
    { label: "観光局", content: "新聞広告、メディアバイイング、Youtube番組制作" },
    { label: "食品メーカー", content: "Ｗｅｂ動画配信、コンテンツ制作、BS局番組制作" },
    { label: "健康食品メーカー", content: "テレビスポットバイイング、イベント協賛" },    
]

export const movieList: String[] = [
    '津軽百年食堂','スープ','さよならドビュッシー','罪の余白','レディ in ホワイト'
]

export const videoList: Video[] = [
    { label: '日本酒姉妹', year: '2022年〜' },
    { label: '韓国好き芸能人大集合', year: '2022年' },
    { label: 'ハンコサミット', year: '2021年' }
]

export const OtherList: String[] = [
   '記者発表 企画製作','不動産コンサルティング','著作権管理','実業団スポーツチームＰＲ','タレントマネジメント'
]