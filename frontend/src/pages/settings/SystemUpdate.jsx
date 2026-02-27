import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
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
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">System Update</h5>

          <Button
            className="button"
            size="sm"
            onClick={handleCheckUpdate}
          >
            Check for Update
          </Button>
        </div>

        <hr />

        {/* Version Status */}
        <div className="px-4 pt-3">
          <div className="d-flex align-items-center gap-2 mb-1">
            <FiCheckCircle size={18} color="#4c5fce" />
            <span className="fw-semibold">
              You are up to date
            </span>

            <Badge
              bg="light"
              text="primary"
              className="border"
            >
              Current Version : 8.0
            </Badge>
          </div>

          <small className="text-muted ms-4">
            Last Checked : Today 10:30 AM
          </small>
        </div>

        {/* Info Alert */}
        <div className="px-4 pt-3">
          <Alert
            variant="light"
            className="border rounded-3"
          >
            ℹ️ Before updating, it's best to back up your
            files and database.
          </Alert>
        </div>

        {/* Form */}
        <div className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    Purchase Key{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    value={purchaseKey}
                    onChange={(e) =>
                      setPurchaseKey(e.target.value)
                    }
                    placeholder="Enter your purchase key"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">
                    User Name{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    placeholder="Enter your username"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-3">
              <Button type="submit" className="button">
                Submit
              </Button>
            </div>
          </Form>
        </div>

      </div>
    </Container>
  );
}

export default SystemUpdate;