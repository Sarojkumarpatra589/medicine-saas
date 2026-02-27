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

function SmsTemplate() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "OTP Template",
      date: "10 May 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Reminder SMS",
      date: "02 May 2025",
      status: "Inactive",
    },
  ]);

  // Toggle Status
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

  // Delete Template
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
            <h5 className="fw-bold">SMS Template Table</h5>
  
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
                    <th>Name</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {templates.map((t) => (
                    <tr key={t.id}>
                      <td className="fw-medium">{t.name}</td>

                      <td>{t.date}</td>

                      <td>
                        <Badge
                          pill
                          bg={
                            t.status === "Active"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {t.status}
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
                                toggleStatus(t.id)
                              }
                            >
                              {t.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item
                              className="text-danger"
                              onClick={() =>
                                deleteTemplate(t.id)
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

export default SmsTemplate;