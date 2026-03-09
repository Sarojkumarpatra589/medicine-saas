import React, { useState, useMemo } from "react";
import {
  Table, Dropdown, Badge, InputGroup, Form, Button, Row, Col, Stack,
} from "react-bootstrap";
import { FiPlus, FiSearch, FiMoreVertical, FiRefreshCw, FiCheckCircle, FiClock, FiXCircle, FiDollarSign } from "react-icons/fi";

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

/* ── Refund Stat Card ── */
function RefundCard({ icon: Icon, label, value, sub, accent, spark, trend, prefix = "" }) {
  return (
    <div className="box_shadow" style={{
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    }}>
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
      {spark && (
        <div style={{ marginTop: "auto" }}>
          <Spark data={spark} color={accent} h={40} />
        </div>
      )}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}55, ${accent})` }} />
    </div>
  );
}

/* ── Stats hook ── */
function useStats(refunds) {
  return useMemo(() => {
    const total     = refunds.length;
    const completed = refunds.filter(r => r.status === "Completed").length;
    const pending   = refunds.filter(r => r.status === "Pending").length;
    const rejected  = refunds.filter(r => r.status === "Rejected").length;
    const revenue   = refunds.reduce((s, r) => s + parseFloat(r.amount.replace(/[₹,]/g, "")), 0);
    return { total, completed, pending, rejected, revenue };
  }, [refunds]);
}

/* ══════════════ MAIN COMPONENT ══════════════ */
const SalesRefund = () => {
  const [refunds] = useState([
    { id: "RF-001", invoice: "INV-1001", customer: "Rahul Das",   amount: "₹500",  method: "UPI",  status: "Completed", date: "10 Feb 2026" },
    { id: "RF-002", invoice: "INV-1005", customer: "Anita Roy",   amount: "₹300",  method: "Cash", status: "Pending",   date: "09 Feb 2026" },
    { id: "RF-003", invoice: "INV-1009", customer: "Suman Patel", amount: "₹1200", method: "Card", status: "Rejected",  date: "08 Feb 2026" },
  ]);

  const stats = useStats(refunds);

  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [dateFilter,   setDateFilter]   = useState("All");
  const [currentPage,  setCurrentPage]  = useState(1);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    let data = refunds.filter(r =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.invoice.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "All") data = data.filter(r => r.status === statusFilter);
    if (methodFilter !== "All") data = data.filter(r => r.method === methodFilter);
    if (dateFilter === "Last7Days") data = data.slice(0, 2);
    return data;
  }, [refunds, search, statusFilter, methodFilter, dateFilter]);

  const totalPages   = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast  = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange   = p => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };
  const handleResetFilters = () => { setSearch(""); setStatusFilter("All"); setMethodFilter("All"); setDateFilter("All"); setCurrentPage(1); };
  const statusColor = s => s === "Completed" ? "success" : s === "Pending" ? "warning" : "danger";

  return (
    <div style={{ padding: "20px", background: "#f8f8fb", minHeight: "100vh" }}>
      <style>{`
        .ref-card-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (max-width: 1100px) {
          .ref-card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .ref-card-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Sales Refund</h5>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Add Refund
        </Button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="ref-card-grid">
        <RefundCard
          icon={FiRefreshCw}    label="Total Refunds"      value={stats.total}
          sub="All refund requests" accent="#6366f1"       trend={7}
          spark={[1, 2, 2, 3, 2, 3, 3, 3]}
        />
        <RefundCard
          icon={FiDollarSign}   label="Total Refunded"     value={stats.revenue}
          sub="Gross refund value"  accent="#10b981"       trend={5}  prefix="₹"
          spark={[200, 400, 350, 600, 500, 750, 700, 800]}
        />
        <RefundCard
          icon={FiCheckCircle}  label="Completed"          value={stats.completed}
          sub="Processed refunds"   accent="#3b82f6"       trend={9}
          spark={[1, 1, 2, 1, 2, 2, 2, 2]}
        />
        <RefundCard
          icon={FiClock}        label="Pending"            value={stats.pending}
          sub="Awaiting process"    accent="#f59e0b"       trend={-3}
          spark={[2, 1, 2, 1, 1, 2, 1, 1]}
        />
        <RefundCard
          icon={FiXCircle}      label="Rejected"           value={stats.rejected}
          sub="Declined refunds"    accent="#ef4444"       trend={-5}
          spark={[1, 2, 1, 1, 1, 1, 2, 1]}
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
                  placeholder="Search refund, invoice, customer..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select value={methodFilter} onChange={e => setMethodFilter(e.target.value)}>
                <option value="All">All Methods</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </Form.Select>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
                <option value="All">All Dates</option>
                <option value="Last7Days">Last 7 Days</option>
              </Form.Select>
            </Col>
            <Col lg={2} md={12}>
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
                <th>Refund ID</th>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map(refund => (
                <tr key={refund.id}>
                  <td className="fw-medium">{refund.id}</td>
                  <td>{refund.invoice}</td>
                  <td>{refund.customer}</td>
                  <td>{refund.amount}</td>
                  <td>{refund.method}</td>
                  <td><Badge bg={statusColor(refund.status)}>{refund.status}</Badge></td>
                  <td className="text-muted small">{refund.date}</td>
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
                  <td colSpan="8" className="text-center text-muted py-4">No refunds found</td>
                </tr>
              )}
            </tbody>

            {totalPages > 0 && (
              <tfoot>
                <tr>
                  <td colSpan="8">
                    <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                      <small className="text-muted">
                        Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length} refunds
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

export default SalesRefund;