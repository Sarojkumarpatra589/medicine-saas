// src/pages/dashboard/Dashboard.jsx
export default function Dashboard() {
  return (
    <>
      <h2>Overview</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Total Sales</h6>
              <h4>₹1,25,000</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Medicines</h6>
              <h4>320</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Customers</h6>
              <h4>150</h4>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h6>Low Stock</h6>
              <h4 className="text-danger">12</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5>Recent Activity</h5>
          <ul>
            <li>Invoice #1023 generated</li>
            <li>Paracetamol stock updated</li>
            <li>New customer added</li>
            <li>Monthly report downloaded</li>
          </ul>
        </div>
      </div>
    </>
  );
}
