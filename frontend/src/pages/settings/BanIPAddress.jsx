import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

function BanIPAddress() {
  const [bannedIPs, setBannedIPs] = useState([
    {
      id: 1,
      ip: "211.11.0.25",
      reason:
        "You can get on-demand services in order to find a nearby service.",
      created: "30 Apr 2025",
    },
    {
      id: 2,
      ip: "211.03.0.11",
      reason: "Extract pricing information at inventory levels.",
      created: "15 Apr 2025",
    },
    {
      id: 3,
      ip: "211.24.0.17",
      reason:
        "Fetching data for competitors to gain competitive advantage.",
      created: "02 Apr 2025",
    },
    {
      id: 4,
      ip: "211.12.0.34",
      reason:
        "Temporarily block to protect user accounts from internet fraudsters.",
      created: "27 Mar 2025",
    },
  ]);

  const handleAction = (id, action) => {
    if (action === "delete") {
      setBannedIPs((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }

    console.log(action, id);
  };

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Ban IP Address</h5>

          <Button className="button">
            <FiPlus size={16} className="me-1" />
            New IP Address
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
                    <th>IP Address</th>
                    <th>Reason</th>
                    <th>Created On</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {bannedIPs.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">
                        {item.ip}
                      </td>

                      <td>{item.reason}</td>

                      <td className="text-muted">
                        {item.created}
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
                            <Dropdown.Item
                              onClick={() =>
                                handleAction(item.id, "edit")
                              }
                            >
                              Edit
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item
                              className="text-danger"
                              onClick={() =>
                                handleAction(item.id, "delete")
                              }
                            >
                              Remove Ban
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

export default BanIPAddress;