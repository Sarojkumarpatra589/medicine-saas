import React, { useState, useMemo } from "react";
import {
  Table, Dropdown, Badge, InputGroup, Form, Button, Row, Col, Stack,
} from "react-bootstrap";
import { FiPlus, FiSearch, FiMoreVertical, FiUsers, FiUserCheck, FiUserX, FiActivity, FiCalendar, FiMapPin } from "react-icons/fi";

const allCustomers = [
  { id: 1, name: "Alberto Ripley",  ageGender: "26, Male",   phone: "+1 41245 54132", assignedTo: "Dr. Mick Thompson", department: "Cardiologist",      address: "Miami, Florida",      lastVisit: "30 Apr 2025", status: "Available"   },
  { id: 2, name: "Susan Babin",     ageGender: "21, Female",  phone: "+1 54554 54789", assignedTo: "Dr. Sarah Johnson", department: "Orthopedic Surgeon", address: "Austin, Texas",       lastVisit: "15 Apr 2025", status: "Unavailable" },
  { id: 3, name: "Carol Lam",       ageGender: "28, Female",  phone: "+1 43554 54985", assignedTo: "Dr. Emily Carter",  department: "Pediatrician",       address: "Seattle, Washington", lastVisit: "02 Apr 2025", status: "Available"   },
  { id: 4, name: "Marsha Noland",   ageGender: "25, Female",  phone: "+1 47554 54257", assignedTo: "Dr. David Lee",     department: "Gynecologist",       address: "Chicago, Illinois",   lastVisit: "27 Mar 2025", status: "Unavailable" },
  { id: 5, name: "Irma Armstrong",  ageGender: "32, Female",  phone: "+1 54114 57526", assignedTo: "Dr. Anna Kim",      department: "Psychiatrist",       address: "Phoenix, Arizona",    lastVisit: "12 Mar 2025", status: "Available"   },
];

/* ── Stat Cards data ── */
function useStats(customers) {
  return useMemo(() => {
    const total     = customers.length;
    const available = customers.filter(c => c.status === "Available").length;
    const unavail   = customers.filter(c => c.status === "Unavailable").length;
    const depts     = [...new Set(customers.map(c => c.department))].length;
    const cities    = [...new Set(customers.map(c => c.address.split(",")[1]?.trim()))].length;
    const availRate = total ? Math.round((available / total) * 100) : 0;
    return { total, available, unavail, depts, cities, availRate };
  }, [customers]);
}

/* ── Individual Stat Card ── */
function StatCard({ icon: Icon, label, value, accent, trend, isRate }) {
  return (
    <div className="box_shadow" style={{
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "18px 16px 14px",
      position: "relative",
      overflow: "hidden",
      borderBottom: `3px solid ${accent}`,
      minHeight: 110,
    }}>
      {/* Gradient blob */}
      <div style={{
        position: "absolute", top: -28, right: -28,
        width: 80, height: 80, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Top: icon + trend */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 15, flexShrink: 0,
          boxShadow: `0 4px 12px ${accent}44`,
        }}>
          <Icon />
        </div>
        {trend !== undefined && (
          <div style={{
            fontSize: 11, fontWeight: 700,
            color: trend >= 0 ? "#10b981" : "#ef4444",
            display: "flex", alignItems: "center", gap: 2,
          }}>
            <span style={{ fontSize: 9 }}>{trend >= 0 ? "▲" : "▼"}</span>
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div style={{
        fontSize: 28, fontWeight: 900, color: "#0f172a",
        lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4,
      }}>
        {isRate ? `${value}%` : value}
      </div>

      {/* Label */}
      <div style={{
        fontSize: 11.5, fontWeight: 500, color: "#94a3b8",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        marginBottom: isRate ? 8 : 0,
      }}>
        {label}
      </div>

      {/* Progress bar for rate only */}
      {isRate && (
        <div style={{ height: 3, borderRadius: 99, background: "#f1f5f9", overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${value}%`, borderRadius: 99,
            background: `linear-gradient(90deg, ${accent}88, ${accent})`,
          }} />
        </div>
      )}
    </div>
  );
}

/* ── Department Donut Card ── */
function DeptBar({ customers }) {
  const deptCounts = useMemo(() => {
    const map = {};
    customers.forEach(c => { map[c.department] = (map[c.department] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [customers]);

  const total  = deptCounts.reduce((s, [, n]) => s + n, 0);
  const colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

  // Build donut segments
  const r = 22, circ = 2 * Math.PI * r, sw = 6;
  let cum = 0;
  const segs = deptCounts.map(([dept, count], i) => {
    const pct   = count / total;
    const dash  = pct * circ;
    const off   = circ * 0.25 - cum * circ;
    cum += pct;
    return { dept, count, pct, dash, off, color: colors[i % colors.length] };
  });

  return (
    <div className="box_shadow" style={{
      background: "#fff",
      flex: "1 1 0", minWidth: 180,
      display: "flex", flexDirection: "column",
      padding: "16px 14px 12px",
      borderBottom: "3px solid #6366f1",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -24, right: -24,
        width: 72, height: 72, borderRadius: "50%",
        background: "radial-gradient(circle, #6366f128 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 14, flexShrink: 0,
          boxShadow: "0 4px 10px #6366f140",
        }}>
          <FiActivity />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8" }}>Departments</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.5px", lineHeight: 1 }}>{deptCounts.length} Active</div>
        </div>
      </div>

      {/* Mini donut + legend row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
        {/* Donut */}
        <svg width={54} height={54} style={{ flexShrink: 0 }}>
          <circle cx={27} cy={27} r={r} fill="none" stroke="#f1f5f9" strokeWidth={sw} />
          {segs.map((s, i) => (
            <circle key={i} cx={27} cy={27} r={r} fill="none"
              stroke={s.color} strokeWidth={sw}
              strokeDasharray={`${s.dash} ${circ - s.dash}`}
              strokeDashoffset={s.off}
              strokeLinecap="round"
            />
          ))}
          <text x={27} y={27} textAnchor="middle" dominantBaseline="central"
            fontSize="10" fontWeight="800" fill="#0f172a">{total}</text>
        </svg>
        {/* Legend dots */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0, flex: 1 }}>
          {segs.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 9.5, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{s.dept.length > 12 ? s.dept.split(" ")[0] : s.dept}</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ MAIN COMPONENT ══════════════ */
const CustomerList = () => {
  const [customers] = useState(allCustomers);
  const stats = useStats(customers);

  const [search, setSearch]               = useState("");
  const [statusFilter, setStatusFilter]   = useState("All");
  const [deptFilter, setDeptFilter]       = useState("All");
  const [visitFilter, setVisitFilter]     = useState("All");
  const [currentPage, setCurrentPage]     = useState(1);
  const [rowsPerPage, setRowsPerPage]     = useState(5);

  const filtered = useMemo(() => {
    let data = customers.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
    );
    if (statusFilter !== "All") data = data.filter(c => c.status === statusFilter);
    if (deptFilter   !== "All") data = data.filter(c => c.department === deptFilter);
    if (visitFilter  === "Last30Days") data = data.slice(0, 3);
    return data;
  }, [customers, search, statusFilter, deptFilter, visitFilter]);

  const totalPages  = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast  = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange    = p => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };
  const handleResetFilters  = () => { setSearch(""); setStatusFilter("All"); setDeptFilter("All"); setVisitFilter("All"); setCurrentPage(1); };
  const statusColor = s => s === "Available" ? "success" : "danger";

  return (
    <div style={{ padding: "20px", background: "#f8f8fb", minHeight: "100vh" }}>
      <style>{`
        .stat-card-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (max-width: 1100px) {
          .stat-card-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 700px) {
          .stat-card-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }
        @media (max-width: 420px) {
          .stat-card-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Customer List</h5>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Add Customer
        </Button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="stat-card-grid">
        <StatCard icon={FiUsers}     label="Total Customers"  value={stats.total}     accent="#6366f1" trend={12} />
        <StatCard icon={FiUserCheck} label="Available"        value={stats.available} accent="#10b981" trend={8}  />
        <StatCard icon={FiUserX}     label="Unavailable"      value={stats.unavail}   accent="#ef4444" trend={-4} />
        <StatCard icon={FiActivity}  label="Availability Rate" value={stats.availRate} accent="#f59e0b" isRate />
        <StatCard icon={FiMapPin}    label="Cities Covered"   value={stats.cities}    accent="#3b82f6" trend={5}  />
      </div>

      {/* ── TABLE CARD ── */}
      <div className="box_shadow p-3 bg-white">

        {/* FILTERS */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">
            <Col lg={3} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control placeholder="Search name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
              </InputGroup>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </Form.Select>
            </Col>
            <Col lg={3} md={6}>
              <Form.Select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
                <option value="All">All Departments</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </Form.Select>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select value={visitFilter} onChange={e => setVisitFilter(e.target.value)}>
                <option value="All">All Visits</option>
                <option value="Last30Days">Last 30 Days</option>
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
                <th>Customer</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Address</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="fw-medium">{c.name}</div>
                    <small className="text-muted">{c.ageGender}</small>
                  </td>
                  <td>{c.phone}</td>
                  <td>
                    <div className="fw-medium">{c.assignedTo}</div>
                    <small className="text-muted">{c.department}</small>
                  </td>
                  <td>{c.address}</td>
                  <td className="text-muted small">{c.lastVisit}</td>
                  <td><Badge bg={statusColor(c.status)}>{c.status}</Badge></td>
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
                  <td colSpan="7" className="text-center text-muted py-4">No customers found</td>
                </tr>
              )}
            </tbody>

            {totalPages > 0 && (
              <tfoot>
                <tr>
                  <td colSpan="7">
                    <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                      <small className="text-muted">
                        Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length} customers
                      </small>
                      <Stack direction="horizontal" gap={2}>
                        <Form.Select size="sm" value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} style={{ width: "90px" }}>
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                        </Form.Select>
                        <Button size="sm" className="pagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prev</Button>
                        {[...Array(totalPages)].map((_, i) => (
                          <Button key={i + 1} size="sm" className={`pagination-btn ${currentPage === i + 1 ? "active-page" : ""}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</Button>
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

export default CustomerList;