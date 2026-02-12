import React, { useState, useMemo } from "react";
import {
  Table,
  Dropdown,
  Badge,
  InputGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import {
  FiSearch,
  FiPlus,
  FiChevronDown,
  FiMoreVertical,
  FiEye,
  FiEdit,
  FiTrash,
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

  const filteredStaff = useMemo(() => {
    return staff.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [staff, search]);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">Staff</h5>
          <Badge bg="primary" className="rounded-pill">
            Total Staffs : {staff.length}
          </Badge>
        </div>

        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="outline-secondary">
              Export <FiChevronDown />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Export PDF</Dropdown.Item>
              <Dropdown.Item>Export Excel</Dropdown.Item>
              <Dropdown.Item>Export CSV</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button size="sm" variant="primary">
            <FiPlus /> Add Staff
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3" style={{ maxWidth: "260px" }}>
        <InputGroup size="sm">
          <InputGroup.Text className="bg-white border-end-0">
            <FiSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search"
            className="border-start-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Table */}
      <Card className="shadow-sm border">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>Staff</th>
              <th>Designation</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredStaff.map((s) => (
              <tr key={s.id}>
                {/* Staff Info */}
                <td className="align-middle">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={`https://i.pravatar.cc/32?img=${s.id}`}
                      alt={s.name}
                      className="rounded-circle"
                    />
                    <span className="fw-semibold">{s.name}</span>
                  </div>
                </td>

                <td className="align-middle text-muted">
                  {s.designation}
                </td>

                <td className="align-middle text-muted">{s.role}</td>

                <td className="align-middle text-muted">{s.phone}</td>

                <td className="align-middle text-muted">{s.email}</td>

                <td className="align-middle">
                  <Badge
                    bg={s.status === "Available" ? "success" : "danger"}
                    className="rounded-pill"
                  >
                    {s.status}
                  </Badge>
                </td>

                {/* 3 Dot Menu */}
                <td className="align-middle text-end">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      size="sm"
                      className="border-0 shadow-none"
                    >
                      <FiMoreVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <FiEye className="me-2" />
                        View
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <FiEdit className="me-2" />
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Divider />

                      <Dropdown.Item className="text-danger">
                        <FiTrash className="me-2" />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default StaffManagement;
