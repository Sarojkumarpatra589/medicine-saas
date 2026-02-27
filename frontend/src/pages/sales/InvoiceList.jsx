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

const InvoiceList = () => {
  const [invoices] = useState([
    { id: 1, invoiceNo: "INV-1001", client: "Alberto Ripley", amount: 520, date: "2025-05-02", due: "2025-05-12", status: "Paid" },
    { id: 2, invoiceNo: "INV-1002", client: "Susan Babin", amount: 860, date: "2025-04-28", due: "2025-05-10", status: "Pending" },
    { id: 3, invoiceNo: "INV-1003", client: "Carol Lam", amount: 240, date: "2025-04-20", due: "2025-04-30", status: "Overdue" },
    { id: 4, invoiceNo: "INV-1004", client: "Marsha Noland", amount: 920, date: "2025-04-18", due: "2025-05-01", status: "Paid" },
    { id: 5, invoiceNo: "INV-1005", client: "Irma Armstrong", amount: 150, date: "2025-04-10", due: "2025-04-22", status: "Pending" },
    { id: 6, invoiceNo: "INV-1006", client: "Jesus Adams", amount: 430, date: "2025-04-05", due: "2025-04-18", status: "Paid" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    let data = invoices.filter((inv) =>
      `${inv.invoiceNo} ${inv.client}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      data = data.filter((inv) => inv.status === statusFilter);
    }

    if (dateFilter === "Last7Days") {
      const today = new Date();
      data = data.filter((inv) => {
        const invDate = new Date(inv.date);
        const diff = (today - invDate) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });
    }

    return data;
  }, [invoices, search, statusFilter, dateFilter]);

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
    setDateFilter("All");
    setCurrentPage(1);
  };

  const statusColor = (status) => {
    if (status === "Paid") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <div className="container my-4 px-4">

      {/* ================= HEADER ================= */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Invoice List</h5>
        </div>

        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Add Invoice
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
                  placeholder="Search invoice or client..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </Form.Select>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Last7Days">Last 7 Days</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={6}>
              <div className="d-flex gap-2">
                <Button className="button flex-fill" onClick={() => setCurrentPage(1)}>
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
              <th>Invoice</th>
              <th>Client</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((inv) => (
                <tr key={inv.id}>
                  <td className="fw-medium">{inv.invoiceNo}</td>
                  <td>{inv.client}</td>
                  <td>₹{inv.amount}</td>
                  <td className="text-muted small">{inv.date}</td>
                  <td className="text-muted small">{inv.due}</td>
                  <td>
                    <Badge bg={statusColor(inv.status)}>
                      {inv.status}
                    </Badge>
                  </td>

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
                <td colSpan="7" className="text-center py-4 text-muted">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>

          {/* ================= ADVANCED PAGINATION ================= */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="7">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">

                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} invoices
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

export default InvoiceList;