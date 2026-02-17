import React from "react";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

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
    <div className=" bg-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Ban IP Address</h5>
        <Button
          variant="primary"
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
        >
          <FiPlus size={16} className="me-1" />
          New Ip Address
        </Button>
      </div>
      <hr />

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

export default BanIPAddress;
