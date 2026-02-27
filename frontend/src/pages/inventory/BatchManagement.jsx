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
import { FiSearch, FiDownload, FiMoreVertical } from "react-icons/fi";
import "./style.css";

const BatchStockReport = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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

  /* Flatten all batches into one list */
  const allBatches = data.flatMap((product) =>
    product.batches.map((b) => ({
      ...b,
      product: product.product,
      total: product.total,
    }))
  );

  /* Filtering */
  const filtered = useMemo(() => {
    let result = allBatches.filter((b) =>
      `${b.product} ${b.no}`.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      result = result.filter((b) => b.status === statusFilter);
    }

    if (stockFilter !== "All") {
      result = result.filter((b) => {
        if (stockFilter === "Low") return b.stock < 20;
        if (stockFilter === "Medium") return b.stock >= 20 && b.stock <= 50;
        if (stockFilter === "High") return b.stock > 50;
        return true;
      });
    }

    return result;
  }, [search, statusFilter, stockFilter, allBatches]);

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

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All");
    setStockFilter("All");
    setCurrentPage(1);
  };

  return (
    <div className="container my-4 px-4">

      {/* HEADER */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Batch Stock Report</h5>
        <div className="d-flex gap-2">
          <Button className="btn-success">
            <FiDownload className="me-1" /> Excel
          </Button>
          <Button className="btn-danger">
            <FiDownload className="me-1" /> PDF
          </Button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="box_shadow p-3 bg-white table-responsive">

        {/* FILTERS INSIDE TABLE */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">
            <Col lg={4} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search product, batch..."
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
                <option value="Valid">Valid</option>
                <option value="Near Expiry">Near Expiry</option>
              </Form.Select>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="All">All Stock</option>
                <option value="Low">Low (&lt;20)</option>
                <option value="Medium">20-50</option>
                <option value="High">High (&gt;50)</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={6}>
              <div className="d-flex gap-2">
                <Button className="button flex-fill" onClick={() => setCurrentPage(1)}>
                  Search
                </Button>
                <Button
                  variant="outline-secondary"
                  className="flex-fill"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <hr />

        {/* TABLE */}
        <Table hover className="align-middle saas-table mb-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Batch No</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Stock</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((b, i) => (
              <tr key={i}>
                <td className="fw-semibold">{b.product}</td>
                <td>{b.no}</td>
                <td className="text-muted small">{b.expiry}</td>
                <td>
                  <Badge
                    pill
                    bg={b.status === "Valid" ? "success" : "warning"}
                    text={b.status === "Near Expiry" ? "dark" : ""}
                  >
                    {b.status}
                  </Badge>
                </td>
                <td>{b.stock}</td>
                <td className="text-end">
                  <Dropdown align="end">
                    <Dropdown.Toggle as="button" className="saas-dot-btn">
                      <FiMoreVertical size={16} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
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
                <td colSpan="6" className="text-center py-4 text-muted">
                  No batches found
                </td>
              </tr>
            )}
          </tbody>

          {/* PAGINATION */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="6">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} batches
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

export default BatchStockReport;