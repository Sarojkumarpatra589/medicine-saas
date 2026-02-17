import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FaTrash, FaCog } from "react-icons/fa";

function SmsGateway() {
  const IntegrationCard = ({ logo, title, text }) => (
    <Col md={6} className="mb-4">
      <div className="border rounded p-3 bg-white">
        <div className="d-flex gap-3">
          <img src={logo} alt="" width="45" height="45" />

          <div>
            <h6 className="fw-semibold">{title}</h6>
            <p className="text-muted small">{text}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div className="d-flex gap-2">
            <Button variant="light" size="sm">
              <FaTrash />
            </Button>

            <Button variant="light" size="sm">
              <FaCog />
            </Button>
          </div>

          <Form.Check type="switch" defaultChecked />
        </div>
      </div>
    </Col>
  );

  return (
    <div>
      <h5 className="fw-bold mb-3">SMS Gateway</h5>
      <hr />

      <Row>
        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/561/561127.png"
          title="Twilio"
          text="Send SMS using Twilio."
        />

        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/732/732200.png"
          title="Custom SMS"
          text="Configure your own gateway."
        />
      </Row>
    </div>
  );
}

export default SmsGateway;
