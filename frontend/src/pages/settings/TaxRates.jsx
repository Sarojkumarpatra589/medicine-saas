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

function TaxRates() {
  const [taxRates, setTaxRates] = useState([
    { id: 1, name: "VAT", rate: "10%", created: "30 Apr 2025", status: "Active" },
    { id: 2, name: "GST", rate: "18%", created: "15 Apr 2025", status: "Active" },
  ]);

  // Toggle Status
  const toggleStatus = (id) => {
    setTaxRates((prev) =>
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

  // Delete Tax Rate
  const deleteTax = (id) => {
    setTaxRates((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Tax Rates</h5>

          <Button className="button">
            + New Tax Rate
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
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {taxRates.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">
                        {item.name}
                      </td>

                      <td>{item.rate}</td>

                      <td>{item.created}</td>

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
                                deleteTax(item.id)
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

export default TaxRates;