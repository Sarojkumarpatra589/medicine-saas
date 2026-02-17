import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import "./settings.css";

export default function SettingsLayout() {
  return (
    <Container fluid className="settings-page">

      <div className="settings-header">
        <h3 className="fw-bold">Settings</h3>
      </div>

      <Row className="settings-wrapper bg-white p-3 border rounded-3 shadow-sm">
        
        {/* Sidebar */}
        <Col lg={2} className="border-end">
          <SettingsSidebar />
        </Col>

        {/* Content */}
        <Col lg={10}>
          <Outlet />
        </Col>

      </Row>
    </Container>
  );
}
