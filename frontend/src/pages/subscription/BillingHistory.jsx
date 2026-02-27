import { useState } from "react";
import "./style.css";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f0f2f8;
    --white: #ffffff;
    --ink: #0f1623;
    --ink2: #3b4560;
    --ink3: #7c8aab;
    --border: #e2e6f0;
    --blue: #1e6fff;
    --blue-dark: #1458d6;
    --green: #16a34a;
    --orange: #ea580c;
    --purple: #7c3aed;
    --red: #dc2626;
    --teal: #0891b2;
  }

  body { background: var(--bg); }

  .page {
    min-height: 100vh;
    padding: 20px 22px 60px;
  }

  .page-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 24px; font-weight: 700; color: var(--ink); letter-spacing: -0.5px;
  }
  .page-title span { color: var(--primary-color); }
  .page-sub { font-size: 13px; color: var(--ink3); margin-top: 3px; }

  .header-actions { display: flex; gap: 10px; }

  .hbtn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 8px; font-size: 13px;
    font-weight: 500; cursor: pointer; border: none;;
    transition: all .15s;
  }
  .hbtn-ghost {
    background: var(--white); color: var(--ink2);
    border: 1px solid var(--border);
    box-shadow: 0 1px 3px rgba(0,0,0,.05);
  }
  .hbtn-ghost:hover { border-color: #b0b8d0; }
  .hbtn-primary { background: var(--primary-color); color: white; box-shadow: 0 2px 8px rgba(30,111,255,.3); }
  .hbtn-primary:hover { background: var(--blue-dark); }

  /* Filter Bar */
  .filter-bar {
    background: var(--white);
    border: 1px solid var(--border);
    padding: 16px 20px;
    margin-bottom: 20px;
  }
  .filter-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
  .filter-row + .filter-row { margin-top: 10px; }

  .filter-input, .filter-select {
    height: 38px; border: 1px solid var(--border);
    border-radius: 8px; padding: 0 12px;
    font-size: 13px; color: var(--ink2);
    background: #f8f9fc; outline: none; transition: border .15s;
    flex: 1; min-width: 120px;
  }
  .filter-input:focus, .filter-select:focus { border-color: var(--blue); background: white; }

  .date-input {
    display: flex; align-items: center; gap: 8px;
    height: 38px; border: 1px solid var(--border);
    border-radius: 8px; padding: 0 12px;
    font-size: 13px; color: var(--ink2); background: #f8f9fc;
    flex: 1.5; min-width: 200px; cursor: pointer;
  }

  .btn-apply {
    height: 38px; padding: 0 22px; border-radius: 8px;
    background: var( --active-button-color); color: white; font-size: 13px;
    font-weight: 600; border: none; cursor: pointer; 
    box-shadow: 0 2px 8px rgba(22,163,74,.3); transition: all .15s; white-space: nowrap;
  }
  .btn-apply:hover { background: #15803d; transform: translateY(-1px); }

  /* Summary Cards */
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
    margin-bottom: 22px;
  }

  .sum-card {
    border-radius: 14px;
    padding: 18px 16px 16px;
    color: white;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: transform .2s, box-shadow .2s;
  }
  .sum-card:hover { transform: translateY(-3px); }

  .sum-card::before {
    content: '';
    position: absolute; top: -20px; right: -20px;
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(255,255,255,.12);
  }
  .sum-card::after {
    content: '';
    position: absolute; bottom: -30px; left: -10px;
    width: 100px; height: 100px; border-radius: 50%;
    background: rgba(255,255,255,.07);
  }

  .sum-card.blue   { background: linear-gradient(135deg, #1e6fff, #1246c4); box-shadow: 0 6px 20px rgba(30,111,255,.35); }
  .sum-card.green  { background: linear-gradient(135deg, #16a34a, #0d6e30); box-shadow: 0 6px 20px rgba(22,163,74,.35); }
  .sum-card.orange { background: linear-gradient(135deg, #ea580c, #b84100); box-shadow: 0 6px 20px rgba(234,88,12,.35); }
  .sum-card.purple { background: linear-gradient(135deg, #7c3aed, #5b21b6); box-shadow: 0 6px 20px rgba(124,58,237,.35); }
  .sum-card.teal   { background: linear-gradient(135deg, #0891b2, #0e6880); box-shadow: 0 6px 20px rgba(8,145,178,.35); }
  .sum-card.red    { background: linear-gradient(135deg, #dc2626, #9f1a1a); box-shadow: 0 6px 20px rgba(220,38,38,.35); }

  .sum-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px; font-size: 16px;
  }
  .sum-label {
    font-size: 11px; font-weight: 500; opacity: .8;
    letter-spacing: .5px; text-transform: uppercase; margin-bottom: 6px;
  }
  .sum-value {
    font-size: 22px; font-weight: 700; letter-spacing: -0.5px;
     position: relative; z-index: 1;
  }
  .sum-delta {
    margin-top: 8px; font-size: 11px; opacity: .75;
    display: flex; align-items: center; gap: 4px;
  }
  .delta-badge {
    background: rgba(255,255,255,.2); padding: 2px 6px; border-radius: 4px;
    font-size: 10px; font-weight: 600;
  }

  /* Table */
  .table-card {
    background: var(--white);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .table-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; border-bottom: 1px solid var(--border);
  }
  .table-title { font-size: 15px; font-weight: 600; color: var(--ink); }
  .table-sub { font-size: 12px; color: var(--ink3); margin-top: 1px; }
  .toolbar-right { display: flex; gap: 8px; }

  .tbtn {
    height: 34px; padding: 0 14px; border-radius: 7px;
    font-size: 12px; font-weight: 500; border: 1px solid var(--border);
    background: #f8f9fc; color: var(--ink2); cursor: pointer; 
    transition: all .15s;
  }
  .tbtn:hover { background: white; border-color: #b0b8d0; }

  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #f8f9fc; }
  th {
    padding: 11px 14px; font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: .7px; color: var(--ink3);
    text-align: left; white-space: nowrap;
    border-bottom: 2px solid var(--border);
  }
  td {
    padding: 13px 14px; font-size: 13px; color: var(--ink2);
    border-bottom: 1px solid var(--border); white-space: nowrap;
  }
  tr:last-child td { border-bottom: none; }
  tbody tr { transition: background .1s; }
  tbody tr:hover { background: #f8f9fc; }

  .inv-link {
    font-size: 13px; font-weight: 500; color: var(--blue); cursor: pointer;
  }
  .inv-link:hover { text-decoration: underline; }

  .patient-name { font-weight: 600; color: var(--ink); }
  .patient-type { font-size: 11px; color: var(--ink3); margin-top: 2px; }

  .doctor-name { font-weight: 500; color: var(--ink); }
  .dept-tag {
    display: inline-block; margin-top: 2px;
    font-size: 10px; padding: 1px 6px; border-radius: 4px;
    background: #eff6ff; color: #1d4ed8; font-weight: 600;
  }

  .mono {  font-size: 12px; color: var(--ink3); }

  .amount {  font-weight: 700; color: var(--ink); }
  .amount.paid-amt { color: var(--green); }
  .amount.due-amt { color: var(--red); }
  .amount.total-amt { color: var(--blue); }

  .pay-chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 600;
  }
  .pay-chip.cash        { background: #f0fdf4; color: #15803d; }
  .pay-chip.card        { background: #eff6ff; color: #1d4ed8; }
  .pay-chip.upi         { background: #faf5ff; color: #7e22ce; }
  .pay-chip.insurance   { background: #fff7ed; color: #c2410c; }
  .pay-chip.cheque      { background: #f0f9ff; color: #0369a1; }

  .status-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
  }
  .status-chip.paid    { background: #f0fdf4; color: #15803d; }
  .status-chip.partial { background: #fff7ed; color: #c2410c; }
  .status-chip.pending { background: #fef2f2; color: #b91c1c; }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; }
  .paid .status-dot    { background: #16a34a; }
  .partial .status-dot { background: #ea580c; }
  .pending .status-dot { background: #dc2626; }

  .table-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-top: 1px solid var(--border); background: #f8f9fc;
  }
  .page-info { font-size: 12px; color: var(--ink3); }
  .pagination { display: flex; gap: 6px; }
  .ppage {
    width: 30px; height: 30px; border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 500; cursor: pointer;
    border: 1px solid var(--border); background: white; color: var(--ink2);
    transition: all .15s;
  }
  .ppage:hover, .ppage.active { background: var(--blue); color: white; border-color: var(--blue); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sum-card { animation: fadeUp .4s ease both; }
  .sum-card:nth-child(1) { animation-delay: .05s; }
  .sum-card:nth-child(2) { animation-delay: .10s; }
  .sum-card:nth-child(3) { animation-delay: .15s; }
  .sum-card:nth-child(4) { animation-delay: .20s; }
  .sum-card:nth-child(5) { animation-delay: .25s; }
  .sum-card:nth-child(6) { animation-delay: .30s; }
`;

const rows = [
  { inv: "INV0025", date: "30 Apr 2025", time: "10:30 AM", patient: "James Adair",    type: "OPD",      doctor: "Dr. Smith",   dept: "General",    mobile: "9876543210", total: 800,  paid: 800,  due: 0,    payment: "Card",      status: "paid" },
  { inv: "INV0024", date: "28 Apr 2025", time: "09:15 AM", patient: "Emily Johnson",  type: "IPD",      doctor: "Dr. Wilson",  dept: "Cardiology", mobile: "8812345678", total: 930,  paid: 500,  due: 430,  payment: "Insurance", status: "partial" },
  { inv: "INV0023", date: "25 Apr 2025", time: "04:45 PM", patient: "Anita Verma",    type: "OPD",      doctor: "Dr. Mehra",   dept: "Neurology",  mobile: "9900112233", total: 1200, paid: 1200, due: 0,    payment: "UPI",       status: "paid" },
  { inv: "INV0022", date: "22 Apr 2025", time: "02:20 PM", patient: "Green Hospital", type: "Corporate",doctor: "Dr. Nair",    dept: "Orthopedic", mobile: "8388895350", total: 4500, paid: 2000, due: 2500, payment: "Cheque",    status: "partial" },
  { inv: "INV0021", date: "19 Apr 2025", time: "11:00 AM", patient: "Vikram Patil",   type: "OPD",      doctor: "Dr. Kapoor",  dept: "Dermatology",mobile: "9993535550", total: 350,  paid: 0,    due: 350,  payment: "Cash",      status: "pending" },
  { inv: "INV0020", date: "15 Apr 2025", time: "03:00 PM", patient: "Sara Mathews",   type: "IPD",      doctor: "Dr. Raj",     dept: "Pediatrics", mobile: "9871230000", total: 2800, paid: 2800, due: 0,    payment: "Card",      status: "paid" },
  { inv: "INV0019", date: "12 Apr 2025", time: "08:30 AM", patient: "Mohan Das",      type: "OPD",      doctor: "Dr. Sharma",  dept: "ENT",        mobile: "7700112345", total: 600,  paid: 300,  due: 300,  payment: "UPI",       status: "partial" },
];

const payClass = (p) => {
  const m = { "Cash": "cash", "Card": "card", "UPI": "upi", "Insurance": "insurance", "Cheque": "cheque" };
  return m[p] || "cash";
};

export default function BillingHistory() {
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <style>{css}</style>
      <div className="page">

        {/* Header */}
        <div className="page-header bg-white box_shadow p-3">
          <div>
            <div className="page-title">Billing <span>History</span></div>
          </div>
          <div className="header-actions">
            <button className="hbtn hbtn-ghost">⬇ Export CSV</button>
            <button className="hbtn hbtn-ghost">🖨 Print</button>
            <button className="hbtn hbtn-primary">+ New Invoice</button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar box_shadow">
          <div className="filter-row">
            <div className="date-input">📅 <span>01/04/2025 to 30/04/2025</span></div>
            <input className="filter-input" placeholder="Invoice No" />
            <input className="filter-input" placeholder="Patient Name" />
            <select className="filter-select"><option>Doctor</option></select>
            <select className="filter-select"><option>Department</option></select>
            <select className="filter-select"><option>Patient Type: All</option></select>
          </div>
          <div className="filter-row">
            <select className="filter-select"><option>Invoice No.</option></select>
            <select className="filter-select"><option>Status: All</option></select>
            <select className="filter-select"><option>Payment Mode</option></select>
            <input className="filter-input" placeholder="Mobile No" />
            <select className="filter-select"><option>Amount Range</option></select>
            <button className="btn-apply">✓ Apply Filter</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="sum-card blue">
            <div className="sum-icon">💰</div>
            <div className="sum-label">Total Billing</div>
            <div className="sum-value">$15,200</div>
            <div className="sum-delta"><span className="delta-badge">↑ 12.4%</span> vs last month</div>
          </div>
          <div className="sum-card green">
            <div className="sum-icon">✅</div>
            <div className="sum-label">Total Paid</div>
            <div className="sum-value">$11,300</div>
            <div className="sum-delta"><span className="delta-badge">74.3%</span> collection rate</div>
          </div>
          <div className="sum-card red">
            <div className="sum-icon">⚠️</div>
            <div className="sum-label">Pending Dues</div>
            <div className="sum-value">$3,900</div>
            <div className="sum-delta"><span className="delta-badge">4</span> invoices pending</div>
          </div>
          <div className="sum-card purple">
            <div className="sum-icon">🧾</div>
            <div className="sum-label">Total Invoices</div>
            <div className="sum-value">25</div>
            <div className="sum-delta"><span className="delta-badge">↑ 8</span> this week</div>
          </div>
          <div className="sum-card teal">
            <div className="sum-icon">🏥</div>
            <div className="sum-label">IPD Billing</div>
            <div className="sum-value">$9,800</div>
            <div className="sum-delta"><span className="delta-badge">64%</span> of total</div>
          </div>
          <div className="sum-card orange">
            <div className="sum-icon">🩺</div>
            <div className="sum-label">OPD Billing</div>
            <div className="sum-value">$5,400</div>
            <div className="sum-delta"><span className="delta-badge">36%</span> of total</div>
          </div>
        </div>

        {/* Table */}
<div className="table-card box_shadow">
  <div className="table-toolbar">
    <div>
      <div className="table-title">Billing Transactions</div>
      <div className="table-sub">
        Showing {rows.length} of 25 records · April 2025
      </div>
    </div>

    <div className="toolbar-right">
      <button className="tbtn">Search</button>
      <button className="tbtn">Sort</button>
      <button className="tbtn">Export</button>
    </div>
  </div>

  <table className="billing-table">
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Date</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Total</th>
        <th>Paid</th>
        <th>Due</th>
        <th>Status</th>
        <th style={{textAlign:"center"}}>Action</th>
      </tr>
    </thead>

    <tbody>
      {rows.map((r) => (
        <tr key={r.inv}>
          <td><span className="inv-link">{r.inv}</span></td>

          <td>
            <div className="primary-text">{r.date}</div>
            <div className="sub-text">{r.time}</div>
          </td>

          <td>
            <div className="primary-text">{r.patient}</div>
            <div className="sub-text">{r.mobile}</div>
          </td>

          <td>
            <div className="primary-text">{r.doctor}</div>
            <div className="sub-text">{r.dept}</div>
          </td>

          <td className="amount total-amt">
            ${r.total.toLocaleString()}
          </td>

          <td className="amount paid-amt">
            ${r.paid.toLocaleString()}
          </td>

          <td>
            {r.due > 0
              ? <span className="amount due-amt">${r.due.toLocaleString()}</span>
              : <span className="sub-text">—</span>
            }
          </td>

          <td>
            <span className={`status-chip ${r.status}`}>
              {r.status}
            </span>
          </td>

          {/* 3 DOT MENU */}
          <td style={{textAlign:"center"}}>
            <div className="action-menu">
              <button className="dot-btn">⋮</button>

              <div className="dropdown-menu">
                <div className="dd-item">Download</div>
                <div className="dd-item">Edit</div>
                <div className="dd-item delete">Delete</div>
              </div>
            </div>
          </td>

        </tr>
      ))}
    </tbody>
  </table>

  <div className="table-footer">
    <div className="page-info">
      Showing 1–{rows.length} of 25 entries
    </div>

    <div className="pagination">
      {[1,2,3,"…",5].map((p,i)=>(
        <button
          key={i}
          className={`ppage ${activePage === p ? "active" : ""}`}
          onClick={()=> typeof p==="number" && setActivePage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  </div>
</div>

      </div>
    </>
  );
}