import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (slug) => {
    navigate(`/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-400 font-mono">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© 2024 F-BRAINS.</div>
        <div className="flex gap-4">
          <button
            onClick={() => handleNavigate("about")}
            className="hover:text-indigo-900"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavigate("privacy")}
            className="hover:text-indigo-900"
          >
            PRIVACY POLICY
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
