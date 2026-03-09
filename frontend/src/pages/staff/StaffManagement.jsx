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
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
} from "react-icons/fi";

const StaffManagement = () => {
  const [staff] = useState([
    {
      id: 1,
      name: "James Adair",
      designation: "Admin Officer",
      role: "Admin",
      phone: "+1 41245 54132",
      email: "james@gmail.com",
      status: "Available",
    },
    {
      id: 2,
      name: "Adam Milne",
      designation: "Front Officer",
      role: "Reception",
      phone: "+1 54554 54789",
      email: "adam@gmail.com",
      status: "Available",
    },
    {
      id: 3,
      name: "Richard Clark",
      designation: "Medical Recorder",
      role: "Admin",
      phone: "+1 43554 54985",
      email: "richard@gmail.com",
      status: "Unavailable",
    },
    {
      id: 4,
      name: "Robert Reid",
      designation: "Billing Executive",
      role: "Admin",
      phone: "+1 47554 54257",
      email: "robert@gmail.com",
      status: "Available",
    },
    {
      id: 5,
      name: "Dottie Jeny",
      designation: "Nurse",
      role: "Nurse",
      phone: "+1 54114 57526",
      email: "dottie@gmail.com",
      status: "Available",
    },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    let data = staff.filter((s) =>
      `${s.name} ${s.designation} ${s.role} ${s.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (roleFilter !== "All") {
      data = data.filter((s) => s.role === roleFilter);
    }

    if (statusFilter !== "All") {
      data = data.filter((s) => s.status === statusFilter);
    }

    return data;
  }, [staff, search, roleFilter, statusFilter]);

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
    setRoleFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  return (
    <div className="container my-4 px-4" style={{ minWidth: "100%" }}>

      {/* ================= HEADER ================= */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Staff Management</h5>
        <Button size="sm" className="button">
          <FiPlus className="me-1" /> Add Staff
        </Button>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className="box_shadow p-3 bg-white table-responsive">

        {/* FILTER SECTION */}
        <div className="mb-4">
          <Row className="g-3 align-items-center">

            <Col lg={4} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search name, role, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Reception">Reception</option>
                <option value="Nurse">Nurse</option>
              </Form.Select>
            </Col>

            <Col lg={3} md={6}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
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
              <th>Staff</th>
              <th>Designation</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((s) => (
                <tr key={s.id}>
                  <td className="fw-medium">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/32?img=${s.id}`}
                        alt={s.name}
                        className="rounded-circle"
                      />
                      {s.name}
                    </div>
                  </td>
                  <td>{s.designation}</td>
                  <td>{s.role}</td>
                  <td>{s.phone}</td>
                  <td>{s.email}</td>
                  <td>
                    <Badge bg={s.status === "Available" ? "success" : "danger"}>
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No staff found
                </td>
              </tr>
            )}
          </tbody>

          {/* ================= PAGINATION ================= */}
          {totalPages > 0 && (
            <tfoot>
              <tr>
                <td colSpan="7">
                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">

                    <small className="text-muted">
                      Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length} staff
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

export default StaffManagement;