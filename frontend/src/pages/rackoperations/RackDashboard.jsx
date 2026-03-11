import { useState } from "react";
import { FiPlus, FiRefreshCw, FiDownload } from "react-icons/fi";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./style.css";

/* ─── Original status colours (unchanged) ───────────────────── */
const C = { av: "#22c55e", med: "#eab308", high: "#f97316", full: "#ef4444" };
const sBg  = s => ({ av:"#bbf7d0", med:"#fef08a", high:"#fed7aa", full:"#fecaca" }[s] || "#bbf7d0");
const sBdr = s => ({ av:"#16a34a", med:"#ca8a04", high:"#ea580c", full:"#dc2626" }[s] || "#16a34a");
const sTxt = s => ({ av:"#15803d", med:"#92400e", high:"#9a3412", full:"#991b1b" }[s] || "#15803d");

const donutData = [
  { name: "Available",   value: 151, color: C.av   },
  { name: "Medium Stock",value: 32,  color: C.med  },
  { name: "High Stock",  value: 174, color: C.high },
  { name: "Full",        value: 14,  color: C.full },
];
const expiringMeds = [
  { id:"C2-S2", name:"Azithromycin", shelf:"Shelf 2", expiry:"2024-05-11", color:C.med  },
  { id:"61-S4", name:"Paracetamol",  shelf:"Shelf 4", expiry:"2024-04-30", color:C.high },
  { id:"C1-S4", name:"Ibuprofen",    shelf:"Shelf 4", expiry:"2024-04-29", color:C.full },
  { id:"C2-S1", name:"Vitamin C",    shelf:"Shelf 1", expiry:"2026-06-10", color:C.av   },
  { id:"D3-S3", name:"Amoxicillin",  shelf:"Shelf 3", expiry:"2024-06-15", color:C.med  },
];

const av="av", med="med", high="high", full="full";

/* ─── Slot (original hover scale) ───────────────────────────── */
function Sl({ l, s="av", z=24 }) {
  const [h, sh] = useState(false);
  return (
    <div
      title={`Slot ${l}`}
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        width: z, height: z, borderRadius: 3,
        background: sBg(s), border: `1.5px solid ${sBdr(s)}`, color: sTxt(s),
        fontSize: 7, fontWeight: 800,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, cursor: "pointer",
        transform: h ? "scale(1.3)" : "scale(1)", transition: "transform 0.1s",
        position: "relative", zIndex: h ? 20 : 1,
      }}>{l}</div>
  );
}

/* ─── Slot Grid (original green border) ─────────────────────── */
function SG({ rows, z=24 }) {
  return (
    <div style={{
      background: "#dcfce7", border: "1.5px solid #4ade80",
      borderRadius: 5, padding: "4px 5px",
      display: "inline-flex", flexDirection: "column", gap: 3,
    }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display:"flex", gap:3 }}>
          {row.map((sl, si) => <Sl key={si} l={sl.l} s={sl.s||"av"} z={z} />)}
        </div>
      ))}
    </div>
  );
}

/* ─── Rack ID box (original green style) ────────────────────── */
function LBox({ ch, w=28, fs=14 }) {
  return (
    <div style={{
      width: w, alignSelf: "stretch", minHeight: w, padding: "2px",
      background: "#dcfce7", border: "1.5px solid #4ade80", borderRadius: 5,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 900, fontSize: fs, color: "#15803d", flexShrink: 0,
    }}>{ch}</div>
  );
}

/* ─── Section wrapper (original style) ──────────────────────── */
function Sec({ title, children, style={} }) {
  return (
    <div style={{
      border: "1.5px solid #cbd5e1", borderRadius: 8, padding: "10px 12px",
      background: "#f8fafc", display: "flex", flexDirection: "column",
      height: "100%", boxSizing: "border-box", ...style
    }}>
      {title && (
        <div style={{
          fontSize: 12, fontWeight: 700, color: "#374151",
          textAlign: "center", marginBottom: 10, letterSpacing: "0.03em",
        }}>{title}</div>
      )}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"space-evenly" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Gauge (original) ───────────────────────────────────────── */
function GaugeMeter({ pct=87.9 }) {
  const r=54, cx=70, cy=68;
  const angle = 180 - (pct/100)*180;
  const rad = a => (a*Math.PI)/180;
  const nx = cx + r*Math.cos(rad(angle));
  const ny = cy - r*Math.sin(rad(angle));
  const arc = (a1, a2, color) => {
    const x1=cx+r*Math.cos(rad(a1)), y1=cy-r*Math.sin(rad(a1));
    const x2=cx+r*Math.cos(rad(a2)), y2=cy-r*Math.sin(rad(a2));
    return <path d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round"/>;
  };
  return (
    <svg width={140} height={80} viewBox="0 0 140 80">
      {arc(180,135,"#bbf7d0")}{arc(135,90,"#fef08a")}
      {arc(90,45,"#fed7aa")}{arc(45,0,"#fecaca")}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#374151" strokeWidth={2.5} strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={4} fill="#374151"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   RACK DATA
═══════════════════════════════════════════════════════════════ */
const Z = 26; // slot px

/* Left Wall — A to H (8 racks) */
const LW = [
  { id:"A", label:"Antibiotics",   rows:[[{l:"A1"},{l:"A2"},{l:"A3"},{l:"A4"}],[{l:"A5"},{l:"A6"},{l:"A7"},{l:"A8"}]] },
  { id:"B", label:"Analgesics",    rows:[[{l:"B1"},{l:"B2",s:med},{l:"B3",s:med},{l:"B4",s:med}],[{l:"B5"},{l:"B6",s:med},{l:"B7",s:med},{l:"B8",s:med}]] },
  { id:"C", label:"Vitamins",      rows:[[{l:"C1",s:med},{l:"C2",s:med},{l:"C3",s:med},{l:"C4",s:med}],[{l:"C5",s:med},{l:"C6",s:med},{l:"C7",s:full},{l:"C8",s:med}]] },
  { id:"D", label:"Cardiac",       rows:[[{l:"D1"},{l:"D2"},{l:"D3"},{l:"D4"},{l:"D5"}],[{l:"D6"},{l:"D7"},{l:"D8"},{l:"D9"}]] },
  { id:"E", label:"Respiratory",   rows:[[{l:"E1"},{l:"E2"},{l:"E3",s:high},{l:"E4"},{l:"E5"}],[{l:"E6"},{l:"E7"},{l:"E8"},{l:"E9",s:full},{l:"E10"}]] },
  { id:"F", label:"Dermatology",   rows:[[{l:"F1"},{l:"F2"},{l:"F3"},{l:"F4"},{l:"F5"}],[{l:"F6"},{l:"F7"},{l:"F8"},{l:"F9"},{l:"F10"}]] },
  { id:"G", label:"Neurology",     rows:[[{l:"G1",s:high},{l:"G2"},{l:"G3"},{l:"G4"}],[{l:"G5"},{l:"G6",s:high},{l:"G7"},{l:"G8"}]] },
  { id:"H", label:"Ophthalmology", rows:[[{l:"H1"},{l:"H2",s:full},{l:"H3",s:full},{l:"H4"}],[{l:"H5",s:high},{l:"H6"},{l:"H7"},{l:"H8",s:med}]] },
];

/* Right Wall — I to P (8 racks) */
const RW = [
  { id:"I", label:"Oncology",    rows:[[{l:"I1"},{l:"I2"},{l:"I3"},{l:"I4"}],[{l:"I5"},{l:"I6"},{l:"I7",s:high},{l:"I8"}]] },
  { id:"J", label:"Endocrine",   rows:[[{l:"J1"},{l:"J2",s:med},{l:"J3",s:high},{l:"J4"}],[{l:"J5"},{l:"J6"},{l:"J7"},{l:"J8",s:med}]] },
  { id:"K", label:"Gastro",      rows:[[{l:"K1"},{l:"K2",s:high},{l:"K3",s:full},{l:"K4"}],[{l:"K5"},{l:"K6"},{l:"K7"},{l:"K8"}]] },
  { id:"L", label:"Ortho",       rows:[[{l:"L1"},{l:"L2"},{l:"L3"},{l:"L4"}],[{l:"L5"},{l:"L6",s:full},{l:"L7"},{l:"L8"}]] },
  { id:"M", label:"Paediatrics", rows:[[{l:"M1"},{l:"M2",s:med},{l:"M3",s:high},{l:"M4"}],[{l:"M5"},{l:"M6"},{l:"M7"},{l:"M8"}]] },
  { id:"N", label:"Psychiatry",  rows:[[{l:"N1",s:high},{l:"N2"},{l:"N3"},{l:"N4"},{l:"N5"}],[{l:"N6"},{l:"N7",s:med},{l:"N8"},{l:"N9"},{l:"N10"}]] },
  { id:"O", label:"Haematology", rows:[[{l:"O1"},{l:"O2"},{l:"O3",s:full},{l:"O4"}],[{l:"O5",s:high},{l:"O6"},{l:"O7"},{l:"O8",s:med}]] },
  { id:"P", label:"Urology",     rows:[[{l:"P1",s:full},{l:"P2",s:full},{l:"P3"}],[{l:"P4",s:full},{l:"P5",s:high},{l:"P6"}]] },
];

/* Back Wall — Q to V */
const BW = [
  { id:"Q", rows:[[{l:"Q1"},{l:"Q2",s:full}],[{l:"Q3"},{l:"Q4",s:med}],[{l:"Q5"},{l:"Q6"}],[{l:"Q7"},{l:"Q8"}]] },
  { id:"R", rows:[[{l:"R1"},{l:"R2"}],[{l:"R3"},{l:"R4"}],[{l:"R5"},{l:"R6",s:med}],[{l:"R7"},{l:"R8"}]] },
  { id:"S", rows:[[{l:"S1"},{l:"S2"}],[{l:"S3"},{l:"S4",s:med}],[{l:"S5",s:high},{l:"S6"}],[{l:"S7"},{l:"S8"}]] },
  { id:"T", rows:[[{l:"T1"},{l:"T2",s:high}],[{l:"T3"},{l:"T4",s:high}],[{l:"T5",s:full},{l:"T6",s:full}],[{l:"T7",s:full},{l:"T8",s:high}]] },
  { id:"U", rows:[[{l:"U1"},{l:"U2"}],[{l:"U3",s:med},{l:"U4"}],[{l:"U5"},{l:"U6",s:high}],[{l:"U7"},{l:"U8"}]] },
  { id:"V", rows:[[{l:"V1",s:full},{l:"V2"}],[{l:"V3"},{l:"V4",s:high}],[{l:"V5",s:med},{l:"V6"}],[{l:"V7"},{l:"V8"}]] },
];

/* Center Island row 1 — W X Y Z */
const CI_R1 = [
  { id:"W", rows:[[{l:"W1",s:med},{l:"W2",s:high},{l:"W3",s:full},{l:"W4"}],[{l:"W5"},{l:"W6"},{l:"W7"},{l:"W8"}]] },
  { id:"X", rows:[[{l:"X1"},{l:"X2"},{l:"X3",s:med},{l:"X4"}],[{l:"X5"},{l:"X6"},{l:"X7"},{l:"X8",s:high}]] },
  { id:"Y", rows:[[{l:"Y1"},{l:"Y2"},{l:"Y3",s:med},{l:"Y4",s:high}],[{l:"Y5"},{l:"Y6",s:high},{l:"Y7"},{l:"Y8"}]] },
  { id:"Z", rows:[[{l:"Z1"},{l:"Z2",s:med},{l:"Z3"},{l:"Z4"}],[{l:"Z5"},{l:"Z6"},{l:"Z7",s:high},{l:"Z8"}]] },
];

/* Center Island row 2 — AA BB CC DD */
const CI_R2 = [
  { id:"AA", rows:[[{l:"AA1"},{l:"AA2",s:med},{l:"AA3"},{l:"AA4"}],[{l:"AA5"},{l:"AA6",s:full},{l:"AA7",s:high},{l:"AA8"}]] },
  { id:"BB", rows:[[{l:"BB1"},{l:"BB2"},{l:"BB3",s:med},{l:"BB4"}],[{l:"BB5"},{l:"BB6"},{l:"BB7"},{l:"BB8",s:high}]] },
  { id:"CC", rows:[[{l:"CC1"},{l:"CC2"},{l:"CC3"},{l:"CC4"}],[{l:"CC5"},{l:"CC6"},{l:"CC7"},{l:"CC8"}]] },
  { id:"DD", rows:[[{l:"DD1",s:med},{l:"DD2",s:high}],[{l:"DD3"},{l:"DD4",s:full}]] },
];

/* ══════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════ */
export default function RackDashboard() {
  const [ad, sad] = useState(null);

  return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", backgroundColor:"#f8fafc", minHeight:"100vh" }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* Header */
        .nh-bar {
          background:#fff; border-bottom:1px solid #e8eaf0;
          height:58px; display:flex; align-items:center;
          padding:0 25px; gap:12px; position:sticky; top:0; z-index:1000;
          margin-top: 20px;
        }
        .nh-title { font-size:17px; font-weight:700; color:#111827; white-space:nowrap; flex-shrink:0; }
        .nh-spacer { flex:1; }
        .nh-btn-p {
          display:flex; align-items:center; justify-content:center;
          background:#3d3bdb; color:#fff; border:none; border-radius:10px;
          width:44px; height:44px; flex-shrink:0;
          cursor:pointer; transition:background .15s;
        }
        .nh-btn-p:hover { background:#3730a3; }
        .nh-btn-o {
          display:flex; align-items:center; justify-content:center;
          background:#fff; color:#374151; border:1.5px solid #d1d5db; border-radius:10px;
          width:44px; height:44px; flex-shrink:0;
          cursor:pointer; transition:all .15s;
        }
        .nh-btn-o:hover { background:#f3f4f6; border-color:#9ca3af; color:#111827; }

        /* Analytics grid */
        .ag { display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; }
        @media(max-width:1200px) { .ag { grid-template-columns:1fr 1fr; } }
        @media(max-width:720px)  { .ag { grid-template-columns:1fr; } }

        /* ── Rack map 3-col ── */
        /* On large screens: left | center | right side by side */
        .rack-grid {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 14px;
          align-items: stretch;
        }
        /* On medium: stack left & right below center */
        @media(max-width:1080px) {
          .rack-grid {
            grid-template-columns: 1fr;
          }
          .rack-grid-left  { order: 2; }
          .rack-grid-center{ order: 1; }
          .rack-grid-right { order: 3; }
        }

        /* Wall rack rows */
        .wrow {
          display: flex; align-items: center; gap: 5px;
          padding: 3px 0;
        }
        .wrow + .wrow { border-top: 1px dashed #e5e7eb; }

        /* ci-unit */
        .ci-unit { display:flex; flex-direction:column; align-items:center; gap:3px; }

        /* On narrow screens make left/right walls scroll horizontally 
           if their content exceeds container — but prefer wrap */
        .wall-inner { display:flex; flex-direction:column; gap:0; }

      `}</style>

      {/* ── HEADER ── */}
      <header className="nh-bar box_shadow mx-4">
        <span className="nh-title">Rack Dashboard</span>
        <div className="nh-spacer"/>
        <button className="nh-btn-o" title="Refresh"><FiRefreshCw size={19}/></button>
        <button className="nh-btn-o" title="Export"><FiDownload size={19}/></button>
        <button className="nh-btn-p" title="Add Rack"><FiPlus size={21}/></button>
      </header>

      <div style={{ padding:"20px 24px" }}>

        {/* ══ RACK MAP ══ */}
        <div className = "box_shadow" style={{
          background:"#fff", border:"1px solid #e2e8f0",
          padding:"18px 20px", marginBottom:20,

        }}>
          {/* Title + Legend */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:10 }}>
            <div style={{ fontWeight:700, fontSize:15, color:"#111827" }}>Rack view</div> 
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              {[["Available Space","av"],["Medium Stock","med"],["High Stock","high"],["Full","full"]].map(([label,key])=>(
                <div key={label} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#374151", fontWeight:600 }}>
                  <div style={{ width:13, height:13, borderRadius:3, background:sBg(key), border:`1.5px solid ${sBdr(key)}`, flexShrink:0 }}/>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* 3-col rack grid */}
          <div className="rack-grid">

            {/* ── LEFT WALL A–H ── */}
            <div className="rack-grid-left">
              <Sec title="Left Wall Racks" style={{ minWidth:0 }}>
                <div className="wall-inner">
                  {LW.map((r,i) => (
                    <div key={i} className="wrow">
                      <LBox ch={r.id} w={30} fs={14}/>
                      <SG rows={r.rows} z={Z}/>
                    </div>
                  ))}
                </div>
              </Sec>
            </div>

            {/* ── CENTER: Back Wall + Island ── */}
            <div className="rack-grid-center" style={{ display:"flex", flexDirection:"column", gap:0, minWidth:0 }}>
              <div style={{
                border:"1.5px solid #cbd5e1", borderRadius:8,
                background:"#f8fafc", overflow:"hidden",
                display:"flex", flexDirection:"column", height:"100%",
              }}>
                {/* Back Wall */}
                <div style={{
                  fontSize:12, fontWeight:700, color:"#374151",
                  textAlign:"center", padding:"7px 10px",
                  borderBottom:"1.5px solid #cbd5e1",
                  background:"#f1f5f9", letterSpacing:"0.03em",
                }}>
                  Back Wall Racks
                </div>
                <div style={{
                  padding:"10px 12px",
                  display:"flex", gap:10, justifyContent:"center",
                  alignItems:"flex-start", flexWrap:"wrap",
                  borderBottom:"2px dashed #cbd5e1",
                }}>
                  {BW.map((u,i) => (
                    <div key={i} className="ci-unit">
                      <LBox ch={u.id} w={30} fs={13}/>
                      <SG rows={u.rows} z={Z}/>
                    </div>
                  ))}
                </div>

                {/* Center Island */}
                <div style={{
                  fontSize:12, fontWeight:700, color:"#374151",
                  textAlign:"center", padding:"7px 10px",
                  borderBottom:"1.5px solid #cbd5e1",
                  background:"#f1f5f9", letterSpacing:"0.03em",
                }}>
                  Center Rack Island
                </div>
                <div style={{ padding:"10px 12px", display:"flex", flexDirection:"column", gap:10, flex:1 }}>
                  {/* Row 1: W X Y Z */}
                  <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                    {CI_R1.map((u,i) => (
                      <div key={i} className="ci-unit">
                        <LBox ch={u.id} w={30} fs={13}/>
                        <SG rows={u.rows} z={Z}/>
                      </div>
                    ))}
                  </div>
                  {/* Row 2: AA BB CC DD */}
                  <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", paddingTop:6, borderTop:"1px dashed #d1d5db" }}>
                    {CI_R2.map((u,i) => (
                      <div key={i} className="ci-unit">
                        <LBox ch={u.id} w={30} fs={12}/>
                        <SG rows={u.rows} z={Z}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT WALL I–P ── */}
            <div className="rack-grid-right">
              <Sec title="Right Wall Racks" style={{ minWidth:0 }}>
                <div className="wall-inner">
                  {RW.map((r,i) => (
                    <div key={i} className="wrow">
                      <SG rows={r.rows} z={Z}/>
                      <LBox ch={r.id} w={30} fs={14}/>
                    </div>
                  ))}
                </div>
              </Sec>
            </div>

          </div>
        </div>

        {/* ══ 3-COLUMN ANALYTICS ══ */}
        <div className="ag">

          {/* ── CARD 1 : Rack Utilization Pie ── */}
          <div className="box_shadow" style={{ background:"#fff", border:"1px solid #e2e8f0", padding:20}}>
            <div style={{ fontWeight:700, fontSize:15, color:"#111827", marginBottom:14 }}>Rack Utilization</div>

            <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
              <PieChart width={180} height={160}>
                <Pie data={[{name:"Occupied",value:87.9},{name:"Empty",value:12.1}]}
                  cx={86} cy={75} startAngle={90} endAngle={-270}
                  innerRadius={0} outerRadius={72} dataKey="value" strokeWidth={2} stroke="#fff">
                  <Cell fill="#3b82f6" /><Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </div>

            <div style={{ display:"flex", justifyContent:"center", gap:16, marginBottom:16 }}>
              {[["#3b82f6","Occupied (87.9%)"],["#e5e7eb","Empty (12.1%)"]].map(([c,l]) => (
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#6b7280" }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:c, border:"1px solid #d1d5db" }} />{l}
                </div>
              ))}
            </div>

            <div style={{ height:1, background:"#f1f5f9", marginBottom:14 }} />

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
              {[
                { icon:"≡", iconBg:"#eff6ff", iconColor:"#3b82f6", label:"Total Racks",      val:"197", valColor:"#111827" },
                { icon:"✓", iconBg:"#f0fdf4", iconColor:"#22c55e", label:"Available Spaces", val:"151", valColor:"#111827" },
                { icon:"✓", iconBg:"#f0fdf4", iconColor:"#22c55e", label:"Medium Stock",     val:"32",  valColor:"#111827" },
                { icon:"■", iconBg:"#fef2f2", iconColor:"#ef4444", label:"Full Racks",       val:"14",  valColor:"#ef4444" },
              ].map((s,i) => (
                <div key={i} style={{ background:"#f8fafc", borderRadius:10, border:"1px solid #e2e8f0", padding:"10px 12px", display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:s.iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:s.iconColor, fontWeight:900, flexShrink:0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize:20, fontWeight:800, color:s.valColor, lineHeight:1 }}>{s.val}</div>
                    <div style={{ fontSize:10.5, color:"#9ca3af", marginTop:3 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ height:1, background:"#f1f5f9", marginBottom:12 }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <div style={{ width:30, height:30, borderRadius:8, background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🗂</div>
              <span style={{ fontSize:13, color:"#6b7280", fontWeight:500 }}>Total Rack Spaces</span>
              <span style={{ fontSize:20, fontWeight:900, color:"#111827" }}>1,248</span>
            </div>
          </div>

          {/* ── CARD 2 : Inventory Snapshot ── */}
          <div className = "box_shadow" style={{ background:"#fff",  border:"1px solid #e2e8f0", padding:20,}}>
            <div style={{ fontWeight:700, fontSize:15, color:"#111827", marginBottom:18 }}>Inventory Snapshot</div>

            <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:20 }}>
              {[
                { label:"Available", val:"151%",  pct:100, color:C.av,   textColor:"#15803d" },
                { label:"Medium",    val:"15.2%",  pct:15,  color:C.med,  textColor:"#92400e" },
                { label:"High",      val:"53.8%",  pct:54,  color:C.high, textColor:"#9a3412" },
                { label:"Full",      val:"18.9%",  pct:19,  color:C.full, textColor:"#991b1b" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:"#374151" }}>{item.label}</span>
                    <span style={{ fontSize:12, fontWeight:800, color:item.textColor }}>{item.val}</span>
                  </div>
                  <div style={{ height:10, borderRadius:999, background:"#f1f5f9", overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${item.pct}%`, borderRadius:999, background:item.color, transition:"width 0.6s ease" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ height:1, background:"#f1f5f9", marginBottom:14 }} />

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <span style={{ fontSize:13, color:"#6b7280", fontWeight:500 }}>Total Rack Spaces</span>
              <span style={{ fontSize:18, fontWeight:900, color:"#111827" }}>1,248</span>
            </div>

            <div style={{ height:1, background:"#f1f5f9", marginBottom:16 }} />

            <div style={{ fontWeight:700, fontSize:13, color:"#374151", marginBottom:8 }}>Total Rack Utilization</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:16 }}>
              <div style={{ fontSize:32, fontWeight:900, color:"#111827", lineHeight:1 }}>87.9%</div>
              <GaugeMeter pct={87.9} />
            </div>
          </div>

          {/* ── CARD 3 : Donut + Expiring ── */}
          <div className= "box_shadow" style={{ background:"#fff",  border:"1px solid #e2e8f0", overflow:"hidden"}}>

            <div style={{ padding:20, borderBottom:"1px solid #f1f5f9" }}>
              <div style={{ fontWeight:700, fontSize:14, color:"#111827", marginBottom:12 }}>Distribution by Rack Status</div>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <PieChart width={140} height={140}>
                  <Pie data={donutData} cx={65} cy={65} innerRadius={38} outerRadius={62}
                    dataKey="value" strokeWidth={2} stroke="#fff"
                    onMouseEnter={(_,i) => sad(i)} onMouseLeave={() => sad(null)}>
                    {donutData.map((e,i) => <Cell key={i} fill={e.color} opacity={ad===null||ad===i?1:0.4} />)}
                  </Pie>
                  <Tooltip formatter={(v,n) => [`${v} racks`,n]} contentStyle={{ borderRadius:8, fontSize:11 }} />
                </PieChart>
                <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 10px" }}>
                  {donutData.map((d,i) => (
                    <div key={d.name} onMouseEnter={() => sad(i)} onMouseLeave={() => sad(null)}
                      style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 10px", borderRadius:8, background:ad===i?d.color+"18":"#f8fafc", border:`1px solid ${ad===i?d.color+"60":"#e2e8f0"}`, cursor:"pointer", transition:"all 0.15s" }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:d.color, flexShrink:0 }} />
                      <div>
                        <div style={{ fontSize:10, color:"#6b7280" }}>{d.name}</div>
                        <div style={{ fontSize:15, fontWeight:800, color:"#111827" }}>{d.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontWeight:700, fontSize:14, color:"#111827" }}>Top Expiring Medicines</div>
                <button style={{ background:"#3d3bdb", color:"#fff", border:"none", borderRadius:7, padding:"5px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}>View All</button>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {expiringMeds.map((m,i) => (
                  <div key={i}
                    style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:9, background:"#f8fafc", border:"1px solid #e2e8f0", cursor:"pointer", transition:"background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="#f0f4ff"}
                    onMouseLeave={e => e.currentTarget.style.background="#f8fafc"}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:m.color, flexShrink:0 }} />
                    <span style={{ background:m.color+"22", color:m.color, border:`1px solid ${m.color}55`, borderRadius:5, padding:"2px 7px", fontSize:10, fontWeight:700, flexShrink:0 }}>{m.id}</span>
                    <span style={{ fontSize:12, fontWeight:600, color:"#374151", flex:1 }}>{m.name}</span>
                    <span style={{ fontSize:11, color:"#9ca3af" }}>{m.shelf}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:m.color, background:m.color+"15", padding:"2px 8px", borderRadius:5 }}>{m.expiry}</span>
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