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

const POSBilling = () => {
  const [bills] = useState([
    { id: 1, billNo: "POS-1001", customer: "Walk-in", items: 3, total: "$120", method: "Cash", date: "02 May 2025", status: "Paid" },
    { id: 2, billNo: "POS-1002", customer: "Susan Babin", items: 2, total: "$75", method: "Card", date: "01 May 2025", status: "Paid" },
    { id: 3, billNo: "POS-1003", customer: "Carol Lam", items: 4, total: "$210", method: "UPI", date: "30 Apr 2025", status: "Pending" },
    { id: 4, billNo: "POS-1004", customer: "Marsha Noland", items: 1, total: "$40", method: "Cash", date: "29 Apr 2025", status: "Cancelled" },
    { id: 5, billNo: "POS-1005", customer: "Irma Armstrong", items: 5, total: "$300", method: "Card", date: "28 Apr 2025", status: "Paid" },
    { id: 6, billNo: "POS-1006", customer: "Jesus Adams", items: 2, total: "$95", method: "UPI", date: "27 Apr 2025", status: "Pending" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    let data = bills.filter(
      (b) =>
        b.billNo.toLowerCase().includes(search.toLowerCase()) ||
        b.customer.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      data = data.filter((b) => b.status === statusFilter);
    }

    return data;
  }, [bills, search, statusFilter]);

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
          <h5 className="fw-bold mb-0">POS Billing</h5>
          <small className="text-muted">
            Total Bills: {bills.length}
          </small>
        </div>

        <Button size="sm" className="button">
          <FiPlus className="me-1" /> New Bill
        </Button>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="box_shadow p-3 bg-white table-responsive">

        {/* FILTER SECTION */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">

            <Col lg={5} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search bill or customer..."
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
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Col>

            <Col lg={4} md={12}>
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
            {currentData.length > 0 ? (
              currentData.map((bill) => (
                <tr key={bill.id}>
                  <td className="fw-medium">{bill.billNo}</td>
                  <td>{bill.customer}</td>
                  <td>{bill.items}</td>
                  <td>{bill.total}</td>
                  <td>{bill.method}</td>
                  <td className="text-muted small">{bill.date}</td>

                  <td>
                    <Badge bg={statusColor(bill.status)}>
                      {bill.status}
                    </Badge>
                  </td>

                  <td className="text-end">
                    <Dropdown align="end">
                      <Dropdown.Toggle as="button" className="saas-dot-btn">
                        <FiMoreVertical size={16} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Print</Dropdown.Item>
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
                  No bills found
                </td>
              </tr>
            )}
          </tbody>

          {/* ================= ADVANCED PAGINATION ================= */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="8">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">

                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} bills
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

export default POSBilling;