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

const PaymentHistory = () => {
  const [payments] = useState([
    { id: 1, txn: "TXN-1001", payer: "Alberto Ripley", method: "Card", amount: "$120", date: "02 May 2025", status: "Success" },
    { id: 2, txn: "TXN-1002", payer: "Susan Babin", method: "UPI", amount: "$85", date: "28 Apr 2025", status: "Pending" },
    { id: 3, txn: "TXN-1003", payer: "Carol Lam", method: "Cash", amount: "$40", date: "20 Apr 2025", status: "Success" },
    { id: 4, txn: "TXN-1004", payer: "Marsha Noland", method: "Card", amount: "$210", date: "18 Apr 2025", status: "Failed" },
    { id: 5, txn: "TXN-1005", payer: "Irma Armstrong", method: "UPI", amount: "$90", date: "10 Apr 2025", status: "Success" },
    { id: 6, txn: "TXN-1006", payer: "Jesus Adams", method: "Card", amount: "$60", date: "05 Apr 2025", status: "Pending" },
    { id: 7, txn: "TXN-1007", payer: "Ezra Belcher", method: "Cash", amount: "$140", date: "29 Mar 2025", status: "Success" },
    { id: 8, txn: "TXN-1008", payer: "Glen Lentz", method: "UPI", amount: "$50", date: "21 Mar 2025", status: "Failed" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    let data = payments.filter(
      (p) =>
        p.txn.toLowerCase().includes(search.toLowerCase()) ||
        p.payer.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      data = data.filter((p) => p.status === statusFilter);
    }

    return data;
  }, [payments, search, statusFilter]);

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
    if (status === "Success") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <div className="container my-4 px-4">

      {/* ================= HEADER ================= */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Payment History</h5>
        </div>

        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Record Payment
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
                  placeholder="Search transaction or payer..."
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
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
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
              <th>Transaction</th>
              <th>Payer</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((pay) => (
                <tr key={pay.id}>
                  <td className="fw-medium">{pay.txn}</td>
                  <td>{pay.payer}</td>
                  <td>{pay.method}</td>
                  <td>{pay.amount}</td>
                  <td className="text-muted small">{pay.date}</td>

                  <td>
                    <Badge bg={statusColor(pay.status)}>
                      {pay.status}
                    </Badge>
                  </td>

                  <td className="text-end">
                    <Dropdown align="end">
                      <Dropdown.Toggle as="button" className="saas-dot-btn">
                        <FiMoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View Receipt</Dropdown.Item>
                        <Dropdown.Item>Download</Dropdown.Item>
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
                <td colSpan="7" className="text-center text-muted py-4">
                  No transactions found
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
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} transactions
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

export default PaymentHistory;