import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SubscriptionPlan = () => {
  return (
    <div className="pricing-page">

      <style>{`

      .pricing-header {
        background: linear-gradient(135deg,#6C8BE8,#5B6ED6);
        padding: 80px 20px 120px;
        text-align: center;
        color: white;
      }

      .pricing-cards {
        margin-top: -90px;
        padding-bottom: 60px;
      }

      .pricing-card {
        background: white;
        border-radius: 12px;
        padding: 25px;
        text-align: center;
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        transition: 0.3s;
        height: 100%;
        position: relative;
      }

      .pricing-card:hover {
        transform: translateY(-6px);
      }

      .popular-badge {
        position: absolute;
        top: -12px;
        right: 20px;
        background: #FF8C69;
        color: white;
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 20px;
        font-weight: 600;
      }

      .plan-title {
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: 700;
        color: #6C8BE8;
        margin-bottom: 15px;
      }

      .plan-icon {
        width: 60px;
        height: 60px;
        background: #EEF2FF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        font-size: 24px;
        margin-bottom: 15px;
      }

      .price {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .price small {
        font-size: 12px;
        color: gray;
      }

      .feature-list {
        list-style: none;
        padding: 0;
        margin: 20px 0;
        font-size: 13px;
        color: #555;
        text-align: left;
      }

      .feature-list li {
        margin-bottom: 10px;
      }

      .subscribe-btn {
        width: 100%;
        border-radius: 6px;
        border: 1px solid #6C8BE8;
        background: transparent;
        color: #6C8BE8;
        font-weight: 600;
        padding: 8px;
        transition: 0.3s;
      }

      .subscribe-btn:hover {
        background: #6C8BE8;
        color: white;
      }

      `}</style>

      {/* Header */}
      <div className="pricing-header">
        <h2>Flexible Pharmacy Plans</h2>
        <p>Choose the right software plan for your pharmacy business</p>
      </div>

      {/* Pricing Cards */}
      <div className="container pricing-cards">
        <div className="row g-4">

          {/* FREE PLAN */}
          <div className="col-md-4">
            <div className="pricing-card">
              <div className="plan-title">FREE TRIAL</div>

              <div className="plan-icon">🧾</div>

              <div className="price">
                ₹0 <small>/ month</small>
              </div>

              <ul className="feature-list">
                <li>✔ Basic Billing</li>
                <li>✔ Inventory Management (Limited)</li>
                <li>✔ 1 User Access</li>
                <li>✔ 100 Products Limit</li>
                <li>✔ Email Support</li>
              </ul>

              <button className="subscribe-btn">START FREE</button>
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="col-md-4">
            <div className="pricing-card">
              <div className="popular-badge">MOST POPULAR</div>

              <div className="plan-title">PRO PHARMACY</div>

              <div className="plan-icon">💊</div>

              <div className="price">
                ₹799 <small>/ month</small>
              </div>

              <ul className="feature-list">
                <li>✔ Unlimited Billing</li>
                <li>✔ Full Inventory Tracking</li>
                <li>✔ Expiry & Batch Management</li>
                <li>✔ GST Reports</li>
                <li>✔ 5 Staff Accounts</li>
                <li>✔ WhatsApp Invoice Sharing</li>
              </ul>

              <button className="subscribe-btn">SUBSCRIBE</button>
            </div>
          </div>

          {/* ENTERPRISE PLAN */}
          <div className="col-md-4">
            <div className="pricing-card">
              <div className="plan-title">ENTERPRISE</div>

              <div className="plan-icon">🏥</div>

              <div className="price">
                ₹1499 <small>/ month</small>
              </div>

              <ul className="feature-list">
                <li>✔ Multi-Store Management</li>
                <li>✔ Centralized Stock Control</li>
                <li>✔ Advanced Analytics Dashboard</li>
                <li>✔ API Integration</li>
                <li>✔ Unlimited Staff Users</li>
                <li>✔ Priority Support</li>
              </ul>

              <button className="subscribe-btn">CONTACT SALES</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
