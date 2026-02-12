import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Alert, ButtonGroup } from 'react-bootstrap';
import { 
  FiShield, 
  FiCheck, 
  FiX, 
  FiArrowLeft, 
  FiEye, 
  FiEdit, 
  FiPlusCircle, 
  FiTrash,
  FiSave,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Permissions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { roleId, roleName } = location.state || { roleId: null, roleName: 'Unknown Role' };
  
  const [showAlert, setShowAlert] = useState(false);
  const [permissions, setPermissions] = useState({
    dashboard: {
      label: 'Dashboard',
      icon: '📊',
      view: true,
      create: false,
      edit: false,
      delete: false
    },
    users: {
      label: 'Users Management',
      icon: '👥',
      view: true,
      create: true,
      edit: true,
      delete: false
    },
    patients: {
      label: 'Patient Records',
      icon: '🏥',
      view: true,
      create: true,
      edit: true,
      delete: false
    },
    appointments: {
      label: 'Appointments',
      icon: '📅',
      view: true,
      create: true,
      edit: true,
      delete: true
    },
    roles: {
      label: 'Roles & Permissions',
      icon: '🔐',
      view: true,
      create: false,
      edit: false,
      delete: false
    },
    billing: {
      label: 'Billing & Invoices',
      icon: '💳',
      view: true,
      create: false,
      edit: true,
      delete: false
    },
    reports: {
      label: 'Reports & Analytics',
      icon: '📈',
      view: true,
      create: true,
      edit: true,
      delete: true
    },
    settings: {
      label: 'System Settings',
      icon: '⚙️',
      view: true,
      create: false,
      edit: true,
      delete: false
    }
  });

  const handlePermissionChange = (module, action) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action]
      }
    }));
  };

  const handleSelectAll = (action) => {
    setPermissions(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(module => {
        updated[module][action] = true;
      });
      return updated;
    });
  };

  const handleDeselectAll = (action) => {
    setPermissions(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(module => {
        updated[module][action] = false;
      });
      return updated;
    });
  };

  const handleSave = () => {
    console.log('Permissions saved for role:', roleName, permissions);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate(-1);
    }, 2000);
  };

  const getPermissionCount = (module) => {
    const perms = permissions[module];
    return ['view', 'create', 'edit', 'delete'].filter(action => perms[action]).length;
  };

  const actionConfig = {
    view: { icon: FiEye, color: 'primary', label: 'View' },
    create: { icon: FiPlusCircle, color: 'success', label: 'Create' },
    edit: { icon: FiEdit, color: 'warning', label: 'Edit' },
    delete: { icon: FiTrash, color: 'danger', label: 'Delete' }
  };

  const gradientStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  };

  const iconLargeStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const moduleIconStyle = {
    fontSize: '1.8rem',
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '10px'
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <Container fluid className="py-4">
        {/* Success Alert */}
        {showAlert && (
          <Alert variant="success" className="d-flex align-items-center mb-4 shadow-sm">
            <FiCheckCircle size={20} className="me-2" />
            <span>Permissions updated successfully for <strong>{roleName}</strong>!</span>
          </Alert>
        )}

        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm" style={gradientStyle}>
              <Card.Body className="py-4">
                <div className="d-flex align-items-center gap-3">
                  <Button 
                    variant="light" 
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="d-flex align-items-center gap-2"
                  >
                    <FiArrowLeft /> Back
                  </Button>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-3">
                      <div style={iconLargeStyle}>
                        <FiShield size={32} />
                      </div>
                      <div>
                        <h3 className="mb-1 fw-bold">Permissions Management</h3>
                        <p className="mb-0" style={{ opacity: 0.9 }}>
                          Configure access control for <Badge bg="light" text="dark" className="ms-1 px-3 py-2">{roleName}</Badge>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

    

        {/* Permissions Table */}
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom py-3">
                <Row className="align-items-center">
                  <Col md={4}>
                    <h5 className="mb-0 fw-semibold">Module Permissions</h5>
                  </Col>
                  <Col md={8}>
                    <div className="d-flex gap-2 justify-content-end flex-wrap">
                      {Object.keys(actionConfig).map(action => {
                        const ActionIcon = actionConfig[action].icon;
                        return (
                          <ButtonGroup key={action} size="sm">
                            <Button 
                              variant="outline-secondary"
                              onClick={() => handleSelectAll(action)}
                              title={`Select all ${action}`}
                            >
                              <FiCheck size={12} /> All {actionConfig[action].label}
                            </Button>
                            <Button 
                              variant="outline-secondary"
                              onClick={() => handleDeselectAll(action)}
                              title={`Deselect all ${action}`}
                            >
                              <FiX size={12} />
                            </Button>
                          </ButtonGroup>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4 fw-semibold" style={{ width: '30%' }}>Module</th>
                        <th className="text-center fw-semibold" style={{ width: '15%' }}>
                          <div className="d-flex flex-column align-items-center gap-1">
                            <FiEye size={18} className="text-primary" />
                            <small>View</small>
                          </div>
                        </th>
                        <th className="text-center fw-semibold" style={{ width: '15%' }}>
                          <div className="d-flex flex-column align-items-center gap-1">
                            <FiPlusCircle size={18} className="text-success" />
                            <small>Create</small>
                          </div>
                        </th>
                        <th className="text-center fw-semibold" style={{ width: '15%' }}>
                          <div className="d-flex flex-column align-items-center gap-1">
                            <FiEdit size={18} className="text-warning" />
                            <small>Edit</small>
                          </div>
                        </th>
                        <th className="text-center fw-semibold" style={{ width: '15%' }}>
                          <div className="d-flex flex-column align-items-center gap-1">
                            <FiTrash size={18} className="text-danger" />
                            <small>Delete</small>
                          </div>
                        </th>
                        <th className="text-center pe-4 fw-semibold" style={{ width: '10%' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(permissions).map((module) => {
                        const permCount = getPermissionCount(module);
                        return (
                          <tr key={module}>
                            <td className="ps-4 align-middle">
                              <div className="d-flex align-items-center gap-3">
                                <div style={moduleIconStyle}>
                                  <span>{permissions[module].icon}</span>
                                </div>
                                <div>
                                  <div className="fw-semibold">{permissions[module].label}</div>
                                  <small className="text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>
                                    {module}
                                  </small>
                                </div>
                              </div>
                            </td>
                            {['view', 'create', 'edit', 'delete'].map((action) => (
                              <td key={action} className="text-center align-middle">
                                <div className="d-flex justify-content-center">
                                  <Form.Check
                                    type="switch"
                                    id={`${module}-${action}`}
                                    checked={permissions[module][action]}
                                    onChange={() => handlePermissionChange(module, action)}
                                    style={{ transform: 'scale(1.3)' }}
                                  />
                                </div>
                              </td>
                            ))}
                            <td className="text-center align-middle pe-4">
                              <Badge 
                                bg={permCount === 4 ? 'success' : permCount > 0 ? 'warning' : 'secondary'}
                                className="px-3 py-2 fw-semibold"
                                style={{ fontSize: '0.85rem' }}
                              >
                                {permCount}/4
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>



        {/* Action Buttons */}
        <Row className="mt-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <FiAlertCircle size={16} className="text-muted" />
                    <small className="text-muted">
                      Make sure to save your changes before leaving this page
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => navigate(-1)}
                      className="px-4"
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={handleSave}
                      className="d-flex align-items-center gap-2 px-4"
                    >
                      <FiSave /> Save Changes
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Permissions;