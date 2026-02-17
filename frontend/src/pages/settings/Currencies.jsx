import React, { useState } from "react";
import { Badge } from "react-bootstrap";

function Currencies() {
  const [currencies] = useState([
    { id: 1, currency: "Dollar", code: "USD", symbol: "$", rate: "1", status: "Active", isDefault: true },
    { id: 2, currency: "Rupee", code: "INR", symbol: "₹", rate: "86.62", status: "Active" },
  ]);

  return (
    <div className="p-4 bg-white">
      <div className="d-flex justify-content-between mb-3">
        <h5 className="fw-bold">Currencies</h5>

        <button className="btn btn-sm btn-primary">
          + New Currency
        </button>
      </div>

      <hr />

      <table className="table table-hover">
        <thead className="bg-light">
          <tr>
            <th>Currency</th>
            <th>Code</th>
            <th>Symbol</th>
            <th>Rate</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {currencies.map((item) => (
            <tr key={item.id}>
              <td>
                {item.currency}
                {item.isDefault && (
                  <div className="text-primary small">Default</div>
                )}
              </td>

              <td>{item.code}</td>
              <td>{item.symbol}</td>
              <td>{item.rate}</td>

              <td>
                <Badge bg="success">{item.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Currencies;
