import React from "react";

const Footer = () => {
  return (
    <footer className="mt-24 pt-8 border-t border-slate-100 text-xs text-slate-400 font-mono flex flex-col md:flex-row justify-between items-center gap-4">
      <div>© 2024 F-BRAINS.</div>
      <div className="flex gap-4">
        <span>PRIVACY POLICY</span>
        <span>TERMS</span>
      </div>
    </footer>
  );
};

export default Footer;