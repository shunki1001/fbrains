<?php
/*
 * Template Name: F-Brains Portfolio
 */
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>F-Brains Portfolio</title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-indigo-900 selection:text-white">
        <!-- 背景テクスチャ -->
        <div
            class="fixed inset-0 opacity-40 pointer-events-none z-0"
            style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'%2F%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E');"
        ></div>

        <!-- Navigation -->
        <nav
            class="fixed top-0 w-full z-50 transition-all duration-500 bg-transparent py-6"
        >
            <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <!-- Logo Area -->
                <a href="#vision" class="flex items-center gap-3 cursor-pointer">
                    <div class="w-10 h-10 bg-indigo-900 flex items-center justify-center text-white shadow-md relative overflow-hidden group">
                        <span class="font-serif font-bold text-xl relative z-10">F</span>
                        <div class="absolute inset-0 bg-indigo-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold tracking-widest text-sm leading-none">F-BRAINS</span>
                        <span class="text-[10px] text-slate-500 tracking-widest mt-1">TOKYO</span>
                    </div>
                </a>

                <!-- Desktop Menu -->
                <div class="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] text-slate-600">
                    <a href="#vision" class="hover:text-indigo-900 relative group transition-colors py-2">VISION<span class="absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-900 transition-all group-hover:w-full group-hover:left-0"></span></a>
                    <a href="#services" class="hover:text-indigo-900 relative group transition-colors py-2">SERVICES<span class="absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-900 transition-all group-hover:w-full group-hover:left-0"></span></a>
                    <a href="#works" class="hover:text-indigo-900 relative group transition-colors py-2">WORKS<span class="absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-900 transition-all group-hover:w-full group-hover:left-0"></span></a>
                    <a href="#company" class="hover:text-indigo-900 relative group transition-colors py-2">COMPANY<span class="absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-900 transition-all group-hover:w-full group-hover:left-0"></span></a>
                    <a href="#contact" class="hover:text-indigo-900 relative group transition-colors py-2">CONTACT<span class="absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-900 transition-all group-hover:w-full group-hover:left-0"></span></a>
                </div>

                <!-- Mobile Menu Toggle -->
                <button class="md:hidden p-2 text-slate-800">
                    <!-- [icon: Menu] -->
                </button>
            </div>
        </nav>

        <!-- Hero Section -->
        <section
            id="vision"
            class="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center border-b border-slate-200"
        >
            <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12">
                <div class="lg:col-span-7 flex flex-col justify-center relative z-10">
                    <div class="inline-flex items-center gap-2 mb-6 animate-slide-in-left">
                        <span class="h-[1px] w-12 bg-indigo-900"></span>
                        <span class="text-indigo-900 font-bold tracking-widest text-xs uppercase">Strategic System Architect</span>
                    </div>
                    <h1 class="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-8 font-serif">
                        <span class="block mb-2">UIなき</span>
                        <span class="block text-slate-400">システムこそ、</span>
                        <span class="block relative inline-block">
                            最強の策。
                            <svg
                                class="absolute w-full h-3 -bottom-1 left-0 text-indigo-900/20"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                            >
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="8" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p class="text-slate-600 text-lg leading-loose max-w-xl mb-10">
                        表層のデザインではなく、ビジネスの深層を設計する。<br />
                        データ連携と生成AIによる自動化で、<br />
                        あなたの事業に「勝利のロジック」を実装します。
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a href="#contact" class="bg-indigo-900 text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-indigo-800 transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/20 group">
                            軍議を申し込む <!-- [icon: ArrowRight] -->
                        </a>
                    </div>
                </div>
                <div class="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
                    <div class="relative w-80 h-80 lg:w-96 lg:h-96">
                        <div class="absolute inset-0 border border-slate-200 rotate-45 animate-spin-slow"></div>
                        <div class="absolute inset-4 border border-slate-200 -rotate-12 animate-reverse-spin-slower"></div>
                        <div class="absolute inset-0 m-auto w-48 h-64 bg-white shadow-2xl border border-slate-100 flex flex-col p-6 items-center justify-center gap-4 transform transition-transform hover:-translate-y-2 duration-500 z-10">
                            <!-- [icon: Cpu] -->
                            <div class="text-center">
                                <div class="text-xs font-mono text-slate-400 mb-1">SYSTEM STATUS</div>
                                <div class="text-xl font-serif font-bold text-slate-800">常在戦場</div>
                            </div>
                            <div class="w-full h-[1px] bg-slate-100 my-2"></div>
                            <div class="w-full space-y-2">
                                <div class="flex justify-between text-[10px] font-mono">
                                    <span class="text-slate-500">EFFICIENCY</span>
                                    <span class="text-indigo-600 font-bold">99.9%</span>
                                </div>
                                <div class="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                    <div class="bg-indigo-900 h-full w-[99%]"></div>
                                </div>
                            </div>
                        </div>
                        <div class="absolute -right-8 top-0 text-6xl font-serif font-black text-slate-100 writing-vertical-rl select-none">自動化</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-24 px-6 bg-white relative">
            <div class="max-w-7xl mx-auto relative z-10">
                <div class="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-8">
                    <div>
                        <span class="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">Our Tactics</span>
                        <h2 class="text-4xl font-serif font-bold text-slate-900">参謀の仕事</h2>
                    </div>
                    <p class="text-slate-500 text-sm mt-4 md:mt-0 max-w-md text-right">
                        クラウドソーシングで培った実戦経験をもとに、<br />
                        3つの領域で貴社のバックエンドを強化します。
                    </p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="group p-8 border border-slate-200 hover:border-indigo-900 transition-all bg-[#FDFBF7] hover:shadow-xl hover:shadow-indigo-900/5 duration-300">
                        <div class="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-indigo-900 group-hover:border-indigo-900 transition-colors">
                            <!-- [icon: Workflow] -->
                        </div>
                        <h3 class="text-xl font-bold mb-3 font-serif">データ連携・API開発</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-6">散在するデータを統合し、システムの血管を通す。SaaS間連携やDB構築により、情報の分断を解消します。</p>
                        <ul class="space-y-2">
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> Custom API</li>
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> Data Sync</li>
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> Migration</li>
                        </ul>
                    </div>
                    <div class="group p-8 border border-slate-200 hover:border-indigo-900 transition-all bg-[#FDFBF7] hover:shadow-xl hover:shadow-indigo-900/5 duration-300">
                        <div class="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-indigo-900 group-hover:border-indigo-900 transition-colors">
                            <!-- [icon: Zap] -->
                        </div>
                        <h3 class="text-xl font-bold mb-3 font-serif">業務自動化 (RPA)</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-6">定型業務をスクリプトで一掃する。人の手が必要ない作業を自動化し、創造的な時間を取り戻します。</p>
                        <ul class="space-y-2">
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> Python Scripting</li>
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> Batch Process</li>
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> Scraping</li>
                        </ul>
                    </div>
                    <div class="group p-8 border border-slate-200 hover:border-indigo-900 transition-all bg-[#FDFBF7] hover:shadow-xl hover:shadow-indigo-900/5 duration-300">
                        <div class="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-indigo-900 group-hover:border-indigo-900 transition-colors">
                           <!-- [icon: Box] -->
                        </div>
                        <h3 class="text-xl font-bold mb-3 font-serif">生成AIソリューション</h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-6">最新の兵器を実務へ。LLMを活用したテキスト解析や生成システムで、業務の質を次元上昇させます。</p>
                        <ul class="space-y-2">
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> LLM Integration</li>
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> RAG System</li>
                            <li class="text-xs font-bold text-indigo-900 flex items-center gap-2"><span class="w-1 h-1 bg-indigo-900 rounded-full"></span> AI Agents</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Works Section -->
        <section id="works" class="py-24 px-6 bg-white border-y border-slate-200">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-16">
                    <span class="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">Battle Records</span>
                    <h2 class="text-4xl font-serif font-bold text-slate-900">戦果報告</h2>
                </div>
                <div class="space-y-6">
                    <div class="bg-[#FDFBF7] p-8 border-l-4 border-indigo-900 shadow-sm flex flex-col md:flex-row gap-8 hover:-translate-y-1 transition-transform duration-300">
                        <div class="md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                            <div>
                                <div class="text-xs font-bold text-slate-400 tracking-widest mb-1">PROJECT</div>
                                <div class="font-serif text-xl font-bold text-slate-900">在庫同期システム</div>
                            </div>
                            <div class="mt-4 text-4xl font-bold text-indigo-900 font-mono">98<span class="text-lg">%</span>
                                <div class="text-[10px] text-slate-500 font-sans tracking-tight">工数削減率</div>
                            </div>
                        </div>
                        <div class="md:w-3/4">
                            <p class="text-slate-600 leading-relaxed mb-6">ECモールと自社サイトの在庫・価格をリアルタイムで完全同期。API制限を回避するキューイングシステムを実装し、機会損失をゼロに。</p>
                            <div class="flex flex-wrap gap-2">
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">AWS Lambda</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">Python</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">Shopify API</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-[#FDFBF7] p-8 border-l-4 border-indigo-900 shadow-sm flex flex-col md:flex-row gap-8 hover:-translate-y-1 transition-transform duration-300">
                        <div class="md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                            <div>
                                <div class="text-xs font-bold text-slate-400 tracking-widest mb-1">PROJECT</div>
                                <div class="font-serif text-xl font-bold text-slate-900">社内AI参謀</div>
                            </div>
                            <div class="mt-4 text-4xl font-bold text-indigo-900 font-mono">24<span class="text-lg">/7</span>
                                <div class="text-[10px] text-slate-500 font-sans tracking-tight">稼働時間</div>
                            </div>
                        </div>
                        <div class="md:w-3/4">
                            <p class="text-slate-600 leading-relaxed mb-6">社内規定や過去のドキュメントを学習させたRAG（検索拡張生成）チャットボット。Slackからいつでも質問可能にし、問い合わせ対応コストを激減。</p>
                            <div class="flex flex-wrap gap-2">
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">OpenAI API</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">LangChain</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">Pinecone</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">Slack Bolt</span>
                            </div>
                        </div>
                    </div>
                     <div class="bg-[#FDFBF7] p-8 border-l-4 border-indigo-900 shadow-sm flex flex-col md:flex-row gap-8 hover:-translate-y-1 transition-transform duration-300">
                        <div class="md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                            <div>
                                <div class="text-xs font-bold text-slate-400 tracking-widest mb-1">PROJECT</div>
                                <div class="font-serif text-xl font-bold text-slate-900">不動産情報収集</div>
                            </div>
                            <div class="mt-4 text-4xl font-bold text-indigo-900 font-mono">50<span class="text-lg">k+</span>
                                <div class="text-[10px] text-slate-500 font-sans tracking-tight">日次処理件数</div>
                            </div>
                        </div>
                        <div class="md:w-3/4">
                            <p class="text-slate-600 leading-relaxed mb-6">複数の不動産ポータルから物件情報を自動収集・解析。優良物件の条件判定ロジックを組み込み、即座にLINEへ通知する仕入れ支援システム。</p>
                            <div class="flex flex-wrap gap-2">
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">Selenium</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">Docker</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">GCP</span>
                                <span class="bg-white border border-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">LINE API</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Philosophy Area -->
        <section class="py-24 px-6 bg-[#1a1a2e] text-white text-center relative overflow-hidden">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full"></div>

            <div class="relative z-10 max-w-2xl mx-auto space-y-8">
                <!-- [icon: Database] -->
                <h2 class="text-3xl md:text-5xl font-serif font-bold leading-normal">
                    疾きこと風の如く、<br />
                    徐かなること林の如し。
                </h2>
                <p class="text-indigo-200 leading-loose">
                    システムは迅速に動き、<br />
                    構造は静かに整う。<br />
                    孫子の兵法を現代のコードに宿します。
                </p>
            </div>
        </section>

        <!-- Company Profile Section -->
        <section id="company" class="py-24 px-6 bg-[#FDFBF7] relative">
            <div class="max-w-5xl mx-auto">
                <div class="grid md:grid-cols-12 gap-12">
                    <div class="md:col-span-4 lg:col-span-3 relative">
                        <span class="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-4 block md:hidden">Company</span>
                        <h2 class="text-4xl font-serif font-bold text-slate-900 mb-8 md:mb-0 md:writing-vertical-rl md:h-64 md:text-5xl tracking-wide">会社概要</h2>
                        <div class="absolute -top-10 -left-10 w-48 h-48 border-4 border-indigo-900/5 rotate-12 -z-10"></div>
                    </div>
                    <div class="md:col-span-8 lg:col-span-9 bg-white p-8 md:p-12 shadow-sm border border-slate-100 relative">
                        <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-900"></div>
                        <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-900"></div>
                        <dl class="grid gap-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>会社名</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">株式会社エフ＆ブレインズ</dd>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>英文社名</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">F&brains Inc.</dd>
                            </div>
                             <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>代表取締役</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">二村慈哉</dd>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span><!-- [icon: MapPin] -->所在地</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">本社：愛知県名古屋市中川区野田2丁目364番<br />東京出張所：東京都品川区大井2-27-24-1203</dd>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>電話番号</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">090-3509-8848（代表）<br />070-8488-4730（システム関連）</dd>
                            </div>
                             <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span><!-- [icon: Calendar] -->設立</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">2010年7月</dd>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>事業内容</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">
                                    <ul class="list-disc list-inside space-y-1 text-slate-600">
                                        <li>メディア運営</li>
                                        <li>システム開発</li>
                                        <li>映像制作</li>
                                    </ul>
                                </dd>
                            </div>
                             <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-100 pb-6 last:border-0 last:pb-0 group">
                                <dt class="md:col-span-3 text-sm font-bold text-indigo-900 tracking-widest flex items-center mb-2 md:mb-0"><span class="w-1 h-4 bg-indigo-900 mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>取引銀行</dt>
                                <dd class="md:col-span-9 text-slate-700 font-serif leading-relaxed">三菱UFJ銀行 大井支店</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-24 px-6 bg-white border-t border-slate-200">
            <div class="max-w-4xl mx-auto text-center">
                <span class="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-4 block">Contact</span>
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8">軍議を開く</h2>
                <p class="text-slate-600 mb-12">
                    システム開発のご相談、お見積もりなど<br />
                    お気軽にご連絡ください。
                </p>
                <div class="flex flex-col md:flex-row justify-center gap-6">
                    <a href="mailto:contact@f-brains.tokyo" class="group bg-indigo-900 text-white px-10 py-5 text-sm font-bold tracking-widest hover:bg-indigo-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/10 hover:shadow-indigo-900/20">
                        <!-- [icon: Mail] --> メールで相談する
                    </a>
                    <a href="#" class="group bg-white border border-slate-200 text-slate-900 px-10 py-5 text-sm font-bold tracking-widest hover:border-indigo-900 transition-all flex items-center justify-center gap-3">
                        <!-- [icon: ExternalLink] --> CrowdWorks
                    </a>
                </div>
                <footer class="mt-24 pt-8 border-t border-slate-100 text-xs text-slate-400 font-mono flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>© <?php echo date('Y'); ?> F-BRAINS.</div>
                    <div class="flex gap-4">
                        <span>PRIVACY POLICY</span>
                        <span>TERMS</span>
                    </div>
                </footer>
            </div>
        </section>

        <!-- Vertical Text Decoration -->
        <div class="fixed top-32 left-6 hidden xl:block writing-vertical-rl text-xs tracking-[0.3em] text-slate-300 font-bold select-none z-0">
            STRATEGIC SYSTEM DEVELOPMENT
        </div>

        <style>
            .writing-vertical-rl { writing-mode: vertical-rl; text-orientation: upright; }
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes reverse-spin-slower { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            .animate-spin-slow { animation: spin-slow 20s linear infinite; }
            .animate-reverse-spin-slower { animation: reverse-spin-slower 30s linear infinite; }
            .stamp-effect { mask-image: url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 50\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.1\' numOctaves=\'3\' stitchTiles=\'stitch\'%2F%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E"); }
        </style>
    </div>
    <?php wp_footer(); ?>
</body>
</html>