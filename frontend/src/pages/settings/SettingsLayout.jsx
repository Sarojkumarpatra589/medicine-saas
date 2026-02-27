import { Container, Row, Col, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import SettingsSidebar from "./SettingsSidebar";
import "./settings.css";

export default function SettingsLayout() {
  return (
    <Container fluid className="settings-page px-4 my-4">

      {/* Top Settings Bar */}
      <div className="box_shadow bg-white  p-3 mb-3 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Settings</h5>

        <Button className="button">
          <FiSave className="me-2" />
          Save Settings
        </Button>
      </div>

      {/* Main Layout */}
      <Row className="settings-wrapper bg-white p-3 border  box_shadow">
        
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