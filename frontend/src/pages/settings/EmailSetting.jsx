import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FaTrash, FaCog } from "react-icons/fa";

function EmailSetting() {
  const IntegrationCard = ({ logo, title, text }) => (
    <Col md={6} className="mb-4">
      <div className="border rounded p-3 h-100 bg-white">
        <div className="d-flex gap-3 align-items-start">
          <img src={logo} alt="" width="45" height="45" />

          <div>
            <h6 className="fw-semibold mb-1">{title}</h6>
            <p className="text-muted small mb-0">{text}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
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
      <h5 className="fw-bold mb-3">Email Setting</h5>
      <hr />

      <Row>
        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
          title="PHPMailer"
          text="Send secure emails using PHPMailer."
        />

        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/732/732200.png"
          title="SMTP"
          text="Configure custom SMTP server."
        />

        <IntegrationCard
          logo="https://cdn.worldvectorlogo.com/logos/sendgrid.svg"
          title="SendGrid"
          text="Deliver transactional emails."
        />
      </Row>
    </div>
  );
}

export default EmailSetting;
