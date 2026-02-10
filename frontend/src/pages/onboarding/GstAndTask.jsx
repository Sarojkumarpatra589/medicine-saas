import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import img1 from './images/cover-imgs-1.png';

const GstAndTask = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="preclinic-login">
      <style>{`

      body {
  margin: 0;
  overflow: hidden;
}

.preclinic-login {
  height: 100vh;
  width: 100vw;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* LEFT SECTION */
.left-section {
  flex: 1;
  height: 100vh;
  background: linear-gradient(135deg, #2e37a4 0%, #1d1765 50%, #7B68EE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.left-section::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 60px;
  width: 80px;
  height: 80px;
  background: #FF8C69;
  border-radius: 50%;
}

.content-box {
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px 40px 0px 30px;
  max-width: 560px;
  backdrop-filter: blur(10px);
  z-index: 1;
}

.content-box h1 {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.2;
}

.content-box p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.doctor-patient-img {
  width: 100%;
  max-width: 380px;
}

/* RIGHT SECTION */
.right-section {
  flex: 1;
  height: 100vh;
  background: #F8F9FA;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0;
  height:2em;
}

.logo-icon {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #1d1765 0%, #7B68EE 100%);
  border-radius: 8px;
  margin-right: 10px;
  position: relative;
}

.logo-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 4px;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2D3748;
}

/* LOGIN BOX */
.login-container {
  background: white;
  border-radius: 12px;
  padding: 30px 30px;
  max-width: 460px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.login-container h2 {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.login-subtitle {
  text-align: center;
  color: #718096;
  margin-bottom: 20px;
  font-size: 0.85rem;
}

/* FORM */
.form-label {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 0.85rem;
}

.form-control {
  padding: 10px 14px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 0.9rem;
}

.form-control:focus {
  border-color: #1d1765;
  box-shadow: 0 0 0 3px rgba(65, 88, 208, 0.1);
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #A0AEC0;
  z-index: 10;
}

.input-with-icon {
  padding-left: 42px;
}

.password-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
}

/* REMEMBER */
.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 18px;
}

.forgot-link {
  color: #E53E3E;
  text-decoration: none;
  font-size: 0.85rem;
}

.btn-login {
  width: 100%;
  background: #2d2774;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  padding: 5px;
}

.divider {
  text-align: center;
  margin: 18px 0;
  font-size: 0.85rem;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #E2E8F0;
}

.divider::before { left: 0; }
.divider::after { right: 0; }

/* SOCIAL */
.social-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.btn-social {
  flex: 1;
  padding: 10px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: white;
  display: flex;
  justify-content: center;
}

/* FOOTER */
.copyright {
  text-align: center;
  color: #A0AEC0;
  font-size: 0.8rem;
}
  @media (max-width: 991px) {

  .left-section {
    display: none;
  }

  .right-section {
    flex: 1;
    width: 100%;
    height: 100vh;
    justify-content: center;
    padding: 30px 20px;
  }

  .logo {
    justify-content: center;
    margin-bottom: 15px;
  }

  .login-container {
    max-width: 420px;
    width: 100%;
    margin: 0 auto;
  }

  .copyright {
    margin-top: 15px;
  }

}


      `}</style>


      <div className="left-section">
        <div className="content-box">
          <h1>Seamless healthcare access with smart, modern clinic</h1>
          <p>
            Experience efficient, secure, and user-friendly healthcare management
            designed for modern clinics and growing practices.
          </p>
          <img
            src={img1}
            alt="Doctor with patient"
            className="doctor-patient-img"
          />
        </div>
      </div>

      <div className="right-section">
         <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Pharmacy</span>
          </div>
       <div className="login-container">

  <h2>GST & TAX IDENTIFICATION</h2>
  <p className="login-subtitle">
    Required for billing, invoicing & compliance.
  </p>

  <form onSubmit={(e) => e.preventDefault()}>

    <div className="row">

      {/* GSTIN */}
      <div className="col-md-6 mb-3">
        <label className="form-label">GSTIN</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter GSTIN"
          maxLength="15"
          required
        />
      </div>

      {/* Legal Name */}
      <div className="col-md-6 mb-3">
        <label className="form-label">Legal Name (as per GST)</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter legal business name"
          required
        />
      </div>

      {/* Trade Name */}
      <div className="col-md-6 mb-3">
        <label className="form-label">Trade Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter trade name"
          required
        />
      </div>

      {/* GST Registration Date */}
      <div className="col-md-6 mb-3">
        <label className="form-label">GST Registration Date</label>
        <input
          type="date"
          className="form-control"
          required
        />
      </div>

      {/* GST Type */}
      <div className="col-md-6 mb-3">
        <label className="form-label">GST Type</label>
        <select className="form-control" required>
          <option value="">Select GST Type</option>
          <option>Regular</option>
          <option>Composition</option>
        </select>
      </div>

      {/* GST Status */}
      <div className="col-md-6 mb-3">
        <label className="form-label">GST Status</label>
        <select className="form-control" required>
          <option value="">Select Status</option>
          <option>Active</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* GST Certificate Upload */}
      <div className="col-md-12 mb-3">
        <label className="form-label">GST Certificate Upload</label>
        <input
          type="file"
          className="form-control"
          accept=".jpg,.jpeg,.png,.pdf"
          required
        />
      </div>

    </div>

    <div className="d-flex gap-3 mt-2">

  {/* Previous Button */}
  <button
    type="button"
    className="btn-login w-50 d-flex align-items-center justify-content-center gap-2"
  >
    <FiArrowLeft size={18} />
    Previous
  </button>

  {/* Save & Next Button */}
  <button
    type="submit"
    className="btn-login w-50 d-flex align-items-center justify-content-center gap-2"
  >
    Save & Next
    <FiArrowRight size={18} />
  </button>

</div>



  </form>

</div>

        <div className="copyright">
            Copyright © 2025 - Preclinic.
          </div>
      </div>
    </div>
  );
};

export default GstAndTask;