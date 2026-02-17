import React, { useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

function SmsTemplate() {
  const [templates] = useState([
    { id: 1, name: "OTP Template", date: "10 May 2025", status: "Active" },
    { id: 2, name: "Reminder SMS", date: "02 May 2025", status: "Inactive" },
  ]);

  return (
    <div className="p-4 bg-white">
      <div className="d-flex justify-content-between mb-3">
        <h5 className="fw-bold">SMS Template</h5>

        <Button size="sm">
          <FiPlus className="me-1" />
          New Template
        </Button>
      </div>

      <hr />

      <Table hover bordered>
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {templates.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.date}</td>

              <td>
                <Badge bg={t.status === "Active" ? "success" : "danger"}>
                  {t.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SmsTemplate;
