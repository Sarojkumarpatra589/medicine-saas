import React, { useState } from "react";
import { Button, Table, Badge, Dropdown } from "react-bootstrap";
import { FiPlus, FiMoreVertical } from "react-icons/fi";

function PaymentMethods() {
  const [methods] = useState([
    { id: 1, name: "Cash", date: "30 Apr 2025", status: "Active" },
    { id: 2, name: "Credit Card", date: "15 Apr 2025", status: "Active" },
    { id: 3, name: "UPI", date: "02 Apr 2025", status: "Active" },
    { id: 4, name: "Wallet", date: "27 Mar 2025", status: "Inactive" },
  ]);

  return (
    <div className="p-4 bg-white">
      <div className="d-flex justify-content-between mb-3">
        <h5 className="fw-bold">Payment Methods</h5>

        <Button size="sm">
          <FiPlus className="me-1" />
          New Method
        </Button>
      </div>

      <hr />

      <Table hover bordered>
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {methods.map((item) => (
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

export default PaymentMethods;
