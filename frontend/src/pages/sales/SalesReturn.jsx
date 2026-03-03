import React, { useState, useMemo } from "react";
import {
  Table, Dropdown, Badge, InputGroup, Form, Button, Row, Col, Stack,
} from "react-bootstrap";
import { FiPlus, FiSearch, FiMoreVertical, FiRotateCcw, FiCheckCircle, FiClock, FiXCircle, FiDollarSign } from "react-icons/fi";

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

/* ── Return Stat Card ── */
function ReturnCard({ icon: Icon, label, value, sub, accent, spark, trend, prefix = "" }) {
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
function useStats(returns) {
  return useMemo(() => {
    const total    = returns.length;
    const approved = returns.filter(r => r.status === "Approved").length;
    const pending  = returns.filter(r => r.status === "Pending").length;
    const rejected = returns.filter(r => r.status === "Rejected").length;
    const refunded = returns.reduce((s, r) => s + parseFloat(r.amount.replace("$", "")), 0);
    return { total, approved, pending, rejected, refunded };
  }, [returns]);
}

/* ══════════════ MAIN COMPONENT ══════════════ */
const SalesReturn = () => {
  const [returns] = useState([
    { id: 1, returnNo: "RET-1001", orderNo: "ORD-1001", customer: "Alberto Ripley",  product: "BP Monitor",    qty: 1, amount: "$75",  date: "05 May 2025", status: "Approved" },
    { id: 2, returnNo: "RET-1002", orderNo: "ORD-1004", customer: "Susan Babin",     product: "Thermometer",   qty: 2, amount: "$50",  date: "03 May 2025", status: "Pending"  },
    { id: 3, returnNo: "RET-1003", orderNo: "ORD-1006", customer: "Carol Lam",       product: "Glucose Meter", qty: 1, amount: "$60",  date: "01 May 2025", status: "Rejected" },
    { id: 4, returnNo: "RET-1004", orderNo: "ORD-1007", customer: "Marsha Noland",   product: "Wheelchair",    qty: 1, amount: "$210", date: "30 Apr 2025", status: "Approved" },
    { id: 5, returnNo: "RET-1005", orderNo: "ORD-1010", customer: "Irma Armstrong",  product: "First Aid Kit", qty: 1, amount: "$30",  date: "28 Apr 2025", status: "Pending"  },
    { id: 6, returnNo: "RET-1006", orderNo: "ORD-1012", customer: "Jesus Adams",     product: "Oxygen Mask",   qty: 3, amount: "$105", date: "26 Apr 2025", status: "Approved" },
  ]);

  const stats = useStats(returns);

  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [qtyFilter,    setQtyFilter]    = useState("All");
  const [currentPage,  setCurrentPage]  = useState(1);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    let data = returns.filter(r =>
      r.returnNo.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "All") data = data.filter(r => r.status === statusFilter);
    return data;
  }, [returns, search, statusFilter]);

  const totalPages   = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast  = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange   = p => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };
  const handleResetFilters = () => { setSearch(""); setStatusFilter("All"); setQtyFilter("All"); setCurrentPage(1); };
  const statusColor = s => s === "Approved" ? "success" : s === "Pending" ? "warning" : "danger";

  return (
    <div style={{ padding: "20px", background: "#f8f8fb", minHeight: "100vh" }}>
      <style>{`
        .ret-card-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (max-width: 1100px) {
          .ret-card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .ret-card-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Sales Return</h5>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> New Return
        </Button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="ret-card-grid">
        <ReturnCard
          icon={FiRotateCcw}    label="Total Returns"    value={stats.total}
          sub="All return requests" accent="#6366f1"     trend={8}
          spark={[2, 3, 2, 4, 3, 5, 4, 6]}
        />
        <ReturnCard
          icon={FiDollarSign}   label="Total Refunded"   value={stats.refunded}
          sub="Gross refund value" accent="#10b981"      trend={5}   prefix="$"
          spark={[50, 100, 80, 150, 130, 200, 180, 230]}
        />
        <ReturnCard
          icon={FiCheckCircle}  label="Approved"         value={stats.approved}
          sub="Accepted returns"  accent="#3b82f6"       trend={6}
          spark={[1, 2, 1, 3, 2, 3, 2, 3]}
        />
        <ReturnCard
          icon={FiClock}        label="Pending"          value={stats.pending}
          sub="Awaiting review"   accent="#f59e0b"       trend={-2}
          spark={[2, 2, 1, 2, 1, 2, 1, 2]}
        />
        <ReturnCard
          icon={FiXCircle}      label="Rejected"         value={stats.rejected}
          sub="Declined returns"  accent="#ef4444"       trend={-4}
          spark={[1, 2, 1, 1, 2, 1, 1, 1]}
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
                  placeholder="Search return or customer..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select value={qtyFilter} onChange={e => setQtyFilter(e.target.value)}>
                <option value="All">Quantity</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
              </Form.Select>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Col>
            <Col lg={4} md={12}>
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
                <th>Return No</th>
                <th>Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map(ret => (
                <tr key={ret.id}>
                  <td className="fw-medium">{ret.returnNo}</td>
                  <td>{ret.orderNo}</td>
                  <td>{ret.customer}</td>
                  <td>{ret.product}</td>
                  <td>{ret.qty}</td>
                  <td>{ret.amount}</td>
                  <td className="text-muted small">{ret.date}</td>
                  <td><Badge bg={statusColor(ret.status)}>{ret.status}</Badge></td>
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
                  <td colSpan="9" className="text-center text-muted py-4">No returns found</td>
                </tr>
              )}
            </tbody>

            {totalPages > 0 && (
              <tfoot>
                <tr>
                  <td colSpan="9">
                    <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                      <small className="text-muted">
                        Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length} returns
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

export default SalesReturn;