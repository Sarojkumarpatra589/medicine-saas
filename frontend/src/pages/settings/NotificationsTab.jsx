import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function NotificationsTab() {
  const NotificationItem = ({ icon, title, text }) => (
    <div className="border rounded p-3 mb-3 bg-white">
      <Row className="align-items-center">
        {/* LEFT SIDE */}
        <Col md={6} className="d-flex align-items-center gap-3">
          <div className="bg-light rounded p-3 fs-5">{icon}</div>

          <div>
            <h6 className="mb-1 fw-semibold">{title}</h6>
            <small className="text-muted">{text}</small>
          </div>
        </Col>

        {/* RIGHT SIDE TOGGLES */}
        <Col
          md={6}
          className="d-flex justify-content-md-end gap-4 mt-3 mt-md-0"
        >
          <div className="d-flex align-items-center gap-2">
            <span className="fw-medium">Email</span>
            <Form.Check type="switch" defaultChecked />
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="fw-medium">SMS</span>
            <Form.Check type="switch" defaultChecked />
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="fw-medium">In App</span>
            <Form.Check type="switch" defaultChecked />
          </div>
        </Col>
      </Row>
    </div>
  );

  return (
    <div>
      <h5 className="fw-bold mb-3">Notifications</h5>
      <hr />

      <NotificationItem
        icon="📅"
        title="New Appointment Booking"
        text="Alert when an appointment is booked"
      />

      <NotificationItem
        icon="❌"
        title="Appointment Cancelation"
        text="Alert if an appointment is cancel"
      />

      <NotificationItem
        icon="🧪"
        title="Lab Report Ready"
        text="Notify when test reports are available"
      />

      <NotificationItem
        icon="⏰"
        title="Follow-up Reminders"
        text="Scheduled follow-ups from doctors"
      />

      <NotificationItem
        icon="💳"
        title="Billing/Invoice Notification"
        text="Notify when a new bill or invoice is generated"
      />
    </div>
  );
}

export default NotificationsTab;
