import React, { useState } from "react";
import "./styles.css";

/* ────────────────────────────────────────────────────────────
   All icons are simple, clean SVGs — no library needed
──────────────────────────────────────────────────────────── */

const IconLogo = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect width="26" height="26" rx="6" fill="#4f8ef7" />
    <path d="M8 13h10M13 8v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="6.5" cy="6.5" r="5" stroke="#9ca3af" strokeWidth="1.6" />
    <path d="M10.5 10.5L13.5 13.5" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconSparkle = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="white" />
  </svg>
);

const IconArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBell = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M8.5 2C6.01 2 4 4.01 4 6.5V10L2.5 12h12L13 10V6.5C13 4.01 10.99 2 8.5 2Z" stroke="#6b7280" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6.5 12.5C6.5 13.6 7.4 14.5 8.5 14.5S10.5 13.6 10.5 12.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconGear = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="2.5" stroke="#6b7280" strokeWidth="1.5" />
    <path d="M8.5 1v2M8.5 14v2M1 8.5h2M14 8.5h2M3.1 3.1l1.4 1.4M12.5 12.5l1.4 1.4M3.1 13.9l1.4-1.4M12.5 4.5l1.4-1.4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5 6 6 0 1 0 13.5 9.5Z" stroke="#6b7280" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IconRefresh = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 8A6 6 0 1 1 9 2.1" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 1v3.5H12.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="7.5" r="4" fill="#c4c9d4" />
    <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" fill="#c4c9d4" />
  </svg>
);

/* ────────────────────────────────────────────────────────────
   TopBar Component
──────────────────────────────────────────────────────────── */
export default function TopBar() {
  const [dark, setDark] = useState(false);

  return (
    <header className="topbar box_shadow" >

      {/* LEFT — Logo + back arrow */}
      <div className="tb-left">
        <div className="tb-brand">
          <IconLogo />
          <span className="tb-brand-name">Drafticode</span>
        </div>
        <button className="tb-icon-btn" title="Back">
          <IconChevronLeft />
        </button>
      </div> 

      {/* CENTER — Search */}
      <div className="tb-search-wrap">
        <div className="tb-search">
          <IconSearch />
          <input className="tb-search-input" type="text" placeholder="Search" />
          <span className="tb-kbd">⌘K</span>
        </div>
      </div>

      {/* RIGHT — Actions */}
      <div className="tb-right">

        <button className="tb-ai-btn">
          <IconSparkle />
          <span>AI Assistance</span>
          <IconArrowUpRight />
        </button>

        <button className="tb-icon-btn" title="Notifications">
          <IconBell />
        </button>

        <button className="tb-icon-btn" title="Settings">
          <IconGear />
        </button>

        <button className="tb-icon-btn" title="Dark Mode" onClick={() => setDark(!dark)}>
          <IconMoon />
        </button>

        <button className="tb-icon-btn" title="Refresh">
          <IconRefresh />
        </button>

        <div className="tb-avatar" title="Profile">
          <div className="tb-avatar-img">
            <IconUser />
          </div>
          <span className="tb-avatar-dot" />
        </div>

      </div>
    </header>
  );
}