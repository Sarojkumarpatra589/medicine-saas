import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FiPlus, FiTrash2, FiLink } from "react-icons/fi";

function AppointmentTab() {
  const [toggles, setToggles] = useState({
    notifyClients: true,
    weekendReminders: false,
    autoCancel: true,
    sendOnBooking: true,
  });

  const [automaticReminders, setAutomaticReminders] = useState([
    { id: 1, type: "Email", template: "Appointment Reminder", days: "01" },
    { id: 2, type: "Email", template: "Appointment Reminder", days: "01" },
  ]);

  const addAutomaticReminder = () => {
    setAutomaticReminders([
      ...automaticReminders,
      {
        id: Date.now(),
        type: "Email",
        template: "Appointment Reminder",
        days: "01",
      },
    ]);
  };

  const deleteAutomaticReminder = (id) => {
    setAutomaticReminders(
      automaticReminders.filter((reminder) => reminder.id !== id)
    );
  };

  return (
    <div  style={{ backgroundColor: "#ffffff" }}>
      {/* Appointment Reminders Section */}
      <h5 className="fw-bold ">Appointment Reminders</h5>
      <hr className="mb-4" />

      {/* Toggle Options */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span style={{ fontSize: "14px", color: "#495057" }}>
          Automatically notify clients about upcoming appointments.
        </span>
        <Form.Check
          type="switch"
          checked={toggles.notifyClients}
          onChange={() =>
            setToggles({ ...toggles, notifyClients: !toggles.notifyClients })
          }
          style={{ transform: "scale(1.2)" }}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span style={{ fontSize: "14px", color: "#495057" }}>
          Reminders for weekend appointments go out on Friday.
        </span>
        <Form.Check
          type="switch"
          checked={toggles.weekendReminders}
          onChange={() =>
            setToggles({
              ...toggles,
              weekendReminders: !toggles.weekendReminders,
            })
          }
          style={{ transform: "scale(1.2)" }}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span style={{ fontSize: "14px", color: "#495057" }}>
          Appointments auto-cancel if clients reply 'No' or 'Cancel' to reminders.
        </span>
        <Form.Check
          type="switch"
          checked={toggles.autoCancel}
          onChange={() =>
            setToggles({ ...toggles, autoCancel: !toggles.autoCancel })
          }
          style={{ transform: "scale(1.2)" }}
        />
      </div>

      {/* Automatic Reminders Section */}
      <h5 className="fw-bold mb-3 mt-4">Automatic Reminders</h5>
      <hr className="mb-4" />

      {automaticReminders.map((reminder, index) => (
        <Row key={reminder.id} className="align-items-center mb-3">
          <Col md="auto">
            <Form.Label className="mb-0" style={{ fontSize: "14px", minWidth: "80px" }}>
              Reminder
            </Form.Label>
          </Col>

          <Col md={2}>
            <Form.Select
              size="sm"
              value={reminder.type}
              onChange={(e) => {
                const updated = [...automaticReminders];
                updated[index].type = e.target.value;
                setAutomaticReminders(updated);
              }}
            >
              <option>Email</option>
              <option>SMS</option>
              <option>Both</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              size="sm"
              value={reminder.template}
              onChange={(e) => {
                const updated = [...automaticReminders];
                updated[index].template = e.target.value;
                setAutomaticReminders(updated);
              }}
            >
              <option>Appointment Reminder</option>
              <option>Follow-up Reminder</option>
              <option>Cancellation Reminder</option>
            </Form.Select>
          </Col>

          <Col md={1}>
            <Form.Control
              type="text"
              size="sm"
              value={reminder.days}
              onChange={(e) => {
                const updated = [...automaticReminders];
                updated[index].days = e.target.value;
                setAutomaticReminders(updated);
              }}
              style={{ width: "60px" }}
            />
          </Col>

          <Col md="auto">
            <span style={{ fontSize: "14px", color: "#6c757d" }}>
              Days Before
            </span>
          </Col>

          <Col md="auto">
            <Button variant="link" className="p-1" style={{ color: "#6c757d" }}>
              <FiLink size={16} />
            </Button>
          </Col>

          <Col md="auto">
            {index === automaticReminders.length - 1 ? (
              <Button
                variant="link"
                className="p-1"
                style={{ color: "#4c5fce" }}
                onClick={addAutomaticReminder}
              >
                <FiPlus size={18} />
              </Button>
            ) : (
              <Button
                variant="link"
                className="p-1"
                style={{ color: "#dc3545" }}
                onClick={() => deleteAutomaticReminder(reminder.id)}
              >
                <FiTrash2 size={16} />
              </Button>
            )}
          </Col>
        </Row>
      ))}

      {/* Manual Reminders Section */}
      <h5 className="fw-bold mb-3 mt-5">Manual Reminders</h5>
      <hr className="mb-4" />

      <Row className="align-items-center mb-3">
        <Col md={3}>
          <Form.Label className="mb-0" style={{ fontSize: "14px" }}>
            SMS Reminder Template
          </Form.Label>
        </Col>

        <Col md={8}>
          <Form.Select size="sm">
            <option>Select</option>
            <option>Template 1</option>
            <option>Template 2</option>
          </Form.Select>
        </Col>

        <Col md={1}>
          <Button variant="link" className="p-1" style={{ color: "#6c757d" }}>
            <FiLink size={16} />
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center mb-4">
        <Col md={3}>
          <Form.Label className="mb-0" style={{ fontSize: "14px" }}>
            Email Reminder Template
          </Form.Label>
        </Col>

        <Col md={8}>
          <Form.Select size="sm">
            <option>Select</option>
            <option>Template 1</option>
            <option>Template 2</option>
          </Form.Select>
        </Col>

        <Col md={1}>
          <Button variant="link" className="p-1" style={{ color: "#6c757d" }}>
            <FiLink size={16} />
          </Button>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span style={{ fontSize: "14px", color: "#495057" }}>
          Send reminder automatically upon new appointment booking
        </span>

        <Form.Check
          type="switch"
          checked={toggles.sendOnBooking}
          onChange={() =>
            setToggles({ ...toggles, sendOnBooking: !toggles.sendOnBooking })
          }
          style={{ transform: "scale(1.2)" }}
        />
      </div>

      <Row className="align-items-center mb-4">
        <Col md="auto">
          <Form.Label className="mb-0" style={{ fontSize: "14px", minWidth: "80px" }}>
            Reminder
          </Form.Label>
        </Col>

        <Col md={3}>
          <Form.Select size="sm">
            <option>Email</option>
            <option>SMS</option>
            <option>Both</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select size="sm">
            <option>Appointment Reminder</option>
            <option>Follow-up Reminder</option>
            <option>Cancellation Reminder</option>
          </Form.Select>
        </Col>

        <Col md="auto">
          <Button variant="link" className="p-1" style={{ color: "#6c757d" }}>
            <FiLink size={16} />
          </Button>
        </Col>
      </Row>

      {/* Action Buttons */}
      <div
        className="d-flex justify-content-end gap-3 mt-5 pt-4"
        style={{ borderTop: "1px solid #e9ecef" }}
      >
        <Button variant="outline-secondary" size="sm" className="px-4">
          Cancel
        </Button>

        <Button
          variant="primary"
          size="sm"
          className="px-4"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default AppointmentTab;
