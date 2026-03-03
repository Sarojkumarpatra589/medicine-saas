import React, { useState, useMemo } from "react";
import {
  Table, Dropdown, Badge, InputGroup, Form, Button, Row, Col, Stack,
} from "react-bootstrap";
import { FiPlus, FiSearch, FiMoreVertical, FiRepeat, FiCheckCircle, FiClock, FiXCircle, FiDollarSign } from "react-icons/fi";

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

/* ── Payment Stat Card ── */
function PayCard({ icon: Icon, label, value, sub, accent, spark, trend, prefix = "" }) {
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
function useStats(payments) {
  return useMemo(() => {
    const total   = payments.length;
    const success = payments.filter(p => p.status === "Success").length;
    const pending = payments.filter(p => p.status === "Pending").length;
    const failed  = payments.filter(p => p.status === "Failed").length;
    const revenue = payments.reduce((s, p) => s + parseFloat(p.amount.replace("$", "")), 0);
    return { total, success, pending, failed, revenue };
  }, [payments]);
}

/* ══════════════ MAIN COMPONENT ══════════════ */
const PaymentHistory = () => {
  const [payments] = useState([
    { id: 1, txn: "TXN-1001", payer: "Alberto Ripley",  method: "Card", amount: "$120", date: "02 May 2025", status: "Success" },
    { id: 2, txn: "TXN-1002", payer: "Susan Babin",     method: "UPI",  amount: "$85",  date: "28 Apr 2025", status: "Pending" },
    { id: 3, txn: "TXN-1003", payer: "Carol Lam",       method: "Cash", amount: "$40",  date: "20 Apr 2025", status: "Success" },
    { id: 4, txn: "TXN-1004", payer: "Marsha Noland",   method: "Card", amount: "$210", date: "18 Apr 2025", status: "Failed"  },
    { id: 5, txn: "TXN-1005", payer: "Irma Armstrong",  method: "UPI",  amount: "$90",  date: "10 Apr 2025", status: "Success" },
    { id: 6, txn: "TXN-1006", payer: "Jesus Adams",     method: "Card", amount: "$60",  date: "05 Apr 2025", status: "Pending" },
    { id: 7, txn: "TXN-1007", payer: "Ezra Belcher",    method: "Cash", amount: "$140", date: "29 Mar 2025", status: "Success" },
    { id: 8, txn: "TXN-1008", payer: "Glen Lentz",      method: "UPI",  amount: "$50",  date: "21 Mar 2025", status: "Failed"  },
  ]);

  const stats = useStats(payments);

  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage,  setCurrentPage]  = useState(1);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    let data = payments.filter(p =>
      p.txn.toLowerCase().includes(search.toLowerCase()) ||
      p.payer.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "All") data = data.filter(p => p.status === statusFilter);
    return data;
  }, [payments, search, statusFilter]);

  const totalPages   = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast  = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange   = p => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };
  const handleResetFilters = () => { setSearch(""); setStatusFilter("All"); setCurrentPage(1); };
  const statusColor = s => s === "Success" ? "success" : s === "Pending" ? "warning" : "danger";

  return (
    <div style={{ padding: "20px", background: "#f8f8fb", minHeight: "100vh" }}>
      <style>{`
        .pay-card-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (max-width: 1100px) {
          .pay-card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .pay-card-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Payment History</h5>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Record Payment
        </Button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="pay-card-grid">
        <PayCard
          icon={FiRepeat}       label="Total Transactions" value={stats.total}
          sub="All payments"    accent="#6366f1"           trend={15}
          spark={[3, 4, 5, 4, 6, 5, 7, 8]}
        />
        <PayCard
          icon={FiDollarSign}   label="Total Collected"    value={stats.revenue}
          sub="Gross received"  accent="#10b981"           trend={11}  prefix="$"
          spark={[80, 150, 120, 200, 175, 260, 230, 310]}
        />
        <PayCard
          icon={FiCheckCircle}  label="Successful"         value={stats.success}
          sub="Cleared payments" accent="#3b82f6"          trend={8}
          spark={[1, 2, 3, 2, 3, 3, 4, 4]}
        />
        <PayCard
          icon={FiClock}        label="Pending"            value={stats.pending}
          sub="Awaiting clearance" accent="#f59e0b"        trend={-3}
          spark={[2, 2, 1, 2, 1, 2, 1, 2]}
        />
        <PayCard
          icon={FiXCircle}      label="Failed"             value={stats.failed}
          sub="Unsuccessful txns" accent="#ef4444"         trend={-7}
          spark={[2, 1, 2, 1, 2, 1, 1, 1]}
        />
      </div>

      {/* ── TABLE CARD ── */}
      <div className="box_shadow p-3 bg-white">

        {/* FILTERS */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">
            <Col lg={5} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search transaction or payer..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col lg={3} md={6}>
              <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
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
                <th>Transaction</th>
                <th>Payer</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map(pay => (
                <tr key={pay.id}>
                  <td className="fw-medium">{pay.txn}</td>
                  <td>{pay.payer}</td>
                  <td>{pay.method}</td>
                  <td>{pay.amount}</td>
                  <td className="text-muted small">{pay.date}</td>
                  <td><Badge bg={statusColor(pay.status)}>{pay.status}</Badge></td>
                  <td className="text-end">
                    <Dropdown align="end">
                      <Dropdown.Toggle as="button" className="saas-dot-btn">
                        <FiMoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View Receipt</Dropdown.Item>
                        <Dropdown.Item>Download</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">No transactions found</td>
                </tr>
              )}
            </tbody>

            {totalPages > 0 && (
              <tfoot>
                <tr>
                  <td colSpan="7">
                    <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                      <small className="text-muted">
                        Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length} transactions
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

export default PaymentHistory;