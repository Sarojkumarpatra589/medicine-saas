import React, { useState } from "react";
import { Button, Table, Badge, Dropdown } from "react-bootstrap";

function BankAccounts() {
  const [accounts] = useState([
    {
      id: 1,
      name: "Andrew Simons",
      bank: "JPM",
      branch: "New York",
      account: "1832",
      aba: "02100021",
      status: "Active",
    },
  ]);

  return (
    <div className="bg-white">
      <div className="d-flex justify-content-between">
        <h5 className="fw-bold">Bank Accounts</h5>

        <Button size="sm">+ New Bank Account</Button>
      </div>

      <hr />

      <Table hover responsive>
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Bank</th>
            <th>Branch</th>
            <th>Account</th>
            <th>ABA</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.bank}</td>
              <td>{item.branch}</td>
              <td>**** {item.account}</td>
              <td>{item.aba}</td>

              <td>
                <Badge bg={item.status === "Active" ? "success" : "danger"}>
                  {item.status}
                </Badge>
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

export default BankAccounts;
