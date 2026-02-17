import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";

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

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Custom Field</h5>

            <Button
              variant="primary"
              className="d-flex align-items-center gap-2"
            >
              + New Custom Field
            </Button>
          </div>
          <hr />
        </Col>
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <Table hover responsive className="align-middle border">
            <thead className="bg-light">
              <tr>
                <th className="py-3">Module</th>
                <th className="py-3">Label</th>
                <th className="py-3">Type</th>
                <th className="py-3">Default Value</th>
                <th className="py-3">Required</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end"></th>
              </tr>
            </thead>

            <tbody>
              {customFields.map((field) => (
                <tr key={field.id}>
                  <td>{field.module}</td>

                  <td>{field.label}</td>

                  <td>{field.type}</td>

                  <td>{field.defaultValue}</td>

                  {/* Required Switch */}
                  <td>
                    <Form.Check
                      type="switch"
                      checked={field.required}
                      onChange={() => {}}
                      className="custom-switch-lg"
                    />
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-pill small fw-medium ${
                        field.status === "Active"
                          ? "text-success bg-success-subtle"
                          : "text-danger bg-danger-subtle"
                      }`}
                    >
                      {field.status}
                    </span>
                  </td>

                  {/* Action Menu */}
                  <td className="text-end">
                    <Button variant="link" className="text-secondary p-0">
                      <span style={{ fontSize: "20px" }}>⋮</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomField;
