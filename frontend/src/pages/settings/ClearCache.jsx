import React from "react";

const ClearCache = () => {
  const handleClearCache = () => {
    console.log("Cache Cleared");
    alert("Cache cleared successfully!");
  };

  return (
    <div className="p-4 bg-white">
      <h5 className="fw-bold mb-3">Clear Cache</h5>
      <hr />

      <p className="text-muted">
        Clearing cache removes temporary files and stored preferences.
      </p>

      <button className="btn btn-danger btn-sm" onClick={handleClearCache}>
        Clear Cache
      </button>
    </div>
  );
};

export default ClearCache;
