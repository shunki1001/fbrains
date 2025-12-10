import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-indigo-900 selection:text-white flex flex-col">
      {/* Background */}
      <div
        className="fixed inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <Header />

      {/* Main Content Area - スクロールパディング確保 */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      <Footer />

      <div className="fixed top-32 left-6 hidden xl:block writing-vertical-rl text-xs tracking-[0.3em] text-slate-300 font-bold select-none z-0">
        STRATEGIC SYSTEM DEVELOPMENT
      </div>

      <style>{`
        .writing-vertical-rl { writing-mode: vertical-rl; text-orientation: upright; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin-slower { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin-slower { animation: reverse-spin-slower 30s linear infinite; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default MainLayout;
