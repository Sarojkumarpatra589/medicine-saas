import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const invoiceData = [
  { id: "#INV0025", patient: "James Adair", avatar: "JA", color: "#4f8ef7", created: "30 Apr 2025", due: "30 Apr 2025", amount: "$800", status: "Paid" },
  { id: "#INV0024", patient: "Emily Johnson", avatar: "EJ", color: "#e74c3c", created: "15 Apr 2025", due: "15 Apr 2025", amount: "$930", status: "Partially Paid" },
  { id: "#INV0023", patient: "Robert Mitchell", avatar: "RM", color: "#95a5a6", created: "02 Apr 2025", due: "02 Apr 2025", amount: "$850", status: "Unpaid" },
  { id: "#INV0022", patient: "Sophia Miller", avatar: "SM", color: "#e91e63", created: "27 Mar 2025", due: "27 Mar 2025", amount: "$700", status: "Paid" },
  { id: "#INV0021", patient: "Daniel Anderson", avatar: "DA", color: "#607d8b", created: "12 Mar 2025", due: "12 Mar 2025", amount: "$650", status: "Partially Paid" },
  { id: "#INV0020", patient: "Olivia Davis", avatar: "OD", color: "#3f51b5", created: "05 Mar 2025", due: "05 Mar 2025", amount: "$430", status: "Unpaid" },
  { id: "#INV0019", patient: "Michael Thompson", avatar: "MT", color: "#795548", created: "24 Feb 2025", due: "24 Feb 2025", amount: "$300", status: "Paid" },
  { id: "#INV0018", patient: "Isabella Wilson", avatar: "IW", color: "#546e7a", created: "16 Feb 2025", due: "16 Feb 2025", amount: "$450", status: "Unpaid" },
  { id: "#INV0017", patient: "Michael Trade", avatar: "MT", color: "#f39c12", created: "01 Feb 2025", due: "01 Feb 2025", amount: "$570", status: "Paid" },
  { id: "#INV0016", patient: "Ava Robinson", avatar: "AR", color: "#9e9e9e", created: "25 Jan 2025", due: "25 Jan 2025", amount: "$800", status: "Unpaid" },
];

const statusConfig = {
  Paid: { className: "badge-paid", label: "Paid" },
  "Partially Paid": { className: "badge-partial", label: "Partially Paid" },
  Unpaid: { className: "badge-unpaid", label: "Unpaid" },
};

export default function Invoice() {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = invoiceData.filter((inv) =>
    inv.patient.toLowerCase().includes(search.toLowerCase()) ||
    inv.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalEntries = filtered.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="inv-page">
      {/* Header */}
      <div className="inv-header">
        <div className="inv-title-row">
          <h1 className="inv-title">Invoices</h1>
          <span className="inv-total-badge">Total Invoices : {invoiceData.length}</span>
        </div>
        <div className="inv-actions">
          <button className="btn-export">
            Export <span className="chevron">▾</span>
          </button>
          <button className="btn-new">+ New Invoices</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="inv-toolbar">
        <input
          className="inv-search"
          placeholder="Search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
        <div className="inv-toolbar-right">
          <button className="btn-filter">
            <span className="filter-icon">⊟</span> Filters
          </button>
          <button className="btn-sort">
            Sort By : Recent <span className="chevron">▾</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Created Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((inv) => {
              const { className, label } = statusConfig[inv.status];
              return (
                <tr key={inv.id} className="inv-row">
                  <td className="inv-id">{inv.id}</td>
                  <td className="inv-patient">
                    <div className="patient-avatar" style={{ background: inv.color }}>
                      {inv.avatar}
                    </div>
                    <span>{inv.patient}</span>
                  </td>
                  <td>{inv.created}</td>
                  <td>{inv.due}</td>
                  <td className="inv-amount">{inv.amount}</td>
                  <td>
                    <span className={`status-badge ${className}`}>{label}</span>
                  </td>
                  <td className="inv-menu-cell">
                    <button
                      className="inv-menu-btn"
                      onClick={() => setOpenMenu(openMenu === inv.id ? null : inv.id)}
                    >
                      ⋮
                    </button>
                    {openMenu === inv.id && (
                      <div className="inv-dropdown">
                       <Link to="/subscription/invoice/view" className="inv-dropdown-item">
  View
</Link>

<div className="inv-dropdown-item">Edit</div>

<div className="inv-dropdown-item inv-dropdown-danger">
  Delete
</div>

                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="inv-footer">
        <div className="inv-rows-select">
          <span>Row Per Page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>Entries</span>
        </div>
        <div className="inv-pagination">
          <button
            className="pg-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`pg-btn${currentPage === i + 1 ? " pg-active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pg-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}