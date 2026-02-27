import { useState } from "react";
import "./style.css";

/* ─────────────────── Static Data ─────────────────── */
const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

const CHART_DATA = [
  { month: "Apr", expiring: 9,  expired: 0,  low: 1  },
  { month: "May", expiring: 13, expired: 8,  low: 3  },
  { month: "Jun", expiring: 10, expired: 8,  low: 2  },
  { month: "Jul", expiring: 14, expired: 11, low: 7  },
  { month: "Aug", expiring: 11, expired: 8,  low: 2  },
  { month: "Sep", expiring: 16, expired: 11, low: 10 },
];

const ALERTS = [
  {
    name: "Paracetamol",
    status: "Expires in 15 days",
    date: "29 May 2024",
    type: "green",
    icon: "💊",
    expired: false,
  },
  {
    name: "Amoxxillin",
    status: "Expires in 8 days",
    date: "22 May 2024",
    type: "amber",
    icon: "💊",
    expired: false,
  },
  {
    name: "Cough Syrup",
    status: "Expired on",
    highlight: "05 Apr 2024",
    date: "22 May 2024",
    type: "red",
    icon: "🩹",
    expired: true,
  },
];

const NEAR_EXPIRY = [
  { name: "Ibuprofen",  category: "Tablet",  stock: 25, expiry: "20 Jan 2024", icon: "💊", iconType: "orange" },
  { name: "Vitamin C",  category: "Syrup",   stock: 15, expiry: "05 Jul 2024", icon: "🧴", iconType: "red"    },
  { name: "Aspirin",    category: "Capsule", stock: 10, expiry: "18 Jul 2024", icon: "💊", iconType: "amber"  },
];

const EXPIRED_ITEMS = [
  { name: "Antacid",        category: "Tablet",  expiry: "12 Apr 2024" },
  { name: "Eye Drops",      category: "Drops",   expiry: "28 Mar 2024" },
  { name: "Pain Relief Gel",category: "Topical", expiry: "15 Mar 2024" },
];

/* ─────────────────── SVG Chart ─────────────────── */
const W = 620, H = 190, PAD = { top: 10, right: 10, bottom: 36, left: 28 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;
const MAX_Y   = 16;

function xPos(i) { return PAD.left + (i / (MONTHS.length - 1)) * CHART_W; }
function yPos(v) { return PAD.top + CHART_H - (v / MAX_Y) * CHART_H; }

function polyPoints(key) {
  return CHART_DATA.map((d, i) => `${xPos(i)},${yPos(d[key])}`).join(" ");
}

function areaPoints(key) {
  const top = CHART_DATA.map((d, i) => `${xPos(i)},${yPos(d[key])}`).join(" ");
  const base = `${xPos(CHART_DATA.length - 1)},${yPos(0)} ${xPos(0)},${yPos(0)}`;
  return `${top} ${base}`;
}

function Chart() {
  const yLines = [0, 4, 8, 10, 13, 16];

  return (
    <div className="chart-area">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradExpiring" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f97316" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="gradExpired" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y grid lines */}
        {yLines.map(v => (
          <line key={v}
            x1={PAD.left} y1={yPos(v)} x2={W - PAD.right} y2={yPos(v)}
            stroke="#e5e7eb" strokeWidth="1"
          />
        ))}
        {/* Y labels */}
        {yLines.map(v => (
          <text key={v} x={PAD.left - 6} y={yPos(v) + 4}
            fontSize="10" fill="#9ca3af" textAnchor="end">{v}</text>
        ))}

        {/* Bar chart - Low Stock */}
        {CHART_DATA.map((d, i) => {
          const bw = 28;
          const bh = (d.low / MAX_Y) * CHART_H;
          return (
            <rect key={i}
              x={xPos(i) - bw / 2}
              y={yPos(d.low)}
              width={bw}
              height={bh}
              rx="4"
              fill="#3b82f6"
              opacity="0.85"
            />
          );
        })}

        {/* Area – Expiring */}
        <polygon points={areaPoints("expiring")} fill="url(#gradExpiring)" />
        {/* Area – Expired */}
        <polygon points={areaPoints("expired")} fill="url(#gradExpired)" />

        {/* Lines */}
        <polyline points={polyPoints("expiring")} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round" />
        <polyline points={polyPoints("expired")}  fill="none" stroke="#ef4444" strokeWidth="2"   strokeLinejoin="round" />

        {/* Dots – Expiring */}
        {CHART_DATA.map((d, i) => (
          <circle key={i} cx={xPos(i)} cy={yPos(d.expiring)} r="4" fill="#f97316" />
        ))}
        {/* Dots – Expired */}
        {CHART_DATA.map((d, i) => (
          <circle key={i} cx={xPos(i)} cy={yPos(d.expired)} r="3.5" fill="#ef4444" />
        ))}

        {/* X labels */}
        {MONTHS.map((m, i) => (
          <text key={m} x={xPos(i)} y={H - 6}
            fontSize="11" fill="#6b7280" textAnchor="middle">{m}</text>
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────── Main Component ─────────────────── */
export default function ExpiryTracking() {
  const [page, setPage] = useState(0);

  return (
    <div className="dashboard">

      {/* Header */}
<div className="dashboard-header bg-white box_shadow rounded p-3 mb-4 d-flex justify-content-between align-items-center">
  
  <h5 className="fw-bold mb-0">Expiry Tracking Dashboard</h5>

  <div className="nav-arrows d-flex gap-2">
    <button
      className="nav-btn"
      onClick={() => setPage(p => Math.max(0, p - 1))}
    >
      &#8249;
    </button>

    <button
      className="nav-btn"
      onClick={() => setPage(p => p + 1)}
    >
      &#8250;
    </button>
  </div>

</div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card box_shadow">
          <div className="card-icon orange">🔔</div>
          <div className="card-info">
            <div className="card-title">Near Expiry</div>
            <div className="card-count orange">12 <span>Items</span></div>
            <div className="card-sub">Expiring Soon</div>
          </div>
        </div>
        <div className="summary-card box_shadow">
          <div className="card-icon red">🚨</div>
          <div className="card-info">
            <div className="card-title">Expired</div>
            <div className="card-count red">5 <span>Items</span></div>
            <div className="card-sub">Already Expired</div>
          </div>
        </div>
        <div className="summary-card box_shadow">
          <div className="card-icon amber">📦</div>
          <div className="card-info">
            <div className="card-title">Low Stock</div>
            <div className="card-count amber">8 <span>Items</span></div>
            <div className="card-sub">Running Low</div>
          </div>
        </div>
        <div className="summary-card box_shadow" >
          <div className="card-icon blue">📋</div>
          <div className="card-info">
            <div className="card-title">Total Inventory</div>
            <div className="card-count blue">185 <span>Items</span></div>
            <div className="card-sub">In Stock</div>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="middle-row">

        {/* Chart */}
        <div className="chart-card box_shadow">
          <h2>Expiry Overview</h2>
          <Chart />
          <div className="chart-legend">
            <div className="legend-item"><span className="legend-dot expiring" /> Expiring Soon</div>
            <div className="legend-item"><span className="legend-dot expired"  /> Expired</div>
            <div className="legend-item"><span className="legend-dot low"      /> Low Stock</div>
          </div>
        </div>

        {/* Alerts */}
        <div className="alerts-card box_shadow">
          <h2>Expiry Alerts</h2>
          {ALERTS.map((a, i) => (
            <div className="alert-item" key={i}>
              <div className={`alert-icon ${a.type}`}>{a.icon}</div>
              <div className="alert-info">
                <div className="alert-name">{a.name}</div>
                {a.expired ? (
                  <div className="alert-status expired-text">
                    {a.status} <span className="highlight">{a.highlight}</span>
                  </div>
                ) : (
                  <div className="alert-status">{a.status}</div>
                )}
              </div>
              <div className="alert-date">{a.date}</div>
            </div>
          ))}
          <a className="view-all-link">View All</a>
        </div>
      </div>

      {/* Bottom Tables */}
      <div className="bottom-row">

        {/* Near Expiry */}
        <div className="table-card box_shadow">
          <h2>Near Expiry Items</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {NEAR_EXPIRY.map((item, i) => (
                <tr key={i}>
                  <td>
                    <span className={`med-icon ${item.iconType}`}>{item.icon}</span>
                    {item.name}
                  </td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            <a className="view-all-link">View All</a>
          </div>
        </div>

        {/* Expired Items */}
        <div className="table-card box_shadow">
          <h2>Expired Items</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Category</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {EXPIRED_ITEMS.map((item, i) => (
                <tr key={i}>
                  <td style={{ display: "table-cell", fontWeight: 600 }}>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            <a className="view-all-link">View All</a>
          </div>
        </div>
      </div>

      {/* Stock Status Bar */}
      <div className="stock-status-bar box_shadow">
        <span className="label">Stock Status</span>
        <div className="status-items">
          <div className="status-item"><span className="status-dot expiring" /> Expiring Soon</div>
          <div className="status-item"><span className="status-dot expired"  /> Expired</div>
          <div className="status-item"><span className="status-dot low"      /> Low Stock</div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "25%" }} />
        </div>
        <div className="progress-numbers">
          <span className="prog-num amber">3</span>
          <span className="prog-num gray">12</span>
        </div>
      </div>

    </div>
  );
}