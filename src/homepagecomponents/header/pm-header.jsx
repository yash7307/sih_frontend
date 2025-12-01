import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Menucard from "./Menu-card";

export default function PMHeader() {
  //state and ref for guidelines menu
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  //this for scrolling to sections on same page from header
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    } else {
      console.warn(`Section with ID "${id}" not found`);
    }
  };

  //useEffect for closing guidelines menu on outside click 
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  })

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs md:text-sm py-2 px-2 md:px-4 border-b border-gray-700/50">
        <div className="max-w-10xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="truncate">भारत सरकार / Govt Of India</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button className="hover:text-orange-500">A-</button>
              <button className="hover:text-orange-500">A</button>
              <button className="hover:text-orange-500">A+</button>
            </div>

            <span className="text-gray-400 hidden sm:inline">|</span>

            <select className="bg-gray-900 text-white px-1 text-xs md:text-sm">
              <option>English</option>
              <option>हिंदी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-300 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-10xl mx-auto px-3 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 rounded-xl shadow-lg flex items-center justify-center border border-gray-700">
              <span className="text-white text-xs font-bold">MCA</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-orange-500 drop-shadow-sm">PM</h1>
              <p className="text-xs text-gray-600">Internship</p>
            </div>
          </div>

          {/* Action buttons - visible on all screen sizes */}
          <div className="flex items-center gap-2">
            {/* Mobile: smaller buttons */}
            <Link to="/youth-registration" className="md:hidden bg-orange-500 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-md hover:bg-orange-600 transition-all">Register</Link>
            <Link to="/login" className="md:hidden bg-orange-500 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-md hover:bg-orange-600 transition-all">
              Login
            </Link>

            {/* Desktop: full-size buttons */}
            <Link to="/youth-registration" className="hidden md:block bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all">Youth Registration</Link>
            <Link to="/login" className="hidden md:block bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all">
              Login
            </Link>

            {/* Mobile hamburger button */}
            <button
              className="md:hidden p-2 text-gray-900 hover:text-orange-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block bg-gray-900/95 backdrop-blur-lg text-white shadow-inner">
          <div className="max-w-10xl mx-auto px-4 flex gap-8 text-sm font-semibold py-3">
            <Link to="/Home" className="hover:text-orange-400 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all hover:after:w-full">HOME</Link>
            {/* this is guideline and documentations */}
            <div className="relative" ref={menuRef}>
              <button
                className="hover:text-orange-400 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all hover:after:w-full"
                onClick={() => setOpenMenu(!openMenu)}
              >
                GUIDELINES / DOCUMENTATIONS
              </button>

              {openMenu && (
                <div className="absolute top-10 left-0 z-50 bg-white/30 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)]">
                  <Menucard />
                </div>
              )}
            </div>

            <button className="hover:text-orange-400 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all hover:after:w-full" onClick={() => scrollToSection("gallery")}>GALLERY</button>
            <button className="hover:text-orange-400 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all hover:after:w-full" onClick={() => scrollToSection("eligibility")}>ELIGIBILITY</button>
            <button className="hover:text-orange-400 relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all hover:after:w-full" onClick={() => scrollToSection("support")}>SUPPORT</button>
          </div>
        </nav>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 text-white">
            <div className="px-4 py-3 space-y-3">
              <Link to="/Home" className="block py-2 hover:text-orange-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
              <button className="block w-full text-left py-2 hover:text-orange-400 transition-colors" onClick={() => setOpenMenu(!openMenu)}>GUIDELINES / DOCUMENTATIONS</button>
              {openMenu && (
                <div className="pl-4 bg-white/10 rounded p-2">
                  <Menucard />
                </div>
              )}
              <button className="block w-full text-left py-2 hover:text-orange-400 transition-colors" onClick={() => scrollToSection("gallery")}>GALLERY</button>
              <button className="block w-full text-left py-2 hover:text-orange-400 transition-colors" onClick={() => scrollToSection("eligibility")}>ELIGIBILITY</button>
              <button className="block w-full text-left py-2 hover:text-orange-400 transition-colors" onClick={() => scrollToSection("support")}>SUPPORT</button>

              {/* Mobile action buttons */}
              <div className="border-t border-gray-700 pt-3 mt-3 space-y-2">
                <Link to="/youth-registration" className="block bg-orange-500 text-white text-center px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-all" onClick={() => setMobileMenuOpen(false)}>Youth Registration</Link>
                <Link to="/login" className="block w-full bg-orange-500 text-white text-center px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-all" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification */}
      <div className="bg-blue-100 text-blue-900 px-3 md:px-4 py-2.5 text-xs md:text-sm border-b border-blue-200 shadow-sm">
        <div className="max-w-10xl mx-auto">
          Check your dashboard, email, and SMS regularly for updates. Link Aadhaar
          with Your Bank Account - Now Easier!
        </div>
      </div>
    </header>
  );
}
