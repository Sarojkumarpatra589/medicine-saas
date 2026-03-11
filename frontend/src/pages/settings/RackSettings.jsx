import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --white: #ffffff;
    --bg: #f4f6fa;
    --surface: #ffffff;
    --border: #e4e8f0;
    --border-focus: #4f7ef8;
    --blue: #4f7ef8;
    --blue-light: #eef2ff;
    --blue-mid: #c7d7fd;
    --text: #111827;
    --text-2: #374151;
    --text-3: #6b7280;
    --text-4: #9ca3af;
    --green: #16a34a;
    --green-bg: #f0fdf4;
    --amber: #d97706;
    --amber-bg: #fffbeb;
    --radius: 12px;
    --radius-sm: 8px;
    --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
    --font: 'Plus Jakarta Sans', sans-serif;
    --mono: 'Fira Code', monospace;
  }

  .rs-wrap {
    background: var(--bg);
    min-height: 100vh;
    font-family: var(--font);
    color: var(--text);
    padding: 10px 10px;
  }

  .rs-page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    gap: 16px;
    flex-wrap: wrap;
  }

  .rs-page-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.4px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rs-page-title-icon {
    width: 38px; height: 38px;
    background: var(--blue);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(79,126,248,0.35);
  }

  .rs-page-sub {
    font-size: 13px;
    color: var(--text-3);
    margin-top: 3px;
    font-weight: 500;
    padding-left: 48px;
  }

  .rs-status-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: var(--green-bg);
    border: 1px solid #bbf7d0;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: var(--green);
    font-family: var(--mono);
    white-space: nowrap;
  }

  .rs-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--green);
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%,100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .rs-unsaved {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--amber);
    background: var(--amber-bg);
    border: 1px solid #fde68a;
    padding: 4px 10px;
    border-radius: 20px;
    font-family: var(--mono);
  }

  .rs-toast {
    position: fixed;
    top: 20px; right: 20px;
    background: var(--green);
    color: white;
    font-size: 13px;
    font-weight: 600;
    padding: 11px 18px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(22,163,74,0.3);
    animation: toastin 0.3s cubic-bezier(.34,1.56,.64,1);
  }

  @keyframes toastin {
    from { transform: translateY(-16px) scale(0.95); opacity: 0; }
    to   { transform: translateY(0) scale(1); opacity: 1; }
  }

  .rs-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .rs-body {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 680px) { .rs-body { grid-template-columns: 1fr; } }

  .rs-section {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--white);
    transition: box-shadow 0.2s;
  }

  .rs-section:hover { box-shadow: var(--shadow-md); }

  .rs-section-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    background: #fafbfd;
    border-bottom: 1px solid var(--border);
  }

  .rs-section-icon {
    width: 28px; height: 28px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .rs-section-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-2);
  }

  .rs-section-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rs-field { display: flex; flex-direction: column; gap: 5px; }

  .rs-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-3);
    text-transform: uppercase;
    letter-spacing: 0.7px;
  }

  .rs-input, .rs-select {
    width: 100%;
    background: var(--bg);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 8px 11px;
    font-size: 13.5px;
    font-family: var(--font);
    color: var(--text);
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
  }

  .rs-input:focus, .rs-select:focus {
    border-color: var(--border-focus);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(79,126,248,0.12);
  }

  .rs-select { cursor: pointer; }

  .rs-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .rs-radio-group { display: flex; gap: 8px; flex-wrap: wrap; }

  .rs-radio-pill {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1.5px solid var(--border);
    background: var(--bg);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text-3);
    cursor: pointer;
    transition: all 0.18s;
    user-select: none;
    font-family: var(--mono);
  }

  .rs-radio-pill:hover { border-color: var(--blue-mid); color: var(--blue); background: var(--blue-light); }

  .rs-radio-pill.active {
    border-color: var(--blue);
    background: var(--blue-light);
    color: var(--blue);
    box-shadow: 0 0 0 3px rgba(79,126,248,0.1);
  }

  .rs-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    background: var(--bg);
    cursor: pointer;
    transition: all 0.18s;
    gap: 12px;
  }

  .rs-toggle-row:hover { border-color: var(--blue-mid); background: var(--blue-light); }

  .rs-toggle-label { font-size: 13px; font-weight: 600; color: var(--text-2); user-select: none; }
  .rs-toggle-desc { font-size: 11.5px; color: var(--text-4); margin-top: 1px; }

  .rs-switch {
    width: 38px; height: 21px;
    border-radius: 11px;
    background: #d1d5db;
    position: relative;
    flex-shrink: 0;
    transition: background 0.22s;
  }

  .rs-switch.on { background: var(--blue); }

  .rs-switch::after {
    content: '';
    position: absolute;
    width: 15px; height: 15px;
    background: white;
    border-radius: 50%;
    top: 3px; left: 3px;
    transition: left 0.22s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  .rs-switch.on::after { left: 20px; }

  .rs-stepper {
    display: flex;
    align-items: stretch;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--white);
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .rs-stepper:focus-within {
    border-color: var(--border-focus);
    box-shadow: 0 0 0 3px rgba(79,126,248,0.12);
  }

  .rs-step-btn {
    width: 34px;
    border: none;
    background: var(--bg);
    color: var(--text-3);
    font-size: 17px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .rs-step-btn:hover { background: var(--blue-light); color: var(--blue); }

  .rs-step-input {
    flex: 1;
    border: none;
    background: transparent;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    font-family: var(--mono);
    color: var(--text);
    outline: none;
    min-width: 0;
    padding: 8px 4px;
  }

  .rs-barcode-opts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }

  .rs-barcode-chip {
    padding: 7px 6px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    background: var(--bg);
    text-align: center;
    font-size: 11.5px;
    font-weight: 700;
    font-family: var(--mono);
    color: var(--text-3);
    cursor: pointer;
    transition: all 0.18s;
    user-select: none;
  }

  .rs-barcode-chip:hover { border-color: var(--blue-mid); color: var(--blue); background: var(--blue-light); }
  .rs-barcode-chip.active { border-color: var(--blue); background: var(--blue-light); color: var(--blue); }

  .rs-barcode-preview {
    background: white;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .rs-barcode-bars {
    display: flex;
    gap: 1.5px;
    align-items: flex-end;
    height: 38px;
  }

  .rs-barcode-bar { background: #111; border-radius: 1px; }
  .rs-barcode-id { font-family: var(--mono); font-size: 10px; color: #555; letter-spacing: 3px; }
  .rs-barcode-fmt { font-size: 10px; color: var(--text-4); font-family: var(--mono); background: var(--bg); padding: 2px 8px; border-radius: 4px; }

  .rs-color-grid { display: flex; gap: 10px; flex-wrap: wrap; }

  .rs-swatch {
    width: 32px; height: 32px;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.18s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    position: relative;
    outline: 1px solid rgba(0,0,0,0.08);
  }

  .rs-swatch:hover { transform: scale(1.12); box-shadow: 0 3px 8px rgba(0,0,0,0.15); }

  .rs-swatch.active {
    border-color: var(--blue);
    transform: scale(1.12);
    box-shadow: 0 0 0 3px rgba(79,126,248,0.22);
  }

  .rs-swatch.active::after {
    content: '✓';
    position: absolute;
    inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    font-weight: 900;
    color: rgba(0,0,0,0.4);
  }

  .rs-color-name { font-size: 10.5px; color: var(--text-3); font-family: var(--mono); margin-top: 4px; text-align: center; }

  .rs-divider { height: 1px; background: var(--border); margin: 2px 0; }

  .rs-info-banner {
    margin: 0 20px 20px;
    padding: 11px 14px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: var(--radius-sm);
    font-size: 12.5px;
    color: #1d4ed8;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rs-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-top: 1px solid var(--border);
    background: #fafbfd;
    flex-wrap: wrap;
    gap: 12px;
  }

  .rs-footer-hint { font-size: 12px; color: var(--text-4); font-family: var(--mono); }

  .rs-btn-group { display: flex; gap: 10px; }

  .rs-btn {
    padding: 9px 20px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    font-family: var(--font);
    transition: all 0.18s;
    display: flex; align-items: center; gap: 6px;
  }

  .rs-btn-ghost {
    background: white;
    border: 1.5px solid var(--border);
    color: var(--text-3);
  }

  .rs-btn-ghost:hover { border-color: #9ca3af; color: var(--text); }

  .rs-btn-primary {
    background: var(--blue);
    color: white;
    box-shadow: 0 2px 10px rgba(79,126,248,0.35);
  }

  .rs-btn-primary:hover { background: #3b6af0; transform: translateY(-1px); box-shadow: 0 4px 18px rgba(79,126,248,0.4); }
  .rs-btn-primary:active { transform: translateY(0); }
`;

const COLOR_OPTIONS = [
  { name: "Normal", color: "#F3F4F6" },
  { name: "Low",    color: "#FEF3C7" },
  { name: "Green",  color: "#DCFCE7" },
  { name: "Olive",  color: "#E7E5E4" },
  { name: "Red",    color: "#FEE2E2" },
  { name: "Pink",   color: "#FCE7F3" },
];

const BARCODE_FORMATS = ["Code 128", "Code 39", "EAN-13", "QR Code", "UPC-A"];

const DEFAULT = {
  rackNamingStyle: "A,B,C,D",
  defaultShelfCount: 5,
  maxMedicinesPerSlot: 10,
  allowMultipleMedicines: true,
  enableRackBarcode: true,
  defaultSlotStructure: "4 Slots Per Shelf",
  barcodeFormat: "Code 128",
  rackNoteColor: "Normal",
  rackId: "RACK-001",
  rackLocation: "Main Storage",
  rackCapacity: 200,
  temperatureControl: false,
  minTemperature: 15,
  maxTemperature: 25,
  humidityControl: false,
  minHumidity: 30,
  maxHumidity: 60,
  enableNotifications: true,
  lowStockThreshold: 5,
  expiryAlertDays: 30,
};

function Toggle({ checked, onChange, label, desc }) {
  return (
    <div className="rs-toggle-row" onClick={() => onChange(!checked)}>
      <div>
        <div className="rs-toggle-label">{label}</div>
        {desc && <div className="rs-toggle-desc">{desc}</div>}
      </div>
      <div className={`rs-switch ${checked ? "on" : ""}`} />
    </div>
  );
}

function Stepper({ value, onChange, min = 0, max = 9999 }) {
  return (
    <div className="rs-stepper">
      <button className="rs-step-btn" onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <input className="rs-step-input" type="number" value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)} min={min} max={max} />
      <button className="rs-step-btn" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

function BarcodePreview({ id, format }) {
  const seed = format.charCodeAt(0) + format.length;
  const bars = Array.from({ length: 32 }, (_, i) => ({
    w: ((i * seed * 3 + 5) % 3) + 1,
    h: ((i * seed + i * 2) % 3 === 0) ? 38 : ((i * seed) % 2 === 0) ? 28 : 33,
  }));
  return (
    <div className="rs-barcode-preview">
      <div className="rs-barcode-bars">
        {bars.map((b, i) => <div key={i} className="rs-barcode-bar" style={{ width: b.w, height: b.h }} />)}
      </div>
      <div className="rs-barcode-id">{id}</div>
      <div className="rs-barcode-fmt">{format}</div>
    </div>
  );
}

function SecHead({ icon, bg, title }) {
  return (
    <div className="rs-section-head">
      <div className="rs-section-icon" style={{ background: bg }}>{icon}</div>
      <div className="rs-section-title">{title}</div>
    </div>
  );
}

export default function RackSettings() {
  const [s, setS] = useState(DEFAULT);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const set = (k, v) => { setS(p => ({ ...p, [k]: v })); setDirty(true); };
  const handleSave = () => { setSaved(true); setDirty(false); setTimeout(() => setSaved(false), 3000); };
  const handleReset = () => { setS(DEFAULT); setDirty(false); };

  return (
    <>
      <style>{css}</style>
      <div className="rs-wrap">

        {saved && <div className="rs-toast">✓ Settings saved successfully</div>}

        {/* Header */}
        <div className="rs-page-header">
          <div>
            <div className="rs-page-title">
              <div className="rs-page-title-icon">🗄️</div>
              Rack Settings
            </div>
            <div className="rs-page-sub">Configure storage structure and medication handling</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {dirty && <div className="rs-unsaved">● Unsaved changes</div>}
            <div className="rs-status-pill"><div className="rs-dot" /> Active · {s.rackId}</div>
          </div>
        </div>

        {/* Card */}
        <div className="rs-card">
          <div className="rs-body">

            {/* Rack Identity */}
            <div className="rs-section">
              <SecHead icon="🏷️" bg="#eff6ff" title="Rack Identity" />
              <div className="rs-section-body">
                <div className="rs-field">
                  <label className="rs-label">Rack ID</label>
                  <input className="rs-input" value={s.rackId} onChange={e => set("rackId", e.target.value)} />
                </div>
                <div className="rs-field">
                  <label className="rs-label">Rack Location</label>
                  <input className="rs-input" value={s.rackLocation} onChange={e => set("rackLocation", e.target.value)} />
                </div>
              </div>
            </div>

            {/* Naming & Structure */}
            <div className="rs-section">
              <SecHead icon="📐" bg="#f5f3ff" title="Naming & Structure" />
              <div className="rs-section-body">
                <div className="rs-field">
                  <label className="rs-label">Naming Style</label>
                  <div className="rs-radio-group">
                    {["A,B,C,D", "R1,R2,R3"].map(opt => (
                      <div key={opt} className={`rs-radio-pill ${s.rackNamingStyle === opt ? "active" : ""}`}
                        onClick={() => set("rackNamingStyle", opt)}>{opt}</div>
                    ))}
                  </div>
                </div>
                <div className="rs-2col">
                  <div className="rs-field">
                    <label className="rs-label">Shelf Count</label>
                    <Stepper value={s.defaultShelfCount} onChange={v => set("defaultShelfCount", v)} min={1} max={20} />
                  </div>
                  <div className="rs-field">
                    <label className="rs-label">Slot Structure</label>
                    <select className="rs-select" value={s.defaultSlotStructure}
                      onChange={e => set("defaultSlotStructure", e.target.value)}>
                      {["2 Slots Per Shelf","4 Slots Per Shelf","6 Slots Per Shelf","8 Slots Per Shelf"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Settings */}
            <div className="rs-section">
              <SecHead icon="💊" bg="#f0fdf4" title="Inventory Settings" />
              <div className="rs-section-body">
                <div className="rs-2col">
                  <div className="rs-field">
                    <label className="rs-label">Max Medicines</label>
                    <Stepper value={s.maxMedicinesPerSlot} onChange={v => set("maxMedicinesPerSlot", v)} min={1} max={100} />
                  </div>
                  <div className="rs-field">
                    <label className="rs-label">Rack Capacity</label>
                    <Stepper value={s.rackCapacity} onChange={v => set("rackCapacity", v)} min={1} max={9999} />
                  </div>
                  <div className="rs-field">
                    <label className="rs-label">Low Stock Alert</label>
                    <Stepper value={s.lowStockThreshold} onChange={v => set("lowStockThreshold", v)} min={1} max={500} />
                  </div>
                  <div className="rs-field">
                    <label className="rs-label">Expiry Alert (Days)</label>
                    <Stepper value={s.expiryAlertDays} onChange={v => set("expiryAlertDays", v)} min={1} max={365} />
                  </div>
                </div>
                <div className="rs-divider" />
                <Toggle checked={s.allowMultipleMedicines} onChange={v => set("allowMultipleMedicines", v)}
                  label="Allow Multiple Medicines Per Slot" desc="Mix different medicines in a single slot" />
              </div>
            </div>

            {/* Barcode Settings */}
            <div className="rs-section">
              <SecHead icon="📊" bg="#fff7ed" title="Barcode Settings" />
              <div className="rs-section-body">
                <Toggle checked={s.enableRackBarcode} onChange={v => set("enableRackBarcode", v)}
                  label="Enable Rack Barcode" desc="Generate a scannable barcode for this rack" />
                {s.enableRackBarcode && (
                  <>
                    <div className="rs-field">
                      <label className="rs-label">Barcode Format</label>
                      <div className="rs-barcode-opts">
                        {BARCODE_FORMATS.map(f => (
                          <div key={f} className={`rs-barcode-chip ${s.barcodeFormat === f ? "active" : ""}`}
                            onClick={() => set("barcodeFormat", f)}>{f}</div>
                        ))}
                      </div>
                    </div>
                    <BarcodePreview id={s.rackId} format={s.barcodeFormat} />
                  </>
                )}
              </div>
            </div>

            {/* Display Settings — full width */}
            <div className="rs-section" style={{ gridColumn: "1 / -1" }}>
              <SecHead icon="🎨" bg="#fdf4ff" title="Display Settings" />
              <div className="rs-section-body" style={{ flexDirection: "row", flexWrap: "wrap", gap: 28, alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 240px" }}>
                  <div className="rs-label" style={{ marginBottom: 10 }}>Rack Note Color</div>
                  <div className="rs-color-grid">
                    {COLOR_OPTIONS.map(c => (
                      <div key={c.name} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div className={`rs-swatch ${s.rackNoteColor === c.name ? "active" : ""}`}
                          style={{ background: c.color }}
                          onClick={() => set("rackNoteColor", c.name)} />
                        <span className="rs-color-name">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flex: "1 1 240px", display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
                  <Toggle checked={s.enableNotifications} onChange={v => set("enableNotifications", v)}
                    label="Enable Notifications" desc="Receive alerts for low stock and expiry" />
                </div>
              </div>
            </div>

          </div>

          {/* Info banner */}
          <div className="rs-info-banner">
            ℹ️ These settings control rack storage structure and medication handling. Changes take effect after saving.
          </div>

          {/* Footer */}
          <div className="rs-footer">
            <div className="rs-footer-hint">Last modified: {new Date().toLocaleDateString()}</div>
            <div className="rs-btn-group">
              <button className="rs-btn rs-btn-ghost" onClick={handleReset}>↺ Reset</button>
              <button className="rs-btn rs-btn-primary" onClick={handleSave}>Save Settings →</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}