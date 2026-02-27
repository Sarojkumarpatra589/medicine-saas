import React, { useState } from "react";
import "./style.css";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

/* ─── Sparkline SVG helpers ───────────────────────────────────── */
const BarSparkline = ({ color }) => {
  const bars = [4, 7, 5, 9, 6, 10, 8, 12, 9, 14, 11, 15];
  const max = Math.max(...bars);
  return (
    <svg width="80" height="36" viewBox="0 0 80 36" fill="none">
      {bars.map((v, i) => {
        const h = (v / max) * 30;
        return (
          <rect key={i} x={i * 7} y={36 - h} width="5" height={h} rx="2"
            fill={color} opacity={0.35 + i * 0.055} />
        );
      })}
    </svg>
  );
};

const LineSparkline = ({ color }) => (
  <svg width="90" height="36" viewBox="0 0 90 36" fill="none">
    <defs>
      <linearGradient id="lgSpark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.25" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 30 C12 26 22 12 34 16 C46 20 56 8 68 10 C80 12 90 6 90 3"
      stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M0 30 C12 26 22 12 34 16 C46 20 56 8 68 10 C80 12 90 6 90 3 L90 36 L0 36 Z"
      fill="url(#lgSpark)" />
  </svg>
);

/* ─── Analytics chart data ────────────────────────────────────── */
const MONTHLY_TREND = [
  { month: "Oct", payable: 620, paid: 480 },
  { month: "Nov", payable: 740, paid: 560 },
  { month: "Dec", payable: 690, paid: 590 },
  { month: "Jan", payable: 810, paid: 640 },
  { month: "Feb", payable: 760, paid: 700 },
  { month: "Mar", payable: 920, paid: 750 },
  { month: "Apr", payable: 875, paid: 585 },
];

const PAYMENT_MODE = [
  { name: "Bank Transfer", value: 52, color: "#5b5ef4" },
  { name: "UPI",           value: 31, color: "#16a34a" },
  { name: "Cash",          value: 17, color: "#f59e0b" },
];

const OVERDUE_SUPPLIERS = [
  { name: "Bioco Ltd",       overdue: 85000,  days: 42 },
  { name: "Medico Supplies", overdue: 75000,  days: 28 },
  { name: "CureMed Corp",    overdue: 42000,  days: 19 },
  { name: "PharmaHub",       overdue: 38000,  days: 15 },
  { name: "Apex Pharma",     overdue: 22000,  days: 8  },
];

const TOP_SUPPLIERS = [
  { name: "HealthPlus Pvt Ltd", total: 320000, paid: 275000, pct: 86 },
  { name: "Medico Supplies",    total: 210000, paid: 135000, pct: 64 },
  { name: "Apex Pharma",        total: 185000, paid: 185000, pct: 100 },
  { name: "CureMed Corp",       total: 160000, paid: 118000, pct: 74 },
  { name: "Bioco Ltd",          total: 140000, paid: 55000,  pct: 39 },
];

/* ─── Custom Tooltips ─────────────────────────────────────────── */
const TrendTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#1e293b", color:"#fff", borderRadius:8, padding:"8px 13px", fontSize:12, fontFamily:"Plus Jakarta Sans, sans-serif" }}>
      <div style={{ fontWeight:700, marginBottom:4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: ₹{p.value}K
        </div>
      ))}
    </div>
  );
};

const PieTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#1e293b", color:"#fff", borderRadius:8, padding:"7px 12px", fontSize:12, fontFamily:"Plus Jakarta Sans, sans-serif" }}>
      <span style={{ color: payload[0].payload.color }}>● </span>
      {payload[0].name}: <b>{payload[0].value}%</b>
    </div>
  );
};

/* ─── CSS ─────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f4f8;
    min-height: 100vh;
    padding: 20px 25px;
    color: #111827;
    overflow-x: hidden;
  }

  /* ── Header ── */
  .sp-header {
    background: #fff;
    padding: 11px 22px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    border-radius: 12px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .sp-header h2 { font-size: 19px; font-weight: 800; color: #111827; }

  .btn-primary-h {
    background: #5b5ef4; color: #fff; border: none;
    border-radius: 8px; padding: 9px 18px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    transition: opacity .18s; white-space: nowrap;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .btn-primary-h:hover { opacity: .87; }

  /* ── Stat Cards ── */
  .sp-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 20px;
  }
  @media (max-width: 1100px) { .sp-cards { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 580px)  { .sp-cards { grid-template-columns: repeat(2,1fr); gap: 10px; } }

  .sp-card {
    background: #fff; border-radius: 12px;
    padding: 18px 18px 14px;
    display: flex; flex-direction: column; gap: 5px;
    transition: transform .2s, box-shadow .2s;
  }
  .sp-card:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(0,0,0,0.10); }

  .sp-card-top { display:flex; align-items:flex-start; justify-content:space-between; }
  .sp-icon {
    width: 44px; height: 44px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 19px; flex-shrink: 0;
  }
  .sp-badge { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }
  .badge-up   { background: #dcfce7; color: #16a34a; }
  .badge-down { background: #fee2e2; color: #dc2626; }
  .sp-card-label { font-size: 12.5px; font-weight: 500; color: #6b7280; margin-top: 3px; }
  .sp-card-bottom { display:flex; align-items:flex-end; justify-content:space-between; margin-top: 2px; }
  .sp-card-value { font-size: 28px; font-weight: 800; color: #111827; letter-spacing: -1px; line-height: 1; }
  .sp-card-sub { font-size: 10.5px; color: #9ca3af; margin-top: 3px; }

  /* ── Filter Bar ── */
  .sp-filterbar {
    background: #fff; padding: 13px 18px;
    display: flex; gap: 10px; align-items: center;
    margin-bottom: 18px; border-radius: 12px;
    flex-wrap: wrap;
  }
  .sp-search {
    display: flex; align-items: center; gap: 8px;
    background: #f9fafb; border: 1.5px solid #e5e7eb;
    border-radius: 8px; padding: 7px 13px; flex: 1; min-width: 160px;
  }
  .sp-search input {
    border: none; background: transparent; outline: none;
    font-family: inherit; font-size: 13px; width: 100%; color: #374151;
  }
  .sp-select {
    background: #f9fafb; border: 1.5px solid #e5e7eb;
    border-radius: 8px; padding: 7px 13px; font-family: inherit;
    font-size: 13px; color: #374151; outline: none; cursor: pointer;
  }
  .sp-filter-btn {
    background: #5b5ef4; color: #fff; border: none;
    border-radius: 8px; padding: 8px 18px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    transition: opacity .18s; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .sp-filter-btn:hover { opacity: .88; }

  /* ── Table Card ── */
  .sp-table-wrap {
    background: #fff; border-radius: 12px; overflow: hidden;
  }
  .sp-table-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px 13px; border-bottom: 1.5px solid #f3f4f6;
    flex-wrap: wrap; gap: 8px;
  }
  .sp-table-header h4 { font-size: 15px; font-weight: 700; }

  /* Scrollable table inside card */
  .table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .table-scroll::-webkit-scrollbar { height: 4px; }
  .table-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

  table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 620px; }
  thead tr { background: #f9fafb; }
  thead th {
    padding: 11px 16px; text-align: left; font-weight: 600;
    font-size: 11px; text-transform: uppercase; letter-spacing: .6px;
    color: #9ca3af; border-bottom: 1.5px solid #f3f4f6; white-space: nowrap;
  }
  tbody tr { border-bottom: 1px solid #f3f4f6; transition: background .15s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafafa; }
  tbody td { padding: 13px 16px; color: #374151; vertical-align: middle; white-space: nowrap; }

  .td-id   { font-weight: 600; color: #6b7280; font-family: monospace; font-size: 12px; }
  .td-name { font-weight: 700; color: #111827; }
  .td-paid { font-weight: 700; color: #16a34a; }

  .td-badge {
    display: inline-block; padding: 3px 11px;
    border-radius: 20px; font-size: 11.5px; font-weight: 600;
  }
  .badge-success { background: #dcfce7; color: #16a34a; }
  .badge-warning { background: #fef3c7; color: #d97706; }
  .badge-danger  { background: #fee2e2; color: #dc2626; }

  /* Pagination */
  .sp-pagination {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 18px; border-top: 1.5px solid #f3f4f6;
    flex-wrap: wrap; gap: 8px;
  }
  .page-btn {
    border: none; border-radius: 6px; padding: 5px 11px;
    font-size: 12px; font-weight: 600; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: opacity .15s;
  }
  .page-btn:hover { opacity: .8; }

  /* ════════════════════════════════════════
     ANALYTICS SECTION
  ════════════════════════════════════════ */
  .analytics-title {
    font-size: 17px; font-weight: 800; color: #111827;
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }
  .analytics-title::after {
    content: ''; flex: 1; height: 1.5px; background: #e5e7eb; border-radius: 2px;
  }

  /* Top row: trend chart + pie */
  .analytics-row-1 {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 900px) { .analytics-row-1 { grid-template-columns: 1fr; } }

  /* Bottom row: overdue bar + top suppliers */
  .analytics-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  @media (max-width: 860px) { .analytics-row-2 { grid-template-columns: 1fr; } }

  /* Shared chart card */
  .a-card {
    background: #fff; border-radius: 12px;
    overflow: hidden;
  }
  .a-card-head {
    padding: 14px 18px 10px;
    border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 8px;
  }
  .a-card-title { font-size: 14px; font-weight: 700; color: #111827; }
  .a-card-sub   { font-size: 11px; color: #9ca3af; }
  .a-card-body  { padding: 16px 18px 14px; }

  .chart-legend {
    display: flex; gap: 14px; flex-wrap: wrap;
    font-size: 11.5px; font-weight: 600; color: #6b7280;
  }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 5px; }

  /* Pie center label */
  .pie-wrap { position: relative; }
  .pie-center {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    text-align: center; pointer-events: none;
  }
  .pie-center-val  { font-size: 18px; font-weight: 800; color: #111827; line-height: 1.1; }
  .pie-center-label{ font-size: 10px; color: #9ca3af; margin-top: 2px; }

  /* Pie legend list */
  .pie-legend { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
  .pie-legend-row {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 12px;
  }
  .pie-legend-left { display: flex; align-items: center; gap: 7px; color: #374151; font-weight: 500; }
  .pie-legend-pct  { font-weight: 800; color: #111827; }

  /* Overdue table */
  .overdue-list { display: flex; flex-direction: column; }
  .overdue-row {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 0; border-bottom: 1px solid #f3f4f6;
  }
  .overdue-row:last-child { border-bottom: none; }
  .overdue-rank {
    width: 24px; height: 24px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; flex-shrink: 0;
  }
  .rank-1 { background: #fee2e2; color: #dc2626; }
  .rank-2 { background: #fef3c7; color: #d97706; }
  .rank-3 { background: #fef3c7; color: #d97706; }
  .rank-n { background: #f3f4f6; color: #6b7280; }
  .overdue-info { flex: 1; min-width: 0; }
  .overdue-name { font-size: 13px; font-weight: 700; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .overdue-days { font-size: 11px; color: #9ca3af; margin-top: 1px; }
  .overdue-amount { font-size: 14px; font-weight: 800; color: #dc2626; flex-shrink: 0; }
  .overdue-badge-days {
    font-size: 10px; font-weight: 700; padding: 2px 8px;
    border-radius: 20px; background: #fee2e2; color: #dc2626; flex-shrink: 0;
  }

  /* Top suppliers progress */
  .supplier-list { display: flex; flex-direction: column; gap: 14px; }
  .supplier-row {}
  .supplier-row-top {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 5px;
  }
  .supplier-row-name { font-size: 13px; font-weight: 700; color: #111827; }
  .supplier-row-pct  { font-size: 12px; font-weight: 700; }
  .supplier-row-amounts { display: flex; gap: 10px; font-size: 11px; color: #6b7280; margin-bottom: 5px; }
  .progress-track {
    height: 6px; background: #f3f4f6; border-radius: 99px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 99px;
    transition: width .4s ease;
  }

  /* Custom recharts tooltip shared */
  .rc-tip {
    background: #1e293b; color: #fff; border-radius: 8px;
    padding: 8px 13px; font-size: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 4px 14px rgba(0,0,0,.2);
  }

  /* Responsive misc */
  @media (max-width: 600px) {
    .sp-root { padding: 12px 14px; }
    .sp-header { padding: 13px 16px; }
    .sp-header h2 { font-size: 16px; }
    .sp-card-value { font-size: 23px; }
    .a-card-body { padding: 12px 14px 10px; }
    .analytics-row-2 { gap: 12px; }
  }
  @media (max-width: 420px) {
    .sp-cards { grid-template-columns: 1fr 1fr; gap: 8px; }
    .sp-card { padding: 14px 12px 10px; }
    .sp-card-value { font-size: 20px; }
  }
`;

/* ─── Mock Data ───────────────────────────────────────────────── */
const CARDS = [
  { icon:"₹",  iconBg:"#ede9fe", label:"Total Payable",    value:"₹8.75L", badge:"+18%",  badgeType:"up",   chart:"bar",  chartColor:"#7c3aed", sub:"this month" },
  { icon:"💸", iconBg:"#dcfce7", label:"Total Paid",        value:"₹5.85L", badge:"+32%",  badgeType:"up",   chart:"line", chartColor:"#16a34a", sub:"this month" },
  { icon:"⏰", iconBg:"#fef3c7", label:"Overdue Suppliers", value:"09",     badge:"+2",    badgeType:"down", chart:"bar",  chartColor:"#f59e0b", sub:"active"     },
  { icon:"📅", iconBg:"#e0f2fe", label:"Upcoming Dues",     value:"15",     badge:"items", badgeType:"up",   chart:"bar",  chartColor:"#2563eb", sub:"next 30 days"},
];

const PAYMENTS = [
  { id:"PAYO016", supplier:"Apex Pharma",       date:"22 Apr 2024", mode:"Cash", amount:45000, ref:"INV-2024-004", balance:0,     status:"Cleared" },
  { id:"PAYO017", supplier:"Medico Supplies",   date:"23 Apr 2024", mode:"Bank", amount:60000, ref:"",            balance:75000, status:"Partial" },
  { id:"PAYO018", supplier:"HealthPlus Pvt Ltd",date:"15 Apr 2024", mode:"UPI",  amount:75000, ref:"UPI456789",   balance:45000, status:"Cleared" },
  { id:"PAYO012", supplier:"Bioco Ltd",         date:"15 Apr 2024", mode:"Bank", amount:25000, ref:"-",           balance:20000, status:"Overdue" },
  { id:"PAYO019", supplier:"CureMed Corp",      date:"10 Apr 2024", mode:"UPI",  amount:18000, ref:"UPI987654",   balance:42000, status:"Partial" },
];

/* ─── Helper: bar chart tooltip ──────────────────────────────── */
const BarTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rc-tip">
      <div style={{ fontWeight:700, marginBottom:4 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ color:p.color }}>
          {p.name}: ₹{p.value}K
        </div>
      ))}
    </div>
  );
};

const OverdueTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rc-tip">
      <div style={{ fontWeight:700, marginBottom:3 }}>{label}</div>
      <div style={{ color:"#f87171" }}>₹{(payload[0].value/1000).toFixed(0)}K overdue</div>
    </div>
  );
};

/* ─── Main Component ──────────────────────────────────────────── */
export default function SupplierPayments() {
  const [search, setSearch] = useState("");
  const [month, setMonth]   = useState("April 2024");
  const [activeIndex, setActiveIndex] = useState(null);

  const filtered = PAYMENTS.filter(p =>
    p.supplier.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="sp-root">

        {/* ── HEADER ── */}
        <div className="sp-header box_shadow">
          <h2>Supplier Payments</h2>
          <button className="btn-primary-h">
            <span style={{ fontSize:16, lineHeight:1 }}>+</span> Record Payment
          </button>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="sp-cards ">
          {CARDS.map((c, i) => (
            <div className="sp-card box_shadow" key={i}>
              <div className="sp-card-top ">
                <div className="sp-icon" style={{ background:c.iconBg }}>{c.icon}</div>
                <span className={`sp-badge ${c.badgeType==="up"?"badge-up":"badge-down"}`}>
                  {c.badgeType==="up"?"▲":"▼"} {c.badge}
                </span>
              </div>
              <div className="sp-card-label">{c.label}</div>
              <div className="sp-card-bottom">
                <div>
                  <div className="sp-card-value">{c.value}</div>
                  <div className="sp-card-sub">{c.sub}</div>
                </div>
                {c.chart==="bar" ? <BarSparkline color={c.chartColor} /> : <LineSparkline color={c.chartColor} />}
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTER BAR ── */}
        <div className="sp-filterbar box_shadow">
          <div className="sp-search">
            <span style={{ color:"#9ca3af", fontSize:15 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search supplier, payment ID, ref..." />
          </div>
          <select className="sp-select" value={month} onChange={e=>setMonth(e.target.value)}>
            <option>April 2024</option>
            <option>March 2024</option>
            <option>May 2024</option>
          </select>
          <select className="sp-select">
            <option>All Modes</option>
            <option>Bank</option>
            <option>Cash</option>
            <option>UPI</option>
          </select>
          <button className="sp-filter-btn">Apply</button>
        </div>

        {/* ── PAYMENT HISTORY TABLE ── */}
        <div className="sp-table-wrap box_shadow">
          <div className="sp-table-header">
            <h4>Payment History</h4>
            <span style={{ fontSize:13, color:"#9ca3af" }}>
              Showing {filtered.length} of {PAYMENTS.length} records
            </span>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Payment ID</th><th>Supplier</th><th>Date</th>
                  <th>Mode</th><th>Paid Amount</th><th>Reference</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td className="td-id">{p.id}</td>
                    <td className="td-name">{p.supplier}</td>
                    <td>{p.date}</td>
                    <td>
                      <span className={`td-badge ${p.mode==="UPI"?"badge-success":p.mode==="Cash"?"badge-warning":"badge-danger"}`}>
                        {p.mode}
                      </span>
                    </td>
                    <td className="td-paid">₹{p.amount.toLocaleString()}</td>
                    <td style={{ color:"#6b7280", fontFamily:"monospace" }}>{p.ref || "—"}</td>
                    <td>
                      <span className={`td-badge ${p.status==="Cleared"?"badge-success":p.status==="Partial"?"badge-warning":"badge-danger"}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sp-pagination">
            <span style={{ fontSize:13, color:"#9ca3af" }}>Page 1 of 4</span>
            <div style={{ display:"flex", gap:6 }}>
              {["‹",1,2,3,"›"].map((p,i) => (
                <button key={i} className="page-btn" style={{
                  background: p===1?"#5b5ef4":"#f3f4f6",
                  color: p===1?"#fff":"#374151",
                }}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            ANALYTICS SECTION
        ════════════════════════════════════════ */}
        

        {/* Row 1: Monthly Trend + Payment Mode Pie */}
        <div className="analytics-row-1 pt-3">

          {/* Monthly Payable vs Paid Trend */}
          <div className="a-card box_shadow">
            <div className="a-card-head">
              <div>
                <div className="a-card-title">Monthly Payment Trend</div>
                <div className="a-card-sub">Payable vs Paid — last 7 months</div>
              </div>
              <div className="chart-legend">
                <span><span className="legend-dot" style={{background:"#5b5ef4"}}></span>Payable</span>
                <span><span className="legend-dot" style={{background:"#16a34a"}}></span>Paid</span>
              </div>
            </div>
            <div className="a-card-body">
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={MONTHLY_TREND} barGap={5} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize:11, fill:"#9ca3af", fontFamily:"Plus Jakarta Sans" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize:11, fill:"#9ca3af", fontFamily:"Plus Jakarta Sans" }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v}K`} />
                  <Tooltip content={<BarTip />} />
                  <Bar dataKey="payable" name="Payable" fill="#5b5ef4" radius={[4,4,0,0]} />
                  <Bar dataKey="paid"    name="Paid"    fill="#16a34a" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Mode Distribution */}
          <div className="a-card box_shadow">
            <div className="a-card-head">
              <div>
                <div className="a-card-title">Payment Mode Split</div>
                <div className="a-card-sub">By transaction volume</div>
              </div>
            </div>
            <div className="a-card-body">
              <div className="pie-wrap" style={{ position:"relative", height:150 }}>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={PAYMENT_MODE}
                      cx="50%" cy="50%"
                      innerRadius={48} outerRadius={68}
                      paddingAngle={3} dataKey="value"
                      onMouseEnter={(_,i) => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {PAYMENT_MODE.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={entry.color}
                          opacity={activeIndex===null || activeIndex===i ? 1 : 0.5}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-center">
                  <div className="pie-center-val">100%</div>
                  <div className="pie-center-label">Volume</div>
                </div>
              </div>

              <div className="pie-legend">
                {PAYMENT_MODE.map((m,i) => (
                  <div className="pie-legend-row" key={i}>
                    <div className="pie-legend-left">
                      <span style={{ width:10, height:10, borderRadius:"50%", background:m.color, display:"inline-block", flexShrink:0 }}></span>
                      {m.name}
                    </div>
                    <span className="pie-legend-pct" style={{ color:m.color }}>{m.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>{/* /row-1 */}

        {/* Row 2: Overdue Suppliers + Top Suppliers by Volume */}
        <div className="analytics-row-2">

          {/* Overdue Suppliers */}
          <div className="a-card box_shadow">
            <div className="a-card-head">
              <div>
                <div className="a-card-title">🔴 Overdue Suppliers</div>
                <div className="a-card-sub">Ranked by outstanding amount</div>
              </div>
              <span style={{ fontSize:10, background:"#fee2e2", color:"#dc2626", fontWeight:700, padding:"3px 10px", borderRadius:20 }}>
                9 active
              </span>
            </div>
            <div className="a-card-body">
              <div className="overdue-list">
                {OVERDUE_SUPPLIERS.map((s, i) => {
                  const rankCls = i===0?"rank-1":i===1?"rank-2":i===2?"rank-3":"rank-n";
                  return (
                    <div className="overdue-row" key={i}>
                      <div className={`overdue-rank ${rankCls}`}>{i+1}</div>
                      <div className="overdue-info">
                        <div className="overdue-name">{s.name}</div>
                        <div className="overdue-days">Last payment: {s.days} days ago</div>
                      </div>
                      <div className="overdue-badge-days">{s.days}d</div>
                      <div className="overdue-amount">₹{(s.overdue/1000).toFixed(0)}K</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Suppliers by Payment Volume */}
          <div className="a-card box_shadow">
            <div className="a-card-head">
              <div>
                <div className="a-card-title">Top Suppliers by Volume</div>
                <div className="a-card-sub">Paid vs Total Payable</div>
              </div>
            </div>
            <div className="a-card-body">
              <div className="supplier-list">
                {TOP_SUPPLIERS.map((s,i) => {
                  const color = s.pct===100?"#16a34a":s.pct>=70?"#5b5ef4":s.pct>=50?"#f59e0b":"#dc2626";
                  return (
                    <div className="supplier-row" key={i}>
                      <div className="supplier-row-top">
                        <span className="supplier-row-name">{s.name}</span>
                        <span className="supplier-row-pct" style={{ color }}>{s.pct}%</span>
                      </div>
                      <div className="supplier-row-amounts">
                        <span>Paid: <b style={{color:"#16a34a"}}>₹{(s.paid/1000).toFixed(0)}K</b></span>
                        <span>Total: <b style={{color:"#374151"}}>₹{(s.total/1000).toFixed(0)}K</b></span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width:`${s.pct}%`, background:color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>{/* /row-2 */}

      </div>
    </>
  );
}