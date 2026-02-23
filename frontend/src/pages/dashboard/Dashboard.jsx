import { useState } from "react";
import "./styles.css";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#f3f4f8}
.ad-page{min-height:100vh;border-radius: 10px;}
.ad-header{    margin: 20px 25px 20px 25px;;display:flex;align-items:center;justify-content:space-between;padding:16px 28px 14px;background:#fff;margin-bottom:20px;}
.ad-header-title{font-size:18px;font-weight:700;color:#1e2130}
.ad-header-btns{display:flex;gap:10px}
.ad-btn-primary{display:flex;align-items:center;gap:6px;background:#3d3bdb;color:#fff;border:none;border-radius:8px;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif}
.ad-btn-secondary{display:flex;align-items:center;gap:6px;background:#fff;color:#3d3bdb;border:1.5px solid #dddcf5;border-radius:8px;padding:8px 16px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif}
.ad-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:0 28px 20px}
.ad-card{background:#fff;border-radius:5px;padding:16px 18px;overflow:hidden}
.ad-card-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.ad-card-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ad-card-icon svg{width:24px;height:24px}
.ci-purple{background:#4f46e5}.ci-red{background:#ef4444}.ci-sky{background:#0ea5e9}.ci-green{background:#22c55e}
.ad-badge-wrap{display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.ad-badge{font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;line-height:1.4}
.bg-green{background:#dcfce7;color:#15803d}.bg-red{background:#fee2e2;color:#dc2626}
.ad-period{font-size:10.5px;color:#94a3b8;white-space:nowrap}
.ad-card-bottom{display:flex;justify-content:space-between;align-items:flex-end}
.ad-card-label{font-size:13px;color:#64748b;margin-bottom:3px}
.ad-card-value{font-size:26px;font-weight:800;color:#1e2130;letter-spacing:-0.5px;line-height:1.1}
.mc-bars{display:flex;align-items:flex-end;gap:3px;height:44px;width:90px}
.mc-bars span{flex:1;border-radius:2px 2px 0 0;background:#4f46e5;opacity:0.85}
.mc-line{width:100px;height:44px;display:block}
.mc-cols{display:flex;align-items:flex-end;gap:2px;height:44px;width:90px}
.mc-cols span{flex:1;border-radius:2px 2px 0 0;background:#38bdf8}
.mc-area{width:110px;height:44px;display:block}

.ad-panel{background:#fff;padding:20px;}
.ad-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.ad-panel-title{font-size:15px;font-weight:700;color:#1e2130}
.ad-sel{border:1.5px solid #e2e8f0;border-radius:8px;padding:5px 28px 5px 10px;font-size:12.5px;color:#374151;background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'%3E%3Cpath fill='%2364748b' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center;appearance:none;cursor:pointer;outline:none;font-family:'Inter',sans-serif}
.ad-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
.ad-sbox{border:1.5px solid #f1f5f9;border-radius:10px;padding:12px 14px;background: #f8fafc;}
.ad-sbox-lbl{font-size:11.5px;color:#64748b;display:flex;align-items:center;gap:5px;margin-bottom:5px}
.ad-sdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.sd-blue{background:#4f46e5}.sd-red{background:#ef4444}.sd-amber{background:#f59e0b}.sd-green{background:#22c55e}
.ad-sval{font-size:22px;font-weight:800;color:#1e2130}
.ad-chart{display:flex;gap:8px;height:220px}
.ad-yaxis{display:flex;flex-direction:column;justify-content:space-between;padding-bottom:20px;min-width:28px}
.ad-ylabel{font-size:10.5px;color:#94a3b8;text-align:right}
.ad-chartinner{flex:1;position:relative}
.ad-gridlines{position:absolute;top:0;left:0;right:0;bottom:20px;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none}
.ad-gline{width:100%;border-top:1px dashed #e8eaf0}
.ad-barsrow{position:absolute;left:0;right:0;top:0;bottom:20px;display:flex;align-items:flex-end;gap:3px}
.ad-barwrap{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end;position:relative}
.ad-barstack{display:flex;flex-direction:column-reverse;align-items:stretch;border-radius:4px 4px 0 0;overflow:hidden;width:16px}
.bc{background:#2dd4bf}.bo{background:#38bdf8}.br{background:#818cf8}
.ad-barlbl{font-size:10px;color:#94a3b8;position:absolute;bottom:0;left:50%;transform:translateX(-50%);white-space:nowrap}
.ad-legend{display:flex;gap:20px;margin-top:12px;justify-content:center}
.ad-leg{display:flex;align-items:center;gap:5px;font-size:11.5px;color:#64748b}
.ad-legsq{width:12px;height:12px;border-radius:2px;flex-shrink:0}
.lc{background:#2dd4bf}.lo{background:#38bdf8}.lr{background:#818cf8}
.ad-rpanel{background:#fff;padding:20px;position:relative;overflow:hidden}
.ad-rtab{position:absolute;right:0;top:50%;transform:translateY(-50%);width:6px;height:52px;background:#3d3bdb;border-radius:4px 0 0 4px}
.ad-cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.ad-cal-nav{background:none;border:none;cursor:pointer;color:#64748b;font-size:20px;width:26px;height:26px;display:flex;align-items:center;justify-content:center;border-radius:5px;line-height:1}
.ad-cal-nav:hover{background:#f1f5f9}
.ad-cal-title{font-size:13.5px;font-weight:600;color:#1e2130}
.ad-calgrid{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;row-gap:0}
.ad-cdn{font-size:11px;font-weight:600;color:#94a3b8;padding:5px 0}
.ad-cd{font-size:12px;color:#374151;padding:12px 0;border-radius:50%;cursor:pointer;line-height:1.5}
.ad-cd:hover{background:#f1f5f9}
.ad-cd-today{background:#3d3bdb!important;color:#fff!important;font-weight:700;border-radius:50%}
.ad-cd-other{color:#cbd5e1}
.ad-appt{display:flex;align-items:center;justify-content:space-between;background:#f8fafc;border-radius:12px;padding:12px 14px;margin-top:14px;border:1px solid #f1f5f9}
.ad-appt-name{font-size:13.5px;font-weight:600;color:#1e2130;margin-bottom:4px}
.ad-appt-time{font-size:11px;color:#64748b;display:flex;align-items:center;gap:4px}
.ad-appt-avatar{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #e2e8f0;flex-shrink:0}
`;

const BAR_DATA = [
  {m:"Jan",c:900, o:700, r:500 },{m:"Feb",c:1100,o:900, r:700 },
  {m:"Mar",c:1750,o:1350,r:950 },{m:"Apr",c:1550,o:1200,r:870 },
  {m:"May",c:2300,o:1750,r:1450},{m:"Jun",c:650, o:550, r:380 },
  {m:"Jul",c:1150,o:880, r:590 },{m:"Aug",c:1350,o:1020,r:690 },
  {m:"Sep",c:2600,o:1950,r:1500},{m:"Oct",c:2350,o:1780,r:1230},
  {m:"Nov",c:1750,o:1320,r:920 },{m:"Dec",c:1450,o:1070,r:730 },
];
const MAX=5000;

const FEB=[
  [1,2,3,4,5,6,7],[8,9,10,11,12,13,14],
  [15,16,17,18,19,20,21],[22,23,24,25,26,27,28],
  ["n1","n2","n3","n4","n5","n6","n7"],
  ["n8","n9","n10","n11","n12","n13","n14"],
];
// Icons using SVG inline for zero dependencies
const icons = {
  allPatient: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#5b8dee" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke="#5b8dee" strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#5b8dee" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#5b8dee" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  doctors: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="7" r="3" stroke="#3db87a" strokeWidth="2"/>
      <circle cx="16" cy="7" r="3" stroke="#3db87a" strokeWidth="2"/>
      <path d="M2 21v-2a5 5 0 0 1 5-5h2" stroke="#3db87a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 14h2a5 5 0 0 1 5 5v2" stroke="#3db87a" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="3" stroke="#3db87a" strokeWidth="2"/>
    </svg>
  ),
  labs: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M9 3h6v10l3 5H6l3-5V3z" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 3H6" stroke="#f5a623" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 3h3" stroke="#f5a623" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  prescriptions: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M3 3h18v18H3z" stroke="#e05252" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M8 12h4m0 0h4m-4 0V8m0 4v4" stroke="#e05252" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 8l4 4 4-4" stroke="#e05252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  visits: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9b59b6" strokeWidth="2"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="2" fill="#9b59b6"/>
    </svg>
  ),
  medicalResults: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#17a2b8" strokeWidth="2" strokeLinejoin="round"/>
      <polyline points="14,2 14,8 20,8" stroke="#17a2b8" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 13h6M9 17h4" stroke="#17a2b8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const quickLinks = [
  { label: "All Patient", icon: icons.allPatient, bg: "#eef2ff" },
  { label: "Doctors", icon: icons.doctors, bg: "#edfbf3" },
  { label: "Labs Results", icon: icons.labs, bg: "#fff8ec" },
  { label: "Prescriptions", icon: icons.prescriptions, bg: "#fff0f0" },
  { label: "Visits", icon: icons.visits, bg: "#f8f0ff" },
  { label: "Medical Results", icon: icons.medicalResults, bg: "#eef9fc" },
];

const patientReports = [
  { name: "David Marshall", type: "Hemoglobin", color: "#5b8dee", icon: "💧" },
  { name: "Thomas McLean", type: "X Ray", color: "#3db87a", icon: "⭕" },
  { name: "Greta Kinney", type: "MRI Scan", color: "#e05252", icon: "🔴" },
  { name: "Larry Wilburn", type: "Blood Test", color: "#9b59b6", icon: "🟣" },
  { name: "Reyan Verol", type: "CT Scan", color: "#17a2b8", icon: "📋" },
];

const doctors = [
  { name: "Dr. William Harrison", specialty: "Cardiology", available: true },
  { name: "Dr. Victoria Adams", specialty: "Urology", available: false },
  { name: "Dr. Jonathan Bennett", specialty: "Radiology", available: true },
  { name: "Dr. Natalie Brooks", specialty: "ENT Surgery", available: true },
  { name: "Dr. Samuel Reed", specialty: "Dermatology", available: true },
];

// Donut chart SVG for patient visits
const DonutChart = ({ percentage = 90 }) => {
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circumference = 2 * Math.PI * r;
  const dots = 60;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      {Array.from({ length: dots }).map((_, i) => {
        const angle = (i / dots) * 2 * Math.PI - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const filled = i / dots < percentage / 100;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.5"
            fill={filled ? (i % 2 === 0 ? "#5b8dee" : "#a78bfa") : "#e5e7eb"}
          />
        );
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="12" fill="#6b7280">
        Total Patients
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="22" fontWeight="700" fill="#111827">
        {percentage}%
      </text>
    </svg>
  );
};
function BarChart(){
  return(
    <div className="ad-chart">
      <div className="ad-yaxis">
        {["5K","4K","3K","2K","1K","0K"].map(l=><span key={l} className="ad-ylabel">{l}</span>)}
      </div>
      <div className="ad-chartinner">
        <div className="ad-gridlines">
          {[0,1,2,3,4,5].map(i=><div key={i} className="ad-gline"/>)}
        </div>
        <div className="ad-barsrow">
          {BAR_DATA.map(d=>{
            const cp=(d.c/MAX)*100,op=(d.o/MAX)*100,rp=(d.r/MAX)*100,tot=cp+op+rp;
            return(
              <div key={d.m} className="ad-barwrap">
                <div className="ad-barstack" style={{height:`${tot}%`}}>
                  <div className="br" style={{height:`${(rp/tot)*100}%`}}/>
                  <div className="bo" style={{height:`${(op/tot)*100}%`}}/>
                  <div className="bc" style={{height:`${(cp/tot)*100}%`}}/>
                </div>
                <span className="ad-barlbl">{d.m}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const goPrev = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNext = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const cells = [];

  // Previous month days
  for (let i = firstDay; i > 0; i--) {
    cells.push({
      value: daysInPrevMonth - i + 1,
      other: true,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({
      value: i,
      other: false,
      today:
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear(),
    });
  }

  // Fill to always 42 cells (6 rows = better UI height)
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({
      value: nextDay++,
      other: true,
    });
  }

  return (
    <>
      <div className="ad-cal-head">
        <button className="ad-cal-nav" onClick={goPrev}>‹</button>
        <span className="ad-cal-title">
          {monthName} {year}
        </span>
        <button className="ad-cal-nav" onClick={goNext}>›</button>
      </div>

      <div className="ad-calgrid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="ad-cdn">{d}</div>
        ))}

        {cells.map((cell, index) => (
          <div
            key={index}
            className={`ad-cd${cell.today ? " ad-cd-today" : ""}${cell.other ? " ad-cd-other" : ""}`}
          >
            {cell.value}
          </div>
        ))}
      </div>
    </>
  );
}




// ── Data ─────────────────────────────────────────────────────────────
const DEPARTMENTS = [
  { name: "Cardiology",  color: "#4f8ef7", value: 22 },
  { name: "Neurology",   color: "#2c2c2c", value: 16 },
  { name: "Dermatology", color: "#9b59b6", value: 15 },
  { name: "Orthopedics", color: "#f5a623", value: 14 },
  { name: "Urology",     color: "#f7c948", value: 18 },
  { name: "Radiology",   color: "#3db87a", value: 15 },
];

// ── Pie / Donut Chart (SVG path-based) ───────────────────────────────
const DeptDonutChart = () => {
  const size = 190;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 80;
  const innerR = 50;
  const GAP_DEG = 2.5;
  const total = DEPARTMENTS.reduce((s, d) => s + d.value, 0);
  const toRad = (deg) => (deg * Math.PI) / 180;
  let startAngle = -90;

  const slices = DEPARTMENTS.map((dep) => {
    const angleDeg = (dep.value / total) * 360 - GAP_DEG;
    const endAngle = startAngle + angleDeg;
    const x1  = cx + outerR * Math.cos(toRad(startAngle));
    const y1  = cy + outerR * Math.sin(toRad(startAngle));
    const x2  = cx + outerR * Math.cos(toRad(endAngle));
    const y2  = cy + outerR * Math.sin(toRad(endAngle));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle));
    const large = angleDeg > 180 ? 1 : 0;
    const d = [
      `M ${x1} ${y1}`,
      `A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1}`,
      "Z",
    ].join(" ");
    startAngle += angleDeg + GAP_DEG;
    return { ...dep, d };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="pie-svg">
      {slices.map((seg, i) => (
        <path key={i} d={seg.d} fill={seg.color} className="pie-slice" />
      ))}
      <circle cx={cx} cy={cy} r={innerR - 2} fill="white" />
      <text x={cx} y={cy - 8} textAnchor="middle" className="pie-label-sm">
        Appointments
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" className="pie-label-lg">
        3656
      </text>
    </svg>
  );
};

// ── Patient Record Data ───────────────────────────────────────────────
const DEPT_COLORS = {
  Cardiology:    { bg: "#eef4ff", color: "#4f8ef7" },
  Urology:       { bg: "#edfbf3", color: "#3db87a" },
  Radiology:     { bg: "#eef4ff", color: "#7ba8f5" },
  "ENT Surgery": { bg: "#fdf0ff", color: "#c36dd6" },
  Dermatology:   { bg: "#edfbf3", color: "#3db87a" },
};

const PATIENTS = [
  { name: "James Carter",  diagnosis: "Male",   department: "Cardiology",  lastVisit: "17 Jun 2025" },
  { name: "Emily Davis",   diagnosis: "Female", department: "Urology",     lastVisit: "10 Jun 2025" },
  { name: "Michael John",  diagnosis: "Male",   department: "Radiology",   lastVisit: "22 May 2025" },
  { name: "Olivia Miller", diagnosis: "Female", department: "ENT Surgery", lastVisit: "15 May 2025" },
  { name: "David Smith",   diagnosis: "Male",   department: "Dermatology", lastVisit: "30 Apr 2025" },
];




// ── Data ─────────────────────────────────────────────────────────────
const APPOINTMENTS = [
  {
    doctor: "Dr. John Smith",
    specialty: "Neurosurgeon",
    patient: "Jesus Adams",
    phone: "+1 41254 45214",
    dateTime: "28 May 2025 - 11:15 AM",
    mode: "Online",
    status: "Confirmed",
  },
  {
    doctor: "Dr. Lisa White",
    specialty: "Oncologist",
    patient: "Ezra Belcher",
    phone: "+1 65895 41247",
    dateTime: "29 May 2025 - 11:30 AM",
    mode: "In-Person",
    status: "Cancelled",
  },
  {
    doctor: "Dr. Patricia Brown",
    specialty: "Pulmonologist",
    patient: "Glen Lentz",
    phone: "+1 62458 45845",
    dateTime: "30 May 2025 - 09:30 AM",
    mode: "Online",
    status: "Confirmed",
  },
  {
    doctor: "Dr. Rachel Green",
    specialty: "Urologist",
    patient: "Bernard Griffith",
    phone: "+1 61422 45214",
    dateTime: "30 May 2025 - 10:00 AM",
    mode: "Online",
    status: "Checked Out",
  },
  {
    doctor: "Dr. Michael Smith",
    specialty: "Cardiologist",
    patient: "John Elsass",
    phone: "+1 47851 26371",
    dateTime: "30 May 2025 - 11:00 AM",
    mode: "Online",
    status: "Schedule",
  },
];

const TOP_PATIENTS = [
  { name: "Jesus Adams",    paid: "$6589", appointments: 80, color: "#4f8ef7" },
  { name: "Ezra Belcher",   paid: "$5632", appointments: 60, color: "#4f8ef7" },
  { name: "Glen Lentz",     paid: "$4125", appointments: 40, color: "#4f8ef7" },
  { name: "Bernard Griffith", paid: "$3140", appointments: 25, color: "#4f8ef7" },
];

const TRANSACTIONS = [
  { label: "General Check-up",    id: "#INV5889", amount: "+$234", type: "stripe", positive: true },
  { label: "Online Consultation", id: "#INV7874", amount: "+$234", type: "paypal", positive: true },
  { label: "Purchase Product",    id: "#INV4458", amount: "-$69",  type: "stripe", positive: false },
  { label: "Online Consultation", id: "#INV5456", amount: "+$234", type: "paypal", positive: true },
];

const LEAVE_REQUESTS = [
  { name: "James Allaire",   detail: "4 Days · Personal Reason" },
  { name: "Esther Schmidt",  detail: "2 Days · Going to Hospital" },
  { name: "Valerie Padgett", detail: "1 Day · Changing Account" },
  { name: "Diane Nash",      detail: "1 Day · Not Well" },
];

// ── Status badge helper ───────────────────────────────────────────────
const statusClass = (status) => {
  switch (status) {
    case "Confirmed":   return "badge-confirmed";
    case "Cancelled":   return "badge-cancelled";
    case "Checked Out": return "badge-checkedout";
    case "Schedule":    return "badge-schedule";
    default:            return "badge-confirmed";
  }
};

// ── Avatar placeholder ────────────────────────────────────────────────
const Avatar = ({ name, size = 38, rounded = false }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#4f8ef7", "#3db87a", "#9b59b6", "#f5a623", "#e05252", "#17a2b8", "#f7c948"];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className="av-wrap"
      style={{
        width: size,
        height: size,
        background: bg,
        borderRadius: rounded ? "50%" : "10px",
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
};

// ── Stripe / PayPal icons ─────────────────────────────────────────────
const StripeIcon = () => (
  <div className="txn-icon stripe-icon">
    <svg width="28" height="12" viewBox="0 0 60 25" fill="none">
      <text x="0" y="20" fontFamily="Arial" fontWeight="800" fontSize="22" fill="#635bff">stripe</text>
    </svg>
  </div>
);

const PaypalIcon = () => (
  <div className="txn-icon paypal-icon">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#003087"/>
      <path d="M8 7h5c2 0 3 1 2.5 3C15 12 13.5 13 12 13H10l-1 4H7l1-10z" fill="#009cde"/>
      <path d="M10 10h2c1 0 1.5.5 1.2 1.5C13 12.5 12 13 11 13H9.5l.5-3z" fill="white"/>
    </svg>
  </div>
);
export default function Dashboard(){
  return(
    <div className="ad-page">
      <style>{CSS}</style>
      <div className="ad-header box_shadow">
        <span className="ad-header-title">Admin Dashboard</span>
        <div className="ad-header-btns">
          <button className="ad-btn-primary">
            <svg viewBox="0 0 24 24" fill="white" width="13" height="13"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            + New Appointment
          </button>
          <button className="ad-btn-secondary">
            <svg viewBox="0 0 24 24" fill="#3d3bdb" width="13" height="13"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
            Schedule Availability
          </button>
        </div>
      </div>

      <div className="ad-cards">
        {/* Doctors */}
        <div className="ad-card box_shadow">
          <div className="ad-card-top">
            <div className="ad-card-icon ci-purple">
              <svg viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div className="ad-badge-wrap">
              <span className="ad-badge bg-green">+95%</span>
              <span className="ad-period">in last 7 Days</span>
            </div>
          </div>
          <div className="ad-card-bottom">
            <div><div className="ad-card-label">Doctors</div><div className="ad-card-value">247</div></div>
            <div className="mc-bars">{[35,55,40,70,50,65,80,60,90,75].map((h,i)=><span key={i} style={{height:`${h}%`}}/>)}</div>
          </div>
        </div>
        {/* Patients */}
        <div className="ad-card   box_shadow">
          <div className="ad-card-top">
            <div className="ad-card-icon ci-red">
              <svg viewBox="0 0 24 24" fill="white"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
            <div className="ad-badge-wrap">
              <span className="ad-badge bg-green">+25%</span>
              <span className="ad-period">in last 7 Days</span>
            </div>
          </div>
          <div className="ad-card-bottom">
            <div><div className="ad-card-label">Patients</div><div className="ad-card-value">4178</div></div>
            <svg className="mc-line" viewBox="0 0 100 44" preserveAspectRatio="none">
              <polyline points="0,38 10,34 20,36 30,26 40,30 50,22 60,28 70,18 80,24 90,14 100,18" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        {/* Appointment */}
        <div className="ad-card   box_shadow">
          <div className="ad-card-top">
            <div className="ad-card-icon ci-sky">
              <svg viewBox="0 0 24 24" fill="white"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
            </div>
            <div className="ad-badge-wrap">
              <span className="ad-badge bg-red">-15%</span>
              <span className="ad-period">in last 7 Days</span>
            </div>
          </div>
          <div className="ad-card-bottom">
            <div><div className="ad-card-label">Appointment</div><div className="ad-card-value">12178</div></div>
            <div className="mc-cols">{[45,75,55,90,60,100,70,85,50,95].map((h,i)=><span key={i} style={{height:`${h}%`}}/>)}</div>
          </div>
        </div>
        {/* Revenue */}
        <div className="ad-card   box_shadow">
          <div className="ad-card-top">
            <div className="ad-card-icon ci-green">
              <svg viewBox="0 0 24 24" fill="white"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            </div>
            <div className="ad-badge-wrap">
              <span className="ad-badge bg-green">+25%</span>
              <span className="ad-period">in last 7 Days</span>
            </div>
          </div>
          <div className="ad-card-bottom">
            <div><div className="ad-card-label">Revenue</div><div className="ad-card-value">$55,1240</div></div>
            <svg className="mc-area" viewBox="0 0 110 44" preserveAspectRatio="none">
              <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity="0.35"/><stop offset="100%" stopColor="#34d399" stopOpacity="0"/></linearGradient></defs>
              <polygon points="0,44 0,36 15,32 30,34 45,24 60,26 75,16 90,10 110,12 110,44" fill="url(#ag)"/>
              <polyline points="0,36 15,32 30,34 45,24 60,26 75,16 90,10 110,12" fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="ad-content">

  {/* LEFT COLUMN */}
  <div className="ad-left">

    {/* Appointment Statistics */}
    <div className="ad-panel box_shadow">
      <div className="ad-panel-head">
        <span className="ad-panel-title">Appointment Statistics</span>
        <select className="ad-sel">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>

      <div className="ad-summary">
        <div className="ad-sbox">
          <div className="ad-sbox-lbl"><span className="ad-sdot sd-blue"/>All Appointments</div>
          <div className="ad-sval">6314</div>
        </div>

        <div className="ad-sbox">
          <div className="ad-sbox-lbl"><span className="ad-sdot sd-red"/>Cancelled</div>
          <div className="ad-sval">456</div>
        </div>

        <div className="ad-sbox">
          <div className="ad-sbox-lbl"><span className="ad-sdot sd-amber"/>Reschedule</div>
          <div className="ad-sval">745</div>
        </div>

        <div className="ad-sbox">
          <div className="ad-sbox-lbl"><span className="ad-sdot sd-green"/>Completed</div>
          <div className="ad-sval">4578</div>
        </div>
      </div>

      <BarChart/>

      <div className="ad-legend">
        <div className="ad-leg"><span className="ad-legsq lc"/>Completed</div>
        <div className="ad-leg"><span className="ad-legsq lo"/>Ongoing</div>
        <div className="ad-leg"><span className="ad-legsq lr"/>Rescheduled</div>
      </div>
    </div>


    {/* Doctors On Duty - Separate Card */}
    <div className="ad-panel box_shadow">
      <div className="ad-doc-head">
        <span className="ad-panel-title">Doctors On Duty</span>
        <button className="ad-view-btn">View All</button>
      </div>

      <div className="ad-doc-grid">

        <div className="ad-doc-card">
          <div className="ad-doc-img"></div>
          <div className="ad-doc-info">
            <div className="ad-doc-name">Dr. John Smith</div>
            <div className="ad-doc-spec">Cardiologist</div>
            <div className="ad-doc-meta">
              <span>Appointments: 120</span>
              <span className="ad-status active">Active</span>
            </div>
          </div>
        </div>

        <div className="ad-doc-card">
          <div className="ad-doc-img"></div>
          <div className="ad-doc-info">
            <div className="ad-doc-name">Dr. Emma Watson</div>
            <div className="ad-doc-spec">Neurologist</div>
            <div className="ad-doc-meta">
              <span>Appointments: 98</span>
              <span className="ad-status inactive">On Leave</span>
            </div>
          </div>
        </div>
        

      </div>
    </div>

  </div>


  {/* RIGHT COLUMN */}
  <div className="ad-right">

    {/* Calendar Card */}
    <div className="ad-rpanel box_shadow">
      <div className="ad-panel-head">
        <span className="ad-panel-title">Appointments</span>
        <select className="ad-sel">
          <option>All Type</option>
          <option>General</option>
          <option>Emergency</option>
        </select>
      </div>
      <Calendar/>
    </div>


    {/* General Visits Card */}
    <div className="ad-rpanel box_shadow">
<span className="ad-panel-title">General Visits</span>
      <div className="ad-appt">
        <div>
          <div className="ad-appt-name">General Visit</div>
          <div className="ad-appt-time">
            Wed, 05 Apr 2025, 06:30 PM
          </div>
        </div>
        <img className="ad-appt-avatar"
             src="https://randomuser.me/api/portraits/women/44.jpg"
             alt="avatar"/>
      </div>

      <div className="ad-appt">
        <div>
          <div className="ad-appt-name">General Visit</div>
          <div className="ad-appt-time">
            Wed, 05 Apr 2025, 06:30 PM
          </div>
        </div>
        <img className="ad-appt-avatar"
             src="https://randomuser.me/api/portraits/women/44.jpg"
             alt="avatar"/>
      </div>
    </div>

  </div>

</div>






<div className="dashboard-section">
      {/* Quick Links Row */}
      <div className="row g-3 mb-4">
        {quickLinks.map((link) => (
          <div className="col-6 col-sm-4 col-md-2" key={link.label}>
            <div className="quick-card   box_shadow" style={{ background: "white" }}>
              <div className="quick-icon">{link.icon}</div>
              <p className="quick-label">{link.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom 3 Columns */}
      <div className="row g-3">
        {/* Patient Reports */}
        <div className="col-12 col-md-4">
          <div className="dash-card h-100 box_shadow">
            <div className="dash-card-header">
              <span className="dash-card-title">Patient Reports</span>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="report-list">
              {patientReports.map((r) => (
                <div className="report-item" key={r.name}>
                  <div className="report-icon-wrap" style={{ borderColor: r.color }}>
                    <span style={{ fontSize: "14px" }}>{r.icon}</span>
                  </div>
                  <div className="report-info">
                    <p className="report-name">{r.name}</p>
                    <p className="report-type">{r.type}</p>
                  </div>
                  <button className="download-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                      <polyline points="7,10 12,15 17,10" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="15" x2="12" y2="3" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Visits */}
        <div className="col-12 col-md-4">
          <div className="dash-card h-100 box_shadow">
            <div className="dash-card-header">
              <span className="dash-card-title">Patient Visits</span>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="visits-chart">
              <DonutChart percentage={90} />
            </div>
            <div className="gender-stats">
              <div className="gender-row">
                <div className="gender-icon male-icon">♂</div>
                <div className="gender-info">
                  <p className="gender-label">Male</p>
                  <p className="gender-change">-15% Since Last Week</p>
                </div>
                <span className="gender-pct">69%</span>
              </div>
              <div className="gender-row">
                <div className="gender-icon female-icon">♀</div>
                <div className="gender-info">
                  <p className="gender-label">Female</p>
                  <p className="gender-change">-15% Since Last Week</p>
                </div>
                <span className="gender-pct">56%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="col-12 col-md-4">
          <div className="dash-card h-100 box_shadow">
            <div className="dash-card-header">
              <span className="dash-card-title">Doctors</span>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="doctor-list">
              {doctors.map((doc) => (
                <div className="doctor-item" key={doc.name}>
                  <div className="doctor-avatar">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="#d1d5db"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#d1d5db"/>
                    </svg>
                  </div>
                  <div className="doctor-info">
                    <p className="doctor-name">{doc.name}</p>
                    <p className="doctor-spec">{doc.specialty}</p>
                  </div>
                  <span className={`avail-badge ${doc.available ? "available" : "unavailable"}`}>
                    {doc.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="dept-section">
      <div className="row g-3">

        {/* Left: Top Departments */}
        <div className="col-12 col-md-5">
          <div className="ds-card h-100 box_shadow">
            <div className="ds-card-header">
              <span className="ds-card-title">Top Departments</span>
              <button className="ds-view-btn">View All</button>
            </div>

            <div className="dept-body">
              <div className="dept-chart-row">
                <DeptDonutChart />
                <div className="dept-legend">
                  {DEPARTMENTS.map((dep) => (
                    <div className="legend-item" key={dep.name}>
                      <span className="legend-dot" style={{ background: dep.color }} />
                      <span className="legend-name">{dep.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dept-stats-row">
                <div className="dept-stat">
                  <p className="stat-value">$2512.32</p>
                  <p className="stat-label">Revenue Generated</p>
                </div>
                <div className="dept-stat-divider" />
                <div className="dept-stat">
                  <p className="stat-value">3125+</p>
                  <p className="stat-label">Appointments last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Patient Record */}
        <div className="col-12 col-md-7">
          <div className="ds-card h-100 box_shadow">
            <div className="ds-card-header">
              <span className="ds-card-title">Patient Record</span>
              <button className="ds-view-btn">View All</button>
            </div>

            <div className="table-responsive">
              <table className="patient-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Diagnosis</th>
                    <th>Department</th>
                    <th>Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {PATIENTS.map((p) => {
                    const dc = DEPT_COLORS[p.department] || { bg: "#f3f4f6", color: "#6b7280" };
                    return (
                      <tr key={p.name}>
                        <td className="pt-name">{p.name}</td>
                        <td className="pt-diagnosis">{p.diagnosis}</td>
                        <td>
                          <span className="dept-badge" style={{ background: dc.bg, color: dc.color }}>
                            {p.department}
                          </span>
                        </td>
                        <td className="pt-date">{p.lastVisit}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      <div className="appt-section">

      {/* ── All Appointments Table ── */}
      <div className="appt-card mb-3 box_shadow">
        <div className="appt-card-header">
          <span className="appt-card-title">All Appointments</span>
          <button className="appt-view-btn">View All</button>
        </div>

        <div className="table-responsive">
          <table className="appt-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date &amp; Time</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {APPOINTMENTS.map((a, i) => (
                <tr key={i}>
                  <td>
                    <div className="person-cell">
                      <Avatar name={a.doctor} size={40} rounded />
                      <div>
                        <p className="person-name">{a.doctor}</p>
                        <p className="person-sub">{a.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="person-cell">
                      <Avatar name={a.patient} size={40} rounded />
                      <div>
                        <p className="person-name">{a.patient}</p>
                        <p className="person-sub">{a.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="cell-datetime">{a.dateTime}</td>
                  <td className="cell-mode">{a.mode}</td>
                  <td>
                    <span className={`status-badge ${statusClass(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom 3 Columns ── */}
      <div className="row g-3">

        {/* Top 5 Patients */}
        <div className="col-12 col-md-4">
          <div className="appt-card h-100 box_shadow">
            <div className="appt-card-header">
              <span className="appt-card-title">Top 5 Patients</span>
              <button className="appt-view-btn">View All</button>
            </div>
            <div className="patient-list">
              {TOP_PATIENTS.map((p, i) => (
                <div className="top-patient-row" key={i}>
                  <Avatar name={p.name} size={42} rounded />
                  <div className="tp-info">
                    <p className="tp-name">{p.name}</p>
                    <p className="tp-paid">Total Paid : {p.paid}</p>
                  </div>
                  <span className="appt-count-badge">{p.appointments} Appointments</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-12 col-md-4">
          <div className="appt-card h-100 box_shadow">
            <div className="appt-card-header">
              <span className="appt-card-title">Recent Transactions</span>
              <div className="dropdown-pill">Weekly <span>&#8964;</span></div>
            </div>
            <div className="txn-list">
              {TRANSACTIONS.map((t, i) => (
                <div className="txn-row" key={i}>
                  {t.type === "stripe" ? <StripeIcon /> : <PaypalIcon />}
                  <div className="txn-info">
                    <p className="txn-label">{t.label}</p>
                    <p className="txn-id">{t.id}</p>
                  </div>
                  <span className={`txn-amount ${t.positive ? "txn-pos" : "txn-neg"}`}>
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="col-12 col-md-4">
          <div className="appt-card h-100 box_shadow">
            <div className="appt-card-header">
              <span className="appt-card-title">Leave Requests</span>
              <div className="dropdown-pill">Today <span>&#8964;</span></div>
            </div>
            <div className="leave-list">
              {LEAVE_REQUESTS.map((l, i) => (
                <div className="leave-row" key={i}>
                  <Avatar name={l.name} size={42} rounded />
                  <div className="leave-info">
                    <p className="leave-name">{l.name}</p>
                    <p className="leave-detail">{l.detail}</p>
                  </div>
                  <div className="leave-actions">
                    <button className="action-btn reject">&#10005;</button>
                    <button className="action-btn approve">&#10003;</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
    
    </div>
    
    

    </div>
  );
}