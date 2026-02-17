import React, { useState } from "react";
import { Button, Table, Badge, Dropdown } from "react-bootstrap";
import { FiPlus, FiMoreVertical } from "react-icons/fi";

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
  };

  const handleMenuAction = (reasonId, action) => {
    console.log(`Action: ${action} on reason ID: ${reasonId}`);

    if (action === "delete") {
      setReasons(reasons.filter((item) => item.id !== reasonId));
    }

    if (action === "activate" || action === "deactivate") {
      setReasons(
        reasons.map((item) =>
          item.id === reasonId
            ? {
                ...item,
                status: action === "activate" ? "Active" : "Inactive",
              }
            : item
        )
      );
    }
  };

  return (
    <div  style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Cancellation Reason</h5>

        <Button
          size="sm"
          style={{ backgroundColor: "#4c5fce", border: "none" }}
          onClick={handleAddNewReason}
        >
          <FiPlus className="me-1" /> New Reason
        </Button>
      </div>

      <hr />

      {/* Table */}
      <Table hover responsive className="align-middle border">
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ width: "50px" }}></th>
          </tr>
        </thead>

        <tbody>
          {reasons.map((item) => (
            <tr key={item.id}>
              <td>{item.reason}</td>

              <td className="text-muted">{item.date}</td>

              <td>
                <Badge
                  pill
                  bg={item.status === "Active" ? "success" : "danger"}
                >
                  {item.status}
                </Badge>
              </td>

              <td className="text-center">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    className="p-0 text-muted"
                    style={{ boxShadow: "none" }}
                  >
                    <FiMoreVertical size={18} />
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
                            ? "deactivate"
                            : "activate"
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

      {/* Empty State */}
      {reasons.length === 0 && (
        <div className="text-center py-5 text-muted">
          <p>No cancellation reasons found.</p>

          <Button variant="outline-primary" size="sm" onClick={handleAddNewReason}>
            <FiPlus className="me-1" /> Add First Reason
          </Button>
        </div>
      )}
    </div>
  );
}

export default CancellationReasonTab;
