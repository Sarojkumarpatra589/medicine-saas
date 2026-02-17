import React, { useState } from "react";
import { Button, Form, Row, Col, Badge, Alert } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";

function SystemUpdate() {
  const [purchaseKey, setPurchaseKey] = useState("");
  const [username, setUsername] = useState("");

  const handleCheckUpdate = () => {
    console.log("Checking for updates...");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ purchaseKey, username });
  };

  return (
    <div className="p-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">System Update</h5>

        <Button
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleCheckUpdate}
        >
          Check for Update
        </Button>
      </div>

      <hr />

      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiCheckCircle color="#4c5fce" size={18} />
          <span className="fw-semibold">You are up to date</span>

          <Badge bg="light" text="primary" className="border">
            Current Version : 8.0
          </Badge>
        </div>

        <small className="text-muted ms-4">
          Last Checked : Today 10:30 AM
        </small>
      </div>

      <Alert variant="light" className="border">
        ℹ️ Before updating, it's best to back up your files and database.
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Purchase Key <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                value={purchaseKey}
                onChange={(e) => setPurchaseKey(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                User Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SystemUpdate;
