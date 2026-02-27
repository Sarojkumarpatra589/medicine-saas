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

const SalesReturn = () => {
  const [returns] = useState([
    { id: 1, returnNo: "RET-1001", orderNo: "ORD-1001", customer: "Alberto Ripley", product: "BP Monitor", qty: 1, amount: "$75", date: "05 May 2025", status: "Approved" },
    { id: 2, returnNo: "RET-1002", orderNo: "ORD-1004", customer: "Susan Babin", product: "Thermometer", qty: 2, amount: "$50", date: "03 May 2025", status: "Pending" },
    { id: 3, returnNo: "RET-1003", orderNo: "ORD-1006", customer: "Carol Lam", product: "Glucose Meter", qty: 1, amount: "$60", date: "01 May 2025", status: "Rejected" },
    { id: 4, returnNo: "RET-1004", orderNo: "ORD-1007", customer: "Marsha Noland", product: "Wheelchair", qty: 1, amount: "$210", date: "30 Apr 2025", status: "Approved" },
    { id: 5, returnNo: "RET-1005", orderNo: "ORD-1010", customer: "Irma Armstrong", product: "First Aid Kit", qty: 1, amount: "$30", date: "28 Apr 2025", status: "Pending" },
    { id: 6, returnNo: "RET-1006", orderNo: "ORD-1012", customer: "Jesus Adams", product: "Oxygen Mask", qty: 3, amount: "$105", date: "26 Apr 2025", status: "Approved" },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    let data = returns.filter(
      (r) =>
        r.returnNo.toLowerCase().includes(search.toLowerCase()) ||
        r.customer.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      data = data.filter((r) => r.status === statusFilter);
    }

    return data;
  }, [returns, search, statusFilter]);

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
    if (status === "Approved") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <div className="container my-4 px-4">

      {/* ================= HEADER ================= */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Sales Return</h5>
        </div>

        <Button size="sm" className="button">
          <FiPlus className="me-1" /> New Return
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
                  placeholder="Search return or customer..."
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
                <option value="All">Quantity</option>
                <option value="Approved">100</option>
                <option value="Pending">200</option>
                <option value="Rejected">300</option>
              </Form.Select>
            </Col>
            <Col lg={2} md={6}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Col>

            <Col lg={4} md={12}>
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
              <th>Return No</th>
              <th>Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((ret) => (
                <tr key={ret.id}>
                  <td className="fw-medium">{ret.returnNo}</td>
                  <td>{ret.orderNo}</td>
                  <td>{ret.customer}</td>
                  <td>{ret.product}</td>
                  <td>{ret.qty}</td>
                  <td>{ret.amount}</td>
                  <td className="text-muted small">{ret.date}</td>

                  <td>
                    <Badge bg={statusColor(ret.status)}>
                      {ret.status}
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
                <td colSpan="9" className="text-center text-muted py-4">
                  No returns found
                </td>
              </tr>
            )}
          </tbody>

          {/* ================= ADVANCED PAGINATION ================= */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="9">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">

                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} returns
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

export default SalesReturn;