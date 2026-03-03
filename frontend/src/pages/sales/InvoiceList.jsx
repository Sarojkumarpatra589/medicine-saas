import React, { useState, useMemo } from "react";
import {
  Table, Dropdown, Badge, InputGroup, Form, Button, Row, Col, Stack,
} from "react-bootstrap";
import { FiPlus, FiSearch, FiMoreVertical, FiFileText, FiCheckCircle, FiClock, FiAlertTriangle, FiDollarSign } from "react-icons/fi";

/* ── Sparkline ── */
function Spark({ data, color, h = 40 }) {
  const w = 100;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  const id = `sg${color.replace("#", "")}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={`${pts} ${w},${h} 0,${h}`} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Invoice Stat Card ── */
function InvoiceCard({ icon: Icon, label, value, sub, accent, spark, trend, prefix = "" }) {
  return (
    <div className="box_shadow" style={{
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top content */}
      <div style={{ padding: "16px 16px 10px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
            {label}
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: "-1px", lineHeight: 1, marginBottom: 4 }}>
            {prefix}{value}
          </div>
          <div style={{ fontSize: 11, color: "#64748b" }}>{sub}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 16,
            boxShadow: `0 4px 12px ${accent}44`,
          }}>
            <Icon />
          </div>
          {trend !== undefined && (
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: trend >= 0 ? "#10b981" : "#ef4444",
              display: "flex", alignItems: "center", gap: 2,
            }}>
              <span style={{ fontSize: 9 }}>{trend >= 0 ? "▲" : "▼"}</span>{Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>

      {/* Sparkline flush to bottom */}
      {spark && (
        <div style={{ marginTop: "auto" }}>
          <Spark data={spark} color={accent} h={40} />
        </div>
      )}

      {/* Colored bottom strip */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}55, ${accent})` }} />
    </div>
  );
}

/* ── Stats hook ── */
function useStats(invoices) {
  return useMemo(() => {
    const total    = invoices.length;
    const revenue  = invoices.reduce((s, x) => s + x.amount, 0);
    const paid     = invoices.filter(i => i.status === "Paid").length;
    const pending  = invoices.filter(i => i.status === "Pending").length;
    const overdue  = invoices.filter(i => i.status === "Overdue").length;
    return { total, revenue, paid, pending, overdue };
  }, [invoices]);
}

/* ══════════════ MAIN COMPONENT ══════════════ */
const InvoiceList = () => {
  const [invoices] = useState([
    { id: 1, invoiceNo: "INV-1001", client: "Alberto Ripley",  amount: 520, date: "2025-05-02", due: "2025-05-12", status: "Paid"    },
    { id: 2, invoiceNo: "INV-1002", client: "Susan Babin",     amount: 860, date: "2025-04-28", due: "2025-05-10", status: "Pending" },
    { id: 3, invoiceNo: "INV-1003", client: "Carol Lam",       amount: 240, date: "2025-04-20", due: "2025-04-30", status: "Overdue" },
    { id: 4, invoiceNo: "INV-1004", client: "Marsha Noland",   amount: 920, date: "2025-04-18", due: "2025-05-01", status: "Paid"    },
    { id: 5, invoiceNo: "INV-1005", client: "Irma Armstrong",  amount: 150, date: "2025-04-10", due: "2025-04-22", status: "Pending" },
    { id: 6, invoiceNo: "INV-1006", client: "Jesus Adams",     amount: 430, date: "2025-04-05", due: "2025-04-18", status: "Paid"    },
  ]);

  const stats = useStats(invoices);

  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter,   setDateFilter]   = useState("All");
  const [currentPage,  setCurrentPage]  = useState(1);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    let data = invoices.filter(inv =>
      `${inv.invoiceNo} ${inv.client}`.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "All") data = data.filter(inv => inv.status === statusFilter);
    if (dateFilter === "Last7Days") {
      const today = new Date();
      data = data.filter(inv => (today - new Date(inv.date)) / 86400000 <= 7);
    }
    return data;
  }, [invoices, search, statusFilter, dateFilter]);

  const totalPages   = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast  = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange   = p => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };
  const handleResetFilters = () => { setSearch(""); setStatusFilter("All"); setDateFilter("All"); setCurrentPage(1); };
  const statusColor = s => s === "Paid" ? "success" : s === "Pending" ? "warning" : "danger";

  return (
    <div style={{ padding: "20px", background: "#f8f8fb", minHeight: "100vh" }}>
      <style>{`
        .inv-card-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (max-width: 1100px) {
          .inv-card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .inv-card-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Invoice List</h5>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Add Invoice
        </Button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="inv-card-grid">
        <InvoiceCard
          icon={FiFileText}      label="Total Invoices"   value={stats.total}
          sub="All invoices"     accent="#6366f1"         trend={11}
          spark={[2, 3, 4, 3, 5, 4, 6, 6]}
        />
        <InvoiceCard
          icon={FiDollarSign}    label="Total Revenue"    value={stats.revenue}
          sub="Gross billed"     accent="#10b981"         trend={8}   prefix="₹"
          spark={[200, 400, 350, 600, 520, 800, 750, 900]}
        />
        <InvoiceCard
          icon={FiCheckCircle}   label="Paid"             value={stats.paid}
          sub="Cleared invoices" accent="#3b82f6"         trend={6}
          spark={[1, 2, 2, 3, 2, 3, 3, 3]}
        />
        <InvoiceCard
          icon={FiClock}         label="Pending"          value={stats.pending}
          sub="Awaiting payment" accent="#f59e0b"         trend={-2}
          spark={[2, 2, 1, 2, 1, 2, 1, 2]}
        />
        <InvoiceCard
          icon={FiAlertTriangle} label="Overdue"          value={stats.overdue}
          sub="Past due date"    accent="#ef4444"         trend={-5}
          spark={[1, 2, 1, 1, 1, 2, 1, 1]}
        />
      </div>

      {/* ── TABLE CARD ── */}
      <div className="box_shadow p-3 bg-white">

        {/* FILTERS */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">
            <Col lg={4} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search invoice or client..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col lg={3} md={6}>
              <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={6}>
              <Form.Select value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
                <option value="All">All Dates</option>
                <option value="Last7Days">Last 7 Days</option>
              </Form.Select>
            </Col>
            <Col lg={2} md={6}>
              <div className="d-flex gap-2">
                <Button className="button flex-fill" onClick={() => setCurrentPage(1)}>Filter</Button>
                <Button variant="outline-secondary" className="flex-fill" onClick={handleResetFilters}>Reset</Button>
              </div>
            </Col>
          </Row>
        </div>

        <hr />

        <div style={{ overflowX: "auto" }}>
          <Table hover className="align-middle saas-table mb-0">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Amount (₹)</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map(inv => (
                <tr key={inv.id}>
                  <td className="fw-medium">{inv.invoiceNo}</td>
                  <td>{inv.client}</td>
                  <td>₹{inv.amount}</td>
                  <td className="text-muted small">{inv.date}</td>
                  <td className="text-muted small">{inv.due}</td>
                  <td><Badge bg={statusColor(inv.status)}>{inv.status}</Badge></td>
                  <td className="text-end">
                    <Dropdown align="end">
                      <Dropdown.Toggle as="button" className="saas-dot-btn">
                        <FiMoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No invoices found</td>
                </tr>
              )}
            </tbody>

            {totalPages > 0 && (
              <tfoot>
                <tr>
                  <td colSpan="7">
                    <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                      <small className="text-muted">
                        Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length} invoices
                      </small>
                      <Stack direction="horizontal" gap={2}>
                        <Button size="sm" className="pagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</Button>
                        {[...Array(totalPages)].map((_, i) => (
                          <Button key={i} size="sm" className={`pagination-btn ${currentPage === i + 1 ? "active-page" : ""}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</Button>
                        ))}
                        <Button size="sm" className="pagination-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                      </Stack>
                    </div>
                  </td>
                </tr>
              </tfoot>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;