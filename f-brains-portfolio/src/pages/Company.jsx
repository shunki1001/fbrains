import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Company = () => {
  const navigate = useNavigate();

  const companyInfo = [
    { label: '会社名', value: '株式会社エフ＆ブレインズ' },
    { label: '英文社名', value: 'F&brains Inc.' },
    { label: '代表取締役', value: '二村慈哉' },
    { label: '所在地', value: '本社：愛知県名古屋市中川区野田2丁目364番\n東京出張所：東京都品川区大井2-27-24-1203' },
    { label: '電話番号', value: '090-3509-8848（代表）\n070-8488-4730（システム関連）' },
    { label: '設立', value: '2010年7月' },
    { label: '取引銀行', value: '三菱UFJ銀行　大井支店' },
    { label: '事業内容', value: 'メディア運営・システム開発・映像制作' },
  ];

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
          COMPANY
        </span>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          会社概要
        </h1>
      </div>

      <div className="bg-white border border-slate-200 p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 text-center">
          代表挨拶
        </h2>
        <p className="max-w-2xl mx-auto text-slate-600 leading-loose text-center mb-12">
          社名である「エフ」とは、創設者のイニシャル、「ブレインズ」とは、ブレーンたち・頭脳集団を意味し、経験や才能を持つ方々との強いつながりを生かし、様々な側面からビジネスを構築していくとともに、クライアントのあらゆるニーズにお応えしていく集団でありたい、と考えています。
        </p>
        <p className="text-right font-serif">
          株式会社エフ＆ブレインズ
          <br />
          代表取締役　二村慈哉
        </p>
      </div>


      <div className="bg-white border border-slate-200 overflow-hidden">
        {companyInfo.map((item, index) => (
          <div key={index} className="grid grid-cols-3 md:grid-cols-4">
            <div className="col-span-1 bg-slate-50 font-bold text-slate-700 p-4 border-b border-r border-slate-200 text-sm">
              {item.label}
            </div>
            <div className="col-span-2 md:col-span-3 text-slate-600 p-4 border-b border-slate-200 text-sm whitespace-pre-line">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Company;
