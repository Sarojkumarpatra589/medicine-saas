import { useState } from "react";
import "./style.css";

/* ══ SPARKLINE ══ */
const Sparkline = ({ vals, color }) => {
  const W = 80, H = 30, pad = 2;
  const mx = Math.max(...vals), mn = Math.min(...vals), range = mx - mn || 1;
  const pts = vals.map((v, i) => ({
    x: pad + (i / (vals.length - 1)) * (W - pad * 2),
    y: pad + (1 - (v - mn) / range) * (H - pad * 2),
  }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${d} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;
  const uid = `sp${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${uid})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill={color} stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
};

/* ══ DONUT RING ══ */
const DonutRing = ({ pct, size = 48, stroke = 5 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth={stroke}
        strokeDasharray={`${dash.toFixed(2)} ${(circ - dash).toFixed(2)}`} strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
      <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">{pct}%</text>
    </svg>
  );
};

/* ══ MINI BAR CHART ══ */
const MiniBar = ({ data }) => {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 52 }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
          <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", background: "rgba(255,255,255,.06)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: "100%", height: `${(d.v / max) * 100}%`,
              background: i === data.length - 1 ? "linear-gradient(180deg,#818cf8,#6d28d9)" : "rgba(255,255,255,.18)",
              borderRadius: 4
            }} />
          </div>
          <span style={{ fontSize: 8.5, color: "rgba(255,255,255,.4)", fontWeight: 600 }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
};

/* ══ CSS ══ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f0f3fa;
  --surface: #ffffff;
  --border: #e3e9f4;
  --border2: #cdd6ec;
  --t1: #0d1526;
  --t2: #2b3a55;
  --t3: #5a6b88;
  --t4: #94a3bc;
  --accent: #2563eb;
  --accent2: #6d28d9;
  --r: 16px;
  --rxs: 8px;
  --sh: 0 1px 2px rgba(0,0,0,.04), 0 4px 16px rgba(13,21,38,.06);
}
body { font-family: 'Outfit', sans-serif !important; background: var(--bg) !important; color: var(--t1); -webkit-font-smoothing: antialiased; }
.po-app { font-family: 'Outfit', sans-serif; background: var(--bg); min-height: 100vh; }

/* ── NAV ── */
.po-nav { background: var(--surface); border-bottom: 1px solid var(--border); padding: 0 28px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 200; margin-top:20px;} 
.po-nav-brand { display: flex; align-items: center; gap: 10px; }
.po-nav-ico { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 14px rgba(37,99,235,.35); flex-shrink: 0; }
.po-nav-title { font-size: 16px; font-weight: 800; color: var(--t1); letter-spacing: -.2px; }
.po-nav-right { display: flex; align-items: center; gap: 8px; }
.nbtn-ghost { height: 34px; padding: 0 14px; border-radius: var(--rxs); border: 1.5px solid var(--border); background: transparent; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; color: var(--t3); cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all .15s; white-space: nowrap; }
.nbtn-ghost:hover { border-color: var(--accent); color: var(--accent); background: #eff6ff; }
.nbtn-primary { height: 34px; padding: 0 16px; border-radius: var(--rxs); border: none; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 3px 12px rgba(37,99,235,.4); transition: all .15s; white-space: nowrap; }
.nbtn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.45); }

/* ── BODY ── */
.po-body { padding: 22px 28px 60px; max-width: 1600px; margin: 0 auto; }

/* ── METRIC CARDS ── */
.metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 18px; }
.mc { border-radius: var(--r); padding: 18px 20px; position: relative; overflow: hidden; cursor: default; transition: transform .2s, display: flex; flex-direction: column; justify-content: space-between; min-height: 140px; }
.mc:hover { transform: translateY(-3px); }
.mc-blue    { background: linear-gradient(145deg, #1e3a8a, #2563eb); box-shadow: 0 6px 24px rgba(37,99,235,.36); }
.mc-amber   { background: linear-gradient(145deg, #713f12, #d97706); box-shadow: 0 6px 24px rgba(217,119,6,.36); }
.mc-emerald { background: linear-gradient(145deg, #064e3b, #059669); box-shadow: 0 6px 24px rgba(5,150,105,.36); }
.mc-violet  { background: linear-gradient(145deg, #3b0764, #7c3aed); box-shadow: 0 6px 24px rgba(124,58,237,.36); }
.mc-blue:hover    { box-shadow: 0 12px 36px rgba(37,99,235,.5); }
.mc-amber:hover   { box-shadow: 0 12px 36px rgba(217,119,6,.5); }
.mc-emerald:hover { box-shadow: 0 12px 36px rgba(5,150,105,.5); }
.mc-violet:hover  { box-shadow: 0 12px 36px rgba(124,58,237,.5); }
.mc::after  { content:''; position:absolute; bottom:-24px; right:-24px; width:88px; height:88px; border-radius:50%; background:rgba(255,255,255,.05); pointer-events:none; }
.mc::before { content:''; position:absolute; top:-16px; left:42%; width:64px; height:64px; border-radius:50%; background:rgba(255,255,255,.04); pointer-events:none; }
.mc-top     { display:flex; align-items:flex-start; justify-content:space-between; position:relative; z-index:1; gap:8px; }
.mc-lbl     { font-size:10.5px; font-weight:700; color:rgba(255,255,255,.55); text-transform:uppercase; letter-spacing:.08em; margin-bottom:5px; }
.mc-val     { font-size:24px; font-weight:800; color:#fff; letter-spacing:-.5px; line-height:1; }
.mc-sub     { font-size:11px; color:rgba(255,255,255,.42); margin-top:3px; }
.mc-bottom  { display:flex; align-items:flex-end; justify-content:space-between; position:relative; z-index:1; margin-top:12px; }
.mc-tag     { display:inline-flex; align-items:center; gap:3px; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.2); color:#fff; font-size:10.5px; font-weight:700; padding:3px 9px; border-radius:20px; font-family:'Space Mono',monospace; }

/* ── ANALYTICS SECTION ── */
.analytics-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.an-card { border-radius: var(--r); padding: 18px 20px; position: relative; overflow: hidden; background: linear-gradient(145deg, #0f172a, #1e293b); border: 1px solid rgba(255,255,255,.07); box-shadow: 0 8px 32px rgba(0,0,0,.25); transition: transform .2s; }
.an-card:hover { transform: translateY(-2px); }
.an-card::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at top left, rgba(37,99,235,.12), transparent 60%); pointer-events:none; }
.an-title { font-size:11px; font-weight:700; color:rgba(255,255,255,.45); text-transform:uppercase; letter-spacing:.1em; margin-bottom:14px; position:relative; z-index:1; display:flex; align-items:center; gap:6px; }
.an-title-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.an-content { position: relative; z-index: 1; }


/* deliveries */
.dl-row { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }
.dl-row:last-child { margin-bottom: 0; }
.dl-icon { font-size: 13px; flex-shrink: 0; }
.dl-info { flex: 1; min-width: 0; }
.dl-name { font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,.76); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dl-date { font-size: 10.5px; color: rgba(255,255,255,.35); margin-top: 2px; }
.dl-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; flex-shrink: 0; }
.dl-badge-soon  { background: rgba(239,68,68,.18); color: #f87171; }
.dl-badge-ok    { background: rgba(16,185,129,.15); color: #34d399; }
.dl-badge-today { background: rgba(245,158,11,.18); color: #fbbf24; }

/* spend velocity */
.vel-numbers { display: flex; align-items: baseline; gap: 6px; margin-bottom: 12px; }
.vel-main  { font-size: 26px; font-weight: 800; color: #fff; font-family: 'Space Mono', monospace; line-height: 1; }
.vel-unit  { font-size: 12px; color: rgba(255,255,255,.4); font-weight: 600; }
.vel-trend { font-size: 11px; font-weight: 700; color: #34d399; background: rgba(16,185,129,.15); padding: 2px 8px; border-radius: 20px; }

/* ── STATUS STRIP ── */
.status-strip { background: var(--surface); border: 1px solid var(--border); padding: 12px 18px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 18px; }
.ss-chip { display: flex; align-items: center; gap: 9px; flex: 1; min-width: 90px; padding: 9px 12px; border-radius: 10px; background: var(--bg); border: 1.5px solid var(--border); transition: all .15s; cursor: default; }
.ss-chip:hover { border-color: var(--accent); background: #eff6ff; }
.ss-dot   { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ss-count { font-size: 17px; font-weight: 800; color: var(--t1); line-height: 1; font-family: 'Space Mono', monospace; }
.ss-lbl   { font-size: 10.5px; font-weight: 600; color: var(--t3); margin-top: 2px; }
.ss-div   { width: 1px; height: 30px; background: var(--border); flex-shrink: 0; }

/* ── FULL WIDTH TABLE ── */
.tbl-card { background: var(--surface); border: 1px solid var(--border); overflow: hidden; margin-bottom: 18px; }
.tbl-toolbar { padding: 12px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #fafbfe; }
.tbl-search { flex: 1; min-width: 160px; display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--rxs); padding: 8px 12px; transition: all .15s; }
.tbl-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.tbl-search input { border: none; background: transparent; outline: none; font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--t1); width: 100%; }
.tbl-search input::placeholder { color: var(--t4); }
.filter-pills { display: flex; gap: 4px; flex-wrap: wrap; }
.fp { padding: 6px 13px; border-radius: 20px; border: none; font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; transition: all .15s; background: var(--bg); color: var(--t3); white-space: nowrap; }
.fp.act { background: var(--accent); color: #fff; box-shadow: 0 2px 8px rgba(37,99,235,.3); }
.fp:hover:not(.act) { background: #eff6ff; color: var(--accent); }
.tbl-hd { padding: 11px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.tbl-hd-title { font-size: 14px; font-weight: 800; color: var(--t1); }
.tbl-count { font-size: 11.5px; font-weight: 700; color: var(--t4); background: var(--bg); border: 1px solid var(--border); padding: 3px 11px; border-radius: 20px; }
.tbl-wrap { width: 100%; overflow-x: auto; }
table.po-tbl { width: 100%; border-collapse: collapse; min-width: 660px; }
table.po-tbl thead th { padding: 10px 14px; text-align: left; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: var(--t4); background: #fafbfe; border-bottom: 1px solid var(--border); white-space: nowrap; }
table.po-tbl tbody td { padding: 11px 14px; font-size: 13px; color: var(--t2); vertical-align: middle; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
table.po-tbl tbody tr { border-bottom: 1px solid #f0f4fa; transition: background .1s; }
table.po-tbl tbody tr:last-child { border-bottom: none; }
table.po-tbl tbody tr:hover { background: #f4f8ff; }
.po-chip     { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: var(--accent); background: #eff6ff; padding: 4px 9px; border-radius: 6px; display: inline-block; }
.sup-name    { font-weight: 700; color: var(--t1); }
.date-txt    { color: var(--t3); font-size: 12px; font-family: 'Space Mono', monospace; }
.amt-txt     { font-weight: 800; color: var(--t1); font-family: 'Space Mono', monospace; font-size: 12.5px; }
.items-badge { font-size: 11.5px; font-weight: 700; color: var(--t3); background: var(--bg); border: 1px solid var(--border); padding: 3px 8px; border-radius: 6px; display: inline-block; }
.sta   { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
.sta-pnd { background: #fef9c3; color: #854d0e; }
.sta-cmp { background: #dcfce7; color: #14532d; }
.sta-par { background: #dbeafe; color: #1e3a8a; }
.sta-d   { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.d-pnd   { background: #d97706; }
.d-cmp   { background: #16a34a; }
.d-par   { background: #3b82f6; }
.act-row { display: flex; align-items: center; gap: 3px; }
.ab { height: 27px; padding: 0 9px; border-radius: 7px; border: 1.5px solid var(--border); background: var(--surface); font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700; color: var(--t2); cursor: pointer; transition: all .12s; display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; }
.ab:hover     { background: #eff6ff; border-color: var(--accent); color: var(--accent); }
.ab.del:hover { background: #fff1f2; border-color: #f43f5e; color: #e11d48; }
.ab.grn:hover { background: #f0fdf4; border-color: #22c55e; color: #16a34a; }
.tbl-pg { display: flex; align-items: center; justify-content: space-between; padding: 10px 18px; border-top: 1px solid var(--border); background: #fafbfe; flex-wrap: wrap; gap: 8px; }
.pg-info { font-size: 12px; color: var(--t4); }
.pg-btns { display: flex; gap: 3px; }
.pgb { min-width: 30px; height: 30px; padding: 0 5px; border-radius: 7px; border: 1.5px solid var(--border); background: var(--surface); font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; color: var(--t2); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all .12s; }
.pgb:hover:not(.pgb-a):not(:disabled) { background: #eff6ff; border-color: var(--accent); color: var(--accent); }
.pgb.pgb-a { background: var(--accent); color: #fff; border-color: var(--accent); }
.pgb:disabled { opacity: .3; cursor: not-allowed; }

/* ── MOBILE CARDS ── */
.po-card-list { display: none; flex-direction: column; gap: 1px; background: var(--border); }
.po-card { background: var(--surface); padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; }
.po-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.po-card-top-left { display: flex; flex-direction: column; gap: 3px; }
.po-card-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.po-card-meta-item { font-size: 11.5px; color: var(--t3); display: flex; align-items: center; gap: 3px; }
.po-card-bot { display: flex; align-items: center; justify-content: space-between; gap: 8px; }

/* ── BOTTOM ROW ── */
.bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-card { background: var(--surface); border: 1px solid var(--border);overflow: hidden; }
.form-card-hd { padding: 14px 18px; border-bottom: 1px solid var(--border); background: #fafbfe; display: flex; align-items: center; gap: 10px; }
.form-card-title { font-size: 14px; font-weight: 800; color: var(--t1); }
.form-card-sub { font-size: 11px; color: var(--t4); margin-top: 2px; }
.form-body { padding: 16px 18px; }
.form-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
.form-inner-full { grid-column: 1 / -1; }
.flbl { font-size: 10.5px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 5px; display: block; }
.req { color: #ef4444; }
.finp { width: 100%; padding: 8px 11px; border: 1.5px solid var(--border); border-radius: var(--rxs); font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--t1); background: var(--bg); outline: none; transition: all .15s; }
.finp:focus { border-color: var(--accent); background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.fgrp { margin-bottom: 12px; }
.fg2  { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.med-item { background: var(--bg); border: 1.5px solid var(--border); border-radius: 10px; padding: 11px; margin-bottom: 8px; }
.med-item-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.med-item-lbl { font-size: 10.5px; font-weight: 800; color: var(--accent); text-transform: uppercase; letter-spacing: .05em; }
.med-rm { background: #fff1f2; border: 1px solid #fecdd3; color: #e11d48; border-radius: 6px; padding: 2px 8px; font-size: 10.5px; font-weight: 700; cursor: pointer; font-family: 'Outfit', sans-serif; }
.med-rm:hover { background: #ffe4e6; }
.add-med { width: 100%; background: var(--bg); border: 1.5px dashed var(--border2); border-radius: var(--rxs); padding: 8px; font-family: 'Outfit', sans-serif; font-size: 12.5px; font-weight: 600; color: var(--t3); cursor: pointer; transition: all .15s; margin-bottom: 12px; }
.add-med:hover { border-color: var(--accent); color: var(--accent); background: #eff6ff; }
.totals-strip { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; }
.tot-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 12.5px; }
.tot-row:last-child { margin-bottom: 0; border-top: 1px solid var(--border); padding-top: 8px; margin-top: 2px; }
.tot-lbl { color: var(--t3); font-weight: 600; }
.tot-val { font-weight: 700; color: var(--t1); font-family: 'Space Mono', monospace; }
.tot-row.grand .tot-lbl { font-weight: 800; color: var(--t1); }
.tot-row.grand .tot-val { font-size: 14px; font-weight: 800; color: var(--accent); }
.form-actions { display: flex; gap: 8px; }
.btn-create { flex: 1; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; border-radius: var(--rxs); padding: 10px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .15s; box-shadow: 0 3px 10px rgba(37,99,235,.3); }
.btn-create:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(37,99,235,.4); }
.btn-reset { background: var(--bg); border: 1.5px solid var(--border); border-radius: var(--rxs); padding: 10px 14px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; color: var(--t3); cursor: pointer; }
.btn-reset:hover { border-color: var(--t4); }

/* ── TOP MEDS ── */
.top-card { background: var(--surface); border: 1px solid var(--border); overflow: hidden; }
.top-card-hd { padding: 14px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: #fafbfe; }
.top-card-title { font-size: 14px; font-weight: 800; color: var(--t1); }
.top-body { padding: 10px 18px 16px; }
.tm-row { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.tm-row:last-child { border-bottom: none; }
.tm-rank { width: 24px; height: 24px; border-radius: 7px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-size: 10px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.tm-info { flex: 1; min-width: 0; }
.tm-name { font-size: 13px; font-weight: 700; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tm-sub  { font-size: 11px; color: var(--t4); margin-top: 2px; }
.tm-track { height: 5px; background: var(--border); border-radius: 3px; margin-top: 6px; overflow: hidden; }
.tm-fill  { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--accent), var(--accent2)); }
.tm-amt   { font-size: 12.5px; font-weight: 800; color: var(--accent); min-width: 44px; text-align: right; flex-shrink: 0; font-family: 'Space Mono', monospace; }

/* ── MODAL ── */
.modal-bg { position: fixed; inset: 0; background: rgba(10,18,34,.6); z-index: 900; display: flex; align-items: center; justify-content: center; padding: 16px; backdrop-filter: blur(4px); animation: fi .2s ease; }
@keyframes fi { from { opacity: 0; } to { opacity: 1; } }
.modal-box { background: var(--surface); border-radius: 20px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(0,0,0,.22); animation: pop .22s cubic-bezier(.22,.68,0,1.2); }
@keyframes pop { from { transform: scale(.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-hd { padding: 18px 22px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.modal-title { font-size: 16px; font-weight: 800; color: var(--t1); }
.modal-close { background: var(--bg); border: none; width: 30px; height: 30px; border-radius: 8px; font-size: 16px; cursor: pointer; color: var(--t3); display: flex; align-items: center; justify-content: center; }
.modal-close:hover { background: #fee2e2; color: #e11d48; }
.modal-body { padding: 18px 22px; }
.modal-ft { padding: 14px 22px 18px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 8px; }
.modal-cancel { background: var(--bg); border: 1.5px solid var(--border); border-radius: var(--rxs); padding: 9px 18px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; color: var(--t3); cursor: pointer; }
.modal-submit { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; border-radius: var(--rxs); padding: 9px 22px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; box-shadow: 0 3px 10px rgba(37,99,235,.35); transition: all .15s; }
.modal-submit:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(37,99,235,.45); }

/* ── TOAST ── */
.toast-pop { position: fixed; bottom: 24px; right: 24px; background: var(--surface); border-radius: 14px; padding: 14px 18px; box-shadow: 0 10px 40px rgba(0,0,0,.15); display: flex; align-items: center; gap: 12px; min-width: 270px; max-width: calc(100vw - 48px); z-index: 9999; animation: tup .3s cubic-bezier(.4,0,.2,1); }
.toast-pop.ok  { border-left: 4px solid #10b981; }
.toast-pop.err { border-left: 4px solid #ef4444; }
@keyframes tup { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.t-ico   { font-size: 20px; flex-shrink: 0; }
.t-title { font-size: 13.5px; font-weight: 700; color: var(--t1); }
.t-sub   { font-size: 12px; color: var(--t4); margin-top: 2px; }

/* ══════════ RESPONSIVE ══════════ */
@media (max-width: 1100px) {
  .analytics-row { grid-template-columns: 1fr 1fr; }
  .analytics-row > :nth-child(3) { grid-column: 1 / -1; }
}
@media (max-width: 960px) {
  .metrics-row { grid-template-columns: repeat(2, 1fr); }
  .bottom-row  { grid-template-columns: 1fr; }
  .form-inner  { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .po-nav  { padding: 0 16px; }
  .po-body { padding: 14px 14px 50px; }
  .nbtn-ghost { display: none; }
  .metrics-row { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 14px; }
  .mc { min-height: 116px; padding: 14px 15px; }
  .mc-val { font-size: 20px; }
  .mc-sub { display: none; }
  .mc-bottom { margin-top: 10px; }
  .analytics-row { grid-template-columns: 1fr; }
  .analytics-row > :nth-child(3) { grid-column: auto; }
  .status-strip { padding: 10px 12px; gap: 5px; margin-bottom: 14px; }
  .ss-chip { padding: 8px 10px; flex: 1 1 70px; min-width: 70px; }
  .ss-count { font-size: 14px; }
  .ss-lbl { font-size: 10px; }
  .ss-div { display: none; }
  table.po-tbl { display: none; }
  .po-card-list { display: flex; }
  .tbl-toolbar { flex-direction: column; align-items: stretch; gap: 8px; padding: 10px 12px; }
  .filter-pills { gap: 3px; }
  .fp { font-size: 11px; padding: 5px 9px; }
  .tbl-hd { padding: 10px 14px; }
  .tbl-pg { padding: 10px 14px; }
  .form-body { padding: 13px 14px; }
  .top-body  { padding: 6px 14px 12px; }
}
@media (max-width: 480px) {
  .po-body { padding: 10px 10px 44px; }
  .po-nav-title { font-size: 14px; }
  .metrics-row { gap: 8px; margin-bottom: 12px; }
  .mc { padding: 12px 13px; min-height: 104px; }
  .mc-val { font-size: 18px; }
  .mc-lbl { font-size: 9.5px; }
  .mc-tag { font-size: 10px; padding: 2px 7px; }
  .status-strip { gap: 4px; padding: 8px 10px; margin-bottom: 12px; }
  .ss-chip { flex: 1 1 54px; min-width: 54px; padding: 6px 8px; }
  .ss-count { font-size: 13px; }
  .ss-lbl { font-size: 9px; }
  .nbtn-primary { font-size: 12px; padding: 0 12px; height: 32px; }
  .toast-pop { bottom: 14px; right: 14px; min-width: 220px; }
}
`;

/* ── DATA ── */
const INITIAL_PO = [
  { id: "PO-2026-001", supplier: "MedCo Pharmaceuticals",   orderDate: "2026-02-01", delivery: "2026-02-08", items: 12, amount: 38400,  status: "Completed" },
  { id: "PO-2026-002", supplier: "HealthPlus Distributors", orderDate: "2026-02-05", delivery: "2026-02-14", items: 8,  amount: 22800,  status: "Partially Received" },
  { id: "PO-2026-003", supplier: "PharmaNet Supplies",      orderDate: "2026-02-10", delivery: "2026-02-18", items: 15, amount: 54600,  status: "Pending" },
  { id: "PO-2026-004", supplier: "CureCraft Wholesale",     orderDate: "2026-02-12", delivery: "2026-02-20", items: 5,  amount: 11250,  status: "Pending" },
  { id: "PO-2026-005", supplier: "VitalMed Traders",        orderDate: "2026-02-15", delivery: "2026-02-22", items: 20, amount: 72000,  status: "Completed" },
  { id: "PO-2026-006", supplier: "MedCo Pharmaceuticals",   orderDate: "2026-02-18", delivery: "2026-02-26", items: 9,  amount: 29700,  status: "Partially Received" },
  { id: "PO-2026-007", supplier: "HealthPlus Distributors", orderDate: "2026-02-20", delivery: "2026-03-01", items: 14, amount: 46200,  status: "Pending" },
  { id: "PO-2026-008", supplier: "PharmaNet Supplies",      orderDate: "2026-02-22", delivery: "2026-03-03", items: 7,  amount: 18900,  status: "Pending" },
];

const TOP_MEDS = [
  { name: "Paracetamol 500mg", units: "4,200 strips", pct: 92, amount: "₹84K" },
  { name: "Amoxicillin 250mg", units: "2,800 caps",   pct: 76, amount: "₹56K" },
  { name: "Metformin 500mg",   units: "2,100 tabs",   pct: 64, amount: "₹42K" },
  { name: "Omeprazole 20mg",   units: "1,500 caps",   pct: 48, amount: "₹30K" },
  { name: "Cetirizine 10mg",   units: "900 tabs",     pct: 32, amount: "₹18K" },
];

const SUPPLIERS = ["MedCo Pharmaceuticals", "HealthPlus Distributors", "PharmaNet Supplies", "CureCraft Wholesale", "VitalMed Traders"];
const FILTERS   = ["all", "Pending", "Partially Received", "Completed"];
const PER_PAGE  = 6;

const METRICS = [
  { theme: "mc-blue",    label: "Monthly PO Value", value: "₹2,93,850", sub: "Last 30 days",     badge: "▲ 18.4%", spark: [40,55,48,70,62,80,72,90,84,100,92,108], donut: 74 },
  { theme: "mc-amber",   label: "Pending Orders",   value: "4",          sub: "Awaiting delivery", badge: "▼ 5.2%",  spark: [8,6,9,5,7,4,6,5,7,4,5,4],             donut: 50 },
  { theme: "mc-emerald", label: "Completed POs",    value: "2",          sub: "Fully received",    badge: "▲ 25%",   spark: [1,2,1,3,2,4,3,4,3,5,4,2],             donut: 25 },
  { theme: "mc-violet",  label: "Total Orders",     value: "8",          sub: "All suppliers",     badge: "▲ 12.1%", spark: [3,4,5,6,5,7,6,8,7,9,8,8],             donut: 100 },
];

const SUPPLIER_HEALTH = [
  { name: "MedCo Pharma", pct: 88, color: "#34d399" },
  { name: "HealthPlus",   pct: 62, color: "#fbbf24" },
  { name: "PharmaNet",    pct: 75, color: "#60a5fa" },
  { name: "CureCraft",    pct: 91, color: "#34d399" },
  { name: "VitalMed",     pct: 48, color: "#f87171" },
];

const DELIVERIES = [
  { id: "PO-002", supplier: "HealthPlus Distributors", date: "Feb 14", badge: "today", icon: "🟡" },
  { id: "PO-003", supplier: "PharmaNet Supplies",      date: "Feb 18", badge: "soon",  icon: "🔴" },
  { id: "PO-004", supplier: "CureCraft Wholesale",     date: "Feb 20", badge: "soon",  icon: "🔴" },
  { id: "PO-007", supplier: "HealthPlus Distributors", date: "Mar 01", badge: "ok",    icon: "🟢" },
];

const MONTHLY_SPEND = [
  { l: "Oct", v: 180 }, { l: "Nov", v: 210 }, { l: "Dec", v: 195 }, { l: "Jan", v: 245 }, { l: "Feb", v: 294 },
];

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");
const blank = () => ({ name: "", qty: "", rate: "" });

function statusInfo(s) {
  if (s === "Completed")          return { cls: "sta-cmp", dot: "d-cmp" };
  if (s === "Partially Received") return { cls: "sta-par", dot: "d-par" };
  return { cls: "sta-pnd", dot: "d-pnd" };
}

export default function PurchaseOrders() {
  const [poList, setPoList] = useState(INITIAL_PO);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  const [toast,  setToast]  = useState(null);
  const [modal,  setModal]  = useState(false);
  const [sup,    setSup]    = useState("");
  const [del,    setDel]    = useState("");
  const [meds,   setMeds]   = useState([blank()]);
  const [mSup,   setMSup]   = useState("");
  const [mOrd,   setMOrd]   = useState(new Date().toISOString().slice(0, 10));
  const [mDel,   setMDel]   = useState("");
  const [mMeds,  setMMeds]  = useState([blank()]);

  const fire = (title, sub, type = "ok") => { setToast({ title, sub, type }); setTimeout(() => setToast(null), 3500); };
  const chg  = (lst, set, i, k, v) => { const u = [...lst]; u[i] = { ...u[i], [k]: v }; set(u); };

  const all_rows = poList
    .filter(p => filter === "all" || p.status === filter)
    .filter(p => p.supplier.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  const totalPgs = Math.max(1, Math.ceil(all_rows.length / PER_PAGE));
  const safePg   = Math.min(page, totalPgs);
  const rows     = all_rows.slice((safePg - 1) * PER_PAGE, safePg * PER_PAGE);
  const startE   = all_rows.length ? (safePg - 1) * PER_PAGE + 1 : 0;
  const endE     = Math.min(safePg * PER_PAGE, all_rows.length);
  const go       = p => { if (p >= 1 && p <= totalPgs) setPage(p); };

  const sub_t   = meds.reduce((s, m) => s + (parseFloat(m.qty) || 0) * (parseFloat(m.rate) || 0), 0);
  const gst_t   = sub_t * .18;
  const grand_t = sub_t + gst_t;

  const doCreate = () => {
    if (!sup) { fire("Select a supplier", "Please choose a supplier first.", "err"); return; }
    const valid = meds.filter(m => m.name && parseFloat(m.qty) > 0);
    if (!valid.length) { fire("No medicines", "Add at least one medicine with qty.", "err"); return; }
    const id = `PO-2026-${String(poList.length + 1).padStart(3, "0")}`;
    setPoList([{ id, supplier: sup, orderDate: new Date().toISOString().slice(0, 10), delivery: del || "TBD", items: valid.length, amount: Math.round(grand_t), status: "Pending" }, ...poList]);
    setSup(""); setDel(""); setMeds([blank()]);
    fire("PO Created!", `${id} added successfully.`);
  };

  const doModalCreate = () => {
    const id = `PO-2026-${String(poList.length + 1).padStart(3, "0")}`;
    setPoList([{ id, supplier: mSup || "New Supplier", orderDate: mOrd, delivery: mDel || "TBD", items: mMeds.length, amount: 0, status: "Pending" }, ...poList]);
    setModal(false); setMSup(""); setMDel(""); setMMeds([blank()]);
    fire("PO Created!", `${id} has been added.`);
  };

  const pending  = poList.filter(p => p.status === "Pending").length;
  const partial  = poList.filter(p => p.status === "Partially Received").length;
  const complete = poList.filter(p => p.status === "Completed").length;

  const badgeCls = b => b === "today" ? "dl-badge-today" : b === "soon" ? "dl-badge-soon" : "dl-badge-ok";
  const badgeLbl = b => b === "today" ? "Due Today" : b === "soon" ? "Due Soon" : "On Track";

  return (
    <>
      <style>{CSS}</style>
      <div className="po-app">

        {/* NAV */}
        <nav className="po-nav mx-4 box_shadow">
          <div className="po-nav-brand">
            <div className="po-nav-ico">📦</div>
            <span className="po-nav-title">Purchase Orders</span>
          </div>
          <div className="po-nav-right">
            <button className="nbtn-ghost" onClick={() => window.print()}>🖨️ Export</button>
            <button className="nbtn-primary" onClick={() => setModal(true)}>＋ New PO</button>
          </div>
        </nav>

        <div className="po-body">

          {/* METRIC CARDS */}
          <div className="metrics-row ">
            {METRICS.map((m, i) => (
              <div className={`mc box_shadow ${m.theme}`} key={i}>
                <div className="mc-top">
                  <div>
                    <div className="mc-lbl">{m.label}</div>
                    <div className="mc-val">{m.value}</div>
                    <div className="mc-sub">{m.sub}</div>
                  </div>
                  <DonutRing pct={m.donut} size={48} stroke={5} />
                </div>
                <div className="mc-bottom">
                  <span className="mc-tag">{m.badge}</span>
                  <Sparkline vals={m.spark} color="rgba(255,255,255,0.8)" />
                </div>
              </div>
            ))}
          </div>


          {/* STATUS STRIP */}
          <div className="status-strip box_shadow">
            {[
              { count: poList.length, lbl: "Total Orders", col: "#2563eb" },
              { count: pending,       lbl: "Pending",      col: "#d97706" },
              { count: partial,       lbl: "Partial",      col: "#3b82f6" },
              { count: complete,      lbl: "Completed",    col: "#16a34a" },
              { count: fmt(poList.reduce((s, p) => s + p.amount, 0)), lbl: "Total Value", col: "#7c3aed" },
            ].map((s, i, arr) => (
              <div key={i} style={{ display: "contents" }}>
                <div className="ss-chip">
                  <div className="ss-dot" style={{ background: s.col }} />
                  <div>
                    <div className="ss-count" style={{ color: i > 0 ? s.col : "var(--t1)" }}>{s.count}</div>
                    <div className="ss-lbl">{s.lbl}</div>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="ss-div" />}
              </div>
            ))}
          </div>

          {/* FULL WIDTH TABLE */}
          <div className="tbl-card box_shadow">
            <div className="tbl-toolbar">
              <div className="tbl-search">
                <span style={{ color: "#94a3b8", fontSize: 14, flexShrink: 0 }}>🔍</span>
                <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search supplier or PO number…" />
              </div>
              <div className="filter-pills">
                {FILTERS.map(f => (
                  <button key={f} className={`fp${filter === f ? " act" : ""}`} onClick={() => { setFilter(f); setPage(1); }}>
                    {f === "all" ? "All" : f === "Partially Received" ? "Partial" : f}
                  </button>
                ))}
              </div>
            </div>

            <div className="tbl-hd">
              <span className="tbl-hd-title">Order List</span>
              <span className="tbl-count">{all_rows.length} orders</span>
            </div>

            <div className="tbl-wrap">
              <table className="po-tbl">
                <thead>
                  <tr>
                    <th style={{ width: 110 }}>PO #</th>
                    <th>Supplier</th>
                    <th style={{ width: 102 }}>Order Date</th>
                    <th style={{ width: 102 }}>Delivery</th>
                    <th style={{ width: 56 }}>Items</th>
                    <th style={{ width: 110 }}>Amount</th>
                    <th style={{ width: 118 }}>Status</th>
                    <th style={{ width: 116, textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0
                    ? <tr><td colSpan={8} style={{ textAlign: "center", padding: "36px", color: "#94a3b8" }}>No orders found.</td></tr>
                    : rows.map((po, i) => {
                        const { cls, dot } = statusInfo(po.status);
                        return (
                          <tr key={i}>
                            <td><span className="po-chip">{po.id.replace("PO-2026-", "#")}</span></td>
                            <td><span className="sup-name">{po.supplier}</span></td>
                            <td><span className="date-txt">{po.orderDate}</span></td>
                            <td><span className="date-txt">{po.delivery}</span></td>
                            <td><span className="items-badge">{po.items}</span></td>
                            <td><span className="amt-txt">{fmt(po.amount)}</span></td>
                            <td><span className={`sta ${cls}`}><span className={`sta-d ${dot}`} />{po.status === "Partially Received" ? "Partial" : po.status}</span></td>
                            <td>
                              <div className="act-row" style={{ justifyContent: "center" }}>
                                <button className="ab grn" onClick={() => fire("GRN Processing", `Converting ${po.id}…`)}>GRN</button>
                                <button className="ab" onClick={() => fire("View PO", `Opening ${po.id}`)}>👁</button>
                                <button className="ab del" onClick={() => { setPoList(poList.filter(p => p.id !== po.id)); fire("Cancelled", `${po.id} removed.`, "err"); }}>✕</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="po-card-list">
              {rows.length === 0
                ? <div style={{ textAlign: "center", padding: "32px", color: "#94a3b8", background: "var(--surface)" }}>No orders found.</div>
                : rows.map((po, i) => {
                    const { cls, dot } = statusInfo(po.status);
                    return (
                      <div className="po-card" key={i}>
                        <div className="po-card-top">
                          <div className="po-card-top-left">
                            <span className="po-chip">{po.id}</span>
                            <span className="sup-name" style={{ fontSize: 13, marginTop: 2 }}>{po.supplier}</span>
                          </div>
                          <span className={`sta ${cls}`}><span className={`sta-d ${dot}`} />{po.status === "Partially Received" ? "Partial" : po.status}</span>
                        </div>
                        <div className="po-card-meta">
                          <span className="po-card-meta-item">📅 {po.orderDate}</span>
                          <span className="po-card-meta-item">🚚 {po.delivery}</span>
                          <span className="po-card-meta-item">💊 {po.items} items</span>
                        </div>
                        <div className="po-card-bot">
                          <span className="amt-txt">{fmt(po.amount)}</span>
                          <div className="act-row">
                            <button className="ab grn" onClick={() => fire("GRN Processing", `Converting ${po.id}…`)}>GRN</button>
                            <button className="ab" onClick={() => fire("View PO", `Opening ${po.id}`)}>👁</button>
                            <button className="ab del" onClick={() => { setPoList(poList.filter(p => p.id !== po.id)); fire("Cancelled", `${po.id} removed.`, "err"); }}>✕</button>
                          </div>
                        </div>
                      </div>
                    );
                  })
              }
            </div>

            <div className="tbl-pg">
              <span className="pg-info">{all_rows.length === 0 ? "No entries" : `${startE}–${endE} of ${all_rows.length}`}</span>
              <div className="pg-btns">
                <button className="pgb" onClick={() => go(safePg - 1)} disabled={safePg === 1}>‹</button>
                {Array.from({ length: totalPgs }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`pgb${p === safePg ? " pgb-a" : ""}`} onClick={() => go(p)}>{p}</button>
                ))}
                <button className="pgb" onClick={() => go(safePg + 1)} disabled={safePg === totalPgs}>›</button>
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW: Quick Create + Top Purchased ── */}
          <div className="bottom-row">

            {/* Quick Create PO */}
            <div className="form-card box_shadow">
              <div className="form-card-hd ">
                <div className="po-nav-ico" style={{ width: 28, height: 28, fontSize: 13, borderRadius: 8 }}>⚡</div>
                <div>
                  <div className="form-card-title">Quick Create PO</div>
                  <div className="form-card-sub">Fill details to create a new order</div>
                </div>
              </div>
              <div className="form-body">
                <div className="form-inner">
                  <div className="fgrp form-inner-full">
                    <label className="flbl">Supplier <span className="req">*</span></label>
                    <select className="finp" value={sup} onChange={e => setSup(e.target.value)}>
                      <option value="">— Choose —</option>
                      {SUPPLIERS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="fgrp">
                    <label className="flbl">Expected Delivery</label>
                    <input type="date" className="finp" value={del} onChange={e => setDel(e.target.value)} />
                  </div>
                  <div className="fgrp">
                    <div className="totals-strip" style={{ marginBottom: 0 }}>
                      <div className="tot-row"><span className="tot-lbl">Subtotal</span><span className="tot-val">{fmt(Math.round(sub_t))}</span></div>
                      <div className="tot-row"><span className="tot-lbl">GST 18%</span><span className="tot-val">{fmt(Math.round(gst_t))}</span></div>
                      <div className="tot-row grand"><span className="tot-lbl">Grand Total</span><span className="tot-val">{fmt(Math.round(grand_t))}</span></div>
                    </div>
                  </div>
                </div>

                <div className="fgrp" style={{ marginBottom: 4 }}>
                  <label className="flbl" style={{ marginBottom: 8 }}>Medicines</label>
                  {meds.map((m, i) => (
                    <div className="med-item" key={i}>
                      <div className="med-item-hd">
                        <span className="med-item-lbl">Med #{i + 1}</span>
                        {meds.length > 1 && <button className="med-rm" onClick={() => setMeds(meds.filter((_, idx) => idx !== i))}>× Remove</button>}
                      </div>
                      <div style={{ marginBottom: 7 }}>
                        <input className="finp" placeholder="Medicine name" value={m.name} onChange={e => chg(meds, setMeds, i, "name", e.target.value)} />
                      </div>
                      <div className="fg2">
                        <div><label className="flbl">Qty</label><input type="number" className="finp" placeholder="0" value={m.qty} onChange={e => chg(meds, setMeds, i, "qty", e.target.value)} /></div>
                        <div><label className="flbl">Rate ₹</label><input type="number" className="finp" placeholder="0.00" value={m.rate} onChange={e => chg(meds, setMeds, i, "rate", e.target.value)} /></div>
                      </div>
                    </div>
                  ))}
                  <button className="add-med" onClick={() => setMeds([...meds, blank()])}>＋ Add Medicine</button>
                </div>

                <div className="form-actions">
                  <button className="btn-create" onClick={doCreate}>Create Purchase Order</button>
                  <button className="btn-reset" onClick={() => { setSup(""); setDel(""); setMeds([blank()]); }}>✕</button>
                </div>
              </div>
            </div>

            {/* Top Purchased */}
            <div className="top-card box_shadow">
              <div className="top-card-hd">
                <span className="top-card-title">🏆 Top Purchased Medicines</span>
                <span style={{ fontSize: 11, color: "var(--t4)", fontWeight: 600 }}>Feb 2026</span>
              </div>
              <div className="top-body">
                {TOP_MEDS.map((m, i) => (
                  <div className="tm-row" key={i}>
                    <div className="tm-rank">{i + 1}</div>
                    <div className="tm-info">
                      <div className="tm-name">{m.name}</div>
                      <div className="tm-sub">{m.units}</div>
                      <div className="tm-track"><div className="tm-fill" style={{ width: `${m.pct}%` }} /></div>
                    </div>
                    <div className="tm-amt">{m.amount}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--border)", padding: "12px 18px", display: "flex", gap: 10 }}>
                {[
                  { label: "SKUs Ordered",   val: "47",  icon: "💊" },
                  { label: "Reorder Alerts", val: "3",   icon: "⚠️" },
                  { label: "Avg Lead Days",  val: "6.2", icon: "📦" },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                    <div style={{ fontSize: 16 }}>{s.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--t1)", fontFamily: "'Space Mono',monospace", marginTop: 4 }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: "var(--t4)", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* MODAL */}
        {modal && (
          <div className="modal-bg" onClick={() => setModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-hd">
                <span className="modal-title">📋 New Purchase Order</span>
                <button className="modal-close" onClick={() => setModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="fgrp">
                  <label className="flbl">Supplier</label>
                  <select className="finp" value={mSup} onChange={e => setMSup(e.target.value)}>
                    <option value="">— Select —</option>
                    {SUPPLIERS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="fg2" style={{ marginBottom: 12 }}>
                  <div><label className="flbl">Order Date</label><input type="date" className="finp" value={mOrd} onChange={e => setMOrd(e.target.value)} /></div>
                  <div><label className="flbl">Exp. Delivery</label><input type="date" className="finp" value={mDel} onChange={e => setMDel(e.target.value)} /></div>
                </div>
                <label className="flbl" style={{ marginBottom: 8 }}>Medicines</label>
                {mMeds.map((m, i) => (
                  <div className="med-item" key={i}>
                    <div className="med-item-hd">
                      <span className="med-item-lbl">Med #{i + 1}</span>
                      {mMeds.length > 1 && <button className="med-rm" onClick={() => setMMeds(mMeds.filter((_, idx) => idx !== i))}>× Remove</button>}
                    </div>
                    <div style={{ marginBottom: 7 }}><input className="finp" placeholder="Medicine name" value={m.name} onChange={e => chg(mMeds, setMMeds, i, "name", e.target.value)} /></div>
                    <div className="fg2">
                      <input type="number" className="finp" placeholder="Qty" value={m.qty} onChange={e => chg(mMeds, setMMeds, i, "qty", e.target.value)} />
                      <input type="number" className="finp" placeholder="Rate ₹" value={m.rate} onChange={e => chg(mMeds, setMMeds, i, "rate", e.target.value)} />
                    </div>
                  </div>
                ))}
                <button className="add-med" style={{ marginTop: 4 }} onClick={() => setMMeds([...mMeds, blank()])}>+ Add Medicine</button>
              </div>
              <div className="modal-ft">
                <button className="modal-cancel" onClick={() => setModal(false)}>Cancel</button>
                <button className="modal-submit" onClick={doModalCreate}>✓ Create PO</button>
              </div>
            </div>
          </div>
        )}

        {/* TOAST */}
        {toast && (
          <div className={`toast-pop ${toast.type}`}>
            <span className="t-ico">{toast.type === "ok" ? "✅" : "❌"}</span>
            <div>
              <div className="t-title">{toast.title}</div>
              <div className="t-sub">{toast.sub}</div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}