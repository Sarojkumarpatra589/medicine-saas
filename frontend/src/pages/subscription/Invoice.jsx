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
} from "react-bootstrap";
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./style.css";

const invoiceData = [
  { id: "#INV0025", patient: "James Adair", created: "2025-04-30", due: "2025-04-30", amount: 800, status: "Paid" },
  { id: "#INV0024", patient: "Emily Johnson", created: "2025-04-15", due: "2025-04-15", amount: 930, status: "Partially Paid" },
  { id: "#INV0023", patient: "Robert Mitchell", created: "2025-04-02", due: "2025-04-02", amount: 850, status: "Unpaid" },
  { id: "#INV0022", patient: "Sophia Miller", created: "2025-03-27", due: "2025-03-27", amount: 700, status: "Paid" },
  { id: "#INV0021", patient: "Daniel Anderson", created: "2025-03-12", due: "2025-03-12", amount: 650, status: "Partially Paid" },
  { id: "#INV0020", patient: "Olivia Davis", created: "2025-03-05", due: "2025-03-05", amount: 430, status: "Unpaid" },
];

const Invoice = () => {
  const [filter, setFilter] = useState({
    search: "",
    status: [],
    fromDate: "",
    toDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtering Logic
  const filteredInvoices = useMemo(() => {
    return invoiceData.filter((inv) => {
      const matchesSearch =
        inv.id.toLowerCase().includes(filter.search.toLowerCase()) ||
        inv.patient.toLowerCase().includes(filter.search.toLowerCase());

      const matchesStatus =
        !filter.status.length || filter.status.includes(inv.status);

      const matchesFromDate =
        !filter.fromDate || inv.created >= filter.fromDate;

      const matchesToDate =
        !filter.toDate || inv.created <= filter.toDate;

      return matchesSearch && matchesStatus && matchesFromDate && matchesToDate;
    });
  }, [filter]);

  const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage);

  const paginated = filteredInvoices.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const resetFilters = () => {
    setFilter({ search: "", status: [], fromDate: "", toDate: "" });
    setCurrentPage(1);
  };

  const statusColor = (status) => {
    if (status === "Paid") return "success";
    if (status === "Partially Paid") return "warning";
    return "danger";
  };

  const startItem =
    filteredInvoices.length === 0
      ? 0
      : (currentPage - 1) * rowsPerPage + 1;

  const endItem = Math.min(
    currentPage * rowsPerPage,
    filteredInvoices.length
  );

  return (
    <div className="container my-4 px-4">

      {/* Header */}
      <div className="box_shadow mb-3 p-3 bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold mb-0">Invoices</h5>
          </div>

          <Button size="sm" className="button d-flex align-items-center gap-1">
            <FiPlus size={14} /> New Invoice
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="box_shadow p-3 bg-white">

        {/* Filters Inside Table */}
        <Row className="g-2 mb-3 align-items-end">

          <Col md={3}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-white">
                <FiSearch size={14} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search invoice or patient..."
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
              />
            </InputGroup>
          </Col>

          <Col md={2}>
            <Form.Select
              size="sm"
              value=""
              onChange={(e) => {
                const val = e.target.value;
                setFilter({
                  ...filter,
                  status: val ? [val] : [],
                });
              }}
            >
              <option value="">All Status</option>
              <option>Paid</option>
              <option>Partially Paid</option>
              <option>Unpaid</option>
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Control
              size="sm"
              type="date"
              value={filter.fromDate}
              onChange={(e) =>
                setFilter({ ...filter, fromDate: e.target.value })
              }
            />
          </Col>

          <Col md={2}>
            <Form.Control
              size="sm"
              type="date"
              value={filter.toDate}
              onChange={(e) =>
                setFilter({ ...filter, toDate: e.target.value })
              }
            />
          </Col>

          

          <Col md={3} className="d-flex gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </Col>
        </Row>

        <hr/>

        {/* Table */}
        <div className="saas-table-wrapper">
          <Table hover responsive className="align-middle saas-table mb-0">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient</th>
                <th>Created</th>
                <th>Due</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-end" style={{ width: "60px" }}></th>
              </tr>
            </thead>

            <tbody>
              {paginated.length > 0 ? (
                paginated.map((inv) => (
                  <tr key={inv.id}>
                    <td className="fw-medium">{inv.id}</td>
                    <td>{inv.patient}</td>
                    <td>{inv.created}</td>
                    <td>{inv.due}</td>
                    <td>${inv.amount}</td>
                    <td>
                      <Badge pill bg={statusColor(inv.status)}>
                        {inv.status}
                      </Badge>
                    </td>

                    <td className="text-end">
                      <Dropdown align="end">
                        <Dropdown.Toggle as="button" className="saas-dot-btn">
                          <FiMoreVertical size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to="/subscription/invoice/view"
                          >
                            View
                          </Dropdown.Item>
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
          </Table>
        </div>

        {/* Advanced Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top flex-wrap gap-2">

          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">
              Showing {startItem}–{endItem} of {filteredInvoices.length} invoices
            </small>

            <Form.Select
              size="sm"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: "80px" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </Form.Select>
          </div>

          <div className="d-flex gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
            >
              <FiChevronLeft />
            </Button>

            <small className="align-self-center">
              Page {currentPage} of {totalPages || 1}
            </small>

            <Button
              size="sm"
              variant="outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
            >
              <FiChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;