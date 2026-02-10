import React, { useState, useMemo } from "react";
import {
  Table,
  Dropdown,
  Badge,
  InputGroup,
  Form,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
} from "react-icons/fi";

const SalesRefund = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [refunds] = useState([
    {
      id: "RF-001",
      invoice: "INV-1001",
      customer: "Rahul Das",
      amount: 500,
      method: "UPI",
      status: "Completed",
      date: "10 Feb 2026",
    },
    {
      id: "RF-002",
      invoice: "INV-1005",
      customer: "Anita Roy",
      amount: 300,
      method: "Cash",
      status: "Pending",
      date: "09 Feb 2026",
    },
    {
      id: "RF-003",
      invoice: "INV-1009",
      customer: "Suman Patel",
      amount: 1200,
      method: "Card",
      status: "Rejected",
      date: "08 Feb 2026",
    },
  ]);

  const filteredData = useMemo(() => {
    return refunds.filter((r) => {
      const matchSearch = Object.values(r)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || r.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, refunds]);

  const statusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>

        {/* Responsive Header */}
        <Row className="align-items-center mb-3">
          <Col xs={12} md={9}>
            <h4 className="mb-2 mb-md-0">Sales Refund</h4>
          </Col>

          <Col xs={12} md={3} className="text-md-end">
            <Button className="w-100 w-sm-auto">
              <FiPlus /> Add Refund
            </Button>
          </Col>
        </Row>

        {/* Responsive Filters */}
        <Row className="g-2 mb-3">
          <Col xs={12} md={6} lg={4}>
            <InputGroup>
              <InputGroup.Text>
                <FiSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search refunds..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Rejected</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Responsive Table */}
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Refund ID</th>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((r, index) => (
                <tr key={index}>
                  <td>{r.id}</td>
                  <td>{r.invoice}</td>
                  <td>{r.customer}</td>
                  <td>₹{r.amount}</td>
                  <td>{r.method}</td>
                  <td>
                    <Badge bg={statusVariant(r.status)}>
                      {r.status}
                    </Badge>
                  </td>
                  <td>{r.date}</td>

                  <td>
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="light"
                        size="sm"
                      >
                        <FiMoreVertical />
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

      </Card.Body>
    </Card>
  );
};

export default SalesRefund;
