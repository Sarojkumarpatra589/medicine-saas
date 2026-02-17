import React, { useState } from "react";
import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";

const Signatures = () => {
  const [signatures] = useState([
    {
      id: 1,
      name: "Samuel Donatte",
      signature: "Samuel D.",
      status: "Active",
      isDefault: true,
    },
    {
      id: 2,
      name: "Michael Smith",
      signature: "Michael S.",
      status: "Active",
      isDefault: false,
    },
    {
      id: 3,
      name: "Alberto Alleo",
      signature: "Alberto A.",
      status: "Active",
      isDefault: false,
    },
    {
      id: 4,
      name: "Ernesto Janetts",
      signature: "Ernesto J.",
      status: "Inactive",
      isDefault: false,
    },
  ]);

  return (
    <Container fluid >
      {/* Header */}
          <h5 className="fw-bold">Signature</h5>
          <hr />

      <Row>
        <Col>
          <Table hover responsive className="align-middle border">
            <thead className="bg-light">
              <tr>
                <th className="py-3">Signature Name</th>
                <th className="py-3">Signature</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end"></th>
              </tr>
            </thead>

            <tbody>
              {signatures.map((sig) => (
                <tr key={sig.id}>
                  {/* Name */}
                  <td>
                    {sig.name}
                    {sig.isDefault && (
                      <Badge bg="secondary" className="ms-2">
                        Default
                      </Badge>
                    )}
                  </td>

                  {/* Signature */}
                  <td>
                    <span
                      style={{
                        fontStyle: "italic",
                        fontSize: "16px",
                      }}
                    >
                      {sig.signature}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-pill small fw-medium ${
                        sig.status === "Active"
                          ? "text-success bg-success-subtle"
                          : "text-danger bg-danger-subtle"
                      }`}
                    >
                      {sig.status}
                    </span>
                  </td>

                  {/* Action */}
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

export default Signatures;
