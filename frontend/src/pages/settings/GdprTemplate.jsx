import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const GdprTemplate = () => {
  const [showDecline, setShowDecline] = useState(true);

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h5 className="fw-bold">GDPR Cookies</h5>
          <hr />
        </Col>
      </Row>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Cookies Position</Form.Label>
          <Form.Select>
            <option>Bottom</option>
            <option>Top</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Agree Button Text</Form.Label>
          <Form.Control placeholder="Accept Cookies" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Decline Button Text</Form.Label>
          <Form.Control placeholder="Decline Cookies" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Show Decline Button</Form.Label>
          <Form.Check
            type="switch"
            checked={showDecline}
            onChange={(e) => setShowDecline(e.target.checked)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cookies Page Link</Form.Label>
          <Form.Control placeholder="Enter link" />
        </Form.Group>

        <div className="text-end">
          <Button variant="outline-secondary" className="me-2">
            Cancel
          </Button>

          <Button variant="primary">Save Changes</Button>
        </div>
      </Form>
    </Container>
  );
};

export default GdprTemplate;
