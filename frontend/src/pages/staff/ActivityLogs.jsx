import React, { useState, useMemo, useEffect } from "react";

const LOGS_DATA = [
  { id: 1,  staff: "James Adair",    role: "Admin",     action: "Login",   module: "Dashboard",       date: "2026-03-02", time: "10:15 AM", ip: "192.168.1.42", duration: "2m 34s",  status: "success"  },
  { id: 2,  staff: "Adam Milne",     role: "Reception", action: "Create",  module: "Appointments",    date: "2026-03-02", time: "09:40 AM", ip: "192.168.1.18", duration: "0m 12s",  status: "success"  },
  { id: 3,  staff: "Richard Clark",  role: "Admin",     action: "Edit",    module: "Billing",         date: "2026-03-01", time: "04:10 PM", ip: "192.168.1.9",  duration: "5m 03s",  status: "success"  },
  { id: 4,  staff: "Robert Reid",    role: "Admin",     action: "Delete",  module: "Users",           date: "2026-03-01", time: "02:30 PM", ip: "192.168.1.42", duration: "0m 04s",  status: "warning"  },
  { id: 5,  staff: "Dottie Jeny",    role: "Nurse",     action: "View",    module: "Patient Records", date: "2026-02-28", time: "11:20 AM", ip: "10.0.0.55",    duration: "8m 47s",  status: "success"  },
  { id: 6,  staff: "Priya Nair",     role: "Doctor",    action: "Edit",    module: "Patient Records", date: "2026-02-28", time: "09:05 AM", ip: "10.0.0.72",    duration: "3m 21s",  status: "success"  },
  { id: 7,  staff: "Sam Carter",     role: "Reception", action: "Logout",  module: "Dashboard",       date: "2026-02-27", time: "06:00 PM", ip: "192.168.1.18", duration: "0m 01s",  status: "success"  },
  { id: 8,  staff: "James Adair",    role: "Admin",     action: "Delete",  module: "Billing",         date: "2026-02-27", time: "03:45 PM", ip: "192.168.1.42", duration: "0m 02s",  status: "critical" },
  { id: 9,  staff: "Lena Brooks",    role: "Nurse",     action: "View",    module: "Lab Results",     date: "2026-02-27", time: "01:10 PM", ip: "10.0.0.33",    duration: "12m 08s", status: "success"  },
  { id: 10, staff: "Adam Milne",     role: "Reception", action: "Create",  module: "Appointments",    date: "2026-02-26", time: "10:55 AM", ip: "192.168.1.18", duration: "0m 09s",  status: "success"  },
  { id: 11, staff: "Richard Clark",  role: "Admin",     action: "Login",   module: "Dashboard",       date: "2026-02-26", time: "08:30 AM", ip: "192.168.1.9",  duration: "1m 55s",  status: "success"  },
  { id: 12, staff: "Priya Nair",     role: "Doctor",    action: "View",    module: "Prescriptions",   date: "2026-02-25", time: "02:15 PM", ip: "10.0.0.72",    duration: "4m 30s",  status: "success"  },
];

const ACTION_META = {
  Login:   { color: "#15803D", bg: "#F0FDF4", border: "#86EFAC", icon: "→", glyph: "AUTH"  },
  Logout:  { color: "#475569", bg: "#F1F5F9", border: "#CBD5E1", icon: "←", glyph: "EXIT"  },
  Create:  { color: "#0369A1", bg: "#F0F9FF", border: "#7DD3FC", icon: "+", glyph: "NEW"   },
  Edit:    { color: "#B45309", bg: "#FFFBEB", border: "#FCD34D", icon: "~", glyph: "MOD"   },
  Delete:  { color: "#B91C1C", bg: "#FEF2F2", border: "#FCA5A5", icon: "×", glyph: "DEL"   },
  View:    { color: "#6D28D9", bg: "#F5F3FF", border: "#C4B5FD", icon: "◉", glyph: "READ"  },
};

const ROLE_COLOR = {
  Admin:     "#C2410C",
  Reception: "#0369A1",
  Nurse:     "#6D28D9",
  Doctor:    "#047857",
};

const STATUS_META = {
  success:  { label: "OK",       color: "#15803D", bg: "#F0FDF4", border: "#86EFAC", pulse: false },
  warning:  { label: "WARN",     color: "#B45309", bg: "#FFFBEB", border: "#FCD34D", pulse: true  },
  critical: { label: "CRITICAL", color: "#B91C1C", bg: "#FEF2F2", border: "#FCA5A5", pulse: true  },
};

function Avatar({ name, role }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const color = ROLE_COLOR[role] || "#475569";
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 9, flexShrink: 0,
      background: color + "1A", border: `1.5px solid ${color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 700, color,
      fontFamily: "'JetBrains Mono', monospace",
    }}>{initials}</div>
  );
}

function ActionBadge({ action }) {
  const m = ACTION_META[action] || { color: "#475569", bg: "#F1F5F9", border: "#CBD5E1", icon: "?", glyph: "???" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px 4px 8px", borderRadius: 6,
      background: m.bg, border: `1.5px solid ${m.border}`,
      fontSize: 11, fontWeight: 700, color: m.color,
      fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em", whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: 12, lineHeight: 1 }}>{m.icon}</span>
      {m.glyph}
    </span>
  );
}

function StatusDot({ status }) {
  const m = STATUS_META[status] || STATUS_META.success;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 20,
      background: m.bg, border: `1.5px solid ${m.border}`,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: m.color,
        display: "inline-block", flexShrink: 0,
        animation: m.pulse ? "statusPulse 1.6s ease-in-out infinite" : "none",
      }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: m.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>{m.label}</span>
    </span>
  );
}

function TinyBar({ pct, color }) {
  return (
    <div style={{ width: 44, height: 3, background: "#E2E8F0", borderRadius: 2, overflow: "hidden", marginTop: 4 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2 }} />
    </div>
  );
}

function StatPill({ label, value, color, sub }) {
  return (
    <div className="box_shadow" style={{
      background: "#fff", border: "1.5px solid #E2E8F0", borderTop: `3px solid ${color}`,
       padding: "14px 18px", flex: "1 1 100px",
    }}>
      <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 5 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function ExpandedRow({ log }) {
  return (
    <div style={{
      padding: "16px 20px 16px 62px", background: "#F8FAFF",
      borderTop: "1px dashed #CBD5E1",
      display: "flex", gap: 32, flexWrap: "wrap",
      animation: "expandIn 0.18s ease",
    }}>
      {[
        { label: "IP Address", value: log.ip,      icon: "🌐" },
        { label: "Session",    value: log.duration, icon: "⏱" },
        { label: "Status",     value: <StatusDot status={log.status} />, icon: "◎" },
        { label: "Log ID",     value: `#LOG-${String(log.id).padStart(4,"0")}`, icon: "🔑" },
        { label: "Full Date",  value: `${log.date} ${log.time}`, icon: "📅" },
      ].map(({ label, value, icon }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.07em" }}>{icon} {label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0F172A", fontFamily: typeof value === "string" ? "'JetBrains Mono', monospace" : "inherit" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ActivityLogs() {
  const [search, setSearch]             = useState("");
  const [roleFilter, setRoleFilter]     = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [currentPage, setCurrentPage]   = useState(1);
  const [expandedRow, setExpandedRow]   = useState(null);
  const [sortCol, setSortCol]           = useState("date");
  const [sortDir, setSortDir]           = useState("desc");
  const [liveCount, setLiveCount]       = useState(LOGS_DATA.length);
  const rowsPerPage = 6;

  useEffect(() => {
    const t = setInterval(() => setLiveCount(c => c + Math.floor(Math.random() * 2)), 4000);
    return () => clearInterval(t);
  }, []);

  const filtered = useMemo(() => {
    let data = LOGS_DATA.filter(log =>
      `${log.staff} ${log.module} ${log.role} ${log.ip}`.toLowerCase().includes(search.toLowerCase())
    );
    if (roleFilter !== "All")   data = data.filter(l => l.role === roleFilter);
    if (actionFilter !== "All") data = data.filter(l => l.action === actionFilter);
    data = [...data].sort((a, b) => {
      let va = sortCol === "date" ? `${a.date} ${a.time}` : a[sortCol];
      let vb = sortCol === "date" ? `${b.date} ${b.time}` : b[sortCol];
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return data;
  }, [search, roleFilter, actionFilter, sortCol, sortDir]);

  const totalPages   = Math.ceil(filtered.length / rowsPerPage);
  const indexOfFirst = (currentPage - 1) * rowsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfFirst + rowsPerPage);

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };
  const SortIcon = ({ col }) => (
    <span style={{ opacity: sortCol === col ? 1 : 0.35, marginLeft: 4, fontSize: 9 }}>
      {sortCol === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  const stats = useMemo(() => ({
    total:    LOGS_DATA.length,
    critical: LOGS_DATA.filter(l => l.status === "critical").length,
    deletes:  LOGS_DATA.filter(l => l.action === "Delete").length,
    admins:   [...new Set(LOGS_DATA.filter(l => l.role === "Admin").map(l => l.staff))].length,
  }), []);

  return (
    <div style={{ fontFamily: "'Instrument Sans', sans-serif", background: "#EEF2F7", minHeight: "100vh", padding: "24px 20px"  }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes statusPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(185,28,28,0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(185,28,28,0); }
        }
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

        .al-wrap { max-width: 1200px; margin: 0 auto; }

        /* HEADER */
        .al-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 22px; margin-bottom: 16px;
          background: #fff; border: 1.5px solid #DDE3EC;
        }
        .al-title-group { display: flex; align-items: center; gap: 12px; }
        .al-icon-box {
          width: 40px; height: 40px; border-radius: 11px;
          background: linear-gradient(135deg,#EFF6FF,#DBEAFE); border: 1.5px solid #93C5FD;
          display: flex; align-items: center; justify-content: center; font-size: 18px;
        }
        .al-title { font-size: 20px; font-weight: 700; color: #0F172A; }
        .al-sub   { font-size: 10.5px; color: #64748B; font-family: 'JetBrains Mono',monospace; margin-top: 2px; font-weight: 500; }

        .al-live-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 13px; border-radius: 20px;
          background: #F0FDF4; border: 1.5px solid #86EFAC;
          font-size: 11px; font-weight: 700; color: #15803D;
          font-family: 'JetBrains Mono',monospace;
        }
        .al-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #15803D; animation: blink 1.2s ease-in-out infinite; display: inline-block; }

        .al-export-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 17px; border-radius: 9px; cursor: pointer;
          background: #1D4ED8; border: none; font-size: 12.5px; font-weight: 600;
          color: #fff; font-family: inherit; transition: all 0.18s;
          box-shadow: 0 2px 8px rgba(29,78,216,0.3);
        }
        .al-export-btn:hover { background: #1E40AF; box-shadow: 0 4px 14px rgba(29,78,216,0.4); }

        /* PANEL */
        .al-panel {
          background: #fff; border: 1.5px solid #DDE3EC; overflow: hidden;
        }
        .al-panel-stripe { height: 3px; background: linear-gradient(90deg,#2563EB,#4F46E5,#7C3AED); }

        /* FILTER BAR */
        .al-filter-bar {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 18px; border-bottom: 1.5px solid #E2E8F0; flex-wrap: wrap;
          background: #FAFBFD;
        }
        .al-search-wrap { position: relative; flex: 1 1 220px; }
        .al-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #64748B; pointer-events: none; }
        .al-input {
          width: 100%; background: #fff; border: 1.5px solid #CBD5E1;
          border-radius: 9px; padding: 8px 12px 8px 34px; font-size: 13px;
          font-family: inherit; color: #0F172A; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .al-input::placeholder { color: #94A3B8; }
        .al-input:focus { border-color: #60A5FA; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }

        .al-select {
          background: #fff; border: 1.5px solid #CBD5E1; border-radius: 9px;
          padding: 8px 12px; font-size: 12.5px; font-family: inherit; color: #1E293B;
          outline: none; cursor: pointer; transition: border-color 0.15s; min-width: 130px; font-weight: 500;
        }
        .al-select:focus { border-color: #60A5FA; }

        .al-btn-ghost {
          padding: 8px 14px; border-radius: 9px; font-size: 12.5px; font-weight: 600;
          font-family: inherit; cursor: pointer; transition: all 0.15s;
          display: inline-flex; align-items: center; gap: 5px;
          background: #fff; border: 1.5px solid #CBD5E1; color: #475569;
        }
        .al-btn-ghost:hover { border-color: #94A3B8; color: #1E293B; background: #F8FAFC; }

        /* TABLE */
        .al-table { width: 100%; border-collapse: collapse; }
        .al-table thead tr th {
          padding: 11px 16px; font-size: 11px; font-weight: 700; color: #334155;
          text-transform: uppercase; letter-spacing: 0.07em;
          border-bottom: 1.5px solid #E2E8F0; background: #F8FAFC;
          cursor: pointer; user-select: none; white-space: nowrap;
        }
        .al-table thead tr th:hover { color: #0F172A; background: #F1F5F9; }

        .al-table tbody tr {
          border-bottom: 1px solid #E8EDF5; transition: background 0.12s;
          animation: fadeSlideUp 0.22s ease both; cursor: pointer;
        }
        .al-table tbody tr:hover    { background: #EFF6FF; }
        .al-table tbody tr.expanded { background: #EFF6FF; }
        .al-table tbody tr:last-child { border-bottom: none; }
        .al-table td { padding: 13px 16px; font-size: 13px; color: #1E293B; vertical-align: middle; }

        .al-role-tag {
          display: inline-block; padding: 3px 10px; border-radius: 6px;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em;
          font-family: 'JetBrains Mono',monospace; white-space: nowrap;
          border: 1.5px solid;
        }
        .al-chevron { font-size: 9px; color: #94A3B8; transition: transform 0.18s, color 0.18s; }
        .al-chevron.open { transform: rotate(90deg); color: #2563EB; }

        /* FOOTER */
        .al-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 13px 18px; border-top: 1.5px solid #E2E8F0;
          flex-wrap: wrap; gap: 8px; background: #F8FAFC;
        }
        .al-page-btn {
          width: 32px; height: 32px; border-radius: 8px; border: 1.5px solid #CBD5E1;
          background: #fff; font-size: 12px; font-weight: 600; color: #334155;
          cursor: pointer; font-family: inherit; transition: all 0.15s;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .al-page-btn:hover:not(:disabled) { background: #EFF6FF; color: #2563EB; border-color: #93C5FD; }
        .al-page-btn.active { background: #2563EB; color: #fff; border-color: #2563EB; box-shadow: 0 2px 8px rgba(37,99,235,0.35); }
        .al-page-btn:disabled { opacity: 0.35; cursor: default; }

        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>

      <div className="al-wrap" style={{ minWidth: "100%" }}>

        {/* ── HEADER ── */}
        <div className="al-header box_shadow">
          <div className="al-title-group">
            <div>
              <div className="al-title">Staff Activity Logs</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div className="al-live-badge">
              <span className="al-live-dot" />
              LIVE · {liveCount} events
            </div>
            <button className="al-export-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Logs
            </button>
          </div>
        </div>

        {/* ── STAT PILLS ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <StatPill  label="Total Events" value={stats.total}     color="#2563EB" sub="all time"    />
          <StatPill  label="Critical"     value={stats.critical}  color="#B91C1C" sub="need review" />
          <StatPill  label="Deletions"    value={stats.deletes}   color="#B45309" sub="destructive" />
          <StatPill  label="Admin Users"  value={stats.admins}    color="#C2410C" sub="active"      />
          <StatPill  label="Filtered"     value={filtered.length} color="#6D28D9" sub="matching"    />
        </div>

        {/* ── MAIN PANEL ── */}
        <div className="al-panel box_shadow">
          <div className="al-panel-stripe" />

          {/* Filter bar */}
          <div className="al-filter-bar">
            <div className="al-search-wrap">
              <span className="al-search-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input className="al-input" placeholder="Search staff, module, IP…" value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
            </div>

            <select className="al-select" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Reception">Reception</option>
              <option value="Nurse">Nurse</option>
              <option value="Doctor">Doctor</option>
            </select>

            <select className="al-select" value={actionFilter} onChange={e => { setActionFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">All Actions</option>
              <option value="Login">Login</option>
              <option value="Logout">Logout</option>
              <option value="Create">Create</option>
              <option value="Edit">Edit</option>
              <option value="Delete">Delete</option>
              <option value="View">View</option>
            </select>

            <button className="al-btn-ghost" onClick={() => { setSearch(""); setRoleFilter("All"); setActionFilter("All"); setCurrentPage(1); }}>
              ✕ Reset
            </button>

            <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}>
              {filtered.length} / {LOGS_DATA.length} rows
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table className="al-table">
              <thead>
                <tr>
                  <th style={{ width: 32 }}></th>
                  <th onClick={() => toggleSort("staff")}>Staff <SortIcon col="staff" /></th>
                  <th onClick={() => toggleSort("role")}>Role <SortIcon col="role" /></th>
                  <th onClick={() => toggleSort("action")}>Action <SortIcon col="action" /></th>
                  <th onClick={() => toggleSort("module")}>Module <SortIcon col="module" /></th>
                  <th onClick={() => toggleSort("date")}>Timestamp <SortIcon col="date" /></th>
                  <th>IP Address</th>
                  <th>Session</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center", padding: "48px 0", color: "#64748B", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
                      No activity logs match your filters
                    </td>
                  </tr>
                ) : currentData.map((log, i) => {
                  const isExp = expandedRow === log.id;
                  const roleColor = ROLE_COLOR[log.role] || "#475569";
                  const actMeta = ACTION_META[log.action];
                  return (
                    <React.Fragment key={log.id}>
                      <tr
                        className={isExp ? "expanded" : ""}
                        style={{ animationDelay: `${i * 35}ms` }}
                        onClick={() => setExpandedRow(isExp ? null : log.id)}
                      >
                        {/* Chevron */}
                        <td style={{ paddingRight: 0, paddingLeft: 16 }}>
                          <span className={`al-chevron${isExp ? " open" : ""}`}>▶</span>
                        </td>

                        {/* Staff */}
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Avatar name={log.staff} role={log.role} />
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13.5, color: "#0F172A" }}>{log.staff}</div>
                              <div style={{ fontSize: 10.5, color: "#64748B", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500 }}>
                                #LOG-{String(log.id).padStart(4, "0")}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td>
                          <span className="al-role-tag" style={{ color: roleColor, background: roleColor + "14", borderColor: roleColor + "35" }}>
                            {log.role.toUpperCase()}
                          </span>
                        </td>

                        {/* Action */}
                        <td><ActionBadge action={log.action} /></td>

                        {/* Module */}
                        <td>
                          <span style={{ fontSize: 13, color: "#1E293B", fontWeight: 500 }}>{log.module}</span>
                          {actMeta && <TinyBar pct={[85,60,40,70,30,90][log.id % 6]} color={actMeta.color} />}
                        </td>

                        {/* Timestamp */}
                        <td style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                          <div style={{ color: "#1E293B", fontWeight: 600, fontSize: 12 }}>{log.date}</div>
                          <div style={{ color: "#475569", fontSize: 11, marginTop: 1 }}>{log.time}</div>
                        </td>

                        {/* IP */}
                        <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#334155", fontWeight: 500 }}>
                          {log.ip}
                        </td>

                        {/* Session */}
                        <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#334155", fontWeight: 500 }}>
                          {log.duration}
                        </td>

                        {/* Status */}
                        <td><StatusDot status={log.status} /></td>
                      </tr>

                      {isExp && (
                        <tr>
                          <td colSpan={9} style={{ padding: 0 }}>
                            <ExpandedRow log={log} />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="al-footer">
            <span style={{ fontSize: 12, color: "#475569", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500 }}>
              Showing {filtered.length === 0 ? "0" : `${indexOfFirst + 1}–${Math.min(indexOfFirst + rowsPerPage, filtered.length)}`} of {filtered.length} logs
            </span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <button className="al-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i+1} className={`al-page-btn${currentPage === i+1 ? " active" : ""}`} onClick={() => setCurrentPage(i+1)}>{i+1}</button>
              ))}
              <button className="al-page-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>›</button>
            </div>
          </div>
        </div>

        {/* Bottom legend bar */}
        <div className="box_shadow" style={{
          marginTop: 12, padding: "10px 18px",
          background: "#fff", border: "1.5px solid #DDE3EC",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          {[["Login","#15803D"],["Logout","#475569"],["Create","#0369A1"],["Edit","#B45309"],["Delete","#B91C1C"],["View","#6D28D9"]].map(([action, color]) => {
            const count = LOGS_DATA.filter(l => l.action === action).length;
            return (
              <div key={action} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: color, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: "#334155", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500 }}>
                  {action}: <span style={{ color, fontWeight: 700 }}>{count}</span>
                </span>
              </div>
            );
          })}
          <span style={{ fontSize: 11, color: "#64748B", fontFamily: "'JetBrains Mono',monospace", fontWeight: 500, marginLeft: "auto" }}>
            LAST SYNC: {new Date().toLocaleTimeString()}
          </span>
        </div>

      </div>
    </div>
  );
}