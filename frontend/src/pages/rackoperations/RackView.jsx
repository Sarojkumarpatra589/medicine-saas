import { useState } from "react";
import "./style.css";
const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --font: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --mono: 'JetBrains Mono', monospace;
  --ink:   #111827;
  --ink2:  #374151;
  --soft:  #6b7280;
  --mute:  #9ca3af;
  --line:  #e2e8f0;
  --bg:    #f8fafc;
  --surface: #ffffff;
  --blue:  #3d3bdb;
  --blue-h:#3730a3;
  --blue-lt:#eff6ff;
  --blue-bd:#bfdbfe;
  --green: #22c55e;
  --green-lt:#f0fdf4;
  --green-bd:#bbf7d0;
  --amber: #eab308;
  --amber-lt:#fefce8;
  --amber-bd:#fde68a;
  --red:   #ef4444;
  --red-lt:#fef2f2;
  --red-bd:#fecaca;
  --orange:#f97316;
  --orange-lt:#fff7ed;
  --orange-bd:#fed7aa;
}

body { font-family: var(--font); background: var(--bg); }
.rv  { min-height: 100vh; background: var(--bg); color: var(--ink); font-family: var(--font); }

/* ══ BAR 1 — title left · Add New Rack right ══ */
.rv-bar1 {
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  height: 62px;
  padding: 0 28px;
  display: flex; align-items: center; gap: 14px;
  position: sticky; top: 0; z-index: 300;
  margin-top: 20px;
}
.rv-bar1-icon {
  width: 38px; height: 38px;
  background: var(--blue); border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(61,59,219,0.28);
}
.rv-bar1-title {
  font-size: 17px; font-weight: 700; color: var(--ink);
  white-space: nowrap; flex-shrink: 0;
}
.rv-bar1-vdiv { width: 1px; height: 22px; background: var(--line); flex-shrink: 0; }
.rv-bar1-spacer { flex: 1; }
.rv-crumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--mute); font-weight: 500;
}
.rv-crumb-curr { color: var(--ink2); font-weight: 600; }

/* ══ BAR 2 — premium stat cards ══ */
.rv-bar2 {
  background: #f1f5f9;
  border-bottom: 1.5px solid var(--line);
  padding: 14px 28px;
  display: flex; align-items: center; gap: 14px;
  position: sticky; top: 62px; z-index: 290;
}
.rv-bar2-chips { display: flex; align-items: stretch; gap: 14px; flex: 1; }

/* Stat card */
.rv-chip {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1.5px solid transparent;
  cursor: pointer;
  font-family: var(--font);
  transition: transform .15s, box-shadow .18s;
  flex: 1; position: relative; overflow: hidden;
  background: var(--surface);
  text-align: left;

}
.rv-chip:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.11);
}

/* Accent left stripe */
.rv-chip::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px; border-radius: 12px 0 0 12px;
}

/* Icon box */
.rv-chip-icon {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.rv-chip-icon svg { display: block; }

/* Text stack */
.rv-chip-text { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
.rv-chip-label {
  font-size: 11.5px; font-weight: 600;
  color: var(--soft); letter-spacing: 0.02em;
  white-space: nowrap;
}
.rv-chip-value {
  font-size: 26px; font-weight: 800; line-height: 1;
  font-family: var(--mono); letter-spacing: -0.5px;
}

/* Mini progress bar under value */
.rv-chip-bar {
  width: 100%; height: 3px; border-radius: 99px;
  margin-top: 6px; overflow: hidden;
  background: rgba(0,0,0,0.06);
}
.rv-chip-bar-fill {
  height: 100%; border-radius: 99px;
  transition: width .6s cubic-bezier(.4,0,.2,1);
}

/* Trend badge top-right */
.rv-chip-trend {
  position: absolute; top: 12px; right: 14px;
  font-size: 10px; font-weight: 700;
  padding: 2px 7px; border-radius: 99px;
  display: flex; align-items: center; gap: 3px;
}

/* ── Blue / Total ── */
.c-blue { border-color: #e0e7ff; }
.c-blue::before { background: #3d3bdb; }
.c-blue .rv-chip-icon  { background: #ede9ff; }
.c-blue .rv-chip-value { color: #3d3bdb; }
.c-blue .rv-chip-bar   { background: #e0e7ff; }
.c-blue .rv-chip-bar-fill { background: #3d3bdb; }
.c-blue .rv-chip-trend { background: #ede9ff; color: #3d3bdb; }

/* ── Green / Available ── */
.c-green { border-color: #dcfce7; }
.c-green::before { background: #16a34a; }
.c-green .rv-chip-icon  { background: #dcfce7; }
.c-green .rv-chip-value { color: #15803d; }
.c-green .rv-chip-bar   { background: #dcfce7; }
.c-green .rv-chip-bar-fill { background: #22c55e; }
.c-green .rv-chip-trend { background: #dcfce7; color: #15803d; }

/* ── Amber / Medium ── */
.c-amber { border-color: #fef9c3; }
.c-amber::before { background: #d97706; }
.c-amber .rv-chip-icon  { background: #fef9c3; }
.c-amber .rv-chip-value { color: #92400e; }
.c-amber .rv-chip-bar   { background: #fef9c3; }
.c-amber .rv-chip-bar-fill { background: #f59e0b; }
.c-amber .rv-chip-trend { background: #fef9c3; color: #92400e; }

/* ── Red / Full ── */
.c-red { border-color: #fecaca; }
.c-red::before { background: #dc2626; }
.c-red .rv-chip-icon  { background: #fee2e2; }
.c-red .rv-chip-value { color: #991b1b; }
.c-red .rv-chip-bar   { background: #fee2e2; }
.c-red .rv-chip-bar-fill { background: #ef4444; }
.c-red .rv-chip-trend { background: #fee2e2; color: #991b1b; }

/* Add New Rack btn — Bar 1 right side */
.rv-btn-add {
  display: flex; align-items: center; gap: 8px;
  background: var(--blue); color: #fff;
  border: none; border-radius: 10px;
  padding: 0 22px; height: 42px;
  font-size: 14px; font-weight: 600;
  cursor: pointer; font-family: var(--font);
  transition: background .15s, transform .12s, box-shadow .12s;
  box-shadow: 0 2px 10px rgba(61,59,219,0.28);
  white-space: nowrap; flex-shrink: 0;
}
.rv-btn-add:hover { background: var(--blue-h); transform: translateY(-1px); box-shadow: 0 5px 18px rgba(61,59,219,0.38); }

/* ══ BODY ══ */
.rv-body { padding: 22px 25px 36px; }

.rv-toprow {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 18px; flex-wrap: wrap; gap: 12px;
}
.rv-toprow-left { display: flex; align-items: center; gap: 10px; }
.rv-page-title  { font-size: 20px; font-weight: 700; color: var(--ink); }

.rv-tag {
  background: var(--bg); border: 1.5px solid var(--line);
  border-radius: 99px; padding: 4px 13px;
  font-size: 12px; font-weight: 600; color: var(--soft);
}
.rv-search {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface); border: 1.5px solid var(--line);
  border-radius: 9px; padding: 8px 15px;
  transition: border-color .15s, box-shadow .15s;
}
.rv-search:focus-within { border-color: #818cf8; box-shadow: 0 0 0 3px rgba(129,140,248,.15); }
.rv-search input {
  border: none; outline: none; background: transparent;
  font-size: 13.5px; font-family: var(--font); color: var(--ink); width: 185px;
}
.rv-search input::placeholder { color: var(--mute); }
.rv-count { font-size: 13px; color: var(--mute); font-weight: 500; }
.rv-count b { color: var(--blue); font-weight: 700; }

.rv-layout { display: grid; grid-template-columns: 1fr 228px; gap: 18px; align-items: start; }

/* ══ RACK PANEL ══ */
.rv-panel {
  background: var(--surface);
  border: 1px solid var(--line);
}

/* Tab strip — bigger tabs */
.rv-tabstrip {
  display: flex; background: #f1f5f9;
  border-bottom: 1.5px solid var(--line);
  padding: 0 20px; overflow-x: auto;
}
.rv-tabstrip::-webkit-scrollbar { display: none; }
.rv-tabstrip-btn {
  padding: 13px 22px; font-size: 14px; font-weight: 600;
  border: none; background: none; cursor: pointer;
  color: var(--mute); border-bottom: 2.5px solid transparent;
  margin-bottom: -1.5px; transition: all .15s;
  font-family: var(--font); white-space: nowrap;
}
.rv-tabstrip-btn:hover { color: var(--blue); }
.rv-tabstrip-btn.on { color: var(--blue); border-bottom-color: var(--blue); }

.rv-rack-body { padding: 20px 20px 16px; }

.rv-rack-hdr {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px;
}
.rv-rack-title { font-size: 17px; font-weight: 700; color: var(--ink); }
.rv-rack-sub   { font-size: 12px; color: var(--soft); font-weight: 500; margin-left: 8px; }
.rv-rack-hdr-right { display: flex; align-items: center; gap: 8px; }
.rv-cap-ring { position: relative; width: 44px; height: 44px; flex-shrink: 0; }
.rv-cap-ring svg { transform: rotate(-90deg); }
.rv-cap-label {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8.5px; font-weight: 800; font-family: var(--mono);
  color: var(--ink); line-height: 1; text-align: center;
}

/* Grid */
.rv-grid-outer {
  background: #f8fafc; border: 1.5px solid var(--line);
  border-radius: 10px; overflow: hidden;
}
.rv-grid-col-heads { display: grid; border-bottom: 1.5px solid var(--line); background: #eef1f6; }
.rv-grid-col-head {
  padding: 7px 0; text-align: center;
  font-size: 11px; font-weight: 700; font-family: var(--mono);
  color: var(--soft); letter-spacing: 0.07em; text-transform: uppercase;
  border-right: 1px solid var(--line);
}
.rv-grid-col-head:last-child { border-right: none; }

.rv-grid-row { display: grid; border-bottom: 1px solid var(--line); transition: background .12s; }
.rv-grid-row:last-child { border-bottom: none; }
.rv-grid-row:hover { background: #f0f4fa; }

.rv-grid-row-label {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 4px; padding: 10px 8px;
  background: #eef1f6; border-right: 1.5px solid var(--line);
}
.rv-row-id {
  font-family: var(--mono); font-size: 10px; font-weight: 700;
  color: var(--ink2); background: var(--surface);
  border: 1px solid var(--line); border-radius: 4px; padding: 2px 7px;
}
.rv-row-fill-bar { width: 5px; height: 30px; background: var(--line); border-radius: 99px; overflow: hidden; margin-top: 2px; border: 1px solid #d1d9e0; }
.rv-row-fill-inner { width: 100%; border-radius: 99px; transition: height .6s cubic-bezier(.4,0,.2,1); }

.rv-grid-cell { border-right: 1px solid var(--line); padding: 8px 7px; display: flex; align-items: stretch; }
.rv-grid-cell:last-child { border-right: none; }

/* Slot block — bigger, clearer */
.rv-slot-block {
  flex: 1; border-radius: 8px; border: 1.5px solid transparent;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 8px 5px; min-height: 62px;
  cursor: pointer; position: relative; overflow: hidden;
  transition: transform .15s, box-shadow .15s;
  text-align: center;
}
.rv-slot-block::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  border-radius: 2px 2px 0 0; opacity: .8;
}
.rv-slot-block:hover { transform: scale(1.07); box-shadow: 0 5px 18px rgba(0,0,0,.14); z-index: 10; }

.sb-empty    { background: linear-gradient(155deg,#f0fdf4,#dcfce7); border-color: #86efac; }
.sb-empty::before { background: #22c55e; }
.sb-empty .rv-slot-dot { background: #22c55e; box-shadow: 0 0 5px #22c55e88; }

.sb-medium   { background: linear-gradient(155deg,#fefce8,#fef9c3); border-color: #fde047; }
.sb-medium::before { background: #eab308; }
.sb-medium .rv-slot-dot { background: #eab308; box-shadow: 0 0 5px #eab30888; }

.sb-overload { background: linear-gradient(155deg,#fff1f2,#fee2e2); border-color: #fca5a5; }
.sb-overload::before { background: #ef4444; }
.sb-overload .rv-slot-dot { background: #ef4444; box-shadow: 0 0 6px #ef444488; }

.sb-expiring { background: linear-gradient(155deg,#fff7ed,#ffedd5); border-color: #fdba74; }
.sb-expiring::before { background: #f97316; }
.sb-expiring .rv-slot-dot { background: #f97316; box-shadow: 0 0 5px #f9731688; }

.sb-full     { background: linear-gradient(155deg,#f5f3ff,#ede9fe); border-color: #c4b5fd; }
.sb-full::before { background: #7c3aed; }
.sb-full .rv-slot-dot { background: #7c3aed; }

@keyframes pulseRed{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.3);}55%{box-shadow:0 0 0 6px rgba(239,68,68,0);}}
.sb-overload { animation: pulseRed 2s ease-in-out infinite; }

.rv-slot-dot { width: 6px; height: 6px; border-radius: 50%; position: absolute; top: 7px; right: 7px; }
.rv-slot-main { font-size: 10px; font-weight: 800; color: var(--ink); line-height: 1.25; }
.rv-slot-sub  { font-size: 8.5px; font-family: var(--mono); color: var(--soft); margin-top: 3px; }
.rv-slot-pct  { font-size: 16px; font-weight: 900; color: var(--red); line-height: 1; }
.rv-slot-open { font-size: 10px; font-weight: 700; color: #86efac; letter-spacing: .03em; }

/* Tooltip */
.rv-slot-tip {
  position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: var(--ink); color: #fff; border-radius: 8px;
  padding: 7px 12px; white-space: pre-line; z-index: 200;
  font-size: 11px; font-weight: 500; font-family: var(--font);
  pointer-events: none; box-shadow: 0 4px 18px rgba(0,0,0,.3);
  opacity: 0; transition: opacity .15s; min-width: 130px; text-align: left;
  line-height: 1.65;
}
.rv-slot-tip::after {
  content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
  border: 5px solid transparent; border-top-color: var(--ink);
}
.rv-slot-block:hover .rv-slot-tip { opacity: 1; }

.rv-grid-row-stat {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 8px 10px; gap: 3px;
  border-left: 1.5px solid var(--line); min-width: 48px;
}
.rv-row-pct { font-size: 11px; font-weight: 800; font-family: var(--mono); color: var(--ink2); }
.rv-row-bar { width: 28px; height: 5px; background: var(--line); border-radius: 99px; overflow: hidden; }
.rv-row-bar-fill { height: 100%; border-radius: 99px; transition: width .5s cubic-bezier(.4,0,.2,1); }

/* Legend row — bigger text */
.rv-legend {
  display: flex; gap: 18px; flex-wrap: wrap;
  padding: 13px 20px; border-top: 1.5px solid var(--line);
  background: #f8fafc;
}
.rv-leg-item { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--soft); font-weight: 500; }
.rv-leg-dot  { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }

/* ══ UTIL CARD ══ */
.rv-util {
  background: var(--surface); border: 1px solid var(--line);
}
.rv-util-head { padding: 15px 18px 11px; border-bottom: 1px solid var(--line); background: #f8fafc; }
.rv-util-eyebrow { font-size: 11px; font-weight: 700; color: var(--mute); text-transform: uppercase; letter-spacing: .07em; }
.rv-util-name { font-size: 17px; font-weight: 700; color: var(--ink); margin-top: 2px; }
.rv-util-body { padding: 20px 18px 16px; display: flex; flex-direction: column; align-items: center; }
.rv-donut { position: relative; width: 120px; height: 120px; }
.rv-donut-mid { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center; }
.rv-donut-num { font-size: 22px; font-weight: 800; color: var(--ink); line-height: 1; }
.rv-donut-lbl { font-size: 10px; color: var(--mute); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; margin-top: 2px; }
.rv-util-rows { width: 100%; margin-top: 16px; display: flex; flex-direction: column; gap: 11px; }
.rv-util-row  { display: flex; flex-direction: column; gap: 4px; }
.rv-util-row-head { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; font-weight: 600; }
.rv-util-row-lbl { display: flex; align-items: center; gap: 6px; color: var(--soft); }
.rv-util-row-dot { width: 8px; height: 8px; border-radius: 50%; }
.rv-util-row-val { font-family: var(--mono); font-size: 12px; font-weight: 700; color: var(--ink2); }
.rv-prog { width: 100%; height: 6px; background: #f1f5f9; border-radius: 99px; overflow: hidden; }
.rv-prog-fill { height: 100%; border-radius: 99px; transition: width .7s cubic-bezier(.4,0,.2,1); }

/* ══ ALERTS ══ */
.rv-alerts {
  background: var(--surface); border: 1px solid var(--line);
  margin-top: 20px;
}
.rv-alerts-head {
  padding: 15px 22px; border-bottom: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between;
  background: #f8fafc;
}
.rv-alerts-hl { display: flex; align-items: center; gap: 10px; }
.rv-alerts-ttl { font-size: 15px; font-weight: 700; color: var(--ink); }
.rv-alerts-cnt { background: var(--red-lt); color: var(--red); border: 1px solid var(--red-bd); border-radius: 99px; padding: 3px 11px; font-size: 12px; font-weight: 700; }

.rv-tbl { width: 100%; border-collapse: collapse; }
.rv-tbl thead tr { background: #f8fafc; }
.rv-tbl th { padding: 11px 20px; text-align: left; font-size: 11px; font-weight: 700; color: var(--mute); border-bottom: 1.5px solid var(--line); text-transform: uppercase; letter-spacing: .07em; white-space: nowrap; }
.rv-tbl td { padding: 13px 20px; font-size: 13px; color: var(--soft); border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.rv-tbl tbody tr:hover { background: #f8faff; }
.rv-tbl tbody tr:last-child td { border-bottom: none; }

.rv-tid { display: inline-flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 12.5px; font-weight: 500; color: var(--ink); }
.rv-tid-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }

.rv-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; white-space: nowrap; border: 1px solid; }
.b-amber  { background: var(--amber-lt);  color: #92400e; border-color: var(--amber-bd); }
.b-red    { background: var(--red-lt);    color: #991b1b; border-color: var(--red-bd); }
.b-orange { background: var(--orange-lt); color: #9a3412; border-color: var(--orange-bd); }

.rv-st     { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; }
.rv-st-dot { width: 7px; height: 7px; border-radius: 50%; }

.rv-alerts-foot {
  padding: 13px 22px; border-top: 1px solid var(--line);
  background: #f8fafc; display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap; gap: 10px;
}
.rv-btn-all {
  display: inline-flex; align-items: center; gap: 7px;
  background: var(--blue); color: #fff; border: none;
  border-radius: 9px; padding: 9px 20px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all .15s; font-family: var(--font);
  box-shadow: 0 2px 8px rgba(61,59,219,0.22);
}
.rv-btn-all:hover { background: var(--blue-h); transform: translateY(-1px); }

@keyframes fadeIn { from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);} }
.rv-grid-row { animation: fadeIn .22s ease both; }
.rv-grid-row:nth-child(2){animation-delay:.05s}
.rv-grid-row:nth-child(3){animation-delay:.10s}
.rv-grid-row:nth-child(4){animation-delay:.15s}
.rv-grid-row:nth-child(5){animation-delay:.20s}
`;

/* ── DATA ── */
const RACKS = {
  "Rack A": {
    areas:6, occupied:20.8,
    cols:["C1","C2","C3","C4","C5","C6"],
    shelves:[
      {id:"S1",fill:12, units:[{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
      {id:"S2",fill:65, units:[{t:"medium",name:"Azithromycin",sub:"9d · 05-11",tip:"Azithromycin\n9 days left · Exp 2024-05-11"},{t:"medium",name:"Azithromycin",sub:"Batch B",tip:"Azithromycin · Batch B"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
      {id:"S3",fill:30, units:[{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
      {id:"S4",fill:90, units:[{t:"overload",pct:"110%",sub:"2022-35",tip:"⚠ Overloaded!\n110% capacity · Ref 2022-35"},{t:"expiring",name:"Paracetamol",sub:"Exp. Soon",tip:"Paracetamol\n⏰ Expiring soon"},{t:"full",name:"Ibuprofen",sub:"Full shelf",tip:"Ibuprofen · Shelf full"},{t:"medium",name:"Vitamin C",sub:"Low stock",tip:"Vitamin C · Low stock"},{t:"empty"},{t:"empty"}]},
      {id:"S5",fill:0,  units:[{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
    ]
  },
  "Rack B":{areas:4,occupied:40,cols:["C1","C2","C3","C4","C5","C6"],shelves:[
    {id:"S1",fill:40,units:[{t:"medium",name:"Vitamin C",sub:"Shelf 1",tip:"Vitamin C · Medium stock"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
    {id:"S2",fill:20,units:[{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
    {id:"S3",fill:60,units:[{t:"overload",pct:"95%",sub:"Over",tip:"Overloaded · 95%"},{t:"expiring",name:"Amoxicillin",sub:"Exp. Soon",tip:"Amoxicillin · Expiring soon"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
  ]},
  "Rack C":{areas:5,occupied:55,cols:["C1","C2","C3","C4","C5","C6"],shelves:[
    {id:"S1",fill:55,units:[{t:"medium",name:"Aspirin",sub:"Low",tip:"Aspirin · Low stock"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
    {id:"S2",fill:70,units:[{t:"overload",pct:"95%",sub:"2024-06",tip:"Overloaded · 95%"},{t:"full",name:"Ciproflox.",sub:"Full",tip:"Ciprofloxacin · Full"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
  ]},
  "Rack D":{areas:3,occupied:12,cols:["C1","C2","C3","C4","C5","C6"],shelves:[
    {id:"S1",fill:12,units:[{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"},{t:"empty"}]},
  ]},
};

const ALERTS=[
  {id:"Rack A2-S2",med:"Azithromycin",shelf:"Shelf 2",expiry:"2024-05-11",alert:"Medium Stock",at:"amber",status:"In Progress",sc:"#3d3bdb"},
  {id:"Rack A4-S3",med:"Ibuprofen",shelf:"Shelf 3",expiry:"2024-04-29",alert:"Overloaded",at:"red",status:"Review Needed",sc:"#d97706"},
  {id:"Rack A6-S1",med:"Paracetamol",shelf:"Shelf 1",expiry:"2024-04-30",alert:"Overloaded",at:"red",status:"Review Needed",sc:"#d97706"},
  {id:"Rack B2-S1",med:"Vitamin C",shelf:"Shelf 1",expiry:"—",alert:"Low Stock",at:"orange",status:"Monitored",sc:"#059669"},
];

const SB={empty:"sb-empty",medium:"sb-medium",overload:"sb-overload",expiring:"sb-expiring",full:"sb-full"};
const FILL_C=p=>p>=85?"#ef4444":p>=60?"#f97316":p>=30?"#3b82f6":"#22c55e";

function Donut({pct}){
  const R=44,cx=60,cy=60,sw=12,c=2*Math.PI*R,d=(pct/100)*c;
  return(
    <svg width={120} height={120} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#f1f5f9" strokeWidth={sw}/>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#3d3bdb" strokeWidth={sw}
        strokeDasharray={`${d} ${c-d}`} strokeDashoffset={c*.25} strokeLinecap="round"
        style={{transition:"stroke-dasharray .7s cubic-bezier(.4,0,.2,1)"}}/>
    </svg>
  );
}

function CapRing({pct}){
  const R=16,sw=3.5,c=2*Math.PI*R,d=(pct/100)*c;
  const col=pct>=85?"#ef4444":pct>=60?"#f97316":"#22c55e";
  return(
    <svg width={44} height={44} viewBox="0 0 44 44" style={{transform:"rotate(-90deg)"}}>
      <circle cx={22} cy={22} r={R} fill="none" stroke="#e2e8f0" strokeWidth={sw}/>
      <circle cx={22} cy={22} r={R} fill="none" stroke={col} strokeWidth={sw}
        strokeDasharray={`${d} ${c-d}`} strokeLinecap="round"
        style={{transition:"stroke-dasharray .5s"}}/>
    </svg>
  );
}

function SlotBlock({unit}){
  return(
    <div className={`rv-slot-block ${SB[unit.t]||SB.empty}`}>
      <span className="rv-slot-dot"/>
      {unit.tip && <div className="rv-slot-tip">{unit.tip}</div>}
      {unit.t==="empty"
        ? <span className="rv-slot-open">OPEN</span>
        : unit.pct
          ? <><span className="rv-slot-pct">{unit.pct}</span><span className="rv-slot-sub">{unit.sub}</span></>
          : <><span className="rv-slot-main">{unit.name}</span><span className="rv-slot-sub">{unit.sub}</span></>
      }
    </div>
  );
}

export default function RackView(){
  const [active,setActive]=useState("Rack A");
  const [search,setSearch]=useState("");
  const rack=RACKS[active];
  const colCount=rack.cols.length;
  const gridCols=`56px repeat(${colCount},1fr) 56px`;

  return(
    <>
      <style>{css}</style>
      <div className="rv">

        {/* ── BAR 1 ── */}
        <header className="rv-bar1 box_shadow mx-4">
          <div className="rv-bar1-icon">
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
          </div>
          <span className="rv-bar1-title">Rack View</span>
          <div className="rv-bar1-vdiv"/>
          <div className="rv-crumb">
            <span>Store</span>
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            <span className="rv-crumb-curr">Rack View</span>
          </div>
          <div className="rv-bar1-spacer"/>
          <button className="rv-btn-add">
            <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            Add New Rack
          </button>
        </header>

        {/* ── BAR 2 ── */}
        <div className="rv-bar2">
          <div className="rv-bar2-chips">

            {/* Total Racks */}
            <button className="rv-chip c-blue box_shadow">
              <span className="rv-chip-icon">
                <svg width="22" height="22" fill="none" stroke="#3d3bdb" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="5" rx="1.5"/>
                  <rect x="2" y="10" width="20" height="5" rx="1.5"/>
                  <rect x="2" y="17" width="20" height="4" rx="1.5"/>
                  <circle cx="19.5" cy="5.5" r="1" fill="#3d3bdb" stroke="none"/>
                  <circle cx="19.5" cy="12.5" r="1" fill="#3d3bdb" stroke="none"/>
                </svg>
              </span>
              <span className="rv-chip-text">
                <span className="rv-chip-label">Total Racks</span>
                <span className="rv-chip-value">197</span>
                <span className="rv-chip-bar"><span className="rv-chip-bar-fill" style={{width:"78%"}}/></span>
              </span>
              <span className="rv-chip-trend">↑ 1,248 spaces</span>
            </button>

            {/* Available Spaces */}
            <button className="rv-chip c-green box_shadow">
              <span className="rv-chip-icon">
                <svg width="22" height="22" fill="none" stroke="#16a34a" strokeWidth="1.9" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4"/>
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                </svg>
              </span>
              <span className="rv-chip-text">
                <span className="rv-chip-label">Available Spaces</span>
                <span className="rv-chip-value">151</span>
                <span className="rv-chip-bar"><span className="rv-chip-bar-fill" style={{width:"76%"}}/></span>
              </span>
              <span className="rv-chip-trend">↑ 76.4%</span>
            </button>

            {/* Medium Stock */}
            <button className="rv-chip c-amber box_shadow">
              <span className="rv-chip-icon">
                <svg width="22" height="22" fill="none" stroke="#d97706" strokeWidth="1.9" viewBox="0 0 24 24">
                  <path d="M12 9v4M12 17h.01"/>
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                </svg>
              </span>
              <span className="rv-chip-text">
                <span className="rv-chip-label">Medium Stock</span>
                <span className="rv-chip-value">32</span>
                <span className="rv-chip-bar"><span className="rv-chip-bar-fill" style={{width:"16%"}}/></span>
              </span>
              <span className="rv-chip-trend">⚠ 16.2%</span>
            </button>

            {/* Full Racks */}
            <button className="rv-chip c-red box_shadow">
              <span className="rv-chip-icon">
                <svg width="22" height="22" fill="none" stroke="#dc2626" strokeWidth="1.9" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
              </span>
              <span className="rv-chip-text">
                <span className="rv-chip-label">Full Racks</span>
                <span className="rv-chip-value">14</span>
                <span className="rv-chip-bar"><span className="rv-chip-bar-fill" style={{width:"7%"}}/></span>
              </span>
              <span className="rv-chip-trend">↑ 7.1%</span>
            </button>

          </div>
        </div>

        {/* ── BODY ── */}
        <main className="rv-body">
          <div className="rv-toprow">
            <div className="rv-toprow-left">
              <span className="rv-page-title">{active}</span>
              <span className="rv-tag">{rack.areas} Areas</span>
              <span className="rv-tag">{ALERTS.length} Alerts</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="rv-search">
                <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search racks or medicines…"/>
              </div>
              <span className="rv-count">Results: <b>197</b></span>
            </div>
          </div>

          <div className="rv-layout">

            {/* RACK PANEL */}
            <div className="rv-panel box_shadow">
              <div className="rv-tabstrip">
                {Object.keys(RACKS).map(r=>(
                  <button key={r} className={`rv-tabstrip-btn${active===r?" on":""}`} onClick={()=>setActive(r)}>{r}</button>
                ))}
              </div>

              <div className="rv-rack-body">
                <div className="rv-rack-hdr">
                  <div style={{display:"flex",alignItems:"center"}}>
                    <span className="rv-rack-title">{active}</span>
                    <span className="rv-rack-sub">· {rack.shelves.length} shelves · {colCount} columns</span>
                  </div>
                  <div className="rv-rack-hdr-right">
                    <div style={{textAlign:"right",marginRight:6}}>
                      <div style={{fontSize:11,fontWeight:700,color:"var(--mute)",textTransform:"uppercase",letterSpacing:".06em"}}>Capacity</div>
                      <div style={{fontSize:20,fontWeight:800,color:"var(--ink)",lineHeight:1,fontFamily:"var(--mono)"}}>{rack.occupied}%</div>
                    </div>
                    <div className="rv-cap-ring">
                      <CapRing pct={rack.occupied}/>
                    </div>
                  </div>
                </div>

                <div className="rv-grid-outer">
                  {/* Col headers */}
                  <div className="rv-grid-col-heads" style={{gridTemplateColumns:gridCols}}>
                    <div className="rv-grid-col-head" style={{background:"#e4e9f2"}}/>
                    {rack.cols.map(c=><div key={c} className="rv-grid-col-head">{c}</div>)}
                    <div className="rv-grid-col-head" style={{background:"#e4e9f2",borderRight:"none"}}>Fill</div>
                  </div>

                  {/* Shelf rows */}
                  {rack.shelves.map(shelf=>(
                    <div key={shelf.id} className="rv-grid-row" style={{gridTemplateColumns:gridCols}}>
                      <div className="rv-grid-row-label">
                        <span className="rv-row-id">{shelf.id}</span>
                        <div className="rv-row-fill-bar">
                          <div className="rv-row-fill-inner" style={{height:`${shelf.fill}%`,marginTop:`${100-shelf.fill}%`,background:FILL_C(shelf.fill)}}/>
                        </div>
                      </div>
                      {shelf.units.map((u,i)=>(
                        <div key={i} className="rv-grid-cell"><SlotBlock unit={u}/></div>
                      ))}
                      <div className="rv-grid-row-stat">
                        <span className="rv-row-pct">{shelf.fill}%</span>
                        <div className="rv-row-bar">
                          <div className="rv-row-bar-fill" style={{width:`${shelf.fill}%`,background:FILL_C(shelf.fill)}}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rv-legend">
                {[
                  {c:"#dcfce7",b:"#86efac",t:"Available Space"},
                  {c:"#fef9c3",b:"#fde047",t:"Medium Stock"},
                  {c:"#fee2e2",b:"#fca5a5",t:"Overloaded"},
                  {c:"#ffedd5",b:"#fdba74",t:"Expiring Soon"},
                  {c:"#ede9fe",b:"#c4b5fd",t:"Full"},
                ].map(l=>(
                  <div key={l.t} className="rv-leg-item">
                    <span className="rv-leg-dot" style={{background:l.c,border:`1.5px solid ${l.b}`}}/>
                    {l.t}
                  </div>
                ))}
              </div>
            </div>

            {/* UTILIZATION CARD */}
            <div className="rv-util box_shadow">
              <div className="rv-util-head">
                <div className="rv-util-eyebrow">Utilization</div>
                <div className="rv-util-name">{active}</div>
              </div>
              <div className="rv-util-body">
                <div className="rv-donut">
                  <Donut pct={rack.occupied}/>
                  <div className="rv-donut-mid">
                    <div className="rv-donut-num">{rack.occupied}%</div>
                    <div className="rv-donut-lbl">Used</div>
                  </div>
                </div>
                <div className="rv-util-rows">
                  {[
                    {c:"#3d3bdb",label:"Occupied",val:rack.occupied},
                    {c:"#e2e8f0",label:"Empty",val:+(100-rack.occupied).toFixed(1)},
                  ].map(r=>(
                    <div key={r.label} className="rv-util-row">
                      <div className="rv-util-row-head">
                        <div className="rv-util-row-lbl">
                          <span className="rv-util-row-dot" style={{background:r.c}}/>
                          {r.label}
                        </div>
                        <span className="rv-util-row-val">{r.val}%</span>
                      </div>
                      <div className="rv-prog">
                        <div className="rv-prog-fill" style={{width:`${r.val}%`,background:r.c}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ALERTS */}
          <div className="rv-alerts box_shadow">
            <div className="rv-alerts-head">
              <div className="rv-alerts-hl">
                <span className="rv-alerts-ttl">Rack Alerts</span>
                <span className="rv-alerts-cnt">{ALERTS.length} Active</span>
              </div>
            </div>
            <table className="rv-tbl">
              <thead>
                <tr>{["Rack ID","Medicine Name","Shelf Number","Expiry Date","Alert Type","Status"].map(h=><th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {ALERTS.map((a,i)=>(
                  <tr key={i}>
                    <td><span className="rv-tid"><span className="rv-tid-dot"/>{a.id}</span></td>
                    <td style={{fontWeight:700,color:"var(--ink)",fontSize:13}}>{a.med}</td>
                    <td>{a.shelf}</td>
                    <td><span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--ink2)"}}>{a.expiry}</span></td>
                    <td>
                      <span className={`rv-badge b-${a.at}`}>
                        <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1L1 14h14L8 1zm0 4l3.5 6.5h-7L8 5z"/></svg>
                        {a.alert}
                      </span>
                    </td>
                    <td>
                      <span className="rv-st" style={{color:a.sc}}>
                        <span className="rv-st-dot" style={{background:a.sc}}/>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rv-alerts-foot">
              <div className="rv-legend" style={{padding:0,border:"none",background:"none"}}>
                {[
                  {c:"#dcfce7",b:"#86efac",t:"Available Space"},
                  {c:"#fef9c3",b:"#fde047",t:"Avg. Days of Stock"},
                  {c:"#fee2e2",b:"#fca5a5",t:"High Stock (Overloaded)"},
                  {c:"#ffedd5",b:"#fdba74",t:"Full (Expiring Soon)"},
                ].map(l=>(
                  <div key={l.t} className="rv-leg-item">
                    <span className="rv-leg-dot" style={{background:l.c,border:`1.5px solid ${l.b}`}}/>
                    {l.t}
                  </div>
                ))}
              </div>
              <button className="rv-btn-all">
                View All Alerts
                <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}