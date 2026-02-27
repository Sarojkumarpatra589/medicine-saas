import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Dropdown,
  Badge,
} from "react-bootstrap";

const CustomField = () => {
  const [customFields, setCustomFields] = useState([
    {
      id: 1,
      module: "Patient",
      label: "Preferred Language",
      type: "Select",
      defaultValue: "English",
      required: true,
      status: "Active",
    },
    {
      id: 2,
      module: "Staff",
      label: "Job Type",
      type: "Text",
      defaultValue: "Full Time",
      required: true,
      status: "Active",
    },
  ]);

  // Toggle required switch
  const toggleRequired = (id) => {
    setCustomFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, required: !field.required }
          : field
      )
    );
  };

  // Toggle status
  const toggleStatus = (id) => {
    setCustomFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              status:
                field.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : field
      )
    );
  };

  // Delete
  const deleteField = (id) => {
    setCustomFields((prev) =>
      prev.filter((field) => field.id !== id)
    );
  };

  return (
    <Container fluid>
      <div className="saas-card">
        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">Custom Field Table</h5>

          <Button className="button">
            + New Custom Field
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
                    <th>Module</th>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Default Value</th>
                    <th>Required</th>
                    <th>Status</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {customFields.map((field) => (
                    <tr key={field.id}>
                      <td className="fw-medium">
                        {field.module}
                      </td>

                      <td>{field.label}</td>

                      <td>{field.type}</td>

                      <td>{field.defaultValue}</td>

                      {/* Required Switch */}
                      <td>
                        <Form.Check
                          type="switch"
                          checked={field.required}
                          onChange={() =>
                            toggleRequired(field.id)
                          }
                        />
                      </td>

                      {/* Status */}
                      <td>
                        <Badge
                          pill
                          bg={
                            field.status === "Active"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {field.status}
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
                            <Dropdown.Item
                              onClick={() =>
                                toggleStatus(field.id)
                              }
                            >
                              {field.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item
                              className="text-danger"
                              onClick={() =>
                                deleteField(field.id)
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
};

export default CustomField;