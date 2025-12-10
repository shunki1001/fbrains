import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path, sectionId = null) => {
    setIsMenuOpen(false);
    if (sectionId) {
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const navItems = [
    { label: "VISION", action: () => handleNavigate("/") },
    { label: "WORKS", action: () => handleNavigate("/works") },
    { label: "BLOG", action: () => handleNavigate("/blog") },
    { label: "COMPANY", action: () => handleNavigate("/company") },
    { label: "CONTACT", action: () => handleNavigate("/contact") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FDFBF7]/95 backdrop-blur border-b border-slate-200 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigate("/", "vision")}
          >
            <div className="w-10 h-10 bg-indigo-900 flex items-center justify-center text-white shadow-md relative overflow-hidden group">
              <span className="font-serif font-bold text-xl relative z-10">
                F
              </span>
              <div className="absolute inset-0 bg-indigo-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-widest text-sm leading-none">
                F-BRAINS
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest mt-1">
                TOKYO
              </span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="hover:text-indigo-900 relative group transition-colors py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-900 transition-all group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </div>
          <button
            className="md:hidden p-2 text-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-indigo-900 z-40 flex items-center justify-center animate-fade-in">
          <div className="flex flex-col gap-8 text-white text-2xl font-serif text-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="hover:text-indigo-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
