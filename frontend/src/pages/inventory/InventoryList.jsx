import React, { useState, useMemo } from "react";
import {
  Table,
  Badge,
  InputGroup,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  Stack,
} from "react-bootstrap";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
} from "react-icons/fi";
import "./style.css";

const SalesList = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const sales = [
    {
      order: "ORD-1001",
      customer: "Alberto Ripley",
      product: "Blood Test Kit",
      qty: 2,
      amount: 120,
      date: "2025-05-02",
      status: "Completed",
    },
    {
      order: "ORD-1002",
      customer: "Susan Babin",
      product: "Thermometer",
      qty: 1,
      amount: 25,
      date: "2025-04-28",
      status: "Pending",
    },
    {
      order: "ORD-1003",
      customer: "Carol Lam",
      product: "BP Monitor",
      qty: 1,
      amount: 75,
      date: "2025-04-20",
      status: "Completed",
    },
    {
      order: "ORD-1004",
      customer: "Marsha Noland",
      product: "Wheelchair",
      qty: 1,
      amount: 210,
      date: "2025-04-18",
      status: "Cancelled",
    },
  ];

  /* Sorting */
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  /* Filtering + Sorting */
  const filtered = useMemo(() => {
    let data = sales.filter((s) =>
      Object.values(s)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      data = data.filter((s) => s.status === statusFilter);
    }

    if (dateFilter === "Last7Days") {
      const today = new Date();
      data = data.filter((s) => {
        const saleDate = new Date(s.date);
        const diffDays = (today - saleDate) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      });
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [sales, search, statusFilter, dateFilter, sortConfig]);

  /* Pagination */
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setDateFilter("All");
    setCurrentPage(1);
  };

  const statusVariant = (status) => {
    if (status === "Completed") return "success";
    if (status === "Pending") return "warning";
    if (status === "Cancelled") return "danger";
    return "secondary";
  };

  return (
    <div className="container my-4 px-4">

      {/* Header */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Sales List</h5>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> New Sale
        </Button>
      </div>

      

      {/* Table */}
      <div className="box_shadow p-3 bg-white table-responsive">
        {/* Filter Section */}
      <div className="mb-4 ">
        <Row className="g-3 align-items-center">

          <Col lg={4} md={6}>
            <InputGroup>
              <InputGroup.Text><FiSearch /></InputGroup.Text>
              <Form.Control
                placeholder="Search order, customer..."
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
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
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
              <Button
                className="button flex-fill"
                onClick={() => setCurrentPage(1)}
              >
                Search
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

      <hr/>
        <Table hover className="align-middle saas-table mb-0 ">
          <thead>
            <tr>
              <th onClick={() => handleSort("order")} style={{ cursor: "pointer" }}>Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th onClick={() => handleSort("qty")} style={{ cursor: "pointer" }}>Qty</th>
              <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>Amount ($)</th>
              <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>Date</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((s, i) => (
              <tr key={i}>
                <td className="fw-semibold">{s.order}</td>
                <td>{s.customer}</td>
                <td>{s.product}</td>
                <td>{s.qty}</td>
                <td>${s.amount}</td>
                <td className="text-muted small">{s.date}</td>
                <td>
                  <Badge bg={statusVariant(s.status)}>
                    {s.status}
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
            ))}

            {currentData.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-muted">
                  No sales found
                </td>
              </tr>
            )}
          </tbody>

          {/* Advanced Pagination Inside Table */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="8">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">

                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} sales
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

export default SalesList;