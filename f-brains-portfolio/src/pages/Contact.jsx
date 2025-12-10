import React, { useState } from "react";
import {
  ChevronLeft,
  Mail,
  Send,
  Loader,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const Contact = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [uiState, setUiState] = useState("idle"); // idle, loading, success, error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formState.name ||
      !formState.email ||
      !formState.subject ||
      !formState.message
    ) {
      setError("すべてのフィールドを入力してください。");
      setUiState("error");
      return;
    }

    setUiState("loading");
    setError("");
    if (supabase) {
      await supabase.from("contacts").insert([
        {
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        },
      ]);
    }
    if (error) {
      setError(
        "メッセージの送信に失敗しました。しばらくしてからもう一度お試しください。"
      );
      setUiState("error");
      console.error("Supabase insert error:", error);
    } else {
      setUiState("success");
      setFormState({ name: "", email: "", subject: "", message: "" }); // フォームをリセット
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-[60vh]">
      <button
        onClick={() => navigate(-1)}
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

      <div className="bg-white border border-slate-200 p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-slate-700 mb-2 text-left"
            >
              お名前
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 bg-slate-50 outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-slate-700 mb-2 text-left"
            >
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 bg-slate-50 outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-bold text-slate-700 mb-2 text-left"
            >
              件名
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formState.subject}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 bg-slate-50 outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-bold text-slate-700 mb-2 text-left"
            >
              お問い合わせ内容
            </label>
            <textarea
              name="message"
              id="message"
              rows="6"
              value={formState.message}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 bg-slate-50 outline-none focus:border-indigo-500 transition-colors"
              required
            ></textarea>
          </div>

          <div className="text-center pt-4">
            {uiState === "idle" && (
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-indigo-900 text-white px-12 py-4 text-md font-bold tracking-widest hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-900/20 group"
              >
                <Send size={18} /> 送信する
              </button>
            )}

            {uiState === "loading" && (
              <div className="inline-flex items-center justify-center gap-3 bg-slate-400 text-white px-12 py-4 text-md font-bold tracking-widest transition-all cursor-wait">
                <Loader size={18} className="animate-spin" /> 送信中...
              </div>
            )}
          </div>
        </form>

        {uiState === "success" && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 text-green-800 flex items-center gap-4 animate-fade-in">
            <CheckCircle />
            <div>
              <h4 className="font-bold">送信しました</h4>
              <p className="text-sm">
                お問い合わせありがとうございます。内容を確認の上、折り返しご連絡いたします。
              </p>
            </div>
          </div>
        )}

        {uiState === "error" && (
          <div className="mt-8 p-6 bg-red-50 border border-red-200 text-red-800 flex items-center gap-4 animate-fade-in">
            <AlertTriangle />
            <div>
              <h4 className="font-bold">エラー</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
