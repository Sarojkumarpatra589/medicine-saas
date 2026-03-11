import React, { useState } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #1e40af;
    --blue-mid: #2563eb;
    --blue-hover: #1d4ed8;
    --blue-light: #dbeafe;
    --blue-pale: #eff6ff;
    --slate: #64748b;
    --border: #e5e7eb;
    --bg: #f1f5f9;
    --white: #ffffff;
    --text: #0f172a;
    --text2: #374151;
    --text3: #6b7280;
    --text4: #9ca3af;
    --red: #dc2626;
    --red-bg: #fee2e2;
    --green: #059669;
    --green-bg: #ecfdf5;
    --font: 'Inter', sans-serif;
    --sh-sm: 0 1px 3px rgba(0,0,0,0.06);
    --sh: 0 2px 8px rgba(0,0,0,0.08);
    --sh-md: 0 4px 20px rgba(0,0,0,0.10);
    --sh-lg: 0 8px 32px rgba(0,0,0,0.13);
    --r: 12px;
    --r-sm: 8px;
    --r-xs: 6px;
  }

  .wrap {
    min-height: 100vh;
    font-family: var(--font);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .card {
    background: var(--white);
    width: 100%;
    border-radius: 16px;
    box-shadow: var(--sh-md);
    overflow: hidden;
    animation: up 0.35s ease;
  }

  @keyframes up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Header ── */
  .hdr {
    background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .hdr-left { display: flex; align-items: center; gap: 11px; }

  .hdr-icon {
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.15);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    backdrop-filter: blur(4px);
  }

  .hdr-title { font-size: 17px; font-weight: 700; color: #fff; letter-spacing: -0.2px; }
  .hdr-sub   { font-size: 11.5px; color: rgba(255,255,255,0.6); margin-top: 1px; }

  .hdr-right { display: flex; align-items: center; gap: 8px; }

  .hdr-pill {
    padding: 5px 12px; border-radius: 20px;
    background: rgba(255,255,255,0.13);
    border: 1px solid rgba(255,255,255,0.2);
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.92);
    display: flex; align-items: center; gap: 6px;
  }

  .live-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }

  /* ── Toolbar ── */
  .toolbar {
    padding: 11px 24px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
    background: #fafbfd;
  }

  .lbl { font-size: 11.5px; font-weight: 600; color: var(--text3); }

  .room-sel {
    background: var(--white); border: 1.5px solid var(--border);
    color: var(--text); font-family: var(--font); font-size: 13px; font-weight: 500;
    padding: 6px 10px; border-radius: var(--r-sm); outline: none; cursor: pointer;
    transition: border-color 0.15s;
  }
  .room-sel:focus { border-color: var(--blue-mid); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }

  .toolbar-sep { flex: 1; }

  .btn {
    padding: 7px 16px; border-radius: var(--r-sm); font-size: 12.5px; font-weight: 600;
    font-family: var(--font); cursor: pointer; border: none; transition: all 0.15s;
    display: flex; align-items: center; gap: 6px; white-space: nowrap;
  }
  .btn-ghost { background: var(--white); border: 1.5px solid var(--border); color: var(--text2); }
  .btn-ghost:hover { border-color: #9ca3af; color: var(--text); }
  .btn-blue { background: var(--blue); color: #fff; box-shadow: 0 2px 8px rgba(30,64,175,0.28); }
  .btn-blue:hover { background: var(--blue-hover); }
  .btn-sm { padding: 5px 11px; font-size: 12px; }

  /* ── Stats row ── */
  .stats-row {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid var(--border);
  }

  .stat {
    padding: 13px 20px;
    border-right: 1px solid var(--border);
  }
  .stat:last-child { border-right: none; }

  .stat-val { font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -0.5px; line-height: 1; }
  .stat-lbl { font-size: 11px; color: var(--text4); margin-top: 3px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.4px; }

  /* ── Body ── */
  .body { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }

  /* ── Wall block ── */
  .wall-block {
    border: 1.5px solid var(--border);
    border-radius: var(--r);
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .wall-block:hover { box-shadow: var(--sh); }

  .wall-head {
    padding: 11px 16px;
    background: #f8fafc;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }

  .wall-head-l { display: flex; align-items: center; gap: 9px; }
  .wall-indicator { width: 3px; height: 20px; border-radius: 2px; flex-shrink: 0; }
  .wall-name { font-size: 13.5px; font-weight: 700; color: var(--text); }
  .wall-cnt {
    font-size: 11px; font-weight: 600; color: var(--blue-mid);
    background: var(--blue-pale); border: 1px solid var(--blue-light);
    padding: 2px 8px; border-radius: 10px;
  }

  .add-rack-btn {
    padding: 5px 12px; border-radius: var(--r-xs); font-size: 11.5px; font-weight: 600;
    font-family: var(--font); cursor: pointer;
    background: transparent; border: 1.5px dashed var(--border); color: var(--text3);
    transition: all 0.15s; display: flex; align-items: center; gap: 4px;
  }
  .add-rack-btn:hover { border-color: var(--blue-mid); color: var(--blue-mid); background: var(--blue-pale); }

  /* ── Items area ── */
  .items-area {
    padding: 16px;
    display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
    min-height: 86px;
  }

  .empty-msg { font-size: 12.5px; color: var(--text4); font-style: italic; }

  /* ── Rack tile ── */
  .rack {
    width: 70px; height: 62px;
    border-radius: 10px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    cursor: pointer; user-select: none;
    transition: all 0.18s;
    border: 2px solid transparent;
    position: relative;
    gap: 3px;
  }
  .rack:hover { transform: translateY(-3px); filter: brightness(1.06); }
  .rack.sel {
    border-color: rgba(0,0,0,0.25);
    transform: scale(1.07) translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.18) !important;
  }
  .rack-lbl { font-size: 13.5px; font-weight: 800; color: rgba(255,255,255,0.97); line-height: 1; }
  .rack-sub { font-size: 8px; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.5px; }
  .rack-dot { position: absolute; top: 6px; right: 6px; width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.45); }

  /* ── Inline add form ── */
  .add-form {
    padding: 0 16px 14px;
    display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
  }
  .af-input {
    background: var(--bg); border: 1.5px solid var(--border); color: var(--text);
    font-family: var(--font); font-size: 13px; padding: 6px 10px; border-radius: var(--r-sm);
    outline: none; width: 100px; transition: border-color 0.15s;
  }
  .af-input:focus { border-color: var(--blue-mid); background: var(--white); }
  .af-colors { display: flex; gap: 5px; }
  .af-swatch {
    width: 22px; height: 22px; border-radius: 5px; cursor: pointer;
    border: 2px solid transparent; outline: 1px solid rgba(0,0,0,0.08); transition: all 0.13s;
  }
  .af-swatch:hover { transform: scale(1.14); }
  .af-swatch.on { border-color: #0f172a; transform: scale(1.14); }
  .af-ok {
    padding: 6px 13px; background: var(--blue); color: #fff; border: none;
    border-radius: var(--r-sm); font-size: 12.5px; font-weight: 700; font-family: var(--font);
    cursor: pointer; transition: all 0.14s;
  }
  .af-ok:hover { background: var(--blue-hover); }
  .af-no {
    padding: 6px 11px; background: transparent; border: 1.5px solid var(--border);
    color: var(--text3); border-radius: var(--r-sm); font-size: 12.5px; font-weight: 600;
    font-family: var(--font); cursor: pointer; transition: all 0.14s;
  }
  .af-no:hover { color: var(--text); border-color: #9ca3af; }

  /* ── Selected bar ── */
  .sel-bar {
    margin: 0 24px 16px;
    padding: 12px 16px;
    background: var(--blue-pale);
    border: 1.5px solid var(--blue-light);
    border-radius: var(--r);
    display: flex; align-items: center; gap: 13px;
  }
  .sel-icon {
    width: 36px; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 800; color: #fff; flex-shrink: 0;
  }
  .sel-info { flex: 1; }
  .sel-name { font-size: 13.5px; font-weight: 700; color: var(--text); }
  .sel-meta { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .sel-btns { display: flex; gap: 7px; }
  .sel-desel {
    padding: 6px 11px; background: transparent; border: 1.5px solid var(--blue-light);
    color: var(--blue-mid); font-size: 12px; font-weight: 600; font-family: var(--font);
    cursor: pointer; border-radius: var(--r-sm); transition: all 0.14s;
  }
  .sel-desel:hover { background: var(--white); }
  .sel-del {
    padding: 6px 11px; background: var(--red-bg); border: 1.5px solid #fecaca;
    color: var(--red); font-size: 12px; font-weight: 600; font-family: var(--font);
    cursor: pointer; border-radius: var(--r-sm); transition: all 0.14s;
  }
  .sel-del:hover { background: #fee2e2; }

  /* ── Bottom ── */
  .bottom {
    padding: 14px 24px;
    border-top: 1px solid var(--border);
    background: #fafbfd;
    display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
  }

  .color-section { display: flex; align-items: center; gap: 10px; flex: 1; }
  .color-lbl { font-size: 12.5px; font-weight: 600; color: var(--text2); white-space: nowrap; }
  .swatches { display: flex; gap: 7px; }
  .swatch {
    width: 26px; height: 26px; border-radius: 6px; cursor: pointer;
    border: 2px solid transparent; outline: 1px solid rgba(0,0,0,0.07);
    transition: all 0.15s; position: relative;
  }
  .swatch:hover { transform: scale(1.14); }
  .swatch.on {
    border-color: #0f172a; transform: scale(1.14);
    box-shadow: 0 0 0 3px rgba(15,23,42,0.12);
  }
  .swatch.on::after {
    content: '✓'; position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 900; color: rgba(255,255,255,0.9);
  }

  .btn-group { display: flex; gap: 8px; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 20px; right: 20px;
    background: var(--white); border: 1px solid #a7f3d0; color: var(--green);
    font-size: 12.5px; font-weight: 600; font-family: var(--font);
    padding: 10px 16px; border-radius: var(--r-sm); z-index: 9999;
    display: flex; align-items: center; gap: 7px; box-shadow: var(--sh-lg);
    animation: tin 0.3s cubic-bezier(.34,1.56,.64,1);
  }
  @keyframes tin { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }
`

const COLORS  = ['#3b82f6','#1e40af','#64748b','#f97316','#10b981','#ef4444','#a855f7','#eab308']
const ROOMS   = ['Main Store','Cold Storage','Backup Storage','Archive','ICU Storage','Emergency Bay']
const RACK_TYPES = ['Rack','Multi','Cold','Counter','Cabinet','Safe']

let uid = 50

const initFront = [
  { id:'A',    label:'A',    sub:'Rack',  color:'#3b82f6' },
  { id:'B',    label:'B',    sub:'Rack',  color:'#3b82f6' },
  { id:'M1M2', label:'M1 M2',sub:'Multi', color:'#1e40af' },
  { id:'D',    label:'D',    sub:'Rack',  color:'#64748b' },
  { id:'FJ',   label:'F J',  sub:'Rack',  color:'#64748b' },
]
const initBack = [
  { id:'D2', label:'D', sub:'Rack', color:'#64748b' },
  { id:'E',  label:'E', sub:'Rack', color:'#64748b' },
  { id:'F',  label:'F', sub:'Rack', color:'#64748b' },
]

export default function RackLayoutDesigner() {
  const [room, setRoom]           = useState('Main Store')
  const [front, setFront]         = useState(initFront)
  const [back, setBack]           = useState(initBack)
  const [selected, setSelected]   = useState(null)
  const [noteColor, setNoteColor] = useState('#3b82f6')
  const [toast, setToast]         = useState(null)
  const [addingTo, setAddingTo]   = useState(null) // 'front' | 'back' | null
  const [newLbl, setNewLbl]       = useState('')
  const [newColor, setNewColor]   = useState('#3b82f6')
  const [newType, setNewType]     = useState('Rack')

  const showToast = m => { setToast(m); setTimeout(() => setToast(null), 2500) }

  const sel = selected
    ? (selected.wall === 'front' ? front : back).find(i => i.id === selected.id)
    : null

  const handleSelect = (item, wall) =>
    setSelected(selected?.id === item.id ? null : { ...item, wall })

  const handleDelete = () => {
    if (!selected) return
    if (selected.wall === 'front') setFront(f => f.filter(i => i.id !== selected.id))
    else setBack(b => b.filter(i => i.id !== selected.id))
    setSelected(null)
  }

  const openAdd = (wall) => {
    setAddingTo(wall); setNewLbl(''); setNewColor('#3b82f6'); setNewType('Rack')
  }

  const confirmAdd = () => {
    if (!newLbl.trim()) return
    const item = { id: 'r' + uid++, label: newLbl.trim(), sub: newType, color: newColor }
    if (addingTo === 'front') setFront(f => [...f, item])
    else setBack(b => [...b, item])
    setAddingTo(null)
  }

  const cancelAdd = () => setAddingTo(null)

  const handleSave  = () => showToast('Layout saved successfully')
  const handleClear = () => { setFront([]); setBack([]); setSelected(null) }

  const WallSection = ({ title, items, wall, color }) => (
    <div className="wall-block">
      <div className="wall-head">
        <div className="wall-head-l">
          <div className="wall-indicator" style={{ background: color }} />
          <span className="wall-name">{title}</span>
          <span className="wall-cnt">{items.length} racks</span>
        </div>
        <button className="add-rack-btn" onClick={() => openAdd(wall)}>＋ Add Rack</button>
      </div>

      <div className="items-area">
        {items.length === 0 && addingTo !== wall
          ? <span className="empty-msg">No racks on this wall — click "Add Rack" to begin</span>
          : items.map(item => (
            <div
              key={item.id}
              className={`rack ${selected?.id === item.id ? 'sel' : ''}`}
              style={{ background: item.color, boxShadow: `0 3px 10px ${item.color}55` }}
              onClick={() => handleSelect(item, wall)}
            >
              <div className="rack-dot" />
              <div className="rack-lbl">{item.label}</div>
              <div className="rack-sub">{item.sub}</div>
            </div>
          ))
        }
      </div>

      {addingTo === wall && (
        <div className="add-form">
          <input
            className="af-input"
            placeholder="Label (e.g. G)"
            value={newLbl}
            autoFocus
            onChange={e => setNewLbl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirmAdd()}
          />
          <select
            style={{ background:'var(--bg)', border:'1.5px solid var(--border)', color:'var(--text)', fontFamily:'var(--font)', fontSize:'12.5px', padding:'6px 8px', borderRadius:'var(--r-sm)', outline:'none', cursor:'pointer' }}
            value={newType} onChange={e => setNewType(e.target.value)}
          >
            {RACK_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <div className="af-colors">
            {COLORS.slice(0, 7).map(c => (
              <div key={c} className={`af-swatch ${newColor === c ? 'on' : ''}`}
                style={{ background: c }} onClick={() => setNewColor(c)} />
            ))}
          </div>
          <button className="af-ok" onClick={confirmAdd}>Add</button>
          <button className="af-no" onClick={cancelAdd}>Cancel</button>
        </div>
      )}
    </div>
  )

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        {toast && <div className="toast">✓ {toast}</div>}

        <div className="card">

          {/* Header */}
          <div className="hdr">
            <div className="hdr-left">
              <div className="hdr-icon">🗄️</div>
              <div>
                <div className="hdr-title">Rack Layout Designer</div>
                <div className="hdr-sub">Pharmacy Storage Management</div>
              </div>
            </div>
            <div className="hdr-right">
              <div className="hdr-pill"><div className="live-dot" /> Live</div>
              <div className="hdr-pill">📍 {room}</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <span className="lbl">Room</span>
            <select className="room-sel" value={room} onChange={e => setRoom(e.target.value)}>
              {ROOMS.map(r => <option key={r}>{r}</option>)}
            </select>
            <div className="toolbar-sep" />
            <button className="btn btn-ghost btn-sm" onClick={handleClear}>Clear All</button>
            <button className="btn btn-blue btn-sm" onClick={handleSave}>💾 Save Layout</button>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat">
              <div className="stat-val">{front.length + back.length}</div>
              <div className="stat-lbl">Total Racks</div>
            </div>
            <div className="stat">
              <div className="stat-val">{front.length}</div>
              <div className="stat-lbl">Front Wall</div>
            </div>
            <div className="stat">
              <div className="stat-val">{back.length}</div>
              <div className="stat-lbl">Back Wall</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: 'var(--blue-mid)' }}>{room.split(' ')[0]}</div>
              <div className="stat-lbl">Current Room</div>
            </div>
          </div>

          {/* Walls */}
          <div className="body">
            <WallSection title="Front Wall" items={front} wall="front" color="#3b82f6" />
            <WallSection title="Back Wall"  items={back}  wall="back"  color="#64748b" />
          </div>

          {/* Selected bar */}
          {sel && (
            <div className="sel-bar">
              <div className="sel-icon" style={{ background: sel.color }}>{sel.label}</div>
              <div className="sel-info">
                <div className="sel-name">{sel.label} — {sel.sub}</div>
                <div className="sel-meta">{selected.wall === 'front' ? '▲ Front Wall' : '▼ Back Wall'}</div>
              </div>
              <div className="sel-btns">
                <button className="sel-desel" onClick={() => setSelected(null)}>Deselect</button>
                <button className="sel-del" onClick={handleDelete}>🗑 Delete</button>
              </div>
            </div>
          )}

          {/* Bottom */}
          <div className="bottom">
            <div className="color-section">
              <span className="color-lbl">Rack Note Color Coded</span>
              <div className="swatches">
                {COLORS.map(c => (
                  <div key={c} className={`swatch ${noteColor === c ? 'on' : ''}`}
                    style={{ background: c }} onClick={() => setNoteColor(c)} />
                ))}
              </div>
            </div>
            <div className="btn-group">
              <button className="btn btn-ghost" onClick={handleClear}>Clear</button>
              <button className="btn btn-blue" onClick={handleSave}>Save Layout</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}