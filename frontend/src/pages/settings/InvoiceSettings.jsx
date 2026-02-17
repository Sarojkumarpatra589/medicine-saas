import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";

const InvoiceSettings = () => {
  const [showCompanyDetails, setShowCompanyDetails] = useState(true);
  const [invoiceRoundoff, setInvoiceRoundoff] = useState(true);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h5 className="fw-bold">Invoice Settings</h5>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <div className="p-2">
            {/* Invoice Image */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Invoice Image
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="file" />
                <Form.Text className="text-muted">No file chosen</Form.Text>
              </Col>
            </Form.Group>

            {/* Invoice Prefix */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Invoice Prefix
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter prefix" />
              </Col>
            </Form.Group>

            {/* Invoice Roundoff */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Invoice Roundoff
              </Form.Label>
              <Col sm={9}>
                <div className="d-flex align-items-center gap-3">
                  <Form.Select style={{ maxWidth: "200px" }}>
                    <option>Select</option>
                    <option>Round Up</option>
                    <option>Round Down</option>
                  </Form.Select>

                  <Form.Check
                    type="switch"
                    checked={invoiceRoundoff}
                    onChange={(e) => setInvoiceRoundoff(e.target.checked)}
                    className="custom-switch-lg"
                  />
                </div>
              </Col>
            </Form.Group>

            {/* Show Company Details */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Show Company Details
              </Form.Label>
              <Col sm={9}>
                <Form.Check
                  type="switch"
                  checked={showCompanyDetails}
                  onChange={(e) => setShowCompanyDetails(e.target.checked)}
                  className="custom-switch-lg"
                />
              </Col>
            </Form.Group>

            {/* Invoice Terms */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Invoice Terms
              </Form.Label>
              <Col sm={9}>
                {/* Toolbar */}
                <div className="mb-2 p-2 bg-light rounded d-flex gap-2 flex-wrap">
                  <Form.Select size="sm" style={{ width: "auto" }}>
                    <option>Normal</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </Form.Select>

                  <ButtonGroup size="sm">
                    <Button variant="outline-secondary">
                      <strong>B</strong>
                    </Button>
                    <Button variant="outline-secondary">
                      <em>I</em>
                    </Button>
                    <Button variant="outline-secondary">
                      <u>U</u>
                    </Button>
                  </ButtonGroup>

                  <ButtonGroup size="sm">
                    <Button variant="outline-secondary">🔗</Button>
                    <Button variant="outline-secondary">≡</Button>
                    <Button variant="outline-secondary">≡</Button>
                    <Button variant="outline-secondary">fx</Button>
                  </ButtonGroup>
                </div>

                {/* Text Area */}
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Enter invoice terms and conditions..."
                />
              </Col>
            </Form.Group>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2 pt-3">
              <Button variant="outline-secondary">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InvoiceSettings;
