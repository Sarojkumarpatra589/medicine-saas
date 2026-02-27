import { useState } from "react";
import { FiDownload,FiMoreVertical } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";


const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .bm-root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #eef0f3;
    min-height: 100vh;
    padding: 20px 20px;
    color: #111;
  }

  .bm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }
  .bm-title {
    font-size: 26px;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.3px;
  }
  .bm-new-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 22px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
  }
  .bm-new-btn:hover { background: #1d4ed8; }

  .bm-filter-card {
    padding: 18px 22px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .bm-select-wrap { position: relative; }
  .bm-select-wrap select {
    appearance: none;
    border: 1.5px solid #d1d5db;
    border-radius: 8px;
    padding: 9px 36px 9px 14px;
    font-size: 14px;
    font-family: inherit;
    color: #374151;
    background: #fff;
    cursor: pointer;
    min-width: 155px;
  }
  .bm-select-wrap select:focus { outline: none; border-color: #2563eb; }
  .bm-select-arrow {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #6b7280; font-size: 11px;
  }
  .bm-search-wrap { position: relative; flex: 1; min-width: 220px; }
  .bm-search-wrap input {
    width: 100%;
    border: 1.5px solid #d1d5db;
    border-radius: 8px;
    padding: 9px 14px 9px 40px;
    font-size: 14px;
    font-family: inherit;
    color: #374151;
    background: #fff;
  }
  .bm-search-wrap input:focus { outline: none; border-color: #2563eb; }
  .bm-search-icon {
    position: absolute; left: 13px; top: 50%;
    transform: translateY(-50%);
    color: #9ca3af; display: flex;
  }
  .bm-filter-group {
    display: flex; align-items: center;
    border: 1.5px solid #d1d5db;
    border-radius: 8px; overflow: hidden;
  }
  .bm-filter-group-left {
    display: flex; align-items: center; gap: 6px;
    padding: 9px 14px;
    font-size: 14px; font-family: inherit; color: #374151;
    background: #fff; border: none;
    cursor: pointer;
    border-right: 1.5px solid #d1d5db;
  }
  .bm-filter-group-arrow {
    padding: 9px 10px; background: #fff; border: none;
    font-size: 11px; color: #6b7280; cursor: pointer; font-family: inherit;
    border-right: 1.5px solid #d1d5db;
  }
  .bm-filter-btn {
    padding: 9px 16px; background: #fff; border: none;
    font-size: 14px; font-family: inherit; color: #374151;
    font-weight: 500; cursor: pointer;
  }

  .bm-table-card {
    background: #fff;
    overflow: visible;
  }
  .bm-table-wrap { overflow-x: auto; }

  table.bm-table { width: 100%; border-collapse: collapse; }
  .bm-table thead tr { border-bottom: 1.5px solid #f1f3f5; }
  .bm-table thead th {
    padding: 15px 20px;
    text-align: left;
    font-size: 13.5px; font-weight: 600; color: #374151;
    white-space: nowrap;
  }
  .bm-table tbody tr {
    border-bottom: 1px solid #f3f4f6;
    position: relative;
  }
  .bm-table tbody tr:last-child { border-bottom: none; }
  .bm-table tbody tr:hover { background: #fafbff; }
  .bm-table tbody td {
    padding: 14px 20px;
    font-size: 14px; color: #374151;
    vertical-align: middle;
  }

  .bm-med-cell {
    display: flex; align-items: center; gap: 11px;
    min-width: 180px;
  }
  .bm-med-img {
    width: 38px; height: 38px;
    border-radius: 8px; background: #f1f5f9;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
  }
  .bm-med-name { font-weight: 600; color: #111827; font-size: 14px; }
  .bm-med-dose { font-size: 11px; color: #9ca3af; font-weight: 400; margin-left: 3px; }

  .bm-barcode {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
  }
  .bm-barcode-label {
    font-size: 10px; color: #6b7280; letter-spacing: 0.5px; font-weight: 500;
  }

  .bm-badge-active {
    display: inline-flex; align-items: center; gap: 6px;
    background: #16a34a; color: #fff;
    border-radius: 20px; padding: 6px 14px 6px 10px;
    font-size: 13px; font-weight: 600; white-space: nowrap;
  }
  .bm-badge-inactive {
    display: inline-flex; align-items: center; gap: 6px;
    background: #9ca3af; color: #fff;
    border-radius: 20px; padding: 6px 14px 6px 10px;
    font-size: 13px; font-weight: 600; white-space: nowrap;
  }
  .bm-badge-heart { font-size: 12px; line-height: 1; }

  .bm-actions-td { position: relative; }
  .bm-dots-btn {
    width: 34px; height: 34px;
    border: 1.5px solid #e2e8f0; border-radius: 8px;
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; color: #6b7280; line-height: 1;
    letter-spacing: 2px;
  }
  .bm-dots-btn:hover { border-color: #94a3b8; background: #f8fafc; }

  .bm-dropdown {
    position: absolute;
    right: 8px; top: calc(100% - 4px);
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.13);
    z-index: 200; min-width: 210px; overflow: hidden;
    animation: bm-drop 0.12s ease;
  }
  @keyframes bm-drop {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bm-dropdown-item {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 12px 18px;
    background: none; border: none;
    font-size: 14px; font-family: inherit; color: #111827;
    cursor: pointer; text-align: left;
  }
  .bm-dropdown-item:hover { background: #f8f9fa; }
  .bm-dropdown-item.bm-red { color: #ef4444; }
  .bm-dropdown-item.bm-red:hover { background: #fff5f5; }
  .bm-dropdown-item svg { width: 17px; height: 17px; flex-shrink: 0; }
  .bm-red-circle {
    width: 19px; height: 19px;
    background: #ef4444; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: #fff; font-size: 10px; font-weight: 700;
  }

  .bm-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 15px 22px;
    border-top: 1px solid #f1f3f5;
    flex-wrap: wrap; gap: 10px;
  }
  .bm-showing { font-size: 13px; color: #6b7280; }
  .bm-pagination { display: flex; align-items: center; gap: 2px; }
  .bm-page-btn {
    width: 32px; height: 32px;
    border: none; border-radius: 7px;
    background: none;
    font-size: 13.5px; font-family: inherit; color: #374151;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-weight: 500;
  }
  .bm-page-btn:hover { background: #f1f5f9; }
  .bm-page-btn.pg-active { background: #fff; border: 1.5px solid #d1d5db; color: #111; }
  .bm-page-ellipsis { width: 28px; text-align: center; color: #9ca3af; font-size: 13px; }
  .bm-next-btn {
    display: flex; align-items: center; gap: 4px;
    background: none; border: none;
    font-size: 14px; font-weight: 600; color: #2563eb;
    cursor: pointer; font-family: inherit; padding: 0 6px;
  }
  .bm-next-btn:hover { text-decoration: underline; }
`;

// ── Barcode SVG ──────────────────────────────────────────────────────────────
function BarcodeImg({ code }) {
  const chars = (code + "XBARCODE").split("");
  const bars = [];
  let x = 0;
  for (let i = 0; i < 52; i++) {
    const ch = chars[i % chars.length].charCodeAt(0);
    const w = ((ch * (i + 7) * 3) % 3) + 1;
    const isBlack = (ch + i) % 3 !== 0;
    if (isBlack) bars.push({ x, w });
    x += w + 1;
  }
  return (
    <div className="bm-barcode">
      <svg width={x} height={34} viewBox={`0 0 ${x} 34`} xmlns="http://www.w3.org/2000/svg">
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={0} width={b.w} height={34} fill="#111827" rx="0.5" />
        ))}
      </svg>
      <span className="bm-barcode-label">{code}</span>
    </div>
  );
}

// ── QR Code SVG ──────────────────────────────────────────────────────────────
function QRImg({ code }) {
  const seed = code.split("").reduce((a, c, i) => a + c.charCodeAt(0) * (i + 1), 0);
  const size = 21;
  const cells = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inFinder =
        (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
      let filled;
      if (inFinder) {
        const lr = r % 7, lc = c % 7;
        filled =
          lr === 0 || lr === 6 || lc === 0 || lc === 6 ||
          (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
      } else {
        filled = ((seed * (r * size + c + 1) * 2654435761) >>> 0) % 3 !== 0;
      }
      if (filled) cells.push({ r, c });
    }
  }
  const cell = 2.1;
  const svgSize = size * cell;
  return (
    <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={svgSize} height={svgSize} fill="#fff" />
      {cells.map((p, i) => (
        <rect key={i} x={p.c * cell} y={p.r * cell} width={cell} height={cell} fill="#111827" />
      ))}
    </svg>
  );
}

// ── Medicine bottle SVGs ─────────────────────────────────────────────────────
function BottleIcon({ color, cap }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect x="13" y="5" width="10" height="5" rx="2" fill={cap} />
      <rect x="10" y="10" width="16" height="21" rx="4" fill={color} />
      <rect x="10" y="17" width="16" height="4" fill={cap} opacity="0.5" />
      <rect x="14" y="13" width="2" height="2" rx="1" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

const ICONS = {
  blue:      <BottleIcon color="#3b82f6" cap="#93c5fd" />,
  red:       <BottleIcon color="#ef4444" cap="#fca5a5" />,
  green:     <BottleIcon color="#22c55e" cap="#86efac" />,
  lightblue: <BottleIcon color="#38bdf8" cap="#bae6fd" />,
  gray:      <BottleIcon color="#9ca3af" cap="#d1d5db" />,
  orange:    <BottleIcon color="#f97316" cap="#fed7aa" />,
  teal:      <BottleIcon color="#14b8a6" cap="#99f6e4" />,
};

const DATA = [
  { id: 1, icon: "blue",      name: "Paracetamol", dose: "500mg", category: "Tablet",  sku: "MED-001", stock: 120, status: "active" },
  { id: 2, icon: "red",       name: "Ibuprofen",   dose: "",      category: "Syrup",   sku: "MED-002", stock: 150, status: "active" },
  { id: 3, icon: "green",     name: "Cough Syrup", dose: "",      category: "Capsule", sku: "MED-003", stock: 80,  status: "active" },
  { id: 4, icon: "lightblue", name: "Amoxicillin", dose: "",      category: "Drops",   sku: "MED-004", stock: 60,  status: "active" },
  { id: 5, icon: "gray",      name: "Eye Drops",   dose: "",      category: "Tablet",  sku: "MED-005", stock: 45,  status: "active" },
  { id: 6, icon: "orange",    name: "Antacid Chewable", dose: "", category: "Tablet",  sku: "MED-006", stock: 45,  status: "inactive" },
  { id: 7, icon: "teal",      name: "Eye Drops",   dose: "",      category: "Drops",   sku: "MED-006", stock: 45,  status: "inactive" },
];

const PrintIcon = () => (
  <svg
  viewBox="0 0 24 24"
  width="16"
  height="16"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <polyline points="6 9 6 2 18 2 18 9"/>
  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
  <rect x="6" y="14" width="9" height="5"/>
</svg>
);
const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const FilterSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const SearchSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const PlusSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export default function BarcodeManager() {
  const [openMenu, setOpenMenu] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleDownload = (type) => {
    alert(`${type} download started!`);
  };

  const applyFilters = () => {
    setSearch(searchInput);
    setCatFilter(categoryInput);
    setStatusFilter(statusInput);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCatFilter("");
    setStatusFilter("");
    setSearchInput("");
    setCategoryInput("");
    setStatusInput("");
    setCurrentPage(1);
  };

  /* Filtering */
  const filtered = DATA.filter((m) => {
    const s = search.toLowerCase();
    return (
      (!s ||
        m.name.toLowerCase().includes(s) ||
        m.sku.toLowerCase().includes(s)) &&
      (!catFilter || m.category === catFilter) &&
      (!statusFilter || m.status === statusFilter)
    );
  });

  /* Pagination Logic */
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="bm-root" onClick={() => setOpenMenu(null)}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 p-3 box_shadow bg-white">
          <h5 className="fw-bold mb-0">Barcode Manager</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={() => handleDownload("Excel")}>
              <FiDownload className="me-1" /> Excel
            </button>
            <button className="btn btn-danger" onClick={() => handleDownload("PDF")}>
              <FiDownload className="me-1" /> PDF
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bm-table-card box_shadow">

          {/* Filters INSIDE TABLE CARD */}
          <div className="bm-filter-card">

            <div className="bm-select-wrap">
              <select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}>
                <option value="">All Categories</option>
                <option>Tablet</option>
                <option>Syrup</option>
                <option>Capsule</option>
                <option>Drops</option>
              </select>
              <span className="bm-select-arrow">▾</span>
            </div>

            <div className="bm-select-wrap">
              <select value={statusInput} onChange={(e) => setStatusInput(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <span className="bm-select-arrow">▾</span>
            </div>

            <div className="bm-search-wrap">
              <input
                placeholder="Search medicine or SKU..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <button className="bm-filter-btn" onClick={applyFilters}>
              Apply Filter
            </button>

            <button className="bm-reset-btn" onClick={resetFilters}>
              Reset
            </button>

          </div>
          <hr/>

          {/* Table */}
          <div className="bm-table-wrap">
            <table className="bm-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Category</th>
                  <th>SKU/Code</th>
                  <th>Stock</th>
                  <th>Barcode</th>
                  <th>QR Code</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="bm-med-cell">
                        <div className="bm-med-img">{ICONS[row.icon]}</div>
                        <span>
                          <span className="bm-med-name">{row.name}</span>
                          {row.dose && (
                            <span className="bm-med-dose">{row.dose}</span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td>{row.category}</td>
                    <td>{row.sku}</td>
                    <td>{row.stock}</td>
                    <td><BarcodeImg code={row.sku} /></td>
                    <td><QRImg code={row.sku} /></td>
                    <td>
                      {row.status === "active" ? (
                        <span className="bm-badge-active">Active</span>
                      ) : (
                        <span className="bm-badge-inactive">Inactive</span>
                      )}
                    </td>
                    <td className="text-end" onClick={(e) => e.stopPropagation()}>
                      <Dropdown align="end">
                        <Dropdown.Toggle as="button" className="saas-dot-btn">
                          <FiMoreVertical size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Print Barcode</Dropdown.Item>
                          <Dropdown.Item>Download QR Code</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}

                {currentData.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No medicines found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dynamic Pagination Footer */}
          {totalPages > 0 && (
            <div className="bm-footer">
              <span className="bm-showing">
                Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
              </span>

              <div className="bm-pagination">

                <button
                  className="bm-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ‹
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      className={`bm-page-btn ${
                        currentPage === page ? "pg-active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  className="bm-page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  ›
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}