import React, { useState, useMemo } from "react";
import {
  Table,
  Dropdown,
  Badge,
  InputGroup,
  Form,
  Button,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { FiPlus, FiSearch, FiMoreVertical } from "react-icons/fi";

const SalesRefund = () => {
  const [refunds] = useState([
    {
      id: "RF-001",
      invoice: "INV-1001",
      customer: "Rahul Das",
      amount: "₹500",
      method: "UPI",
      status: "Completed",
      date: "10 Feb 2026",
    },
    {
      id: "RF-002",
      invoice: "INV-1005",
      customer: "Anita Roy",
      amount: "₹300",
      method: "Cash",
      status: "Pending",
      date: "09 Feb 2026",
    },
    {
      id: "RF-003",
      invoice: "INV-1009",
      customer: "Suman Patel",
      amount: "₹1200",
      method: "Card",
      status: "Rejected",
      date: "08 Feb 2026",
    },
  ]);

  /* ================= FILTER STATES ================= */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    let data = refunds.filter(
      (r) =>
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.invoice.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      data = data.filter((r) => r.status === statusFilter);
    }

    if (methodFilter !== "All") {
      data = data.filter((r) => r.method === methodFilter);
    }

    if (dateFilter === "Last7Days") {
      // Simple demo filter
      data = data.slice(0, 2);
    }

    return data;
  }, [refunds, search, statusFilter, methodFilter, dateFilter]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setMethodFilter("All");
    setDateFilter("All");
    setCurrentPage(1);
  };

  const statusColor = (status) => {
    if (status === "Completed") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <div className="container my-4 px-4">

      {/* ================= HEADER ================= */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Sales Refund</h5>
        </div>

        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Add Refund
        </Button>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="box_shadow p-3 bg-white table-responsive">

        {/* FILTER SECTION */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">

            <Col lg={4} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search refund, invoice, customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col lg={2} md={6}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={6}>
              <Form.Select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
              >
                <option value="All">All Methods</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={6}>
              <Form.Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Last7Days">Last 7 Days</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={12}>
              <div className="d-flex gap-2">
                <Button
                  className="button flex-fill"
                  onClick={() => setCurrentPage(1)}
                >
                  Filter
                </Button>
                <Button
                  variant="outline-secondary"
                  className="flex-fill"
                  onClick={handleResetFilters}
                >
                  Reset
                </Button>
              </div>
            </Col>

          </Row>
        </div>

        <hr />

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
            {currentData.length > 0 ? (
              currentData.map((refund) => (
                <tr key={refund.id}>
                  <td className="fw-medium">{refund.id}</td>
                  <td>{refund.invoice}</td>
                  <td>{refund.customer}</td>
                  <td>{refund.amount}</td>
                  <td>{refund.method}</td>
                  <td>
                    <Badge bg={statusColor(refund.status)}>
                      {refund.status}
                    </Badge>
                  </td>
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
                        <Dropdown.Item className="text-danger">
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted py-4">
                  No refunds found
                </td>
                </tr>
            )}
          </tbody>

          {/* ADVANCED PAGINATION */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="8">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">

                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} refunds
                    </small>

                    <Stack direction="horizontal" gap={2}>
                      <Button
                        size="sm"
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Prev
                      </Button>

                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <Button
                            key={pageNumber}
                            size="sm"
                            className={`pagination-btn ${
                              currentPage === pageNumber ? "active-page" : ""
                            }`}
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        );
                      })}

                      <Button
                        size="sm"
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </Stack>

                  </div>
                </td>
              </tr>
            </tfoot>
          )}

        </Table>
      </div>
    </div>
  );
};

export default SalesRefund;