// ─────────────────────────────────────────────────────────────
//  SETUP:
//  npm install react-bootstrap bootstrap
//  In your index.js: import 'bootstrap/dist/css/bootstrap.min.css';
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  Container, Row, Col, Card, Table,
  Form, InputGroup, Button, Pagination,
} from "react-bootstrap";

// ── DATA ──────────────────────────────────────────────────────
const invoiceData = [
  {
    no: 1023, date: "12/01/2022", time: "10:30 AM",
    customer: "Rahul Sharma",  mobile: "039088335",
    medicine: "Paracetamol",   batch: "B124", expiry: "05/23",
    qty: 5,  mrp: 50,  sale: 45,  discount: 45,  gst: "5%",
    total: "₹ 225.00", mode: "Cash",        profit: "₹40.00",  profitRed: false,
  },
  {
    no: 1021, date: "12/01/2022", time: "09:15 AM",
    customer: "Dr. Mehta",     mobile: "88177777",
    medicine: "Ciprofloxacin", batch: "C567", expiry: "08/22",
    qty: 10, mrp: 80,  sale: 72,  discount: 72,  gst: "12%",
    total: "₹ 806.40", mode: "Credit Card", profit: "₹120.00", profitRed: true,
  },
  {
    no: 1019, date: "11/30/2022", time: "04:45 PM",
    customer: "Anita Verma",   mobile: "996222022",
    medicine: "Aspirin",       batch: "A211", expiry: "04/22",
    qty: 3,  mrp: 30,  sale: 25,  discount: 25,  gst: "5%",
    total: "₹ 78.75",  mode: "UPI",         profit: "₹18.00",  profitRed: false,
  },
  {
    no: 1017, date: "11/30/2022", time: "02:20 PM",
    customer: "Green Hospital", mobile: "838889535",
    medicine: "Insulin",       batch: "I498", expiry: "12/21",
    qty: 2,  mrp: 150, sale: 135, discount: 135, gst: "12%",
    total: "₹ 302.40", mode: "Neha",        profit: "₹40.00",  profitRed: false,
  },
  {
    no: 1015, date: "11/30/2022", time: "11:00 AM",
    customer: "Vikram Patil",   mobile: "999353555",
    medicine: "Amoxicillin",   batch: "A799", expiry: "06/22",
    qty: 6,  mrp: 60,  sale: 55,  discount: 55,  gst: "5%",
    total: "₹ 350.00", mode: "UPI",         profit: "₹50.00",  profitRed: false,
  },
];

const kpiData = [
  { label: "Total Sales",         value: "₹1,25,480", bg: "#1565c0" },
  { label: "Total Invoices",      value: "85",          bg: "#2e7d32" },
  { label: "Medicines Sold",      value: "320 Qty",     bg: "#e65100" },
  { label: "Discount Given",      value: "₹4,750",      bg: "#c62828" },
  { label: "Total GST Collected", value: "₹8,920",      bg: "#6a1b9a" },
  { label: "Net Profit",          value: "₹22,300",     bg: "#00695c" },
  { label: "Pending Credit",      value: "₹6,500",      bg: "#4e342e" },
];

const topMedicines = [
  { name: "Paracetamol", height: 110, color: "#1565c0" },
  { name: "Insulin",     height: 88,  color: "#2e7d32" },
  { name: "Amoxicillin", height: 68,  color: "#e65100" },
  { name: "Aspirin",     height: 52,  color: "#c62828" },
  { name: "Metformin",   height: 38,  color: "#6a1b9a" },
  { name: "Cetirizine",  height: 22,  color: "#00695c" },
];

const categoryLegend = [
  { label: "Tablets",    color: "#e53935" },
  { label: "Syrups",     color: "#fb8c00" },
  { label: "Injections", color: "#43a047" },
  { label: "Others",     color: "#8bc34a" },
];

const gstLegend = [
  { label: "CGST", color: "#e53935" },
  { label: "SGST", color: "#5e35b1" },
  { label: "IGST", color: "#1e88e5" },
  { label: "4IPI", color: "#43a047" },
];

const gstGroups = [
  { label: "CGST", segs: [36, 26, 20, 16] },
  { label: "SGST", segs: [30, 30, 24, 14] },
  { label: "IGST", segs: [38, 28, 22, 12] },
  { label: "4IPI", segs: [32, 22, 18, 10] },
];

const paymentLegend = [
  { label: "Cash",          color: "#1e88e5" },
  { label: "Credit Card",   color: "#fb8c00" },
  { label: "UPI",           color: "#43a047" },
  { label: "Online Wallet", color: "#e53935" },
];

// ── DONUT SVG COMPONENT ────────────────────────────────────────
function DonutChart({ segments, size = 150, strokeWidth = 26, centerText = "" }) {
  const r = (size / 2) - strokeWidth;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  let cumulative = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const gap  = circ - dash;
        const offset = circ * 0.25 - cumulative;
        cumulative += dash;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={offset}
          />
        );
      })}
      {/* white hole */}
      <circle cx={cx} cy={cy} r={r - strokeWidth / 2 + 2} fill="white" />
      {centerText && (
        <text x={cx} y={cy + 4} textAnchor="middle"
          fontSize="13" fontWeight="bold" fill="#333">{centerText}</text>
      )}
    </svg>
  );
}

// ── NEW: DONUT WITH INLINE SVG LABELS ─────────────────────────
function DonutChartWithLabels({ segments, size = 150, strokeWidth = 36 }) {
  const r    = size / 2 - strokeWidth / 2;
  const circ = 2 * Math.PI * r;
  const cx   = size / 2;
  const cy   = size / 2;

  let cumPct = 0;
  const arcs = segments.map((seg) => {
    const startPct = cumPct;
    cumPct += seg.pct;
    const midPct   = startPct + seg.pct / 2;
    const midAngle = (midPct / 100) * 2 * Math.PI - Math.PI / 2;
    const lx = cx + r * Math.cos(midAngle);
    const ly = cy + r * Math.sin(midAngle);
    const dash   = (seg.pct / 100) * circ;
    const gap    = circ - dash;
    const offset = circ * 0.25 - (startPct / 100) * circ;
    return { ...seg, dash, gap, offset, lx, ly };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      {arcs.map((a, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={a.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${a.dash} ${a.gap}`}
          strokeDashoffset={a.offset}
        />
      ))}
      <circle cx={cx} cy={cy} r={r - strokeWidth / 2 + 3} fill="white" />
      {arcs.map((a, i) =>
        a.pct >= 5 ? (
          <text
            key={`lbl-${i}`}
            x={a.lx} y={a.ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fontWeight="800"
            fill="#fff"
          >
            {a.pct}%
          </text>
        ) : null
      )}
    </svg>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function SalesReport() {
  const [activePage, setActivePage] = useState(1);

  const categorySvgSegments = [
    { pct: 55, color: "#e53935" },
    { pct: 19, color: "#fb8c00" },
    { pct: 21, color: "#43a047" },
    { pct:  5, color: "#8bc34a" },
  ];

  const paymentSvgSegments = [
    { pct: 22, color: "#1e88e5" },
    { pct: 23, color: "#fb8c00" },
    { pct: 29, color: "#43a047" },
    { pct: 26, color: "#e53935" },
  ];

  // ── STYLES (only non-Bootstrap things) ──
  const styles = {
    pageWrapper:   { backgroundColor: "#eef1f5", minHeight: "100vh" },
    filterCard:    { backgroundColor: "#fff", border: "1px solid #dde3ec", borderRadius: 6 },
    kpiWrapper:    { backgroundColor: "#fff", border: "1px solid #dde3ec", borderRadius: 8, padding: "12px 10px" },
    kpiCard:       (bg) => ({
                     backgroundColor: bg, color: "#fff", borderRadius: 8,
                     textAlign: "center", padding: "12px 8px 14px", flex: 1, minWidth: 0,
                   }),
    kpiTitle:      { fontSize: 13, fontWeight: 600, opacity: 0.93, marginBottom: 6 },
    kpiValue:      { fontSize: 22, fontWeight: 700, margin: 0 },
    tableSection:  { backgroundColor: "#fff", border: "1px solid #dde3ec", borderRadius: 8, overflow: "hidden" },
    invLink:       { color: "#1565c0", fontWeight: 600, textDecoration: "none" },
    boldVal:       { fontWeight: 700 },
    profitGreen:   { color: "#2e7d32", fontWeight: 600 },
    profitRed:     { color: "#c62828", fontWeight: 600 },
    exportBtn:     (border, color) => ({
                     fontSize: 13, padding: "5px 12px", borderRadius: 4,
                     border: `1px solid ${border}`, color, background: "#fff", cursor: "pointer",
                   }),
    pgBtn:         (active) => ({
                     display: "inline-flex", alignItems: "center", justifyContent: "center",
                     width: 30, height: 30, borderRadius: 4, fontSize: 13, fontWeight: 600,
                     border: `1px solid ${active ? "#1565c0" : "#ccd3de"}`,
                     background: active ? "#1565c0" : "#fff",
                     color: active ? "#fff" : "#333", cursor: "pointer", textDecoration: "none",
                   }),
    pgText:        { fontSize: 13, fontWeight: 600, color: "#1565c0", textDecoration: "none",
                     padding: "4px 8px", border: "1px solid #ccd3de", borderRadius: 4, background: "#fff" },
    chartCard:     { backgroundColor: "#fff", border: "1px solid #dde3ec", borderRadius: 8, padding: 14, height: "100%" },
    chartTitle:    { fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#222" },
    barChart:      { display: "flex", alignItems: "flex-end", gap: 5, height: 130,
                     borderLeft: "1px solid #ccc", borderBottom: "1px solid #ccc", padding: "0 6px 0 4px" },
    barItem:       { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
    barRect:       (h, c) => ({ height: h, width: "100%", backgroundColor: c, borderRadius: "3px 3px 0 0" }),
    barLabel:      { fontSize: 9, color: "#666", marginTop: 2, textAlign: "center",
                     whiteSpace: "nowrap", overflow: "hidden", maxWidth: 38 },
    yAxis:         { display: "flex", flexDirection: "column", justifyContent: "space-between",
                     height: 130, textAlign: "right", width: 24, paddingBottom: 0, marginRight: 4 },
    yLabel:        { fontSize: 9, color: "#888" },
    stkChart:      { display: "flex", alignItems: "flex-end", gap: 10, height: 120,
                     borderLeft: "1px solid #ccc", borderBottom: "1px solid #ccc", padding: "0 8px 0 6px" },
    stkCol:        { display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 1, flex: 1 },
    stkSeg:        (h, c) => ({ height: h, width: "100%", backgroundColor: c, borderRadius: 2 }),
    stkLabel:      { fontSize: 10, color: "#666", textAlign: "center", marginTop: 3 },
    legendDot:     (c) => ({ width: 12, height: 12, borderRadius: 3, backgroundColor: c, flexShrink: 0 }),
    legendLabel:   { fontSize: 12, color: "#444" },
    donutRow:      { display: "flex", alignItems: "center", gap: 14 },
    legendCol:     { display: "flex", flexDirection: "column", gap: 8 },
    legendRow:     { display: "flex", alignItems: "center", gap: 8 },
    pctLabel:      (c) => ({
                     position: "absolute", fontSize: 11, fontWeight: 700,
                     color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,.4)"
                   }),
  };

  const formCtrl = { fontSize: 13, height: 34 };

  return (
    <div style={styles.pageWrapper}>
      <Container fluid className="py-3 px-3 px-lg-4" style={{ maxWidth: 1400 }}>

        {/* ── PAGE TITLE ── */}
        <h5 className="fw-bold mb-3" style={{ fontSize: 20 }}>Sales Report</h5>

        {/* ── FILTER ROW 1 ── */}
        <div style={styles.filterCard} className="p-4 mb-4 shadow-lg ">
          <Row className="g-2 align-items-center">

            <Col xs={12} md="auto">
              <InputGroup style={{ width: "100%" }}>
                <InputGroup.Text style={{ ...formCtrl, background: "#fff", borderColor: "#ccd3de", fontSize: 13 }}>
                  Date Range &nbsp;▾
                </InputGroup.Text>
                <Form.Control
                  defaultValue="01/01/2022 to 01/31/2022"
                  style={{ ...formCtrl, minWidth: 140, borderColor: "#ccd3de" }}
                />
                <InputGroup.Text style={{ ...formCtrl, background: "#fff", borderColor: "#ccd3de", fontSize: 13 }}>
                  📅
                </InputGroup.Text>
              </InputGroup>
            </Col>

            <Col xs={6} sm={4} md={2} lg="auto">
              <Form.Control placeholder="Invoice No" style={{ ...formCtrl, borderColor: "#ccd3de" }} />
            </Col>

            <Col xs={6} sm={4} md={2} lg="auto">
              <Form.Control placeholder="Medicine Name" style={{ ...formCtrl, borderColor: "#ccd3de" }} />
            </Col>

            <Col xs={6} sm={4} md={2} lg="auto">
              <Form.Select style={{ ...formCtrl, borderColor: "#ccd3de" }}>
                <option>Batch No &nbsp;▾</option>
              </Form.Select>
            </Col>

            <Col xs={6} sm={4} md={2} lg="auto">
              <Form.Select style={{ ...formCtrl, borderColor: "#ccd3de" }}>
                <option>Category &nbsp;▾</option>
              </Form.Select>
            </Col>

            <Col xs={12} sm={4} md={2} lg="auto">
              <Form.Select style={{ ...formCtrl, borderColor: "#ccd3de" }}>
                <option>GST Type: &nbsp;All &nbsp;▾</option>
              </Form.Select>
            </Col>

            <Col xs={6} sm={4} md={2}>
              <Form.Select style={{ ...formCtrl, borderColor: "#ccd3de" }}>
                <option>Invoice No &nbsp;▾</option>
              </Form.Select>
            </Col>

             <Col xs={6} sm={4} md={2}>
              <Form.Select style={{ ...formCtrl, borderColor: "#ccd3de" }}>
                <option>Medicine Name &nbsp;▾</option>
              </Form.Select>
            </Col>

            <Col xs={6} sm={4} md={2}>
              <Form.Select style={{ ...formCtrl, borderColor: "#ccd3de" }}>
                <option>Customer Type &nbsp;▾</option>
              </Form.Select>
            </Col>

             <Col xs={6} sm={4} md={2}>
              <Form.Select style={{ ...formCtrl, borderColor: "#ccd3de" }}>
                <option>Payment Mode &nbsp;▾</option>
              </Form.Select>
            </Col>

             <Col xs={6} sm={4} md={2} className="d-flex justify-content-end">
              <Button
                className="w-100 fw-bold"
                style={{ background: "#1e9e3e", border: "none", fontSize: 14, borderRadius: 5, height: 34 }}
              >
                Apply Filter
              </Button>
            </Col>

          </Row>
        </div>

        {/* ── KPI CARDS ── */}
        <div style={styles.kpiWrapper} className="mb-4 p-4 shadow-lg">
          <div className="d-flex flex-wrap gap-2">
            {kpiData.map((k) => (
              <div key={k.label} style={styles.kpiCard(k.bg)} className="flex-grow-1">
                <div style={styles.kpiTitle}>{k.label}</div>
                <div style={styles.kpiValue}>{k.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INVOICE TABLE ── */}
        <div className="mb-4 p-4 rounded overflow-hidden border bg-white shadow-lg">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle small">

              <thead>
                <tr className="border-bottom border-2">
                  {["Invoice No","Date & Time","Customer Name","Mobile No",
                    "Medicine & Batch","Expiry Date","Qty","MRP",
                    "Sale Price","Discount","GST","Total Amount","Payment Mode","Profit"
                  ].map((h) => (
                    <th key={h}
                      className="px-3 py-3 fw-semibold text-uppercase text-muted bg-light"
                      style={{ fontSize: 11, letterSpacing: "0.6px", whiteSpace: "nowrap" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {invoiceData.map((r) => (
                  <tr key={r.no} className="border-bottom">
                    <td className="px-3 py-3 fw-semibold text-primary">#{r.no}</td>
                    <td className="px-3 py-3">
                      <div className="fw-semibold text-dark">{r.date}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>{r.time}</div>
                    </td>
                    <td className="px-3 py-3 fw-semibold text-dark">{r.customer}</td>
                    <td className="px-3 py-3 text-muted">{r.mobile}</td>
                    <td className="px-3 py-3">
                      <div className="fw-semibold text-dark">{r.medicine}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>Batch: {r.batch}</div>
                    </td>
                    <td className="px-3 py-3 text-muted">{r.expiry}</td>
                    <td className="px-3 py-3 text-center fw-semibold text-dark">{r.qty}</td>
                    <td className="px-3 py-3 text-end text-muted">₹{r.mrp}.00</td>
                    <td className="px-3 py-3 text-end fw-semibold text-dark">₹{r.sale}.00</td>
                    <td className="px-3 py-3 text-end text-muted">₹{r.discount}.00</td>
                    <td className="px-3 py-3 text-center text-muted">{r.gst}</td>
                    <td className="px-3 py-3 text-end fw-bold text-dark">{r.total}</td>
                    <td className="px-3 py-3 text-muted">{r.mode}</td>
                    <td className="px-3 py-3 text-end fw-semibold">
                      <span className={r.profitRed ? "text-danger" : "text-success"}>
                        {r.profit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </div>
        </div>

        {/* ── EXPORT + PAGINATION ── */}
        <Row className="align-items-center mb-4 g-2 ">
          <Col xs={12} md={6}>
            <div className="d-flex gap-2 flex-wrap">
              <button style={styles.exportBtn("#c62828","#c62828")}>🔴 Export to PDF</button>
              <button style={styles.exportBtn("#2e7d32","#2e7d32")}>🟢 Export to Excel</button>
              <button style={styles.exportBtn("#555","#555")}>🖨 Print Report</button>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="d-flex gap-1 justify-content-md-end align-items-center">
              {[1,2,3,4].map((p) => (
                <a href="#" key={p}
                  style={styles.pgBtn(activePage === p)}
                  onClick={(e) => { e.preventDefault(); setActivePage(p); }}>
                  {p}
                </a>
              ))}
              <a href="#" style={styles.pgText}
                onClick={(e) => { e.preventDefault(); setActivePage(Math.min(activePage+1,4)); }}>
                Next
              </a>
              <a href="#" style={styles.pgBtn(false)}>›</a>
              <a href="#" style={styles.pgBtn(false)}>»</a>
            </div>
          </Col>
        </Row>

        {/* ── CHART CARDS ── */}
        <Row className="g-3 mt-4 shadow-lg">

          {/* 1 · Top Selling Medicines */}
          <Col xs={12} sm={6} xl={3}>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Top Selling Medicines</div>
              <div style={{ display: "flex", height: 160 }}>

                {/* Y-axis labels */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between", alignItems: "flex-end",
                  paddingRight: 6, paddingBottom: 36, paddingTop: 2,
                }}>
                  {["150", "100", "50", "0"].map((v) => (
                    <span key={v} style={{ fontSize: 10, fontWeight: 700, color: "#333" }}>{v}</span>
                  ))}
                </div>

                {/* Chart area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

                  {/* Grid + Bars */}
                  <div style={{
                    flex: 1,
                    position: "relative",
                    borderLeft: "1px solid #e0e0e0",
                    borderBottom: "1px solid #e0e0e0",
                  }}>
                    {[0, 33, 66].map((pct) => (
                      <div key={pct} style={{
                        position: "absolute", top: `${pct}%`, left: 0, right: 0,
                        borderTop: "1px dashed #eee",
                      }} />
                    ))}

                    {/* Bars */}
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "flex-end",
                      gap: 5, padding: "4px 6px 0 6px",
                    }}>
                      {topMedicines.map((m) => (
                        <div key={m.name} style={{
                          flex: 1, display: "flex", flexDirection: "column",
                          justifyContent: "flex-end", height: "100%",
                        }}>
                          <div style={{
                            width: "100%",
                            height: `${(m.height / 160) * 100}%`,
                            backgroundColor: m.color,
                            borderRadius: "3px 3px 0 0",
                          }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Single-line name labels below x-axis */}
                  <div style={{
                    display: "flex", gap: 5, padding: "4px 6px 0 6px", height: 36,
                  }}>
                    {topMedicines.map((m) => (
                      <div key={m.name} style={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: 2,
                      }}>
                        <span style={{
                          fontSize: 8,
                          fontWeight: 700,
                          color: "#555",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                          display: "block",
                          textAlign: "center",
                        }}>
                          {m.name}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </Col>

          {/* 2 · Sales by Category — UPDATED */}
          <Col xs={12} sm={6} xl={3}>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Sales by Category</div>
              <div style={styles.donutRow}>
                <DonutChartWithLabels
                  segments={categorySvgSegments}
                  size={150}
                  strokeWidth={36}
                />
                <div style={styles.legendCol}>
                  {categoryLegend.map((l) => (
                    <div key={l.label} style={styles.legendRow}>
                      <div style={styles.legendDot(l.color)} />
                      <span style={styles.legendLabel}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          {/* 3 · GST Collection */}
          <Col xs={12} sm={6} xl={3}>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>GST Collection</div>
              <div style={{ display: "flex", height: 160 }}>

                {/* Y-axis labels */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between", alignItems: "flex-end",
                  paddingRight: 6, paddingBottom: 20, paddingTop: 4,
                }}>
                  {["₹300", "₹300", "₹200", "₹200"].map((v, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "#333" }}>{v}</span>
                  ))}
                </div>

                {/* Chart area */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                  {/* Grid + Bars */}
                  <div style={{
                    flex: 1,
                    position: "relative",
                    borderLeft: "1px solid #e0e0e0",
                    borderBottom: "1px solid #e0e0e0",
                  }}>
                    {/* Horizontal grid lines */}
                    {[0, 33, 66].map((pct) => (
                      <div key={pct} style={{
                        position: "absolute", top: `${pct}%`, left: 0, right: 0,
                        borderTop: "1px dashed #eee",
                      }} />
                    ))}

                    {/* Bars */}
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "flex-end",
                      gap: 8, padding: "4px 8px 0 8px",
                    }}>
                      {gstGroups.map((g) => (
                        <div key={g.label} style={{
                          flex: 1, display: "flex", flexDirection: "column",
                          justifyContent: "flex-end", height: "100%", gap: 2,
                        }}>
                          {[gstLegend[3].color, gstLegend[2].color, gstLegend[1].color, gstLegend[0].color].map((c, si) => (
                            <div key={si} style={{
                              width: "100%",
                              height: g.segs[3 - si] * 1.1,
                              backgroundColor: c,
                              borderRadius: si === 3 ? "3px 3px 0 0" : 2,
                            }} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend — only colored dots + labels, no repeated group names */}
              <div className="d-flex flex-wrap gap-2 mt-2 justify-content-center">
                {gstLegend.map((l) => (
                  <div key={l.label} style={styles.legendRow}>
                    <div style={{ ...styles.legendDot(l.color), width: 10, height: 10 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#333" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* 4 · Payment Mode Breakdown */}
          <Col xs={12} sm={6} xl={3}>
            <div style={styles.chartCard}>
              <div style={styles.chartTitle}>Payment Mode Breakdown</div>
              <div style={styles.donutRow}>
                <DonutChartWithLabels
                  segments={paymentSvgSegments}
                  size={150}
                  strokeWidth={36}
                />
                <div style={styles.legendCol}>
                  {paymentLegend.map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                      <div style={styles.legendDot(l.color)} />
                      <span style={{ fontSize: 11, color: "#444" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>

        </Row>

        {/* Footer */}
        <div className="text-center text-muted mt-4 mb-2" style={{ fontSize: 12 }}>
          PharmaSoft Sales Report &nbsp;·&nbsp; Generated {new Date().toLocaleDateString("en-IN")} &nbsp;·&nbsp; v3.2
        </div>

      </Container>
    </div>
  );
}