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

function BankAccounts() {
  const [accounts, setAccounts] = useState([
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

  // Toggle Status
  const toggleStatus = (id) => {
    setAccounts((prev) =>
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

  // Delete Account
  const deleteAccount = (id) => {
    setAccounts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <Container fluid>
      <div className="saas-card">
        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Bank Accounts</h5>

          <Button className="button">
            + New Bank Account
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
                    <th>Bank</th>
                    <th>Branch</th>
                    <th>Account</th>
                    <th>ABA</th>
                    <th>Status</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {accounts.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">
                        {item.name}
                      </td>

                      <td>{item.bank}</td>

                      <td>{item.branch}</td>

                      <td>
                        <span className="text-muted">
                          **** {item.account}
                        </span>
                      </td>

                      <td>{item.aba}</td>

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

                      {/* 3-dot menu */}
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
                                deleteAccount(item.id)
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

export default BankAccounts;