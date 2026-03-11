import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f0f2f7;
    --white: #ffffff;
    --border: #e3e8f0;
    --border-hover: #bfcde0;
    --blue: #2563eb;
    --blue-soft: #eff4ff;
    --blue-mid: #bfcffd;
    --teal: #0d9488;
    --teal-soft: #f0fdfa;
    --amber: #d97706;
    --amber-soft: #fffbeb;
    --red: #dc2626;
    --red-soft: #fff0f0;
    --green: #16a34a;
    --green-soft: #f0fdf4;
    --purple: #7c3aed;
    --purple-soft: #f5f3ff;
    --text: #0f172a;
    --text-2: #334155;
    --text-3: #64748b;
    --text-4: #94a3b8;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
    --shadow: 0 4px 16px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
    --shadow-lg: 0 12px 32px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05);
    --radius: 14px;
    --radius-sm: 9px;
    --radius-xs: 6px;
    --font: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
    --transition: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .rm-root {
    background: var(--bg);
    min-height: 100vh;
    font-family: var(--font);
    color: var(--text);
    padding: 10px 10px 48px;
  }

  /* ── Page Header ── */
  .rm-ph {
    margin: 0 auto 28px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .rm-ph-left { display: flex; align-items: center; gap: 14px; }

  .rm-ph-icon {
    width: 48px; height: 48px;
    border-radius: 13px;
    background: var(--blue);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    box-shadow: 0 4px 14px rgba(37,99,235,0.35);
    flex-shrink: 0;
  }

  .rm-ph-title {
    font-size: 23px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.4px;
    line-height: 1.2;
  }

  .rm-ph-sub {
    font-size: 13px;
    color: var(--text-3);
    margin-top: 3px;
    font-weight: 400;
  }

  .rm-ph-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

  .rm-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 13px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--mono);
    border: 1px solid;
    white-space: nowrap;
  }

  .rm-pill-green { color: var(--green); background: var(--green-soft); border-color: #bbf7d0; }
  .rm-pill-amber { color: var(--amber); background: var(--amber-soft); border-color: #fde68a; }

  .rm-pill-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: rm-blink 2s infinite;
  }

  @keyframes rm-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* ── Toast ── */
  .rm-toast {
    position: fixed;
    top: 22px; right: 22px;
    background: var(--green);
    color: white;
    padding: 13px 18px;
    border-radius: 11px;
    font-size: 13.5px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 9999;
    box-shadow: 0 8px 28px rgba(22,163,74,0.3);
    animation: rm-toast-in 0.35s cubic-bezier(.34,1.56,.64,1);
  }

  @keyframes rm-toast-in {
    from { transform: translateX(80px) scale(0.95); opacity: 0; }
    to   { transform: translateX(0) scale(1); opacity: 1; }
  }

  /* ── Layout ── */
  .rm-layout {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  @media (max-width: 720px) { .rm-layout { grid-template-columns: 1fr; } }

  .rm-full { grid-column: 1 / -1; }

  /* ── Cards ── */
  .rm-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    transition: box-shadow var(--transition);
  }

  .rm-card:hover { box-shadow: var(--shadow); }

  .rm-card-head {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
    background: #fafbfd;
  }

  .rm-card-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .rm-card-title { font-size: 14px; font-weight: 700; color: var(--text-2); flex: 1; }

  .rm-card-badge {
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 3px 10px;
    border-radius: 20px;
    font-family: var(--mono);
  }

  .rm-card-body {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ── 2 col inside card ── */
  .rm-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 500px) { .rm-2col { grid-template-columns: 1fr; } }

  /* ── Fields ── */
  .rm-field { display: flex; flex-direction: column; gap: 6px; }

  .rm-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-3);
    text-transform: uppercase;
    letter-spacing: 0.7px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .rm-label-req { color: var(--red); }

  .rm-input, .rm-select, .rm-textarea {
    font-family: var(--font);
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text);
    background: #fafbfc;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 9px 12px;
    outline: none;
    width: 100%;
    transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
  }

  .rm-input::placeholder, .rm-textarea::placeholder { color: var(--text-4); font-weight: 400; }

  .rm-input:focus, .rm-select:focus, .rm-textarea:focus {
    border-color: var(--blue);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  .rm-select { cursor: pointer; }
  .rm-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

  /* ── Status selector ── */
  .rm-status-group { display: flex; gap: 8px; }

  .rm-status-opt {
    flex: 1;
    padding: 8px 10px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    text-align: center;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition);
    user-select: none;
    background: #fafbfc;
    color: var(--text-3);
  }

  .rm-status-opt:hover { border-color: var(--border-hover); }

  .rm-status-opt.s-active   { border-color: var(--green); background: var(--green-soft); color: var(--green); }
  .rm-status-opt.s-inactive { border-color: #94a3b8; background: #f8fafc; color: #64748b; }
  .rm-status-opt.s-maint    { border-color: var(--amber); background: var(--amber-soft); color: var(--amber); }

  /* ── Priority selector ── */
  .rm-priority-group { display: flex; gap: 8px; }

  .rm-priority-opt {
    flex: 1;
    padding: 8px 6px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all var(--transition);
    user-select: none;
    background: #fafbfc;
    color: var(--text-3);
    font-family: var(--mono);
  }

  .rm-priority-opt:hover { border-color: var(--border-hover); }
  .rm-priority-opt.p-low      { border-color: var(--teal); background: var(--teal-soft); color: var(--teal); }
  .rm-priority-opt.p-medium   { border-color: var(--blue); background: var(--blue-soft); color: var(--blue); }
  .rm-priority-opt.p-high     { border-color: var(--amber); background: var(--amber-soft); color: var(--amber); }
  .rm-priority-opt.p-critical { border-color: var(--red); background: var(--red-soft); color: var(--red); }

  /* ── Temperature selector ── */
  .rm-temp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

  .rm-temp-opt {
    padding: 9px 10px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    cursor: pointer;
    transition: all var(--transition);
    background: #fafbfc;
    user-select: none;
  }

  .rm-temp-opt:hover { border-color: var(--border-hover); background: var(--white); }

  .rm-temp-opt-label { font-size: 12.5px; font-weight: 700; color: var(--text-3); display: flex; align-items: center; gap: 6px; }
  .rm-temp-opt-desc  { font-size: 10.5px; color: var(--text-4); margin-top: 2px; font-family: var(--mono); }

  .rm-temp-opt.t-normal   { border-color: var(--teal); background: var(--teal-soft); }
  .rm-temp-opt.t-normal .rm-temp-opt-label { color: var(--teal); }

  .rm-temp-opt.t-cold     { border-color: var(--blue); background: var(--blue-soft); }
  .rm-temp-opt.t-cold .rm-temp-opt-label { color: var(--blue); }

  .rm-temp-opt.t-frozen   { border-color: #7dd3fc; background: #f0f9ff; }
  .rm-temp-opt.t-frozen .rm-temp-opt-label { color: #0369a1; }

  .rm-temp-opt.t-crt      { border-color: var(--purple); background: var(--purple-soft); }
  .rm-temp-opt.t-crt .rm-temp-opt-label { color: var(--purple); }

  /* ── Stepper ── */
  .rm-stepper {
    display: flex;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--white);
    transition: border-color var(--transition), box-shadow var(--transition);
  }

  .rm-stepper:focus-within {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  .rm-step-btn {
    width: 36px;
    border: none;
    background: #f1f5f9;
    color: var(--text-3);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-family: var(--mono);
  }

  .rm-step-btn:hover { background: var(--blue-soft); color: var(--blue); }

  .rm-step-in {
    flex: 1;
    border: none;
    background: transparent;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    font-family: var(--mono);
    color: var(--text);
    outline: none;
    padding: 9px 4px;
    min-width: 0;
  }

  /* ── Input with prefix ── */
  .rm-input-wrap {
    display: flex;
    align-items: stretch;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--white);
    transition: border-color var(--transition), box-shadow var(--transition);
  }

  .rm-input-wrap:focus-within {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  .rm-input-prefix {
    padding: 0 12px;
    background: #f1f5f9;
    color: var(--text-3);
    font-size: 13px;
    font-weight: 700;
    font-family: var(--mono);
    display: flex; align-items: center;
    border-right: 1.5px solid var(--border);
    flex-shrink: 0;
  }

  .rm-input-bare {
    flex: 1;
    border: none;
    background: transparent;
    font-family: var(--font);
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text);
    outline: none;
    padding: 9px 12px;
    min-width: 0;
  }

  .rm-input-bare::placeholder { color: var(--text-4); }

  /* ── Security method ── */
  .rm-sec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

  .rm-sec-opt {
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    cursor: pointer;
    transition: all var(--transition);
    background: #fafbfc;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rm-sec-opt:hover { border-color: var(--border-hover); background: var(--white); }

  .rm-sec-opt.active {
    border-color: var(--blue);
    background: var(--blue-soft);
  }

  .rm-sec-opt-icon {
    font-size: 18px;
    flex-shrink: 0;
    width: 32px; height: 32px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.04);
  }

  .rm-sec-opt-name { font-size: 12.5px; font-weight: 700; color: var(--text-2); }
  .rm-sec-opt-desc { font-size: 10.5px; color: var(--text-4); margin-top: 1px; }
  .rm-sec-opt.active .rm-sec-opt-name { color: var(--blue); }

  /* ── Toggle ── */
  .rm-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 14px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    background: #fafbfc;
    transition: all var(--transition);
    gap: 12px;
  }

  .rm-toggle-row:hover { border-color: var(--border-hover); background: var(--white); }
  .rm-toggle-row.on { border-color: var(--blue); background: var(--blue-soft); }

  .rm-toggle-info { display: flex; align-items: center; gap: 10px; }
  .rm-toggle-icon { font-size: 18px; flex-shrink: 0; }
  .rm-toggle-label { font-size: 13px; font-weight: 600; color: var(--text-2); user-select: none; }
  .rm-toggle-desc { font-size: 11px; color: var(--text-4); margin-top: 1px; }
  .rm-toggle-row.on .rm-toggle-label { color: var(--blue); }

  .rm-switch {
    width: 38px; height: 21px;
    border-radius: 11px;
    background: #cbd5e1;
    position: relative;
    flex-shrink: 0;
    transition: background 0.22s;
  }

  .rm-switch.on { background: var(--blue); }

  .rm-switch::after {
    content: '';
    position: absolute;
    width: 15px; height: 15px;
    background: white;
    border-radius: 50%;
    top: 3px; left: 3px;
    transition: left 0.22s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  .rm-switch.on::after { left: 20px; }

  /* ── Summary sidebar ── */
  .rm-summary {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    grid-column: 1 / -1;
  }

  .rm-summary-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-3);
    font-family: var(--mono);
    margin-bottom: 4px;
  }

  .rm-summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
  }

  .rm-summary-item {
    background: var(--bg);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    border: 1px solid var(--border);
  }

  .rm-summary-label { font-size: 10.5px; color: var(--text-4); font-family: var(--mono); margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px; }
  .rm-summary-value { font-size: 13.5px; font-weight: 700; color: var(--text-2); font-family: var(--mono); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── Divider ── */
  .rm-divider { height: 1px; background: var(--border); }

  /* ── Footer ── */
  .rm-footer {
    max-width: 1020px;
    margin: 20px auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .rm-footer-hint {
    font-size: 12px;
    color: var(--text-4);
    font-family: var(--mono);
  }

  .rm-btn-group { display: flex; gap: 10px; }

  .rm-btn {
    padding: 10px 22px;
    border-radius: var(--radius-sm);
    font-size: 13.5px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    font-family: var(--font);
    transition: all var(--transition);
    display: flex; align-items: center; gap: 7px;
  }

  .rm-btn-ghost {
    background: var(--white);
    border: 1.5px solid var(--border);
    color: var(--text-3);
  }

  .rm-btn-ghost:hover { border-color: #94a3b8; color: var(--text); }

  .rm-btn-save {
    background: var(--blue);
    color: white;
    box-shadow: 0 2px 12px rgba(37,99,235,0.35);
  }

  .rm-btn-save:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 5px 18px rgba(37,99,235,0.4); }
  .rm-btn-save:active { transform: translateY(0); }
`;

const TEMP_OPTIONS = [
  { key: "Normal", cls: "t-normal", icon: "🌡️", desc: "15–25 °C" },
  { key: "Cold", cls: "t-cold", icon: "❄️", desc: "2–8 °C" },
  { key: "Frozen", cls: "t-frozen", icon: "🧊", desc: "−20 to −10 °C" },
  { key: "Controlled Room Temperature", cls: "t-crt", icon: "🔬", desc: "20–25 °C" },
];

const SECURITY_OPTIONS = [
  { key: "None", icon: "🔓", desc: "Open access" },
  { key: "Password", icon: "🔑", desc: "Pin or password" },
  { key: "OTP Verification", icon: "📱", desc: "One-time code" },
  { key: "Biometric", icon: "👁️", desc: "Scan to unlock" },
];

const STATUS_OPTS = [
  { key: "Active", cls: "s-active", label: "● Active" },
  { key: "Inactive", cls: "s-inactive", label: "◌ Inactive" },
  { key: "Maintenance", cls: "s-maint", label: "⚙ Maint." },
];

const PRIORITY_OPTS = [
  { key: "Low", cls: "p-low", label: "Low" },
  { key: "Medium", cls: "p-medium", label: "Med" },
  { key: "High", cls: "p-high", label: "High" },
  { key: "Critical", cls: "p-critical", label: "Crit" },
];

const DEFAULT = {
  roomName: "",
  roomType: "General Storage",
  temperatureType: "Normal",
  description: "",
  status: "Active",
  roomPriority: "Medium",
  roomCapacity: 100,
  storageName: "",
  confirmationCharges: 0,
  securityMethod: "None",
  requirePassword: false,
  requireOTP: false,
};

function Toggle({ checked, onChange, icon, label, desc }) {
  return (
    <div className={`rm-toggle-row ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}>
      <div className="rm-toggle-info">
        <span className="rm-toggle-icon">{icon}</span>
        <div>
          <div className="rm-toggle-label">{label}</div>
          {desc && <div className="rm-toggle-desc">{desc}</div>}
        </div>
      </div>
      <div className={`rm-switch ${checked ? "on" : ""}`} />
    </div>
  );
}

function Stepper({ value, onChange, min = 0, max = 9999 }) {
  return (
    <div className="rm-stepper">
      <button className="rm-step-btn" onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <input className="rm-step-in" type="number" value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)} min={min} max={max} />
      <button className="rm-step-btn" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

function SHead({ icon, bg, badgeBg, badgeColor, title, badge }) {
  return (
    <div className="rm-card-head">
      <div className="rm-card-icon" style={{ background: bg }}>{icon}</div>
      <div className="rm-card-title">{title}</div>
      <span className="rm-card-badge" style={{ background: badgeBg, color: badgeColor }}>{badge}</span>
    </div>
  );
}

export default function RoomManagement() {
  const [s, setS] = useState(DEFAULT);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const set = (k, v) => { setS(p => ({ ...p, [k]: v })); setDirty(true); };
  const handleSave = () => { setSaved(true); setDirty(false); setTimeout(() => setSaved(false), 3500); };
  const handleReset = () => { setS(DEFAULT); setDirty(false); };

  const tempCls = (k) => {
    const map = { Normal: "t-normal", Cold: "t-cold", Frozen: "t-frozen", "Controlled Room Temperature": "t-crt" };
    return s.temperatureType === k ? map[k] : "";
  };

  return (
    <>
      <style>{css}</style>
      <div className="rm-root">

        {saved && (
          <div className="rm-toast">✓ Room settings saved successfully</div>
        )}

        {/* Page Header */}
        <div className="rm-ph">
          <div className="rm-ph-left">
            <div className="rm-ph-icon">🏢</div>
            <div>
              <div className="rm-ph-title">Room Management</div>
              <div className="rm-ph-sub">Configure storage rooms, environment & security</div>
            </div>
          </div>
          <div className="rm-ph-right">
            {dirty && <div className="rm-pill rm-pill-amber"><span className="rm-pill-dot" />Unsaved</div>}
            <div className="rm-pill rm-pill-green"><span className="rm-pill-dot" />{s.status}</div>
          </div>
        </div>

        {/* Grid layout */}
        <div className="rm-layout">

          {/* ── Room Information ── */}
          <div className="rm-card">
            <SHead icon="🏷️" bg="#dbeafe" badgeBg="#eff4ff" badgeColor="#2563eb" title="Room Information" badge="Basic Info" />
            <div className="rm-card-body">
              <div className="rm-field">
                <label className="rm-label">Room Name <span className="rm-label-req">*</span></label>
                <input className="rm-input" placeholder="e.g. Storage Room A" value={s.roomName}
                  onChange={e => set("roomName", e.target.value)} />
              </div>
              <div className="rm-field">
                <label className="rm-label">Storage Name</label>
                <input className="rm-input" placeholder="e.g. Cold Unit 1" value={s.storageName}
                  onChange={e => set("storageName", e.target.value)} />
              </div>
              <div className="rm-field">
                <label className="rm-label">Room Type</label>
                <select className="rm-select" value={s.roomType} onChange={e => set("roomType", e.target.value)}>
                  <option>General Storage</option>
                  <option>Cold Storage</option>
                  <option>Controlled Storage</option>
                  <option>High Security Storage</option>
                </select>
              </div>
              <div className="rm-field">
                <label className="rm-label">Status</label>
                <div className="rm-status-group">
                  {STATUS_OPTS.map(o => (
                    <div key={o.key} className={`rm-status-opt ${s.status === o.key ? o.cls : ""}`}
                      onClick={() => set("status", o.key)}>{o.label}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Environment Settings ── */}
          <div className="rm-card">
            <SHead icon="🌡️" bg="#d1fae5" badgeBg="#f0fdf4" badgeColor="#16a34a" title="Environment Settings" badge="Climate" />
            <div className="rm-card-body">
              <div className="rm-field">
                <label className="rm-label">Temperature Type</label>
                <div className="rm-temp-grid">
                  {TEMP_OPTIONS.map(t => (
                    <div key={t.key} className={`rm-temp-opt ${s.temperatureType === t.key ? t.cls : ""}`}
                      onClick={() => set("temperatureType", t.key)}>
                      <div className="rm-temp-opt-label">{t.icon} {t.key}</div>
                      <div className="rm-temp-opt-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rm-2col">
                <div className="rm-field">
                  <label className="rm-label">Room Capacity</label>
                  <Stepper value={s.roomCapacity} onChange={v => set("roomCapacity", v)} min={1} max={9999} />
                </div>
                <div className="rm-field">
                  <label className="rm-label">Priority</label>
                  <div className="rm-priority-group">
                    {PRIORITY_OPTS.map(p => (
                      <div key={p.key} className={`rm-priority-opt ${s.roomPriority === p.key ? p.cls : ""}`}
                        onClick={() => set("roomPriority", p.key)}>{p.label}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rm-field">
                <label className="rm-label">Confirmation Charges</label>
                <div className="rm-input-wrap">
                  <span className="rm-input-prefix">₹</span>
                  <input className="rm-input-bare" type="number" placeholder="0.00"
                    value={s.confirmationCharges}
                    onChange={e => set("confirmationCharges", parseFloat(e.target.value) || 0)} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Security Settings ── */}
          <div className="rm-card">
            <SHead icon="🔐" bg="#fce7f3" badgeBg="#fdf4ff" badgeColor="#7c3aed" title="Security Settings" badge="Protection" />
            <div className="rm-card-body">
              <div className="rm-field">
                <label className="rm-label">Security Method</label>
                <div className="rm-sec-grid">
                  {SECURITY_OPTIONS.map(m => (
                    <div key={m.key} className={`rm-sec-opt ${s.securityMethod === m.key ? "active" : ""}`}
                      onClick={() => set("securityMethod", m.key)}>
                      <div className="rm-sec-opt-icon">{m.icon}</div>
                      <div>
                        <div className="rm-sec-opt-name">{m.key}</div>
                        <div className="rm-sec-opt-desc">{m.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rm-divider" />
              <Toggle checked={s.requirePassword} onChange={v => set("requirePassword", v)}
                icon="🔑" label="Require Password Access" desc="Users must enter a password to access this room" />
              <Toggle checked={s.requireOTP} onChange={v => set("requireOTP", v)}
                icon="📱" label="Require OTP Verification" desc="Send a one-time code before granting access" />
            </div>
          </div>

          {/* ── Additional Notes ── */}
          <div className="rm-card">
            <SHead icon="📝" bg="#fef9c3" badgeBg="#fefce8" badgeColor="#ca8a04" title="Additional Notes" badge="Details" />
            <div className="rm-card-body">
              <div className="rm-field">
                <label className="rm-label">Room Description</label>
                <textarea className="rm-textarea" rows={5} value={s.description}
                  placeholder="Add any additional notes about this room, access restrictions, or special handling instructions..."
                  onChange={e => set("description", e.target.value)} />
              </div>
            </div>
          </div>

          {/* ── Summary strip ── */}
          <div className="rm-summary rm-full">
            <div className="rm-summary-title">Configuration Summary</div>
            <div className="rm-summary-grid">
              {[
                { label: "Room", value: s.roomName || "—" },
                { label: "Storage", value: s.storageName || "—" },
                { label: "Type", value: s.roomType },
                { label: "Temp", value: s.temperatureType },
                { label: "Capacity", value: s.roomCapacity },
                { label: "Priority", value: s.roomPriority },
                { label: "Status", value: s.status },
                { label: "Security", value: s.securityMethod },
                { label: "Charges", value: `₹ ${s.confirmationCharges}` },
              ].map(item => (
                <div key={item.label} className="rm-summary-item">
                  <div className="rm-summary-label">{item.label}</div>
                  <div className="rm-summary-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="rm-footer">
          <div className="rm-footer-hint">* Required fields · Last modified: {new Date().toLocaleDateString()}</div>
          <div className="rm-btn-group">
            <button className="rm-btn rm-btn-ghost" onClick={handleReset}>↺ Reset</button>
            <button className="rm-btn rm-btn-save" onClick={handleSave}>✓ Save Changes</button>
          </div>
        </div>

      </div>
    </>
  );
}