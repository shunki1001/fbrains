import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoProduction = () => {
  const navigate = useNavigate();

  const adData = [
    { industry: '書籍出版社', record: '読売新聞、日経新聞　書籍広告' },
    { industry: 'ホテル事業会社', record: '新規オープンリゾートホテル　コミュニケーションプランニング　ＴＶＣＭ制作コンサルティング　テレビスポットバイイング　テレビ番組ＰＲ' },
    { industry: '自転車メーカー', record: '新聞広告　メディアバイイング' },
    { industry: '大手製薬会社', record: 'セミナーの企画、全国紙での広告展開、雑誌広告' },
    { industry: '観光局', record: '新聞広告、メディアバイイング、Youtube番組制作' },
    { industry: '食品メーカー', record: 'Web動画配信、コンテンツ制作、BS局番組制作' },
    { industry: '健康食品メーカー', record: 'テレビスポットバイイング、イベント協賛' },
  ];

  const movieData = [
    '津軽百年食堂',
    'スープ',
    'さよならドビュッシー',
    '罪の余白',
    'レディ in ホワイト',
  ];

  const videoData = [
    { title: '日本酒姉妹', url: 'https://www.youtube.com/channel/UCdRLmsjsuhBWxhXtQeQlwcA', year: '2022年〜' },
    { title: '韓国好き芸能人大集合', url: null, year: '2022年' },
    { title: 'ハンコサミット', url: null, year: '2021年' },
  ];

  const Table = ({ headers, data, renderRow }) => (
    <div className="bg-white border border-slate-200 overflow-hidden mb-12">
      <div className="grid grid-cols-3 md:grid-cols-4">
        {headers.map((header, i) => (
          <div key={i} className={`col-span-${i === 0 ? '1' : '2'} md:col-span-${i === 0 ? '1' : '3'} bg-slate-50 font-bold text-slate-700 p-4 border-b border-slate-200 text-sm ${i === 0 ? 'border-r' : ''}`}>
            {header}
          </div>
        ))}
      </div>
      {data.map(renderRow)}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-[60vh]">
      <button
        onClick={() => navigate('/')}
        className="mb-12 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-900 transition-colors"
      >
        <ChevronLeft size={14} /> トップに戻る
      </button>

      <div className="text-center mb-16">
        <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">
          SERVICES
        </span>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          映像コンテンツ制作
        </h1>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 border-l-4 border-indigo-900 pl-4">
          広告事業
        </h2>
        <Table
          headers={['業界', '活動実績']}
          data={adData}
          renderRow={(item, index) => (
            <div key={index} className="grid grid-cols-3 md:grid-cols-4">
              <div className="col-span-1 text-slate-700 p-4 border-b border-r border-slate-200 text-sm">
                {item.industry}
              </div>
              <div className="col-span-2 md:col-span-3 text-slate-600 p-4 border-b border-slate-200 text-sm">
                {item.record}
              </div>
            </div>
          )}
        />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 border-l-4 border-indigo-900 pl-4">
          映画製作
        </h2>
        <div className="bg-white border border-slate-200 p-4">
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            {movieData.map((title, index) => <li key={index}>{title}</li>)}
          </ul>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 border-l-4 border-indigo-900 pl-4">
          映像作品
        </h2>
        <Table
          headers={['映像作品名', '活動時期']}
          data={videoData}
          renderRow={(item, index) => (
            <div key={index} className="grid grid-cols-3 md:grid-cols-4">
              <div className="col-span-1 text-slate-700 p-4 border-b border-r border-slate-200 text-sm">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline hover:text-indigo-900">{item.title}</a>
                ) : (
                  item.title
                )}
              </div>
              <div className="col-span-2 md:col-span-3 text-slate-600 p-4 border-b border-slate-200 text-sm">
                {item.year}
              </div>
            </div>
          )}
        />
      </section>

    </div>
  );
};

export default VideoProduction;
