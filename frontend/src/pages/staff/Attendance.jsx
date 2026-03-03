import { useState, useMemo, useEffect, useRef } from "react";

const employees = [
  { id: 1,  name: "Dr. Sarah Johnson",  dept: "Cardiology",     role: "Senior Physician",  status: "present", in: "08:40", out: "17:20", hours: 8.5,  perf: 95, streak: 22, avatar: "SJ", color: "#6366F1" },
  { id: 2,  name: "Emily Davis",        dept: "Emergency",      role: "ER Nurse",           status: "late",    in: "09:15", out: "18:05", hours: 8.8,  perf: 88, streak: 8,  avatar: "ED", color: "#F59E0B" },
  { id: 3,  name: "Michael Brown",      dept: "Administration", role: "Admin Manager",      status: "absent",  in: "—",     out: "—",     hours: 0,    perf: 75, streak: 0,  avatar: "MB", color: "#EF4444" },
  { id: 4,  name: "Lisa Anderson",      dept: "Laboratory",     role: "Lab Technician",     status: "present", in: "08:50", out: "17:30", hours: 8.6,  perf: 92, streak: 15, avatar: "LA", color: "#10B981" },
  { id: 5,  name: "James Wilson",       dept: "Radiology",      role: "Radiologist",        status: "present", in: "08:35", out: "17:15", hours: 8.6,  perf: 90, streak: 30, avatar: "JW", color: "#3B82F6" },
  { id: 6,  name: "Maria Garcia",       dept: "Pediatrics",     role: "Pediatrician",       status: "present", in: "08:45", out: "17:25", hours: 8.6,  perf: 94, streak: 18, avatar: "MG", color: "#8B5CF6" },
  { id: 7,  name: "Robert Taylor",      dept: "Surgery",        role: "Chief Surgeon",      status: "late",    in: "09:20", out: "—",     hours: 7.8,  perf: 85, streak: 4,  avatar: "RT", color: "#F97316" },
  { id: 8,  name: "Jennifer Lee",       dept: "Pharmacy",       role: "Pharmacist",         status: "present", in: "08:55", out: "17:35", hours: 8.6,  perf: 91, streak: 12, avatar: "JL", color: "#06B6D4" },
];

const weekData = [
  { day: "Mon", present: 8, late: 1, absent: 1 },
  { day: "Tue", present: 9, late: 0, absent: 1 },
  { day: "Wed", present: 7, late: 2, absent: 1 },
  { day: "Thu", present: 8, late: 1, absent: 1 },
  { day: "Fri", present: 6, late: 2, absent: 2 },
  { day: "Sat", present: 5, late: 1, absent: 4 },
  { day: "Sun", present: 3, late: 0, absent: 7 },
];

const STATUS = {
  present: { label: "Present", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0", dot: "#10B981" },
  late:    { label: "Late",    color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A", dot: "#F59E0B" },
  absent:  { label: "Absent",  color: "#EF4444", bg: "#FFF1F2", border: "#FECDD3", dot: "#EF4444" },
};

function MiniBar({ value, max, color }) {
  return (
    <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.6s ease" }} />
    </div>
  );
}

function RadialProgress({ value, size = 56, stroke = 5, color = "#6366F1" }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }} />
    </svg>
  );
}

// ── ANIMATED COUNTER ──
function AnimatedCounter({ target, duration = 1200, decimals = 0 }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return <>{val}</>;
}

// ── SPARKLINE ──
function Sparkline({ data, color, width = 80, height = 28 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  const area = `0,${height} ${pts} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${color.replace("#","")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 4) - 2;
        return i === data.length - 1 ? (
          <circle key={i} cx={x} cy={y} r="3" fill={color} stroke="white" strokeWidth="1.5" />
        ) : null;
      })}
    </svg>
  );
}

// ── RING DONUT ──
function DonutRing({ segments, size = 52, stroke = 7 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const gap = circ - dash;
        const el = (
          <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke-dasharray 0.8s ease" }} />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

// ── ADVANCED STAT CARD ──
function AdvancedStatCard({ label, value, sub, color, icon, prog, trend, sparkData, type, stats, index }) {
  const [hovered, setHovered] = useState(false);

  const sparkWeekly = sparkData || [6,7,8,6,8,7,Math.round(prog/12)];

  // Trend badge
  const trendUp = trend > 0;
  const trendNeutral = trend === 0;

  return (
    <div
      className="adv-stat-card box_shadow"
      style={{
        position: "relative",
        background: hovered
          ? `linear-gradient(135deg, white 60%, ${color}08 100%)`
          : "white",
        
        padding: "18px 18px 14px",
        border: `1.5px solid ${hovered ? color + "55" : "#E8EDF5"}`,
       
        transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
        cursor: "default",
        overflow: "hidden",
        animationDelay: `${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glowing orb background */}
      <div style={{
        position: "absolute", top: -24, right: -24, width: 88, height: 88,
        borderRadius: "50%", background: color + "18",
        filter: "blur(18px)", pointerEvents: "none",
        transition: "opacity 0.3s", opacity: hovered ? 1 : 0.5,
      }} />

      {/* Top row: icon + label + trend badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${color}22, ${color}10)`,
            border: `1.5px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, boxShadow: `0 2px 8px ${color}20`,
            transition: "transform 0.2s", transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1)",
          }}>{icon}</div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</span>
        </div>
        {/* Trend pill */}
        {!trendNeutral && (
          <span style={{
            fontSize: 10, fontWeight: 700,
            color: trendUp ? "#10B981" : "#EF4444",
            background: trendUp ? "#ECFDF5" : "#FFF1F2",
            border: `1px solid ${trendUp ? "#A7F3D0" : "#FECDD3"}`,
            borderRadius: 20, padding: "2px 7px",
            display: "flex", alignItems: "center", gap: 2,
          }}>
            {trendUp ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
      </div>

      {/* Value + sparkline row */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{
            fontSize: 30, fontWeight: 800, color: color,
            fontFamily: "'JetBrains Mono', monospace", lineHeight: 1,
            letterSpacing: "-1px",
          }}>
            {type === "rate" ? (
              <><AnimatedCounter target={parseFloat(value)} decimals={1} /><span style={{ fontSize: 16, fontWeight: 600 }}>%</span></>
            ) : type === "hours" ? (
              <><AnimatedCounter target={parseFloat(value)} decimals={1} /><span style={{ fontSize: 14, fontWeight: 600, color: color + "bb" }}>h</span></>
            ) : (
              <AnimatedCounter target={parseInt(value)} />
            )}
          </div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 3, fontWeight: 500 }}>{sub}</div>
        </div>
        {/* Sparkline */}
        <Sparkline data={sparkWeekly} color={color} width={72} height={30} />
      </div>

      {/* Segmented progress bar with glow */}
      {type === "donut" && stats ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <DonutRing
            segments={[
              { pct: (stats.present / stats.total) * 100, color: "#10B981" },
              { pct: (stats.late / stats.total) * 100,    color: "#F59E0B" },
              { pct: (stats.absent / stats.total) * 100,  color: "#EF4444" },
            ]}
            size={44} stroke={6}
          />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              { l: "Present", v: stats.present, c: "#10B981" },
              { l: "Late",    v: stats.late,    c: "#F59E0B" },
              { l: "Absent",  v: stats.absent,  c: "#EF4444" },
            ].map(s => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: 2, background: s.c, display: "inline-block", flexShrink: 0 }} />
                <div style={{ flex: 1, height: 3, background: "#F1F5F9", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${(s.v / stats.total) * 100}%`, height: "100%", background: s.c, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 10, color: "#94A3B8", minWidth: 10 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Glowing progress track */
        <div style={{ position: "relative", height: 5, background: "#F1F5F9", borderRadius: 3, overflow: "visible", marginTop: 4 }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: "100%",
            width: `${Math.min(prog, 100)}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 3,
            boxShadow: `0 0 6px ${color}66`,
            transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
          }}>
            {/* Shimmer */}
            <div style={{
              position: "absolute", right: 0, top: "50%", transform: "translate(50%,-50%)",
              width: 8, height: 8, borderRadius: "50%",
              background: color, boxShadow: `0 0 8px 3px ${color}55`,
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

function WeekChart() {
  const max = 10;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 64 }}>
      {weekData.map((d, i) => {
        const isToday = i === 4;
        return (
          <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 1, height: 48 }}>
              {[
                { v: d.present, c: "#10B981" },
                { v: d.late,    c: "#F59E0B" },
                { v: d.absent,  c: "#EF4444" },
              ].map((seg, si) => (
                <div key={si} style={{
                  width: "100%", borderRadius: si === 0 ? "3px 3px 0 0" : si === 2 ? "0 0 3px 3px" : 0,
                  height: `${(seg.v / max) * 100}%`,
                  background: isToday ? seg.c : seg.c + "99",
                  minHeight: seg.v > 0 ? 3 : 0,
                  transition: "height 0.5s ease"
                }} />
              ))}
            </div>
            <span style={{ fontSize: 9, fontWeight: isToday ? 700 : 500, color: isToday ? "#1E293B" : "#94A3B8" }}>{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Attendance() {
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedRow, setSelectedRow]   = useState(null);
  const [sortBy, setSortBy]             = useState("name");
  const [sortDir, setSortDir]           = useState("asc");
  const [viewMode, setViewMode]         = useState("table");

  const stats = useMemo(() => ({
    total:   employees.length,
    present: employees.filter(e => e.status === "present").length,
    late:    employees.filter(e => e.status === "late").length,
    absent:  employees.filter(e => e.status === "absent").length,
    avgHours: (employees.reduce((a, e) => a + e.hours, 0) / employees.filter(e => e.hours > 0).length).toFixed(1),
    avgPerf:  Math.round(employees.reduce((a, e) => a + e.perf, 0) / employees.length),
  }), []);

  const attendanceRate = ((stats.present / stats.total) * 100).toFixed(1);

  const filtered = useMemo(() => {
    let list = employees.filter(e => {
      const s = search.toLowerCase();
      return (e.name.toLowerCase().includes(s) || e.dept.toLowerCase().includes(s) || e.role.toLowerCase().includes(s))
        && (filterStatus === "all" || e.status === filterStatus);
    });
    list = [...list].sort((a, b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return list;
  }, [search, filterStatus, sortBy, sortDir]);

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }) => (
    <span style={{ opacity: sortBy === col ? 1 : 0.3, marginLeft: 3, fontSize: 10 }}>
      {sortBy === col ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  const statCards = [
    {
      label: "Total Staff",
      value: stats.total,
      sub: "registered employees",
      color: "#6366F1",
      icon: "👥",
      prog: 100,
      trend: 0,
      sparkData: [7, 7, 8, 8, 8, 8, 8],
      type: "default",
    },
    {
      label: "Late Arrivals",
      value: stats.late,
      sub: "need follow-up",
      color: "#F59E0B",
      icon: "⏰",
      prog: (stats.late / stats.total) * 100,
      trend: -1,
      sparkData: [1, 3, 2, 1, 2, 2, stats.late],
      type: "default",
    },
    {
      label: "Absent",
      value: stats.absent,
      sub: "not checked in",
      color: "#EF4444",
      icon: "✕",
      prog: (stats.absent / stats.total) * 100,
      trend: -2,
      sparkData: [2, 1, 1, 2, 2, 1, stats.absent],
      type: "default",
    },
    {
      label: "Avg. Hours",
      value: stats.avgHours,
      sub: "per employee today",
      color: "#3B82F6",
      icon: "⌚",
      prog: (parseFloat(stats.avgHours) / 10) * 100,
      trend: 2,
      sparkData: [7.2, 8.1, 7.9, 8.4, 8.0, 8.5, parseFloat(stats.avgHours)],
      type: "hours",
    },
  ];

  return (
    <div style={{ fontFamily: "'Instrument Sans', sans-serif", background: "#F0F2F8", minHeight: "100vh", padding: "24px 20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .att-input { width: 100%; border: 1.5px solid #E2E8F0; border-radius: 9px; padding: 8px 12px 8px 36px; font-size: 13px; font-family: inherit; background: white; color: #1E293B; outline: none; transition: border-color 0.15s; }
        .att-input:focus { border-color: #6366F1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
        .att-date  { border: 1.5px solid #E2E8F0; border-radius: 9px; padding: 8px 12px; font-size: 13px; font-family: inherit; background: white; color: #1E293B; outline: none; cursor: pointer; transition: border-color 0.15s; }
        .att-date:focus { border-color: #6366F1; }

        .filter-btn { border: 1.5px solid #E2E8F0; background: white; border-radius: 8px; padding: 6px 14px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; color: #64748B; transition: all 0.15s; text-transform: capitalize; }
        .filter-btn.active-all     { background: #1E293B; color: white; border-color: #1E293B; }
        .filter-btn.active-present { background: #10B981; color: white; border-color: #10B981; }
        .filter-btn.active-late    { background: #F59E0B; color: white; border-color: #F59E0B; }
        .filter-btn.active-absent  { background: #EF4444; color: white; border-color: #EF4444; }
        .filter-btn:hover:not(.active-all):not(.active-present):not(.active-late):not(.active-absent) { border-color: #94A3B8; color: #1E293B; }

        .icon-btn { border: 1.5px solid #E2E8F0; background: white; border-radius: 9px; padding: 8px 14px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; color: #475569; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; }
        .icon-btn:hover { border-color: #6366F1; color: #6366F1; background: #EDEFFF; }
        .icon-btn.active { border-color: #6366F1; color: #6366F1; background: #EDEFFF; }

        .att-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .att-table th { padding: 11px 16px; background: #F8FAFC; border-bottom: 1px solid #EAECF0; font-size: 11px; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.07em; cursor: pointer; user-select: none; white-space: nowrap; }
        .att-table th:hover { color: #475569; }
        .att-table td { padding: 13px 16px; border-bottom: 1px solid #F1F5F9; background: white; transition: background 0.12s; vertical-align: middle; }
        .att-table tr:last-child td { border-bottom: none; }
        .att-table tr:hover td { background: #F8FAFF; }
        .att-table tr.selected td { background: #EDEFFF; }

        .adv-stat-card { animation: fadeUp 0.4s ease both; }

        .emp-card { background: white; border-radius: 14px; border: 1px solid #E8EDF5; padding: 16px; transition: all 0.18s; cursor: pointer; }
        .emp-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); border-color: #C7D2FE; }
        .emp-card.selected { border-color: #6366F1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }

        .panel { background: white; border: 1px solid #E8EDF5; overflow: hidden; }
        .panel-header { padding: 16px 20px; border-bottom: 1px solid #F1F5F9; display: flex; align-items: center; justify-content: space-between; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.3s ease both; }

        .badge-status { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; border: 1px solid; }

        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── TOP HEADER ── */}
        <div className="bg-white p-3 box_shadow" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10}}>
              <h5 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A"}}>Attendance Dashboard</h5>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <input type="date" className="att-date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            <button className="icon-btn">↻ Refresh</button>
            <button className="icon-btn" style={{ background: "#1c5fca", color: "white"}}>⬇ Export CSV</button>
          </div>
        </div>

        {/* ── ADVANCED STAT CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
          {statCards.map((s, i) => (
            <AdvancedStatCard key={s.label} {...s} index={i} />
          ))}
        </div>

        {/* ── MAIN GRID: TABLE + SIDE PANELS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>

          {/* LEFT: Table / Cards */}
          <div>
            {/* Toolbar */}
            <div className="panel box_shadow" style={{ marginBottom: 12 }}>
              <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "1 1 200px" }}>
                  <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: 14, pointerEvents: "none" }}>🔍</span>
                  <input className="att-input" placeholder="Search by name, dept, role…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {["all", "present", "late", "absent"].map(s => (
                    <button key={s} className={`filter-btn${filterStatus === s ? " active-" + s : ""}`} onClick={() => setFilterStatus(s)}>
                      {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className={`icon-btn${viewMode === "table" ? " active" : ""}`} onClick={() => setViewMode("table")} style={{ padding: "7px 10px" }}>☰</button>
                  <button className={`icon-btn${viewMode === "cards" ? " active" : ""}`} onClick={() => setViewMode("cards")} style={{ padding: "7px 10px" }}>⊞</button>
                </div>
                <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: "auto" }}>{filtered.length} of {employees.length}</span>
              </div>
            </div>

            {/* TABLE VIEW */}
            {viewMode === "table" && (
              <div className="panel box_shadow" style={{ overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="att-table">
                    <colgroup>
                      <col style={{ width: "26%" }} />
                      <col style={{ width: "15%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "9%" }} />
                      <col style={{ width: "14%" }} />
                      <col style={{ width: "16%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th onClick={() => toggleSort("name")}>Employee <SortIcon col="name" /></th>
                        <th onClick={() => toggleSort("dept")}>Department <SortIcon col="dept" /></th>
                        <th style={{ textAlign: "center" }}>In</th>
                        <th style={{ textAlign: "center" }}>Out</th>
                        <th onClick={() => toggleSort("hours")} style={{ textAlign: "center" }}>Hours <SortIcon col="hours" /></th>
                        <th onClick={() => toggleSort("perf")} style={{ textAlign: "center" }}>Performance <SortIcon col="perf" /></th>
                        <th onClick={() => toggleSort("status")} style={{ textAlign: "center" }}>Status <SortIcon col="status" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px 0", color: "#94A3B8", fontSize: 14 }}>No employees match your criteria</td></tr>
                      ) : filtered.map((emp, i) => {
                        const st = STATUS[emp.status];
                        const isSelected = selectedRow === emp.id;
                        return (
                          <tr key={emp.id} className={isSelected ? "selected" : ""} onClick={() => setSelectedRow(isSelected ? null : emp.id)}
                            style={{ cursor: "pointer", animationDelay: `${i * 30}ms` }}>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 38, height: 38, borderRadius: 10, background: emp.color + "22", border: `2px solid ${emp.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: emp.color, flexShrink: 0 }}>
                                  {emp.avatar}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: 13, color: "#1E293B" }}>{emp.name}</div>
                                  <div style={{ fontSize: 11, color: "#94A3B8" }}>{emp.role}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: 12, fontWeight: 500, color: "#475569", background: "#F1F5F9", padding: "3px 9px", borderRadius: 6 }}>{emp.dept}</span>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: emp.in === "—" ? "#CBD5E1" : "#1E293B", fontWeight: 500 }}>{emp.in}</span>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: emp.out === "—" ? "#CBD5E1" : "#1E293B", fontWeight: 500 }}>{emp.out}</span>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {emp.hours > 0 ? (
                                <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: emp.hours >= 8 ? "#10B981" : "#F59E0B" }}>{emp.hours}h</span>
                              ) : <span style={{ color: "#CBD5E1" }}>—</span>}
                            </td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <MiniBar value={emp.perf} max={100} color={emp.perf >= 90 ? "#10B981" : emp.perf >= 80 ? "#F59E0B" : "#EF4444"} />
                                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: "#475569", minWidth: 30 }}>{emp.perf}%</span>
                              </div>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <span className="badge-status" style={{ background: st.bg, color: st.color, borderColor: st.border }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block" }}></span>
                                {st.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "12px 20px", borderTop: "1px solid #F1F5F9", background: "#FAFBFD", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#94A3B8" }}>
                    Showing <strong style={{ color: "#1E293B" }}>{filtered.length}</strong> of <strong style={{ color: "#1E293B" }}>{employees.length}</strong> employees
                    {selectedRow && <span style={{ marginLeft: 8, color: "#6366F1" }}>· 1 selected</span>}
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["present", "late", "absent"].map(s => (
                      <span key={s} className="badge-status" style={{ background: STATUS[s].bg, color: STATUS[s].color, borderColor: STATUS[s].border }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: STATUS[s].dot, display: "inline-block" }}></span>
                        {stats[s]} {STATUS[s].label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CARD VIEW */}
            {viewMode === "cards" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {filtered.map((emp, i) => {
                  const st = STATUS[emp.status];
                  const isSelected = selectedRow === emp.id;
                  return (
                    <div key={emp.id} className={`emp-card fade-up${isSelected ? " selected" : ""}`}
                      style={{ animationDelay: `${i * 40}ms` }}
                      onClick={() => setSelectedRow(isSelected ? null : emp.id)}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: emp.color + "22", border: `2px solid ${emp.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: emp.color }}>
                          {emp.avatar}
                        </div>
                        <span className="badge-status" style={{ background: st.bg, color: st.color, borderColor: st.border }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, display: "inline-block" }}></span>
                          {st.label}
                        </span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "#1E293B", marginBottom: 2 }}>{emp.name}</div>
                        <div style={{ fontSize: 11, color: "#94A3B8" }}>{emp.role}</div>
                        <div style={{ fontSize: 11, fontWeight: 500, color: "#6366F1", marginTop: 2 }}>{emp.dept}</div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748B", marginBottom: 10 }}>
                        <span>⏰ {emp.in}</span>
                        <span>→ {emp.out}</span>
                        <span style={{ fontFamily: "'JetBrains Mono'", fontWeight: 600, color: emp.hours >= 8 ? "#10B981" : "#94A3B8" }}>{emp.hours > 0 ? emp.hours + "h" : "—"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MiniBar value={emp.perf} max={100} color={emp.perf >= 90 ? "#10B981" : emp.perf >= 80 ? "#F59E0B" : "#EF4444"} />
                        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", fontWeight: 600, color: "#475569", minWidth: 28 }}>{emp.perf}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="panel box_shadow">
              <div className="panel-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>Weekly Trend</span>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>This week</span>
              </div>
              <div style={{ padding: "16px" }}>
                <WeekChart />
                <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
                  {[["#10B981", "Present"], ["#F59E0B", "Late"], ["#EF4444", "Absent"]].map(([c, l]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: c, display: "inline-block" }}></span>
                      <span style={{ fontSize: 10, color: "#64748B", fontWeight: 500 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel box_shadow">
              <div className="panel-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>Attendance Rate</span>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>Today</span>
              </div>
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative" }}>
                  <RadialProgress value={parseFloat(attendanceRate)} size={100} stroke={8} color="#6366F1" />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "#1E293B", fontFamily: "'JetBrains Mono', monospace" }}>{attendanceRate}%</span>
                    <span style={{ fontSize: 9, color: "#94A3B8", marginTop: 1 }}>rate</span>
                  </div>
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
                  {[
                    { label: "Present", value: stats.present, color: "#10B981" },
                    { label: "Late",    value: stats.late,    color: "#F59E0B" },
                    { label: "Absent",  value: stats.absent,  color: "#EF4444" },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 24, fontSize: 10, fontWeight: 600, color: row.color, fontFamily: "'JetBrains Mono'" }}>{row.value}</span>
                      <div style={{ flex: 1 }}><MiniBar value={(row.value / stats.total) * 100} max={100} color={row.color} /></div>
                      <span style={{ fontSize: 10, color: "#94A3B8", width: 30, textAlign: "right" }}>{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel box_shadow">
              <div className="panel-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>Top Performers</span>
                <span style={{ fontSize: 11, color: "#6366F1", fontWeight: 500, cursor: "pointer" }}>View all →</span>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[...employees].sort((a, b) => b.perf - a.perf).slice(0, 4).map((emp, i) => (
                  <div key={emp.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "#F59E0B" : "#CBD5E1", width: 14, textAlign: "center" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</span>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: emp.color + "22", border: `1.5px solid ${emp.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: emp.color, flexShrink: 0 }}>
                      {emp.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#1E293B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.name}</div>
                      <MiniBar value={emp.perf} max={100} color={emp.color} />
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono'", fontWeight: 600, color: "#475569" }}>{emp.perf}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}