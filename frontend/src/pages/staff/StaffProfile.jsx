import { useState, useEffect, useRef } from "react";

const avatar = "https://randomuser.me/api/portraits/men/32.jpg";

const activityLogs = [
  { date: "02 Mar 2026", module: "Billing", color: "#2563eb", icon: "💳", ip: "192.168.1.10", device: "Chrome", time: "10:15 AM", status: "blue", action: "Invoice #1042 Created" },
  { date: "01 Mar 2026", module: "Patient Records", color: "#16a34a", icon: "🗂️", ip: "192.168.1.8", device: "Chrome", time: "04:10 PM", status: "green", action: "Record #PRD-882 Updated" },
  { date: "28 Feb 2026", module: "Appointments", color: "#dc2626", icon: "📅", ip: "192.168.1.5", device: "Chrome", time: "02:30 PM", status: "orange", action: "Slot APT-201 Rescheduled" },
  { date: "27 Feb 2026", module: "Dashboard", color: "#7c3aed", icon: "📊", ip: "192.168.1.3", device: "Firefox", time: "09:00 AM", status: "purple", action: "Dashboard Accessed" },
  { date: "26 Feb 2026", module: "Settings", color: "#d97706", icon: "⚙️", ip: "192.168.1.2", device: "Chrome", time: "11:45 AM", status: "yellow", action: "Password Changed" },
  { date: "25 Feb 2026", module: "Billing", color: "#2563eb", icon: "💳", ip: "192.168.1.10", device: "Safari", time: "08:20 AM", status: "blue", action: "Report Exported" },
  { date: "24 Feb 2026", module: "Patient Records", color: "#16a34a", icon: "🗂️", ip: "192.168.1.9", device: "Chrome", time: "03:55 PM", status: "green", action: "New Record #PRD-881" },
];

const permissions = [
  { label: "Read", color: "#2563eb", icon: "👁", desc: "View all records" },
  { label: "Create", color: "#16a34a", icon: "✏️", desc: "Add new entries" },
  { label: "Edit", color: "#d97706", icon: "🖊", desc: "Modify existing data" },
  { label: "Delete", color: "#dc2626", icon: "🗑", desc: "Remove records" },
  { label: "Admin", color: "#7c3aed", icon: "⚡", desc: "Full system access" },
];

const notes = [
  { id: 1, icon: "📋", title: "Schedule meeting with James", desc: "Discuss monthly targets and Q1 forecasts.", time: "Today", pinned: true },
  { id: 2, icon: "📅", title: "On leave next Friday", desc: "29 Feb 2026 - Pre-approved.", time: "2d ago", pinned: false },
  { id: 3, icon: "🔔", title: "Complete Q1 report", desc: "Due by end of March.", time: "3d ago", pinned: false },
];

const weeklyActivity = [18, 32, 27, 45, 38, 52, 41];
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const DonutChart = ({ activePerms }) => {
  const r = 52, cx = 68, cy = 68;
  const circ = 2 * Math.PI * r;
  const pct = activePerms.length / permissions.length;
  const segments = [
    { pct: activePerms.includes(0) ? 0.20 : 0, color: "#2563eb" },
    { pct: activePerms.includes(1) ? 0.20 : 0, color: "#16a34a" },
    { pct: activePerms.includes(2) ? 0.20 : 0, color: "#d97706" },
    { pct: activePerms.includes(3) ? 0.20 : 0, color: "#dc2626" },
    { pct: activePerms.includes(4) ? 0.20 : 0, color: "#7c3aed" },
  ];
  const filled = segments.filter(s => s.pct > 0);
  const gap = 0.02;
  let offset = 0;
  const coveragePct = Math.round(pct * 100);
  return (
    <div style={{ position: "relative", width: 136, height: 136, flexShrink: 0 }}>
      <svg width="136" height="136" viewBox="0 0 136 136">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="14" />
        {segments.map((s, i) => {
          if (s.pct === 0) { offset += 0; return null; }
          const dash = (s.pct - gap) * circ;
          const dashGap = circ - dash;
          const rotation = offset * 360 - 90;
          offset += s.pct;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color}
              strokeWidth="14" strokeDasharray={`${dash} ${dashGap}`}
              transform={`rotate(${rotation}, ${cx}, ${cy})`} strokeLinecap="round"
              style={{ transition: "all 0.5s ease" }} />
          );
        })}
        <text x={cx} y={cy - 7} textAnchor="middle" style={{ fontSize: 20, fontWeight: 800, fill: "#0f172a", fontFamily: "'DM Sans', sans-serif" }}>{coveragePct}%</text>
        <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: 9.5, fill: "#64748b", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 0.5 }}>COVERAGE</text>
      </svg>
    </div>
  );
};

const MiniBarChart = () => {
  const max = Math.max(...weeklyActivity);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56, padding: "0 4px" }}>
      {weeklyActivity.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", height: Math.round((v / max) * 48), background: i === 6 ? "linear-gradient(180deg, #2563eb, #1d4ed8)" : i === 4 ? "linear-gradient(180deg, #3b82f6, #2563eb)" : "#dbeafe", borderRadius: "4px 4px 2px 2px", transition: "height 0.4s ease" }}></div>
          <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600, letterSpacing: 0.3 }}>{weekDays[i]}</span>
        </div>
      ))}
    </div>
  );
};

const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", pointerEvents: "none", zIndex: 100, letterSpacing: 0.3 }}>
          {text}
          <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", border: "5px solid transparent", borderTopColor: "#0f172a" }}></div>
        </div>
      )}
    </div>
  );
};

export default function StaffProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [logFilter, setLogFilter] = useState("All Actions");
  const [noteText, setNoteText] = useState("");
  const [notesList, setNotesList] = useState(notes);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "James Adair", role: "Admin Officer", email: "james@gmail.com",
    phone: "+1 41245 54132", location: "New York, USA", joining: "12 Jan 2024",
    department: "Operations", employeeId: "EMP-00142"
  });
  const [searchLog, setSearchLog] = useState("");
  const [twoFA, setTwoFA] = useState(true);
  const [showManagePerms, setShowManagePerms] = useState(false);
  const [activePerms, setActivePerms] = useState([0, 1, 2, 3]);
  const [notifPrefs, setNotifPrefs] = useState([true, false, true, true]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(false);
  const [toast, setToast] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const logsPerPage = 5;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const filtered = activityLogs.filter(l =>
    (logFilter === "All Actions" || l.module === logFilter) &&
    (l.module.toLowerCase().includes(searchLog.toLowerCase()) ||
      l.date.includes(searchLog) ||
      (l.action && l.action.toLowerCase().includes(searchLog.toLowerCase())))
  );

  const sorted = sortAsc ? [...filtered].reverse() : filtered;
  const totalPages = Math.ceil(sorted.length / logsPerPage);
  const paginated = sorted.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');`;

  const colors = {
    primary: "#2563eb",
    primaryLight: "#eff6ff",
    success: "#16a34a",
    danger: "#dc2626",
    warning: "#d97706",
    purple: "#7c3aed",
    text: "#0f172a",
    textSec: "#475569",
    textMuted: "#94a3b8",
    border: "#e2e8f0",
    bg: "#f8fafc",
    card: "#ffffff",
    cardHover: "#f8fafc",
  };

  const s = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #faf5ff 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "20px 24px",
      boxSizing: "border-box",
      color: colors.text,
    },
    card: {
      background: colors.card,
      border: `1px solid ${colors.border}`,
      padding: "26px 28px",
      marginBottom: 18,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: 700,
      color: colors.text,
      margin: "0 0 18px 0",
      display: "flex",
      alignItems: "center",
      gap: 8,
      letterSpacing: -0.2,
    },
    name: {
      fontSize: 26,
      fontWeight: 800,
      color: colors.text,
      margin: 0,
      letterSpacing: -0.8,
      lineHeight: 1.2,
    },
    roleLabel: {
      fontSize: 13.5,
      color: colors.textSec,
      marginTop: 4,
      fontWeight: 500,
      letterSpacing: 0.1,
    },
    badge: (color, bg, border) => ({
      background: bg,
      color,
      borderRadius: 8,
      padding: "4px 12px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "default",
      border: `1.5px solid ${border || bg}`,
      letterSpacing: 0.3,
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
    }),
    editBtn: {
      background: colors.card,
      border: `1.5px solid ${colors.border}`,
      borderRadius: 10,
      padding: "8px 16px",
      fontSize: 13,
      fontWeight: 600,
      color: colors.text,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      transition: "all 0.15s",
      letterSpacing: -0.1,
    },
    metaRow: {
      display: "flex",
      gap: 20,
      marginTop: 12,
      flexWrap: "wrap",
      color: colors.textSec,
      fontSize: 13,
      fontWeight: 500,
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 12px",
      background: colors.bg,
      borderRadius: 8,
      border: `1px solid ${colors.border}`,
    },
    tabs: {
      display: "flex",
      gap: 0,
      borderBottom: `2px solid ${colors.border}`,
      marginTop: 22,
    },
    tab: (active) => ({
      padding: "10px 22px",
      fontSize: 13.5,
      fontWeight: active ? 700 : 500,
      color: active ? colors.primary : colors.textSec,
      border: "none",
      background: "none",
      cursor: "pointer",
      borderBottom: active ? `2.5px solid ${colors.primary}` : "2.5px solid transparent",
      marginBottom: -2,
      transition: "all 0.18s",
      letterSpacing: -0.1,
    }),
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 },
    infoRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: colors.textSec, fontSize: 13.5, fontWeight: 500 },
    statNum: { fontSize: 30, fontWeight: 800, color: colors.text, letterSpacing: -1.2, lineHeight: 1 },
    statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 },
    btn: (variant) => ({
      background: variant === "primary" ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : variant === "green" ? "linear-gradient(135deg, #16a34a, #15803d)" : variant === "danger" ? "linear-gradient(135deg, #dc2626, #b91c1c)" : colors.card,
      color: variant === "outline" ? colors.primary : variant === "ghost" ? colors.textSec : "#fff",
      border: variant === "outline" ? `1.5px solid #bfdbfe` : variant === "ghost" ? `1px solid ${colors.border}` : "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: (variant === "primary" || variant === "green") ? "0 2px 12px rgba(37,99,235,0.25)" : "none",
      transition: "all 0.18s",
      letterSpacing: -0.1,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    }),
    tableHead: {
      background: "#f8fafc",
    },
    tableCell: {
      padding: "12px 14px",
      fontSize: 13,
      color: colors.textSec,
      borderBottom: `1px solid #f1f5f9`,
      fontWeight: 500,
    },
    tableHeadCell: {
      padding: "11px 14px",
      fontSize: 10.5,
      color: colors.textMuted,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.9,
      borderBottom: `2px solid ${colors.border}`,
      background: "#f8fafc",
    },
    dot: (color) => ({
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: color,
      display: "inline-block",
      marginRight: 6,
      flexShrink: 0,
    }),
    input: {
      width: "100%",
      border: `1.5px solid ${colors.border}`,
      borderRadius: 10,
      padding: "9px 14px",
      fontSize: 13,
      color: colors.text,
      outline: "none",
      boxSizing: "border-box",
      background: colors.card,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      transition: "border-color 0.15s",
    },
    noteCard: (pinned) => ({
      background: pinned ? "#eff6ff" : colors.bg,
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 10,
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      border: `1px solid ${pinned ? "#bfdbfe" : colors.border}`,
      transition: "all 0.15s",
    }),
    securityRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      padding: "12px 14px",
      background: colors.bg,
      borderRadius: 12,
      border: `1px solid ${colors.border}`,
    },
    toggle: (on) => ({
      width: 42,
      height: 23,
      borderRadius: 12,
      background: on ? colors.primary : "#cbd5e1",
      position: "relative",
      cursor: "pointer",
      transition: "background 0.2s",
      flexShrink: 0,
    }),
    toggleKnob: (on) => ({
      position: "absolute",
      top: 2.5,
      left: on ? 21 : 2.5,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
      transition: "left 0.2s",
    }),
    progressTrack: {
      height: 8,
      borderRadius: 8,
      background: "#e2e8f0",
      overflow: "hidden",
      marginBottom: 6,
    },
    progressFill: (pct, color) => ({
      height: "100%",
      borderRadius: 8,
      width: `${pct}%`,
      background: color || `linear-gradient(90deg, ${colors.primary}, #60a5fa)`,
      transition: "width 0.5s ease",
    }),
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    setNotesList([{ id: Date.now(), icon: "📝", title: noteText, desc: "", time: "Just now", pinned: false }, ...notesList]);
    setNoteText("");
    showToast("Note added");
  };

  const togglePinNote = (id) => {
    setNotesList(notesList.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const coveragePct = Math.round((activePerms.length / permissions.length) * 100);

  return (
    <>
      <style>{fonts}</style>
      <style>{`
        * { box-sizing: border-box; }
        button:hover { opacity: 0.92; transform: translateY(-0.5px); }
        input:focus { border-color: #93c5fd !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.08) !important; }
        select:focus { outline: none; border-color: #93c5fd !important; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #f1f5f9; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .row-hover:hover { background: #f8fafc !important; }
        .log-module-badge { transition: all 0.15s; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 9999,
          background: toast.type === "success" ? "#16a34a" : "#dc2626",
          color: "#fff", padding: "12px 20px", borderRadius: 12,
          fontSize: 13.5, fontWeight: 600, letterSpacing: -0.1,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          animation: "slideIn 0.25s ease",
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={s.page}>

        {/* ─── PROFILE HEADER ─── */}
        <div className="box_shadow" style={s.card}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 22, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <img src={avatar} alt="avatar" style={{ width: 88, height: 88, borderRadius: 18, objectFit: "cover", border: `3px solid ${colors.border}` }} />
              <div style={{ position: "absolute", bottom: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: "#16a34a", border: "2.5px solid #fff" }}></div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h1 style={s.name}>{profileData.name}</h1>
                <span style={s.badge("#16a34a", "#f0fdf4", "#bbf7d0")}>● Active</span>
                <span style={s.badge("#7c3aed", "#f5f3ff", "#ddd6fe")}>Admin</span>
                <span style={{ ...s.badge("#475569", "#f8fafc", colors.border), marginLeft: 0 }}>ID: {profileData.employeeId}</span>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                  <button style={s.editBtn} onClick={() => setEditProfile(!editProfile)}>
                    {editProfile ? "✕ Cancel" : "✏ Edit Profile"}
                  </button>
                  <button style={s.btn("primary")} onClick={() => showToast("Profile shared!")}>↗ Share</button>
                </div>
              </div>
              <div style={s.roleLabel}>{profileData.role} · {profileData.department}</div>
              <div style={s.metaRow}>
                <span style={s.metaItem}>✉️ {profileData.email}</span>
                <span style={s.metaItem}>📞 {profileData.phone}</span>
                <span style={s.metaItem}>📍 {profileData.location}</span>
                <span style={s.metaItem}>📅 Joined {profileData.joining}</span>
              </div>
            </div>
          </div>

          {editProfile && (
            <div style={{ marginTop: 20, padding: "22px", background: colors.bg, borderRadius: 14, border: `1px solid ${colors.border}`, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {Object.entries(profileData).map(([k, v]) => (
                <div key={k}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: 0.6, display: "block", marginBottom: 5 }}>{k}</label>
                  <input style={s.input} value={v} onChange={e => setProfileData({ ...profileData, [k]: e.target.value })} />
                </div>
              ))}
              <div style={{ gridColumn: "1/-1", display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
                <button style={s.btn("ghost")} onClick={() => setEditProfile(false)}>Cancel</button>
                <button style={s.btn("primary")} onClick={() => { setEditProfile(false); showToast("Profile saved successfully!"); }}>✓ Save Changes</button>
              </div>
            </div>
          )}

          <div style={s.tabs}>
            {[["overview", "Overview"], ["activitylogs", "Activity Logs"], ["settings", "Settings"]].map(([t, label]) => (
              <button key={t} style={s.tab(activeTab === t)} onClick={() => setActiveTab(t)}>{label}</button>
            ))}
          </div>
        </div>

        {/* ─── OVERVIEW TAB ─── */}
        {activeTab === "overview" && (
          <>
            <div style={s.grid3}>
              {/* Contact Info */}
              <div style={s.card} className="box_shadow" >
                <h3 style={s.cardTitle}>✉️ Contact Information</h3>
                {[
                  ["✉️", "Email", profileData.email],
                  ["📞", "Phone", profileData.phone],
                  ["📍", "Location", profileData.location],
                  ["📅", "Joined", profileData.joining],
                  ["🏢", "Department", profileData.department],
                ].map(([icon, label, val]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "9px 12px", background: colors.bg, borderRadius: 10, border: `1px solid ${colors.border}` }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 10.5, color: colors.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                      <div style={{ fontSize: 13, color: colors.text, fontWeight: 600, marginTop: 1 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Role & Permissions */}
              <div style={s.card} className="box_shadow" >
                <h3 style={s.cardTitle}>🛡 Role & Permissions</h3>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Assigned Role</div>
                    <span style={{ ...s.badge("#7c3aed", "#f5f3ff", "#ddd6fe"), marginBottom: 14, display: "inline-flex" }}>⚡ Admin Officer</span>
                    <div style={{ fontSize: 11, color: colors.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, margin: "14px 0 8px" }}>Module Permissions</div>
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
                      {permissions.map((p, i) => (
                        <Tooltip text={p.desc} key={i}>
                          <div
                            onClick={() => setActivePerms(activePerms.includes(i) ? activePerms.filter(x => x !== i) : [...activePerms, i])}
                            style={{
                              width: 36, height: 36, borderRadius: 10,
                              background: activePerms.includes(i) ? p.color + "18" : "#f1f5f9",
                              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                              cursor: "pointer", transition: "all 0.18s",
                              border: activePerms.includes(i) ? `1.5px solid ${p.color}` : `1.5px solid ${colors.border}`,
                            }}>
                            {p.icon}
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                    <div style={s.progressTrack}>
                      <div style={s.progressFill(coveragePct)}></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <span style={{ fontSize: 11.5, color: colors.textSec, fontWeight: 600 }}>{coveragePct}% permission coverage</span>
                      <span style={{ fontSize: 11.5, color: colors.textMuted, fontWeight: 500 }}>{activePerms.length}/{permissions.length} active</span>
                    </div>
                    {showManagePerms && (
                      <div style={{ padding: 14, background: colors.bg, borderRadius: 12, border: `1px solid ${colors.border}`, marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: colors.textMuted, marginBottom: 10 }}>Toggle Permissions</div>
                        {permissions.map((p, i) => (
                          <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}>
                            <div style={s.toggle(activePerms.includes(i))} onClick={() => setActivePerms(activePerms.includes(i) ? activePerms.filter(x => x !== i) : [...activePerms, i])}>
                              <div style={s.toggleKnob(activePerms.includes(i))}></div>
                            </div>
                            <span style={{ ...s.dot(p.color) }}></span>
                            <span style={{ fontSize: 13, color: colors.text, fontWeight: 600 }}>{p.label}</span>
                            <span style={{ fontSize: 11.5, color: colors.textMuted, marginLeft: 2 }}>— {p.desc}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    <button style={s.btn(showManagePerms ? "ghost" : "primary")} onClick={() => setShowManagePerms(!showManagePerms)}>
                      {showManagePerms ? "✕ Close" : "⚡ Manage Permissions"}
                    </button>
                  </div>
                  <DonutChart activePerms={activePerms} />
                </div>
              </div>

              {/* Activity Stats */}
              <div style={s.card} className="box_shadow" >
                <h3 style={s.cardTitle}>📊 Activity Stats</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {[
                    ["Total Logins", "145", null, colors.primary],
                    ["Actions", "342", null, "#7c3aed"],
                    ["Last Login", "02 Mar", "10:15 AM", "#16a34a"],
                    ["Device", "Chrome", "Windows 11", "#d97706"],
                  ].map(([label, val, sub, color]) => (
                    <div key={label} style={{ padding: "12px 14px", background: color + "0d", borderRadius: 12, border: `1px solid ${color}22` }}>
                      <div style={{ fontSize: 10.5, color: colors.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color, letterSpacing: -0.8, lineHeight: 1.1 }}>{val}</div>
                      {sub && <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2, fontWeight: 500 }}>{sub}</div>}
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: colors.textSec, textTransform: "uppercase", letterSpacing: 0.5 }}>Weekly Activity</span>
                    <span style={{ fontSize: 11, color: colors.textMuted }}>Last 7 days</span>
                  </div>
                  <MiniBarChart />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <button style={s.btn("outline")}>Analytics</button>
                  <button style={s.btn("primary")} onClick={() => setActiveTab("activitylogs")}>View Logs →</button>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 18 }}>
              {/* Security */}
              <div style={s.card} className="box_shadow" >
                <h3 style={s.cardTitle}>🔐 Security</h3>
                {[
                  ["🔑", "Last Password Change", "25 Feb 2026", null, null],
                  ["🔐", "Two-Factor Auth", twoFA ? "Enabled" : "Disabled", twoFA ? "#16a34a" : "#dc2626", true],
                  ["🔔", "Security Alerts", "3 Active", colors.primary, null],
                  ["📍", "Session IP", "192.168.1.10", colors.textSec, null],
                ].map(([icon, label, val, vc, isToggle], i) => (
                  <div key={i} style={s.securityRow}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11.5, color: colors.textMuted, fontWeight: 600, letterSpacing: 0.2 }}>{label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: vc || colors.text, marginTop: 1 }}>{val}</div>
                    </div>
                    {isToggle && (
                      <div style={s.toggle(twoFA)} onClick={() => { setTwoFA(!twoFA); showToast(`2FA ${!twoFA ? "enabled" : "disabled"}`); }}>
                        <div style={s.toggleKnob(twoFA)}></div>
                      </div>
                    )}
                  </div>
                ))}
                <button style={{ ...s.btn("outline"), width: "100%", justifyContent: "center", marginTop: 6 }} onClick={() => setActiveTab("settings")}>Manage Security →</button>
              </div>

              {/* Activity Logs mini */}
              <div style={s.card} className="box_shadow" >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <h3 style={{ ...s.cardTitle, margin: 0 }}>📋 Recent Activity</h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input placeholder="Search..." style={{ ...s.input, width: 120, padding: "7px 12px" }} value={searchLog} onChange={e => setSearchLog(e.target.value)} />
                    <select style={{ ...s.input, width: 138, cursor: "pointer" }} value={logFilter} onChange={e => setLogFilter(e.target.value)}>
                      <option>All Actions</option>
                      <option>Billing</option>
                      <option>Patient Records</option>
                      <option>Appointments</option>
                    </select>
                  </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Date", "Module", "Action", "Time"].map(h => (
                        <th key={h} style={s.tableHeadCell}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.slice(0, 5).map((l, i) => (
                      <tr key={i} className="row-hover" style={{ background: hoveredRow === i ? "#f8fafc" : "#fff", cursor: "default" }}
                        onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)}>
                        <td style={s.tableCell}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={s.dot(l.color)}></span>
                            <span style={{ fontSize: 12.5, fontWeight: 600, color: colors.text }}>{l.date}</span>
                          </div>
                        </td>
                        <td style={s.tableCell}>
                          <span style={{ background: l.color + "15", borderRadius: 7, padding: "3px 10px", color: l.color, fontWeight: 700, fontSize: 11.5, letterSpacing: 0.1 }}>
                            {l.module}
                          </span>
                        </td>
                        <td style={{ ...s.tableCell, fontSize: 12, color: colors.textSec, maxWidth: 160 }}>{l.action}</td>
                        <td style={{ ...s.tableCell, fontSize: 12, fontFamily: "'DM Mono', monospace", color: colors.textMuted }}>{l.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ textAlign: "right", marginTop: 12 }}>
                  <button style={{ background: "none", border: "none", color: colors.primary, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: -0.1 }} onClick={() => setActiveTab("activitylogs")}>
                    View all {activityLogs.length} events →
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div style={s.card} className="box_shadow" >
                <h3 style={s.cardTitle}>📝 Notes</h3>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <input placeholder="Add a note..." style={{ ...s.input, flex: 1 }} value={noteText}
                    onChange={e => setNoteText(e.target.value)} onKeyDown={e => e.key === "Enter" && addNote()} />
                  <button style={{ ...s.btn("primary"), padding: "9px 14px", flexShrink: 0 }} onClick={addNote}>+</button>
                </div>
                <div style={{ maxHeight: 370, overflowY: "auto" }}>
                  {notesList.sort((a, b) => b.pinned - a.pinned).map(n => (
                    <div key={n.id} style={s.noteCard(n.pinned)}>
                      <span style={{ fontSize: 18 }}>{n.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, lineHeight: 1.3 }}>{n.title}</div>
                        {n.desc && <div style={{ fontSize: 12, color: colors.textSec, marginTop: 2 }}>{n.desc}</div>}
                        <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 4, fontWeight: 500 }}>{n.time}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <button onClick={() => togglePinNote(n.id)} style={{ background: "none", border: "none", cursor: "pointer", color: n.pinned ? colors.primary : colors.textMuted, fontSize: 13 }} title={n.pinned ? "Unpin" : "Pin"}>📌</button>
                        <button onClick={() => setNotesList(notesList.filter(x => x.id !== n.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#cbd5e1", fontSize: 16, lineHeight: 1 }}>×</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─── ACTIVITY LOGS TAB ─── */}
        {activeTab === "activitylogs" && (
          <div style={s.card} className="box_shadow" >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ ...s.cardTitle, margin: 0 }}>📋 Full Activity Logs</h3>
                <div style={{ fontSize: 12.5, color: colors.textMuted, marginTop: 4, fontWeight: 500 }}>{filtered.length} events found</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input placeholder="Search keyword..." style={{ ...s.input, width: 180 }} value={searchLog} onChange={e => { setSearchLog(e.target.value); setCurrentPage(1); }} />
                <select style={{ ...s.input, width: 160, cursor: "pointer" }} value={logFilter} onChange={e => { setLogFilter(e.target.value); setCurrentPage(1); }}>
                  <option>All Actions</option>
                  <option>Billing</option>
                  <option>Patient Records</option>
                  <option>Appointments</option>
                  <option>Dashboard</option>
                  <option>Settings</option>
                </select>
                <button style={s.btn("primary")} onClick={() => setSortAsc(!sortAsc)}>{sortAsc ? "↑ Oldest" : "↓ Newest"}</button>
                <button style={s.btn("ghost")} onClick={() => { setSearchLog(""); setLogFilter("All Actions"); setCurrentPage(1); }}>✕ Clear</button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
              {[
                ["Total Events", activityLogs.length, colors.primary, "📋"],
                ["This Week", 3, "#16a34a", "📅"],
                ["Unique IPs", 4, "#7c3aed", "🌐"],
                ["Alerts", 1, "#dc2626", "🔔"],
              ].map(([label, val, c, icon]) => (
                <div key={label} style={{ flex: 1, minWidth: 110, background: c + "0e", border: `1.5px solid ${c}28`, borderRadius: 14, padding: "14px 18px" }}>
                  <div style={{ fontSize: 11, color: c, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{icon} {label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: c, letterSpacing: -1 }}>{val}</div>
                </div>
              ))}
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["#", "Date", "Module", "Action", "IP Address", "Device", "Time"].map(h => (
                    <th key={h} style={s.tableHeadCell}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((l, i) => (
                  <tr key={i} className="row-hover">
                    <td style={{ ...s.tableCell, color: colors.textMuted, fontWeight: 600, width: 36 }}>{(currentPage - 1) * logsPerPage + i + 1}</td>
                    <td style={s.tableCell}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={s.dot(l.color)}></span>
                        <span style={{ fontWeight: 600, color: colors.text, fontSize: 13 }}>{l.date}</span>
                      </div>
                    </td>
                    <td style={s.tableCell}>
                      <span style={{ background: l.color + "15", borderRadius: 7, padding: "4px 11px", color: l.color, fontWeight: 700, fontSize: 11.5 }}>{l.module}</span>
                    </td>
                    <td style={{ ...s.tableCell, fontSize: 12.5, color: colors.textSec, fontWeight: 500 }}>{l.action}</td>
                    <td style={{ ...s.tableCell, fontFamily: "'DM Mono', monospace", fontSize: 12, color: colors.textMuted }}>{l.ip}</td>
                    <td style={{ ...s.tableCell, fontSize: 13 }}>🌐 {l.device}</td>
                    <td style={{ ...s.tableCell, fontFamily: "'DM Mono', monospace", fontSize: 12, color: colors.textMuted }}>{l.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, paddingTop: 16, borderTop: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 12.5, color: colors.textMuted, fontWeight: 500 }}>
                  Showing {(currentPage - 1) * logsPerPage + 1}–{Math.min(currentPage * logsPerPage, sorted.length)} of {sorted.length}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ ...s.btn("ghost"), padding: "7px 14px" }} disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>← Prev</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setCurrentPage(p)} style={{
                      width: 34, height: 34, borderRadius: 8, border: `1.5px solid ${p === currentPage ? colors.primary : colors.border}`,
                      background: p === currentPage ? colors.primary : "#fff", color: p === currentPage ? "#fff" : colors.textSec,
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}>{p}</button>
                  ))}
                  <button style={{ ...s.btn("ghost"), padding: "7px 14px" }} disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>Next →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── SETTINGS TAB ─── */}
{activeTab === "settings" && (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>

    {/* LEFT COLUMN */}
    <div style={s.card} className="box_shadow" >
      <h3 style={s.cardTitle}>👤 Profile Settings</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 22 }}>
        {Object.entries(profileData).map(([k, v]) => (
          <div key={k} style={{ marginBottom: 14 }}>
            <label
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 0.6,
                display: "block",
                marginBottom: 6
              }}
            >
              {k}
            </label>

            <input
              style={s.input}
              value={v}
              onChange={e =>
                setProfileData({ ...profileData, [k]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button
          style={s.btn("ghost")}
          onClick={() => showToast("Changes discarded", "error")}
        >
          Discard
        </button>
        <button
          style={s.btn("primary")}
          onClick={() => showToast("Profile saved!")}
        >
          ✓ Save Changes
        </button>
      </div>
    </div>

    {/* RIGHT COLUMN */}
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* SECURITY */}
      <div style={s.card} className="box_shadow" >
        <h3 style={s.cardTitle}>🔐 Security Settings</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: 0.6,
            display: "block",
            marginBottom: 6
          }}>
            Current Password
          </label>
          <input type="password" style={s.input} placeholder="Enter current password" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: 0.6,
            display: "block",
            marginBottom: 6
          }}>
            New Password
          </label>
          <input type="password" style={s.input} placeholder="Enter new password" />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: 0.6,
            display: "block",
            marginBottom: 6
          }}>
            Confirm Password
          </label>
          <input type="password" style={s.input} placeholder="Confirm new password" />
        </div>

        <div style={{ ...s.securityRow, justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: colors.text }}>
              Two-Factor Authentication
            </div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
              Add an extra layer of security to your account
            </div>
          </div>

          <div
            style={s.toggle(twoFA)}
            onClick={() => {
              setTwoFA(!twoFA);
              showToast(`2FA ${!twoFA ? "enabled" : "disabled"}`);
            }}
          >
            <div style={s.toggleKnob(twoFA)}></div>
          </div>
        </div>

        <button
          style={s.btn("primary")}
          onClick={() => showToast("Security settings updated!")}
        >
          🔐 Update Security
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div style={s.card} className="box_shadow" >
        <h3 style={s.cardTitle}>🔔 Notification Preferences</h3>

        {[ 
          ["Email Notifications", "Receive updates via email"],
          ["SMS Alerts", "Get text messages for critical events"],
          ["Login Alerts", "Notify on new device logins"],
          ["Security Reports", "Weekly security digest"],
        ].map(([label, desc], i) => (
          <div key={i} style={{ ...s.securityRow, justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: colors.text }}>
                {label}
              </div>
              <div style={{ fontSize: 11.5, color: colors.textMuted, marginTop: 2 }}>
                {desc}
              </div>
            </div>

            <div
              style={s.toggle(notifPrefs[i])}
              onClick={() => {
                const n = [...notifPrefs];
                n[i] = !n[i];
                setNotifPrefs(n);
                showToast(`${label} ${!notifPrefs[i] ? "enabled" : "disabled"}`);
              }}
            >
              <div style={s.toggleKnob(notifPrefs[i])}></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
)}
</div>
    </>
  );
}