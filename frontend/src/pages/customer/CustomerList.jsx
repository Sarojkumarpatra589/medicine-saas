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

const CustomerList = () => {
  const [customers] = useState([
    { id: 1, name: "Alberto Ripley", ageGender: "26, Male", phone: "+1 41245 54132", assignedTo: "Dr. Mick Thompson", department: "Cardiologist", address: "Miami, Florida", lastVisit: "30 Apr 2025", status: "Available" },
    { id: 2, name: "Susan Babin", ageGender: "21, Female", phone: "+1 54554 54789", assignedTo: "Dr. Sarah Johnson", department: "Orthopedic Surgeon", address: "Austin, Texas", lastVisit: "15 Apr 2025", status: "Unavailable" },
    { id: 3, name: "Carol Lam", ageGender: "28, Female", phone: "+1 43554 54985", assignedTo: "Dr. Emily Carter", department: "Pediatrician", address: "Seattle, Washington", lastVisit: "02 Apr 2025", status: "Available" },
    { id: 4, name: "Marsha Noland", ageGender: "25, Female", phone: "+1 47554 54257", assignedTo: "Dr. David Lee", department: "Gynecologist", address: "Chicago, Illinois", lastVisit: "27 Mar 2025", status: "Unavailable" },
    { id: 5, name: "Irma Armstrong", ageGender: "32, Female", phone: "+1 54114 57526", assignedTo: "Dr. Anna Kim", department: "Psychiatrist", address: "Phoenix, Arizona", lastVisit: "12 Mar 2025", status: "Available" },
  ]);

  /* ================= FILTER STATES ================= */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [visitFilter, setVisitFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    let data = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );

    if (statusFilter !== "All") {
      data = data.filter((c) => c.status === statusFilter);
    }

    if (departmentFilter !== "All") {
      data = data.filter((c) => c.department === departmentFilter);
    }

    if (visitFilter === "Last30Days") {
      data = data.slice(0, 3); // demo filter
    }

    return data;
  }, [customers, search, statusFilter, departmentFilter, visitFilter]);

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
    setDepartmentFilter("All");
    setVisitFilter("All");
    setCurrentPage(1);
  };

  const statusColor = (status) =>
    status === "Available" ? "success" : "danger";

  return (
    <div className="container my-4 px-4">

      {/* ================= HEADER ================= */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Customer List</h5>
        </div>

        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Add Customer
        </Button>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="box_shadow p-3 bg-white table-responsive">

        {/* FILTER SECTION */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">

            <Col lg={3} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search name or phone..."
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
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </Form.Select>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={6}>
              <Form.Select
                value={visitFilter}
                onChange={(e) => setVisitFilter(e.target.value)}
              >
                <option value="All">All Visits</option>
                <option value="Last30Days">Last 30 Days</option>
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
              <th>Customer</th>
              <th>Phone</th>
              <th>Doctor</th>
              <th>Address</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="fw-medium">{customer.name}</div>
                    <small className="text-muted">
                      {customer.ageGender}
                    </small>
                  </td>

                  <td>{customer.phone}</td>

                  <td>
                    <div className="fw-medium">
                      {customer.assignedTo}
                    </div>
                    <small className="text-muted">
                      {customer.department}
                    </small>
                  </td>

                  <td>{customer.address}</td>
                  <td className="text-muted small">
                    {customer.lastVisit}
                  </td>

                  <td>
                    <Badge bg={statusColor(customer.status)}>
                      {customer.status}
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
                <td colSpan="7" className="text-center text-muted py-4">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>

          {/* ADVANCED PAGINATION */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="7">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">

                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} customers
                    </small>

                    <Stack direction="horizontal" gap={2}>

                      <Form.Select
                        size="sm"
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        style={{ width: "90px" }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                      </Form.Select>

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

export default CustomerList;