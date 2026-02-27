import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Button,
  Dropdown,
} from "react-bootstrap";

const Signatures = () => {
  const [signatureList, setSignatureList] = useState([
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

  const toggleStatus = (id) => {
    setSignatureList((prev) =>
      prev.map((sig) =>
        sig.id === id
          ? {
              ...sig,
              status: sig.status === "Active" ? "Inactive" : "Active",
            }
          : sig
      )
    );
  };

  const deleteSignature = (id) => {
    setSignatureList((prev) => prev.filter((sig) => sig.id !== id));
  };

  return (
    <Container fluid>
      <div className="saas-card">
        {/* Header */}
        <h5 className="fw-bold ">Signature Table </h5>
      <hr className="mb-4" />


        {/* Table */}
        <div className="saas-table-wrapper">
          <Row>
            <Col>
              <Table hover responsive className="align-middle saas-table mb-0">
                <thead>
                  <tr>
                    <th>Signature Name</th>
                    <th>Signature</th>
                    <th>Status</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {signatureList.map((sig) => (
                    <tr key={sig.id}>
                      {/* Name */}
                      <td className="fw-medium">
                        {sig.name}
                        {sig.isDefault && (
                          <Badge bg="secondary" className="ms-2">
                            Default
                          </Badge>
                        )}
                      </td>

                      {/* Signature */}
                      <td>
                        <span className="signature-text">
                          {sig.signature}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <Badge
                          pill
                          bg={
                            sig.status === "Active"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {sig.status}
                        </Badge>
                      </td>

                      {/* Actions */}
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
                              onClick={() => toggleStatus(sig.id)}
                            >
                              {sig.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item
                              className="text-danger"
                              onClick={() =>
                                deleteSignature(sig.id)
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
};

export default Signatures;