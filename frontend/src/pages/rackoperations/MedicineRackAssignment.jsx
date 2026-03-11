import { useState } from "react";
import { FiPlus, FiUpload, FiDownload } from "react-icons/fi";
import "./style.css";

const initialRecentAssignments = [
  { id: 1, medicineName: "Paracetamol", rack: "Rack A", shelf: "Shelf 1", slot: "A1", slot2: "A1", quantity: 50, expiryDate: "10/01/2026" },
  { id: 2, medicineName: "Crocin", rack: "Rack A", shelf: "Shelf 1", slot: "A2", slot2: "A2", quantity: 30, expiryDate: "09/01/2026" },
  { id: 3, medicineName: "Azithromycin", rack: "Rack B", shelf: "Shelf 2", slot: "B2", slot2: "B2", quantity: 30, expiryDate: "01/15/2027" },
  { id: 4, medicineName: "Azithromycin", rack: "Rack B", shelf: "Shelf 2", slot: "B3", slot2: "B3", quantity: 10, expiryDate: "03/01/2027" },
];

const importPreview = [
  { medicineName: "Paracetamol", room: "Main Store", wall: "Left Wall", rack: "Rack A", shelf: "1", slot: "A1", batch: "P1234", quantity: 50, expiryDate: "10/01/2026" },
  { medicineName: "Crocin", room: "Main Store", wall: "Left Wall", rack: "Rack A", shelf: "1", slot: "A1", batch: "C5678", quantity: 40, expiryDate: "10/01/2026" },
  { medicineName: "Azithromycin", room: "Main Store", wall: "Right Wall", rack: "Rack B", shelf: "2", slot: "B2", batch: "A9876", quantity: 30, expiryDate: "01/15/2027" },
];

function TopHeaderBar({ onImportClick, onAssignClick, onCsvClick }) {
  return (
    <>
      <style>{`
        .nh-bar {
          background: #ffffff;
          border-bottom: 1px solid #e8eaf0;
          height: 58px;
          display: flex;
          align-items: center;
          padding: 0 25px;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 1000;
          margin-top: 20px;
        }
        .nh-title {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nh-spacer { flex: 1; }
        .nh-btn-primary {
          display: flex; align-items: center; gap: 7px;
          background: #3d3bdb; color: #fff;
          border: none; border-radius: 9px;
          padding: 0 16px; height: 38px;
          font-size: 13.5px; font-weight: 600;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: background 0.15s;
        }
        .nh-btn-primary:hover { background: #3730a3; }
        .nh-btn-outline {
          display: flex; align-items: center; gap: 7px;
          background: #fff; color: #374151;
          border: 1.5px solid #d1d5db; border-radius: 9px;
          padding: 0 16px; height: 38px;
          font-size: 13.5px; font-weight: 600;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: background 0.15s, border-color 0.15s;
        }
        .nh-btn-outline:hover { background: #f9fafb; border-color: #9ca3af; }
        @media (max-width: 600px) {
          .nh-btn-outline { display: none; }
          .nh-title { font-size: 15px; }
        }
      `}</style>

      <header className="nh-bar box_shadow mx-4">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span className="nh-title">Medicine Rack Assignment</span>
        </div>
        <div className="nh-spacer" />
        <button className="nh-btn-primary" onClick={onAssignClick}>
          <FiPlus size={16} />
          Assign Manually
        </button>
        <button className="nh-btn-outline" onClick={onCsvClick}>
          <FiUpload size={15} />
          CSV
        </button>
        <button className="nh-btn-primary" onClick={onImportClick}>
          <FiDownload size={15} />
          Import CSV
        </button>
      </header>
    </>
  );
}

/* ── Assign Manually Modal ── */
function AssignManuallyModal({ onClose, onSave }) {
  const [form, setForm] = useState({ medicineName: "", rack: "", shelf: "", slot: "", slot2: "", quantity: "", expiryDate: "" });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fields = [
    { name: "medicineName", label: "Medicine Name" },
    { name: "rack",         label: "Rack" },
    { name: "shelf",        label: "Shelf" },
    { name: "slot",         label: "Slot" },
    { name: "slot2",        label: "Slot 2" },
    { name: "quantity",     label: "Quantity" },
    { name: "expiryDate",   label: "Expiry Date" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="box_shadow" style={{ background: "#fff", borderRadius: 12, padding: 28, width: 440, maxWidth: "95vw" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h6 style={{ fontWeight: 700, color: "#0f172a", fontSize: 16, margin: 0 }}>Assign Manually</h6>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {fields.map(f => (
            <div key={f.name}>
              <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, display: "block", marginBottom: 4 }}>{f.label}</label>
              <input name={f.name} value={form[f.name]} onChange={handle}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #d1d5db", borderRadius: 7, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
          <button onClick={onClose} style={{ border: "1.5px solid #d1d5db", background: "#fff", color: "#374151", borderRadius: 9, padding: "0 18px", height: 38, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{ background: "#3d3bdb", color: "#fff", border: "none", borderRadius: 9, padding: "0 20px", height: 38, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

const MedicineRackAssignment = () => {
  const [fileName, setFileName]     = useState("medicine_rack.csv");
  const [validated]                 = useState(true);
  const [showImport, setShowImport] = useState(true);
  const [showAssign, setShowAssign] = useState(false);
  const [assignments, setAssignments] = useState(initialRecentAssignments);
  const [editingId, setEditingId]   = useState(null);
  const [editData, setEditData]     = useState({});
  const [importData, setImportData] = useState(importPreview);
  const [viewRack, setViewRack]     = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };
  const handleDelete = (id) => setAssignments(assignments.filter((a) => a.id !== id));
  const handleEdit   = (row) => { setEditingId(row.id); setEditData({ ...row }); };
  const handleSave   = () => { setAssignments(assignments.map((a) => (a.id === editingId ? editData : a))); setEditingId(null); };

  const handleAssignSave = (form) => {
    if (!form.medicineName) return;
    setAssignments(prev => [...prev, { ...form, id: Date.now(), quantity: Number(form.quantity) || 0 }]);
    setShowAssign(false);
  };

  const handleImport = () => {
    const newRows = importData.map((r, i) => ({
      id: Date.now() + i,
      medicineName: r.medicineName,
      rack: r.rack,
      shelf: `Shelf ${r.shelf}`,
      slot: r.slot,
      slot2: r.slot,
      quantity: r.quantity,
      expiryDate: r.expiryDate,
    }));
    setAssignments(prev => [...prev, ...newRows]);
    setShowImport(false);
  };

  const handleValidate = () => alert(`✅ ${importData.length} records validated successfully.`);
  const handleDue      = () => alert("Showing due medicines filter.");
  const handleCsvExport = () => {
    const header = "Medicine Name,Rack,Shelf,Slot,Slot2,Quantity,Expiry Date\n";
    const rows = assignments.map(a => `${a.medicineName},${a.rack},${a.shelf},${a.slot},${a.slot2},${a.quantity},${a.expiryDate}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href = url; a.download = "assignments.csv"; a.click();
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>

      <TopHeaderBar
        onImportClick={() => setShowImport(true)}
        onAssignClick={() => setShowAssign(true)}
        onCsvClick={handleCsvExport}
      />

      {showAssign && <AssignManuallyModal onClose={() => setShowAssign(false)} onSave={handleAssignSave} />}

      {/* View Rack Modal */}
      {viewRack && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="box_shadow" style={{ background: "#fff", borderRadius: 12, padding: 28, width: 360, maxWidth: "95vw" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h6 style={{ fontWeight: 700, fontSize: 16, margin: 0, color: "#0f172a" }}>Rack Details</h6>
              <button onClick={() => setViewRack(null)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            {[["Medicine", viewRack.medicineName], ["Rack", viewRack.rack], ["Shelf", viewRack.shelf], ["Slot", viewRack.slot], ["Quantity", viewRack.quantity], ["Expiry", viewRack.expiryDate]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9", fontSize: 13 }}>
                <span style={{ color: "#6b7280", fontWeight: 500 }}>{k}</span>
                <span style={{ color: "#111827", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <button onClick={() => setViewRack(null)} style={{ marginTop: 18, width: "100%", background: "#3d3bdb", color: "#fff", border: "none", borderRadius: 9, height: 38, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}

      <div style={{ padding: "28px 24px" }}>

        {/* Import Card */}
        {showImport && (
          <div className="box_shadow" style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 28, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h6 style={{ fontWeight: 700, color: "#0f172a", fontSize: 16, margin: 0 }}>Import Medicine Rack Assignment</h6>
              <button onClick={() => setShowImport(false)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ border: "1.5px dashed #cbd5e1", borderRadius: 10, padding: "22px 20px", background: "#f8fafc", marginBottom: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b", marginBottom: 12 }}>Upload CSV File</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #cbd5e1", borderRadius: 7, overflow: "hidden", flex: 1, background: "#fff" }}>
                  <label style={{ padding: "8px 14px", background: "#f1f5f9", borderRight: "1px solid #cbd5e1", cursor: "pointer", fontSize: 13, color: "#374151", fontWeight: 500, whiteSpace: "nowrap" }}>
                    Choose File
                    <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: "none" }} />
                  </label>
                  <span style={{ padding: "8px 14px", fontSize: 13, color: "#64748b" }}>{fileName}</span>
                </div>
                <button style={{ background: "#3d3bdb", color: "#fff", border: "none", borderRadius: 7, padding: "9px 22px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  Upload
                </button>
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>Supported format: <strong>.csv</strong></div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Columns: Room, Wall, Rack, Shelf, Slot, Medicine Name, Batch, Quantity, Expiry Date</div>
            </div>

            {validated && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, marginBottom: 16 }}>
                <span style={{ color: "#16a34a", fontSize: 16 }}>✅</span>
                <span style={{ fontSize: 13, color: "#15803d", fontWeight: 500 }}>Validation complete. 3 records ready for import.</span>
              </div>
            )}

            <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Medicine Name", "Room", "Wall", "Rack", "Shelf", "Slot", "Batch", "Quantity", "Expiry Date"].map((h) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {importData.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 14px", color: "#1e293b", fontWeight: 500 }}>{row.medicineName}</td>
                      <td style={{ padding: "10px 14px", color: "#3b82f6" }}>{row.room}</td>
                      <td style={{ padding: "10px 14px", color: "#3b82f6" }}>{row.wall}</td>
                      <td style={{ padding: "10px 14px", color: "#3b82f6" }}>{row.rack}</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>{row.shelf}</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>{row.slot}</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>{row.batch}</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>{row.quantity}</td>
                      <td style={{ padding: "10px 14px", color: "#64748b" }}>{row.expiryDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
              <button onClick={handleValidate} style={{ border: "1.5px solid #d1d5db", background: "#fff", color: "#374151", borderRadius: 9, padding: "0 18px", height: 38, fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>
                Validate
              </button>
              <button onClick={handleDue} style={{ border: "1.5px solid #d1d5db", background: "#fff", color: "#374151", borderRadius: 9, padding: "0 18px", height: 38, fontWeight: 600, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                🗓 Due
              </button>
              <button onClick={handleImport} style={{ background: "#3d3bdb", color: "#fff", border: "none", borderRadius: 9, padding: "0 20px", height: 38, fontWeight: 600, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                ↓ Import
              </button>
            </div>
          </div>
        )}

        {/* Recent Assignments */}
        <div className="box_shadow" style={{ background: "#fff", border: "1px solid #e2e8f0", padding: 28, borderRadius: 12 }}>
          <h6 style={{ fontWeight: 700, color: "#111827", fontSize: 17, marginBottom: 18 }}>Recent Assignments</h6>
          <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid #e2e8f0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Medicine Name", "Rack", "Shelf", "Slot", "Slot", "Quantity", "Expiry Date", "", "", ""].map((h, i) => (
                    <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#374151", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap", fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assignments.map((row) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    {editingId === row.id ? (
                      <>
                        {["medicineName", "rack", "shelf", "slot", "slot2", "quantity", "expiryDate"].map((field) => (
                          <td key={field} style={{ padding: "8px 10px" }}>
                            <input
                              value={editData[field]}
                              onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                              style={{ width: "100%", padding: "4px 8px", border: "1px solid #93c5fd", borderRadius: 5, fontSize: 12 }}
                            />
                          </td>
                        ))}
                        <td style={{ padding: "8px 10px" }}>
                          <button onClick={handleSave} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Save</button>
                        </td>
                        <td></td>
                        <td>
                          <button onClick={() => setEditingId(null)} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer" }}>✕</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: "11px 14px", color: "#111827", fontWeight: 500, fontSize: 13.5 }}>{row.medicineName}</td>
                        <td style={{ padding: "11px 14px", color: "#6b7280", fontSize: 13 }}>{row.rack}</td>
                        <td style={{ padding: "11px 14px", color: "#6b7280", fontSize: 13 }}>{row.shelf}</td>
                        <td style={{ padding: "11px 14px", color: "#6b7280", fontSize: 13 }}>{row.slot}</td>
                        <td style={{ padding: "11px 14px", color: "#6b7280", fontSize: 13 }}>{row.slot2}</td>
                        <td style={{ padding: "11px 14px", color: "#6b7280", fontSize: 13 }}>{row.quantity}</td>
                        <td style={{ padding: "11px 14px", color: "#6b7280", fontSize: 13 }}>{row.expiryDate}</td>
                        <td style={{ padding: "11px 10px" }}>
                          <button onClick={() => setViewRack(row)} style={{ background: "none", border: "1.5px solid #d1d5db", borderRadius: 8, padding: "5px 12px", fontSize: 13, cursor: "pointer", color: "#3d3bdb", fontWeight: 600, whiteSpace: "nowrap" }}>
                            🔍 View Rack
                          </button>
                        </td>
                        <td style={{ padding: "11px 6px" }}>
                          <button onClick={() => handleEdit(row)} style={{ background: "none", border: "1.5px solid #d1d5db", borderRadius: 8, padding: "5px 12px", fontSize: 13, cursor: "pointer", color: "#374151", fontWeight: 600 }}>
                            ✏️ Edit
                          </button>
                        </td>
                        <td style={{ padding: "11px 6px" }}>
                          <button onClick={() => handleDelete(row.id)} style={{ background: "none", border: "1.5px solid #fecaca", borderRadius: 8, padding: "5px 10px", fontSize: 13, cursor: "pointer", color: "#ef4444" }}>
                            🗑
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MedicineRackAssignment;