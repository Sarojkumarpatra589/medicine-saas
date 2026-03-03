import React, { useState, useMemo } from "react";
import {
  Table, Dropdown, Badge, InputGroup, Form, Button, Row, Col, Stack,
} from "react-bootstrap";
import { FiPlus, FiSearch, FiMoreVertical, FiShoppingBag, FiCheckCircle, FiClock, FiXCircle, FiCreditCard } from "react-icons/fi";

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

/* ── POS Stat Card ── */
function POSCard({ icon: Icon, label, value, sub, accent, spark, trend, prefix = "" }) {
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
function useStats(bills) {
  return useMemo(() => {
    const total     = bills.length;
    const paid      = bills.filter(b => b.status === "Paid").length;
    const pending   = bills.filter(b => b.status === "Pending").length;
    const cancelled = bills.filter(b => b.status === "Cancelled").length;
    const revenue   = bills.reduce((s, b) => s + parseFloat(b.total.replace("$", "")), 0);
    return { total, paid, pending, cancelled, revenue };
  }, [bills]);
}

/* ══════════════ MAIN COMPONENT ══════════════ */
const POSBilling = () => {
  const [bills] = useState([
    { id: 1, billNo: "POS-1001", customer: "Walk-in",        items: 3, total: "$120", method: "Cash", date: "02 May 2025", status: "Paid"      },
    { id: 2, billNo: "POS-1002", customer: "Susan Babin",    items: 2, total: "$75",  method: "Card", date: "01 May 2025", status: "Paid"      },
    { id: 3, billNo: "POS-1003", customer: "Carol Lam",      items: 4, total: "$210", method: "UPI",  date: "30 Apr 2025", status: "Pending"   },
    { id: 4, billNo: "POS-1004", customer: "Marsha Noland",  items: 1, total: "$40",  method: "Cash", date: "29 Apr 2025", status: "Cancelled" },
    { id: 5, billNo: "POS-1005", customer: "Irma Armstrong", items: 5, total: "$300", method: "Card", date: "28 Apr 2025", status: "Paid"      },
    { id: 6, billNo: "POS-1006", customer: "Jesus Adams",    items: 2, total: "$95",  method: "UPI",  date: "27 Apr 2025", status: "Pending"   },
  ]);

  const stats = useStats(bills);

  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage,  setCurrentPage]  = useState(1);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    let data = bills.filter(b =>
      b.billNo.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "All") data = data.filter(b => b.status === statusFilter);
    return data;
  }, [bills, search, statusFilter]);

  const totalPages   = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast  = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange   = p => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };
  const handleResetFilters = () => { setSearch(""); setStatusFilter("All"); setCurrentPage(1); };
  const statusColor = s => s === "Paid" ? "success" : s === "Pending" ? "warning" : "danger";

  return (
    <div style={{ padding: "20px", background: "#f8f8fb", minHeight: "100vh" }}>
      <style>{`
        .pos-card-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (max-width: 1100px) {
          .pos-card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .pos-card-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h5 className="fw-bold mb-0">POS Billing</h5>
        </div>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> New Bill
        </Button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="pos-card-grid">
        <POSCard
          icon={FiShoppingBag}  label="Total Bills"      value={stats.total}
          sub="All transactions" accent="#6366f1"        trend={13}
          spark={[2, 3, 4, 3, 5, 4, 6, 6]}
        />
        <POSCard
          icon={FiCreditCard}   label="Total Revenue"    value={stats.revenue}
          sub="Gross collected"  accent="#10b981"        trend={9}   prefix="$"
          spark={[80, 150, 120, 200, 175, 250, 220, 300]}
        />
        <POSCard
          icon={FiCheckCircle}  label="Paid"             value={stats.paid}
          sub="Settled bills"    accent="#3b82f6"        trend={7}
          spark={[1, 2, 2, 3, 2, 3, 3, 3]}
        />
        <POSCard
          icon={FiClock}        label="Pending"          value={stats.pending}
          sub="Awaiting payment" accent="#f59e0b"        trend={-2}
          spark={[2, 2, 1, 2, 1, 2, 1, 2]}
        />
        <POSCard
          icon={FiXCircle}      label="Cancelled"        value={stats.cancelled}
          sub="Voided bills"     accent="#ef4444"        trend={-6}
          spark={[2, 1, 2, 1, 1, 2, 1, 1]}
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
                  placeholder="Search bill or customer..."
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
                <option value="Cancelled">Cancelled</option>
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
                <th>Bill No</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map(bill => (
                <tr key={bill.id}>
                  <td className="fw-medium">{bill.billNo}</td>
                  <td>{bill.customer}</td>
                  <td>{bill.items}</td>
                  <td>{bill.total}</td>
                  <td>{bill.method}</td>
                  <td className="text-muted small">{bill.date}</td>
                  <td><Badge bg={statusColor(bill.status)}>{bill.status}</Badge></td>
                  <td className="text-end">
                    <Dropdown align="end">
                      <Dropdown.Toggle as="button" className="saas-dot-btn">
                        <FiMoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Print</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">No bills found</td>
                </tr>
              )}
            </tbody>

            {totalPages > 0 && (
              <tfoot>
                <tr>
                  <td colSpan="8">
                    <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                      <small className="text-muted">
                        Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length} bills
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

export default POSBilling;