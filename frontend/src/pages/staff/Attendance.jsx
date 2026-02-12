import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  InputGroup,
  Button,
  Stack,
  ProgressBar,
  Table,
  Dropdown,
} from "react-bootstrap";
import {
  FiSearch,
  FiClock,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiDownload,
  FiRefreshCw,
  FiMoreVertical,
  FiActivity,
  FiEye,
  FiEdit,
} from "react-icons/fi";

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const employees = [
    { 
      id: 1, 
      name: "Dr. Sarah Johnson", 
      dept: "Cardiology", 
      role: "Senior Physician", 
      status: "present", 
      in: "08:40", 
      out: "17:20", 
      avatar: "SJ",
      hours: "8.5",
      performance: 95
    },
    { 
      id: 2, 
      name: "Emily Davis", 
      dept: "Emergency", 
      role: "ER Nurse", 
      status: "late", 
      in: "09:15", 
      out: "18:05", 
      avatar: "ED",
      hours: "8.8",
      performance: 88
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      dept: "Administration", 
      role: "Admin Manager", 
      status: "absent", 
      in: "-", 
      out: "-", 
      avatar: "MB",
      hours: "0",
      performance: 75
    },
    { 
      id: 4, 
      name: "Lisa Anderson", 
      dept: "Laboratory", 
      role: "Lab Technician", 
      status: "present", 
      in: "08:50", 
      out: "17:30", 
      avatar: "LA",
      hours: "8.6",
      performance: 92
    },
    { 
      id: 5, 
      name: "James Wilson", 
      dept: "Radiology", 
      role: "Radiologist", 
      status: "present", 
      in: "08:35", 
      out: "17:15", 
      avatar: "JW",
      hours: "8.6",
      performance: 90
    },
    { 
      id: 6, 
      name: "Maria Garcia", 
      dept: "Pediatrics", 
      role: "Pediatrician", 
      status: "present", 
      in: "08:45", 
      out: "17:25", 
      avatar: "MG",
      hours: "8.6",
      performance: 94
    },
    { 
      id: 7, 
      name: "Robert Taylor", 
      dept: "Surgery", 
      role: "Chief Surgeon", 
      status: "late", 
      in: "09:20", 
      out: "-", 
      avatar: "RT",
      hours: "7.8",
      performance: 85
    },
    { 
      id: 8, 
      name: "Jennifer Lee", 
      dept: "Pharmacy", 
      role: "Pharmacist", 
      status: "present", 
      in: "08:55", 
      out: "17:35", 
      avatar: "JL",
      hours: "8.6",
      performance: 91
    },
  ];

  const stats = {
    total: employees.length,
    present: employees.filter(e => e.status === "present").length,
    late: employees.filter(e => e.status === "late").length,
    absent: employees.filter(e => e.status === "absent").length,
  };

  const filtered = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                         e.dept.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || e.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const configs = {
      present: { variant: "success", icon: <FiCheck />, label: "Present" },
      late: { variant: "warning", icon: <FiAlertCircle />, label: "Late" },
      absent: { variant: "danger", icon: <FiX />, label: "Absent" }
    };
    return configs[status];
  };

  const attendanceRate = ((stats.present / stats.total) * 100).toFixed(1);

  const avatarColors = ["primary", "success", "danger", "warning", "info", "dark", "secondary"];

  return (
    <Container fluid className="p-3 p-md-4 bg-light min-vh-100">
      
      {/* HEADER SECTION */}
      <Card bg="primary" text="white" className="mb-3 mb-md-4 border-0 shadow">
        <Card.Body className="p-3 p-md-4">
          <Row className="align-items-center g-3">
            <Col lg={8}>
              <div className="d-flex align-items-center gap-2 gap-md-3 mb-2 mb-md-3">
                <div className="bg-white bg-opacity-25 p-2 p-md-3 rounded-circle">
                  <FiActivity size={window.innerWidth < 768 ? 24 : 32} />
                </div>
                <div>
                  <h1 className="h3 h-md-2 fw-bold mb-1">Attendance Dashboard</h1>
                  <p className="mb-0 opacity-75 small">
                    <FiCalendar className="me-1 me-md-2" />
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: window.innerWidth < 768 ? 'short' : 'long', 
                      year: 'numeric', 
                      month: window.innerWidth < 768 ? 'short' : 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Stack direction="horizontal" gap={2} className="justify-content-lg-end flex-wrap">
                <Button variant="light" size="sm" className="d-flex align-items-center gap-1">
                  <FiRefreshCw size={14} /> 
                  <span className="d-none d-sm-inline">Refresh</span>
                </Button>
                <Button variant="success" size="sm" className="d-flex align-items-center gap-1">
                  <FiDownload size={14} /> 
                  <span className="d-none d-sm-inline">Export</span>
                </Button>
              </Stack>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* STATISTICS CARDS */}
      <Row className="g-2 g-md-3 mb-3 mb-md-4">
        <Col xs={6} lg={3}>
          <Card className="border-0 shadow-sm h-100 border-start border-4 border-primary">
            <Card.Body className="p-2 p-md-3">
              <Stack direction="horizontal" className="justify-content-between mb-2">
                <div>
                  <Card.Subtitle className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.65rem' }}>
                    Total
                  </Card.Subtitle>
                  <Card.Title className="h2 h-md-1 fw-bold mb-0">{stats.total}</Card.Title>
                </div>
                <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                  <FiUsers size={window.innerWidth < 768 ? 20 : 24} className="text-primary" />
                </div>
              </Stack>
              <ProgressBar variant="primary" now={100} className="d-none d-md-block" style={{ height: 6 }} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} lg={3}>
          <Card className="border-0 shadow-sm h-100 border-start border-4 border-success">
            <Card.Body className="p-2 p-md-3">
              <Stack direction="horizontal" className="justify-content-between mb-2">
                <div>
                  <Card.Subtitle className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.65rem' }}>
                    Present
                  </Card.Subtitle>
                  <Card.Title className="h2 h-md-1 fw-bold mb-0 text-success">{stats.present}</Card.Title>
                </div>
                <div className="bg-success bg-opacity-10 p-2 rounded-circle">
                  <FiCheck size={window.innerWidth < 768 ? 20 : 24} className="text-success" />
                </div>
              </Stack>
              <ProgressBar variant="success" now={attendanceRate} className="d-none d-md-block" style={{ height: 6 }} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} lg={3}>
          <Card className="border-0 shadow-sm h-100 border-start border-4 border-warning">
            <Card.Body className="p-2 p-md-3">
              <Stack direction="horizontal" className="justify-content-between mb-2">
                <div>
                  <Card.Subtitle className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.65rem' }}>
                    Late
                  </Card.Subtitle>
                  <Card.Title className="h2 h-md-1 fw-bold mb-0 text-warning">{stats.late}</Card.Title>
                </div>
                <div className="bg-warning bg-opacity-10 p-2 rounded-circle">
                  <FiAlertCircle size={window.innerWidth < 768 ? 20 : 24} className="text-warning" />
                </div>
              </Stack>
              <ProgressBar variant="warning" now={(stats.late / stats.total) * 100} className="d-none d-md-block" style={{ height: 6 }} />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6} lg={3}>
          <Card className="border-0 shadow-sm h-100 border-start border-4 border-danger">
            <Card.Body className="p-2 p-md-3">
              <Stack direction="horizontal" className="justify-content-between mb-2">
                <div>
                  <Card.Subtitle className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.65rem' }}>
                    Absent
                  </Card.Subtitle>
                  <Card.Title className="h2 h-md-1 fw-bold mb-0 text-danger">{stats.absent}</Card.Title>
                </div>
                <div className="bg-danger bg-opacity-10 p-2 rounded-circle">
                  <FiX size={window.innerWidth < 768 ? 20 : 24} className="text-danger" />
                </div>
              </Stack>
              <ProgressBar variant="danger" now={(stats.absent / stats.total) * 100} className="d-none d-md-block" style={{ height: 6 }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SEARCH AND FILTERS */}
      <Card className="mb-3 mb-md-4 border-0 shadow-sm">
        <Card.Body className="p-2 p-md-3">
          <Row className="g-2 g-md-3 align-items-center">
            <Col md={4}>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white">
                  <FiSearch size={16} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search employee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white">
                  <FiCalendar size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={5}>
              <Stack direction="horizontal" gap={1} className="flex-wrap">
                {["all", "present", "late", "absent"].map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className="text-capitalize flex-fill flex-md-grow-0"
                  >
                    {status === "all" ? "All" : status}
                  </Button>
                ))}
              </Stack>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* TABLE SECTION */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <Stack direction="horizontal" className="justify-content-between">
            <div className="fw-bold">
              <FiUsers className="me-2" />
              Employee Records
            </div>
            <Badge bg="primary" pill>{filtered.length}</Badge>
          </Stack>
        </Card.Header>
        
        <div className="table-responsive">
          <Table hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="fw-semibold small">Employee</th>
                <th className="fw-semibold small d-none d-md-table-cell">Department</th>
                <th className="fw-semibold small d-none d-lg-table-cell">Check In</th>
                <th className="fw-semibold small d-none d-lg-table-cell">Check Out</th>
                <th className="fw-semibold small d-none d-xl-table-cell">Hours</th>
                <th className="fw-semibold small">Status</th>
                <th className="fw-semibold small text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => {
                const statusConfig = getStatusBadge(emp.status);
                const colorVariant = avatarColors[i % avatarColors.length];
                
                return (
                  <tr key={emp.id}>
                    <td>
                      <Stack direction="horizontal" gap={2}>
                        <div 
                          className={`bg-${colorVariant} text-white rounded d-flex align-items-center justify-content-center fw-bold flex-shrink-0`}
                          style={{ width: 36, height: 36, fontSize: '0.75rem' }}
                        >
                          {emp.avatar}
                        </div>
                        <div className="text-truncate">
                          <div className="fw-semibold text-truncate" style={{ fontSize: '0.9rem' }}>
                            {emp.name}
                          </div>
                          <small className="text-muted d-block d-md-none">{emp.dept}</small>
                          <small className="text-muted d-none d-md-block">{emp.role}</small>
                        </div>
                      </Stack>
                    </td>
                    <td className="align-middle d-none d-md-table-cell">
                      <Badge bg="light" text="dark" className="text-nowrap">
                        {emp.dept}
                      </Badge>
                    </td>
                    <td className="align-middle d-none d-lg-table-cell">
                      <small className="text-nowrap">
                        <FiClock size={12} className="me-1 text-muted" />
                        {emp.in}
                      </small>
                    </td>
                    <td className="align-middle d-none d-lg-table-cell">
                      <small className="text-nowrap">
                        <FiClock size={12} className="me-1 text-muted" />
                        {emp.out}
                      </small>
                    </td>
                    <td className="align-middle d-none d-xl-table-cell">
                      <Badge bg="info" className="text-nowrap">{emp.hours}h</Badge>
                    </td>
                    <td className="align-middle">
                      <Badge bg={statusConfig.variant} className="d-none d-sm-inline-flex align-items-center gap-1">
                        {statusConfig.icon}
                        <span className="d-none d-md-inline">{statusConfig.label}</span>
                      </Badge>
                      <div className={`d-sm-none bg-${statusConfig.variant} rounded-circle`} 
                           style={{ width: 10, height: 10, display: 'inline-block' }}>
                      </div>
                    </td>
                    <td className="align-middle text-end">
                      <Dropdown align="end">
                        <Dropdown.Toggle 
                          variant="outline-secondary" 
                          size="sm" 
                          className="border-0"
                        >
                          <FiMoreVertical size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <FiEye className="me-2" size={14} />
                            View Details
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <FiEdit className="me-2" size={14} />
                            Edit Record
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="d-lg-none">
                            <FiClock className="me-2" size={14} />
                            {emp.in} - {emp.out}
                          </Dropdown.Item>
                          <Dropdown.Item className="d-xl-none">
                            Hours: {emp.hours}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <Card.Body className="text-center py-5">
            <FiUsers size={48} className="text-muted mb-3" />
            <h5 className="text-muted">No employees found</h5>
            <p className="text-muted mb-0 small">Try adjusting your search or filter criteria</p>
          </Card.Body>
        )}

        <Card.Footer className="bg-light border-top">
          <Stack direction="horizontal" className="justify-content-between flex-wrap gap-2">
            <small className="text-muted">
              Showing <strong>{filtered.length}</strong> of <strong>{employees.length}</strong> employees
            </small>
            <div className="d-none d-md-block">
              <small className="text-muted me-3">
                <FiTrendingUp className="me-1" />
                Attendance Rate: <strong className="text-success">{attendanceRate}%</strong>
              </small>
              <Badge bg="success" className="me-1">{stats.present} Present</Badge>
              <Badge bg="warning" className="me-1">{stats.late} Late</Badge>
              <Badge bg="danger">{stats.absent} Absent</Badge>
            </div>
          </Stack>
        </Card.Footer>
      </Card>

    </Container>
  );
};

export default Attendance;