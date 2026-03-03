import React, { useState, useMemo } from "react";
import "./style.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
  Alert,
} from "react-bootstrap";
import { FiArrowLeft, FiSave, FiCheckCircle } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const ACTIONS = ["view", "create", "edit", "delete"];

const toggleColors = {
  view: "#3B82F6",
  create: "#22C55E",
  edit: "#F59E0B",
  delete: "#F43F5E",
};
function StatCard({ label, value, sub, badge, theme = "blue" }) {
  return (
    <div className={`mc box_shadow mc-${theme}`}>
      <div className="mc-top">
        <div>
          <div className="mc-lbl">{label}</div>
          <div className="mc-val">{value}</div>
          {sub && <div className="mc-sub">{sub}</div>}
        </div>
      </div>

      <div className="mc-bottom">
        {badge && <span className="mc-tag">{badge}</span>}
      </div>
    </div>
  );
}
const Permissions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roleName } = location.state || { roleName: "Unknown Role" };

  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [accessFilter, setAccessFilter] = useState("all");

  const [viewFilter, setViewFilter] = useState("all");
  const [createFilter, setCreateFilter] = useState("all");
  const [editFilter, setEditFilter] = useState("all");
  const [deleteFilter, setDeleteFilter] = useState("all");

  const [permissions, setPermissions] = useState({
    dashboard: { label: "Dashboard", icon: "📊", view: true, create: false, edit: false, delete: false },
    users: { label: "Users Management", icon: "👥", view: true, create: true, edit: true, delete: false },
    patients: { label: "Patient Records", icon: "🏥", view: true, create: true, edit: true, delete: false },
    appointments: { label: "Appointments", icon: "📅", view: true, create: true, edit: true, delete: true },
    roles: { label: "Roles & Permissions", icon: "🔐", view: true, create: false, edit: false, delete: false },
    billing: { label: "Billing & Invoices", icon: "💳", view: true, create: false, edit: true, delete: false },
    reports: { label: "Reports & Analytics", icon: "📈", view: true, create: true, edit: true, delete: true },
    settings: { label: "System Settings", icon: "⚙️", view: true, create: false, edit: true, delete: false },
  });

  const handlePermissionChange = (module, action) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };
const [tempSearch, setTempSearch] = useState(searchTerm);
const [tempView, setTempView] = useState(viewFilter);
const [tempCreate, setTempCreate] = useState(createFilter);
const [tempEdit, setTempEdit] = useState(editFilter);
const [tempDelete, setTempDelete] = useState(deleteFilter);
const [tempAccess, setTempAccess] = useState(accessFilter);
  const getPermissionCount = (module) =>
    ACTIONS.filter((a) => permissions[module][a]).length;

  const totalGranted = useMemo(() => {
    return Object.keys(permissions).reduce(
      (acc, module) => acc + getPermissionCount(module),
      0
    );
  }, [permissions]);

  const totalPossible = Object.keys(permissions).length * 4;

  const filteredModules = useMemo(() => {
    return Object.keys(permissions).filter((module) => {
      const permCount = getPermissionCount(module);
      const moduleData = permissions[module];

      const matchesSearch =
        moduleData.label.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAccess =
        accessFilter === "all" ||
        (accessFilter === "full" && permCount === 4) ||
        (accessFilter === "partial" && permCount > 0 && permCount < 4) ||
        (accessFilter === "none" && permCount === 0);

      const matchesView =
        viewFilter === "all" ||
        permissions[module].view.toString() === viewFilter;

      const matchesCreate =
        createFilter === "all" ||
        permissions[module].create.toString() === createFilter;

      const matchesEdit =
        editFilter === "all" ||
        permissions[module].edit.toString() === editFilter;

      const matchesDelete =
        deleteFilter === "all" ||
        permissions[module].delete.toString() === deleteFilter;

      return (
        matchesSearch &&
        matchesAccess &&
        matchesView &&
        matchesCreate &&
        matchesEdit &&
        matchesDelete
      );
    });
  }, [
    permissions,
    searchTerm,
    accessFilter,
    viewFilter,
    createFilter,
    editFilter,
    deleteFilter,
  ]);

  const handleSave = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate(-1);
    }, 1500);
  };

  return (
    <div style={{ background: "#F7F8FA", minHeight: "100vh", padding: "20px 10px" }}>
      <Container>

        {showAlert && (
          <Alert variant="dark" className="d-flex align-items-center box_shadow">
            <FiCheckCircle className="me-2 text-success" />
            Permissions saved for <strong className="ms-1">{roleName}</strong>
          </Alert>
        )}

        {/* Header */}
        <Row className="mb-4 bg-white box_shadow p-3 mx-1">
          <Col className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="fw-bold mb-1">Permissions</h4>
            </div>
            <Badge bg="dark" className="px-3 py-2 ">
              {roleName}
            </Badge>
          </Col>
        </Row>

        {/* METRIC CARDS */}
<div className="metrics-row">
  <StatCard
    label="Granted"
    value={totalGranted}
    sub="active permissions"
    badge="Enabled"
    theme="emerald"
  />

  <StatCard
    label="Restricted"
    value={totalPossible - totalGranted}
    sub="blocked access"
    badge="Limited"
    theme="amber"
  />

  <StatCard
    label="Coverage"
    value={`${Math.round((totalGranted / totalPossible) * 100)}%`}
    sub="overall access"
    badge="Role scope"
    theme="blue"
  />

  <StatCard
    label="Total Possible"
    value={totalPossible}
    sub="all permissions"
    badge="System"
    theme="violet"
  />
</div>
{/* Compact Permission Table */}
<div className="box_shadow"
  style={{
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
  }}
>
  <div className="table-responsive ">
    <Table 
      hover
      className="align-middle my-4"
      style={{ fontSize: "14px" }}
    >
      <thead style={{ background: "#f9fafb" }}>
        
        {/* Filter Row */}
<tr style={{ borderBottom: "1px solid #e5e7eb" }}>
  {/* Search */}
  <th className="ps-4 py-3">
    <Form.Control
      size="sm"
      placeholder="Search module..."
      value={tempSearch}
      onChange={(e) => setTempSearch(e.target.value)}
      style={{
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
      }}
    />
  </th>

  {/* Action Filters */}
  {ACTIONS.map((action) => (
    <th key={action} className="text-center py-3">
      <Form.Select
        size="sm"
        value={
          action === "view"
            ? tempView
            : action === "create"
            ? tempCreate
            : action === "edit"
            ? tempEdit
            : tempDelete
        }
        onChange={(e) => {
          const value = e.target.value;
          if (action === "view") setTempView(value);
          if (action === "create") setTempCreate(value);
          if (action === "edit") setTempEdit(value);
          if (action === "delete") setTempDelete(value);
        }}
        style={{
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
        }}
      >
        <option value="all">All</option>
        <option value="true">Has</option>
        <option value="false">No</option>
      </Form.Select>
    </th>
  ))}

  {/* Access + Apply */}
  <th className="pe-4 py-3">
    <div className="d-flex gap-2 justify-content-end">
      <Form.Select
        size="sm"
        value={tempAccess}
        onChange={(e) => setTempAccess(e.target.value)}
        style={{
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
        }}
      >
        <option value="all">All</option>
        <option value="full">Full</option>
        <option value="partial">Partial</option>
        <option value="none">None</option>
      </Form.Select>

      <Button
        size="sm"
        variant="dark"
        onClick={() => {
          setSearchTerm(tempSearch);
          setViewFilter(tempView);
          setCreateFilter(tempCreate);
          setEditFilter(tempEdit);
          setDeleteFilter(tempDelete);
          setAccessFilter(tempAccess);
        }}
        style={{
          borderRadius: "6px",
          padding: "4px 14px",
        }}
      >
        Apply
      </Button>
    </div>
  </th>
</tr>

        {/* Column Labels */}
        <tr style={{ fontSize: "12px", letterSpacing: "0.4px" }}>
          <th className="ps-4 py-2 text-muted fw-semibold">
            MODULE
          </th>

          {ACTIONS.map((action) => (
            <th
              key={action}
              className="text-center py-2 text-muted fw-semibold"
            >
              {action.toUpperCase()}
            </th>
          ))}

          <th className="text-center pe-4 py-2 text-muted fw-semibold">
            ACCESS
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredModules.map((module) => {
          const permCount = getPermissionCount(module);

          return (
            <tr
              key={module}
              style={{ transition: "background 0.2s ease" }}
            >
              {/* Module Column */}
              <td className="ps-4 py-2">
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {permissions[module].icon}
                  </div>

                  <div>
                    <div className="fw-semibold">
                      {permissions[module].label}
                    </div>
                    <small className="text-muted text-uppercase">
                      {module}
                    </small>
                  </div>
                </div>
              </td>

              {/* Toggles */}
              {ACTIONS.map((action) => (
                <td key={action} className="text-center">
                  <Form.Check
                    type="switch"
                    checked={permissions[module][action]}
                    onChange={() =>
                      handlePermissionChange(module, action)
                    }
                    style={{
                      transform: "scale(1.05)",
                      cursor: "pointer",
                    }}
                  />
                </td>
              ))}

              {/* Access Indicator */}
              <td className="text-center pe-4">
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    background:
                      permCount === 4
                        ? "#ecfdf5"
                        : permCount > 0
                        ? "#fffbeb"
                        : "#f3f4f6",
                    color:
                      permCount === 4
                        ? "#047857"
                        : permCount > 0
                        ? "#b45309"
                        : "#6b7280",
                  }}
                >
                  {permCount}/4
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
</div>

        {/* Footer */}
        <Row className="mt-3">
          <Col className="d-flex justify-content-between">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="me-2" />
              Back
            </Button>

            <Button
              size="sm"
              onClick={handleSave}
              style={{ background: "#3B82F6", border: "none" }}
            >
              <FiSave className="me-2" />
              Save
            </Button>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default Permissions;