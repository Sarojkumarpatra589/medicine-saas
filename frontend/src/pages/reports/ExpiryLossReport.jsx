import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";

// ── DATA ──────────────────────────────────────────────────────
const kpiCards = [
  { label: "Total Inventory Value",   value: "$1,250,000", valueColor: "#1a2744", barColor: "#1565c0", barW: "80%" },
  { label: "Expired Stock Value",     value: "$45,780",    valueColor: "#c62828", barColor: "#c62828", barW: "45%" },
  { label: "Loss Percentage",         value: "3.65%",      valueColor: "#2e7d32", barColor: "#2e7d32", barW: "30%" },
  { label: "Recoverable Loss",        value: "$12,300",    valueColor: "#e65100", barColor: "#e65100", barW: "25%" },
  { label: "Non-Recoverable Loss",    value: "$33,480",    valueColor: "#6a1b9a", barColor: "#6a1b9a", barW: "55%" },
  { label: "Avg Monthly Expiry Rate", value: "1.8%",       valueColor: "#00838f", barColor: "#00838f", barW: "18%" },
  { label: "Highest Loss Medicine",   value: "Aspirin 500mg", valueColor: "#1a2744", barColor: null,   barW: null  },
];

const allTableData = [
  { code: "ASP5001", name: "Aspirin 500mg",      batch: "B12345", expiry: "12/12/2026", qty: 150, unit: "$0.30", total: "$45.00", type: "Expired", severity: "High", supplier: "MediCare Ltd.",  approved: "J. Smith",    disposal: "Incineration" },
  { code: "ASP5006", name: "Motays 20mg",         batch: "B12395", expiry: "12/12/2026", qty: 130, unit: "$0.30", total: "$44.00", type: "Expired", severity: "High", supplier: "Fucus Mart",     approved: "J. Smith",    disposal: "Incineration" },
  { code: "ASP5009", name: "MediCare 20mg",       batch: "B33396", expiry: "12/12/2026", qty: 155, unit: "$0.30", total: "$36.00", type: "Expired", severity: "Low",  supplier: "Grobhras Ltd.",  approved: "J. Smith",    disposal: "Incineration" },
  { code: "ASP5015", name: "Medicine 10mg",       batch: "B23606", expiry: "12/12/2026", qty: 130, unit: "$0.30", total: "$52.00", type: "Expired", severity: "High", supplier: "MediCare Ltd.",  approved: "J. Smith",    disposal: "Incineration" },
  { code: "PAR5001", name: "Paracetamol 500mg",   batch: "C11201", expiry: "03/05/2024", qty: 200, unit: "$0.20", total: "$40.00", type: "Damaged", severity: "High", supplier: "PharmaCo Ltd.",  approved: "A. Jones",    disposal: "Landfill"     },
  { code: "PAR5002", name: "Paracetamol 250mg",   batch: "C11202", expiry: "03/05/2024", qty: 180, unit: "$0.15", total: "$27.00", type: "Damaged", severity: "Low",  supplier: "PharmaCo Ltd.",  approved: "A. Jones",    disposal: "Landfill"     },
  { code: "OME2001", name: "Omeprazole 20mg",     batch: "D44501", expiry: "07/08/2024", qty: 90,  unit: "$0.50", total: "$45.00", type: "Expired", severity: "High", supplier: "GastroMed",      approved: "B. Kumar",    disposal: "Incineration" },
  { code: "AMX2501", name: "Amoxicillin 250mg",   batch: "E55601", expiry: "01/11/2024", qty: 120, unit: "$0.45", total: "$54.00", type: "Recall",  severity: "High", supplier: "BioPharm Ltd.",  approved: "C. Lee",      disposal: "Return"       },
  { code: "IBU4001", name: "Ibuprofen 400mg",     batch: "F66701", expiry: "15/02/2024", qty: 75,  unit: "$0.35", total: "$26.25", type: "Expired", severity: "Low",  supplier: "MediCare Ltd.",  approved: "J. Smith",    disposal: "Incineration" },
  { code: "MET5001", name: "Metformin 500mg",     batch: "G77801", expiry: "20/06/2024", qty: 60,  unit: "$0.60", total: "$36.00", type: "Damaged", severity: "High", supplier: "DiaCare Ltd.",   approved: "D. Patel",    disposal: "Landfill"     },
  { code: "ATR1001", name: "Atorvastatin 10mg",   batch: "H88901", expiry: "11/09/2024", qty: 45,  unit: "$1.20", total: "$54.00", type: "Expired", severity: "Low",  supplier: "CardioMed",      approved: "E. Wilson",   disposal: "Incineration" },
  { code: "CIP5001", name: "Ciprofloxacin 500mg", batch: "I99001", expiry: "30/03/2024", qty: 100, unit: "$0.80", total: "$80.00", type: "Recall",  severity: "High", supplier: "AntiBio Ltd.",   approved: "F. Brown",    disposal: "Return"       },
  { code: "DIC5001", name: "Diclofenac 50mg",     batch: "J10101", expiry: "22/07/2024", qty: 85,  unit: "$0.40", total: "$34.00", type: "Theft",   severity: "Low",  supplier: "PainRelief Co",  approved: "G. Davis",    disposal: "Police"       },
  { code: "CET1001", name: "Cetirizine 10mg",     batch: "K20201", expiry: "14/10/2024", qty: 110, unit: "$0.25", total: "$27.50", type: "Expired", severity: "Low",  supplier: "AllergyMed",     approved: "H. Martin",   disposal: "Incineration" },
  { code: "AML5001", name: "Amlodipine 5mg",      batch: "L30301", expiry: "05/12/2024", qty: 70,  unit: "$0.90", total: "$63.00", type: "Damaged", severity: "High", supplier: "HeartCare Ltd.", approved: "I. Thompson", disposal: "Landfill"     },
];

const monthlyLoss  = [8,12,6,14,10,8,16,9,11,13,10,18];
const months       = ["Jun","Feb","Mar","Apr","May","Jan","Jul","Aag","Stp","Oct","Nov","Dec"];
const trendPts     = [[0,95],[27,88],[55,80],[82,72],[110,62],[137,48],[165,32],[192,18],[220,8]];
const trendMonths  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Nov","Dec"];
const donutSegs    = [
  { pct: 32, color: "#e53935", label: "Expired" },
  { pct: 28, color: "#43a047", label: "Damaged" },
  { pct: 22, color: "#5e35b1", label: "Theft"   },
  { pct: 18, color: "#fb8c00", label: "Recall"  },
];
const upcomingExpiries = [
  { name: "Paracetamol 500mg", days: "In 10 days", dotColor: "#c62828" },
  { name: "Amoxycilin 250mg",  days: "In 20 days", dotColor: "#fb8c00" },
  { name: "Omeprazole 20mg",   days: "In 30 days", dotColor: "#2e7d32" },
];

const medicineOptions = ["Aspirin 500mg","Paracetamol 500mg","Omeprazole 20mg","Amoxicillin 250mg","Ibuprofen 400mg"];
const batchOptions    = ["B12345","B12395","B33396","C11201","D44501"];
const genericOptions  = ["Acetylsalicylic Acid","Acetaminophen","Omeprazole","Amoxicillin","Ibuprofen"];
const categoryOptions = ["Analgesic","Antibiotic","Antacid","Anti-inflammatory","Antihistamine"];
const supplierOptions = ["MediCare Ltd.","PharmaCo Ltd.","GastroMed","BioPharm Ltd.","AllergyMed"];
const branchOptions   = ["Branch A – Main","Branch B – North","Branch C – South","Branch D – East"];

const ROWS_PER_PAGE = 5;

// ── DONUT CHART ───────────────────────────────────────────────
function DonutChart({ segments, size = 170 }) {
  const sw = 44, r = size / 2 - sw / 2, circ = 2 * Math.PI * r;
  const cx = size / 2, cy = size / 2;
  let cum = 0;
  const arcs = segments.map((seg) => {
    const start = cum; cum += seg.pct;
    const mid = start + seg.pct / 2;
    const angle = (mid / 100) * 2 * Math.PI - Math.PI / 2;
    const lx = cx + r * Math.cos(angle), ly = cy + r * Math.sin(angle);
    const dash = (seg.pct / 100) * circ, gap = circ - dash;
    const off = circ * 0.25 - (start / 100) * circ;
    return { ...seg, dash, gap, off, lx, ly };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs.map((a, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={a.color} strokeWidth={sw}
          strokeDasharray={`${a.dash} ${a.gap}`} strokeDashoffset={a.off} />
      ))}
      <circle cx={cx} cy={cy} r={r - sw / 2 + 5} fill="white" />
      {arcs.map((a, i) => a.pct >= 10 ? (
        <text key={i} x={a.lx} y={a.ly} textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="800" fill="#fff">{a.label}</text>
      ) : null)}
    </svg>
  );
}

// ── FILTER BAR ────────────────────────────────────────────────
function FilterBar() {
  const [checks,     setChecks]     = useState({ expired: true, damaged: true, theft: true, recall: true, tlExpired: true, tlTheft: true, tlRecall: true });
  const [filters,    setFilters]    = useState({ medicine: "", batch: "", generic: "", category: "", supplier: "", severity: "", branch: "" });
  const [startDate,  setStartDate]  = useState("2026-01-01");
  const [endDate,    setEndDate]    = useState("2026-12-31");
  const [dateOpen,   setDateOpen]   = useState(false);
  const [activeDate, setActiveDate] = useState("start");
  const [calMonth,   setCalMonth]   = useState(new Date(2026, 0));
  const dateRef = useRef();

  const toggle    = k => setChecks(p => ({ ...p, [k]: !p[k] }));
  const setFilter = (k, v) => setFilters(p => ({ ...p, [k]: v }));

  useEffect(() => {
    const handler = e => { if (dateRef.current && !dateRef.current.contains(e.target)) setDateOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fmt = iso => { if (!iso) return "—"; const [y,m,d] = iso.split("-"); return `${d}/${m}/${y}`; };

  const calY = calMonth.getFullYear(), calM = calMonth.getMonth();
  const totalDays = new Date(calY, calM + 1, 0).getDate();
  const firstDay  = new Date(calY, calM, 1).getDay();
  const monthName = calMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const dayState = day => {
    const iso = `${calY}-${String(calM+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    if (iso === startDate || iso === endDate) return "selected";
    if (startDate && endDate && iso > startDate && iso < endDate) return "inrange";
    return "none";
  };

  const selectDay = day => {
    const iso = `${calY}-${String(calM+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    if (activeDate === "start") { setStartDate(iso); setActiveDate("end"); }
    else { setEndDate(iso); setDateOpen(false); }
  };

  const handleReset = () => {
    setChecks({ expired: true, damaged: true, theft: true, recall: true, tlExpired: true, tlTheft: true, tlRecall: true });
    setFilters({ medicine: "", batch: "", generic: "", category: "", supplier: "", severity: "", branch: "" });
    setStartDate("2026-01-01"); setEndDate("2026-12-31");
  };

  const activeCount = Object.values(checks).filter(Boolean).length + Object.values(filters).filter(Boolean).length;

  return (
    <div className="mb-4">
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(21,101,192,0.05)", overflow: "visible" }}>

        {/* Top Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1a2744" }}>🔎 Filter Records</span>
            {activeCount > 0 && (
              <span style={{ fontSize: 10, fontWeight: 700, background: "#1565c0", color: "#fff", padding: "2px 8px", borderRadius: 99 }}>{activeCount} active</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={handleReset} style={{ fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", cursor: "pointer" }}>↺ Reset</button>
            <button style={{ fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", cursor: "pointer" }}>💾 Save</button>
            <button style={{ fontSize: 12, fontWeight: 700, padding: "6px 18px", borderRadius: 6, border: "none", background: "#1565c0", color: "#fff", cursor: "pointer", boxShadow: "0 2px 6px rgba(21,101,192,0.3)" }}>Search</button>
          </div>
        </div>

        {/* Filter Body */}
        <div style={{ padding: "16px 20px" }}>

          {/* Row 1 — Date + Dropdowns */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>

            {/* Date Picker */}
            <div style={{ position: "relative" }} ref={dateRef}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>Date Range</div>
              <div onClick={() => { setDateOpen(o => !o); setActiveDate("start"); }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 36, border: `1.5px solid ${dateOpen ? "#1565c0" : "#e2e8f0"}`, borderRadius: 8, background: "#f8faff", cursor: "pointer", minWidth: 210, userSelect: "none" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{fmt(startDate)}</span>
                <span style={{ color: "#cbd5e1" }}>→</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{fmt(endDate)}</span>
                <span style={{ marginLeft: "auto" }}>📅</span>
              </div>

              {/* Calendar */}
              {dateOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 9999, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", padding: 16, minWidth: 280 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    {["start","end"].map(type => (
                      <button key={type} onClick={() => setActiveDate(type)} style={{ flex: 1, padding: "5px 8px", borderRadius: 6, border: `1.5px solid ${activeDate === type ? "#1565c0" : "#e2e8f0"}`, background: activeDate === type ? "#eff6ff" : "#f8faff", color: activeDate === type ? "#1565c0" : "#64748b", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                        {type === "start" ? `From: ${fmt(startDate)}` : `To: ${fmt(endDate)}`}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <button onClick={() => setCalMonth(new Date(calY, calM - 1))} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 14, color: "#64748b" }}>‹</button>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{monthName}</span>
                    <button onClick={() => setCalMonth(new Date(calY, calM + 1))} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 14, color: "#64748b" }}>›</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 }}>
                    {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                      <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#94a3b8", padding: "2px 0" }}>{d}</div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => {
                      const state = dayState(day);
                      return (
                        <button key={day} onClick={() => selectDay(day)} style={{ width: "100%", aspectRatio: "1", borderRadius: state === "inrange" ? 0 : 6, border: "none", cursor: "pointer", fontSize: 11, fontWeight: state === "selected" ? 700 : 400, background: state === "selected" ? "#1565c0" : state === "inrange" ? "#dbeafe" : "#fff", color: state === "selected" ? "#fff" : state === "inrange" ? "#1565c0" : "#334155" }}>
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: 5, marginTop: 12, flexWrap: "wrap" }}>
                    {[["This Year","2026-01-01","2026-12-31"],["Q1","2026-01-01","2026-03-31"],["Q2","2026-04-01","2026-06-30"],["Last 30d","2026-11-01","2026-11-30"]].map(([label,s,e]) => (
                      <button key={label} onClick={() => { setStartDate(s); setEndDate(e); setDateOpen(false); }}
                        style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 5, border: "1px solid #e2e8f0", background: "#f8faff", color: "#1565c0", cursor: "pointer" }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdowns */}
            {[
              ["Medicine Name", "medicine", medicineOptions],
              ["Batch No.",     "batch",    batchOptions],
              ["Generic Name",  "generic",  genericOptions],
              ["Category",      "category", categoryOptions],
              ["Supplier",      "supplier", supplierOptions],
            ].map(([label, key, opts]) => (
              <div key={key} style={{ minWidth: 130, flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>{label}</div>
                <Form.Select value={filters[key]} onChange={e => setFilter(key, e.target.value)}
                  style={{ fontSize: 12, height: 36, border: `1.5px solid ${filters[key] ? "#1565c0" : "#e2e8f0"}`, borderRadius: 8, background: filters[key] ? "#eff6ff" : "#f8faff", color: filters[key] ? "#1565c0" : "#64748b", boxShadow: "none", fontWeight: filters[key] ? 600 : 400 }}>
                  <option value="">All</option>
                  {opts.map(o => <option key={o} value={o}>{o}</option>)}
                </Form.Select>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#f1f5f9", marginBottom: 14 }} />

          {/* Row 2 — Toggle Filters */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16 }}>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.5px" }}>Loss</span>
              <div style={{ display: "flex", gap: 5 }}>
                {[["Expired","expired","#dc2626"],["Damaged","damaged","#d97706"],["Theft","theft","#16a34a"],["Recall","recall","#7c3aed"]].map(([lbl,k,col]) => (
                  <button key={k} onClick={() => toggle(k)} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 6, cursor: "pointer", border: "none", transition: "all 0.12s", background: checks[k] ? col : "#f1f5f9", color: checks[k] ? "#fff" : "#94a3b8", boxShadow: checks[k] ? `0 1px 4px ${col}50` : "none" }}>{lbl}</button>
                ))}
              </div>
            </div>

            <div style={{ width: 1, height: 24, background: "#e2e8f0" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.5px" }}>Value</span>
              <div style={{ display: "flex", gap: 5 }}>
                {[["Expired","tlExpired","#dc2626"],["Theft","tlTheft","#16a34a"],["Recall","tlRecall","#7c3aed"]].map(([lbl,k,col]) => (
                  <button key={k} onClick={() => toggle(k)} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 6, cursor: "pointer", border: "none", transition: "all 0.12s", background: checks[k] ? col : "#f1f5f9", color: checks[k] ? "#fff" : "#94a3b8", boxShadow: checks[k] ? `0 1px 4px ${col}50` : "none" }}>{lbl}</button>
                ))}
              </div>
            </div>

            <div style={{ width: 1, height: 24, background: "#e2e8f0" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.5px" }}>Severity</span>
              <div style={{ display: "flex", gap: 5 }}>
                {[["All",""],["High","High"],["Low","Low"]].map(([lbl,val]) => (
                  <button key={lbl} onClick={() => setFilter("severity", val)} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 6, cursor: "pointer", border: "none", background: filters.severity === val ? "#1565c0" : "#f1f5f9", color: filters.severity === val ? "#fff" : "#94a3b8" }}>{lbl}</button>
                ))}
              </div>
            </div>

            <div style={{ width: 1, height: 24, background: "#e2e8f0" }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.5px" }}>Branch</span>
              <Form.Select value={filters.branch} onChange={e => setFilter("branch", e.target.value)}
                style={{ fontSize: 12, height: 30, minWidth: 130, border: `1.5px solid ${filters.branch ? "#1565c0" : "#e2e8f0"}`, borderRadius: 6, background: filters.branch ? "#eff6ff" : "#fff", color: filters.branch ? "#1565c0" : "#334155", boxShadow: "none", fontWeight: filters.branch ? 600 : 400 }}>
                <option value="">All Branches</option>
                {branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </Form.Select>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function ExpiryLossReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const maxBar = Math.max(...monthlyLoss);

  const totalPages  = Math.ceil(allTableData.length / ROWS_PER_PAGE);
  const paginated   = allTableData.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);
  const startRecord = (currentPage - 1) * ROWS_PER_PAGE + 1;
  const endRecord   = Math.min(currentPage * ROWS_PER_PAGE, allTableData.length);

  const goTo = page => { if (page >= 1 && page <= totalPages) setCurrentPage(page); };

  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1,2,3,4,5,"...",totalPages];
    if (currentPage >= totalPages - 3) return [1,"...",totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,"...",currentPage-1,currentPage,currentPage+1,"...",totalPages];
  };

  const btnStyle = (active, disabled) => ({
    padding: "4px 9px", fontSize: 11, borderRadius: 5, cursor: disabled ? "not-allowed" : "pointer",
    border: active ? "1px solid #1565c0" : "1px solid #dde3ee",
    background: active ? "#1565c0" : "#fff",
    color: disabled ? "#bbb" : active ? "#fff" : "#444",
    fontWeight: active ? 700 : 400, minWidth: 30,
  });

  return (
    <div className="bg-light min-vh-100">
      <Container fluid className="py-3 px-3 px-lg-4" style={{ maxWidth: 1500 }}>

        {/* HEADING */}
        <h3 className="fw-bold mb-3" style={{ fontSize: 30 }}>Expiry &amp; Loss Report</h3>

        {/* KPI CARDS */}
        <div className="d-flex gap-3 mb-3 pb-1" style={{ overflowX: "auto" }}>
          {kpiCards.map((k, i) => (
            <div key={i} className="flex-shrink-0 rounded-3 p-3"
              style={{ minWidth: 185, background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 2px 8px rgba(21,101,192,0.07)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", backgroundColor: `${k.barColor || "#1a2744"}12`, pointerEvents: "none" }} />
              <div className="d-flex align-items-center gap-2 mb-3">
                <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, backgroundColor: `${k.barColor || "#1a2744"}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: k.barColor || "#1a2744" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7a99", whiteSpace: "nowrap", lineHeight: 1.2 }}>{k.label}</span>
              </div>
              <div style={{ fontSize: i === 6 ? 16 : 24, fontWeight: 800, color: k.valueColor, whiteSpace: "nowrap", letterSpacing: i === 6 ? 0 : "-0.5px", lineHeight: 1, marginBottom: 12 }}>
                {k.value}
                {i === 6 && <span style={{ fontSize: 12, color: "#aab", fontWeight: 500, marginLeft: 4 }}>▾</span>}
              </div>
              {k.barColor ? (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span style={{ fontSize: 10, color: "#aab3c5", fontWeight: 500 }}>Progress</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: k.barColor }}>{k.barW}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 99, backgroundColor: `${k.barColor}20`, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 99, width: k.barW, background: `linear-gradient(90deg, ${k.barColor}99, ${k.barColor})` }} />
                  </div>
                </div>
              ) : <div style={{ height: 21 }} />}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, borderRadius: "0 0 8px 8px", background: k.barColor ? `linear-gradient(90deg, ${k.barColor}55, ${k.barColor})` : `linear-gradient(90deg, #1a274455, #1a2744)` }} />
            </div>
          ))}
        </div>

        {/* FILTER BAR */}
        <FilterBar />

        {/* FULL WIDTH TABLE */}
        <div className="bg-white rounded border overflow-hidden mb-3 w-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom" style={{ background: "#f8faff" }}>
            <span className="fw-bold text-dark" style={{ fontSize: 13 }}>Expiry &amp; Loss Records</span>
            <span className="text-muted" style={{ fontSize: 12 }}>{allTableData.length} records found</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <Table hover className="mb-0 align-middle" style={{ fontSize: 12, minWidth: 1200, tableLayout: "fixed" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #1565c0", background: "#f4f7fb" }}>
                  {[["Medicine Code",120],["Medicine Name",140],["Batch No.",100],["Expiry Date",110],["Qty Lost",80],["Unit Cost",80],["Total Loss Value",120],["Loss Type",100],["Severity",90],["Supplier",130],["Approved By",110],["Compliance",110],["Disposal Method",130],["Action",80]].map(([h,w]) => (
                    <th key={h} style={{ width: w, padding: "11px 12px", fontSize: 12, fontWeight: 700, color: "#1a2744", whiteSpace: "nowrap", background: "#f4f7fb", borderBottom: "none" }}>
                      {h !== "Action" ? <span className="d-flex align-items-center gap-1">{h} <span style={{ color: "#90a4c0", fontSize: 10 }}>↕</span></span> : h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((r, idx) => (
                  <tr key={r.code}
                    style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#fafbff", borderBottom: "1px solid #edf0f7", cursor: "default" }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f5ff"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#fff" : "#fafbff"}>
                    <td style={{ padding: "10px 12px" }}><span style={{ color: "#1565c0", fontWeight: 600 }}>{r.code}</span></td>
                    <td style={{ padding: "10px 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><span style={{ fontWeight: 600, color: "#1a2744" }}>{r.name}</span></td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontFamily: "monospace", fontSize: 11, background: "#eef2ff", color: "#3949ab", padding: "2px 7px", borderRadius: 4, fontWeight: 600 }}>{r.batch}</span></td>
                    <td style={{ padding: "10px 12px" }}><span style={{ color: "#c62828", fontWeight: 600 }}>{r.expiry}</span></td>
                    <td style={{ padding: "10px 12px", textAlign: "center" }}><span style={{ fontWeight: 700, color: "#333" }}>{r.qty}</span></td>
                    <td style={{ padding: "10px 12px", textAlign: "right" }}><span style={{ color: "#555" }}>{r.unit}</span></td>
                    <td style={{ padding: "10px 12px", textAlign: "right" }}><span style={{ fontWeight: 700, color: "#1a2744" }}>{r.total}</span></td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, fontWeight: 600, color: "#c62828", background: "#fff5f5", border: "1px solid #ffcdd2", padding: "3px 10px", borderRadius: 20 }}>{r.type}</span></td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: r.severity === "High" ? "#e65100" : "#2e7d32", padding: "3px 10px", borderRadius: 20 }}>{r.severity}</span></td>
                    <td style={{ padding: "10px 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><span style={{ color: "#555" }}>{r.supplier}</span></td>
                    <td style={{ padding: "10px 12px" }}>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#1565c0", color: "#fff", fontSize: 10, fontWeight: 700, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {r.approved.split(" ").map(w => w[0]).join("")}
                        </div>
                        <span style={{ color: "#555" }}>{r.approved}</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, fontWeight: 600, color: "#2e7d32", background: "#f1f8f1", border: "1px solid #c8e6c9", padding: "3px 10px", borderRadius: 20 }}>✔ Approved</span></td>
                    <td style={{ padding: "10px 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><span style={{ color: "#555" }}>{r.disposal}</span></td>
                    <td style={{ padding: "10px 12px" }}>
                      <div className="d-flex gap-1">
                        <button style={{ padding: "3px 8px", fontSize: 12, cursor: "pointer", border: "1px solid #cdd5e0", background: "#fff", color: "#444", borderRadius: 5, fontWeight: 700 }}>+</button>
                        <button style={{ padding: "3px 8px", fontSize: 12, cursor: "pointer", border: "1px solid #ffcdd2", background: "#fff5f5", color: "#c62828", borderRadius: 5 }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex align-items-center justify-content-between px-3 py-2 border-top" style={{ background: "#f8faff" }}>
            <span className="text-muted" style={{ fontSize: 11 }}>Showing <strong>{startRecord}–{endRecord}</strong> of <strong>{allTableData.length}</strong> records</span>
            <div className="d-flex align-items-center gap-1">
              <button onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1} style={btnStyle(false, currentPage === 1)}>‹ Prev</button>
              {getPageNumbers().map((p, i) => (
                <button key={i} onClick={() => typeof p === "number" && goTo(p)} disabled={p === "..."} style={btnStyle(p === currentPage, p === "...")}>{p}</button>
              ))}
              <button onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages} style={btnStyle(false, currentPage === totalPages)}>Next ›</button>
            </div>
          </div>
        </div>

        {/* CHARTS ROW */}
        <Row className="g-2 mb-3">

          <Col xs={12} sm={6} lg={3}>
            <div className="bg-white rounded border p-3 h-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="fw-bold mb-2" style={{ fontSize: 13, color: "#222" }}>Monthly Expiry Loss</div>
              <div className="d-flex" style={{ height: 148 }}>
                <div className="d-flex flex-column justify-content-between align-items-end pe-1" style={{ paddingBottom: 18, paddingTop: 2 }}>
                  {["20","15","10","5","2"].map(v => <span key={v} className="fw-bold" style={{ fontSize: 9, color: "#555" }}>{v}</span>)}
                </div>
                <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                  <div className="flex-grow-1 position-relative" style={{ borderLeft: "1px solid #e8ecf4", borderBottom: "1px solid #e8ecf4" }}>
                    {[0,25,50,75].map(pct => <div key={pct} className="position-absolute w-100" style={{ top: `${pct}%`, borderTop: "1px dashed #f0f2f8" }} />)}
                    <div className="position-absolute d-flex align-items-end" style={{ inset: 0, gap: 3, padding: "4px 4px 0 4px" }}>
                      {monthlyLoss.map((v, i) => (
                        <div key={i} className="d-flex flex-column justify-content-end flex-grow-1 h-100">
                          <div className="w-100" style={{ height: `${(v / maxBar) * 100}%`, backgroundColor: "#1565c0", borderRadius: "2px 2px 0 0" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex" style={{ gap: 3, padding: "3px 4px 0 4px", height: 18 }}>
                    {months.map(m => <div key={m} className="flex-grow-1 fw-bold text-center" style={{ fontSize: 8, color: "#777" }}>{m}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <div className="bg-white rounded border p-3 h-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="fw-bold mb-1" style={{ fontSize: 13, color: "#222" }}>Loss Type Distribution</div>
              <div className="d-flex justify-content-center align-items-center" style={{ height: 148 }}>
                <DonutChart segments={donutSegs} size={148} />
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <div className="bg-white rounded border p-3 h-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="fw-bold mb-2" style={{ fontSize: 13, color: "#222" }}>
                Expiry Trend <em className="text-muted fw-normal" style={{ fontSize: 11 }}>Analysis</em>
              </div>
              <div className="d-flex" style={{ height: 148 }}>
                <div className="d-flex flex-column justify-content-between align-items-end pe-1" style={{ paddingBottom: 18, paddingTop: 2 }}>
                  {["35","30","25","20","15","10"].map(v => <span key={v} className="fw-bold" style={{ fontSize: 9, color: "#555" }}>{v}</span>)}
                </div>
                <div className="flex-grow-1 position-relative" style={{ minWidth: 0 }}>
                  <svg width="100%" style={{ height: "calc(100% - 18px)", position: "absolute", top: 0, left: 0, right: 0 }} viewBox="0 0 220 110" preserveAspectRatio="none">
                    {[0,22,44,66,88].map(y => <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="#f0f2f8" strokeWidth="1" />)}
                    <polygon points={`${trendPts.map(([x,y]) => `${x},${y}`).join(" ")} 220,110 0,110`} fill="rgba(21,101,192,0.12)" />
                    <polyline points={trendPts.map(([x,y]) => `${x},${y}`).join(" ")} fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinejoin="round" />
                    {trendPts.map(([x,y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#1565c0" strokeWidth="2" />)}
                    <line x1="0" y1="110" x2="220" y2="110" stroke="#e8ecf4" strokeWidth="1" />
                  </svg>
                  <div className="position-absolute d-flex justify-content-between" style={{ bottom: 0, left: 0, right: 0, height: 18 }}>
                    {trendMonths.map(m => <span key={m} className="fw-bold" style={{ fontSize: 8, color: "#777" }}>{m}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <div className="bg-white rounded border p-3 h-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                  <span style={{ color: "#1565c0", fontSize: 14 }}>🔔</span>
                  <span className="fw-bold" style={{ fontSize: 13, color: "#1a2744" }}>Upcoming Expiries</span>
                </div>
              </div>
              <div style={{ height: 148, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                {upcomingExpiries.map((item, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center"
                    style={{ padding: "10px 0", borderBottom: i < upcomingExpiries.length - 1 ? "1px solid #f0f2f8" : "none" }}>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: item.dotColor, flexShrink: 0 }} />
                      <span className="fw-semibold" style={{ fontSize: 12, color: "#333" }}>{item.name}</span>
                    </div>
                    <span className="fw-bold" style={{ fontSize: 11, color: item.dotColor, whiteSpace: "nowrap", background: `${item.dotColor}15`, padding: "2px 8px", borderRadius: 20 }}>{item.days}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

        </Row>

        {/* FOOTER */}
        <div className="bg-white rounded border d-flex align-items-center flex-wrap gap-4 px-4 mt-1" style={{ height: 44 }}>
          <span className="text-muted" style={{ fontSize: 12 }}>📄 Total Records: {allTableData.length}</span>
          <span className="text-muted" style={{ fontSize: 12 }}>📅 Last Updated: 12/01/2026 10:49 AM</span>
          <span className="text-muted" style={{ fontSize: 12 }}>👤 Generated by: <span className="fw-semibold" style={{ color: "#1565c0" }}>AdminUser</span></span>
        </div>

      </Container>
    </div>
  );
}