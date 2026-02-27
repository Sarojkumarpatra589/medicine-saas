import React, { useState } from "react";
import "./style.css";

/* ─── Sparkline SVG helpers ──────────────────────────────────── */
const BarSparkline = ({ color }) => {
  const bars = [3, 6, 4, 8, 5, 9, 7, 11, 8, 13, 10, 14];
  const max = Math.max(...bars);
  return (
    <svg width="80" height="36" viewBox="0 0 80 36" fill="none">
      {bars.map((v, i) => {
        const h = (v / max) * 30;
        return (
          <rect
            key={i}
            x={i * 7}
            y={36 - h}
            width="5"
            height={h}
            rx="2"
            fill={color}
            opacity={0.35 + i * 0.055}
          />
        );
      })}
    </svg>
  );
};

const LineSparkline = ({ color }) => (
  <svg width="90" height="36" viewBox="0 0 90 36" fill="none">
    <defs>
      <linearGradient id="lgGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.25" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 28 C10 24 18 10 30 14 C42 18 50 6 60 8 C70 10 80 4 90 2"
      stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round"
    />
    <path
      d="M0 28 C10 24 18 10 30 14 C42 18 50 6 60 8 C70 10 80 4 90 2 L90 36 L0 36 Z"
      fill="url(#lgGreen)"
    />
  </svg>
);

/* ─── Inline CSS ─────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sl-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f4f8;
    min-height: 100vh;
    padding: 20px 25px;
    color: #111827;
  
  }

  .sl-header {
    background: #fff;
    padding: 11px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
  }
  .sl-header h2 { font-size: 20px; font-weight: 800; color: #111827; }
  .sl-header-actions { display: flex; gap: 10px; }

  .btn-primary-h {
    background: #5b5ef4;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 9px 18px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: inherit;
    transition: opacity .18s;
  }
  .btn-primary-h:hover { opacity: .87; }

  .btn-outline-h {
    background: #fff;
    color: #374151;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 9px 18px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: inherit;
    transition: border-color .18s;
  }
  .btn-outline-h:hover { border-color: #5b5ef4; }

  .sl-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 22px;
  }
  @media (max-width: 1100px) { .sl-cards { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 600px)  { .sl-cards { grid-template-columns: 1fr; } }

  .sl-card {
    background: #fff;
  
    padding: 20px 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition: transform .2s, box-shadow .2s;
    cursor: default;
  }
  .sl-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 22px rgba(0,0,0,0.10);
  }

  .sl-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .sl-icon {
    width: 46px; height: 46px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .sl-badge {
    font-size: 11.5px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .badge-up   { background: #dcfce7; color: #16a34a; }
  .badge-down { background: #fee2e2; color: #dc2626; }

  .sl-card-label {
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
    margin-top: 4px;
  }

  .sl-card-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 2px;
  }

  .sl-card-value {
    font-size: 30px;
    font-weight: 800;
    color: #111827;
    letter-spacing: -1px;
    line-height: 1;
  }

  .sl-card-sub {
    font-size: 11px;
    color: #9ca3af;
    margin-top: 4px;
  }

  .sl-filterbar {
    background: #fff;
    padding: 14px 20px;
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .sl-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 14px;
    flex: 1;
    min-width: 180px;
  }
  .sl-search input {
    border: none; background: transparent; outline: none;
    font-family: inherit; font-size: 13.5px; width: 100%; color: #374151;
  }

  .sl-select {
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 14px;
    font-family: inherit;
    font-size: 13.5px;
    color: #374151;
    outline: none;
    cursor: pointer;
  }

  .sl-filter-btn {
    background: #5b5ef4;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 9px 20px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: opacity .18s;
  }
  .sl-filter-btn:hover { opacity: .88; }

  .sl-table-wrap {
    background: #fff;
    overflow: hidden;
  }

  .sl-table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px 14px;
    border-bottom: 1.5px solid #f3f4f6;
  }
  .sl-table-header h4 { font-size: 16px; font-weight: 700; }

  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  thead tr { background: #f9fafb; }
  thead th {
    padding: 12px 18px;
    text-align: left;
    font-weight: 600;
    font-size: 11.5px;
    text-transform: uppercase;
    letter-spacing: .6px;
    color: #9ca3af;
    border-bottom: 1.5px solid #f3f4f6;
  }
  tbody tr { border-bottom: 1px solid #f3f4f6; transition: background .15s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafafa; }
  tbody td { padding: 14px 18px; color: #374151; vertical-align: middle; }

  .td-name { font-weight: 700; color: #111827; font-size: 14px; }
  .td-sub  { font-size: 11.5px; color: #9ca3af; margin-top: 2px; }
  .td-amt  { font-weight: 700; color: #dc2626; }

  .td-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }
  .badge-active   { background: #dcfce7; color: #16a34a; }
  .badge-inactive { background: #fee2e2; color: #dc2626; }

  .supplier-avatar {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px; color: #fff;
    flex-shrink: 0;
  }

  .page-btn {
    background: #f3f4f6; border: none; border-radius: 6px;
    width: 30px; height: 30px; cursor: pointer; font-size: 13px;
    font-family: inherit; font-weight: 600; color: #374151;
    display: flex; align-items: center; justify-content: center;
    transition: background .15s;
  }
  .page-btn:hover { background: #e5e7eb; }
  .page-btn.active { background: #5b5ef4; color: #fff; }
`;

/* ─── Data ───────────────────────────────────────────────────── */
const CARDS = [
  {
    icon: "👥",
    iconBg: "#ede9fe",
    label: "Total Suppliers",
    value: "128",
    badge: "+8%",
    badgeType: "up",
    chart: "bar",
    chartColor: "#7c3aed",
    sub: "in last 7 Days",
  },
  {
    icon: "✅",
    iconBg: "#dcfce7",
    label: "Active Suppliers",
    value: "94",
    badge: "+25%",
    badgeType: "up",
    chart: "bar",
    chartColor: "#16a34a",
    sub: "in last 7 Days",
  },
  {
    icon: "⚠️",
    iconBg: "#fef3c7",
    label: "Suppliers With Due",
    value: "35",
    badge: "-15%",
    badgeType: "down",
    chart: "bar",
    chartColor: "#f59e0b",
    sub: "in last 7 Days",
  },
  {
    icon: "₹",
    iconBg: "#dcfce7",
    label: "Total Outstanding",
    value: "₹8.75L",
    badge: "+25%",
    badgeType: "up",
    chart: "line",
    chartColor: "#16a34a",
    sub: "in last 7 Days",
  },
];

const SUPPLIERS = [
  { id: 1, sid: "SUP001", name: "Apex Pharma", contact: "Rajesh Sharma", mobile: "9876543210", gst: "27AGPT1234L1ZZ", outstanding: 15000, lastPurchase: "12 Mar 2022", status: "Active", color: "#7c3aed" },
  { id: 2, sid: "SUP002", name: "Medico Supplies", contact: "Anil Gupta", mobile: "9871234567", gst: "24BGH1567TRX2", outstanding: 75000, lastPurchase: "05 Feb 2022", status: "Active", color: "#2563eb" },
  { id: 3, sid: "SUP003", name: "HealthFirst Pharma", contact: "Priya Mehta", mobile: "9812345678", gst: "07CGHP2341K1ZT", outstanding: 0, lastPurchase: "20 Jan 2022", status: "Active", color: "#16a34a" },
  { id: 4, sid: "SUP004", name: "CureMed Corp", contact: "Sandeep Rao", mobile: "9823456789", gst: "29DGHM5678L2YZ", outstanding: 42000, lastPurchase: "15 Mar 2022", status: "Inactive", color: "#dc2626" },
  { id: 5, sid: "SUP005", name: "Pharma Plus Ltd", contact: "Neha Singh", mobile: "9834567890", gst: "06EGHQ9012M3XZ", outstanding: 8500, lastPurchase: "10 Feb 2022", status: "Active", color: "#d97706" },
];

/* ─── Component ──────────────────────────────────────────────── */
export default function SupplierList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = SUPPLIERS.filter(s =>
    (status === "All" || s.status === status) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.sid.includes(search))
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="sl-root">

        {/* HEADER */}
        <div className="sl-header box_shadow">
          <h2>Supplier Management</h2>
          <div className="sl-header-actions">
            <button className="btn-primary-h">
              <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add Supplier
            </button>
            <button className="btn-outline-h">
              <span>📅</span> Export Report
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="sl-cards">
          {CARDS.map((c, i) => (
            <div className="sl-card box_shadow" key={i}>
              <div className="sl-card-top">
                <div className="sl-icon" style={{ background: c.iconBg }}>
                  {c.icon}
                </div>
                <span className={`sl-badge ${c.badgeType === "up" ? "badge-up" : "badge-down"}`}>
                  {c.badgeType === "up" ? "▲" : "▼"} {c.badge}
                </span>
              </div>

              <div className="sl-card-label">{c.label}</div>

              <div className="sl-card-bottom">
                <div>
                  <div className="sl-card-value">{c.value}</div>
                  <div className="sl-card-sub">{c.sub}</div>
                </div>
                {c.chart === "bar"
                  ? <BarSparkline color={c.chartColor} />
                  : <LineSparkline color={c.chartColor} />
                }
              </div>
            </div>
          ))}
        </div>

        {/* FILTER BAR */}
        <div className="sl-filterbar box_shadow">
          <div className="sl-search">
            <span style={{ color: "#9ca3af", fontSize: 15 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search supplier name or ID..."
            />
          </div>
          <select className="sl-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="sl-select">
            <option>Outstanding</option>
            <option>Due Only</option>
            <option>No Due</option>
          </select>
          <button className="sl-filter-btn">Apply Filters</button>
        </div>

        {/* TABLE */}
        <div className="sl-table-wrap box_shadow">
          <div className="sl-table-header">
            <h4>Supplier Directory</h4>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>
              Showing {filtered.length} of {SUPPLIERS.length} suppliers
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Contact Person</th>
                <th>GST Number</th>
                <th>Outstanding</th>
                <th>Last Purchase</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="supplier-avatar" style={{ background: s.color }}>
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="td-name">{s.name}</div>
                        <div className="td-sub">{s.sid}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{s.contact}</div>
                    <div className="td-sub">{s.mobile}</div>
                  </td>
                  <td style={{ fontFamily: "monospace", fontSize: 12.5, color: "#6b7280" }}>
                    {s.gst}
                  </td>
                  <td>
                    {s.outstanding > 0
                      ? <span className="td-amt">₹{s.outstanding.toLocaleString()}</span>
                      : <span style={{ color: "#16a34a", fontWeight: 600 }}>Cleared</span>
                    }
                  </td>
                  <td style={{ color: "#6b7280" }}>{s.lastPurchase}</td>
                  <td>
                    <span className={`td-badge ${s.status === "Active" ? "badge-active" : "badge-inactive"}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1.5px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>
              Page 1 of 5
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {["‹", 1, 2, 3, "›"].map((p, i) => (
                <button key={i} className={`page-btn ${p === 1 ? "active" : ""}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}