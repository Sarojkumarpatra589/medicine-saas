import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";
import {
  FiSearch,
  FiAlertTriangle,
  FiClock,
  FiCheckCircle
} from "react-icons/fi";

const ExpiryTracking = () => {
  const [data] = useState([
    {
      name: "Paracetamol 500mg",
      batch: "BATCH-A12",
      expiry: "2026-03-10",
      stock: 50,
      status: "Expiring Soon"
    },
    {
      name: "Amoxicillin 250mg",
      batch: "BATCH-X11",
      expiry: "2026-07-20",
      stock: 120,
      status: "Safe"
    },
    {
      name: "Vitamin C",
      batch: "BATCH-V33",
      expiry: "2026-02-15",
      stock: 25,
      status: "Critical"
    }
  ]);

  const badgeVariant = (status) => {
    if (status === "Critical") return "danger";
    if (status === "Expiring Soon") return "warning";
    return "success";
  };

  const SummaryCard = ({ title, value, color, icon }) => (
    <Card
      className="border-0 h-100"
      style={{
        borderRadius: 14,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">

        <div>
          <div className="text-muted small">{title}</div>
          <h3 className={`fw-bold text-${color}`}>{value}</h3>
        </div>

        <div
          className={`bg-${color} bg-opacity-10 text-${color} d-flex align-items-center justify-content-center`}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12
          }}
        >
          {icon}
        </div>

      </Card.Body>
    </Card>
  );

  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh" }}>
      <Container fluid className="p-4">

        {/* ===== Header ===== */}
        <Row className="mb-4 align-items-center">
          <Col lg={6}>
            <h3 className="fw-bold mb-1">Expiry Tracking</h3>
            <div className="text-muted">
              Monitor medicines approaching expiration
            </div>
          </Col>

          <Col lg={6}>
            <InputGroup className="shadow-sm">
              <InputGroup.Text>
                <FiSearch />
              </InputGroup.Text>
              <Form.Control placeholder="Search medicine or batch..." />
              <Button variant="primary">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* ===== Summary Cards ===== */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <SummaryCard
              title="Critical"
              value="3"
              color="danger"
              icon={<FiAlertTriangle size={22} />}
            />
          </Col>

          <Col md={4}>
            <SummaryCard
              title="Expiring Soon"
              value="7"
              color="warning"
              icon={<FiClock size={22} />}
            />
          </Col>

          <Col md={4}>
            <SummaryCard
              title="Safe Stock"
              value="24"
              color="success"
              icon={<FiCheckCircle size={22} />}
            />
          </Col>
        </Row>

        {/* ===== Filter Bar ===== */}
        <Card
          className="border-0 mb-4"
          style={{
            borderRadius: 14,
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)"
          }}
        >
          <Card.Body>
            <Row className="g-3 align-items-center">

              <Col md={4}>
                <Form.Select>
                  <option>All Status</option>
                  <option>Critical</option>
                  <option>Expiring Soon</option>
                  <option>Safe</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Control type="date" />
              </Col>

              <Col md={4}>
                <Button variant="primary" className="w-100">
                  Apply Filters
                </Button>
              </Col>

            </Row>
          </Card.Body>
        </Card>

        {/* ===== Table ===== */}
        <Card
          className="border-0"
          style={{
            borderRadius: 14,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
          }}
        >
          <Card.Body>

            <Table hover responsive className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Medicine</th>
                  <th>Batch</th>
                  <th>Expiry Date</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td className="fw-semibold">{item.name}</td>
                    <td>{item.batch}</td>
                    <td>{item.expiry}</td>
                    <td>{item.stock}</td>
                    <td>
                      <Badge pill bg={badgeVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

          </Card.Body>
        </Card>

      </Container>
    </div>
  );
};

export default ExpiryTracking;
