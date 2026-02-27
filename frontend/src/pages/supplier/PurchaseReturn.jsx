import { useState } from "react";
import "./style.css";

/* ── Sparkline ── */
const Sparkline = ({ vals, color }) => {
  const W = 72, H = 34, pad = 2;
  const mx = Math.max(...vals), mn = Math.min(...vals);
  const range = mx - mn || 1;
  const pts = vals.map((v, i) => ({
    x: pad + (i / (vals.length - 1)) * (W - pad * 2),
    y: pad + (1 - (v - mn) / range) * (H - pad * 2),
  }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${d} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;
  const uid = `sp${color.replace(/[^a-z0-9]/gi, "").slice(0, 6)}${Math.random().toString(36).slice(2, 5)}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${uid})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.2" fill={color} stroke="#fff" strokeWidth="1.8" />
    </svg>
  );
};

/* ── Monthly Area Chart ── */
const MonthlyAreaChart = () => {
  const data = [
    { m: "Jan", v: 62 }, { m: "Feb", v: 78 }, { m: "Mar", v: 55 }, { m: "Apr", v: 91 },
    { m: "May", v: 100 }, { m: "Jun", v: 84 }, { m: "Jul", v: 110 }, { m: "Aug", v: 95 },
    { m: "Sep", v: 120 }, { m: "Oct", v: 88 }, { m: "Nov", v: 105 }, { m: "Dec", v: 100 },
  ];
  const W = 320, H = 110, pad = 8;
  const maxV = Math.max(...data.map(d => d.v));
  const pts = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: pad + (1 - d.v / maxV) * (H - pad * 2),
    ...d,
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;
  return (
    <svg width="100%" height={H + 22} viewBox={`0 0 ${W} ${H + 22}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="mcg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((r, i) => (
        <line key={i} x1={pad} y1={pad + r * (H - pad * 2)} x2={W - pad} y2={pad + r * (H - pad * 2)}
          stroke="#f1f5f9" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#mcg)" />
      <path d={line} fill="none" stroke="#6366f1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[4].x} cy={pts[4].y} r="5.5" fill="#6366f1" stroke="#fff" strokeWidth="2.5" />
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={H + 18} textAnchor="middle"
          fontSize="8.5" fill={i === 4 ? "#6366f1" : "#94a3b8"} fontWeight={i === 4 ? "800" : "400"}>
          {p.m.slice(0, 3)}
        </text>
      ))}
    </svg>
  );
};

/* ── Donut ── */
const DonutChart = ({ pct = 8.5, color = "#10b981" }) => {
  const r = 38, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#f1f5f9" strokeWidth="11" />
      <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="11"
        strokeDasharray={`${dash.toFixed(2)} ${(circ - dash).toFixed(2)}`} strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "center", filter: `drop-shadow(0 0 6px ${color}55)` }} />
    </svg>
  );
};

/* ═══════════════════════ CSS ═══════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f0f3f9;
  --card: #ffffff;
  --border: #e8edf5;
  --border2: #dde4ef;
  --t1: #0d1526;
  --t2: #2e3d55;
  --t3: #637085;
  --t4: #9ba8bc;
  --r: 16px;
  --rsm: 10px;
  --rxs: 8px;
  --sh: 0 2px 14px rgba(13,21,38,0.07);
  --sh-lg: 0 10px 36px rgba(13,21,38,0.13);
}

body { font-family: 'Plus Jakarta Sans', sans-serif !important; background: var(--bg) !important; }
.app { font-family: ''Inter', sans-serif', sans-serif; background: var(--bg); min-height: 100vh; }

/* ── TOPBAR ── */
.headbar {
  position: sticky;
  top: 0;
  z-index: 500;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
}
.tb-brand { display: flex; align-items: center; gap: 12px; }
.tb-logo {
  width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(140deg,#3730a3,#6366f1);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 19px;
  box-shadow: 0 4px 14px rgba(99,102,241,0.38);
}
.tb-name { font-size: 18px; font-weight: 800; color: var(--t1); letter-spacing: -.3px; }
.tb-sub  { font-size: 11.5px; color: var(--t4); margin-top: 1px; }
.tb-right { display: flex; align-items: center; gap: 8px; }
.btn-ghost {
  height: 36px; padding: 0 14px; border-radius: var(--rxs);
  border: 1.5px solid var(--border2); background: transparent;
  color: var(--t3); font-family: inherit; font-size: 13px; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all .15s;
}
.btn-ghost:hover { border-color: #6366f1; background: #eef2ff; color: #4338ca; }
.btn-primary {
  height: 36px; padding: 0 18px; border-radius: var(--rxs); border: none;
  background: linear-gradient(135deg,#4338ca,#6366f1);
  color: #fff; font-family: inherit; font-size: 13px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; gap: 6px;
  box-shadow: 0 3px 12px rgba(99,102,241,0.4); transition: all .16s;
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(99,102,241,0.5); }
.tb-av {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg,#4338ca,#818cf8);
  color: #fff; font-weight: 800; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; box-shadow: 0 2px 8px rgba(99,102,241,0.3);
}
@media(max-width:680px) { .topbar { padding: 0 14px; } .tb-sub { display: none; } }

/* ── BODY ── */
.body { padding: 22px 24px 48px; }
@media(max-width:576px) { .body { padding: 12px 12px 32px; } }

/* ══ STAT CARDS ══ */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 14px;
  margin-bottom: 20px;
}
@media(max-width:1100px) { .cards-grid { grid-template-columns: repeat(2,1fr); } }
@media(max-width:560px)  { .cards-grid { grid-template-columns: 1fr; } }

.scard {
  background: var(--card);
  border: 1px solid var(--border);
  overflow: hidden;
  position: relative;
  transition: transform .24s cubic-bezier(.22,.68,0,1.15);
  cursor: default;
}
.scard:hover { transform: translateY(-5px); box-shadow: var(--sh-lg); }

.scard-bar {
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px;
}
.scard-wash {
  position: absolute; top: 0; right: 0;
  width: 120px; height: 120px; border-radius: 50%;
  opacity: 0.055; pointer-events: none;
  transform: translate(36px,-36px);
}
.scard-inner { position: relative; z-index: 1; padding: 18px 18px 14px 22px; }

.scard-r1 {
  display: flex; align-items: flex-start;
  justify-content: space-between; margin-bottom: 14px;
}
.scard-icon {
  width: 48px; height: 48px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}
.scard-badge {
  font-size: 11px; font-weight: 700; padding: 4px 10px;
  border-radius: 20px; display: inline-flex; align-items: center; gap: 3px;
}
.b-up   { background: #dcfce7; color: #15803d; }
.b-down { background: #fee2e2; color: #b91c1c; }
.b-ok   { background: #dbeafe; color: #1d4ed8; }

.scard-lbl { font-size: 12px; font-weight: 500; color: var(--t3); margin-bottom: 8px; }

.scard-r2 { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
.scard-val    { font-size: 27px; font-weight: 800; color: var(--t1); letter-spacing: -1px; line-height: 1; }
.scard-val-sm { font-size: 17px; font-weight: 700; color: var(--t1); line-height: 1.3; }
.scard-hint   { font-size: 11px; color: var(--t4); margin-top: 5px; }

.scard-foot {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 18px 9px 22px;
  border-top: 1px solid var(--border);
  background: #fafbfd;
}
.scard-foot-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; animation: blink 2.2s infinite; }
@keyframes blink { 0%,100% { opacity:1 } 55% { opacity:.3 } }
.scard-foot-txt { font-size: 11px; color: var(--t4); font-weight: 500; }

/* ══ MAIN GRID ══ */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 375px;
  gap: 16px;
  margin-bottom: 20px;
  align-items: start;        /* ← key: don't stretch children to equal height */
}
@media(max-width:1200px) { .main-grid { grid-template-columns: 1fr; } }

/* ══ TABLE BLOCK ══ */
.tbl-block {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  overflow: hidden;
  /* no height:100% — let it shrink-wrap to table content */
}

.fbar {
  padding: 12px 16px;
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  border-bottom: 1px solid var(--border); background: #fafbfd;
}
.fsearch {
  flex: 1; min-width: 180px;
  display: flex; align-items: center; gap: 8px;
  background: #fff; border: 1.5px solid var(--border2);
  border-radius: var(--rxs); padding: 8px 12px; transition: all .15s;
}
.fsearch:focus-within { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
.fsearch input { border: none; background: transparent; outline: none; font-family: inherit; font-size: 13.5px; color: var(--t1); width: 100%; }
.fsearch input::placeholder { color: var(--t4); }
.fsel {
  background: #fff; border: 1.5px solid var(--border2);
  border-radius: var(--rxs); padding: 8px 12px;
  font-family: inherit; font-size: 13px; color: var(--t2); outline: none; cursor: pointer;
}
.ffbtn {
  background: linear-gradient(135deg,#4338ca,#6366f1);
  color: #fff; border: none; border-radius: var(--rxs);
  padding: 8px 18px; font-family: inherit; font-size: 13px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; gap: 5px;
  box-shadow: 0 2px 8px rgba(99,102,241,0.3); transition: opacity .14s;
}
.ffbtn:hover { opacity: .88; }

.tcard-hd {
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.tcard-title { font-size: 14.5px; font-weight: 800; color: var(--t1); }
.tcard-badge {
  background: #f1f5f9; color: var(--t3);
  border: 1px solid var(--border); font-size: 12px; font-weight: 600;
  padding: 3px 12px; border-radius: 20px;
}

table.rtbl { width: 100%; border-collapse: collapse; }
table.rtbl thead tr { background: #fafbfd; }
table.rtbl thead th {
  padding: 11px 16px; text-align: left;
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .6px; color: var(--t4);
  border-bottom: 1px solid var(--border); white-space: nowrap;
}
table.rtbl tbody tr { border-bottom: 1px solid #f1f5fb; transition: background .1s; }
table.rtbl tbody tr:last-child { border-bottom: none; }
table.rtbl tbody tr:hover { background: #f5f6ff; }
table.rtbl tbody td {
  padding: 13px 16px; vertical-align: middle;
  font-size: 13px; color: var(--t2); white-space: nowrap;
}
.t-rno {
  font-size: 11.5px; font-weight: 700;
  color: #4338ca; background: #eef2ff;
  padding: 4px 10px; border-radius: 6px; display: inline-block;
}
.t-sup  { font-weight: 700; color: var(--t1); font-size: 13px; }
.t-date { color: var(--t3); font-size: 12.5px; }
.t-rsn  {
  display: inline-block; background: #f8fafc;
  border: 1px solid var(--border); color: var(--t2);
  font-size: 11.5px; font-weight: 600; padding: 3px 10px; border-radius: 6px;
}
.t-amt  { font-weight: 700; color: var(--t1); font-size: 13.5px; }

.sta-chip { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 700; padding: 4px 11px; border-radius: 20px; }
.sta-adj  { background: #dcfce7; color: #166534; }
.sta-pnd  { background: #fef9c3; color: #854d0e; }
.sta-dot  { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.dot-adj  { background: #22c55e; }
.dot-pnd  { background: #eab308; }

.act-g { display: flex; align-items: center; gap: 4px; justify-content: center; }
.abt {
  width: 30px; height: 30px; border-radius: var(--rxs);
  border: 1.5px solid var(--border2); background: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 13px; transition: all .12s;
}
.abt:hover     { background: #eef2ff; border-color: #6366f1; }
.abt.del:hover { background: #fff1f2; border-color: #f43f5e; }
.abt.edt:hover { background: #fef9c3; border-color: #eab308; }

.pgbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 20px; border-top: 1px solid var(--border);
  background: #fafbfd; flex-wrap: wrap; gap: 8px;
}
.pgbar-info { font-size: 12.5px; color: var(--t4); }
.pg-btns { display: flex; align-items: center; gap: 3px; }
.pgb {
  min-width: 32px; height: 32px; padding: 0 6px; border-radius: var(--rxs);
  border: 1.5px solid var(--border2); background: #fff;
  font-family: inherit; font-size: 13px; font-weight: 600; color: var(--t2);
  display: inline-flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .12s;
}
.pgb:hover:not(.pgb-a):not(:disabled) { background: #eef2ff; border-color: #6366f1; color: #4338ca; }
.pgb.pgb-a { background: #4338ca; color: #fff; border-color: #4338ca; }
.pgb:disabled { opacity: .3; cursor: not-allowed; }

/* ══ FORM CARD ══ */
.fcard {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  overflow: hidden;
  /* no h:100% — shrink-wraps to content */
}
.fcard-hd {
  padding: 18px 20px;
  background: linear-gradient(140deg,#1e1b4b 0%,#312e81 50%,#4f46e5 100%);
  position: relative; overflow: hidden;
}
.fcard-hd::before {
  content:''; position:absolute; top:-24px; right:-24px;
  width:96px; height:96px; border-radius:50%; background:rgba(255,255,255,0.07);
}
.fcard-hd::after {
  content:''; position:absolute; bottom:-20px; left:-12px;
  width:72px; height:72px; border-radius:50%; background:rgba(255,255,255,0.05);
}
.fcard-hd-c { position: relative; z-index: 1; }
.fcard-hd-t { font-size: 15.5px; font-weight: 800; color: #fff; }
.fcard-hd-s { font-size: 12px; color: rgba(255,255,255,0.55); margin-top: 2px; }

.fcard-body { padding: 18px; }
.flbl { font-size: 11px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; display: block; }
.req  { color: #ef4444; }
.finp {
  width: 100%; padding: 9px 12px;
  border: 1.5px solid var(--border2); border-radius: var(--rxs);
  font-family: inherit; font-size: 13px; color: var(--t1);
  background: #fafbfd; outline: none; transition: all .15s;
}
.finp:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.11); }
.fgrp { margin-bottom: 14px; }
.twin { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.med-tbl { width: 100%; border: 1.5px solid var(--border); border-radius: var(--rsm); overflow: hidden; }
.med-tbl th { background: #fafbfd; padding: 7px 10px; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; color: var(--t4); border-bottom: 1.5px solid var(--border); }
.med-tbl td { padding: 8px 10px; border-top: 1px solid var(--border); font-size: 12px; color: var(--t2); }
.tag-e { background: #fee2e2; color: #dc2626; padding: 2px 7px; border-radius: 5px; font-size: 10px; font-weight: 700; }
.tag-x { background: #eef2ff; color: #4338ca; padding: 2px 7px; border-radius: 5px; font-size: 10px; font-weight: 700; }
.tag-d { background: #fef3c7; color: #92400e; padding: 2px 7px; border-radius: 5px; font-size: 10px; font-weight: 700; }

.add-med-btn {
  width: 100%; margin-top: 8px; background: #fafbfd;
  border: 1.5px dashed var(--border2); border-radius: var(--rxs);
  padding: 7px 0; font-size: 12.5px; font-weight: 600; color: var(--t3);
  cursor: pointer; font-family: inherit; transition: all .15s;
}
.add-med-btn:hover { border-color: #6366f1; color: #4338ca; background: #eef2ff; }

.auto-box {
  background: linear-gradient(135deg,#eef2ff,#f5f3ff);
  border: 1.5px solid #c7d2fe; border-radius: var(--rsm);
  padding: 12px 14px; margin-bottom: 14px;
}
.auto-ttl { font-size: 10.5px; font-weight: 800; color: #4338ca; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
.chk { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; cursor: pointer; }
.chk:last-child { margin-bottom: 0; }
.chk input { width: 14px; height: 14px; accent-color: #4338ca; cursor: pointer; }
.chk span  { font-size: 13px; font-weight: 500; color: var(--t2); }

.form-acts { display: flex; gap: 8px; }
.btn-sv { flex: 1; border: none; border-radius: var(--rxs); padding: 10px 0; font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .18s; }
.btn-sv-def  { background: linear-gradient(135deg,#4338ca,#6366f1); color: #fff; box-shadow: 0 3px 12px rgba(99,102,241,0.3); }
.btn-sv-done { background: linear-gradient(135deg,#065f46,#10b981); color: #fff; box-shadow: 0 3px 12px rgba(16,185,129,0.3); }
.btn-cn {
  flex: 1; background: #fafbfd; color: var(--t3);
  border: 1.5px solid var(--border2); border-radius: var(--rxs);
  padding: 10px 0; font-family: inherit; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: border-color .14s;
}
.btn-cn:hover { border-color: var(--t4); }

/* ══ SECTION LABEL ══ */
.section-label {
  font-size: 11.5px; font-weight: 700; color: var(--t3);
  text-transform: uppercase; letter-spacing: .12em;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px; margin-top: 4px;
}
.section-label::before { content:''; width:3px; height:14px; border-radius:3px; background:linear-gradient(180deg,#4338ca,#818cf8); flex-shrink:0; }
.section-label::after  { content:''; flex:1; height:1px; background:var(--border); }

/* ══ ANALYTICS GRID ══
   3 equal columns, cards stretch to match each other's height */
.anl-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 16px;
  align-items: stretch;
}
@media(max-width:900px) { .anl-grid { grid-template-columns: 1fr; } }

.anl-card {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .22s, box-shadow .22s;
}
.anl-card:hover { transform: translateY(-4px); box-shadow: var(--sh-lg); }

.anl-stripe { height: 4px; width: 100%; flex-shrink: 0; }

.anl-hd {
  padding: 16px 20px 14px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.anl-hd-left { display: flex; align-items: center; gap: 10px; }
.anl-ic { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.anl-title { font-size: 14px; font-weight: 800; color: var(--t1); line-height: 1.2; }
.anl-sub   { font-size: 12px; color: var(--t4); margin-top: 2px; }
.anl-pill  { font-size: 11.5px; font-weight: 700; padding: 4px 11px; border-radius: 20px; white-space: nowrap; }
.pill-up { background: #dcfce7; color: #166534; }
.pill-dn { background: #fee2e2; color: #991b1b; }
.pill-ok { background: #dbeafe; color: #1d4ed8; }

/* Body fills remaining height so content spreads out */
.anl-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ── Card 1: Monthly chart — content fills height ── */
.mc-big  { font-size: 30px; font-weight: 800; color: var(--t1); letter-spacing: -1px; line-height: 1; }
.mc-hint { font-size: 12px; color: var(--t4); margin-top: 5px; }

/* chart takes all available space */
.mc-chart-wrap { flex: 1; display: flex; flex-direction: column; justify-content: center; margin: 10px 0 4px; }

.mc-tiles {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 8px; margin-top: 14px; flex-shrink: 0;
}
.mc-tile {
  background: #fafbfd; border: 1px solid var(--border);
  border-radius: 10px; padding: 11px 8px; text-align: center;
}
.mc-tv { font-size: 15px; font-weight: 800; line-height: 1; }
.mc-tl { font-size: 11px; color: var(--t4); margin-top: 4px; font-weight: 500; }

/* ── Card 2: Medicine bars — spread evenly ── */
.med-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* ← evenly spread rows */
}
.med-row { /* no bottom margin — justify-content handles spacing */ }
.med-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.med-left { display: flex; align-items: center; gap: 9px; }
.med-dot  { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.med-name { font-size: 13.5px; font-weight: 600; color: var(--t1); }
.med-right { display: flex; align-items: center; gap: 7px; }
.med-pct  { font-size: 11.5px; font-weight: 700; padding: 2px 9px; border-radius: 20px; background: #f1f5f9; border: 1px solid var(--border); color: var(--t3); }
.med-cnt  { font-size: 14px; font-weight: 800; color: var(--t1); min-width: 24px; text-align: right; }
.med-track { height: 7px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
.med-fill  { height: 100%; border-radius: 4px; }

/* ── Card 3: Supplier ── */
.donut-row {
  display: flex; align-items: center; gap: 20px;
  padding-bottom: 18px; border-bottom: 1px solid var(--border); margin-bottom: 16px;
  flex-shrink: 0;
}
.donut-wrap { position: relative; width: 96px; height: 96px; flex-shrink: 0; }
.donut-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; }
.donut-pct { font-size: 19px; font-weight: 800; color: var(--t1); line-height: 1; }
.donut-lbl { font-size: 9.5px; color: #059669; font-weight: 700; margin-top: 2px; }
.ratio-stats { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.ratio-row  { display: flex; align-items: center; justify-content: space-between; }
.ratio-lbl  { font-size: 12px; color: var(--t3); font-weight: 500; }
.ratio-val  { font-size: 13px; font-weight: 700; color: var(--t1); }
.ratio-chip {
  display: inline-flex; align-items: center; gap: 5px;
  background: #dcfce7; color: #166534;
  font-size: 11.5px; font-weight: 700; padding: 5px 13px; border-radius: 20px; margin-top: 4px;
}

.ovd-list { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.ovd-ttl  { font-size: 10.5px; font-weight: 700; color: var(--t4); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 12px; flex-shrink: 0; }
.ovd-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 0; border-bottom: 1px solid var(--border);
}
.ovd-item:last-child { border-bottom: none; padding-bottom: 0; }
.ovd-left { display: flex; align-items: center; gap: 10px; }
.ovd-av   { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.ovd-name { font-size: 13px; font-weight: 700; color: var(--t1); }
.ovd-sub  { font-size: 11px; color: var(--t4); margin-top: 1px; }
.ovd-amt  { font-size: 14px; font-weight: 800; }
`;

/* ─── Data ─── */
const SCARDS = [
  { bar:"#6366f1", wash:"#6366f1", iconBg:"#eef2ff", icon:"↩",
    label:"Monthly Return Value", value:"₹1,00,000",
    badge:"▼ ₹20K", bt:"down",
    spark:[62,78,55,91,100,84,110,95,120,88,105,100], sc:"#6366f1", hint:"vs last month" },
  { bar:"#f59e0b", wash:"#f59e0b", iconBg:"#fef3c7", icon:"💊",
    label:"Most Returned Medicine", valueSm:"Paracetamol",
    badge:"▲ 12%", bt:"up",
    spark:[12,19,14,28,22,35,30,42,38,45,40,42], sc:"#f59e0b", hint:"Metformin, Cetirizine…" },
  { bar:"#10b981", wash:"#10b981", iconBg:"#d1fae5", icon:"📊",
    label:"Supplier Return Ratio", value:"8.5%",
    badge:"✓ Safe", bt:"ok",
    spark:[10,9,11,8,9,8,9,7,9,8,9,8], sc:"#10b981", hint:"Within 15% threshold" },
  { bar:"#8b5cf6", wash:"#8b5cf6", iconBg:"#ede9fe", icon:"📦",
    label:"Returns This Month", value:"14",
    badge:"▲ 3", bt:"up",
    spark:[5,8,6,11,9,14,10,16,12,18,14,14], sc:"#8b5cf6", hint:"Returns processed" },
];

const ALL_RETURNS = [
  {id:"RET-00014",sup:"Sunrise Pharma",    date:"25-Apr-2024",reason:"Damaged Stock",amt:"₹14,500",sta:"Pending"},
  {id:"RET-00013",sup:"Apex Pharma",       date:"23-Apr-2024",reason:"Expired Stock",amt:"₹33,000",sta:"Adjusted"},
  {id:"RET-00012",sup:"Apex Pharma",       date:"22-Apr-2024",reason:"Expired Stock",amt:"₹30,000",sta:"Adjusted"},
  {id:"RET-00011",sup:"Medico Supplies",   date:"20-Apr-2024",reason:"Excess Stock", amt:"₹25,000",sta:"Adjusted"},
  {id:"RET-00010",sup:"HealthPlus Pvt Ltd",date:"16-Apr-2024",reason:"Expired Stock",amt:"₹30,000",sta:"Adjusted"},
  {id:"RET-00009",sup:"Global Drugs",      date:"12-Apr-2024",reason:"Damaged Stock",amt:"₹10,000",sta:"Pending"},
  {id:"RET-00008",sup:"BioCare Ltd",       date:"10-Apr-2024",reason:"Excess Stock", amt:"₹60,000",sta:"Adjusted"},
  {id:"RET-00007",sup:"MedTech Pharma",    date:"08-Apr-2024",reason:"Expired Stock",amt:"₹18,000",sta:"Pending"},
  {id:"RET-00006",sup:"SunLife Drugs",     date:"05-Apr-2024",reason:"Damaged Stock",amt:"₹9,500", sta:"Adjusted"},
  {id:"RET-00005",sup:"Apex Pharma",       date:"02-Apr-2024",reason:"Excess Stock", amt:"₹22,000",sta:"Adjusted"},
  {id:"RET-00004",sup:"Medico Supplies",   date:"30-Mar-2024",reason:"Expired Stock",amt:"₹15,000",sta:"Pending"},
  {id:"RET-00003",sup:"HealthPlus Pvt Ltd",date:"27-Mar-2024",reason:"Excess Stock", amt:"₹40,000",sta:"Adjusted"},
  {id:"RET-00002",sup:"CureMed Corp",      date:"24-Mar-2024",reason:"Damaged Stock",amt:"₹7,500", sta:"Adjusted"},
  {id:"RET-00001",sup:"BioCare Ltd",       date:"20-Mar-2024",reason:"Expired Stock",amt:"₹28,000",sta:"Pending"},
];
const MEDS = [
  {m:"Paracetamol",b:"BTH-22A",q:20,r:"Expired",tag:"tag-e"},
  {m:"Amoxicillin", b:"BTH-28B",q:10,r:"Excess", tag:"tag-x"},
  {m:"Cetirizine",  b:"BTH-23C",q:5, r:"Damaged",tag:"tag-d"},
];
const MRETS = [
  {n:"Paracetamol", c:42,p:85,col:"#6366f1"},
  {n:"Metformin",   c:28,p:56,col:"#10b981"},
  {n:"Cetirizine",  c:19,p:38,col:"#f59e0b"},
  {n:"Azithromycin",c:14,p:28,col:"#8b5cf6"},
  {n:"Amoxicillin", c:11,p:22,col:"#06b6d4"},
];
const OVDUES = [
  {n:"Apex Pharma",    sub:"3 pending returns",a:"₹63,000",col:"#ef4444",ic:"🔴",bg:"#fee2e2"},
  {n:"Medico Supplies",sub:"2 pending returns",a:"₹40,000",col:"#d97706",ic:"🟠",bg:"#fef3c7"},
  {n:"BioCare Ltd",    sub:"1 pending return", a:"₹28,000",col:"#6366f1",ic:"🔵",bg:"#eef2ff"},
];
const PER_PAGE = 7;

export default function PurchaseReturns() {
  const [search, setSearch] = useState("");
  const [month,  setMonth]  = useState("April");
  const [page,   setPage]   = useState(1);
  const [saved,  setSaved]  = useState(false);

  const filtered = ALL_RETURNS.filter(r =>
    r.sup.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePg = Math.min(page, totalPages);
  const rows   = filtered.slice((safePg-1)*PER_PAGE, safePg*PER_PAGE);
  const startE = filtered.length ? (safePg-1)*PER_PAGE+1 : 0;
  const endE   = Math.min(safePg*PER_PAGE, filtered.length);
  const go     = p => { if (p>=1 && p<=totalPages) setPage(p); };
  const pgs    = Array.from({length:totalPages}, (_,i) => i+1);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        
        {/* HEADBAR */}
        <div className="headbar box_shadow mt-4 mx-4">
          <div className="tb-brand">
            <div>
              <div className="tb-name">Purchase Returns</div>
            </div>
          </div>
          <div className="tb-right">
            <button className="btn-ghost">📅 April 2024</button>
            <button className="btn-primary">＋ New Return</button>
            <div className="tb-av">A</div>
          </div>
        </div>

        <div className="body">

          {/* ── STAT CARDS ── */}
          <div className="cards-grid">
            {SCARDS.map((c, i) => (
              <div className="scard box_shadow" key={i}>
                <div className="scard-bar"  style={{background: c.bar}}/>
                <div className="scard-wash" style={{background: c.wash}}/>
                <div className="scard-inner">
                  <div className="scard-r1">
                    <div className="scard-icon" style={{background: c.iconBg}}>{c.icon}</div>
                    <span className={`scard-badge ${c.bt==="up"?"b-up":c.bt==="down"?"b-down":"b-ok"}`}>{c.badge}</span>
                  </div>
                  <div className="scard-lbl">{c.label}</div>
                  <div className="scard-r2">
                    <div>
                      {c.value
                        ? <div className="scard-val" style={{fontSize: c.value.length > 7 ? 20 : 27}}>{c.value}</div>
                        : <div className="scard-val-sm">{c.valueSm}</div>
                      }
                      <div className="scard-hint">{c.hint}</div>
                    </div>
                    <Sparkline vals={c.spark} color={c.sc}/>
                  </div>
                </div>
                <div className="scard-foot">
                  <div className="scard-foot-dot" style={{background: c.bar}}/>
                  <span className="scard-foot-txt">Live · Updated just now</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── TABLE + FORM ── */}
          <div className="main-grid">

            {/* TABLE — shrink-wraps to actual row count, no blank space */}
            <div className="tbl-block box_shadow">
              <div className="fbar">
                <div className="fsearch">
                  <span style={{color:"#94a3b8", fontSize:15, flexShrink:0}}>🔍</span>
                  <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search supplier or return no…"
                  />
                </div>
                <select className="fsel" value={month} onChange={e => setMonth(e.target.value)}>
                  {["January","February","March","April","May","June"].map(m => (
                    <option key={m} value={m}>Month: {m}</option>
                  ))}
                </select>
                <button className="ffbtn">⚡ Filter</button>
              </div>

              <div className="tcard-hd">
                <span className="tcard-title">Return List</span>
                <span className="tcard-badge">{filtered.length} entries</span>
              </div>

              <div style={{overflowX:"auto"}}>
                <table className="rtbl">
                  <thead>
                    <tr>
                      <th style={{paddingLeft:20}}>Ref. No</th>
                      <th>Supplier</th>
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th style={{textAlign:"center"}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0
                      ? <tr><td colSpan={7} style={{textAlign:"center",padding:"32px 0",color:"#94a3b8",fontSize:13}}>No returns found.</td></tr>
                      : rows.map((r, i) => (
                        <tr key={i}>
                          <td style={{paddingLeft:20}}><span className="t-rno">{r.id}</span></td>
                          <td><span className="t-sup">{r.sup}</span></td>
                          <td><span className="t-date">{r.date}</span></td>
                          <td><span className="t-rsn">{r.reason}</span></td>
                          <td><span className="t-amt">{r.amt}</span></td>
                          <td>
                            <span className={`sta-chip ${r.sta === "Adjusted" ? "sta-adj" : "sta-pnd"}`}>
                              <span className={`sta-dot ${r.sta === "Adjusted" ? "dot-adj" : "dot-pnd"}`}/>
                              {r.sta}
                            </span>
                          </td>
                          <td>
                            <div className="act-g">
                              <button className="abt">👁</button>
                              <button className="abt edt">✏️</button>
                              <button className="abt del">🗑</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

              <div className="pgbar">
                <span className="pgbar-info">
                  {filtered.length === 0 ? "No entries" : `Showing ${startE}–${endE} of ${filtered.length} entries`}
                </span>
                <div className="pg-btns">
                  <button className="pgb" onClick={() => go(safePg-1)} disabled={safePg===1}>‹</button>
                  {pgs.map(p => (
                    <button key={p} className={`pgb ${p===safePg?"pgb-a":""}`} onClick={() => go(p)}>{p}</button>
                  ))}
                  <button className="pgb" onClick={() => go(safePg+1)} disabled={safePg===totalPages}>›</button>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="fcard box_shadow">
              <div className="fcard-hd">
                <div className="fcard-hd-c">
                  <div className="fcard-hd-t">Create Return</div>
                  <div className="fcard-hd-s">Fill in the return details below</div>
                </div>
              </div>
              <div className="fcard-body">
                <div className="fgrp">
                  <label className="flbl">Supplier <span className="req">*</span></label>
                  <select className="finp">
                    <option>Medico Supplies</option><option>Apex Pharma</option>
                    <option>HealthPlus Pvt Ltd</option><option>Global Drugs</option><option>BioCare Ltd</option>
                  </select>
                </div>
                <div className="fgrp">
                  <label className="flbl">GRN / Invoice <span className="req">*</span></label>
                  <div className="twin">
                    <input className="finp" type="text" defaultValue="INV-2024-002" placeholder="Invoice No"/>
                    <input className="finp" type="date" defaultValue="2024-04-08"/>
                  </div>
                </div>
                <div className="fgrp">
                  <label className="flbl">Medicines to Return</label>
                  <table className="med-tbl">
                    <thead><tr><th>Medicine</th><th>Batch</th><th>Qty</th><th>Reason</th></tr></thead>
                    <tbody>
                      {MEDS.map((m, i) => (
                        <tr key={i}>
                          <td style={{fontWeight:700,color:"var(--t1)"}}>{m.m}</td>
                          <td style={{fontSize:11,color:"var(--t3)"}}>{m.b}</td>
                          <td style={{fontWeight:700}}>{m.q}</td>
                          <td><span className={m.tag}>{m.r}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="add-med-btn">＋ Add Medicine</button>
                </div>
                <div className="auto-box">
                  <div className="auto-ttl">⚡ Auto Settings</div>
                  <label className="chk"><input type="checkbox" defaultChecked/><span>Reduce Stock Automatically</span></label>
                  <label className="chk"><input type="checkbox" defaultChecked/><span>Adjust Supplier Balance</span></label>
                </div>
                <div className="form-acts">
                  <button
                    className={`btn-sv ${saved ? "btn-sv-done" : "btn-sv-def"}`}
                    onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
                    {saved ? "✓ Saved!" : "💾 Save Return"}
                  </button>
                  <button className="btn-cn">✕ Cancel</button>
                </div>
              </div>
            </div>
          </div>

          {/* ── ANALYTICS ── */}
          <div className="section-label">Analytics Overview</div>
          <div className="anl-grid">

            {/* Card 1: Monthly Return Value — chart fills height */}
            <div className="anl-card box_shadow">
              <div className="anl-stripe" style={{background:"linear-gradient(90deg,#4338ca,#818cf8)"}}/>
              <div className="anl-hd">
                <div className="anl-hd-left">
                  <div className="anl-ic" style={{background:"#eef2ff"}}>📈</div>
                  <div>
                    <div className="anl-title">Monthly Return Value</div>
                    <div className="anl-sub">Jan – Dec 2024</div>
                  </div>
                </div>
                <span className="anl-pill pill-dn">▼ 20K</span>
              </div>
              <div className="anl-body">
                <div className="mc-big">₹1,00,000</div>
                <div className="mc-hint">Current month · May 2024</div>
                {/* chart stretches to fill */}
                <div className="mc-chart-wrap">
                  <MonthlyAreaChart/>
                </div>
                <div className="mc-tiles">
                  <div className="mc-tile">
                    <div className="mc-tv" style={{color:"#10b981"}}>₹1.2L</div>
                    <div className="mc-tl">Peak (Sep)</div>
                  </div>
                  <div className="mc-tile">
                    <div className="mc-tv" style={{color:"#f59e0b"}}>₹55K</div>
                    <div className="mc-tl">Lowest (Mar)</div>
                  </div>
                  <div className="mc-tile">
                    <div className="mc-tv" style={{color:"#6366f1"}}>₹90K</div>
                    <div className="mc-tl">Monthly Avg</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Most Returned Medicines — bars spread to fill */}
            <div className="anl-card box_shadow">
              <div className="anl-stripe" style={{background:"linear-gradient(90deg,#d97706,#fbbf24)"}}/>
              <div className="anl-hd">
                <div className="anl-hd-left">
                  <div className="anl-ic" style={{background:"#fef3c7"}}>💊</div>
                  <div>
                    <div className="anl-title">Most Returned Medicines</div>
                    <div className="anl-sub">By return count · April 2024</div>
                  </div>
                </div>
                <span className="anl-pill pill-up">▲ 12%</span>
              </div>
              <div className="anl-body">
                {/* med-list fills all remaining height, rows spaced evenly */}
                <div className="med-list">
                  {MRETS.map((m, i) => (
                    <div className="med-row" key={i}>
                      <div className="med-meta">
                        <div className="med-left">
                          <div className="med-dot" style={{background: m.col}}/>
                          <span className="med-name">{m.n}</span>
                        </div>
                        <div className="med-right">
                          <span className="med-pct">{m.p}%</span>
                          <span className="med-cnt">{m.c}</span>
                        </div>
                      </div>
                      <div className="med-track">
                        <div className="med-fill" style={{width:`${m.p}%`, background:m.col, opacity:.85}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Supplier Return Ratio */}
            <div className="anl-card box_shadow">
              <div className="anl-stripe" style={{background:"linear-gradient(90deg,#059669,#34d399)"}}/>
              <div className="anl-hd">
                <div className="anl-hd-left">
                  <div className="anl-ic" style={{background:"#d1fae5"}}>🔄</div>
                  <div>
                    <div className="anl-title">Supplier Return Ratio</div>
                    <div className="anl-sub">Overdue tracking · April 2024</div>
                  </div>
                </div>
                <span className="anl-pill pill-ok">✓ Safe</span>
              </div>
              <div className="anl-body">
                <div className="donut-row">
                  <div className="donut-wrap">
                    <DonutChart pct={8.5} color="#10b981"/>
                    <div className="donut-center">
                      <div className="donut-pct">8.5%</div>
                      <div className="donut-lbl">SAFE</div>
                    </div>
                  </div>
                  <div className="ratio-stats">
                    <div className="ratio-row"><span className="ratio-lbl">Threshold</span><span className="ratio-val">15%</span></div>
                    <div className="ratio-row"><span className="ratio-lbl">Status</span><span className="ratio-val">Healthy</span></div>
                    <div className="ratio-row"><span className="ratio-lbl">Active Suppliers</span><span className="ratio-val">14</span></div>
                    <span className="ratio-chip">✓ No Alert Triggered</span>
                  </div>
                </div>

                <div className="ovd-ttl">Overdue Suppliers</div>
                <div className="ovd-list">
                  {OVDUES.map((o, i) => (
                    <div className="ovd-item" key={i}>
                      <div className="ovd-left">
                        <div className="ovd-av" style={{background: o.bg}}>{o.ic}</div>
                        <div>
                          <div className="ovd-name">{o.n}</div>
                          <div className="ovd-sub">{o.sub}</div>
                        </div>
                      </div>
                      <span className="ovd-amt" style={{color: o.col}}>{o.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>{/* end anl-grid */}
        </div>
      </div>
    </>
  );
}