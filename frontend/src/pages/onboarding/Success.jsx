import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiCheckCircle, FiHome, FiArrowRight } from "react-icons/fi";

const Success = () => {
  return (
    <div className="success-wrapper">

      <style>{`
        .success-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg,#eef2ff,#f8f9ff);
          padding: 20px;
        }

        .success-card {
          background: white;
          border-radius: 16px;
          padding: 50px 40px;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow: 0 10px 35px rgba(0,0,0,0.08);
          position: relative;
        }

        .success-icon {
          width: 90px;
          height: 90px;
          background: #e8f9f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          margin-bottom: 25px;
        }

        .success-title {
          font-weight: 700;
          font-size: 26px;
          color: #222;
        }

        .success-text {
          color: #6c757d;
          font-size: 14px;
          margin-top: 10px;
          margin-bottom: 35px;
        }

        .success-btn {
          border-radius: 8px;
          padding: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.3s;
        }

        .btn-dashboard {
          background: #6366f1;
          border: none;
        }

        .btn-dashboard:hover {
          background: #4f52d9;
        }

        .btn-secondary-custom {
          border: 1px solid #6366f1;
          color: #6366f1;
          background: transparent;
        }

        .btn-secondary-custom:hover {
          background: #6366f1;
          color: white;
        }

        .badge-success {
          background: #d1fae5;
          color: #059669;
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 30px;
          margin-bottom: 15px;
          display: inline-block;
        }
      `}</style>

      <div className="success-card">

        {/* Status Badge */}
        <div className="badge-success">
          ✔ Profile Setup Completed
        </div>

        {/* Icon */}
        <div className="success-icon">
          <FiCheckCircle size={45} color="#22c55e" />
        </div>

        {/* Title */}
        <div className="success-title">
          Pharmacy Successfully Registered 🎉
        </div>

        {/* Subtitle */}
        <p className="success-text">
          Your pharmacy onboarding and compliance verification is complete.
          You can now start billing, inventory management and business operations.
        </p>

        {/* Buttons */}
        <div className="d-flex gap-3">

          <button className="btn success-btn btn-dashboard w-50 text-white">
            <FiHome />
            Dashboard
          </button>

          <button className="btn success-btn btn-secondary-custom w-50">
            Start Billing
            <FiArrowRight />
          </button>

        </div>
      </div>
    </div>
  );
};

export default Success;
