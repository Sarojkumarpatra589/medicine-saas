import React, { useState } from "react";
import { Button, Table, Badge, Dropdown } from "react-bootstrap";

function TaxRates() {
  const [taxRates] = useState([
    { id: 1, name: "VAT", rate: "10%", created: "30 Apr 2025", status: "Active" },
    { id: 2, name: "GST", rate: "18%", created: "15 Apr 2025", status: "Active" },
  ]);

  return (
    <div className="p-4 bg-white">
      <div className="d-flex justify-content-between mb-3">
        <h5 className="fw-bold">Tax Rates</h5>

        <Button size="sm">+ New Tax Rate</Button>
      </div>

      <hr />

      <Table hover bordered>
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Rate</th>
            <th>Created</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {taxRates.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.rate}</td>
              <td>{item.created}</td>

              <td>
                <Badge bg="success">{item.status}</Badge>
              </td>

              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle size="sm">⋮</Dropdown.Toggle>

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

export default TaxRates;
