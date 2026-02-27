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

function Currencies() {
  const [currencies, setCurrencies] = useState([
    {
      id: 1,
      currency: "Dollar",
      code: "USD",
      symbol: "$",
      rate: "1",
      status: "Active",
      isDefault: true,
    },
    {
      id: 2,
      currency: "Rupee",
      code: "INR",
      symbol: "₹",
      rate: "86.62",
      status: "Active",
      isDefault: false,
    },
  ]);

  // Toggle Status
  const toggleStatus = (id) => {
    setCurrencies((prev) =>
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

  // Delete Currency
  const deleteCurrency = (id) => {
    setCurrencies((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Currencies</h5>

          <Button className="button">
            + New Currency
          </Button>
        </div>

        <hr />

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
                    <th>Currency</th>
                    <th>Code</th>
                    <th>Symbol</th>
                    <th>Rate</th>
                    <th>Status</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {currencies.map((item) => (
                    <tr key={item.id}>
                      {/* Currency Name + Default */}
                      <td className="fw-medium">
                        {item.currency}
                        {item.isDefault && (
                          <div className="text-primary small">
                            Default
                          </div>
                        )}
                      </td>

                      <td>{item.code}</td>

                      <td>{item.symbol}</td>

                      <td>{item.rate}</td>

                      {/* Status */}
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
                                deleteCurrency(item.id)
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

export default Currencies;