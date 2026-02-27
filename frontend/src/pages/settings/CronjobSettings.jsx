import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const CronjobSettings = () => {
  const [cronLink, setCronLink] = useState("");
  const [interval, setInterval] = useState("1 Day 1 Hour");

  const handleSave = () => {
    console.log("Saved:", cronLink, interval);
  };

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header">
          <h5 className="mb-0 fw-bold">Cronjob</h5>
        </div>

        <hr />

        {/* Form Section */}
        <div className="p-3">
          <Row className="g-4">

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">
                  Cronjob Link
                </Form.Label>
                <Form.Control
                  type="text"
                  value={cronLink}
                  onChange={(e) =>
                    setCronLink(e.target.value)
                  }
                  placeholder="Enter cronjob URL"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-medium">
                  Execution Interval
                </Form.Label>
                <Form.Control
                  type="text"
                  value={interval}
                  onChange={(e) =>
                    setInterval(e.target.value)
                  }
                />
              </Form.Group>
            </Col>

          </Row>
        </div>

        <hr />

        {/* Footer Buttons */}
        <div className="saas-card-footer d-flex justify-content-end gap-2 p-3">
          <Button variant="light">
            Cancel
          </Button>

          <Button className="button" onClick={handleSave}>
            Save Changes
          </Button>
        </div>

      </div>
    </Container>
  );
};

export default CronjobSettings;