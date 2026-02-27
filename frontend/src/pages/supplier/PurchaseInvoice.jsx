import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.pi { font-family: 'Plus Jakarta Sans', sans-serif; background: #f0f2f8; min-height: 100vh; padding: 20px; display: flex; flex-direction: column; gap: 18px; }
.pi-hd { background: #fff; border-radius: 16px; padding: 11px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; height: 64px; }
.pi-hd h2 { font-size: 18px; font-weight: 800; color: #0f172a; flex: 1; min-width: 220px; display: flex; align-items: center; gap: 10px; }
.hd-btns { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.btn-primary { background: linear-gradient(135deg,#6c63ff,#a78bfa); color: #fff; border: none; border-radius: 10px; padding: 10px 18px; font-family: 'Plus Jakarta Sans',sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; transition: all .18s; white-space: nowrap; box-shadow: 0 4px 14px rgba(108,99,255,0.38); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(108,99,255,0.48); }
.btn-outline { background: #fff; color: #374151; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 10px 16px; font-family: 'Plus Jakarta Sans',sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; transition: all .15s; white-space: nowrap; }
.btn-outline:hover { border-color: #6c63ff; background: #f5f4ff; color: #6c63ff; }
.auto-badge { display: inline-flex; align-items: center; gap: 7px; background: #f0faf4; border: 1.5px solid #b7eacb; color: #15803d; border-radius: 20px; padding: 7px 14px; font-size: 13px; font-weight: 700; }
.pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #16a34a; animation: pulse 1.5s infinite; flex-shrink: 0; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
.stat-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
@media(max-width:900px) { .stat-row { grid-template-columns: repeat(2,1fr); } }
.stat-card { background: #fff; border-radius: 16px; padding: 18px 18px 13px;display: flex; flex-direction: column; gap: 4px; position: relative; overflow: hidden; transition: box-shadow .2s, transform .15s; }
.stat-card:hover { box-shadow: 0 8px 24px rgba(108,99,255,.14); transform: translateY(-2px); }
.stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; }
.stat-card.purple::before { background: linear-gradient(90deg,#6c63ff,#a78bfa); }
.stat-card.blue::before   { background: linear-gradient(90deg,#3b9eff,#60c3ff); }
.stat-card.green::before  { background: linear-gradient(90deg,#00c896,#34d399); }
.stat-card.orange::before { background: linear-gradient(90deg,#f59e0b,#fbbf24); }
.stat-top { display: flex; align-items: flex-start; justify-content: space-between; }
.stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-icon.purple{background:#6c63ff} .stat-icon.blue{background:#3b9eff} .stat-icon.green{background:#00c896} .stat-icon.orange{background:#f59e0b}
.stat-badge-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.stat-badge { font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: 20px; display: flex; align-items: center; gap: 3px; }
.badge-up   { background: #dcfce7; color: #16a34a; }
.badge-down { background: #fee2e2; color: #dc2626; }
.badge-warn { background: #fef3c7; color: #b45309; }
.stat-days  { font-size: 12px; color: #9ca3af; }
.stat-label { font-size: 13px; color: #6b7280; font-weight: 600; margin-top: 10px; }
.stat-value { font-size: 26px; font-weight: 900; color: #0f172a; line-height: 1.1; }
.stat-chart { margin-top: 6px; height: 38px; }
.alerts-strip { display: flex; flex-direction: column; gap: 8px; }
.pi-alert { display: flex; align-items: flex-start; gap: 10px; padding: 12px 16px; border-radius: 12px; font-size: 13px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); animation: slideIn .3s ease; }
@keyframes slideIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
.pi-alert.warn {
  background: #fffbeb;
  border: 1.5px solid #fcd34d;
  color: #92400e;
  box-shadow: 0 4px 12px rgba(252, 211, 77, 0.35);
  margin-bottom: 10px;
}

.pi-alert.danger {
  background: #fff5f5;
  border: 1.5px solid #fca5a5;
  color: #b91c1c;
  box-shadow: 0 4px 12px rgba(252, 165, 165, 0.35);
  margin-bottom: 10px;
}

.pi-alert.info {
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  color: #1d4ed8;
  box-shadow: 0 4px 12px rgba(191, 219, 254, 0.35);
}

.alert-close { background: none; border: none; color: inherit; opacity: .45; cursor: pointer; font-size: 18px; padding: 0; margin-left: auto; line-height: 1; flex-shrink: 0; }
.alert-close:hover { opacity: 1; }
.alert-title { font-weight: 700; font-size: 13px; }
.alert-body  { font-size: 12px; opacity: .85; margin-top: 2px; }
.bottom-grid { display: grid; grid-template-columns: 1fr 430px; gap: 20px; align-items: stretch; }
@media(max-width:1200px) { .bottom-grid { grid-template-columns: 1fr; } }
.left-panel  { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.right-panel { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.left-panel  > .card:last-child { flex: 1; display: flex; flex-direction: column; }
.right-panel > .card:last-child { flex: 1; display: flex; flex-direction: column; }
.left-panel  > .card:last-child .table-scroll { flex: 1; max-height: none; }
.right-panel > .card:last-child .expiry-no-scroll { flex: 1; }
.card { background: #fff; border-radius: 16px; overflow: hidden; }
.card-hd { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding: 16px 20px; border-bottom: 1px solid #f0f2f8; flex-shrink: 0; }
.card-title { font-size: 16px; font-weight: 800; color: #0f172a; }
.sel { background: #f9fafb; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 6px 11px; font-family: 'Plus Jakarta Sans',sans-serif; font-size: 13px; font-weight: 600; color: #374151; cursor: pointer; outline: none; }
.sel:focus { border-color: #6c63ff; }
.chart-counters { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 16px; }
.ctr-box { background: #f9fafb; border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; }
.ctr-lbl { font-size: 12px; font-weight: 600; color: #6b7280; display: flex; align-items: center; gap: 6px; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-purple{background:#6c63ff} .dot-green{background:#00c896} .dot-orange{background:#f59e0b}
.ctr-val { font-size: 22px; font-weight: 900; color: #0f172a; }
.chart-area { height: 200px; }
.custom-tooltip { background: #1e293b; color: #fff; border-radius: 8px; padding: 8px 12px; font-size: 12px; font-family: 'Plus Jakarta Sans',sans-serif; box-shadow: 0 4px 14px rgba(0,0,0,.2); }
.search-box { background: #f9fafb; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-family: 'Plus Jakarta Sans',sans-serif; font-size: 13px; color: #374151; outline: none; transition: border-color .15s; min-width: 0; flex: 1; max-width: 210px; }
.search-box:focus { border-color: #6c63ff; }
.search-box::placeholder { color: #b0bcd4; }
.table-scroll { overflow-x: auto; overflow-y: auto; -webkit-overflow-scrolling: touch; }
.table-scroll::-webkit-scrollbar { height: 5px; width: 5px; }
.table-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
.pi-table { width: 100%; border-collapse: collapse; min-width: 620px; }
.pi-table thead { position: sticky; top: 0; z-index: 2; background: #f8faff; }
.pi-table th { padding: 11px 13px; border-bottom: 2px solid #f0f2f8; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .6px; text-align: left; white-space: nowrap; }
.pi-table td { padding: 12px 13px; border-bottom: 1px solid #f5f7fc; color: #374151; font-size: 13px; vertical-align: middle; white-space: nowrap; }
.pi-table tbody tr:last-child td { border-bottom: none; }
.pi-table tbody tr:hover td { background: #fafbff; }
.td-mono { font-family: monospace; font-size: 12px; font-weight: 600; color: #1e293b; }
.td-sub  { font-size: 11px; color: #9ca3af; margin-top: 2px; }
.status-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; }
.badge-verified { background: #f0faf4; color: #15803d; border: 1px solid #bbf7d0; }
.badge-pending  { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.badge-dup      { background: #fff5f5; color: #b91c1c; border: 1px solid #fecaca; }
.act-btn { background: #f8faff; border: 1px solid #e4e9f2; color: #6b7280; padding: 5px 11px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: 'Plus Jakarta Sans',sans-serif; margin-right: 4px; white-space: nowrap; }
.act-btn:hover { background: #ebf3ff; color: #6c63ff; border-color: #c3d9ff; }
.exp-critical { color: #dc2626; font-weight: 700; }
.exp-mid      { color: #b45309; }
.exp-safe     { color: #16a34a; }
.pagination { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-top: 1px solid #f0f2f8; font-size: 13px; color: #9ca3af; background: #f8faff; flex-wrap: wrap; gap: 6px; flex-shrink: 0; }
.pag-btn { background: #fff; border: 1px solid #e4e9f2; color: #6b7280; padding: 5px 11px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; margin: 0 2px; transition: all .15s; font-family: 'Plus Jakarta Sans',sans-serif; }
.pag-btn:hover, .pag-btn.active { background: #6c63ff; color: #fff; border-color: #6c63ff; }
.pag-btn:disabled { opacity: .35; cursor: not-allowed; }
.form-lbl { display: block; font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: .7px; text-transform: uppercase; margin-bottom: 5px; }
.form-inp { width: 100%; background: #f9fafb; border: 1.5px solid #e5e7eb; border-radius: 9px; padding: 9px 12px; font-family: 'Plus Jakarta Sans',sans-serif; font-size: 13px; color: #374151; outline: none; transition: border-color .15s, box-shadow .15s; -webkit-appearance: none; }
.form-inp:focus { border-color: #6c63ff; box-shadow: 0 0 0 3px rgba(108,99,255,.09); }
.form-inp::placeholder { color: #c0ccde; }
.form-inp.danger { border-color: #f87171; }
.form-summary { background: #f8faff; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 14px 16px; margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sum-lbl { font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: .7px; text-transform: uppercase; margin-bottom: 3px; }
.sum-val { font-size: 18px; font-weight: 900; }
.sv-purple{color:#6c63ff} .sv-green{color:#059669} .sv-orange{color:#b45309} .sv-teal{color:#0891b2}
.med-wrap { margin-top: 8px; overflow-x: auto; overflow-y: visible; -webkit-overflow-scrolling: touch; }
.med-wrap::-webkit-scrollbar { height: 4px; }
.med-wrap::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
.med-inner { border: 1.5px solid #e5e7eb; border-radius: 10px; overflow: hidden; min-width: 580px; }
.med-tbl { width: 100%; border-collapse: collapse; }
.med-tbl thead tr { background: #f8faff; }
.med-tbl th { padding: 10px 8px; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .6px; border-bottom: 1px solid #e5e7eb; text-align: left; white-space: nowrap; }
.med-tbl td { padding: 7px 5px; border-bottom: 1px solid #f5f5f5; vertical-align: middle; }
.med-tbl tbody tr:last-child td { border-bottom: none; }
.med-tbl tbody tr:hover td { background: #fafbff; }
.med-inp { background: transparent; border: 1px solid transparent; border-radius: 6px; padding: 5px 7px; color: #374151; font-family: 'Plus Jakarta Sans',sans-serif; font-size: 12px; width: 100%; outline: none; transition: all .12s; }
.med-inp:focus { background: #f0f4ff; border-color: #6c63ff; }
.med-inp::placeholder { color: #c8d0dc; }
select.med-inp { background: #f9fafb; }
.del-btn { background: none; border: none; color: #ef4444; opacity: .4; cursor: pointer; font-size: 14px; transition: opacity .15s; padding: 2px; }
.del-btn:hover { opacity: 1; }
.exp-warn  { color: #b45309; font-size: 11px; font-weight: 700; margin-top: 2px; white-space: nowrap; }
.exp-ok    { color: #15803d; font-size: 11px; font-weight: 700; margin-top: 2px; white-space: nowrap; }
.rate-warn { color: #b91c1c; font-size: 11px; font-weight: 700; margin-top: 2px; white-space: nowrap; }
.expiry-no-scroll { overflow-x: auto; overflow-y: visible; }
.expiry-no-scroll::-webkit-scrollbar { height: 4px; }
.expiry-no-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
@media(max-width:600px) {
  .pi { padding: 12px; }
  .pi-hd h2 { font-size: 17px; }
  .card-title { font-size: 14px; }
  .ctr-val { font-size: 18px; }
  .stat-value { font-size: 20px; }
  .bottom-grid { gap: 12px; }
  .form-summary { grid-template-columns: 1fr 1fr; }
}
@media(max-width:380px) {
  .hd-btns .auto-badge { display: none; }
  .form-summary { grid-template-columns: 1fr; }
}
`;

/* ── 8 GRN entries ── */
const GRN_DATA = [
  { inv:"INV-2024-0923", supplier:"Medline Pharma Ltd",    gstin:"27ABCDE1234F1Z5", invDate:"20 Feb 2026", grnDate:"21 Feb 2026", qty:480,  amount:"₹38,450",   gst:"₹3,422",  status:"Verified", dup:false },
  { inv:"INV-2024-0891", supplier:"Ranbaxy Distributors",  gstin:"07FGHIJ5678K2Z3", invDate:"18 Feb 2026", grnDate:"19 Feb 2026", qty:1200, amount:"₹1,12,000", gst:"₹10,180", status:"Pending",  dup:true  },
  { inv:"INV-2024-0867", supplier:"Sun Pharma Ltd",        gstin:"33KLMNO9012P3Z7", invDate:"15 Feb 2026", grnDate:"15 Feb 2026", qty:300,  amount:"₹22,800",   gst:"₹2,052",  status:"Verified", dup:false },
  { inv:"INV-2024-0844", supplier:"Cipla Healthcare",      gstin:"19PQRST3456Q4Z1", invDate:"12 Feb 2026", grnDate:"13 Feb 2026", qty:750,  amount:"₹67,350",   gst:"₹6,061",  status:"Verified", dup:false },
  { inv:"INV-2024-0820", supplier:"Zydus Cadila",          gstin:"24UVWXY7890R5Z9", invDate:"08 Feb 2026", grnDate:"09 Feb 2026", qty:560,  amount:"₹44,800",   gst:"₹4,032",  status:"Pending",  dup:false },
  { inv:"INV-2024-0798", supplier:"Dr. Reddy's Labs",      gstin:"36AABCD2345E6Z2", invDate:"05 Feb 2026", grnDate:"06 Feb 2026", qty:920,  amount:"₹83,100",   gst:"₹7,479",  status:"Verified", dup:false },
  { inv:"INV-2024-0775", supplier:"Abbott Healthcare",     gstin:"12EFGHI6789J7Z8", invDate:"02 Feb 2026", grnDate:"03 Feb 2026", qty:410,  amount:"₹31,250",   gst:"₹2,812",  status:"Pending",  dup:false },
  { inv:"INV-2024-0751", supplier:"Lupin Pharmaceuticals", gstin:"29JKLMN1234K8Z4", invDate:"28 Jan 2026", grnDate:"29 Jan 2026", qty:680,  amount:"₹57,600",   gst:"₹5,184",  status:"Verified", dup:false },
];

const PER_PAGE = 8;

const EXPIRY_DATA = [
  { name:"Ceftriaxone 1g Inj", batch:"C-1102", supplier:"Medline Pharma",   expiry:"Mar 2026", days:"18 days",  sev:"critical", qty:24  },
  { name:"Amoxicillin 250mg",  batch:"B-229",  supplier:"Medline Pharma",   expiry:"Jul 2026", days:"5 months", sev:"mid",      qty:50  },
  { name:"Paracetamol 500mg",  batch:"P-4481", supplier:"Cipla Healthcare", expiry:"Aug 2026", days:"6 months", sev:"mid",      qty:200 },
  { name:"Azithromycin 500mg", batch:"A-9923", supplier:"Ranbaxy Dist.",    expiry:"Sep 2026", days:"7 months", sev:"safe",     qty:80  },
];

const CHART_DATA = [
  {name:"Jan",purchase:320,gst:28},{name:"Feb",purchase:480,gst:43},
  {name:"Mar",purchase:410,gst:37},{name:"Apr",purchase:520,gst:47},
  {name:"May",purchase:390,gst:35},{name:"Jun",purchase:610,gst:55},
  {name:"Jul",purchase:450,gst:41},{name:"Aug",purchase:580,gst:52},
  {name:"Sep",purchase:430,gst:39},{name:"Oct",purchase:500,gst:45},
  {name:"Nov",purchase:470,gst:42},{name:"Dec",purchase:540,gst:49},
];

const EXISTING = ["INV-2024-0891","INV-2024-0844","INV-2024-0720"];
const mkSpark = arr => arr.map((v,i)=>({i,v}));
const pSpark  = mkSpark([280,310,290,320,300,340,310,360,340,380,360,400]);
const gSpark  = mkSpark([28,31,29,32,30,34,31,36,34,38,36,40]);
const sSpark  = mkSpark([8,9,9,10,10,11,11,12,12,13,13,14]);
const eSpark  = mkSpark([2,3,3,4,5,6,6,7,8,9,9,10]);

const IcoDoc  = () => <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>;
const IcoGst  = () => <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
const IcoSup  = () => <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IcoClock= () => <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Plus    = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const Check   = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;
const ListIco = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/></svg>;

function Spark({ data, color, type }) {
  if (type === "bar") return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barSize={4}><Bar dataKey="v" fill={color} radius={[2,2,0,0]}/></BarChart>
    </ResponsiveContainer>
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}><Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false}/></LineChart>
    </ResponsiveContainer>
  );
}

function CTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div style={{fontWeight:700,marginBottom:3}}>{label}</div>
      {payload.map((p,i)=><div key={i} style={{color:p.color}}>{p.name}: ₹{p.value}K</div>)}
    </div>
  );
}

function Alert({ type, title, body, onClose }) {
  return (
    <div className={`pi-alert ${type}`}>
      <div style={{fontSize:16,flexShrink:0}}>{type==="warn"?"⚠️":type==="danger"?"🔴":"💡"}</div>
      <div style={{flex:1,minWidth:0}}>
        <div className="alert-title">{title}</div>
        <div className="alert-body">{body}</div>
      </div>
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  );
}

function EntryForm() {
  const [invNo, setInvNo]     = useState("");
  const [showDup, setShowDup] = useState(false);
  const [rows, setRows] = useState([
    {id:1,name:"Paracetamol 500mg",batch:"P-4481",expiry:"2027-03",mrp:"12.50",rate:"8.40", qty:"100",gst:"18"},
    {id:2,name:"Amoxicillin 250mg",batch:"B-229", expiry:"2026-07",mrp:"45.00",rate:"32.00",qty:"50", gst:"12"},
    {id:3,name:"Cetirizine 10mg",  batch:"C-881", expiry:"2026-09",mrp:"22.00",rate:"15.00",qty:"80", gst:"5" },
  ]);

  const handleInv = v => { setInvNo(v); setShowDup(EXISTING.includes(v.trim())); };
  const addRow    = () => setRows(p=>[...p,{id:Date.now(),name:"",batch:"",expiry:"",mrp:"",rate:"",qty:"",gst:"5"}]);
  const delRow    = id => setRows(p=>p.filter(r=>r.id!==id));
  const upRow     = (id,k,v) => setRows(p=>p.map(r=>r.id===id?{...r,[k]:v}:r));

  const months = exp => {
    if (!exp) return null;
    const d = new Date(exp+"-01"), n = new Date();
    return (d.getFullYear()-n.getFullYear())*12+(d.getMonth()-n.getMonth());
  };

  const gstAmt   = r => (parseFloat(r.rate)||0)*(parseFloat(r.qty)||0)*(parseFloat(r.gst)||0)/100;
  const total    = r => (parseFloat(r.rate)||0)*(parseFloat(r.qty)||0)+gstAmt(r);
  const subtotal = rows.reduce((s,r)=>s+(parseFloat(r.rate)||0)*(parseFloat(r.qty)||0),0);
  const gstTotal = rows.reduce((s,r)=>s+gstAmt(r),0);
  const grand    = subtotal+gstTotal;

  return (
    <div className="card box_shadow">
      <div className="card-hd">
        <div className="card-title">New GRN Entry</div>
        <div className="auto-badge" style={{fontSize:12,padding:"5px 12px"}}>
          <div className="pulse-dot"/>Auto Stock Update
        </div>
      </div>
      <div style={{padding:"16px 18px"}}>
        {showDup && (
          <div style={{marginBottom:12}}>
            <Alert type="danger" title="Duplicate Invoice!" body="This invoice number already exists in the system." onClose={()=>setShowDup(false)}/>
          </div>
        )}
        <div style={{marginBottom:10}}>
          <label className="form-lbl">Supplier *</label>
          <select className="form-inp">
            <option value="">— Select Supplier —</option>
            <option>Medline Pharma Ltd</option><option>Ranbaxy Distributors</option>
            <option>Sun Pharma Ltd</option><option>Cipla Healthcare</option><option>Zydus Cadila</option>
          </select>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <div>
            <label className="form-lbl">Invoice No *</label>
            <input className={`form-inp${showDup?" danger":""}`} placeholder="INV-2024-XXXX"
              value={invNo} onChange={e=>handleInv(e.target.value)}/>
          </div>
          <div>
            <label className="form-lbl">Invoice Date *</label>
            <input type="date" className="form-inp" defaultValue="2026-02-25"/>
          </div>
          <div>
            <label className="form-lbl">GRN Date *</label>
            <input type="date" className="form-inp" defaultValue="2026-02-25"/>
          </div>
          <div>
            <label className="form-lbl">Payment Terms</label>
            <select className="form-inp">
              <option>Net 30 Days</option><option>Net 15</option><option>Immediate</option>
            </select>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:12,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:".8px"}}>Medicines</span>
          <button className="btn-outline" style={{padding:"6px 12px",fontSize:12}} onClick={addRow}>
            <Plus/> Add Medicine
          </button>
        </div>
        <div className="med-wrap">
          <div className="med-inner">
            <table className="med-tbl">
              <thead>
                <tr>
                  <th style={{minWidth:130}}>Medicine</th>
                  <th style={{minWidth:72}}>Batch</th>
                  <th style={{minWidth:132}}>Expiry</th>
                  <th style={{minWidth:62}}>MRP ₹</th>
                  <th style={{minWidth:62}}>Rate ₹</th>
                  <th style={{minWidth:52}}>Qty</th>
                  <th style={{minWidth:64}}>GST %</th>
                  <th style={{minWidth:72}}>Total</th>
                  <th style={{minWidth:30}}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r=>{
                  const m = months(r.expiry);
                  const rN=parseFloat(r.rate)||0, mN=parseFloat(r.mrp)||0;
                  const mismatch = rN>0&&mN>0&&rN>mN;
                  return (
                    <tr key={r.id}>
                      <td><input className="med-inp" placeholder="Medicine name" value={r.name} onChange={e=>upRow(r.id,"name",e.target.value)} style={{width:120}}/></td>
                      <td><input className="med-inp" placeholder="B001" value={r.batch} onChange={e=>upRow(r.id,"batch",e.target.value)} style={{width:62}}/></td>
                      <td>
                        <input type="month" className="med-inp" value={r.expiry} onChange={e=>upRow(r.id,"expiry",e.target.value)} style={{width:120}}/>
                        {m!==null&&<div className={m<=6?"exp-warn":"exp-ok"}>{m<=3?`⚠ ${m}mo – Critical!`:m<=6?`⚠ ${m}mo – Warning`:`✓ ${m}mo`}</div>}
                      </td>
                      <td><input className="med-inp" type="number" value={r.mrp} onChange={e=>upRow(r.id,"mrp",e.target.value)} style={{width:56}}/></td>
                      <td>
                        <input className="med-inp" type="number" value={r.rate} onChange={e=>upRow(r.id,"rate",e.target.value)}
                          style={{width:56,borderColor:mismatch?"#f87171":"transparent",background:mismatch?"#fff5f5":"transparent"}}/>
                        {mismatch&&<div className="rate-warn">⚠ &gt; MRP!</div>}
                      </td>
                      <td><input className="med-inp" type="number" value={r.qty} onChange={e=>upRow(r.id,"qty",e.target.value)} style={{width:46}}/></td>
                      <td>
                        <select className="med-inp" value={r.gst} onChange={e=>upRow(r.id,"gst",e.target.value)} style={{width:56}}>
                          <option value="5">5%</option><option value="12">12%</option>
                          <option value="18">18%</option><option value="28">28%</option>
                        </select>
                      </td>
                      <td><span style={{fontSize:12,fontWeight:700,color:"#6c63ff"}}>₹{total(r).toFixed(0)}</span></td>
                      <td><button className="del-btn" onClick={()=>delRow(r.id)}>✕</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="form-summary">
          <div><div className="sum-lbl">Subtotal</div><div className="sum-val sv-purple">₹{subtotal.toFixed(0)}</div></div>
          <div><div className="sum-lbl">GST Amount</div><div className="sum-val sv-teal">₹{gstTotal.toFixed(0)}</div></div>
          <div><div className="sum-lbl">Discount</div><div className="sum-val sv-orange">— ₹0</div></div>
          <div><div className="sum-lbl">Total Payable</div><div className="sum-val sv-green">₹{grand.toFixed(0)}</div></div>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:14,flexWrap:"wrap"}}>
          <button className="btn-outline" style={{padding:"8px 14px",fontSize:13}}>Save Draft</button>
          <button className="btn-primary" style={{padding:"8px 16px",fontSize:13}}>
            <Check/> Save &amp; Update Stock
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PurchaseInvoice() {
  const [period,       setPeriod]       = useState("Monthly");
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page,         setPage]         = useState(1);
  const [alerts, setAlerts] = useState([
    {type:"warn",   title:"Expiry Warning",         body:"3 medicines from Medline Pharma expire within 6 months."},
    {type:"danger", title:"Duplicate Invoice Alert", body:"INV-2024-0891 from Ranbaxy Distributors was already entered on Feb 12, 2026."},
    {type:"info",   title:"Rate Mismatch",           body:"Atorvastatin 10mg current rate ₹4.20 vs last purchase ₹3.85 (+9.1%)."},
  ]);

  /* filtering */
  const filtered = GRN_DATA.filter(r => {
    const ms = search === "" ||
      r.inv.toLowerCase().includes(search.toLowerCase()) ||
      r.supplier.toLowerCase().includes(search.toLowerCase());
    const mf =
      statusFilter === "All Status" ||
      (statusFilter === "Verified"  && r.status === "Verified" && !r.dup) ||
      (statusFilter === "Pending"   && r.status === "Pending") ||
      (statusFilter === "Duplicate" && r.dup);
    return ms && mf;
  });

  /* pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const pageRows   = filtered.slice((safePage-1)*PER_PAGE, safePage*PER_PAGE);
  const startEntry = filtered.length ? (safePage-1)*PER_PAGE+1 : 0;
  const endEntry   = Math.min(safePage*PER_PAGE, filtered.length);
  const goPage     = p => { if (p>=1 && p<=totalPages) setPage(p); };
  const pageNums   = Array.from({length:totalPages}, (_,i) => i+1);

  const STATS = [
    {label:"Total Purchase",   value:"₹4.82L",  badge:"+12.4%", up:true,  color:"purple", spark:pSpark, sparkType:"bar",  sparkColor:"#6c63ff", icon:<IcoDoc/>},
    {label:"GST Paid (Month)", value:"₹43,218", badge:"+8.2%",  up:true,  color:"blue",   spark:gSpark, sparkType:"line", sparkColor:"#3b9eff", icon:<IcoGst/>},
    {label:"Active Suppliers", value:"14",       badge:"+2",     up:true,  color:"green",  spark:sSpark, sparkType:"bar",  sparkColor:"#00c896", icon:<IcoSup/>},
    {label:"Expiring in 6M",   value:"18 SKUs",  badge:"Action", up:false, color:"orange", spark:eSpark, sparkType:"line", sparkColor:"#f59e0b", icon:<IcoClock/>},
  ];

  return (
    <>
      <style>{css}</style>
      <div className="pi">

        {/* HEADER */}
        <div className="pi-hd box_shadow">
          <h2>🧾 Purchase Invoice (GRN)</h2>
          <div className="hd-btns">
            <div className="auto-badge"><div className="pulse-dot"/>Auto Stock Update ON</div>
            <button className="btn-outline"><ListIco/> GRN List</button>
            <button className="btn-primary"><Plus/> New GRN Entry</button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="stat-row">
          {STATS.map((s,i)=>(
            <div className={`stat-card box_shadow ${s.color}`} key={i}>
              <div className="stat-top">
                <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                <div className="stat-badge-wrap">
                  <div className={`stat-badge ${s.up?"badge-up":s.color==="orange"?"badge-warn":"badge-down"}`}>
                    {s.up?"▲":"⚠"} {s.badge}
                  </div>
                  <div className="stat-days">This Month</div>
                </div>
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-chart"><Spark data={s.spark} color={s.sparkColor} type={s.sparkType}/></div>
            </div>
          ))}
        </div>

        {/* ALERTS */}
        {alerts.length > 0 && (
          <div className="alerts-strip ">
            {alerts.map((a,i)=>(
              <Alert key={i} {...a} onClose={()=>setAlerts(p=>p.filter((_,j)=>j!==i))}/>
            ))}
          </div>
        )}

        {/* BOTTOM GRID */}
        <div className="bottom-grid">

          {/* LEFT */}
          <div className="left-panel">

            {/* Analytics chart */}
            <div className="card box_shadow">
              <div className="card-hd">
                <div className="card-title">Purchase Analytics</div>
                <select className="sel" value={period} onChange={e=>setPeriod(e.target.value)}>
                  <option>Daily</option><option>Weekly</option><option>Monthly</option><option>Yearly</option>
                </select>
              </div>
              <div style={{padding:"16px 18px 14px"}}>
                <div className="chart-counters">
                  <div className="ctr-box"><div className="ctr-lbl"><span className="dot dot-purple"/>Total Purchase</div><div className="ctr-val">₹48.2L</div></div>
                  <div className="ctr-box"><div className="ctr-lbl"><span className="dot dot-green"/>GST Paid</div><div className="ctr-val">₹4.34L</div></div>
                  <div className="ctr-box"><div className="ctr-lbl"><span className="dot dot-orange"/>Invoices</div><div className="ctr-val">28</div></div>
                </div>
                <div className="chart-area">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CHART_DATA} barGap={4} barSize={14}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false}/>
                      <XAxis dataKey="name" tick={{fontSize:11,fill:"#9ca3af",fontFamily:"Plus Jakarta Sans"}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:11,fill:"#9ca3af",fontFamily:"Plus Jakarta Sans"}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v}K`}/>
                      <Tooltip content={<CTip/>}/>
                      <Bar dataKey="purchase" name="Purchase" fill="#6c63ff" radius={[4,4,0,0]}/>
                      <Bar dataKey="gst"      name="GST"      fill="#00c896" radius={[4,4,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* GRN Invoice List — 8 rows, live search + status filter + real pagination */}
            <div className="card box_shadow">
              <div className="card-hd">
                <div className="card-title">GRN Invoice List</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                  <input
                    className="search-box"
                    placeholder="Search invoice…"
                    value={search}
                    onChange={e=>{ setSearch(e.target.value); setPage(1); }}
                  />
                  <select className="sel" value={statusFilter}
                    onChange={e=>{ setStatusFilter(e.target.value); setPage(1); }}>
                    <option>All Status</option>
                    <option>Verified</option>
                    <option>Pending</option>
                    <option>Duplicate</option>
                  </select>
                </div>
              </div>

              <div className="table-scroll">
                <table className="pi-table">
                  <thead>
                    <tr>
                      <th>Invoice No</th><th>Supplier</th>
                      <th>Inv Date</th><th>GRN Date</th>
                      <th>Qty</th><th>Amount</th><th>GST</th>
                      <th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{textAlign:"center",padding:"32px 0",color:"#9ca3af",fontSize:13}}>
                          No invoices found.
                        </td>
                      </tr>
                    ) : pageRows.map((r,i)=>(
                      <tr key={i}>
                        <td>
                          <span className="td-mono">{r.inv}</span>
                          {r.dup&&<div style={{color:"#dc2626",fontSize:10,fontWeight:700,marginTop:2}}>⚠ DUPLICATE</div>}
                        </td>
                        <td>
                          <div style={{fontWeight:600}}>{r.supplier}</div>
                          <div className="td-sub">{r.gstin}</div>
                        </td>
                        <td className="td-mono">{r.invDate}</td>
                        <td className="td-mono">{r.grnDate}</td>
                        <td className="td-mono">{r.qty.toLocaleString()}</td>
                        <td className="td-mono" style={{fontWeight:700,color:"#0f172a"}}>{r.amount}</td>
                        <td className="td-mono">{r.gst}</td>
                        <td>
                          <span className={`status-badge ${r.dup?"badge-dup":r.status==="Verified"?"badge-verified":"badge-pending"}`}>
                            ● {r.dup?"Duplicate":r.status}
                          </span>
                        </td>
                        <td>
                          <button className="act-btn">View</button>
                          <button className="act-btn">{r.status==="Verified"?"Print":"Edit"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <span>
                  {filtered.length === 0
                    ? "No entries"
                    : `Showing ${startEntry}–${endEntry} of ${filtered.length} entries`}
                </span>
                <div style={{display:"flex",alignItems:"center",gap:2}}>
                  <button className="pag-btn" onClick={()=>goPage(safePage-1)} disabled={safePage===1}>‹</button>
                  {pageNums.map(p=>(
                    <button key={p} className={`pag-btn${p===safePage?" active":""}`}
                      onClick={()=>goPage(p)}>{p}</button>
                  ))}
                  <button className="pag-btn" onClick={()=>goPage(safePage+1)} disabled={safePage===totalPages}>›</button>
                </div>
              </div>
            </div>

          </div>{/* /left-panel */}

          {/* RIGHT */}
          <div className="right-panel">

            <EntryForm/>

            <div className="card box_shadow">
              <div className="card-hd">
                <div className="card-title">⚠ Expiring Stock</div>
                <span style={{fontSize:12,color:"#6c63ff",fontWeight:700,background:"#f0f0ff",padding:"4px 12px",borderRadius:20,whiteSpace:"nowrap"}}>
                  18 SKUs at risk
                </span>
              </div>
              <div className="expiry-no-scroll">
                <table className="pi-table" style={{minWidth:380}}>
                  <thead>
                    <tr>
                      <th>Medicine</th><th>Supplier</th><th>Expiry</th><th>Qty</th><th>Days Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXPIRY_DATA.map((r,i)=>(
                      <tr key={i}>
                        <td>
                          <div style={{fontWeight:700,fontSize:13,color:"#0f172a"}}>{r.name}</div>
                          <div className="td-sub">{r.batch}</div>
                        </td>
                        <td style={{fontSize:12,color:"#6b7280"}}>{r.supplier}</td>
                        <td><span className={r.sev==="critical"?"exp-critical":r.sev==="mid"?"exp-mid":"exp-safe"}>{r.expiry}</span></td>
                        <td className="td-mono">{r.qty}</td>
                        <td>
                          <span className={`status-badge ${r.sev==="critical"?"badge-dup":r.sev==="mid"?"badge-pending":"badge-verified"}`}>
                            {r.days}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>{/* /right-panel */}

        </div>{/* /bottom-grid */}
      </div>
    </>
  );
}