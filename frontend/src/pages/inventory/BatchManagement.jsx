import React, { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Table,
  Badge,
} from "react-bootstrap";
import { FiSearch } from "react-icons/fi";

const BatchStockReport = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const data = [
    {
      product: "Paracetamol 500mg",
      total: 117,
      batches: [
        { no: "BATCH-2HECTGC", expiry: "2026-04-17", status: "Near Expiry", stock: 50 },
        { no: "BATCH-UEIHWV", expiry: "2027-02-17", status: "Valid", stock: 40 },
        { no: "BATCH-4TUPB", expiry: "2027-05-17", status: "Valid", stock: 16 },
        { no: "BATCH-O2FUP", expiry: "2027-06-17", status: "Valid", stock: 13 },
      ],
    },
    {
      product: "Amoxicillin 250mg",
      total: 1255,
      batches: [
        { no: "BATCH-B8IMZJ", expiry: "2026-08-17", status: "Valid", stock: 1 },
        { no: "BATCH-KKUMTA", expiry: "2026-09-17", status: "Valid", stock: 22 },
        { no: "BATCH-CEB1IL", expiry: "2026-10-17", status: "Valid", stock: 0 },
        { no: "BATCH-1", expiry: "2026-11-10", status: "Valid", stock: 974 },
        { no: "BATCH-LKG4YP", expiry: "2026-12-17", status: "Valid", stock: 48 },
      ],
    },
  ];

  const filteredData = useMemo(() => {
    return data.map((product) => {
      const filteredBatches = product.batches.filter((b) => {
        const matchSearch =
          product.product.toLowerCase().includes(search.toLowerCase()) ||
          b.no.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
          statusFilter === "All" ||
          b.status === statusFilter;

        return matchSearch && matchStatus;
      });

      return { ...product, batches: filteredBatches };
    });
  }, [search, statusFilter]);

  const statusBadge = (status) => {
    if (status === "Valid")
      return <Badge bg="success" pill className="px-3 py-1">VALID</Badge>;

    if (status === "Near Expiry")
      return <Badge bg="warning" text="dark" pill className="px-3 py-1">NEAR EXPIRY</Badge>;
  };

  return (
    <div className="p-3" style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      <Card
        className="border-0"
        style={{
          borderRadius: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Card.Body>

          {/* Header */}
          <Row className="align-items-center mb-4">
            <Col md={6}>
              <h4 className="fw-bold mb-0">Batch Stock Report</h4>
            </Col>

            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <Button variant="success" className="me-2 shadow-sm">
                Download Excel
              </Button>

              <Button variant="danger" className="shadow-sm">
                Download PDF
              </Button>
            </Col>
          </Row>

          {/* Filters */}
          <Row className="g-3 mb-4">
            <Col md={6} lg={4}>
              <InputGroup className="shadow-sm">
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>

                <Form.Control
                  placeholder="Search product, batch..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col md={4} lg={3}>
              <Form.Select
                className="shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Expiry Status</option>
                <option value="Valid">Valid</option>
                <option value="Near Expiry">Near Expiry</option>
              </Form.Select>
            </Col>

            <Col md={2}>
              <Button className="w-100 shadow-sm">
                Search
              </Button>
            </Col>
          </Row>

          {/* Batch Tables */}
          {filteredData.map((product, idx) =>
            product.batches.length > 0 && (
              <Card
                key={idx}
                className="mb-4 border-0"
                style={{
                  borderRadius: 12,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
                }}
              >
                <Card.Body>

                  <div className="d-flex justify-content-between mb-3">
                    <h6 className="fw-bold">
                      {product.product}
                    </h6>

                    <Badge bg="primary" pill>
                      Total Stock: {product.total}
                    </Badge>
                  </div>

                  <div className="table-responsive">
                    <Table
                      hover
                      className="align-middle mb-0"
                    >
                      <thead className="table-light">
                        <tr>
                          <th>Batch No</th>
                          <th>Expiry Date</th>
                          <th>Status</th>
                          <th>Batch Stock</th>
                        </tr>
                      </thead>

                      <tbody>
                        {product.batches.map((b, i) => (
                          <tr key={i}>
                            <td className="fw-semibold">{b.no}</td>
                            <td>{b.expiry}</td>
                            <td>{statusBadge(b.status)}</td>
                            <td>{b.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                </Card.Body>
              </Card>
            )
          )}

        </Card.Body>
      </Card>
    </div>
  );
};

export default BatchStockReport;
