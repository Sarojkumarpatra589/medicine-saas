import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d1117;
    --ink-2: #3d4451;
    --ink-3: #6e7787;
    --rule: #e8eaee;
    --surface: #f5f6f9;
    --white: #ffffff;
    --accent: #1a56db;
    --accent-light: #eff4ff;
    --danger: #e02424;
    --danger-light: #fef2f2;
    --green: #057a55;
    --green-light: #f0fdf4;
  }

  body { background: var(--surface); }

  .wrap {
    min-height: 100vh;
    background: var(--surface);
    font-family: 'Instrument Sans', sans-serif;
    padding: 40px 20px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .topbar {
    width: 100%;
    max-width: 860px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .back-btn {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500; color: var(--ink-3);
    cursor: pointer; border: none; background: none; font-family: inherit;
    transition: color .15s; padding: 0;
  }
  .back-btn:hover { color: var(--ink); }

  .topbar-actions { display: flex; gap: 10px; }

  .tbtn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 8px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    font-family: inherit; border: none; transition: all .15s;
  }
  .tbtn-ghost {
    background: var(--white); color: var(--ink-2);
    border: 1px solid var(--rule);
    box-shadow: 0 1px 3px rgba(0,0,0,.06);
  }
  .tbtn-ghost:hover { background: var(--surface); border-color: #c8cdd8; }
  .tbtn-solid { background: var(--accent); color: white; box-shadow: 0 1px 3px rgba(26,86,219,.3); }
  .tbtn-solid:hover { background: #1447b5; }

  .card {
    width: 100%; max-width: 860px;
    background: var(--white);
    border-radius: 20px;
    border: 1px solid var(--rule);
    box-shadow: 0 2px 24px rgba(0,0,0,.07), 0 1px 4px rgba(0,0,0,.04);
    overflow: hidden;
  }

  .hero {
    background: var(--ink);
    padding: 32px 40px;
    display: flex; align-items: flex-start; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(26,86,219,.25) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 80%, rgba(5,122,85,.15) 0%, transparent 50%);
  }

  .hero-left { position: relative; z-index: 1; }

  .logo-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }

  .logo-mark {
    width: 38px; height: 38px; background: var(--accent);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(26,86,219,.4);
  }
  .logo-mark svg { width: 22px; height: 22px; fill: white; }

  .logo-name {
    font-family: 'Fraunces', serif;
    font-size: 22px; font-weight: 400; color: white; letter-spacing: -0.2px;
  }

  .inv-label {
    font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
    text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 6px;
  }
  .inv-number {
    font-family: 'Fraunces', serif;
    font-size: 36px; font-weight: 300; font-style: italic;
    color: white; letter-spacing: -1px; line-height: 1;
  }

  .hero-right {
    position: relative; z-index: 1;
    text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 16px;
  }

  .due-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(224,36,36,.15); border: 1px solid rgba(224,36,36,.3);
    color: #ff6b6b; font-size: 12px; font-weight: 600;
    padding: 5px 12px; border-radius: 100px;
  }
  .due-dot { width: 6px; height: 6px; background: #ff6b6b; border-radius: 50%; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }

  .hero-dates { display: flex; flex-direction: column; gap: 4px; }
  .hero-date-row { font-size: 12px; color: rgba(255,255,255,.5); }
  .hero-date-row strong { color: rgba(255,255,255,.85); font-weight: 500; margin-left: 6px; }

  .recurring-pill {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(5,122,85,.2); border: 1px solid rgba(5,122,85,.3);
    color: #4ade80; font-size: 11px; font-weight: 600;
    padding: 4px 10px; border-radius: 100px; letter-spacing: .3px;
  }

  .parties {
    display: grid; grid-template-columns: 1fr 40px 1fr;
    padding: 28px 40px; border-bottom: 1px solid var(--rule); align-items: center;
  }

  .party-label {
    font-size: 10px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1px; color: var(--ink-3); margin-bottom: 8px;
  }
  .party-name {
    font-family: 'Fraunces', serif;
    font-size: 18px; font-weight: 400; color: var(--ink); margin-bottom: 6px;
  }
  .party-addr { font-size: 12px; color: var(--ink-3); line-height: 1.7; }

  .arrow-divider { display: flex; align-items: center; justify-content: center; }
  .arrow-circle {
    width: 32px; height: 32px; background: var(--surface);
    border: 1px solid var(--rule); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  .table-wrap { padding: 0 40px 8px; }

  .tgrid {
    display: grid;
    grid-template-columns: 28px 1fr 2fr 90px 60px 90px;
    gap: 0 12px;
    align-items: center;
  }

  .th-row {
    font-size: 10px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1px; color: var(--ink-3);
    padding: 16px 0 10px; border-bottom: 2px solid var(--rule);
  }
  .th-row > div:nth-child(4),
  .th-row > div:nth-child(5),
  .th-row > div:nth-child(6) { text-align: right; }

  .tr {
    border-bottom: 1px solid var(--rule); padding: 16px 0;
  }
  .tr > div:nth-child(4),
  .tr > div:nth-child(5),
  .tr > div:nth-child(6) { text-align: right; }

  .row-num {
    width: 24px; height: 24px; background: var(--surface);
    border: 1px solid var(--rule); border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600; color: var(--ink-3);
  }
  .item-name { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
  .item-desc { font-size: 11px; color: var(--ink-3); line-height: 1.4; }
  .cell-val { font-size: 13px; color: var(--ink-2); }
  .cell-total { font-size: 13px; font-weight: 600; color: var(--ink); }

  .bottom-grid {
    display: grid; grid-template-columns: 1fr 280px;
    border-top: 1px solid var(--rule);
  }

  .bank-col { padding: 28px 40px; border-right: 1px solid var(--rule); }
  .col-label {
    font-size: 10px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1px; color: var(--ink-3); margin-bottom: 16px;
  }
  .bank-item {
    display: flex; justify-content: space-between;
    padding: 7px 0; border-bottom: 1px dashed var(--rule); font-size: 12px;
  }
  .bank-item:last-child { border-bottom: none; }
  .bank-item span:first-child { color: var(--ink-3); }
  .bank-item span:last-child { font-weight: 500; color: var(--ink); }

  .totals-col { padding: 28px 32px; }
  .total-line {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; font-size: 13px;
  }
  .total-line span:first-child { color: var(--ink-3); }
  .total-line span:last-child { color: var(--ink-2); font-weight: 500; }
  .total-line.discount span:last-child { color: var(--danger); font-weight: 600; }
  .discount-badge {
    font-size: 10px; background: var(--danger-light); color: var(--danger);
    padding: 1px 6px; border-radius: 4px; margin-left: 6px; font-weight: 600;
  }
  .total-sep { height: 1px; background: var(--rule); margin: 10px 0; }
  .grand-line {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 12px; background: var(--ink); border-radius: 10px; margin-top: 4px;
  }
  .grand-label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.6); }
  .grand-amount { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 400; color: white; }
  .total-words-text { font-size: 11px; color: var(--ink-3); text-align: right; margin-top: 8px; font-style: italic; }

  .card-footer {
    padding: 24px 40px; background: var(--surface);
    border-top: 1px solid var(--rule);
    display: grid; grid-template-columns: 1fr 1fr auto;
    gap: 32px; align-items: end;
  }
  .footer-block h4 {
    font-size: 10px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 1px; color: var(--ink-3); margin-bottom: 6px;
  }
  .footer-block p { font-size: 12px; color: var(--ink-3); line-height: 1.6; }

  .sig-block { text-align: right; }
  .sig-script {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 28px; font-weight: 300; color: var(--ink); line-height: 1.1;
    margin-bottom: 4px; opacity: .75;
  }
  .sig-name { font-size: 13px; font-weight: 600; color: var(--ink); }
  .sig-role { font-size: 11px; color: var(--ink-3); margin-top: 1px; }

  .action-row {
    padding: 18px 40px; border-top: 1px solid var(--rule);
    display: flex; justify-content: center; gap: 12px;
  }
  .act-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 22px; border-radius: 10px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    font-family: inherit; border: none; transition: all .15s;
  }
  .act-btn-outline {
    background: white; color: var(--ink-2);
    border: 1px solid var(--rule);
    box-shadow: 0 1px 3px rgba(0,0,0,.05);
  }
  .act-btn-outline:hover { background: var(--surface); border-color: #c1c7d5; }
  .act-btn-fill {
    background: var(--accent); color: white;
    box-shadow: 0 2px 8px rgba(26,86,219,.25);
  }
  .act-btn-fill:hover { background: #1447b5; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,86,219,.3); }
`;

export default function Invoice() {
  const items = [
    { id: 1, name: "Full body checkup", desc: "Complete health screening covering all major systems", cost: 400, qty: 1 },
    { id: 2, name: "Blood Test", desc: "Routine blood analysis to assess overall health status", cost: 250, qty: 1 },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="wrap">

        <div className="topbar">
          <button className="back-btn">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
            Invoices
          </button>
          <div className="topbar-actions">
            <button className="tbtn tbtn-ghost">Edit</button>
            <button className="tbtn tbtn-solid">Send Invoice</button>
          </div>
        </div>

        <div className="card">

          {/* Hero Banner */}
          <div className="hero">
            <div className="hero-left">
              <div className="logo-wrap">
                <div className="logo-mark">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <span className="logo-name">Drafticode</span>
              </div>
              <div className="inv-label">Invoice</div>
              <div className="inv-number">#INV0025</div>
            </div>

            <div className="hero-right">
              <div className="due-chip">
                <span className="due-dot" />
                Due in 8 days
              </div>
              <div className="hero-dates">
                <div className="hero-date-row">Issued<strong>25 Jan 2025</strong></div>
                <div className="hero-date-row">Due<strong>31 Jan 2025</strong></div>
              </div>
              <div className="recurring-pill">↻ Monthly Recurring</div>
            </div>
          </div>

          {/* From / To */}
          <div className="parties">
            <div>
              <div className="party-label">From</div>
              <div className="party-name">Andrew Fletcher</div>
              <div className="party-addr">5754 Airport Rd Coosada<br/>AL, 36020 United States</div>
            </div>

            <div className="arrow-divider">
              <div className="arrow-circle">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="#6e7787">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>

            <div>
              <div className="party-label">To</div>
              <div className="party-name">Andrew Fletcher</div>
              <div className="party-addr">299 Star Trek Drive<br/>Florida, 3240, United States</div>
            </div>
          </div>

          {/* Line Items */}
          <div className="table-wrap">
            <div className="tgrid th-row">
              <div>#</div>
              <div>Item</div>
              <div>Description</div>
              <div>Unit Cost</div>
              <div>Qty</div>
              <div>Amount</div>
            </div>

            {items.map(item => (
              <div key={item.id} className="tgrid tr">
                <div><div className="row-num">{item.id}</div></div>
                <div>
                  <div className="item-name">{item.name}</div>
                </div>
                <div>
                  <div className="item-desc">{item.desc}</div>
                </div>
                <div><span className="cell-val">₹{item.cost}</span></div>
                <div><span className="cell-val">{item.qty}</span></div>
                <div><span className="cell-total">₹{item.cost * item.qty}</span></div>
              </div>
            ))}
          </div>

          {/* Bank + Totals */}
          <div className="bottom-grid">
            <div className="bank-col">
              <div className="col-label">Bank Details</div>
              {[
                ["Bank Name", "ABC Bank"],
                ["Account Number", "7B2459739212"],
                ["IFSC Code", "ABCD0001345"],
                ["Payment Reference", "INV-20250220-001"],
              ].map(([k, v]) => (
                <div key={k} className="bank-item">
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>

            <div className="totals-col">
              <div className="col-label">Summary</div>
              <div className="total-line"><span>Subtotal</span><span>₹650</span></div>
              <div className="total-line"><span>CGST (9%)</span><span>₹18</span></div>
              <div className="total-line"><span>SGST (9%)</span><span>₹18</span></div>
              <div className="total-line discount">
                <span>Discount<span className="discount-badge">SAVE</span></span>
                <span>−₹36</span>
              </div>
              <div className="total-sep" />
              <div className="grand-line">
                <span className="grand-label">Total (USD)</span>
                <span className="grand-amount">₹650</span>
              </div>
              <div className="total-words-text">Dollar Six Hundred Fifty</div>
            </div>
          </div>

          {/* Terms + Signature */}
          <div className="card-footer">
            <div className="footer-block">
              <h4>Terms & Conditions</h4>
              <p>The payment must be returned in the same condition.</p>
            </div>
            <div className="footer-block">
              <h4>Notes</h4>
              <p>All charges are final and include applicable taxes, fees, and additional costs.</p>
            </div>
            <div className="sig-block">
              <div className="sig-script">Ted M. Davis</div>
              <div className="sig-name">Ted M. Davis</div>
              <div className="sig-role">Manager</div>
            </div>
          </div>

          {/* Actions */}
          <div className="action-row">
            <button className="act-btn act-btn-outline" onClick={() => window.print()}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a1 1 0 001 1h8a1 1 0 001-1v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1zm2 0h6v3H7V4zm-1 9H5v-2h1v2zm8 0h-1v-2h1v2zM7 14h6v2H7v-2z" clipRule="evenodd"/>
              </svg>
              Print
            </button>
            <button className="act-btn act-btn-fill">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              Download PDF
            </button>
          </div>

        </div>
      </div>
    </>
  );
}