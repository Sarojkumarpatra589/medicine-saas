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
    <div className="saas-card">

  {/* Card Header */}
  <div className="saas-card-header d-flex justify-content-between align-items-center">
   <h5 className="fw-bold ">Cancellation Reason</h5>
      
    <Button
      size="sm"
      className="button"
      onClick={handleAddNewReason}
    >
      <FiPlus className="me-1" /> New Reason
    </Button>
  </div>
  <hr className="mb-4" />

  {/* Table */}
  <div className="saas-table-wrapper">
    <Table hover responsive className="align-middle saas-table mb-0">
      <thead>
        <tr>
          <th>Reason</th>
          <th>Date</th>
          <th>Status</th>
          <th className="text-end" style={{ width: "60px" }}></th>
        </tr>
      </thead>

      <tbody>
        {reasons.map((item) => (
          <tr key={item.id}>
            <td className="fw-medium">{item.reason}</td>

            <td className="text-muted small">{item.date}</td>

            <td>
              <Badge
                pill
                bg={item.status === "Active" ? "success" : "secondary"}
              >
                {item.status}
              </Badge>
            </td>

            <td className="text-end">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  className="saas-dot-btn"
                >
                  <FiMoreVertical size={16} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="saas-dropdown">
                  <Dropdown.Item onClick={() => handleMenuAction(item.id, "edit")}>
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

</div>
  );
}

export default CancellationReasonTab;
