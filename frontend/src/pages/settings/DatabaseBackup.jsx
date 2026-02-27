import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

function DatabaseBackup() {
  const [backups, setBackups] = useState([
    { id: 1, name: "patients_data_backup_2025.txt", created: "30 Apr 2025" },
    { id: 2, name: "invoice_records_backup_2024.txt", created: "15 Apr 2025" },
    { id: 3, name: "lab_transactions_2024.txt", created: "02 Apr 2025" },
    { id: 4, name: "payment_transactions_2024.txt", created: "27 Mar 2025" },
  ]);

  const handleAction = (id, action) => {
    if (action === "delete") {
      setBackups((prev) => prev.filter((item) => item.id !== id));
    }

    console.log(action, id);
  };

  const handleGenerateBackup = () => {
    console.log("Generate Backup Clicked");
  };

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Database Backup</h5>

          <Button className="button" onClick={handleGenerateBackup}>
            <FiPlus size={16} className="me-1" />
            Generate Backup
          </Button>
        </div>

        <hr />

        {/* Table */}
        <div className="saas-table-wrapper">
          <Row>
            <Col>
              <Table
                hover
                responsive
                className="align-middle saas-table mb-0"
              >
                <thead>
                  <tr>
                    <th>Backup Name</th>
                    <th>Created On</th>
                    <th
                      className="text-end"
                      style={{ width: "60px" }}
                    ></th>
                  </tr>
                </thead>

                <tbody>
                  {backups.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">
                        {item.name}
                      </td>

                      <td className="text-muted">
                        {item.created}
                      </td>

                      {/* 3-dot menu */}
                      <td className="text-end">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            className="saas-dot-btn"
                          >
                            ⋮
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="saas-dropdown">
                            <Dropdown.Item
                              onClick={() =>
                                handleAction(item.id, "download")
                              }
                            >
                              Download
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item
                              className="text-danger"
                              onClick={() =>
                                handleAction(item.id, "delete")
                              }
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}

                  {backups.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-muted">
                        No backups available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>

      </div>
    </Container>
  );
}

export default DatabaseBackup;