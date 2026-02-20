// Subscription.jsx
import React from "react";
import "./style.css";

const MySubscription = () => {
  return (
    <div className="subscription-wrapper">
      <h2>Subscription Details</h2>

      {/* Current Plan Card */}
      <div className="plan-card">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div className="d-flex align-items-center gap-3">
            <span className="plan-title">Current Plan: Standard (Yearly)</span>
            <span className="badge-active">Active</span>
          </div>
          <div className="d-flex gap-2">
            <button className="btn-upgrade">Upgrade Plan</button>
            <button className="btn-cancel">Cancel Subscription</button>
          </div>
        </div>

        <div className="plan-meta row g-2">
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span>📋</span>
              <span className="label">Start Date:</span>
              <span className="value">Jan 15, 2023</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>✅</span>
              <span className="label">Auto-Renewal:</span>
              <span className="auto-on">On</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span>📅</span>
              <span className="label">Expiry Date:</span>
              <span className="value">Jan 15, 2024</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span>💰</span>
              <span className="label">Plan Price:</span>
              <span className="value">₹ 9,999 / Year</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>🔄</span>
              <span className="label">Next Billing Amount:</span>
              <span className="value">₹ 9,999 on Jan 15, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Features & User Storage */}
      <div className="row g-3 mb-3">
        {/* Plan Features */}
        <div className="col-md-7">
          <div className="section-card">
            <h5>Plan Features</h5>
            <div className="row">
              <div className="col-6">
                {[
                  "Inventory Management",
                  "Batch & Expiry Tracking",
                  "Sales & Billing Module",
                ].map((f) => (
                  <div className="feature-item" key={f}>
                    <span className="check-icon">✅</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div className="col-6">
                {[
                  "Batch & Expiry Tracking",
                  "Sales & Billing Module",
                  "GST Invoice Generation",
                ].map((f) => (
                  <div className="feature-item" key={f + "_r"}>
                    <span className="check-icon">✅</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User & Storage Limits */}
        <div className="col-md-5">
          <div className="section-card">
            <h5>User &amp; Storage Limits</h5>
            <div className="row">
              <div className="col-6">
                <div className="limit-item">
                  <span className="limit-icon">👤</span>
                  <span>Admin Users: <span className="limit-val">2</span></span>
                </div>
                <div className="limit-item">
                  <span className="limit-icon">👥</span>
                  <span>Staff Allowed: <span className="limit-val">5</span></span>
                </div>
                <div className="limit-item">
                  <span className="limit-icon">📧</span>
                  <span>Data Storage: <span className="limit-val">10 GB</span></span>
                </div>
              </div>
              <div className="col-6">
                <div className="limit-item">
                  <span className="limit-icon">💾</span>
                  <span>Data Storage: <span className="limit-val">10 GB</span></span>
                </div>
                <div className="limit-item">
                  <span className="limit-icon">🔄</span>
                  <span>Backup: <span className="limit-val">Daily</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History & Support */}
      <div className="row g-3 mb-3">
        {/* Payment History */}
        <div className="col-md-7">
          <div className="section-card">
            <h5>Payment History</h5>
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>INV-10234</td>
                  <td>Feb 15, 2023</td>
                  <td>₹ 9,999</td>
                  <td><span className="badge-paid">Paid</span></td>
                </tr>
              </tbody>
            </table>
            <button className="btn-download">⬇ Download Invoice</button>
            <div style={{ clear: "both" }} />
          </div>
        </div>

        {/* Support & Assistance */}
        <div className="col-md-5">
          <div className="section-card">
            <h5>Support &amp; Assistance</h5>
            <div className="support-item">
              <span>💬</span>
              <span>Support: <span className="sup-val">Email &amp; Chat</span></span>
            </div>
            <div className="support-item">
              <span>🕐</span>
              <span>Availability: <span className="sup-val">24/7</span></span>
            </div>
            <div className="support-item">
              <span>📍</span>
              <span>Priority Support: <span className="priority-yes">Yes</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-bar">
        <button className="btn-renew">✅ Renew Subscription</button>
        <button className="btn-autorenew">⏸ Turn Off Auto-Renew</button>
        <button className="btn-contact">💬 Contact Support</button>
        <button className="btn-help">❓ Help ▾</button>
      </div>

      {/* Footer */}
      <div className="footer-links">
        <a href="#">Terms &amp; Conditions</a>
        <span>|</span>
        <a href="#">Refund Policy</a>
        <span>|</span>
        <a href="#">License: Single Store</a>
      </div>
    </div>
  );
};

export default MySubscription;