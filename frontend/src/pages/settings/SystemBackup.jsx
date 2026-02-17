import React from "react";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

function SystemBackup() {
  const [backups] = React.useState([
    { id: 1, name: "patients_data_backup_2025.txt", created: "30 Apr 2025" },
    { id: 2, name: "invoice_records_backup_2024.txt", created: "15 Apr 2025" },
    { id: 3, name: "lab_transactions_2024.txt", created: "02 Apr 2025" },
    { id: 4, name: "payment_transactions_2024.txt", created: "27 Mar 2025" },
  ]);

  const handleAction = (id, action) => {
    console.log(action, id);
  };

  const handleGenerateBackup = () => {
    console.log("Generate Backup Clicked");
  };

  return (
    <div className="p-4 bg-white">
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

export default SystemBackup;
