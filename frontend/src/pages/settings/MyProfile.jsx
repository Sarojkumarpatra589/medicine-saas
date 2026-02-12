import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Badge,
  Dropdown,
  ButtonGroup,
  Alert,
  ListGroup,
} from "react-bootstrap";
import {
  FiLink,
  FiPlus,
  FiTrash2,
  FiClock,
  FiEdit2,
  FiMoreVertical,
  FiCheckCircle 
} from "react-icons/fi";
import "./settings.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaCog } from "react-icons/fa";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [openMenu, setOpenMenu] = useState("account"); // controls collapse

  return (
    <Container fluid className="settings-page ">
      {/* PAGE TITLE */}
      <div className="settings-header">
        <h3 className="fw-bold">Settings</h3>
      </div>
      <hr />

      <Row className="settings-wrapper bg-white p-3 border rounded-3 shadow-sm">
        <Col lg={2}>
          {/* ACCOUNT SETTINGS */}
          <div className="settings-sidebar">
            <div
              className="settings-title"
              onClick={() =>
                setOpenMenu(openMenu === "account" ? "" : "account")
              }
              style={{ cursor: "pointer" }}
            >
              <span className="settings-icon">⚙️</span>
              <span>Account Settings</span>
            </div>

            {openMenu === "account" && (
              <ul className="settings-menu-list">
                <li
                  className={activeTab === "profile" ? "active" : ""}
                  onClick={() => setActiveTab("profile")}
                >
                  <span className="dot"></span>
                  Profile
                </li>

                <li
                  className={activeTab === "security" ? "active" : ""}
                  onClick={() => setActiveTab("security")}
                >
                  <span className="dot"></span>
                  Security
                </li>

                <li
                  className={activeTab === "notifications" ? "active" : ""}
                  onClick={() => setActiveTab("notifications")}
                >
                  <span className="dot"></span>
                  Notifications
                </li>

                <li
                  className={activeTab === "integrations" ? "active" : ""}
                  onClick={() => setActiveTab("integrations")}
                >
                  <span className="dot"></span>
                  Integrations
                </li>
              </ul>
            )}
          </div>

          {/* WEBSITE SETTINGS */}
          <div className="settings-sidebar mt-2">
            <div
              className="settings-title"
              onClick={() =>
                setOpenMenu(openMenu === "website" ? "" : "website")
              }
              style={{ cursor: "pointer" }}
            >
              <span className="settings-icon">⚙️</span>
              <span>Clinic Settings</span>
            </div>

            {openMenu === "website" && (
              <ul className="settings-menu-list">
                <li
                  className={activeTab === "appointment" ? "active" : ""}
                  onClick={() => setActiveTab("appointment")}
                >
                  <span className="dot"></span>
                  Appointment
                </li>

                <li
                  className={activeTab === "workinghours" ? "active" : ""}
                  onClick={() => setActiveTab("workinghours")}
                >
                  <span className="dot"></span>
                  Working Hours
                </li>

                <li
                  className={
                    activeTab === "cancellation_reason" ? "active" : ""
                  }
                  onClick={() => setActiveTab("cancellation_reason")}
                >
                  <span className="dot"></span>
                  Cancellation Reason
                </li>
              </ul>
            )}
          </div>
          {/* App SETTINGS */}
          <div className="settings-sidebar mt-2">
            <div
              className="settings-title"
              onClick={() => setOpenMenu(openMenu === "App" ? "" : "App")}
              style={{ cursor: "pointer" }}
            >
              <span className="settings-icon">⚙️</span>
              <span>App Settings</span>
            </div>

            {openMenu === "App" && (
              <ul className="settings-menu-list">
                <li
                  className={activeTab === "invoice_setting" ? "active" : ""}
                  onClick={() => setActiveTab("invoice_setting")}
                >
                  <span className="dot"></span>
                  Invoice Setting
                </li>

                <li
                  className={activeTab === "invoice_template" ? "active" : ""}
                  onClick={() => setActiveTab("invoice_template")}
                >
                  <span className="dot"></span>
                  Invoice Template
                </li>

                <li
                  className={activeTab === "signature" ? "active" : ""}
                  onClick={() => setActiveTab("signature")}
                >
                  <span className="dot"></span>
                  Signature
                </li>
                <li
                  className={activeTab === "custom_fields" ? "active" : ""}
                  onClick={() => setActiveTab("custom_fields")}
                >
                  <span className="dot"></span>
                  Custom Fields
                </li>
              </ul>
            )}
          </div>

          {/* SYSTEM SETTINGS */}
          <div className="settings-sidebar mt-2">
            <div
              className="settings-title"
              onClick={() => setOpenMenu(openMenu === "system" ? "" : "system")}
              style={{ cursor: "pointer" }}
            >
              <span className="settings-icon">⚙️</span>
              <span>System Settings</span>
            </div>

            {openMenu === "system" && (
              <ul className="settings-menu-list">
                <li
                  className={activeTab === "email_setting" ? "active" : ""}
                  onClick={() => setActiveTab("email_setting")}
                >
                  <span className="dot"></span>
                  Email Setting
                </li>

                <li
                  className={activeTab === "email_template" ? "active" : ""}
                  onClick={() => setActiveTab("email_template")}
                >
                  <span className="dot"></span>
                  Email Template
                </li>

                <li
                  className={activeTab === "sms_gateway" ? "active" : ""}
                  onClick={() => setActiveTab("sms_gateway")}
                >
                  <span className="dot"></span>
                  SMS Gateway
                </li>
                <li
                  className={activeTab === "sms_template" ? "active" : ""}
                  onClick={() => setActiveTab("sms_template")}
                >
                  <span className="dot"></span>
                  SMS Template
                </li>
                <li
                  className={activeTab === "gdpr_cookies" ? "active" : ""}
                  onClick={() => setActiveTab("gdpr_cookies")}
                >
                  <span className="dot"></span>
                  GDPR Cookies
                </li>
              </ul>
            )}
          </div>

          {/* FINANCE AND ACCOUNTS SETTINGS */}
          <div className="settings-sidebar mt-2">
            <div
              className="settings-title"
              onClick={() =>
                setOpenMenu(
                  openMenu === "finance_and_account"
                    ? ""
                    : "finance_and_account",
                )
              }
              style={{ cursor: "pointer" }}
            >
              <span className="settings-icon">⚙️</span>
              <span>Finance And Accounts</span>
            </div>

            {openMenu === "finance_and_account" && (
              <ul className="settings-menu-list">
                <li
                  className={activeTab === "payment_methods" ? "active" : ""}
                  onClick={() => setActiveTab("payment_methods")}
                >
                  <span className="dot"></span>
                  Payment Methods
                </li>

                <li
                  className={activeTab === "bank_accounts" ? "active" : ""}
                  onClick={() => setActiveTab("bank_accounts")}
                >
                  <span className="dot"></span>
                  Bank Accounts
                </li>

                <li
                  className={activeTab === "tax_rates" ? "active" : ""}
                  onClick={() => setActiveTab("tax_rates")}
                >
                  <span className="dot"></span>
                  TAX Rates
                </li>
                <li
                  className={activeTab === "currencies" ? "active" : ""}
                  onClick={() => setActiveTab("currencies")}
                >
                  <span className="dot"></span>
                  Currencies
                </li>
              </ul>
            )}
          </div>

          {/* OTHER SETTINGS */}
          <div className="settings-sidebar mt-2">
            <div
              className="settings-title"
              onClick={() =>
                setOpenMenu(
                  openMenu === "other_settings" ? "" : "other_settings",
                )
              }
              style={{ cursor: "pointer" }}
            >
              <span className="settings-icon">⚙️</span>
              <span>Other Settings</span>
            </div>

            {openMenu === "other_settings" && (
              <ul className="settings-menu-list">
                <li
                  className={activeTab === "sitemap" ? "active" : ""}
                  onClick={() => setActiveTab("sitemap")}
                >
                  <span className="dot"></span>
                  Sitemap
                </li>

                <li
                  className={activeTab === "clear_cache" ? "active" : ""}
                  onClick={() => setActiveTab("clear_cache")}
                >
                  <span className="dot"></span>
                  Clear Cache
                </li>

                <li
                  className={activeTab === "storage" ? "active" : ""}
                  onClick={() => setActiveTab("storage")}
                >
                  <span className="dot"></span>
                  Storage
                </li>
                <li
                  className={activeTab === "cronjob" ? "active" : ""}
                  onClick={() => setActiveTab("cronjob")}
                >
                  <span className="dot"></span>
                  Cronjob
                </li>
                <li
                  className={activeTab === "ban_ip" ? "active" : ""}
                  onClick={() => setActiveTab("ban_ip")}
                >
                  <span className="dot"></span>
                  Ban IP Address
                </li>
                <li
                  className={activeTab === "system_backups" ? "active" : ""}
                  onClick={() => setActiveTab("system_backups")}
                >
                  <span className="dot"></span>
                  System Backups
                </li>
                <li
                  className={activeTab === "database_backups" ? "active" : ""}
                  onClick={() => setActiveTab("database_backups")}
                >
                  <span className="dot"></span>
                  Datebase Backups
                </li>
                <li
                  className={activeTab === "system_update" ? "active" : ""}
                  onClick={() => setActiveTab("system_update")}
                >
                  <span className="dot"></span>
                  System Update
                </li>
              </ul>
            )}
          </div>
        </Col>

        {/* RIGHT CONTENT */}
        <Col lg={10}>
          <div className="settings-content">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "integrations" && <IntegrationsTab />}

            {activeTab === "appointment" && <AppointmentTab />}
            {activeTab === "workinghours" && <WorkingHoursTab />}
            {activeTab === "cancellation_reason" && <CancellationReasonTab />}

            {activeTab === "invoice_setting" && <InvoiceSettings />}
            {activeTab === "invoice_template" && <InvoiceTemplates />}
            {activeTab === "signature" && <Signatures />}
            {activeTab === "custom_fields" && <CustomField />}

            {activeTab === "email_setting" && <EmailSetting />}
            {activeTab === "email_template" && <EmailTemplate />}
            {activeTab === "sms_gateway" && <SmsGateway />}
            {activeTab === "sms_template" && <SmsTemplate />}
            {activeTab === "gdpr_cookies" && <GdprTemplate />}

            {activeTab === "payment_methods" && <PaymentMethods />}
            {activeTab === "bank_accounts" && <BankAccounts />}
            {activeTab === "tax_rates" && <TaxRates />}
            {activeTab === "currencies" && <Currencies />}


            {activeTab === "sitemap" && <Sitemap/>}
            {activeTab === "clear_cache" && <ClearCache/>}
            {activeTab === "storage" && <Storage/>}
            {activeTab === "cronjob" && <CronjobSettings/>}
            {activeTab === "ban_ip" && <BanIPAddress  />}
            {activeTab === "system_backups" && <SystemBackup />}
            {activeTab === "database_backups" && <DatabaseBackup/>}
            {activeTab === "system_update" && <SystemUpdate/>}


          </div>
        </Col>
      </Row>
    </Container>
  );
}

function ProfileTab() {
  return (
    <div className="profile-wrapper ">
      <h5 className="section-title fw-bold">Basic Information</h5>
      <hr />

      <Row className="align-items-center mb-4">
        <Col md={3}>
          <label>
            Profile Image <span className="required">*</span>
          </label>
        </Col>

        <Col md={9}>
          <div className="profile-upload">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
          </div>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                First Name <span className="required">*</span>
              </Form.Label>
            </Col>

            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                Last Name <span className="required">*</span>
              </Form.Label>
            </Col>

            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Contact Information */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                Email <span className="required">*</span>
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control type="email" />
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                Phone Number <span className="required">*</span>
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control type="tel" />
            </Col>
          </Row>
        </Col>
      </Row>

      <hr />

      <h5 className="section-title mb-3">Address Information</h5>

      {/* Address Lines */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Address Line 1</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Address Line 2</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Country / State */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Country</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Select>
                <option>Select</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">State</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Select>
                <option>Select</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* City / Pincode */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">City</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Select>
                <option>Select</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Pincode</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />

      <div className="profile-actions d-flex justify-content-end gap-2">
        <Button variant="light">Cancel</Button>
        <Button className="save-btn">Save Changes</Button>
      </div>
    </div>
  );
}

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
      automaticReminders.filter((reminder) => reminder.id !== id),
    );
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
      {/* Appointment Reminders Section */}
      <h5 className="fw-bold mb-3">Appointment Reminders</h5>
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
          Appointments auto-cancel if clients reply 'No' or 'Cancel' to
          reminders.
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
            <Form.Label
              className="mb-0"
              style={{ fontSize: "14px", minWidth: "80px" }}
            >
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
          <Form.Label
            className="mb-0"
            style={{ fontSize: "14px", minWidth: "80px" }}
          >
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
            <option>Appointment Remainder</option>
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

function WorkingHoursTab() {
  const [productiveTime, setProductiveTime] = useState("");
  const [workingDays, setWorkingDays] = useState({
    monday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    tuesday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    wednesday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    thursday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    friday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    saturday: { enabled: false, startTime: "", endTime: "" },
    sunday: { enabled: false, startTime: "", endTime: "" },
  });

  const [breakHours, setBreakHours] = useState([
    {
      id: 1,
      label: "Morning Break",
      startTime: "09:30 AM",
      endTime: "09:30 AM",
    },
  ]);

  const [lunchBreak, setLunchBreak] = useState({
    duration: "45 Mins",
    time: "01:00 PM",
  });

  const toggleDay = (day) => {
    setWorkingDays({
      ...workingDays,
      [day]: { ...workingDays[day], enabled: !workingDays[day].enabled },
    });
  };

  const updateDayTime = (day, field, value) => {
    setWorkingDays({
      ...workingDays,
      [day]: { ...workingDays[day], [field]: value },
    });
  };

  const addBreakHour = () => {
    setBreakHours([
      ...breakHours,
      {
        id: Date.now(),
        label: "New Break",
        startTime: "09:30 AM",
        endTime: "09:30 AM",
      },
    ]);
  };

  const deleteBreakHour = (id) => {
    setBreakHours(breakHours.filter((brk) => brk.id !== id));
  };

  const dayNames = [
    { key: "monday", label: "Monday", color: "#4c5fce" },
    { key: "tuesday", label: "Tuesday", color: "#4c5fce" },
    { key: "wednesday", label: "Wednesday", color: "#4c5fce" },
    { key: "thursday", label: "Thursday", color: "#4c5fce" },
    { key: "friday", label: "Friday", color: "#4c5fce" },
    { key: "saturday", label: "Saturday", color: "#6c757d" },
    { key: "sunday", label: "Sunday", color: "#6c757d" },
  ];

  return (
    <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
      {/* Working Hours Section */}
      <h5 className="fw-bold mb-4">Working Hours</h5>
      <hr className="mb-4" />

      {/* Expected Productive Time */}
      <Row className="align-items-center mb-4">
        <Col md={3}>
          <Form.Label className="mb-0" style={{ fontSize: "14px" }}>
            Expected Productive Time <span className="text-danger">*</span>
          </Form.Label>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            size="sm"
            value={productiveTime}
            onChange={(e) => setProductiveTime(e.target.value)}
            placeholder=""
          />
        </Col>
        <Col md={3} className="text-end">
          <span style={{ fontSize: "12px", color: "#6c757d" }}>
            <FiClock size={14} className="me-1" />
            Hours / Day
          </span>
        </Col>
      </Row>

      {/* Working Days Section */}
      <h5 className="fw-bold mb-3 mt-5">Working Days</h5>
      <hr className="mb-4" />

      {dayNames.map(({ key, label, color }) => (
        <Row key={key} className="align-items-center mb-3">
          <Col md={2}>
            <Form.Check
              type="switch"
              id={`day-${key}`}
              label={
                <span style={{ fontSize: "14px", color: color }}>{label}</span>
              }
              checked={workingDays[key].enabled}
              onChange={() => toggleDay(key)}
              style={{ transform: "scale(1.1)" }}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              size="sm"
              value={workingDays[key].startTime}
              onChange={(e) => updateDayTime(key, "startTime", e.target.value)}
              disabled={!workingDays[key].enabled}
              style={{
                backgroundColor: workingDays[key].enabled
                  ? "#ffffff"
                  : "#f8f9fa",
                color: workingDays[key].enabled ? "#495057" : "#adb5bd",
              }}
            />
          </Col>
          <Col
            md="auto"
            className="text-center"
            style={{ fontSize: "14px", color: "#6c757d" }}
          >
            to
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              size="sm"
              value={workingDays[key].endTime}
              onChange={(e) => updateDayTime(key, "endTime", e.target.value)}
              disabled={!workingDays[key].enabled}
              style={{
                backgroundColor: workingDays[key].enabled
                  ? "#ffffff"
                  : "#f8f9fa",
                color: workingDays[key].enabled ? "#495057" : "#adb5bd",
              }}
            />
          </Col>
        </Row>
      ))}

      {/* Break Hours Section */}
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
        <h5 className="fw-bold mb-0">Break Hours</h5>
        <Button
          variant="link"
          className="p-0"
          style={{ color: "#4c5fce", fontSize: "14px", textDecoration: "none" }}
          onClick={addBreakHour}
        >
          <FiPlus size={16} className="me-1" />
          Add New
        </Button>
      </div>
      <hr className="mb-4" />

      {breakHours.map((brk, index) => (
        <Row key={brk.id} className="align-items-center mb-3">
          <Col md={2}>
            <Form.Label className="mb-0" style={{ fontSize: "14px" }}>
              {brk.label}
            </Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              size="sm"
              value={brk.startTime}
              onChange={(e) => {
                const updated = [...breakHours];
                updated[index].startTime = e.target.value;
                setBreakHours(updated);
              }}
            />
          </Col>
          <Col
            md="auto"
            className="text-center"
            style={{ fontSize: "14px", color: "#6c757d" }}
          >
            to
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              size="sm"
              value={brk.endTime}
              onChange={(e) => {
                const updated = [...breakHours];
                updated[index].endTime = e.target.value;
                setBreakHours(updated);
              }}
            />
          </Col>
          <Col md="auto">
            <Button variant="link" className="p-1" style={{ color: "#6c757d" }}>
              <FiEdit2 size={14} />
            </Button>
          </Col>
          <Col md="auto">
            <Button
              variant="link"
              className="p-1"
              style={{ color: "#dc3545" }}
              onClick={() => deleteBreakHour(brk.id)}
            >
              <FiTrash2 size={14} />
            </Button>
          </Col>
        </Row>
      ))}

      {/* Lunch Hours Section */}
      <h5 className="fw-bold mb-3 mt-5">Lunch Hours</h5>
      <hr className="mb-4" />

      <Row className="align-items-center mb-4">
        <Col md={2}>
          <Form.Label className="mb-0" style={{ fontSize: "14px" }}>
            Lunch Break
          </Form.Label>
        </Col>
        <Col md={3}>
          <Form.Select
            size="sm"
            value={lunchBreak.duration}
            onChange={(e) =>
              setLunchBreak({ ...lunchBreak, duration: e.target.value })
            }
          >
            <option>15 Mins</option>
            <option>30 Mins</option>
            <option>45 Mins</option>
            <option>60 Mins</option>
            <option>90 Mins</option>
          </Form.Select>
        </Col>
        <Col md="auto" style={{ fontSize: "14px", color: "#6c757d" }}>
          Lunch at
        </Col>
        <Col md={3}>
          <Form.Select
            size="sm"
            value={lunchBreak.time}
            onChange={(e) =>
              setLunchBreak({ ...lunchBreak, time: e.target.value })
            }
          >
            <option>12:00 PM</option>
            <option>12:30 PM</option>
            <option>01:00 PM</option>
            <option>01:30 PM</option>
            <option>02:00 PM</option>
          </Form.Select>
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

function CancellationReasonTab() {
  const [reasons, setReasons] = useState([
    {
      id: 1,
      reason: "Personal Emergency",
      date: "30 Apr 2025",
      status: "Active",
    },
    { id: 2, reason: "Feeling Better", date: "15 Apr 2025", status: "Active" },
    {
      id: 3,
      reason: "Transportation Issues",
      date: "02 Apr 2025",
      status: "Active",
    },
    {
      id: 4,
      reason: "Booked by Mistake",
      date: "27 Mar 2025",
      status: "Active",
    },
    {
      id: 5,
      reason: "Forget Appointment",
      date: "25 Jan 2025",
      status: "Inactive",
    },
  ]);

  const handleAddNewReason = () => {
    console.log("Add new reason clicked");
    // Add logic to open modal or form for new reason
  };

  const handleMenuAction = (reasonId, action) => {
    console.log(`Action: ${action} on reason ID: ${reasonId}`);
    // Add logic for edit, delete, activate/deactivate
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Cancellation Reason</h5>
        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleAddNewReason}
        >
          <FiPlus size={16} className="me-1" />
          New Reason
        </Button>
      </div>
      <hr/>

      {/* Table */}
      <Table
        hover
        responsive
        className="align-middle border"
        style={{ fontSize: "14px" }}
      >
        <thead
          style={{
            backgroundColor: "#f8f9fa",
          }}
        >
          <tr>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Reason
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Date
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Status
            </th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #e9ecef" }}>
              <td style={{ padding: "16px", color: "#495057" }}>
                {item.reason}
              </td>
              <td style={{ padding: "16px", color: "#6c757d" }}>{item.date}</td>
              <td style={{ padding: "16px" }}>
                <Badge
                  pill
                  bg={item.status === "Active" ? "success" : "danger"}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "4px 12px",
                    backgroundColor:
                      item.status === "Active" ? "#28a745" : "#dc3545",
                    color: "#ffffff",
                  }}
                >
                  {item.status}
                </Badge>
              </td>
              <td style={{ padding: "16px", textAlign: "center" }}>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id={`dropdown-${item.id}`}
                    className="p-0"
                    style={{
                      color: "#6c757d",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <FiMoreVertical size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ fontSize: "14px" }}>
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "edit")}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleMenuAction(
                          item.id,
                          item.status === "Active" ? "deactivate" : "activate",
                        )
                      }
                    >
                      {item.status === "Active" ? "Deactivate" : "Activate"}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "delete")}
                      style={{ color: "#dc3545" }}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Empty state - show when no reasons */}
      {reasons.length === 0 && (
        <div className="text-center py-5" style={{ color: "#6c757d" }}>
          <p>No cancellation reasons found.</p>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleAddNewReason}
          >
            <FiPlus size={16} className="me-1" />
            Add First Reason
          </Button>
        </div>
      )}
    </div>
  );
}

const CustomField = () => {
  const [customFields, setCustomFields] = useState([
    {
      id: 1,
      module: "Patient",
      label: "Preferred Language",
      type: "Select",
      defaultValue: "English",
      required: true,
      status: "Active",
    },
    {
      id: 2,
      module: "Staff",
      label: "Job Type",
      type: "Text",
      defaultValue: "Full Time",
      required: true,
      status: "Active",
    },
  ]);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Custom Field</h5>

            <Button
              variant="primary"
              className="d-flex align-items-center gap-2"
            >
              + New Custom Field
            </Button>
          </div>
          <hr />
        </Col>
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <Table hover responsive className="align-middle border">
            <thead className="bg-light">
              <tr>
                <th className="py-3">Module</th>
                <th className="py-3">Label</th>
                <th className="py-3">Type</th>
                <th className="py-3">Default Value</th>
                <th className="py-3">Required</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end"></th>
              </tr>
            </thead>

            <tbody>
              {customFields.map((field) => (
                <tr key={field.id}>
                  <td>{field.module}</td>

                  <td>{field.label}</td>

                  <td>{field.type}</td>

                  <td>{field.defaultValue}</td>

                  {/* Required Switch */}
                  <td>
                    <Form.Check
                      type="switch"
                      checked={field.required}
                      onChange={() => {}}
                      className="custom-switch-lg"
                    />
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-pill small fw-medium ${
                        field.status === "Active"
                          ? "text-success bg-success-subtle"
                          : "text-danger bg-danger-subtle"
                      }`}
                    >
                      {field.status}
                    </span>
                  </td>

                  {/* Action Menu */}
                  <td className="text-end">
                    <Button variant="link" className="text-secondary p-0">
                      <span style={{ fontSize: "20px" }}>⋮</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

const Signatures = () => {
  const [signatures] = useState([
    {
      id: 1,
      name: "Samuel Donatte",
      signature: "Samuel D.",
      status: "Active",
      isDefault: true,
    },
    {
      id: 2,
      name: "Michael Smith",
      signature: "Michael S.",
      status: "Active",
      isDefault: false,
    },
    {
      id: 3,
      name: "Alberto Alleo",
      signature: "Alberto A.",
      status: "Active",
      isDefault: false,
    },
    {
      id: 4,
      name: "Ernesto Janetts",
      signature: "Ernesto J.",
      status: "Inactive",
      isDefault: false,
    },
  ]);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h5 className="fw-bold">Signature</h5>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col>
          <Table hover responsive className="align-middle border">
            <thead className="bg-light">
              <tr>
                <th className="py-3">Signature Name</th>
                <th className="py-3">Signature</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-end"></th>
              </tr>
            </thead>

            <tbody>
              {signatures.map((sig) => (
                <tr key={sig.id}>
                  {/* Name */}
                  <td>
                    {sig.name}
                    {sig.isDefault && (
                      <Badge bg="secondary" className="ms-2">
                        Default
                      </Badge>
                    )}
                  </td>

                  {/* Signature */}
                  <td>
                    <span
                      style={{
                        fontStyle: "italic",
                        fontSize: "16px",
                      }}
                    >
                      {sig.signature}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-pill small fw-medium ${
                        sig.status === "Active"
                          ? "text-success bg-success-subtle"
                          : "text-danger bg-danger-subtle"
                      }`}
                    >
                      {sig.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="text-end">
                    <Button variant="link" className="text-secondary p-0">
                      <span style={{ fontSize: "20px" }}>⋮</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};



const InvoiceTemplates = () => {
  const [templates] = useState([
    { id: 1, name: "General Invoice 1" },
    { id: 2, name: "General Invoice 2" },
    { id: 3, name: "General Invoice 3" },
    { id: 4, name: "General Invoice 4" },
  ]);

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h5 className="fw-bold">Invoice Template</h5>
          <hr />
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {templates.map((template) => (
          <Col key={template.id}>
            {/* Template Box */}
            <div
              className="p-3 bg-white rounded shadow-sm"
              style={{
                cursor: "pointer",
                transition: "0.25s",
                transform:
                  hoveredCard === template.id ? "translateY(-5px)" : "none",
              }}
              onMouseEnter={() => setHoveredCard(template.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Preview Area */}
              <div
                className="d-flex align-items-center justify-content-center mb-3 rounded bg-light"
                style={{ height: "200px" }}
              >
                <span style={{ fontSize: "48px" }}>📄</span>
              </div>

              {/* Footer */}
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{template.name}</h6>

                <button
                  className="btn btn-link text-secondary p-0"
                  style={{ fontSize: "20px" }}
                >
                  ☆
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

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

function EmailSetting() {
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
      <h5 className="fw-bold mb-3">Email Setting</h5>
      <hr />

      <Row>
        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
          title="PHPMailer"
          text="Send secure emails using PHPMailer library integration."
          deleteIcon={<FaTrash />}
          settingsIcon={<FaCog />}
        />

        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/732/732200.png"
          title="SMTP"
          text="Configure custom SMTP server for sending system emails."
          deleteIcon={<FaTrash />}
          settingsIcon={<FaCog />}
        />

        <IntegrationCard
          logo="https://cdn.worldvectorlogo.com/logos/sendgrid.svg"
          title="SendGrid"
          text="Deliver transactional and marketing emails using SendGrid."
          deleteIcon={<FaTrash />}
          settingsIcon={<FaCog />}
        />
      </Row>
    </div>
  );
}




function EmailTemplate() {
  const [reasons, setReasons] = useState([
    {
      id: 1,
      reason: "Personal Emergency",
      date: "30 Apr 2025",
      status: "Active",
    },
    { id: 2, reason: "Feeling Better", date: "15 Apr 2025", status: "Active" },
    {
      id: 3,
      reason: "Transportation Issues",
      date: "02 Apr 2025",
      status: "Active",
    },
    {
      id: 4,
      reason: "Booked by Mistake",
      date: "27 Mar 2025",
      status: "Active",
    },
    {
      id: 5,
      reason: "Forget Appointment",
      date: "25 Jan 2025",
      status: "Inactive",
    },
  ]);

  const handleAddNewReason = () => {
    console.log("Add new reason clicked");
    // Add logic to open modal or form for new reason
  };

  const handleMenuAction = (reasonId, action) => {
    console.log(`Action: ${action} on reason ID: ${reasonId}`);
    // Add logic for edit, delete, activate/deactivate
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Email Template</h5>
       
        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleAddNewReason}
        >
          <FiPlus size={16} className="me-1" />
          New Template
        </Button>
      </div>
      <hr />

      {/* Table */}
      <Table
        hover
        responsive
        className="align-middle border"
        style={{ fontSize: "14px" }}
      >
        <thead
          style={{
            backgroundColor: "#f8f9fa",
          }}
        >
          <tr>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Template Name
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Created On
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Status
            </th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #e9ecef" }}>
              <td style={{ padding: "16px", color: "#495057" }}>
                {item.reason}
              </td>
              <td style={{ padding: "16px", color: "#6c757d" }}>{item.date}</td>
              <td style={{ padding: "16px" }}>
                <Badge
                  pill
                  bg={item.status === "Active" ? "success" : "danger"}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "4px 12px",
                    backgroundColor:
                      item.status === "Active" ? "#28a745" : "#dc3545",
                    color: "#ffffff",
                  }}
                >
                  {item.status}
                </Badge>
              </td>
              <td style={{ padding: "16px", textAlign: "center" }}>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id={`dropdown-${item.id}`}
                    className="p-0"
                    style={{
                      color: "#6c757d",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <FiMoreVertical size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ fontSize: "14px" }}>
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "edit")}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleMenuAction(
                          item.id,
                          item.status === "Active" ? "deactivate" : "activate",
                        )
                      }
                    >
                      {item.status === "Active" ? "Deactivate" : "Activate"}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "delete")}
                      style={{ color: "#dc3545" }}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Empty state - show when no reasons */}
      {reasons.length === 0 && (
        <div className="text-center py-5" style={{ color: "#6c757d" }}>
          <p>No cancellation reasons found.</p>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleAddNewReason}
          >
            <FiPlus size={16} className="me-1" />
            Add First Reason
          </Button>
        </div>
      )}
    </div>
  );
}


function SmsGateway() {
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
      <h5 className="fw-bold mb-3">SMS Gateway</h5>
      <hr />

      <Row>
        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
          title="PHPMailer"
          text="Send secure emails using PHPMailer library integration."
          deleteIcon={<FaTrash />}
          settingsIcon={<FaCog />}
        />

        <IntegrationCard
          logo="https://cdn-icons-png.flaticon.com/512/732/732200.png"
          title="SMTP"
          text="Configure custom SMTP server for sending system emails."
          deleteIcon={<FaTrash />}
          settingsIcon={<FaCog />}
        />

        <IntegrationCard
          logo="https://cdn.worldvectorlogo.com/logos/sendgrid.svg"
          title="SendGrid"
          text="Deliver transactional and marketing emails using SendGrid."
          deleteIcon={<FaTrash />}
          settingsIcon={<FaCog />}
        />
      </Row>
    </div>
  );
}




function SmsTemplate() {
  const [reasons, setReasons] = useState([
    {
      id: 1,
      reason: "Personal Emergency",
      date: "30 Apr 2025",
      status: "Active",
    },
    { id: 2, reason: "Feeling Better", date: "15 Apr 2025", status: "Active" },
    {
      id: 3,
      reason: "Transportation Issues",
      date: "02 Apr 2025",
      status: "Active",
    },
    {
      id: 4,
      reason: "Booked by Mistake",
      date: "27 Mar 2025",
      status: "Active",
    },
    {
      id: 5,
      reason: "Forget Appointment",
      date: "25 Jan 2025",
      status: "Inactive",
    },
  ]);

  const handleAddNewReason = () => {
    console.log("Add new reason clicked");
    // Add logic to open modal or form for new reason
  };

  const handleMenuAction = (reasonId, action) => {
    console.log(`Action: ${action} on reason ID: ${reasonId}`);
    // Add logic for edit, delete, activate/deactivate
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">SMS Template</h5>
       
        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleAddNewReason}
        >
          <FiPlus size={16} className="me-1" />
          New Template
        </Button>
      </div>
      <hr />

      {/* Table */}
      <Table
        hover
        responsive
        className="align-middle border"
        style={{ fontSize: "14px" }}
      >
        <thead
          style={{
            backgroundColor: "#f8f9fa",
          }}
        >
          <tr>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Template Name
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Created On
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Status
            </th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #e9ecef" }}>
              <td style={{ padding: "16px", color: "#495057" }}>
                {item.reason}
              </td>
              <td style={{ padding: "16px", color: "#6c757d" }}>{item.date}</td>
              <td style={{ padding: "16px" }}>
                <Badge
                  pill
                  bg={item.status === "Active" ? "success" : "danger"}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "4px 12px",
                    backgroundColor:
                      item.status === "Active" ? "#28a745" : "#dc3545",
                    color: "#ffffff",
                  }}
                >
                  {item.status}
                </Badge>
              </td>
              <td style={{ padding: "16px", textAlign: "center" }}>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id={`dropdown-${item.id}`}
                    className="p-0"
                    style={{
                      color: "#6c757d",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <FiMoreVertical size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ fontSize: "14px" }}>
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "edit")}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleMenuAction(
                          item.id,
                          item.status === "Active" ? "deactivate" : "activate",
                        )
                      }
                    >
                      {item.status === "Active" ? "Deactivate" : "Activate"}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "delete")}
                      style={{ color: "#dc3545" }}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Empty state - show when no reasons */}
      {reasons.length === 0 && (
        <div className="text-center py-5" style={{ color: "#6c757d" }}>
          <p>No cancellation reasons found.</p>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleAddNewReason}
          >
            <FiPlus size={16} className="me-1" />
            Add First Reason
          </Button>
        </div>
      )}
    </div>
  );
}




const GdprTemplate = () => {
  const [showCompanyDetails, setShowCompanyDetails] = useState(true);
  const [invoiceRoundoff, setInvoiceRoundoff] = useState(true);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h5 className="fw-bold">GDPR Cookies</h5>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <div className="p-2">
            {/* Invoice Roundoff */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Cookies Position
              </Form.Label>
              <Col sm={9}>
                <div className="d-flex align-items-center gap-3">
                  <Form.Select style={{ maxWidth: "380px" }}>
                    <option>Select</option>
                    <option>Round Up</option>
                    <option>Round Down</option>
                  </Form.Select>
                </div>
              </Col>
            </Form.Group>

             {/* Invoice Prefix */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Agree Button Text
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" placeholder="Enter prefix" />
              </Col>
            </Form.Group>

             {/* Invoice Prefix */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Decline Button Text
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="text" placeholder="Enter prefix" />
              </Col>
            </Form.Group>


            {/* Invoice Roundoff */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Show Decline Button
              </Form.Label>
              <Col sm={9}>
                <div className="d-flex align-items-center gap-3">
                  <Form.Check
                    type="switch"
                    checked={invoiceRoundoff}
                    onChange={(e) => setInvoiceRoundoff(e.target.checked)}
                    className="custom-switch-lg"
                  />
                </div>
              </Col>
            </Form.Group>




            {/* Invoice Prefix */}
            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm={3} className="fw-medium">
                Links for Cookies Page
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter prefix" />
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



function PaymentMethods() {
  const [reasons, setReasons] = useState([
    {
      id: 1,
      reason: "Personal Emergency",
      date: "30 Apr 2025",
      status: "Active",
    },
    { id: 2, reason: "Feeling Better", date: "15 Apr 2025", status: "Active" },
    {
      id: 3,
      reason: "Transportation Issues",
      date: "02 Apr 2025",
      status: "Active",
    },
    {
      id: 4,
      reason: "Booked by Mistake",
      date: "27 Mar 2025",
      status: "Active",
    },
    {
      id: 5,
      reason: "Forget Appointment",
      date: "25 Jan 2025",
      status: "Inactive",
    },
  ]);

  const handleAddNewReason = () => {
    console.log("Add new reason clicked");
    // Add logic to open modal or form for new reason
  };

  const handleMenuAction = (reasonId, action) => {
    console.log(`Action: ${action} on reason ID: ${reasonId}`);
    // Add logic for edit, delete, activate/deactivate
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Payment Methods</h5>
       
        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleAddNewReason}
        >
          <FiPlus size={16} className="me-1" />
          New Template
        </Button>
      </div>
      <hr />

      {/* Table */}
      <Table
        hover
        responsive
        className="align-middle border"
        style={{ fontSize: "14px" }}
      >
        <thead
          style={{
            backgroundColor: "#f8f9fa",
          }}
        >
          <tr>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Name
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Created On
            </th>
            <th
              style={{
                fontWeight: 600,
                color: "#495057",
                padding: "12px 16px",
              }}
            >
              Status
            </th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #e9ecef" }}>
              <td style={{ padding: "16px", color: "#495057" }}>
                {item.reason}
              </td>
              <td style={{ padding: "16px", color: "#6c757d" }}>{item.date}</td>
              <td style={{ padding: "16px" }}>
                <Badge
                  pill
                  bg={item.status === "Active" ? "success" : "danger"}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "4px 12px",
                    backgroundColor:
                      item.status === "Active" ? "#28a745" : "#dc3545",
                    color: "#ffffff",
                  }}
                >
                  {item.status}
                </Badge>
              </td>
              <td style={{ padding: "16px", textAlign: "center" }}>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id={`dropdown-${item.id}`}
                    className="p-0"
                    style={{
                      color: "#6c757d",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <FiMoreVertical size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ fontSize: "14px" }}>
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "edit")}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleMenuAction(
                          item.id,
                          item.status === "Active" ? "deactivate" : "activate",
                        )
                      }
                    >
                      {item.status === "Active" ? "Deactivate" : "Activate"}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "delete")}
                      style={{ color: "#dc3545" }}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Empty state - show when no reasons */}
      {reasons.length === 0 && (
        <div className="text-center py-5" style={{ color: "#6c757d" }}>
          <p>No cancellation reasons found.</p>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleAddNewReason}
          >
            <FiPlus size={16} className="me-1" />
            Add First Reason
          </Button>
        </div>
      )}
    </div>
  );
}


function BankAccounts() {
  const [accounts] = useState([
    {
      id: 1,
      name: "Andrew Simons",
      bank: "JPM",
      branch: "New York",
      account: "1832",
      aba: "02100021",
      status: "Active",
    },
    {
      id: 2,
      name: "David Steiger",
      bank: "BofA",
      branch: "Los Angeles",
      account: "1596",
      aba: "121000358",
      status: "Active",
    },
    {
      id: 3,
      name: "Darin Mabry",
      bank: "WFB",
      branch: "Charlotte",
      account: "1982",
      aba: "12100248",
      status: "Active",
    },
    {
      id: 4,
      name: "Mark Neiman",
      bank: "USB",
      branch: "Chicago",
      account: "1645",
      aba: "123000220",
      status: "Inactive",
    },
  ]);

  const handleAddAccount = () => {
    console.log("Add new account");
  };

  const handleMenuAction = (id, action) => {
    console.log(action, id);
  };

  return (
    <div className="p-4 bg-white">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Bank Account</h5>

        <Button
          size="sm"
          style={{ backgroundColor: "#2f3dbd", border: "none" }}
          onClick={handleAddAccount}
        >
          + New Bank Account
        </Button>
      </div>
      <hr/>

      {/* Table */}
      <Table hover responsive className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Bank</th>
            <th>Branch</th>
            <th>Account Number</th>
            <th>ABA Number</th>
            <th>Status</th>
            <th style={{ width: "40px" }}></th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.bank}</td>
              <td>{item.branch}</td>
              <td>**** **** {item.account}</td>
              <td>{item.aba}</td>

              {/* Status Badge */}
              <td>
                <Badge
                  pill
                  className={
                    item.status === "Active"
                      ? "bg-success-subtle text-success border border-success"
                      : "bg-danger-subtle text-danger border border-danger"
                  }
                >
                  {item.status}
                </Badge>
              </td>

              {/* Dropdown */}
              <td className="text-center">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    className="border-0"
                  >
                    ⋮
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleMenuAction(item.id, "edit")}
                    >
                      Edit
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() =>
                        handleMenuAction(
                          item.id,
                          item.status === "Active"
                            ? "Deactivate"
                            : "Activate"
                        )
                      }
                    >
                      {item.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleMenuAction(item.id, "delete")}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}



function TaxRates() {
  const [taxRates] = useState([
    { id: 1, name: "VAT", rate: "10%", created: "30 Apr 2025", status: "Active" },
    { id: 2, name: "CGST", rate: "08%", created: "15 Apr 2025", status: "Active" },
    { id: 3, name: "SGST", rate: "10%", created: "05 Mar 2025", status: "Active" },
  ]);

  const [taxGroups] = useState([
    { id: 1, name: "GST", rate: "18%", created: "20 Mar 2025", status: "Active" },
  ]);

  const handleAction = (id, action) => {
    console.log(action, id);
  };

  return (
    <div className="p-4 bg-white">

      {/* ---------- TAX RATES ---------- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Tax Rates</h5>

        <Button
          size="sm"
          style={{ backgroundColor: "#2f3dbd", border: "none" }}
        >
          + New Bank Account
        </Button>
      </div>
      <hr/>

      <Table bordered hover responsive className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>Tax Name</th>
            <th>Tax Rate</th>
            <th>Created On</th>
            <th>Status</th>
            <th style={{ width: "40px" }}></th>
          </tr>
        </thead>

        <tbody>
          {taxRates.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.rate}</td>
              <td>{item.created}</td>

              <td>
                <Badge
                  pill
                  className="bg-success-subtle text-success border border-success"
                >
                  {item.status}
                </Badge>
              </td>

              <td className="text-center">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    className="border-0"
                  >
                    ⋮
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAction(item.id, "edit")}>
                      Edit
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => handleAction(item.id, "deactivate")}
                    >
                      Deactivate
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleAction(item.id, "delete")}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ---------- TAX GROUP ---------- */}
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
        <h5 className="fw-bold">Tax Group</h5>

        <Button
          size="sm"
          style={{ backgroundColor: "#2f3dbd", border: "none" }}
        >
          + New Tax Group
        </Button>
      </div>
      <hr/>

      <Table bordered hover responsive className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>Tax Name</th>
            <th>Tax Rate</th>
            <th>Created On</th>
            <th>Status</th>
            <th style={{ width: "40px" }}></th>
          </tr>
        </thead>

        <tbody>
          {taxGroups.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.rate}</td>
              <td>{item.created}</td>

              <td>
                <Badge
                  pill
                  className="bg-success-subtle text-success border border-success"
                >
                  {item.status}
                </Badge>
              </td>

              <td className="text-center">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    className="border-0"
                  >
                    ⋮
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAction(item.id, "edit")}>
                      Edit
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => handleAction(item.id, "deactivate")}
                    >
                      Deactivate
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleAction(item.id, "delete")}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
   


function Currencies() {
  const [currencies] = React.useState([
    {
      id: 1,
      currency: "Dollar",
      code: "USD",
      symbol: "$",
      rate: "01",
      status: "Active",
      isDefault: true,
    },
    {
      id: 2,
      currency: "Rupee",
      code: "INR",
      symbol: "₹",
      rate: "86.62",
      status: "Active",
    },
    {
      id: 3,
      currency: "Pound",
      code: "GBP",
      symbol: "£",
      rate: "0.81",
      status: "Active",
    },
    {
      id: 4,
      currency: "Euro",
      code: "EUR",
      symbol: "€",
      rate: "0.96",
      status: "Active",
    },
    {
      id: 5,
      currency: "Dhirams",
      code: "AED",
      symbol: "د.إ",
      rate: "3.67",
      status: "Active",
    },
  ]);

  const handleAddCurrency = () => {
    console.log("Add new currency");
  };

  const handleMenuAction = (id, action) => {
    console.log(action, id);
  };

  return (
    <div className="p-4 bg-white">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Currencies</h5>

        <button
          className="btn btn-sm"
          style={{ backgroundColor: "#2f3dbd", color: "#fff" }}
          onClick={handleAddCurrency}
        >
          + New Currency
        </button>
      </div>

      <hr />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="bg-light">
            <tr>
              <th>Currency</th>
              <th>Code</th>
              <th>Symbol</th>
              <th>Exchange Rate</th>
              <th>Status</th>
              <th style={{ width: "40px" }}></th>
            </tr>
          </thead>

          <tbody>
            {currencies.map((item) => (
              <tr key={item.id}>
                
                {/* Currency Name + Default */}
                <td>
                  {item.currency}
                  {item.isDefault && (
                    <div className="text-primary small fw-semibold">
                      Default
                    </div>
                  )}
                </td>

                <td>{item.code}</td>

                <td>{item.symbol}</td>

                <td>{item.rate}</td>

                {/* Status */}
                <td>
                  <span className="badge rounded-pill bg-success-subtle text-success border border-success">
                    {item.status}
                  </span>
                </td>

                {/* Dropdown */}
                <td className="text-center">
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm border-0"
                      data-bs-toggle="dropdown"
                    >
                      ⋮
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleMenuAction(item.id, "edit")}
                        >
                          Edit
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleMenuAction(
                              item.id,
                              item.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                            )
                          }
                        >
                          {item.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </li>

                      <li><hr className="dropdown-divider" /></li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleMenuAction(item.id, "delete")}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



function Sitemap() {
  const [sitemaps] = React.useState([
    {
      id: 1,
      url: "https://localhost/Preclinic",
      filename: "sitemap18725604.xml",
    },
  ]);

  return (
    <div className="p-4 bg-white">

     {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Sitemap</h5>

        <button
          className="btn btn-sm"
          style={{ backgroundColor: "#2f3dbd", color: "#fff" }}
        >
          + Generate Sitemap
        </button>
      </div>

      <hr />

      {/* Table */}
      <div className="table-responsive">
        <table className="table  table-hover align-middle">
          <thead className="bg-light">
            <tr>
              <th>URL</th>
              <th>Filename</th>
            </tr>
          </thead>

          <tbody>
            {sitemaps.map((item) => (
              <tr key={item.id}>
                <td>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    {item.url}
                  </a>
                </td>

                <td>
                  <a
                    href={`${item.url}/${item.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    {item.filename}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}



function ClearCache() {

  const handleClearCache = () => {
    // Example logic
    console.log("Cache Cleared");

    // You can replace with actual cache clearing logic
    alert("Cache cleared successfully!");
  };

  return (
    <div className="p-4 bg-white">

      {/* Heading */}
      <h5 className="fw-bold mb-3">Clear Cache</h5>
      <hr/>

      {/* Description */}
      <p className="text-muted">
        Clearing the cache may improve performance but will remove temporary
        files, stored preferences, and cached data from websites and
        applications.
      </p>

      {/* Button */}
      <button
        className="btn btn-danger btn-sm"
        onClick={handleClearCache}
      >
        Clear Cache
      </button>

    </div>
  );
}




function Storage() {
  const [localStorageEnabled, setLocalStorageEnabled] = React.useState(true);
  const [awsEnabled, setAwsEnabled] = React.useState(true);

  return (
    <div className="p-4 bg-white">

      {/* Header */}
      <h5 className="fw-bold mb-4">Storage</h5>
      <hr />

      <div className="row g-4">

        {/* Local Storage Card */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
                  alt="local"
                  width="40"
                />
                <h6 className="mb-0 fw-semibold">Local Storage</h6>
              </div>

              {/* Toggle */}
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={localStorageEnabled}
                  onChange={() =>
                    setLocalStorageEnabled(!localStorageEnabled)
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* AWS Storage Card */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center gap-3">
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                alt="AWS"
                width="40"
              />

                <h6 className="mb-0 fw-semibold">AWS</h6>
              </div>

              <div className="d-flex align-items-center gap-3">

                {/* Settings Icon */}
                <button className="btn btn-light btn-sm border">
                  ⚙
                </button>

                {/* Toggle */}
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={awsEnabled}
                    onChange={() => setAwsEnabled(!awsEnabled)}
                  />
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}




function CronjobSettings() {
  const [cronLink, setCronLink] = React.useState("");
  const [interval, setInterval] = React.useState("1 Day 1 Hour");

  const handleSave = () => {
    console.log("Saved:", cronLink, interval);
  };

  const handleRunNow = () => {
    console.log("Cronjob executed manually");
  };

  return (
    <div className="p-4 bg-white">

      {/* Heading */}
      <h5 className="fw-bold mb-3">Cronjob</h5>
      <hr />

      <div className="row g-3">

        {/* Cronjob Link */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Cronjob Link</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter cronjob link"
            value={cronLink}
            onChange={(e) => setCronLink(e.target.value)}
          />
        </div>

        {/* Execution Interval */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Execution Interval
          </label>
          <input
            type="text"
            className="form-control"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </div>

      </div>
      <hr/>

      {/* Buttons */}
      <div className="profile-actions d-flex justify-content-end gap-2">
        <Button variant="light">Cancel</Button>
        <Button className="save-btn">Save Changes</Button>
      </div>

    </div>
  );
}



function BanIPAddress() {
  const [bannedIPs] = React.useState([
    {
      id: 1,
      ip: "211.11.0.25",
      reason: "You can get on-demand services in order to find a nearby service.",
      created: "30 Apr 2025",
    },
    {
      id: 2,
      ip: "211.03.0.11",
      reason: "Extract pricing information at inventory levels.",
      created: "15 Apr 2025",
    },
    {
      id: 3,
      ip: "211.24.0.17",
      reason: "Fetching data for competitors to gain competitive advantage.",
      created: "02 Apr 2025",
    },
    {
      id: 4,
      ip: "211.12.0.34",
      reason:
        "Temporarily block to protect user accounts from internet fraudsters.",
      created: "27 Mar 2025",
    },
  ]);

  const handleAction = (id, action) => {
    console.log(action, id);
  };

  return (
    <div className="p-4 bg-white">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Ban IP Address</h5>
        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          // onClick={handleAddNewip}
        >
          <FiPlus size={16} className="me-1" />
         New Ip Address
        </Button>
      </div>
      <hr/>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="bg-light">
            <tr>
              <th>IP Address</th>
              <th>Reason</th>
              <th>Created On</th>
              <th style={{ width: "40px" }}></th>
            </tr>
          </thead>

          <tbody>
            {bannedIPs.map((item) => (
              <tr key={item.id}>
                <td className="fw-semibold">{item.ip}</td>
                <td>{item.reason}</td>
                <td className="text-muted">{item.created}</td>

                {/* Dropdown Menu */}
                <td className="text-center">
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm border-0"
                      data-bs-toggle="dropdown"
                    >
                      ⋮
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction(item.id, "edit")}
                        >
                          Edit
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleAction(item.id, "delete")}
                        >
                          Remove Ban
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}



function SystemBackup() {
  const [backups] = React.useState([
    {
      id: 1,
      name: "patients_data_backup_2025.txt",
      created: "30 Apr 2025",
    },
    {
      id: 2,
      name: "invoice_records_backup_2024.txt",
      created: "15 Apr 2025",
    },
    {
      id: 3,
      name: "lab_transactions_2024.txt",
      created: "02 Apr 2025",
    },
    {
      id: 4,
      name: "payment_transactions_2024.txt",
      created: "27 Mar 2025",
    },
  ]);

  const handleAction = (id, action) => {
    console.log(action, id);
  };

  const handleGenerateBackup = () => {
    console.log("Generate Backup Clicked");
  };

  return (
    <div className="p-4 bg-white">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">System Backup</h5>

        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleGenerateBackup}
        >
          <FiPlus size={16} className="me-1" />
          Generate Backup
        </Button>
      </div>

      <hr />

      {/* Backup Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Created On</th>
              <th style={{ width: "40px" }}></th>
            </tr>
          </thead>

          <tbody>
            {backups.map((item) => (
              <tr key={item.id}>
                <td className="fw-semibold">{item.name}</td>
                <td className="text-muted">{item.created}</td>

                {/* Dropdown Menu */}
                <td className="text-center">
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm border-0"
                      data-bs-toggle="dropdown"
                    >
                      ⋮
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction(item.id, "download")}
                        >
                          Download
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleAction(item.id, "delete")}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}



function DatabaseBackup() {
  const [backups] = React.useState([
    {
      id: 1,
      name: "patients_data_backup_2025.txt",
      created: "30 Apr 2025",
    },
    {
      id: 2,
      name: "invoice_records_backup_2024.txt",
      created: "15 Apr 2025",
    },
    {
      id: 3,
      name: "lab_transactions_2024.txt",
      created: "02 Apr 2025",
    },
    {
      id: 4,
      name: "payment_transactions_2024.txt",
      created: "27 Mar 2025",
    },
  ]);

  const handleAction = (id, action) => {
    console.log(action, id);
  };

  const handleGenerateBackup = () => {
    console.log("Generate Backup Clicked");
  };

  return (
    <div className="p-4 bg-white">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Database Backup</h5>

        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleGenerateBackup}
        >
          <FiPlus size={16} className="me-1" />
          Generate Backup
        </Button>
      </div>

      <hr />

      {/* Backup Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Created On</th>
              <th style={{ width: "40px" }}></th>
            </tr>
          </thead>

          <tbody>
            {backups.map((item) => (
              <tr key={item.id}>
                <td className="fw-semibold">{item.name}</td>
                <td className="text-muted">{item.created}</td>

                {/* Dropdown Menu */}
                <td className="text-center">
                  <div className="dropdown">
                    <button
                      className="btn btn-light btn-sm border-0"
                      data-bs-toggle="dropdown"
                    >
                      ⋮
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction(item.id, "download")}
                        >
                          Download
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleAction(item.id, "delete")}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}




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
    <div className="p-4 bg-white">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">System Update</h5>

        <Button
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleCheckUpdate}
        >
          Check for Update
        </Button>
      </div>

      <hr />

      {/* Version Info */}
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiCheckCircle color="#4c5fce" size={18} />
          <span className="fw-semibold">You are up to date</span>

          <Badge bg="light" text="primary" className="border">
            Current Version : 8.0
          </Badge>
        </div>

        <small className="text-muted ms-4">
          Last Checked : Today 10:30 AM
        </small>
      </div>

      {/* Info Alert */}
      <Alert variant="light" className="border">
        ℹ️ Before updating, it's best to back up your files and database and
        review the changelog.
      </Alert>

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Purchase Key <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={purchaseKey}
                onChange={(e) => setPurchaseKey(e.target.value)}
                placeholder="Enter Purchase Key"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                User Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter User Name"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

    </div>
  );
}





/* REUSABLE ITEM */
function SettingItem({ title, text, action, danger }) {
  return (
    <div className={`settings-item ${danger ? "danger" : ""}`}>
      <div>
        <h6>{title}</h6>
        <p>{text}</p>
      </div>
      {action}
    </div>
  );
}
