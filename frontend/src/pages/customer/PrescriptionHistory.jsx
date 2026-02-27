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
  FiPlus,
  FiSearch,
  FiMoreVertical,
  FiChevronDown,
} from "react-icons/fi";

const PrescriptionList = () => {
  const [prescriptions] = useState([
    { id: 1, patient: "Alberto Ripley", details: "26, Male", phone: "+1 41245 54132", doctor: "Dr. Mick Thompson", department: "Cardiologist", medicine: "Atorvastatin 10mg", date: "30 Apr 2025", status: "Active" },
    { id: 2, patient: "Susan Babin", details: "21, Female", phone: "+1 54554 54789", doctor: "Dr. Sarah Johnson", department: "Orthopedic", medicine: "Ibuprofen 200mg", date: "15 Apr 2025", status: "Completed" },
    { id: 3, patient: "Carol Lam", details: "28, Female", phone: "+1 43554 54985", doctor: "Dr. Emily Carter", department: "Pediatrician", medicine: "Amoxicillin 500mg", date: "02 Apr 2025", status: "Active" },
    { id: 4, patient: "Marsha Noland", details: "25, Female", phone: "+1 47554 54257", doctor: "Dr. David Lee", department: "Gynecologist", medicine: "Folic Acid", date: "27 Mar 2025", status: "Completed" },
    { id: 5, patient: "Irma Armstrong", details: "32, Female", phone: "+1 54114 57526", doctor: "Dr. Anna Kim", department: "Psychiatrist", medicine: "Sertraline", date: "12 Mar 2025", status: "Active" },
  ]);

  /* ================= FILTER STATES ================= */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* ================= FILTER LOGIC ================= */
  const filtered = useMemo(() => {
    let data = prescriptions.filter(
      (p) =>
        p.patient.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search)
    );

    if (statusFilter !== "All") {
      data = data.filter((p) => p.status === statusFilter);
    }

    if (departmentFilter !== "All") {
      data = data.filter((p) => p.department === departmentFilter);
    }

    if (doctorFilter !== "All") {
      data = data.filter((p) => p.doctor === doctorFilter);
    }

    if (dateFilter === "Last30") {
      data = data.slice(0, 3); // demo filter
    }

    return data;
  }, [prescriptions, search, statusFilter, departmentFilter, doctorFilter, dateFilter]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setDoctorFilter("All");
    setDateFilter("All");
    setCurrentPage(1);
  };

  return (
    <div className="container my-4 px-4">

      {/* ================= HEADER ================= */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold mb-0">Prescription List</h5>
        </div>

        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="outline-secondary">
              Export <FiChevronDown size={14} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Export PDF</Dropdown.Item>
              <Dropdown.Item>Export Excel</Dropdown.Item>
              <Dropdown.Item>Export CSV</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button size="sm" className="button">
            <FiPlus className="me-1" /> New Prescription
          </Button>
        </div>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="box_shadow p-3 bg-white table-responsive">

        {/* FILTER SECTION */}
        <div className="mb-4">
          <Row className="g-3">

            <Col lg={3} md={6}>
              <InputGroup>
                <InputGroup.Text><FiSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Search patient or phone..."
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
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={6}>
              <Form.Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={6}>
              <Form.Select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
              >
                <option value="All">All Doctors</option>
                <option value="Dr. Mick Thompson">Dr. Mick Thompson</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. Emily Carter">Dr. Emily Carter</option>
                <option value="Dr. David Lee">Dr. David Lee</option>
                <option value="Dr. Anna Kim">Dr. Anna Kim</option>
              </Form.Select>
            </Col>

            <Col lg={1} md={6}>
              <Form.Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Last30">Last 30</option>
              </Form.Select>
            </Col>

            <Col lg={2} md={12}>
              <div className="d-flex gap-2">
                <Button className="button flex-fill" onClick={() => setCurrentPage(1)}>
                 Filter
                </Button>
                <Button variant="outline-secondary" onClick={handleReset}>
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
              <th>Patient</th>
              <th>Phone</th>
              <th>Doctor</th>
              <th>Medicine</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="fw-medium">{p.patient}</div>
                    <small className="text-muted">{p.details}</small>
                  </td>
                  <td>{p.phone}</td>
                  <td>
                    <div className="fw-medium">{p.doctor}</div>
                    <small className="text-muted">{p.department}</small>
                  </td>
                  <td>{p.medicine}</td>
                  <td className="text-muted small">{p.date}</td>
                  <td>
                    <Badge bg={p.status === "Active" ? "success" : "secondary"}>
                      {p.status}
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
                  No prescriptions found
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
                      {Math.min(indexOfLast, filtered.length)} of {filtered.length}
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
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Prev
                      </Button>

                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          size="sm"
                          variant={currentPage === i + 1 ? "primary" : "outline-secondary"}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}

                      <Button
                        size="sm"
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

export default PrescriptionList;