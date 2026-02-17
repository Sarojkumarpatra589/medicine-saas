import React from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";

/* ============================
   SECURITY TAB COMPONENT
============================ */

function SecurityTab() {
  const SettingRow = ({ title, text, action, danger }) => (
    <div className={`setting-row ${danger ? "danger" : ""}`}>
      <div>
        <h6>{title}</h6>
        <p>{text}</p>
      </div>
      <div>{action}</div>
    </div>
  );

  return (
    <Row>
      {/* LEFT PANEL */}
      <Col lg={8}>
        <h5 className="fw-bold">Security</h5>
        <hr />

        <Card className="settings-card">
          <Card.Body>
            <SettingRow
              title="Password"
              text="Set a unique password to secure the account"
              action={
                <Button size="sm" variant="light">
                  ✏️
                </Button>
              }
            />

            <SettingRow
              title="Two Factor Authentication"
              text="Use your mobile phone to receive security PIN"
              action={<Form.Check type="switch" />}
            />

            <SettingRow
              title="Google Authentication"
              text="Connect to Google"
              action={<Form.Check type="switch" />}
            />

            <SettingRow
              title="Phone Number"
              text="Phone Number associated with the account"
              action={
                <Button size="sm" variant="light">
                  ✏️
                </Button>
              }
            />

            <SettingRow
              title="Email Address"
              text="Email Address associated with the account"
              action={
                <Button size="sm" variant="light">
                  ✏️
                </Button>
              }
            />

            <SettingRow
              title="Deactivate Account"
              text="Your account will be deactivated and reactivated upon signing again."
              danger
              action={
                <Button size="sm" variant="light">
                  ⚠️
                </Button>
              }
            />

            <SettingRow
              title="Delete Account"
              text="Your account will be permanently deleted"
              danger
              action={
                <Button size="sm" variant="light">
                  🗑️
                </Button>
              }
            />
          </Card.Body>
        </Card>
      </Col>

      {/* RIGHT PANEL */}
      <Col lg={4}>
        <Card className="settings-card bg-light">
          <Card.Body>
            <div className="browser-header">
              <h6 className="mb-2 fw-bold">Browsers & Devices</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>

              <Button size="sm">Sign out from all</Button>
            </div>

            {[
              { name: "Chrome - Windows", date: "30 Apr 2025, 11:15 AM" },
              { name: "Safari MacOS", date: "30 Apr 2025, 11:15 AM" },
              { name: "Chrome - Windows", date: "19 Mar 2025, 02:50 PM" },
              { name: "Firefox Windows", date: "20 Feb 2025, 06:20 PM" },
            ].map((item, index) => (
              <div key={index} className="browser-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.date}</p>
                </div>

                <Button size="sm" variant="light">
                  ⎋
                </Button>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default SecurityTab;
