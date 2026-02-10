import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiSettings, FiArrowRight } from "react-icons/fi";

export default function StoreConfig() {
  return (
    <div className="store-config-wrapper">

      <style>{`

        .store-config-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg,#eef2ff,#f8f9ff);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Decorative Gradient Circles */
        .store-config-wrapper::before {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          background: #6366f1;
          border-radius: 50%;
          top: -120px;
          left: -120px;
          opacity: 0.08;
        }

        .store-config-wrapper::after {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          background: #8b5cf6;
          border-radius: 50%;
          bottom: -120px;
          right: -120px;
          opacity: 0.08;
        }

        .store-config-card {
          background: #fff;
          border-radius: 20px;
          padding: 50px 45px;
          width: 100%;
          max-width: 560px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.08);
          text-align: center;
          position: relative;
          z-index: 1;
        }

        /* Step Badge */
        .step-badge {
          background: #eef2ff;
          color: #6366f1;
          font-weight: 600;
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 30px;
          display: inline-block;
          margin-bottom: 18px;
        }

        .config-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          margin-bottom: 25px;
          box-shadow: 0 12px 25px rgba(99,102,241,0.35);
        }

        .config-title {
          font-weight: 700;
          font-size: 28px;
          color: #111827;
        }

        .config-subtitle {
          font-size: 15px;
          color: #6b7280;
          margin-top: 12px;
          margin-bottom: 35px;
          line-height: 1.6;
        }

        /* Feature Points */
        .feature-list {
          text-align: left;
          margin-bottom: 35px;
        }

        .feature-item {
          font-size: 14px;
          color: #374151;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feature-dot {
          width: 8px;
          height: 8px;
          background: #6366f1;
          border-radius: 50%;
        }

        /* Button */
        .config-btn {
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-weight: 600;
          color: white;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.3s;
          box-shadow: 0 10px 25px rgba(99,102,241,0.35);
        }

        .config-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(99,102,241,0.45);
        }

      `}</style>

      <div className="store-config-card">

        {/* Step Badge */}
        <div className="step-badge">
          Step 1 of 5
        </div>

        {/* Icon */}
        <div className="config-icon">
          <FiSettings size={36} color="white" />
        </div>

        {/* Heading */}
        <h2 className="config-title">
          Configure Your Pharmacy Store
        </h2>

        {/* Subtitle */}
        <p className="config-subtitle">
          Setup your store infrastructure, legal compliance, and operational
          preferences to get started with your pharmacy SaaS platform.
        </p>

        {/* Feature Highlights */}
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-dot"></span>
            Store infrastructure & analytics setup
          </div>
          <div className="feature-item">
            <span className="feature-dot"></span>
            GST & legal compliance configuration
          </div>
          <div className="feature-item">
            <span className="feature-dot"></span>
            Billing & payment integration
          </div>
        </div>

        {/* CTA Button */}
        <button className="config-btn">
          Start Configuration
          <FiArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}
