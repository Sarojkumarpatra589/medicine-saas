
import React, { useState,useRef } from "react";
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import hero from "./images/hero.webp";
import about from "./images/about.png";
import whychoose from "./images/system.png";
import features1 from "./images/features1.png";
import features2 from "./images/features2.png";
import cta from "./images/cta.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function Landing() {
  const features = [
    'Time Tracking',
    'Task Management',
    'Collaboration',
    'Reports and Insights',
    'Customizable Categories',
    'Email Support'
  ];
 
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };
   const swiperRef = useRef(null);
  return (
    <>
    <div className="home-wrapper">

      {/* ================= HEADER / NAVBAR ================= */}
      <Navbar expand="lg" className="custom-navbar" sticky="top">
        <Container>
          <Navbar.Brand href="#home" className="brand-logo">
            <div className="logo-circle">
              <span className="logo-icon">S</span>
            </div>
            <span className="brand-text">eSoft</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home" className="nav-item">Home</Nav.Link>
              <Nav.Link href="#about" className="nav-item">About Us</Nav.Link>
              <Nav.Link href="#pages" className="nav-item">Pages</Nav.Link>
              <Nav.Link href="#blog" className="nav-item">Blog</Nav.Link>
              <Nav.Link href="#account" className="nav-item">Account</Nav.Link>
            </Nav>

            <Button className="cta-button">
              Get Started Now <span className="arrow">↗</span>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ================= HOME / HERO SECTION ================= */}
      <section className="home-section" id="home">
        <Container>
          <Row className="align-items-center">

            {/* LEFT CONTENT */}
            <Col lg={6} className="left-content">
              <div className="badge-tag">
                <span className="star-icon">✦</span>
                Top Choice For 5,800+ Websites Worldwide
              </div>

              <h1 className="main-heading">
                Build Your Website With eSoft Builder
              </h1>

              <p className="description">
                eSoft takes the Customizer to the next level so you can customize every aspect your website single interface.
              </p>

              <div className="button-group">
                <Button className="primary-btn">Get Started Now</Button>

                <Button className="video-btn">
                  <span className="play-icon">▶</span>
                  Play Video
                </Button>
              </div>
            </Col>

            {/* RIGHT IMAGE CONTENT */}
            <Col lg={6} className="right-content">
              <div className="text-center">
                <img
                  src={hero}
                  alt="Hero"
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </Col>

          </Row>
        </Container>
      </section>

    </div>
 
    <section className="stats-section">
  <Container>

    <h2 className="stats-heading text-center">
      Trusted by Top Choice For 5,800+ Websites Worldwide
    </h2>

    <Row className="justify-content-center mt-5 g-4">

      <Col lg={3} md={6} className="text-center">
        <div className="stats-card pink">
          <h3>16 M+</h3>
        </div>
        <p className="stats-para">Built With Elementor</p>
      </Col>

      <Col lg={3} md={6} className="text-center">
        <div className="stats-card peach">
          <h3>6.5 K+</h3>
        </div>
        <p className="stats-para">5 Star Reviews</p>
      </Col>

      <Col lg={3} md={6} className="text-center">
        <div className="stats-card blue">
          <h3>100+</h3>
        </div>
        <p className="stats-para">5 Star Reviews</p>
      </Col>

      <Col lg={3} md={6} className="text-center">
        <div className="stats-card blue">
          <h3>16 Sec.</h3>
        </div>
        <p className="stats-para">15 Second An Elementor</p>
      </Col>

    </Row>

  </Container>
</section>

<section className="process-section">
  <div className="container">
    <div className="text-center mb-5">
      <p className="section-subtitle">—— how it works</p>
      <h2 className="section-title">Process To Start</h2>
    </div>

    <div className="process-row">

      {/* STEP 1 */}
      <div className="process-col">
        <div className="process-step text-center">
          <div className="icon-wrapper mx-auto">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          <h3 className="step-title">Quick Registration</h3>
          <p className="step-description">
            Sign up and get started immediately with our straightforward application
          </p>
        </div>
      </div>

      {/* ARROW 1 */}
      <div className="arrow-col">
        <svg viewBox="0 0 200 100" className="connecting-arrow">
          <defs>
            <marker id="arrowhead1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6C5CE7" />
            </marker>
          </defs>
          <path
            d="M 10 50 Q 100 20, 190 50"
            stroke="#6C5CE7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead1)"
          />
        </svg>
      </div>

      {/* STEP 2 */}
      <div className="process-col">
        <div className="process-step text-center">
          <div className="icon-wrapper mx-auto">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>

          <h3 className="step-title">Set Up Your Store</h3>
          <p className="step-description">
            Get help every step of the way, from dedicated customer service to POS.
          </p>
        </div>
      </div>

      {/* ARROW 2 */}
      <div className="arrow-col">
        <svg viewBox="0 0 200 100" className="connecting-arrow">
          <defs>
            <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6C5CE7" />
            </marker>
          </defs>
          <path
            d="M 10 50 Q 100 80, 190 50"
            stroke="#6C5CE7"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead2)"
          />
        </svg>
      </div>

      {/* STEP 3 */}
      <div className="process-col">
        <div className="process-step text-center">
          <div className="icon-wrapper mx-auto">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>

          <h3 className="step-title">Customize your solution</h3>
          <p className="step-description">
            Personalize your POS with apps and create custom solution into with eSoft.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
<section className="about-section">
  <Container>
    <Row className="align-items-center gx-5">

      {/* LEFT IMAGE */}
      <Col lg={6} className="mb-4 mb-lg-0">
        <div className="about-img-wrapper">
          <img src={about} alt="dashboard" className="img-fluid" />
        </div>
      </Col>

      {/* RIGHT CONTENT */}
      <Col lg={6}>
        <div className="about-content">

          <span className="about-badge">About Our Platform</span>

          <h2 className="about-title">
            Smart Technology Built for <br /> Modern Pharmacies
          </h2>

          <p className="about-desc">
            Our pharmacy software is designed to simplify daily operations and
            empower businesses with reliable, scalable technology.
             Our pharmacy software is designed to simplify daily operations and
            empower businesses with reliable, scalable technology.
          </p>

          <ul className="about-list">
            <li>Fast & Accurate Billing Management</li>
            <li>Real-Time Inventory & Expiry Tracking</li>
            <li>GST & Compliance Ready Solutions</li>
          </ul>

          <button className="about-btn">Explore Features</button>

        </div>
      </Col>

    </Row>
  </Container>
</section>


<section className="solutions-section">
  <div className="container">

    {/* Heading */}
    <div className="text-center solutions-header">
      <p className="solutions-subtitle">Our Solutions</p>
      <h2 className="solutions-title">
        End-to-End Solutions for Your Business
      </h2>
    </div>

    {/* Cards Grid */}
    <div className="row g-4">

      {/* Card 1 */}
      <div className="col-lg-4 col-md-6">
        <div className="solution-card">
          <div className="solution-icon">
            🧾
          </div>
          <h5>Smart Billing Solution</h5>
          <p>
            Fast and accurate billing with GST compliance, barcode support,
            and multi-payment options.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-lg-4 col-md-6">
        <div className="solution-card">
          <div className="solution-icon orange">
            📦
          </div>
          <h5>Inventory & Stock Control</h5>
          <p>
            Track stock in real time with batch, expiry, and low-stock alerts
            to prevent losses.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-lg-4 col-md-6">
        <div className="solution-card">
          <div className="solution-icon green">
            ✔
          </div>
          <h5>Compliance & GST Management</h5>
          <p>
            Stay compliant with GST, tax reports, and regulatory standards
            without complexity.
          </p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="col-lg-4 col-md-6">
        <div className="solution-card">
          <div className="solution-icon pink">
            🏬
          </div>
          <h5>Multi-Store Management</h5>
          <p>
            Manage multiple branches from one dashboard with centralized data
            and reporting.
          </p>
        </div>
      </div>

      {/* Card 5 */}
      <div className="col-lg-4 col-md-6">
        <div className="solution-card">
          <div className="solution-icon blue">
            📊
          </div>
          <h5>Reports & Business Insights</h5>
          <p>
            Generate powerful reports to analyze sales, profits, and
            operational performance.
          </p>
        </div>
      </div>

      {/* Card 6 */}
      <div className="col-lg-4 col-md-6">
        <div className="solution-card">
          <div className="solution-icon purple">
            ☁
          </div>
          <h5>Secure Cloud Access</h5>
          <p>
            Access your business data securely anytime, anywhere with
            cloud-enabled systems.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

<section className="why-section">

  {/* Header */}
  <div className="why-header text-center">
    <p className="why-subtitle">WHY CHOOSE US</p>
    <h2 className="why-title">
      A Smarter Way to Run Your <br /> Pharmacy Business
    </h2>
  </div>

  <div className="container why-container">
    <div className="why-card">

      <div className="row align-items-center justify-content-center">

        {/* LEFT SIDE */}
        <div className="col-lg-3 why-left">

          <div className="why-feature left">
            <div className="why-icon">⚡</div>
            <div>
              <h5>Fast Implementation</h5>
              <p>
                Get your pharmacy software live quickly with guided setup
                and expert support.
              </p>
            </div>
          </div>

          <div className="why-feature left mt-5">
            <div className="why-icon">✔</div>
            <div>
              <h5>Industry Proven</h5>
              <p>
                Trusted by pharmacies, retailers, and distributors across
                multiple locations.
              </p>
            </div>
          </div>

        </div>

        {/* CENTER IMAGE */}
        <div className="col-lg-6 text-center why-center">

          <div className="why-circle">
            <img src={whychoose} alt="pos" />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-3 why-right">

          <div className="why-feature right">
            <div className="why-icon">🔒</div>
            <div>
              <h5>Secure & Reliable</h5>
              <p>
                Enterprise-grade security to protect your data and ensure
                uninterrupted operations.
              </p>
            </div>
          </div>

          <div className="why-feature right mt-5">
            <div className="why-icon">🎧</div>
            <div>
              <h5>Dedicated Support</h5>
              <p>
                Expert sales and support teams to help you at every stage
                of your journey.
              </p>
            </div>
          </div>
          

        </div>

      </div>

    </div>
  </div>

</section>



<section className="features-section">

  <div className="container">

    {/* HEADER */}
    <div className="features-header text-center">
      <p className="feature-subtitle">— Our Features</p>
      <h2 className="feature-title">
        Powerful Features That Simplify <br />
        Pharmacy Operations
      </h2>
    </div>

    {/* FEATURE 1 */}
    <div className="row align-items-center feature-row">

      <div className="col-lg-6 text-center">
        <div className="feature-image-wrapper">
          <img
            src={features1}
            alt="Billing"
            className="img-fluid feature-img"
          />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="feature-content">
          <p className="feature-tag">BILLING SYSTEM</p>
          <h3>Fast & Accurate Pharmacy Billing</h3>
          <p>
            Generate GST-compliant bills instantly with barcode scanning,
            multiple payment methods, and error-free calculations designed
            for busy pharmacy counters.
          </p>
          <button className="about-btn">Get More Info</button>
        </div>
      </div>

    </div>

    {/* FEATURE 2 */}
    <div className="row align-items-center feature-row flex-lg-row-reverse">

      <div className="col-lg-6 text-center">
        <div className="feature-image-wrapper">
          <img
            src={features2}
            alt="Inventory"
            className="img-fluid feature-img"
          />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="feature-content">
          <p className="feature-tag">INVENTORY CONTROL</p>
          <h3>Real-Time Stock & Expiry Tracking</h3>
          <p>
            Monitor stock levels with batch-wise expiry tracking.
            Receive instant alerts for low stock and near-expiry medicines,
            helping reduce losses and improve efficiency.
          </p>
          <button className="about-btn">Get More Info</button>
        </div>
      </div>

    </div>
     {/* FEATURE 1 */}
    <div className="row align-items-center feature-row">

      <div className="col-lg-6 text-center">
        <div className="feature-image-wrapper">
          <img
            src={features1}
            alt="Billing"
            className="img-fluid feature-img"
          />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="feature-content">
          <p className="feature-tag">BILLING SYSTEM</p>
          <h3>Fast & Accurate Pharmacy Billing</h3>
          <p>
            Generate GST-compliant bills instantly with barcode scanning,
            multiple payment methods, and error-free calculations designed
            for busy pharmacy counters.
          </p>
          <button className="about-btn">Get More Info</button>
        </div>
      </div>

    </div>

  </div>

</section>

<section className="integration-section">
  <div className="container">
    <div className="row align-items-center justify-content-between">

      {/* LEFT CONTENT */}
      <div className="col-lg-6 integration-left">

        <p className="integration-tag">
          QUICK SETUP & INTEGRATIONS
        </p>

        <h1 className="integration-title">
          Open Your Pharmacy <br />
          Store in Just 5 Days
        </h1>

        <p className="integration-desc">
          Get your pharmacy up and running quickly with our guided onboarding
          and ready-to-use system. From software setup and billing configuration
          to inventory upload and staff training, we help you start selling in
          just 5 days.
        </p>

        <button className="integration-btn">
          Get Started, It’s Free →
        </button>

      </div>

      {/* RIGHT ORBIT */}
      <div className="col-lg-6 d-flex justify-content-center">
        <div className="orbit-wrapper">

          {/* CENTER */}
          <div className="orbit-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png"
              alt=""
            />
          </div>

          {/* ICONS */}
          <div className="orbit-icon icon1"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" /></div>
          <div className="orbit-icon icon2"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png" /></div>
          <div className="orbit-icon icon3"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968853.png" /></div>
          <div className="orbit-icon icon4"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968520.png" /></div>
          <div className="orbit-icon icon5"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968706.png" /></div>
          <div className="orbit-icon icon6"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968770.png" /></div>
          <div className="orbit-icon icon7"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" /></div>
          <div className="orbit-icon icon8"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968859.png" /></div>

        </div>
      </div>

    </div>
  </div>
</section>






<section className="faq-section">
      <div className="container">

        {/* Header */}
        <div className="faq-header text-center">
          <span className="faq-badge">FAQ</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
        </div>

        <div className="row">

          {/* LEFT COLUMN */}
          <div className="col-lg-6">

            <div className={`faq-item ${active === 1 ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFAQ(1)}>
                What devices are compatible with the Time Tracker App?
                <span>{active === 1 ? "▲" : "▼"}</span>
              </div>

              {active === 1 && (
                <p className="faq-answer">
                  Our Time Tracker App is compatible with desktop computers,
                  laptops, tablets, and smartphones running on Windows,
                  macOS, iOS, and Android operating systems.
                </p>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(2)}>
                Can I upgrade or downgrade my plan at any time?
                <span>{active === 2 ? "▲" : "▼"}</span>
              </div>

              {active === 2 && (
                <p className="faq-answer">
                  Yes, you can change your subscription plan anytime from your dashboard.
                </p>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(3)}>
                How does the collaboration feature work in the App?
                <span>{active === 3 ? "▲" : "▼"}</span>
              </div>

              {active === 3 && (
                <p className="faq-answer">
                  You can invite team members, assign tasks, and track time collaboratively.
                </p>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(4)}>
                Can I export my time tracking data from the app?
                <span>{active === 4 ? "▲" : "▼"}</span>
              </div>

              {active === 4 && (
                <p className="faq-answer">
                  Yes, you can export reports in Excel, CSV, and PDF formats.
                </p>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-6">

            <div className={`faq-item ${active === 5 ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFAQ(5)}>
                Is my data secure with the Time Tracker App?
                <span>{active === 5 ? "▲" : "▼"}</span>
              </div>

              {active === 5 && (
                <p className="faq-answer">
                  Yes, we use industry-standard encryption and security protocols.
                </p>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(6)}>
                Are there any discounts for long-term subscriptions?
                <span>{active === 6 ? "▲" : "▼"}</span>
              </div>

              {active === 6 && (
                <p className="faq-answer">
                  Yes, we offer discounts on annual and enterprise subscriptions.
                </p>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(7)}>
                Does the Time Tracker App offer customer support?
                <span>{active === 7 ? "▲" : "▼"}</span>
              </div>

              {active === 7 && (
                <p className="faq-answer">
                  Yes, we provide 24/7 customer support through chat, email, and phone.
                </p>
              )}
            </div>

            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(8)}>
                Can I export my time tracking data from the app?
                <span>{active === 8 ? "▲" : "▼"}</span>
              </div>

              {active === 8 && (
                <p className="faq-answer">
                  Yes, exporting is supported in multiple report formats.
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>





 <section className="testimonial-section">
  <div className="container">

    {/* HEADER */}
    <div className="testimonial-header">
      <div>
        <span className="testimonial-badge">Testimonials</span>
        <h2>Why Our Users Love Us</h2>
      </div>

      <div className="testimonial-arrows">
        <button onClick={() => swiperRef.current.slidePrev()}>
          ←
        </button>
        <button onClick={() => swiperRef.current.slideNext()}>
          →
        </button>
      </div>
    </div>

    {/* SLIDER */}
    <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={25}
  slidesPerView={2}
  loop={true}

  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}

  pagination={{ clickable: true }}

  onSwiper={(swiper) => (swiperRef.current = swiper)}

  breakpoints={{
    0: { slidesPerView: 1 },
    992: { slidesPerView: 2 }
  }}
>

      {/* CARD */}
      {[1, 2, 3].map((item, i) => (
        <SwiperSlide key={i}>
          <div className="testimonial-card">

            <div className="stars">★★★★★</div>

            <p>
              I can't imagine managing our campaigns without eSoft.
              The automation tools and clean UI have completely
              transformed our workflow.
            </p>

            <div className="testimonial-footer">
              <div className="user">
                <img src={`https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${40 + i}.jpg`} />
                <div>
                  <h6>Pat Cummins</h6>
                  <span>CEO Biosynthesis</span>
                </div>
              </div>

              <div className="brand">CloudWatch</div>
            </div>

          </div>
        </SwiperSlide>
      ))}

    </Swiper>

  </div>
</section>



<section className="pricing-section">
  <div className="container">

    {/* HEADER */}
    <div className="pricing-header text-center">
      <span className="pricing-badge">Pricing Plan</span>
      <h2 className="pricing-title">Choose The Right Plan For You</h2>
      <p className="pricing-subtitle">
        Flexible pricing built for pharmacies of every size.
      </p>
    </div>

    {/* PRICING CARDS */}
    <div className="row justify-content-center">

      {/* BASIC PLAN */}
      <div className="col-lg-4 col-md-6">
        <div className="pricing-card">

          <h5 className="plan-label">Starter</h5>
          <h2 className="plan-price">$9.99<span>/month</span></h2>

          <p className="plan-description">
            Perfect for small pharmacy stores getting started.
          </p>

          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>
                <i className="bi bi-check-circle-fill"></i>
                {feature}
              </li>
            ))}
          </ul>

          <button className="btn pricing-btn">Get Started</button>

        </div>
      </div>

      {/* FEATURED PLAN */}
      <div className="col-lg-4 col-md-6">
        <div className="pricing-card featured">

          <div className="featured-badge">Most Popular</div>

          <h5 className="plan-label">Professional</h5>
          <h2 className="plan-price">$19.99<span>/month</span></h2>

          <p className="plan-description">
            Best choice for growing pharmacies & multi-store management.
          </p>

          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>
                <i className="bi bi-check-circle-fill"></i>
                {feature}
              </li>
            ))}
          </ul>

          <button className="btn pricing-btn featured-btn">
            Get Started
          </button>

        </div>
      </div>

      {/* ENTERPRISE PLAN */}
      <div className="col-lg-4 col-md-6">
        <div className="pricing-card">

          <h5 className="plan-label">Enterprise</h5>
          <h2 className="plan-price">$39.99<span>/month</span></h2>

          <p className="plan-description">
            Advanced features for large pharmacy chains.
          </p>

          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>
                <i className="bi bi-check-circle-fill"></i>
                {feature}
              </li>
            ))}
          </ul>

          <button className="btn pricing-btn">Get Started</button>

        </div>
      </div>

    </div>

  </div>
</section>

<section className="integration-section">
  <div className="cta-bg"></div>

  <Container className="cta-wrapper">
    <Row className="align-items-center g-5">

      {/* LEFT CONTENT */}
      <Col lg={6} className="cta-left text-lg-start text-center">

        <div className="cta-content">

          <h5 className="get-started">
            GET STARTED TODAY
          </h5>

          <h1 className="cta-title">
            Run Your Pharmacy <br />
            Smarter With SmartRx
          </h1>

          <p className="cta-subtitle">
            Simplify billing, inventory, and compliance with an all-in-one
            pharmacy management solution built for speed, accuracy, and growth.
          </p>

          <button className="cta-btn">
            Start Free Trial →
          </button>

        </div>

      </Col>

      {/* RIGHT MOCKUP */}
      <Col lg={6} className="text-center">

  <div className="dashboard-mockup p-3">
    <img
      src={cta}   // 👉 Change to your image path
      alt="Dashboard Preview"
      className="img-fluid rounded-4 shadow"
    />
  </div>

</Col>


    </Row>
  </Container>
</section>

   <footer className="footer-section">

      <Container>
        <Row className="gy-5">

          {/* LOGO + ABOUT */}
          <Col lg={3} md={6}>
            <img src="../" alt="logo" className="footer-logo" />

            <p className="footer-about">
              SmartRx helps pharmacies manage billing, inventory, and
              compliance using one powerful and easy-to-use platform.
            </p>

            <div className="footer-social">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </Col>

          {/* QUICK LINKS */}
          <Col lg={3} md={6}>
            <h5 className="footer-title">Quick Links</h5>

            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </Col>

          {/* CONTACT */}
          <Col lg={3} md={6}>
            <h5 className="footer-title">Contact</h5>

            <ul className="footer-links">
              <li>📍 Kolkata, India</li>
              <li>📞 +91 98765 43210</li>
              <li>✉ support@smartrx.com</li>
              <li>⏰ Mon - Sat : 9AM - 7PM</li>
            </ul>
          </Col>

          {/* POLICIES */}
          <Col lg={3} md={6}>
            <h5 className="footer-title">Policies</h5>

            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Support Policy</a></li>
            </ul>
          </Col>

        </Row>
      </Container>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <Container>
          <p>© {new Date().getFullYear()} SmartRx. All Rights Reserved.</p>
        </Container>
      </div>

    </footer>
    </>
  );
}



export default Landing;
