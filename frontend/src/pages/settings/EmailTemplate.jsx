import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Badge,
  Dropdown,
} from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

function EmailTemplate() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Appointment Confirmation",
      date: "30 Apr 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Invoice Email",
      date: "15 Apr 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Reminder Email",
      date: "02 Apr 2025",
      status: "Inactive",
    },
  ]);

  // Toggle status
  const toggleStatus = (id) => {
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );
  };

  // Delete template
  const deleteTemplate = (id) => {
    setTemplates((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <Container fluid>
      <div className="saas-card">
        {/* Header */}
         <div className="saas-card-header d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold">Email Template Table</h5>
        
                  <Button className="button">
                    + New Template
                  </Button>
                </div>
                <hr/>

        {/* Table */}
        <div className="saas-table-wrapper">
          <Row>
            <Col>
              <Table
                hover
                responsive
                className="align-middle saas-table mb-0"
              >
                <thead>
                  <tr>
                    <th>Template Name</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {templates.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">
                        {item.name}
                      </td>

                      <td>{item.date}</td>

                      <td>
                        <Badge
                          pill
                          bg={
                            item.status === "Active"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>

                      {/* 3 Dot Menu */}
                      <td className="text-end">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            className="saas-dot-btn"
                          >
                            ⋮
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="saas-dropdown">
                            <Dropdown.Item>Edit</Dropdown.Item>

                            <Dropdown.Item
                              onClick={() =>
                                toggleStatus(item.id)
                              }
                            >
                              {item.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item
                              className="text-danger"
                              onClick={() =>
                                deleteTemplate(item.id)
                              }
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default EmailTemplate;