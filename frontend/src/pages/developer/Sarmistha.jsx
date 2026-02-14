import React from "react";

function Sarmistha() {
  return (
    <div className="main-wrapper auth-bg position-relative overflow-hidden">
      <div className="container-fuild position-relative z-1">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100 bg-white">
          <div className="row">

            {/* Left Side */}
            <div className="col-lg-6 p-0">
              <div className="login-backgrounds login-covers bg-primary d-lg-flex align-items-center justify-content-center d-none flex-wrap p-4 position-relative h-100 z-0">
                <div className="authentication-card w-100">
                  <div className="authen-overlay-item w-100">
                    <div className="authen-head text-center">
                      <h1 className="text-white fs-32 fw-bold mb-2">
                        Seamless healthcare access <br /> with smart, modern clinic
                      </h1>
                      <p className="text-light fw-normal">
                        Experience efficient, secure, and user-friendly healthcare management designed for modern clinics and growing practices.
                      </p>
                    </div>

                    <div className="mt-4 mx-auto authen-overlay-img">
                      <img src="/assets/img/auth/cover-imgs-1.png" alt="Img" />
                    </div>
                  </div>
                </div>

                <img
                  src="/assets/img/auth/cover-imgs-2.png"
                  alt="cover"
                  className="img-fluid cover-img"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row justify-content-center align-items-center overflow-auto flex-wrap vh-100">
                <div className="col-md-8 mx-auto">

                  <form className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">

                      {/* Logo */}
                      <div className="mx-auto mb-4 text-center">
                        <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                      </div>

                      <div className="card border-1 p-lg-3 shadow-md rounded-3 m-0">
                        <div className="card-body">

                          <div className="text-center mb-3">
                            <h5 className="mb-1 fs-20 fw-bold">Sign In</h5>
                            <p>Please enter below details to access dashboard</p>
                          </div>

                          {/* Email */}
                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <span className="input-group-text border-end-0 bg-white">
                                <i className="ti ti-mail fs-14 text-dark"></i>
                              </span>

                              <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                placeholder="Enter Email Address"
                              />
                            </div>
                          </div>

                          {/* Password */}
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="pass-group input-group border rounded">
                              <span className="input-group-text bg-white border-0">
                                <i className="ti ti-lock text-dark fs-14"></i>
                              </span>

                              <input
                                type="password"
                                className="form-control ps-0 border-0"
                                placeholder="************"
                              />

                              <span className="input-group-text bg-white border-0">
                                <i className="ti ti-eye-off text-dark fs-14"></i>
                              </span>
                            </div>
                          </div>

                          {/* Remember */}
                          <div className="d-flex justify-content-between mb-3">
                            <div className="form-check">
                              <input className="form-check-input" id="remember_me" type="checkbox" />
                              <label htmlFor="remember_me" className="form-check-label">
                                Remember Me
                              </label>
                            </div>

                            <a href="#" className="text-danger">
                              Forgot Password?
                            </a>
                          </div>

                          {/* Login Button */}
                          <div className="mb-2">
                            <button className="btn bg-primary text-white w-100">
                              Login
                            </button>
                          </div>

                          {/* OR */}
                          <div className="login-or position-relative mb-3">
                            <span className="span-or">OR</span>
                          </div>

                          {/* Social */}
                          <div className="mb-3 d-flex justify-content-center">
                            <a href="#" className="btn btn-outline-light border me-2">
                              <img src="/assets/img/icons/facebook-logo.svg" alt="fb" />
                            </a>

                            <a href="#" className="btn btn-outline-light border me-2">
                              <img src="/assets/img/icons/google-logo.svg" alt="google" />
                            </a>

                            <a href="#" className="btn btn-outline-light border">
                              <img src="/assets/img/icons/apple-logo.svg" alt="apple" />
                            </a>
                          </div>

                          <div className="text-center">
                            <h6 className="fw-normal fs-14 text-dark">
                              Don’t have an account yet?
                              <a href="#" className="ms-1">
                                Register
                              </a>
                            </h6>
                          </div>

                        </div>
                      </div>

                    </div>
                  </form>

                  <p className="text-center mt-4">
                    Copyright © 2025 - Preclinic
                  </p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Sarmistha;
