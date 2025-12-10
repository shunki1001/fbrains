import React from 'react';
import { ChevronLeft, Mail } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-[60vh]">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mb-12 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-900 transition-colors"
      >
        <ChevronLeft size={14} /> 前のページに戻る
      </button>

      <div className="text-center mb-16">
        <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">
          CONTACT
        </span>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          お問い合わせ
        </h1>
      </div>

      <div className="bg-white border border-slate-200 p-8 md:p-12 text-center">
        <p className="text-slate-600 leading-loose mb-8 max-w-2xl mx-auto">
          弊社に興味をお持ちいただきありがとうございます。
          <br />
          お問い合わせは、以下のメールアドレスよりお願いいたします。
          <br />
          <br />
          お送りいただいた内容を確認の上、担当者より折り返しご連絡させていただきます。
        </p>
        
        <a 
          href="mailto:contact@f-brains.tokyo" // ダミーのメールアドレス
          className="inline-flex items-center justify-center gap-3 bg-indigo-900 text-white px-10 py-5 text-md font-bold tracking-widest hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-900/20 group"
        >
          <Mail size={20} />
          contact@f-brains.tokyo
        </a>

        <p className="text-xs text-slate-400 mt-12 max-w-xl mx-auto">
          お問い合わせいただきました内容は、弊社の掲げる個人情報保護方針に沿って管理し、お客様の同意なく第三者に開示・提供することはございません。詳細につきましては、当サイトの
          <Link to="/privacy" className="underline hover:text-indigo-700">プライバシーポリシー</Link>
          をご参照ください。
        </p>
      </div>
    </div>
  );
};

export default Contact;
