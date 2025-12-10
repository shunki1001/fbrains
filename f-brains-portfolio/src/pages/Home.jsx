import React, { useState, useEffect } from "react";
import {
  Box,
  Cpu,
  Workflow,
  ArrowRight,
  Zap,
  Mail,
  Sparkles,
  Scroll,
  Bot,
  History,
} from "lucide-react";
import { supabase, isSupabaseEnabled } from "../lib/supabaseClient";

// このコンポーネントはまだ大きいですが、まずはApp.jsxから分離することを優先します。
// さらに、HeroSection.jsx, ServicesSection.jsxなどに分割することも可能です。

const Home = () => {
  // Gemini API State
  const [strategyInput, setStrategyInput] = useState("");
  const [strategyResult, setStrategyResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Real-time History State
  const [historyLogs, setHistoryLogs] = useState([]);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);

  // --- Supabase Realtime ---
  useEffect(() => {
    if (!supabase) return;
    const fetchInitialData = async () => {
      const { data } = await supabase
        .from("strategy_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (data) setHistoryLogs(data);
    };
    fetchInitialData();
    const channel = supabase
      .channel("public:strategy_logs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "strategy_logs" },
        (payload) => {
          setHistoryLogs((prev) => [payload.new, ...prev].slice(0, 5));
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setIsRealtimeConnected(true);
      });
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // --- Gemini Logic ---
  const generateStrategy = async () => {
    if (!strategyInput.trim()) return;
    setIsLoading(true);
    setError(null);
    setStrategyResult(null);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const systemPrompt = `あなたは「F-BRAINS」という凄腕のシステム開発者・AI戦略家...（省略なしで実装推奨）...`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: strategyInput }] }],
            systemInstruction: {
              parts: [{ text: "あなたはF-BRAINSという..." }],
            },
          }),
        }
      );
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setStrategyResult(text);
      if (supabase) {
        await supabase
          .from("strategy_logs")
          .insert([
            { input: strategyInput.substring(0, 50) + "...", result: text },
          ]);
      }
    } catch (err) {
      setError("通信エラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section
        id="vision"
        className="relative pb-20 px-6 min-h-[90vh] flex items-center border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-6 animate-slide-in-left">
              <span className="h-[1px] w-12 bg-indigo-900"></span>
              <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase">
                Strategic System Architect
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-8 font-serif">
              <span className="block mb-2">UIなき</span>
              <span className="block text-slate-400">システムこそ、</span>
              <span className="block relative inline-block">
                最強の策。
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-indigo-900/20"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-slate-600 text-lg leading-loose max-w-xl mb-10">
              表層のデザインではなく、ビジネスの深層を設計する。
              <br />
              データ連携と生成AIによる自動化で、あなたの事業に「勝利のロジック」を実装します。
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleScrollTo("contact")}
                className="bg-indigo-900 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-indigo-800 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/20 group"
              >
                軍議を申し込む{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => handleScrollTo("strategy")}
                className="border border-indigo-900 text-indigo-900 px-8 py-4 text-sm font-bold tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-2 group"
              >
                <Sparkles size={16} className="text-indigo-600" /> AI軍師を試す
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 border border-slate-200 rotate-45 animate-spin-slow"></div>
              <div className="absolute inset-4 border border-slate-200 -rotate-12 animate-reverse-spin-slower"></div>
              <div className="absolute inset-0 m-auto w-48 h-64 bg-white shadow-2xl border border-slate-100 flex flex-col p-6 items-center justify-center gap-4 z-10">
                <Cpu className="text-indigo-900 w-12 h-12" />
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-400 mb-1">
                    SYSTEM STATUS
                  </div>
                  <div className="text-xl font-serif font-bold text-slate-800">
                    常在戦場
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-100 my-2"></div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">REALTIME</span>
                    <span
                      className={`font-bold ${
                        isRealtimeConnected
                          ? "text-green-600"
                          : "text-slate-400"
                      }`}
                    >
                      {isRealtimeConnected ? "ONLINE" : "CONNECTING..."}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-indigo-900 h-full w-[99%] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-8">
            <div>
              <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">
                Our Tactics
              </span>
              <h2 className="text-4xl font-serif font-bold text-slate-900">
                参謀の仕事
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Workflow />,
                title: "データ連携・API開発",
                desc: "散在するデータを統合...",
                tags: ["Custom API", "Data Sync"],
              },
              {
                icon: <Zap />,
                title: "業務自動化 (RPA)",
                desc: "定型業務をスクリプトで一掃...",
                tags: ["Python", "Scraping"],
              },
              {
                icon: <Box />,
                title: "生成AIソリューション",
                desc: "最新の兵器を実務へ...",
                tags: ["LLM", "RAG", "Agents"],
              },
            ].map((s, i) => (
              <div
                key={i}
                className="group p-8 border border-slate-200 hover:border-indigo-900 transition-all bg-[#FDFBF7]"
              >
                <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center mb-6 text-slate-900 group-hover:bg-indigo-900 group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGY (Gemini + Supabase Log) */}
      <section
        id="strategy"
        className="py-24 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12">
          {/* Input Area */}
          <div>
            <div className="text-left mb-8">
              <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block flex items-center gap-2">
                <Sparkles size={14} /> AI Strategic Counsel
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                AI軍師の戦況分析
              </h2>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-xl border border-slate-200">
              <textarea
                value={strategyInput}
                onChange={(e) => setStrategyInput(e.target.value)}
                placeholder="例：毎月の請求書作成に時間がかかりすぎている..."
                className="w-full p-4 border border-slate-200 bg-slate-50 outline-none min-h-[120px]"
              />
              <button
                onClick={generateStrategy}
                disabled={isLoading}
                className="mt-4 bg-indigo-900 text-white px-8 py-4 font-bold tracking-widest hover:bg-indigo-800 disabled:bg-slate-300 w-full flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  "策を練っております..."
                ) : (
                  <>
                    <Bot size={20} /> 策を講じる
                  </>
                )}
              </button>
              {strategyResult && (
                <div className="mt-6 bg-[#FDFBF7] border border-slate-200 p-6 animate-fade-in relative">
                  <h3 className="font-serif font-bold mb-4 flex items-center gap-2">
                    <Scroll size={16} /> 献策書
                  </h3>
                  <div className="prose prose-sm font-serif text-slate-700 whitespace-pre-wrap">
                    {strategyResult}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Logs Area */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <History className="text-indigo-900" /> 他国の軍議
              </h3>
              <div
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isRealtimeConnected
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isRealtimeConnected ? "LIVE" : "OFFLINE"}
              </div>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {historyLogs.map((log, i) => (
                <div
                  key={i}
                  className="bg-white border-l-2 border-slate-200 p-4 hover:border-indigo-900 transition-colors shadow-sm"
                >
                  <p className="text-[10px] font-mono text-slate-400 mb-1">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </p>
                  <p className="text-sm font-serif text-slate-800 line-clamp-2 mb-2">
                    {log.input}
                  </p>
                  <p className="text-xs text-slate-500 bg-slate-50 p-2 line-clamp-2">
                    {log.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section
        id="works"
        className="py-24 px-6 bg-white border-y border-slate-200"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-12">
            戦果報告
          </h2>
          <div className="grid gap-4">
            <div className="bg-[#FDFBF7] p-8 border-l-4 border-indigo-900 text-left">
              <h3 className="font-serif font-bold text-xl">
                在庫同期システム
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                ECモールと自社サイトの在庫・価格をリアルタイムで完全同期。
              </p>
            </div>
            <div className="bg-[#FDFBF7] p-8 border-l-4 border-indigo-900 text-left">
              <h3 className="font-serif font-bold text-xl">社内AI参謀</h3>
              <p className="text-sm text-slate-600 mt-2">
                社内規定RAGチャットボット。問い合わせコスト激減。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 px-6 bg-white border-t border-slate-200 text-center"
      >
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8">
          軍議を開く
        </h2>
        <div className="flex justify-center gap-6">
          <button className="bg-indigo-900 text-white px-8 py-4 font-bold tracking-widest flex items-center gap-2">
            <Mail /> メールで相談する
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
