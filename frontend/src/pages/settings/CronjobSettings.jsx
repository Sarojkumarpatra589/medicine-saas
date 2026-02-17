import React from "react";
import { Button } from "react-bootstrap";

const CronjobSettings = () => {
  const [cronLink, setCronLink] = React.useState("");
  const [interval, setInterval] = React.useState("1 Day 1 Hour");

  const handleSave = () => {
    console.log("Saved:", cronLink, interval);
  };

  return (
    <div className="p-4 bg-white">
      <h5 className="fw-bold mb-3">Cronjob</h5>
      <hr />

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Cronjob Link</label>
          <input
            className="form-control"
            value={cronLink}
            onChange={(e) => setCronLink(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Execution Interval</label>
          <input
            className="form-control"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="light">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default CronjobSettings;
