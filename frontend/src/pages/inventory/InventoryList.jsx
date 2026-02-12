import React, { useState, useMemo } from "react";
import {
  Table,
  Badge,
  InputGroup,
  Form,
  Button,
  Card,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import {
  FiSearch,
  FiPlus,
  FiMoreHorizontal,
  FiFilter,
} from "react-icons/fi";

const SalesList = () => {
  const [search, setSearch] = useState("");

  const sales = [
    {
      order: "ORD-1001",
      customer: "Alberto Ripley",
      product: "Blood Test Kit",
      qty: 2,
      amount: "$120",
      date: "02 May 2025",
      status: "Completed",
    },
    {
      order: "ORD-1002",
      customer: "Susan Babin",
      product: "Thermometer",
      qty: 1,
      amount: "$25",
      date: "28 Apr 2025",
      status: "Pending",
    },
    {
      order: "ORD-1003",
      customer: "Carol Lam",
      product: "BP Monitor",
      qty: 1,
      amount: "$75",
      date: "20 Apr 2025",
      status: "Completed",
    },
    {
      order: "ORD-1004",
      customer: "Marsha Noland",
      product: "Wheelchair",
      qty: 1,
      amount: "$210",
      date: "18 Apr 2025",
      status: "Cancelled",
    },
  ];

  const filtered = useMemo(() => {
    return sales.filter((s) =>
      Object.values(s)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const statusVariant = (status) => {
    if (status === "Completed") return "success";
    if (status === "Pending") return "warning";
    if (status === "Cancelled") return "danger";
    return "secondary";
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>

        {/* Header */}
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <h5 className="mb-0">
              Sales List{" "}
              <Badge bg="primary" pill>
                Total Sales: {sales.length}
              </Badge>
            </h5>
          </Col>

          <Col md={6} className="text-md-end mt-2 mt-md-0">
            <Button variant="primary">
              <FiPlus className="me-1" />
              New Sale
            </Button>
          </Col>
        </Row>

        {/* Search + Filter */}
        <Row className="g-2 mb-3">
          <Col md={6} lg={4}>
            <InputGroup>
              <InputGroup.Text>
                <FiSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search Order"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col className="text-md-end">
            <Button variant="outline-secondary">
              <FiFilter className="me-1" />
              Filters
            </Button>
          </Col>
        </Row>

        {/* Table */}
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s, i) => (
                <tr key={i}>
                  <td className="fw-semibold">{s.order}</td>
                  <td>{s.customer}</td>
                  <td>{s.product}</td>
                  <td>{s.qty}</td>
                  <td>{s.amount}</td>
                  <td>{s.date}</td>

                  <td>
                    <Badge bg={statusVariant(s.status)} pill>
                      {s.status}
                    </Badge>
                  </td>

                  <td>
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="light"
                        size="sm"
                        className="border-0"
                      >
                        <FiMoreHorizontal />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item className="text-danger">
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Footer */}
        <Row className="align-items-center mt-2">
          <Col>
            <small className="text-muted">Page 1 of 1</small>
          </Col>

          <Col className="text-end">
            <Button size="sm" variant="primary" className="me-1">
              {"<"}
            </Button>
            <Button size="sm" variant="primary">
              {">"}
            </Button>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  );
};

export default SalesList;
