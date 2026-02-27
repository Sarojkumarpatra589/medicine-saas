import { useState, useEffect } from "react";

/* ── EXISTING SUPPLIERS (for dupe check) ─────────────────────── */
const EXISTING = [
  { name: "Apex Pharma", gst: "27AGPT1234L1ZZ" },
  { name: "Medico Supplies", gst: "24BGH1567TRX2" },
  { name: "HealthFirst Pharma", gst: "07CGHP2341K1ZT" },
];

const STATES = [
  "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Odisha","Punjab","Rajasthan","Tamil Nadu",
  "Telangana","Uttar Pradesh","Uttarakhand","West Bengal",
];

const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const TABS = [
  { id: "basic",    icon: "👤", label: "Basic Info",       desc: "Contact & address" },
  { id: "legal",    icon: "⚖️", label: "Legal & GST",      desc: "Compliance details" },
  { id: "business", icon: "💼", label: "Business Terms",   desc: "Payment & credit" },
];

/* ── STYLES ──────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #4f46e5;
    --primary-light: #eef2ff;
    --primary-dark: #3730a3;
    --surface: #ffffff;
    --bg: #f0f2f5;
    --border: #e8eaf0;
    --text: #1e1b4b;
    --muted: #6b7280;
    --danger: #ef4444;
    --success: #10b981;
    --warn-bg: #fffbeb;
    --warn-border: #f59e0b;
    --radius: 16px;
    --radius-sm: 10px;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(79,70,229,0.05);
    --shadow-hover: 0 4px 12px rgba(0,0,0,0.08), 0 12px 32px rgba(79,70,229,0.1);
  }

  .pg {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
    font-size: 16px;
  }

  /* ── TOP HEADER CARD — title + actions ── */
  .dash-header {
    background: var(--surface);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 11px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 10px;
    box-shadow: var(--shadow);
  }
  .dash-header-title {
    font-size: 18px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.4px;
  }

  /* ── SUB TOOLBAR BAR — step pills only, inside left column ── */
  .sub-toolbar {
    background: var(--surface);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    box-shadow: var(--shadow);
  }
  .sub-toolbar-left  { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .sub-toolbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

  .dh-btn-primary {
    background: var(--primary); color: #fff; border: none;
    border-radius: 10px; padding: 10px 20px;
    font-family: inherit; font-size: 14px; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; gap: 7px;
    box-shadow: 0 4px 12px rgba(79,70,229,0.32);
    transition: opacity .18s, transform .15s;
    white-space: nowrap;
  }
  .dh-btn-primary:hover { opacity: .88; transform: translateY(-1px); }
  .dh-btn-outline {
    background: #fff; color: #374151;
    border: 1.5px solid var(--border);
    border-radius: 10px; padding: 10px 18px;
    font-family:'Inter', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; display: flex; align-items: center; gap: 7px;
    transition: border-color .18s, color .18s;
    white-space: nowrap;
  }
  .dh-btn-outline:hover { border-color: var(--primary); color: var(--primary); }

  /* ── PAGE WRAPPER ── */
  .page-wrap {
    max-width: 1120px;
    margin: 0 auto;
    padding: 24px 20px 60px;
  }

  /* ── STEP PILLS ── */
  .step-pills {
    display: flex;
    gap: 150px;
    background: #f0f2f5;
    border: 1px solid var(--border);
    padding: 4px;
    border-radius: 12px;
  }
  .step-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 14px; border-radius: 9px;
    cursor: pointer; font-size: 13.5px; font-weight: 600;
    color: var(--muted); background: transparent;
    border: none; font-family: inherit;
    transition: all .22s ease; white-space: nowrap;
  }
  .step-pill:hover { background: var(--primary-light); color: var(--primary); }
  .step-pill.active {
    background: var(--primary); color: #fff;
    box-shadow: 0 4px 12px rgba(79,70,229,0.35);
  }
  .step-pill-num {
    width: 20px; height: 20px; border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
  }
  .step-pill:not(.active) .step-pill-num {
    background: var(--border); color: var(--muted);
  }

  /* ── MAIN LAYOUT ── */
  .main-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    align-items: start;
  }
  @media(max-width: 900px) { .main-layout { grid-template-columns: 1fr; } }

  /* ── SECTION CARD ── */
  .s-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 16px;
    box-shadow: var(--shadow);
    animation: fadeUp .3s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .s-card-head {
    display: flex; align-items: center; gap: 14px;
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(to right, #fafbff, #fff);
  }
  .s-card-ico {
    width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .s-card-head h3 { font-size: 16px; font-weight: 700; color: var(--text); }
  .s-card-head p  { font-size: 13.5px; color: var(--muted); margin-top: 2px; }
  .s-card-body { padding: 24px; }

  /* ── FORM GRID ── */
  .fg2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .fg3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; }
  .fspan2 { grid-column: span 2; }
  .fspan3 { grid-column: span 3; }
  @media(max-width:700px) {
    .fg2, .fg3 { grid-template-columns: 1fr; }
    .fspan2, .fspan3 { grid-column: span 1; }
  }

  /* ── FIELD ── */
  .field { display: flex; flex-direction: column; gap: 7px; }
  .field-lbl {
    font-size: 14px; font-weight: 700; color: #1f2937;
    display: flex; align-items: center; gap: 5px;
  }
  .req { color: var(--danger); font-size: 15px; line-height: 1; }
  .opt-tag {
    font-size: 12px; color: var(--muted); font-weight: 500;
    background: #f3f4f6; padding: 2px 8px; border-radius: 20px;
  }

  /* ── INPUT ── */
  .fi-wrap { position: relative; }
  .fi, .fs, .fta {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 15px;
    font-family: inherit; font-size: 15px;
    color: var(--text); background: #fff;
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
    -webkit-appearance: none;
  }
  .fi:focus, .fs:focus, .fta:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.12);
    background: #fafbff;
  }
  .fi:hover:not(:focus), .fs:hover:not(:focus), .fta:hover:not(:focus) {
    border-color: #c7d2fe;
  }
  .fi.ferr { border-color: var(--danger); }
  .fi.ferr:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }
  .fi.fok  { border-color: var(--success); }
  .fi.fok:focus  { box-shadow: 0 0 0 3px rgba(16,185,129,0.12); }
  .fta { resize: vertical; min-height: 80px; }
  .fs  { cursor: pointer; }

  .fi-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 16px; pointer-events: none; }
  .fi-suf  { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--muted); font-weight: 600; pointer-events: none; }
  .fi-with-icon { padding-left: 40px !important; }
  .fi-with-suf  { padding-right: 54px !important; }
  .fi-status { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); font-size: 16px; }

  .fmsg { font-size: 13px; display: flex; align-items: center; gap: 5px; font-weight: 500; }
  .fmsg.err  { color: var(--danger); }
  .fmsg.ok   { color: var(--success); }
  .fmsg.hint { color: var(--muted); font-weight: 400; }

  /* ── CARD FOOTER (nav buttons) ── */
  .s-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-top: 1px solid var(--border);
    background: linear-gradient(to right, #fafbff, #fff);
  }
  .s-card-footer.end { justify-content: flex-end; }

  /* ── DIVIDER ── */
  .fdiv { border: 0; border-top: 1px solid var(--border); margin: 20px 0; }
  .fdiv-label {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .8px; color: var(--muted); margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .fdiv-label::after { content:''; flex:1; height:1px; background: var(--border); }

  /* ── PAYMENT TOGGLE ── */
  .pay-toggle { display: flex; background: var(--bg); border-radius: var(--radius-sm); padding: 4px; gap: 4px; border: 1px solid var(--border); }
  .pay-opt {
    flex: 1; padding: 11px 14px; border-radius: 8px;
    border: none; background: transparent;
    font-family: inherit; font-size: 15px; font-weight: 600;
    color: var(--muted); cursor: pointer; text-align: center;
    transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 7px;
  }
  .pay-opt.on { background: #fff; color: var(--primary); box-shadow: 0 1px 4px rgba(0,0,0,0.1); }

  /* ── BANK TOGGLE ── */
  .bank-row {
    display: flex; align-items: center; gap: 12px; padding: 15px 18px;
    background: var(--bg); border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    cursor: pointer; transition: border-color .18s, background .18s;
  }
  .bank-row:hover { border-color: var(--primary); background: var(--primary-light); }
  .bank-row-text { flex: 1; }
  .bank-row-title { font-size: 15px; font-weight: 700; color: var(--text); }
  .bank-row-sub   { font-size: 13px; color: var(--muted); margin-top: 3px; }
  .sw {
    width: 40px; height: 22px; border-radius: 11px; background: var(--border);
    position: relative; transition: background .22s; flex-shrink: 0;
  }
  .sw.on { background: var(--primary); }
  .sw::after {
    content: ''; position: absolute; top: 3px; left: 3px;
    width: 16px; height: 16px; border-radius: 50%; background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2); transition: transform .22s;
  }
  .sw.on::after { transform: translateX(18px); }

  /* ── WARNING BOX ── */
  .warn-box {
    display: flex; gap: 10px; align-items: flex-start;
    background: var(--warn-bg); border: 1.5px solid var(--warn-border);
    border-radius: 10px; padding: 12px 14px; margin-top: 6px;
  }
  .warn-box-ico { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .warn-box-title { font-size: 14px; font-weight: 700; color: #92400e; }
  .warn-box-body  { font-size: 13px; color: #b45309; margin-top: 2px; line-height: 1.4; }

  /* ── ACTIONS BAR ── */
  .actions-bar {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 16px 20px;
    display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  }
  .btn-primary {
    flex: 1; min-width: 140px;
    background: var(--primary); color: #fff; border: none;
    border-radius: var(--radius-sm); padding: 13px 24px;
    font-family: inherit; font-size: 15px; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 14px rgba(79,70,229,0.3);
    transition: transform .18s, box-shadow .18s, opacity .18s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79,70,229,0.4); }
  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    flex: 1; min-width: 140px;
    background: #fff; color: var(--primary);
    border: 2px solid var(--primary);
    border-radius: var(--radius-sm); padding: 13px 20px;
    font-family: inherit; font-size: 15px; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .18s, transform .18s;
  }
  .btn-secondary:hover { background: var(--primary-light); transform: translateY(-1px); }

  .btn-ghost {
    background: transparent; color: var(--muted);
    border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 13px 20px; font-family: inherit; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: border-color .18s, color .18s, background .18s;
    white-space: nowrap;
  }
  .btn-ghost:hover { border-color: var(--danger); color: var(--danger); background: #fff5f5; }

  /* ── SIDEBAR ── */
  .sidebar { position: sticky; top: 80px; display: flex; flex-direction: column; gap: 16px; }

  /* PREVIEW CARD */
  .preview-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .preview-head {
    padding: 18px 20px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #fff;
    position: relative; overflow: hidden;
  }
  .preview-head::before {
    content: ''; position: absolute; top: -20px; right: -20px;
    width: 90px; height: 90px; border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
  .preview-head::after {
    content: ''; position: absolute; bottom: -30px; right: 20px;
    width: 60px; height: 60px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  .preview-head h4 { font-size: 15px; font-weight: 700; position: relative; z-index: 1; }
  .preview-head p  { font-size: 13px; opacity: .7; margin-top: 3px; position: relative; z-index: 1; }
  .preview-avatar {
    width: 48px; height: 48px; border-radius: 12px;
    background: rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 800; color: #fff;
    margin-bottom: 10px; position: relative; z-index: 1;
    backdrop-filter: blur(4px);
  }
  .preview-name { font-size: 17px; font-weight: 800; line-height: 1.2; position: relative; z-index: 1; }
  .preview-gst  { font-size: 12px; opacity: .65; margin-top: 4px; font-family: monospace; position: relative; z-index: 1; }

  .preview-body { padding: 16px 20px; }
  .preview-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 9px 0; border-bottom: 1px solid var(--border); gap: 8px;
  }
  .preview-row:last-child { border-bottom: none; }
  .preview-k { font-size: 13px; color: var(--muted); font-weight: 600; flex-shrink: 0; }
  .preview-v { font-size: 13.5px; color: var(--text); font-weight: 700; text-align: right; max-width: 160px; word-break: break-word; }
  .preview-empty { color: #d1d5db; font-style: italic; font-weight: 400; }

  /* PROGRESS */
  .prog-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 18px 20px;
  }
  .prog-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .prog-title { font-size: 14px; font-weight: 700; color: var(--text); }
  .prog-pct   { font-size: 22px; font-weight: 800; color: var(--primary); }
  .prog-bar   { height: 8px; background: var(--bg); border-radius: 10px; overflow: hidden; margin-bottom: 14px; }
  .prog-fill  { height: 100%; background: linear-gradient(90deg, var(--primary), #7c3aed); border-radius: 10px; transition: width .5s cubic-bezier(.4,0,.2,1); }
  .prog-items { display: flex; flex-direction: column; gap: 9px; }
  .prog-item  { display: flex; align-items: center; gap: 9px; font-size: 14px; color: var(--muted); font-weight: 500; }
  .prog-item.done { color: var(--success); font-weight: 600; }
  .prog-dot   { width: 8px; height: 8px; border-radius: 50%; background: var(--border); flex-shrink: 0; }
  .prog-item.done .prog-dot { background: var(--success); }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: #fff; border-radius: 14px;
    padding: 16px 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.14);
    display: flex; align-items: center; gap: 12px; min-width: 300px;
    z-index: 9999; animation: toastUp .35s cubic-bezier(.4,0,.2,1);
  }
  .toast.success { border-left: 4px solid var(--success); }
  .toast.error   { border-left: 4px solid var(--danger); }
  .toast-ico   { font-size: 24px; flex-shrink: 0; }
  .toast-title { font-size: 15px; font-weight: 700; color: var(--text); }
  .toast-sub   { font-size: 13px; color: var(--muted); margin-top: 2px; }
  @keyframes toastUp {
    from { opacity: 0; transform: translateY(20px) scale(.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── RESPONSIVE MOBILE ── */
  @media(max-width: 600px) {
    .page-wrap { padding: 14px 12px 80px; }
    .dash-header { padding: 14px 16px; }
    .sub-toolbar { flex-direction: column; align-items: flex-start; gap: 10px; padding: 12px 14px; }
    .sub-toolbar-left  { width: 100%; }
    .sub-toolbar-right { width: 100%; }
    .step-pills { width: 100%; flex-wrap: wrap; }
    .step-pill { flex: 1 1 auto; font-size: 13px; }
    .dh-btn-primary, .dh-btn-outline { flex: 1; justify-content: center; }
    .actions-bar { flex-direction: column; }
    .btn-primary, .btn-secondary, .btn-ghost { width: 100%; }
    .s-card-body { padding: 16px; }
  }
`;

export default function AddSupplier() {
  const [tab, setTab] = useState("basic");
  const [showBank, setShowBank] = useState(false);
  const [toast, setToast] = useState(null);
  const [f, setF] = useState({
    name: "", contact: "", mobile: "", email: "",
    street: "", city: "", state: "", pin: "",
    gst: "", drugLicense: "", licenseExpiry: "", pan: "",
    paymentTerms: "Credit", creditDays: "30", creditLimit: "", openingBalance: "",
    bankName: "", accountHolder: "", accountNo: "", ifsc: "",
  });
  const [errs, setErrs] = useState({});

  const set = (k, v) => { setF(p => ({ ...p, [k]: v })); setErrs(p => ({ ...p, [k]: undefined })); };

  const gstSt = () => { if (!f.gst) return null; return GST_RE.test(f.gst) ? "ok" : "err"; };
  const panSt = () => { if (!f.pan) return null; return PAN_RE.test(f.pan) ? "ok" : "err"; };
  const dupeName = f.name.length > 2 && EXISTING.find(s => s.name.toLowerCase() === f.name.toLowerCase());
  const dupeGst  = f.gst.length > 4 && EXISTING.find(s => s.gst === f.gst);
  const licExpired = f.licenseExpiry && new Date(f.licenseExpiry) < new Date();
  const gs = gstSt(); const ps = panSt();

  const REQUIRED = [
    { k: "name",        label: "Supplier name" },
    { k: "contact",     label: "Contact person" },
    { k: "mobile",      label: "Mobile number" },
    { k: "gst",         label: "GSTIN" },
    { k: "drugLicense", label: "Drug license" },
    { k: "paymentTerms",label: "Payment terms" },
  ];
  const pct = Math.round((REQUIRED.filter(r => f[r.k]).length / REQUIRED.length) * 100);

  const validate = () => {
    const e = {};
    if (!f.name)    e.name    = "Required";
    if (!f.contact) e.contact = "Required";
    if (!f.mobile || !/^\d{10}$/.test(f.mobile)) e.mobile = "Enter valid 10-digit number";
    if (f.email && !/\S+@\S+\.\S+/.test(f.email)) e.email = "Enter valid email";
    if (!f.gst) e.gst = "GSTIN is required";
    else if (gs === "err") e.gst = "Invalid format (e.g. 22AAAAA0000A1Z5)";
    if (!f.drugLicense) e.drugLicense = "Required";
    if (f.pan && ps === "err") e.pan = "Invalid PAN (e.g. ABCDE1234F)";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const fireToast = (type, title, sub) => {
    setToast({ type, title, sub });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = () => {
    if (!validate()) { fireToast("error", "Check your form", "Please fix the highlighted errors before saving."); return; }
    fireToast("success", "Supplier Added!", `${f.name} has been registered successfully.`);
  };
  const handleSP = () => {
    if (!validate()) { fireToast("error", "Check your form", "Please fix the highlighted errors first."); return; }
    fireToast("success", "Redirecting to Purchase", `Opening purchase entry for ${f.name}…`);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="pg">
        <div className="page-wrap">

          {/* ── TOP HEADER — title + save/cancel ── */}
          <div className="dash-header">
            <div className="dash-header-title">Add New Supplier</div>
            <div className="sub-toolbar-right">
              <button className="dh-btn-primary" onClick={handleSave}>💾 Save Supplier</button>
              <button className="dh-btn-outline" onClick={() => {}}>✕ Cancel</button>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="main-layout">

            {/* LEFT FORM */}
            <div>

              {/* ── SUB TOOLBAR — step pills only, width matches left form ── */}
              <div className="sub-toolbar">
                <div className="sub-toolbar-left">
                  <div className="step-pills">
                    {TABS.map((t, i) => (
                      <button
                        key={t.id}
                        className={`step-pill ${tab === t.id ? "active" : ""}`}
                        onClick={() => setTab(t.id)}
                      >
                        <span className="step-pill-num">{i + 1}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── BASIC INFO ── */}
              {tab === "basic" && (
                <>
                  <div className="s-card">
                    <div className="s-card-head">
                      <div className="s-card-ico" style={{ background: "#eef2ff" }}>👤</div>
                      <div>
                        <h3>Contact Details</h3>
                        <p>Primary supplier &amp; contact information</p>
                      </div>
                    </div>
                    <div className="s-card-body">
                      <div className="fg2">
                        <div className="field">
                          <label className="field-lbl">Supplier / Company Name <span className="req">*</span></label>
                          <div className="fi-wrap">
                            <input className={`fi${errs.name ? " ferr" : ""}`} placeholder="e.g. Apex Pharma Pvt Ltd"
                              value={f.name} onChange={e => set("name", e.target.value)} />
                          </div>
                          {errs.name && <span className="fmsg err">⚠ {errs.name}</span>}
                          {dupeName && !errs.name && (
                            <div className="warn-box">
                              <span className="warn-box-ico">⚠️</span>
                              <div>
                                <div className="warn-box-title">Possible Duplicate Found</div>
                                <div className="warn-box-body">"{dupeName.name}" already exists. Verify before proceeding.</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="field">
                          <label className="field-lbl">Contact Person <span className="req">*</span></label>
                          <input className={`fi${errs.contact ? " ferr" : ""}`} placeholder="e.g. Rajesh Sharma"
                            value={f.contact} onChange={e => set("contact", e.target.value)} />
                          {errs.contact && <span className="fmsg err">⚠ {errs.contact}</span>}
                        </div>
                        <div className="field">
                          <label className="field-lbl">Mobile Number <span className="req">*</span></label>
                          <div className="fi-wrap">
                            <span className="fi-icon">📱</span>
                            <input className={`fi fi-with-icon${errs.mobile ? " ferr" : ""}`}
                              placeholder="10-digit number" maxLength={10}
                              value={f.mobile} onChange={e => set("mobile", e.target.value.replace(/\D/g, ""))} />
                          </div>
                          {errs.mobile && <span className="fmsg err">⚠ {errs.mobile}</span>}
                        </div>
                        <div className="field">
                          <label className="field-lbl">Email Address <span className="opt-tag">optional</span></label>
                          <div className="fi-wrap">
                            <span className="fi-icon">✉</span>
                            <input className={`fi fi-with-icon${errs.email ? " ferr" : ""}`}
                              placeholder="supplier@email.com" type="email"
                              value={f.email} onChange={e => set("email", e.target.value)} />
                          </div>
                          {errs.email && <span className="fmsg err">⚠ {errs.email}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="s-card">
                    <div className="s-card-head">
                      <div className="s-card-ico" style={{ background: "#f0fdf4" }}>📍</div>
                      <div>
                        <h3>Business Address</h3>
                        <p>Registered address of the supplier</p>
                      </div>
                    </div>
                    <div className="s-card-body">
                      <div className="fg2">
                        <div className="field fspan2">
                          <label className="field-lbl">Street Address</label>
                          <textarea className="fta" placeholder="Plot no., Building, Street, Area, Locality…"
                            value={f.street} onChange={e => set("street", e.target.value)} />
                        </div>
                        <div className="field">
                          <label className="field-lbl">City</label>
                          <input className="fi" placeholder="e.g. Mumbai" value={f.city} onChange={e => set("city", e.target.value)} />
                        </div>
                        <div className="field">
                          <label className="field-lbl">State</label>
                          <select className="fs" value={f.state} onChange={e => set("state", e.target.value)}>
                            <option value="">Select State…</option>
                            {STATES.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="field">
                          <label className="field-lbl">PIN Code</label>
                          <input className="fi" placeholder="400001" maxLength={6}
                            value={f.pin} onChange={e => set("pin", e.target.value.replace(/\D/g, ""))} />
                        </div>
                      </div>
                    </div>
                    <div className="s-card-footer end">
                      <button className="btn-primary" style={{ flex: "none", minWidth: 140 }} onClick={() => setTab("legal")}>
                        Next: Legal Info →
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ── LEGAL & GST ── */}
              {tab === "legal" && (
                <>
                  <div className="s-card">
                    <div className="s-card-head">
                      <div className="s-card-ico" style={{ background: "#fefce8" }}>⚖️</div>
                      <div>
                        <h3>Tax &amp; Legal Information</h3>
                        <p>GST, PAN and drug licensing details</p>
                      </div>
                    </div>
                    <div className="s-card-body">
                      <div className="fg2">
                        <div className="field">
                          <label className="field-lbl">GSTIN <span className="req">*</span></label>
                          <div className="fi-wrap">
                            <input
                              className={`fi${errs.gst ? " ferr" : gs === "ok" ? " fok" : ""}`}
                              placeholder="22AAAAA0000A1Z5" maxLength={15}
                              value={f.gst} onChange={e => set("gst", e.target.value.toUpperCase())}
                              style={{ paddingRight: 34 }}
                            />
                            {gs === "ok"  && <span className="fi-status" style={{ color: "var(--success)" }}>✓</span>}
                            {gs === "err" && <span className="fi-status" style={{ color: "var(--danger)" }}>✕</span>}
                          </div>
                          {errs.gst                    && <span className="fmsg err">⚠ {errs.gst}</span>}
                          {!errs.gst && gs === "ok"    && <span className="fmsg ok">✓ Valid GSTIN format</span>}
                          {!errs.gst && gs === "err"   && <span className="fmsg err">⚠ Format: 2-digit state + 10-char PAN + 3 chars</span>}
                          {!errs.gst && !f.gst         && <span className="fmsg hint">Format: 22AAAAA0000A1Z5</span>}
                          {dupeGst && gs === "ok" && (
                            <div className="warn-box">
                              <span className="warn-box-ico">⚠️</span>
                              <div>
                                <div className="warn-box-title">Duplicate GSTIN Detected</div>
                                <div className="warn-box-body">This GSTIN is already registered under <strong>"{dupeGst.name}"</strong>.</div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="field">
                          <label className="field-lbl">PAN Number <span className="opt-tag">optional</span></label>
                          <div className="fi-wrap">
                            <input
                              className={`fi${ps === "err" ? " ferr" : ps === "ok" ? " fok" : ""}`}
                              placeholder="ABCDE1234F" maxLength={10}
                              value={f.pan} onChange={e => set("pan", e.target.value.toUpperCase())}
                              style={{ paddingRight: 34 }}
                            />
                            {ps === "ok"  && <span className="fi-status" style={{ color: "var(--success)" }}>✓</span>}
                            {ps === "err" && <span className="fi-status" style={{ color: "var(--danger)" }}>✕</span>}
                          </div>
                          {ps === "ok"  && <span className="fmsg ok">✓ Valid PAN format</span>}
                          {ps === "err" && <span className="fmsg err">⚠ Format: ABCDE1234F</span>}
                        </div>
                        <div className="field">
                          <label className="field-lbl">Drug License Number <span className="req">*</span></label>
                          <input className={`fi${errs.drugLicense ? " ferr" : ""}`} placeholder="MH-MUM-123456"
                            value={f.drugLicense} onChange={e => set("drugLicense", e.target.value)} />
                          {errs.drugLicense && <span className="fmsg err">⚠ {errs.drugLicense}</span>}
                        </div>
                        <div className="field">
                          <label className="field-lbl">License Expiry Date <span className="opt-tag">optional</span></label>
                          <input type="date" className={`fi${licExpired ? " ferr" : ""}`}
                            value={f.licenseExpiry} onChange={e => set("licenseExpiry", e.target.value)} />
                          {licExpired && <span className="fmsg err">⚠ This license has already expired</span>}
                        </div>
                      </div>
                    </div>
                    <div className="s-card-footer">
                      <button className="btn-ghost" onClick={() => setTab("basic")}>← Back</button>
                      <button className="btn-primary" style={{ flex: "none", minWidth: 160 }} onClick={() => setTab("business")}>
                        Next: Business Info →
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ── BUSINESS ── */}
              {tab === "business" && (
                <>
                  <div className="s-card">
                    <div className="s-card-head">
                      <div className="s-card-ico" style={{ background: "#f0fdf4" }}>💼</div>
                      <div>
                        <h3>Payment &amp; Credit Terms</h3>
                        <p>Configure payment method and credit limits</p>
                      </div>
                    </div>
                    <div className="s-card-body">
                      <div className="fg2">
                        <div className="field fspan2">
                          <label className="field-lbl">Payment Terms <span className="req">*</span></label>
                          <div className="pay-toggle">
                            {[
                              { v: "Cash",    e: "💵" },
                              { v: "Credit",  e: "📅" },
                              { v: "Advance", e: "⬆️" },
                            ].map(t => (
                              <button key={t.v} className={`pay-opt${f.paymentTerms === t.v ? " on" : ""}`}
                                onClick={() => set("paymentTerms", t.v)}>
                                {t.e} {t.v}
                              </button>
                            ))}
                          </div>
                        </div>
                        {f.paymentTerms === "Credit" && (
                          <div className="field">
                            <label className="field-lbl">Credit Period</label>
                            <div className="fi-wrap">
                              <input className="fi fi-with-suf" placeholder="30"
                                value={f.creditDays} onChange={e => set("creditDays", e.target.value.replace(/\D/g, ""))} />
                              <span className="fi-suf">days</span>
                            </div>
                          </div>
                        )}
                        <div className="field">
                          <label className="field-lbl">Credit Limit <span className="opt-tag">optional</span></label>
                          <div className="fi-wrap">
                            <span className="fi-icon" style={{ fontWeight: 700, fontSize: 13, left: 11 }}>₹</span>
                            <input className="fi fi-with-icon" placeholder="100000"
                              value={f.creditLimit} onChange={e => set("creditLimit", e.target.value.replace(/\D/g, ""))} />
                          </div>
                        </div>
                        <div className="field">
                          <label className="field-lbl">Opening Balance <span className="opt-tag">optional</span></label>
                          <div className="fi-wrap">
                            <span className="fi-icon" style={{ fontWeight: 700, fontSize: 13, left: 11 }}>₹</span>
                            <input className="fi fi-with-icon" placeholder="0"
                              value={f.openingBalance} onChange={e => set("openingBalance", e.target.value.replace(/\D/g, ""))} />
                          </div>
                          <span className="fmsg hint">Outstanding amount from previous records</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="s-card">
                    <div className="s-card-head">
                      <div className="s-card-ico" style={{ background: "#f0f9ff" }}>🏦</div>
                      <div>
                        <h3>Bank Details</h3>
                        <p>Account information for payment transfers</p>
                      </div>
                    </div>
                    <div className="s-card-body">
                      <div className="bank-row" onClick={() => setShowBank(b => !b)}>
                        <span style={{ fontSize: 22 }}>🏦</span>
                        <div className="bank-row-text">
                          <div className="bank-row-title">Add Bank Account</div>
                          <div className="bank-row-sub">Enable for direct payment transfers to supplier</div>
                        </div>
                        <div className={`sw${showBank ? " on" : ""}`} />
                      </div>
                      {showBank && (
                        <div className="fg2" style={{ marginTop: 18 }}>
                          <div className="field">
                            <label className="field-lbl">Bank Name</label>
                            <input className="fi" placeholder="e.g. HDFC Bank" value={f.bankName} onChange={e => set("bankName", e.target.value)} />
                          </div>
                          <div className="field">
                            <label className="field-lbl">Account Holder</label>
                            <input className="fi" placeholder="As per passbook" value={f.accountHolder} onChange={e => set("accountHolder", e.target.value)} />
                          </div>
                          <div className="field">
                            <label className="field-lbl">Account Number</label>
                            <input className="fi" placeholder="Enter account number" value={f.accountNo} onChange={e => set("accountNo", e.target.value)} />
                          </div>
                          <div className="field">
                            <label className="field-lbl">IFSC Code</label>
                            <input className="fi" placeholder="HDFC0001234" maxLength={11}
                              value={f.ifsc} onChange={e => set("ifsc", e.target.value.toUpperCase())} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="s-card-footer">
                      <button className="btn-ghost" onClick={() => setTab("legal")}>← Back</button>
                    </div>
                  </div>

                </>
              )}

              {/* ACTIONS BAR — always visible below the left form */}
              <div className="actions-bar" style={{ marginTop: 16 }}>
                <button className="btn-primary" onClick={handleSave}>💾 Save Supplier</button>
                <button className="btn-secondary" onClick={handleSP}>🛒 Save &amp; Add Purchase</button>
                <button className="btn-ghost" onClick={() => {}}>✕ Cancel</button>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="sidebar">
              {/* PREVIEW */}
              <div className="preview-card">
                <div className="preview-head">
                  <div className="preview-avatar">
                    {f.name ? f.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div className="preview-name">{f.name || "Supplier Name"}</div>
                  <div className="preview-gst">{f.gst || "GSTIN not entered"}</div>
                </div>
                <div className="preview-body">
                  {[
                    ["Contact",   f.contact],
                    ["Mobile",    f.mobile],
                    ["City",      [f.city, f.state].filter(Boolean).join(", ")],
                    ["Drug Lic.", f.drugLicense],
                    ["Payment",   f.paymentTerms + (f.paymentTerms === "Credit" && f.creditDays ? ` · ${f.creditDays}d` : "")],
                    ["Cr. Limit", f.creditLimit ? `₹${Number(f.creditLimit).toLocaleString()}` : ""],
                    ["Opening",   f.openingBalance ? `₹${Number(f.openingBalance).toLocaleString()}` : ""],
                  ].map(([k, v]) => (
                    <div className="preview-row" key={k}>
                      <span className="preview-k">{k}</span>
                      <span className={`preview-v${!v ? " preview-empty" : ""}`}>{v || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROGRESS */}
              <div className="prog-card">
                <div className="prog-head">
                  <span className="prog-title">Profile Completion</span>
                  <span className="prog-pct">{pct}%</span>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="prog-items">
                  {REQUIRED.map(r => (
                    <div key={r.k} className={`prog-item${f[r.k] ? " done" : ""}`}>
                      <div className="prog-dot" />
                      <span>{f[r.k] ? "✓ " : ""}{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <span className="toast-ico">{toast.type === "success" ? "✅" : "❌"}</span>
          <div>
            <div className="toast-title">{toast.title}</div>
            <div className="toast-sub">{toast.sub}</div>
          </div>
        </div>
      )}
    </>
  );
}