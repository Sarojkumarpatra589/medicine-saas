import React from "react";

const Storage = () => {
  const [localStorageEnabled, setLocalStorageEnabled] = React.useState(true);
  const [awsEnabled, setAwsEnabled] = React.useState(true);

  return (
    <div className="p-4 bg-white">
      <h5 className="fw-bold mb-4">Storage</h5>
      <hr />

      <div className="row g-4">
        {/* Local Storage */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="fw-semibold">Local Storage</h6>

              <input
                type="checkbox"
                checked={localStorageEnabled}
                onChange={() =>
                  setLocalStorageEnabled(!localStorageEnabled)
                }
              />
            </div>
          </div>
        </div>

        {/* AWS */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="fw-semibold">AWS Storage</h6>

              <input
                type="checkbox"
                checked={awsEnabled}
                onChange={() => setAwsEnabled(!awsEnabled)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
