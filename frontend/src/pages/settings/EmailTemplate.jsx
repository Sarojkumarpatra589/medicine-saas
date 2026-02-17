import React, { useState } from "react";
import { Table, Button, Badge, Dropdown } from "react-bootstrap";
import { FiPlus, FiMoreVertical } from "react-icons/fi";

function EmailTemplate() {
  const [templates] = useState([
    { id: 1, name: "Appointment Confirmation", date: "30 Apr 2025", status: "Active" },
    { id: 2, name: "Invoice Email", date: "15 Apr 2025", status: "Active" },
    { id: 3, name: "Reminder Email", date: "02 Apr 2025", status: "Inactive" },
  ]);

  return (
    <div className="p-4 bg-white">
      <div className="d-flex justify-content-between mb-3">
        <h5 className="fw-bold">Email Template</h5>

        <Button variant="primary" size="sm">
          <FiPlus className="me-1" />
          New Template
        </Button>
      </div>

      <hr />

      <Table hover responsive className="align-middle border">
        <thead className="bg-light">
          <tr>
            <th>Template Name</th>
            <th>Created On</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {templates.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.date}</td>

              <td>
                <Badge bg={item.status === "Active" ? "success" : "danger"}>
                  {item.status}
                </Badge>
              </td>

              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link">
                    <FiMoreVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmailTemplate;
