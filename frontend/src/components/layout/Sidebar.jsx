import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../constants/sidebarLinks";
import "./styles.css";

/* ─── Raw SVG shapes (not components, just functions returning SVG JSX) ── */
const svgDashboard = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.6"/>
  </svg>
);

const svgApps = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke={c} strokeWidth="1.6"/>
    <rect x="9" y="1" width="6" height="6" rx="1" stroke={c} strokeWidth="1.6"/>
    <rect x="1" y="9" width="6" height="6" rx="1" stroke={c} strokeWidth="1.6"/>
    <rect x="9" y="9" width="6" height="6" rx="1" stroke={c} strokeWidth="1.6"/>
  </svg>
);

const svgLayout = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="5" rx="1.5" stroke={c} strokeWidth="1.6"/>
    <rect x="1" y="8" width="6" height="7" rx="1.5" stroke={c} strokeWidth="1.6"/>
    <rect x="9" y="8" width="6" height="7" rx="1.5" stroke={c} strokeWidth="1.6"/>
  </svg>
);

const svgUser = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5.5" r="3" stroke={c} strokeWidth="1.6"/>
    <path d="M2 14.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const svgChart = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="8" width="3" height="7" rx="1" stroke={c} strokeWidth="1.6"/>
    <rect x="6" y="5" width="3" height="10" rx="1" stroke={c} strokeWidth="1.6"/>
    <rect x="11" y="2" width="3" height="13" rx="1" stroke={c} strokeWidth="1.6"/>
  </svg>
);

const svgSettings = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2.5" stroke={c} strokeWidth="1.6"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4"
      stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const svgFile = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6L9 1z"
      stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M9 1v5h5" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M5 9h6M5 12h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const svgHospital = (c) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="5" width="12" height="10" rx="1" stroke={c} strokeWidth="1.6"/>
    <path d="M5 15V10h6v5" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M8 7v3M6.5 8.5h3" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M1 5L8 1l7 4" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Ordered pool for index fallback
const POOL = [svgDashboard, svgApps, svgLayout, svgUser, svgChart, svgSettings, svgFile, svgHospital];

// Key → svg function map
const KEY_MAP = {
  dashboard: svgDashboard, home: svgDashboard,
  applications: svgApps, application: svgApps, apps: svgApps, app: svgApps,
  layouts: svgLayout, layout: svgLayout,
  doctors: svgUser, doctor: svgUser, patients: svgUser, patient: svgUser, staff: svgUser, users: svgUser,
  reports: svgChart, analytics: svgChart, statistics: svgChart,
  settings: svgSettings, config: svgSettings,
  documents: svgFile, files: svgFile,
  clinic: svgHospital, hospital: svgHospital,
};

// Returns exactly one SVG element — never a component
function getIcon(sectionKey, index, isOpen) {
  const color = isOpen ? "#4f8ef7" : "#6b7280";
  const fn = KEY_MAP[sectionKey?.toLowerCase()?.trim()] ?? POOL[index % POOL.length];
  return fn(color);
}

/* ─── Chevrons ───────────────────────────────── */
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3l4 4-4 4" stroke="#b0b8c9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="#4f8ef7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5 3v10M3 5l2-2 2 2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 13V3M9 11l2 2 2-2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Sidebar ────────────────────────────────── */
export default function Sidebar() {
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="sidebar-container">

      {/* Clinic Card */}
      <div className="sidebar-clinic-card">
        <div className="clinic-logo-wrap">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#4f8ef7"/>
            <path d="M7 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="11" cy="14" r="2" fill="white"/>
          </svg>
        </div>
        <div className="clinic-info">
          <p className="clinic-name">Trustcare Clinic</p>
          <p className="clinic-city">Lasvegas</p>
        </div>
        <button className="clinic-sort-btn" type="button"><SortIcon /></button>
      </div>

      {/* Nav */}
      <ul className="sidebar-list">
        {SIDEBAR_LINKS.map((section, idx) => {
          const isOpen = !!open[section.key];
          return (
            <div key={section.key}>

              {section.groupLabel && (
                <p className="sidebar-group-label">{section.groupLabel}</p>
              )}

              <li
                className={`sidebar-nav-item${isOpen ? " sidebar-nav-open" : ""}`}
                onClick={() => toggle(section.key)}
              >
                {/* SINGLE icon — direct call, not a component */}
                <span className="sidebar-nav-icon">
                  {getIcon(section.key, idx, isOpen)}
                </span>
                <span className="sidebar-nav-title">{section.title}</span>
                <span className="sidebar-nav-chevron">
                  {isOpen ? <ChevronDown /> : <ChevronRight />}
                </span>
              </li>

              {isOpen && (
                <ul className="sidebar-submenu">
                  {section.children.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.to}
                      className={({ isActive }) =>
                        "sidebar-sub-link" + (isActive ? " sidebar-sub-active" : "")
                      }
                    >
                      <span className="sub-dot" />
                      {item.label}
                    </NavLink>
                  ))}
                </ul>
              )}

            </div>
          );
        })}
      </ul>
    </div>
  );
}