import React, { useState } from "react";
import { Row, Col, Card, Badge, Button, Dropdown, Table } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { FiCalendar, FiUsers, FiXSquare, FiPlus, FiSettings, FiCheckCircle } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


/* ───────────────────────── SECTION 1 DATA ───────────────────────── */
const availability = [
  { day: "Mon", time: "11:00 PM - 12:30 PM", closed: false },
  { day: "Tue", time: "11:00 PM - 12:30 PM", closed: false },
  { day: "Wed", time: "11:00 PM - 12:30 PM", closed: false },
  { day: "Thu", time: "11:00 PM - 12:30 PM", closed: false },
  { day: "Fri", time: "11:00 PM - 12:30 PM", closed: false },
  { day: "Sat", time: "11:00 PM - 12:30 PM", closed: false },
  { day: "Sun", time: null, closed: true },
];
const appointmentStats = [
  { name: "Completed", value: 260, color: "#22c55e" },
  { name: "Pending",   value: 21,  color: "#eab308" },
  { name: "Cancelled", value: 50,  color: "#ef4444" },
];
const topPatients = [
  { name: "Alberto Ripley", phone: "+1 56556 54565", appointments: 20, avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Susan Babin",    phone: "+1 65658 95654", appointments: 18, avatar: "https://i.pravatar.cc/150?img=45" },
  { name: "Carol Lam",      phone: "+1 55654 56647", appointments: 16, avatar: "https://i.pravatar.cc/150?img=32" },
  { name: "Marsha Noland",  phone: "+1 65668 54558", appointments: 14, avatar: "https://i.pravatar.cc/150?img=27" },
  { name: "Irma Armstrong", phone: "+1 45214 66568", appointments: 12, avatar: "https://i.pravatar.cc/150?img=48" },
];

/* ───────────────────────── SECTION 3–6 DATA ─────────────────────── */
const appointmentChartData = [
  { month: "Jan", total: 380, completed: 200 },
  { month: "Feb", total: 300, completed: 200 },
  { month: "Mar", total: 80,  completed: 200 },
  { month: "Apr", total: 290, completed: 200 },
  { month: "May", total: 360, completed: 180 },
  { month: "Jun", total: 240, completed: 150 },
  { month: "Jul", total: 330, completed: 180 },
  { month: "Aug", total: 190, completed: 180 },
  { month: "Sep", total: 310, completed: 200 },
  { month: "Oct", total: 210, completed: 210 },
];

/* ── Chart data with Weekly / Monthly / Yearly switching (from Doc 3) ── */
const appointmentChartDataByView = {
  Monthly: [
    { month: "Jan", total: 350, completed: 200 },
    { month: "Feb", total: 270, completed: 195 },
    { month: "Mar", total: 280, completed: 185 },
    { month: "Apr", total: 260, completed: 190 },
    { month: "May", total: 330, completed: 195 },
    { month: "Jun", total: 210, completed: 165 },
    { month: "Jul", total: 230, completed: 170 },
    { month: "Aug", total: 175, completed: 180 },
    { month: "Sep", total: 255, completed: 205 },
    { month: "Oct", total: 200, completed: 220 },
    { month: "Nov", total: 340, completed: 230 },
    { month: "Dec", total: 395, completed: 230 },
  ],
  Weekly: [
    { month: "Wk1", total: 85,  completed: 60 },
    { month: "Wk2", total: 70,  completed: 55 },
    { month: "Wk3", total: 95,  completed: 70 },
    { month: "Wk4", total: 80,  completed: 65 },
    { month: "Wk5", total: 110, completed: 75 },
    { month: "Wk6", total: 60,  completed: 45 },
    { month: "Wk7", total: 90,  completed: 68 },
  ],
  Yearly: [
    { month: "2019", total: 2800, completed: 1900 },
    { month: "2020", total: 2400, completed: 1700 },
    { month: "2021", total: 3100, completed: 2200 },
    { month: "2022", total: 3400, completed: 2500 },
    { month: "2023", total: 3800, completed: 2700 },
    { month: "2024", total: 4200, completed: 3000 },
  ],
};

const miniStats = [
  { icon: "bi-person-fill",       iconBg: "#4840BB", title: "Total Patient", value: "658",  change: "+31% Last Week", changeColor: "text-success" },
  { icon: "bi-calendar-check",    iconBg: "#22C55E", title: "Appointments",  value: "120",  change: "+12% Today",     changeColor: "text-success" },
  { icon: "bi-capsule-pill",      iconBg: "#F59E0B", title: "Medicines",     value: "86",   change: "-5% Stock",      changeColor: "text-danger"  },
  { icon: "bi-currency-rupee",    iconBg: "#EF4444", title: "Revenue",       value: "₹24K", change: "+18% Growth",    changeColor: "text-success" },
  { icon: "bi-person-badge-fill", iconBg: "#0EA5E9", title: "Doctors",       value: "24",   change: "+2 Joined",      changeColor: "text-success" },
  { icon: "bi-hospital-fill",     iconBg: "#8B5CF6", title: "Departments",   value: "12",   change: "No Change",      changeColor: "text-muted"   },
];
const appointments = [
  { id: 1, name: "Alberto Ripley", phone: "+1 56556 54565", avatar: "https://i.pravatar.cc/150?img=11", dateTime: "27 May 2025 - 09:30 AM", mode: "Online",    status: "Checked Out", statusVariant: "success", fees: "$400" },
  { id: 2, name: "Susan Babin",    phone: "+1 65658 95654", avatar: "https://i.pravatar.cc/150?img=45", dateTime: "26 May 2025 - 10:15 AM", mode: "Online",    status: "Checked In",  statusVariant: "warning", fees: "$370" },
  { id: 3, name: "Carol Lam",      phone: "+1 55654 56647", avatar: "https://i.pravatar.cc/150?img=32", dateTime: "25 May 2025 - 02:40 PM", mode: "In-Person", status: "Cancelled",   statusVariant: "danger",  fees: "$450" },
  { id: 4, name: "Marsha Noland",  phone: "+1 65688 54558", avatar: "https://i.pravatar.cc/150?img=27", dateTime: "24 May 2025 - 11:30 AM", mode: "In-Person", status: "Schedule",    statusVariant: "primary", fees: "$310" },
  { id: 5, name: "John Elsass",    phone: "47851263",        avatar: "https://i.pravatar.cc/150?img=13", dateTime: "23 May 2025 - 04:10 PM", mode: "Online",    status: "Schedule",    statusVariant: "primary", fees: "$400" },
];

/* ══════════════════════════════════════════════════════════════════
   SECTION 2 SUB-COMPONENTS  (from Document 3)
══════════════════════════════════════════════════════════════════ */

/* ── Chevron icon ── */
const ChevronDown = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Calendar icon ── */
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ── Clock icon ── */
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ── Chat icon ── */
const ChatIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

/* ── Video icon ── */
const VideoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
);

/* ── Upcoming Card (Doc 3 design) ── */
function UpcomingCard() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("Today");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h5 style={{ margin: 0, fontWeight: 700, fontSize: 17, color: "#111827" }}>Upcoming...</h5>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setFilterOpen(o => !o)}
            onBlur={() => setTimeout(() => setFilterOpen(false), 150)}
            style={{
              background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 8,
              padding: "5px 12px", fontSize: 13, color: "#374151", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontWeight: 500,
            }}
          >
            {filter} <ChevronDown />
          </button>
          {filterOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 6px)", background: "#fff",
              borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100,
              minWidth: 130, overflow: "hidden",
            }}>
              {["Today", "Tomorrow", "This Week"].map(v => (
                <button key={v} onClick={() => { setFilter(v); setFilterOpen(false); }}
                  style={{
                    display: "block", width: "100%", padding: "9px 16px",
                    background: filter === v ? "#f3f4f6" : "none",
                    border: "none", textAlign: "left", fontSize: 13,
                    color: filter === v ? "#3b51d8" : "#374151",
                    cursor: "pointer", fontWeight: filter === v ? 600 : 400,
                  }}>{v}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Patient Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Andrew Billard"
          style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #c7d2fe", flexShrink: 0 }}
        />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>Andrew Billard</div>
          <div style={{ fontSize: 12.5, color: "#9ca3af", marginTop: 2 }}>#AP455698</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f3f4f6" }} />

      {/* Visit details */}
      <div>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: "#111827", marginBottom: 8 }}>General Visit</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <CalendarIcon />
          <span style={{ fontSize: 13, color: "#6b7280" }}>Monday, 31 Mar 2025</span>
          <span style={{ margin: "0 4px", color: "#d1d5db" }}>·</span>
          <ClockIcon />
          <span style={{ fontSize: 13, color: "#6b7280" }}>06:30 PM</span>
        </div>
      </div>

      {/* Department & Type */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 3, fontWeight: 500 }}>Department</div>
          <div style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Cardiology</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 3, fontWeight: 500 }}>Type</div>
          <div style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Online Consultation</div>
        </div>
      </div>

      {/* Start Appointment */}
      <button
        style={{
          background: "#3b51d8", color: "#fff", border: "none", borderRadius: 10,
          padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer",
          width: "100%", letterSpacing: "0.01em", transition: "background 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#2e42b8"}
        onMouseLeave={e => e.currentTarget.style.background = "#3b51d8"}
      >
        Start Appointment
      </button>

      {/* Chat & Video */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <button
          style={{
            background: "#111827", color: "#fff", border: "none", borderRadius: 10,
            padding: "10px 0", fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#1f2937"}
          onMouseLeave={e => e.currentTarget.style.background = "#111827"}
        >
          <ChatIcon /> Chat Now
        </button>
        <button
          style={{
            background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: 10,
            padding: "10px 0", fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
        >
          <VideoIcon /> Video Consulation
        </button>
      </div>
    </div>
  );
}

/* ── Appointments Chart (Doc 3 design) ── */
function AppointmentsChart() {
  const [chartView, setChartView] = useState("Monthly");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const data = appointmentChartDataByView[chartView];
  const maxVal = Math.max(...data.map(d => d.total));
  const yMax = Math.ceil(maxVal / 100) * 100 + 100;
  const yLabels = [];
  for (let v = 0; v <= yMax; v += 100) yLabels.push(v);

  const svgW = 800, svgH = 290;
  const padL = 52, padR = 16, padT = 20, padB = 38;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const n = data.length;
  const step = chartW / n;
  const barW = Math.min(38, step * 0.48);

  const getX = i => padL + i * step + step / 2;
  const getY = val => padT + chartH - (val / yMax) * chartH;

  const completedPoints = data.map((d, i) => `${getX(i)},${getY(d.completed)}`).join(" ");
  const areaPoints = [
    `${getX(0)},${padT + chartH}`,
    ...data.map((d, i) => `${getX(i)},${getY(d.total)}`),
    `${getX(n - 1)},${padT + chartH}`,
  ].join(" ");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h5 style={{ margin: 0, fontWeight: 700, fontSize: 17, color: "#111827" }}>Appointments</h5>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            style={{
              background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 8,
              padding: "5px 12px", fontSize: 13, color: "#374151", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontWeight: 500,
            }}
          >
            {chartView} <ChevronDown />
          </button>
          {dropdownOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 6px)", background: "#fff",
              borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100,
              minWidth: 120, overflow: "hidden",
            }}>
              {["Weekly", "Monthly", "Yearly"].map(v => (
                <button key={v} onClick={() => { setChartView(v); setDropdownOpen(false); }}
                  style={{
                    display: "block", width: "100%", padding: "9px 16px",
                    background: chartView === v ? "#f3f4f6" : "none",
                    border: "none", textAlign: "left", fontSize: 13,
                    color: chartView === v ? "#3b51d8" : "#374151",
                    cursor: "pointer", fontWeight: chartView === v ? 600 : 400,
                  }}>{v}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 20, marginBottom: 6 }}>
        {[{ color: "#3b51d8", label: "Total Appointments" }, { color: "#10b981", label: "Completed Appointments" }].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: item.color }} />
            <span style={{ fontSize: 12.5, color: "#6b7280" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* SVG Chart */}
      <div style={{ flex: 1, position: "relative" }}>
        {tooltip && (
          <div style={{
            position: "absolute", background: "#1f2937", color: "#fff", padding: "7px 11px",
            borderRadius: 8, fontSize: 12, pointerEvents: "none", whiteSpace: "nowrap",
            left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -115%)", zIndex: 200,
          }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{tooltip.month}</div>
            <div style={{ color: "#a5b4fc" }}>Total: {tooltip.total}</div>
            <div style={{ color: "#6ee7b7" }}>Completed: {tooltip.completed}</div>
          </div>
        )}
        <svg viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <linearGradient id="sec2BarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b51d8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#5b6ee8" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="sec2AreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b51d8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3b51d8" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines + Y labels */}
          {yLabels.map(val => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,4" />
                <text x={padL - 7} y={y + 4} fontSize="11" fill="#9ca3af" textAnchor="end">{val}</text>
              </g>
            );
          })}

          {/* Area fill */}
          <polygon points={areaPoints} fill="url(#sec2AreaGrad)" />

          {/* Bars */}
          {data.map((d, i) => {
            const bx = getX(i) - barW / 2;
            const by = getY(d.total);
            const bh = padT + chartH - by;
            return (
              <rect key={i} x={bx} y={by} width={barW} height={bh}
                fill="url(#sec2BarGrad)" rx="4"
                style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                onMouseEnter={e => {
                  const svgEl = e.currentTarget.closest("svg");
                  const svgRect = svgEl.getBoundingClientRect();
                  const wrapRect = svgEl.parentElement.getBoundingClientRect();
                  const px = (getX(i) / svgW) * svgRect.width + svgRect.left - wrapRect.left;
                  const py = (by / svgH) * svgRect.height + svgRect.top - wrapRect.top;
                  setTooltip({ x: px, y: py, month: d.month, total: d.total, completed: d.completed });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          })}

          {/* Completed line */}
          <polyline points={completedPoints} fill="none" stroke="#10b981" strokeWidth="2.5"
            strokeLinejoin="round" strokeLinecap="round" />

          {/* Dots */}
          {data.map((d, i) => {
            const cx = getX(i), cy = getY(d.completed);
            return (
              <g key={`dot-${i}`}>
                <circle cx={cx} cy={cy} r="6" fill="#fff" stroke="#10b981" strokeWidth="2" />
                <circle cx={cx} cy={cy} r="3" fill="#10b981" />
              </g>
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text key={`xl-${i}`} x={getX(i)} y={svgH - 8} fontSize="12" fill="#9ca3af"
              textAnchor="middle" fontWeight="500">{d.month}</text>
          ))}

          {/* Axis lines */}
          <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#e5e7eb" strokeWidth="1" />
          <line x1={padL} y1={padT + chartH} x2={svgW - padR} y2={padT + chartH} stroke="#e5e7eb" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
const DoctorDashboard = () => {
  const [timeFilter,    setTimeFilter]    = useState("Today");
  const [chartView,     setChartView]     = useState("Monthly");
  const [weekFilter,    setWeekFilter]    = useState("Weekly");
  const [clinicFilter,  setClinicFilter]  = useState("Trustcare Clinic");
  const [apptFilter,    setApptFilter]    = useState("Monthly");
  const [patientFilter, setPatientFilter] = useState("Weekly");

  return (
    <div className="bg-light min-vh-100 p-3 p-md-4">

      {/* ── Top Navigation ── */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <h4 className="fw-bold mb-0">Doctor Dashboard</h4>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="primary" className="d-flex align-items-center gap-2 px-3 py-2">
            <FiPlus size={18} /><span>New Appointment</span>
          </Button>
          <Button variant="outline-secondary" className="d-flex align-items-center gap-2 px-3 py-2">
            <FiSettings size={18} /><span>Schedule Availability</span>
          </Button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — Stat Metric Cards (unchanged)                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Row className="g-3 mb-3">
        {[
          {
            label: "Total Appointments", value: "658", badge: "+95%", badgeBg: "#22c55e",
            icon: <FiCalendar size={20} />, iconColor: "#4840BB", iconBorder: "#c7d2fe", iconBg: "#f5f3ff",
            bars: [28, 38, 44, 36, 50, 42, 30], barColor: "#4840BB", trend: "+21%", trendUp: true, trendColor: "#22c55e",
          },
          {
            label: "Online Consultations", value: "125", badge: "-15%", badgeBg: "#ef4444",
            icon: <FiUsers size={20} />, iconColor: "#ef4444", iconBorder: "#fecaca", iconBg: "#fff5f5",
            bars: [32, 44, 36, 50, 38, 46, 28], barColor: "#f97316", trend: "+21%", trendUp: false, trendColor: "#22c55e",
          },
          {
            label: "Cancelled Appointments", value: "35", badge: "+45%", badgeBg: "#22c55e",
            icon: <FiXSquare size={20} />, iconColor: "#22c55e", iconBorder: "#bbf7d0", iconBg: "#f0fdf4",
            bars: [20, 28, 22, 36, 30, 40, 34], barColor: "#22c55e", trend: "+31%", trendUp: true, trendColor: "#22c55e",
          },
          {
            label: "Completed Appointments", value: "512", badge: "+22%", badgeBg: "#22c55e",
            icon: <FiCheckCircle size={20} />, iconColor: "#F59E0B", iconBorder: "#fde68a", iconBg: "#fffbeb",
            bars: [24, 34, 28, 42, 36, 44, 32], barColor: "#F59E0B", trend: "+14%", trendUp: true, trendColor: "#22c55e",
          },
        ].map((card, i) => (
          <Col key={i} xs={12} sm={6} xl={3}>
            <Card className="border-0 shadow-lg h-100" style={{ borderRadius: 14, border: "1px solid #f1f5f9" }}>
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500, lineHeight: 1 }}>{card.label}</span>
                  <div style={{ width: 40, height: 40, borderRadius: 8, border: `1.5px solid ${card.iconBorder}`, backgroundColor: card.iconBg, color: card.iconColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 8 }}>
                    {card.icon}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3" style={{ flexWrap: "nowrap" }}>
                  <span style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{card.value}</span>
                  <span style={{ backgroundColor: card.badgeBg, color: "#fff", borderRadius: 6, padding: "3px 8px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{card.badge}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, marginBottom: 10, width: "100%" }}>
                  {card.bars.map((h, idx) => (
                    <div key={idx} style={{ flex: 1, height: h, backgroundColor: card.barColor, borderRadius: 4, opacity: idx === card.bars.length - 1 ? 0.45 : 1, minWidth: 0 }} />
                  ))}
                </div>
                <div className="d-flex align-items-center gap-1" style={{ fontSize: 12.5 }}>
                  <span style={{ color: card.trendColor, fontWeight: 700 }}>{card.trend}</span>
                  {card.trendUp ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke={card.trendColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                  <span className="text-muted">in last 7 Days</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>


      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — Upcoming + Chart  ← REPLACED with Doc 3 design        */}
      {/* ══════════════════════════════════════════════════════════════════ */}

      {/* Styles only for Section 2 layout */}
      <style>{`
        .sec2-grid {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 20px;
          margin-bottom: 1rem;
          align-items: stretch;
        }
        .sec2-card {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.05);
          padding: 24px;
        }
        @media (max-width: 992px) {
          .sec2-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .sec2-card { padding: 16px; }
        }
      `}</style>

      <div className="sec2-grid shadow-lg">
        {/* Left — Upcoming Card */}
        <div className="sec2-card">
          <UpcomingCard />
        </div>

        {/* Right — Appointments Chart */}
        <div className="sec2-card shadow-lg" style={{ display: "flex", flexDirection: "column" }}>
          <AppointmentsChart />
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — Mini Square Stats (unchanged)                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Row className="g-3 mb-3">
        {miniStats.map((stat, index) => (
          <Col xs={6} sm={4} md={3} lg={2} key={index} >
            <div style={{
              width: "100%", aspectRatio: "1/1", background: "#fff", borderRadius: 14, padding: 14,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: stat.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <i className={`bi ${stat.icon}`} style={{ fontSize: 18 }}></i>
              </div>
              <div>
                <div style={{ fontSize: 13, marginBottom: 4 }}>{stat.title}</div>
                <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 2 }}>{stat.value}</div>
                <div className={stat.changeColor} style={{ fontSize: 13, fontWeight: 600 }}>{stat.change}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — Recent Appointments Table (unchanged)                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Card className="border-0 shadow-sm shadow-lg">
        <Card.Body className="p-0">
          <div className="d-flex justify-content-between align-items-center p-4 pb-3">
            <h5 className="fw-bold mb-0">Recent Appointments</h5>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm" className="border-0 bg-white"
                style={{ border: "1px solid #e5e7eb" }}>
                {weekFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => setWeekFilter("Daily")}>Daily</Dropdown.Item>
                <Dropdown.Item onClick={() => setWeekFilter("Weekly")}>Weekly</Dropdown.Item>
                <Dropdown.Item onClick={() => setWeekFilter("Monthly")}>Monthly</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="table-responsive">
            <Table className="mb-0">
              <thead style={{ backgroundColor: "#F9FAFB" }}>
                <tr>
                  <th className="fw-semibold text-muted small py-3 ps-4 border-0">Patient</th>
                  <th className="fw-semibold text-muted small py-3 border-0">Date & Time</th>
                  <th className="fw-semibold text-muted small py-3 border-0">Mode</th>
                  <th className="fw-semibold text-muted small py-3 border-0">Status</th>
                  <th className="fw-semibold text-muted small py-3 border-0">Consultation Fees</th>
                  <th className="py-3 pe-4 border-0"></th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={appt.id} style={{ borderBottom: index < appointments.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                    <td className="py-3 ps-4 border-0">
                      <div className="d-flex align-items-center">
                        <img src={appt.avatar} alt={appt.name} className="rounded-circle me-3"
                          style={{ width: 40, height: 40, objectFit: "cover" }} />
                        <div>
                          <div className="fw-semibold text-dark">{appt.name}</div>
                          <small className="text-muted">{appt.phone}</small>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted border-0">{appt.dateTime}</td>
                    <td className="py-3 text-muted border-0">{appt.mode}</td>
                    <td className="py-3 border-0">
                      <Badge bg={appt.statusVariant} className="px-3 py-2 fw-normal rounded-pill" style={{ fontSize: "0.75rem" }}>
                        {appt.status}
                      </Badge>
                    </td>
                    <td className="py-3 fw-semibold text-dark border-0">{appt.fees}</td>
                    <td className="py-3 pe-4 border-0">
                      <div className="d-flex gap-2 justify-content-end">
                        <Button variant="light" size="sm" className="border-0 bg-white p-2"
                          style={{ border: "1px solid #E5E7EB", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="bi bi-printer text-muted"></i>
                        </Button>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm" className="border-0 bg-white p-2"
                            id={`dropdown-${appt.id}`}
                            style={{ border: "1px solid #E5E7EB", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <i className="bi bi-three-dots-vertical text-muted"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item>View Details</Dropdown.Item>
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item className="text-danger">Cancel</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>


      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — Availability · Appointment Statistics · Top Patients  */}
      {/*             (unchanged)                                            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Row className="g-3 mb-4 mt-4  ">

        {/* Availability */}
        <Col xs={12} sm={6} md={4} className="shadow-lg">
          <Card className="border-0  h-100" style={{ borderRadius: 14 }}>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3 shadow-lg">
                <h6 className="fw-bold mb-0" style={{ color: "#1e293b", fontSize: 14 }}>Availability</h6>
                <select className="form-select form-select-sm"
                  style={{ width: "auto", fontSize: 12, color: "#475569", borderColor: "#e2e8f0", borderRadius: 8, maxWidth: 120 }}
                  value={clinicFilter} onChange={e => setClinicFilter(e.target.value)}>
                  <option>Trustcare Clinic</option>
                  <option>City Health Center</option>
                </select>
              </div>
              {availability.map(row => (
                <div key={row.day} className="d-flex justify-content-between align-items-center"
                  style={{ padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span className="fw-bold" style={{ fontSize: 13, color: "#1e293b", minWidth: 34, flexShrink: 0 }}>{row.day}</span>
                  {row.closed ? (
                    <span className="d-flex align-items-center gap-1 fw-semibold ms-auto" style={{ fontSize: 12.5, color: "#ef4444", whiteSpace: "nowrap" }}>
                      <i className="bi bi-exclamation-circle-fill" style={{ fontSize: 13 }}></i>Closed
                    </span>
                  ) : (
                    <span className="d-flex align-items-center gap-1 ms-auto" style={{ fontSize: 12.5, color: "#64748b", whiteSpace: "nowrap" }}>
                      <i className="bi bi-clock" style={{ fontSize: 13, flexShrink: 0 }}></i>{row.time}
                    </span>
                  )}
                </div>
              ))}
              <Button variant="outline-secondary" className="w-100 mt-3 fw-semibold"
                style={{ fontSize: 13, borderColor: "#e2e8f0", borderRadius: 8, color: "#475569" }}>
                Edit Availability
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Appointment Statistics */}
        <Col xs={12} sm={6} md={4} className="shadow-lg">
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 12 }}>
            <Card.Body className="p-4 d-flex flex-column">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8, flexWrap: "nowrap", overflow: "hidden" }}>
                <span className="fw-bold" style={{ fontSize: 14, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flexShrink: 1 }}>
                  Appointment Statistics
                </span>
                <div style={{ flexShrink: 0 }}>
                  <select style={{ appearance: "none", WebkitAppearance: "none", border: "1px solid #dee2e6", borderRadius: 8, padding: "5px 28px 5px 10px", fontSize: 13, color: "#495057", backgroundColor: "#fff", cursor: "pointer", outline: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23495057'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 9px center", minWidth: 90 }}
                    value={apptFilter} onChange={e => setApptFilter(e.target.value)}>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center flex-grow-1 justify-content-center" style={{ paddingTop: 8 }}>
                <PieChart width={220} height={220}>
                  <Pie data={appointmentStats} cx={105} cy={105} innerRadius={70} outerRadius={100} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={3} stroke="#fff">
                    {appointmentStats.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}`, n]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                </PieChart>
                <div className="d-flex align-items-center justify-content-center gap-3 mt-1">
                  {appointmentStats.map(d => (
                    <div key={d.name} className="d-flex align-items-center gap-1" style={{ fontSize: 12.5, color: "#6c757d" }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: d.color, display: "inline-block", flexShrink: 0 }} />
                      {d.name}
                    </div>
                  ))}
                </div>
                <div className="d-flex align-items-center justify-content-center mt-2" style={{ gap: 40 }}>
                  {appointmentStats.map(d => (
                    <span key={d.name} className="fw-bold" style={{ fontSize: 20, color: "#1a1a2e" }}>{d.value}</span>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Patients */}
        <Col xs={12} sm={6} md={4} className="shadow-lg">
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 14 }}>
            <Card.Body className="p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0" style={{ color: "#1e293b", fontSize: 14 }}>Top Patients</h6>
                <select className="form-select form-select-sm"
                  style={{ width: "auto", fontSize: 12, color: "#475569", borderColor: "#e2e8f0", borderRadius: 8 }}
                  value={patientFilter} onChange={e => setPatientFilter(e.target.value)}>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              {topPatients.map(p => (
                <div key={p.name} style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <img src={p.avatar} alt={p.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div className="fw-bold" style={{ fontSize: 13, color: "#1e293b", lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.phone}</div>
                  </div>
                  <span style={{ backgroundColor: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe", borderRadius: 6, padding: "3px 9px", fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>
                    {p.appointments}
                  </span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </div>
  );
};

export default DoctorDashboard;