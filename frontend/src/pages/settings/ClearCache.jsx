import React from "react";
import { Container, Button } from "react-bootstrap";

const ClearCache = () => {
  const handleClearCache = () => {
    console.log("Cache Cleared");
    alert("Cache cleared successfully!");
  };

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header">
          <h5 className="mb-0 fw-bold">Clear Cache</h5>
        </div>

        <hr />

        {/* Content */}
        <div className="p-3">
          <p className="text-muted mb-4">
            Clearing cache removes temporary files and stored preferences.
            This helps refresh system data and fix minor performance issues.
          </p>

          <Button
            variant="danger"
            className="button"
            onClick={handleClearCache}
          >
            Clear Cache
          </Button>
        </div>

      </div>
    </Container>
  );
};

export default ClearCache;