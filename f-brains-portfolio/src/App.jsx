import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  Cpu,
  Workflow,
  ArrowRight,
  Menu,
  X,
  Zap,
  Database,
  Mail,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  Scroll,
  Bot,
  History,
  Activity,
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// --- Supabase Client Initialization ---
// 環境変数がない場合（プレビュー用）のダミー処理を含んでいます
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseEnabled = supabaseUrl && supabaseAnonKey;

const supabase = isSupabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const App = () => {
  // Gemini API State
  const [strategyInput, setStrategyInput] = useState("");
  const [strategyResult, setStrategyResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Real-time History State
  const [historyLogs, setHistoryLogs] = useState([]);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Supabase Realtime Subscription ---
  useEffect(() => {
    if (!supabase) return;

    // 1. 初期データの取得 (最新5件)
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from("strategy_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (data) setHistoryLogs(data);
    };

    fetchInitialData();

    // 2. リアルタイム購読の開始
    const channel = supabase
      .channel("public:strategy_logs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "strategy_logs" },
        (payload) => {
          // 新しいログが追加されたら、リストの先頭に追加
          console.log("Realtime Update:", payload);
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

  // --- Gemini API Call with Supabase Save ---
  const generateStrategy = async () => {
    if (!strategyInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setStrategyResult(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const systemPrompt = `
      あなたは「F-BRAINS」という凄腕のシステム開発者・AI戦略家（軍師）のAIエージェントです。
      ユーザー（殿/クライアント）からビジネス上の課題や「戦況」が入力されます。
      それに対し、以下のスタイルで技術的な「策（ソリューション）」を提案してください。

      ## キャラクター設定
      - 口調: 丁寧だが、軍師のような知性と威厳がある。
      - コンセプト: 「UIなきシステムこそ最強」「戦わずして勝つ（自動化）」を信条とする。
      - 文字数: 300文字以内で簡潔に。

      ## 出力フォーマット
      Markdown形式で、以下の要素を含めてください。
      **【戦況分析】** ...
      **【必勝の策】** ...
      **【勝算】** ...
    `;

    try {
      // 1. Gemini API Call
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: strategyInput }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );

      if (!response.ok) throw new Error("軍議（API通信）に失敗しました。");

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setStrategyResult(text);

      // 2. Save to Supabase (if configured)
      if (supabase) {
        await supabase.from("strategy_logs").insert([
          {
            input: strategyInput.substring(0, 50) + "...", // プライバシー配慮でトリミングしても良い
            result: text,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setError("通信経路に障害発生。再送を試みてください。");
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    "VISION",
    "SERVICES",
    "STRATEGY",
    "WORKS",
    "COMPANY",
    "CONTACT",
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-indigo-900 selection:text-white">
      {/* Background Texture */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <Header scrollTo={scrollTo} />

      {/* Hero Section */}
      <section
        id="vision"
        className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center border-b border-slate-200"
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
              データ連携と生成AIによる自動化で、
              <br />
              あなたの事業に「勝利のロジック」を実装します。
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-indigo-900 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-indigo-800 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/20 group"
              >
                軍議を申し込む{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => scrollTo("strategy")}
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
              <div className="absolute inset-0 m-auto w-48 h-64 bg-white shadow-2xl border border-slate-100 flex flex-col p-6 items-center justify-center gap-4 transform transition-transform hover:-translate-y-2 duration-500 z-10">
                <Cpu className="text-indigo-900 w-12 h-12" strokeWidth={1.5} />
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
              <div className="absolute -right-8 top-0 text-6xl font-serif font-black text-slate-100 writing-vertical-rl select-none">
                自動化
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
            <p className="text-slate-500 text-sm mt-4 md:mt-0 max-w-md text-right">
              クラウドソーシングで培った実戦経験をもとに、
              <br />
              3つの領域で貴社のバックエンドを強化します。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Workflow />,
                title: "データ連携・API開発",
                desc: "散在するデータを統合し、システムの血管を通す。SaaS間連携やDB構築により、情報の分断を解消します。",
                tags: ["Custom API", "Data Sync", "Migration"],
              },
              {
                icon: <Zap />,
                title: "業務自動化 (RPA)",
                desc: "定型業務をスクリプトで一掃する。人の手が必要ない作業を自動化し、創造的な時間を取り戻します。",
                tags: ["Python Scripting", "Batch Process", "Scraping"],
              },
              {
                icon: <Box />,
                title: "生成AIソリューション",
                desc: "最新の兵器を実務へ。LLMを活用したテキスト解析や生成システムで、業務の質を次元上昇させます。",
                tags: ["LLM Integration", "RAG System", "AI Agents"],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 border border-slate-200 hover:border-indigo-900 transition-all bg-[#FDFBF7] hover:shadow-xl hover:shadow-indigo-900/5 duration-300"
              >
                <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-indigo-900 group-hover:border-indigo-900 transition-colors">
                  <div className="text-slate-900 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs font-bold text-indigo-900 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-indigo-900 rounded-full"></span>{" "}
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGY SECTION (Main Feature) */}
      <section
        id="strategy"
        className="py-24 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12">
          {/* Left Column: Interaction */}
          <div>
            <div className="text-left mb-8">
              <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block flex items-center gap-2">
                <Sparkles size={14} /> AI Strategic Counsel
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                AI軍師の戦況分析
              </h2>
              <p className="text-slate-500">
                あなたのビジネスの課題を入力してください。
                <br />
                即座に「勝利への策」を献策いたします。
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-sm shadow-xl border border-slate-200 relative">
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-600 mb-2 tracking-widest">
                  戦況報告（課題入力）
                </label>
                <textarea
                  value={strategyInput}
                  onChange={(e) => setStrategyInput(e.target.value)}
                  placeholder="例：毎月の請求書作成に時間がかかりすぎている。PDFを読み取ってExcelに入力する作業を自動化したい。"
                  className="w-full p-4 border border-slate-200 bg-slate-50 focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 outline-none transition-all min-h-[120px] font-sans text-slate-700 resize-none"
                />
              </div>

              <div className="flex justify-start mb-8">
                <button
                  onClick={generateStrategy}
                  disabled={isLoading || !strategyInput.trim()}
                  className="bg-indigo-900 text-white px-8 py-4 font-bold tracking-widest hover:bg-indigo-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-lg group relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                      策を練っております...
                    </>
                  ) : (
                    <>
                      <Bot size={20} />
                      策を講じる
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>

              {error && (
                <div className="text-red-600 text-sm font-bold bg-red-50 p-4 border border-red-100 mb-6">
                  {error}
                </div>
              )}

              {strategyResult && (
                <div className="animate-fade-in bg-[#FDFBF7] border border-slate-200 p-6 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-indigo-900/10"></div>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                    <Scroll className="text-indigo-900" size={20} />
                    <h3 className="font-serif font-bold text-slate-800">
                      献策書
                    </h3>
                  </div>
                  <div className="prose prose-slate prose-sm max-w-none font-serif text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {strategyResult}
                  </div>
                  <div className="mt-6 pt-2 border-t border-slate-200 text-right">
                    <div className="inline-block border border-indigo-900 text-indigo-900 px-3 py-1 text-xs font-bold tracking-widest stamp-effect opacity-80 rotate-[-2deg]">
                      F-BRAINS 承認
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Real-time History */}
          <div className="relative">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <div>
                <span className="text-slate-400 font-bold tracking-widest text-xs uppercase mb-1 block">
                  Real-time Logs
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                  <History className="text-indigo-900" /> 他国の軍議
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full">
                <Activity
                  size={12}
                  className={`text-green-500 ${
                    isRealtimeConnected ? "animate-pulse" : ""
                  }`}
                />
                {isRealtimeConnected ? "LIVE FEED" : "OFFLINE"}
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar relative">
              {!isSupabaseEnabled && (
                <div className="bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 mb-4">
                  ※
                  Supabase未接続のため、デモモード（静的データ）で表示しています。
                </div>
              )}

              {historyLogs.length === 0 ? (
                <div className="text-slate-400 text-center py-10 font-mono text-xs">
                  NO RECORDS YET...
                </div>
              ) : (
                historyLogs.map((log, index) => (
                  <div
                    key={log.id || index}
                    className="bg-white border-l-2 border-slate-200 p-5 hover:border-indigo-900 transition-colors shadow-sm animate-fade-in-up"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1">
                        {new Date(log.created_at).toLocaleTimeString()}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-900 tracking-wider">
                        CONFIDENTIAL
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs font-bold text-slate-500 mb-1">
                        戦況 (INPUT)
                      </p>
                      <p className="text-sm text-slate-800 font-serif line-clamp-2">
                        {log.input}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 mb-1">
                        軍師の策 (OUTPUT)
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-slate-50 p-2 border border-slate-100">
                        {log.result}
                      </p>
                    </div>
                  </div>
                ))
              )}

              {/* Fade out effect at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section
        id="works"
        className="py-24 px-6 bg-white border-y border-slate-200"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">
              Battle Records
            </span>
            <h2 className="text-4xl font-serif font-bold text-slate-900">
              戦果報告
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "在庫同期システム",
                metric_val: "98",
                metric_unit: "%",
                metric_desc: "工数削減率",
                desc: "ECモールと自社サイトの在庫・価格をリアルタイムで完全同期。API制限を回避するキューイングシステムを実装し、機会損失をゼロに。",
                tags: ["AWS Lambda", "Python", "Shopify API"],
              },
              {
                title: "社内AI参謀",
                metric_val: "24",
                metric_unit: "/7",
                metric_desc: "稼働時間",
                desc: "社内規定や過去のドキュメントを学習させたRAG（検索拡張生成）チャットボット。Slackからいつでも質問可能にし、問い合わせ対応コストを激減。",
                tags: ["OpenAI API", "LangChain", "Pinecone", "Slack Bolt"],
              },
              {
                title: "不動産情報収集",
                metric_val: "50",
                metric_unit: "k+",
                metric_desc: "日次処理件数",
                desc: "複数の不動産ポータルから物件情報を自動収集・解析。優良物件の条件判定ロジックを組み込み、即座にLINEへ通知する仕入れ支援システム。",
                tags: ["Selenium", "Docker", "GCP", "LINE API"],
              },
            ].map((work, index) => (
              <div
                key={index}
                className="bg-[#FDFBF7] p-8 border-l-4 border-indigo-900 shadow-sm flex flex-col md:flex-row gap-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                  <div>
                    <div className="text-xs font-bold text-slate-400 tracking-widest mb-1">
                      PROJECT
                    </div>
                    <div className="font-serif text-xl font-bold text-slate-900">
                      {work.title}
                    </div>
                  </div>
                  <div className="mt-4 text-4xl font-bold text-indigo-900 font-mono">
                    {work.metric_val}
                    <span className="text-lg">{work.metric_unit}</span>
                    <div className="text-[10px] text-slate-500 font-sans tracking-tight">
                      {work.metric_desc}
                    </div>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {work.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Area */}
      <section className="py-24 px-6 bg-[#1a1a2e] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <Database className="w-12 h-12 mx-auto text-indigo-400 mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-normal">
            疾きこと風の如く、
            <br />
            徐かなること林の如し。
          </h2>
          <p className="text-indigo-200 leading-loose">
            システムは迅速に動き、
            <br />
            構造は静かに整う。
            <br />
            孫子の兵法を現代のコードに宿します。
          </p>
        </div>
      </section>

      {/* Company Profile Section */}
      <section id="company" className="py-24 px-6 bg-[#FDFBF7] relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4 lg:col-span-3 relative">
              <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-4 block md:hidden">
                Company
              </span>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8 md:mb-0 md:writing-vertical-rl md:h-64 md:text-5xl tracking-wide">
                会社概要
              </h2>
              <div className="absolute -top-10 -left-10 w-48 h-48 border-4 border-indigo-900/5 rotate-12 -z-10"></div>
            </div>
            <div className="md:col-span-8 lg:col-span-9 bg-white p-8 md:p-12 shadow-sm border border-slate-100 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-900"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-900"></div>
              <dl className="grid gap-y-6">
                {[
                  { dt: "屋号", dd: "F-BRAINS (エフ・ブレインズ)" },
                  { dt: "代表", dd: "山田 太郎 (Taro Yamada)" },
                  {
                    dt: "所在地",
                    dd: "〒100-0000 東京都千代田区...",
                    icon: (
                      <MapPin
                        size={14}
                        className="inline mr-1 text-indigo-900"
                      />
                    ),
                  },
                  {
                    dt: "設立",
                    dd: "2024年1月",
                    icon: (
                      <Calendar
                        size={14}
                        className="inline mr-1 text-indigo-900"
                      />
                    ),
                  },
                  {
                    dt: "事業内容",
                    dd: (
                      <ul className="list-disc list-inside space-y-1 text-slate-600">
                        <li>Webシステム・アプリケーション開発</li>
                        <li>生成AI（LLM）導入・活用支援</li>
                        <li>業務効率化・自動化（RPA）コンサルティング</li>
                        <li>データ連携基盤構築</li>
                      </ul>
                    ),
                  },
                  { dt: "取引銀行", dd: "◯◯銀行、△△銀行" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group"
                  >
                    <dt className="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0">
                      <span className="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.dt}
                    </dt>
                    <dd className="md:col-span-9 text-slate-700 font-serif leading-relaxed">
                      {item.dd}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 px-6 bg-white border-t border-slate-200"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8">
            軍議を開く
          </h2>
          <p className="text-slate-600 mb-12">
            システム開発のご相談、お見積もりなど
            <br />
            お気軽にご連絡ください。
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="mailto:contact@f-brains.tokyo"
              className="group bg-indigo-900 text-white px-10 py-5 text-sm font-bold tracking-widest hover:bg-indigo-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/10 hover:shadow-indigo-900/20"
            >
              <Mail className="group-hover:animate-pulse" /> メールで相談する
            </a>
            <a
              href="#"
              className="group bg-white border border-slate-200 text-slate-900 px-10 py-5 text-sm font-bold tracking-widest hover:border-indigo-900 transition-all flex items-center justify-center gap-3"
            >
              <ExternalLink className="group-hover:scale-110 transition-transform" />{" "}
              CrowdWorks
            </a>
          </div>
          <Footer />
        </div>
      </section>

      <div className="fixed top-32 left-6 hidden xl:block writing-vertical-rl text-xs tracking-[0.3em] text-slate-300 font-bold select-none z-0">
        STRATEGIC SYSTEM DEVELOPMENT
      </div>

      <style>{`
        .writing-vertical-rl { writing-mode: vertical-rl; text-orientation: upright; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin-slower { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin-slower { animation: reverse-spin-slower 30s linear infinite; }
        .stamp-effect { mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E"); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;
