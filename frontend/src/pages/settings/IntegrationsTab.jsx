import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

function IntegrationsTab() {
  const IntegrationCard = ({ logo, title, text }) => (
    <Col md={6} className="mb-4">
      <div className="border rounded p-3 h-100 bg-white">
        {/* TOP CONTENT */}
        <div className="d-flex gap-3 align-items-start">
          <img src={logo} alt="" width="45" height="45" className="rounded" />

          <div>
            <h6 className="fw-semibold mb-1">{title}</h6>
            <p className="text-muted small mb-0">{text}</p>
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex gap-2">
            <Button variant="light" size="sm">
              🗑️
            </Button>

            <Button variant="light" size="sm">
              ⚙️
            </Button>
          </div>

          <Form.Check type="switch" defaultChecked />
        </div>
      </div>
    </Col>
  );

  return (
    <div>
      <h5 className="fw-bold mb-3">Integrations</h5>
      <hr />

      <Row>
        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/281/281769.png"
          title="Gmail"
          text="Send invoices, payment reminders and customer communication directly"
        />

        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          title="Google Calendar"
          text="Automatically schedule invoice due dates and set up payment follow-up."
        />
      </Row>
    </div>
  );
}

export default IntegrationsTab;
