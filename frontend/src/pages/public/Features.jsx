
import React, { useState,useRef,useEffect } from "react";
import { Container, Row, Col, Button, Navbar, Nav ,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import features1 from "./images/features1.png";
import features2 from "./images/features2.png";

import BreadcrumbImage from './images/breadcrumb.webp';
import cta1 from "./images/cta-about.webp";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";



function Features() {


  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);
  useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector(".custom-navbar");

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const features = [
    'Time Tracking',
    'Task Management',
    'Collaboration',
    'Reports and Insights',
    'Customizable Categories',
    'Email Support'
  ];
  return (
    <>

      {/* ================= HEADER / NAVBAR ================= */}
      <Navbar expand="lg" className="other-navbar" fixed="top">
        <Container>
          <Navbar.Brand href="#home" className="brand-logo">
            <div className="logo-circle">
              <span className="logo-icon">D</span>
            </div>
            <span className="brand-text">Drafticode</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="nav-item">Home</Nav.Link>
              <Nav.Link href="/about" className="nav-item">About Us</Nav.Link>
              <Nav.Link href="/features" className="nav-item">Features</Nav.Link>
              <Nav.Link href="/pricing" className="nav-item">Pricing</Nav.Link>
              <Nav.Link href="/contact" className="nav-item">Contact</Nav.Link>
            </Nav>

            <Button className="cta-button">
              Get Started Now <span className="arrow">↗</span>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
 
        <section className="breadcrumb-section">
      <Container>
        <Row className="align-items-center">

         {/* LEFT CONTENT */}
<Col lg={6} className="about-left">
  <h2 className="about-title">Powerful Pharmacy Features</h2>

  <p className="about-text">
    Our pharmacy management software is designed to simplify your daily
    operations. From fast billing and smart inventory tracking to expiry
    alerts and customer management, our system helps you run your medicine
    store efficiently, accurately, and with complete control.
  </p>

  <div className="about-buttons">
    <Button className="primary-btn">
      Request Demo
    </Button>

    <Button className="secondary-btn">
      Try Free Trial
    </Button>
  </div>
</Col>


          {/* RIGHT IMAGE */}
          <Col lg={6} className="about-right">
            <img
              src={BreadcrumbImage}
              alt="About App"
              className="img-fluid about-image"
            />
          </Col>

        </Row>
      </Container>
    </section>
     <section className="stats-section">
      <Container>
    
        <h2 className="stats-heading text-center">
          Empowering Businesses, Enabling Better India Through IT
        </h2>
    
        <Row className="justify-content-center mt-5 g-4">
    
          <Col lg={3} md={6} className="text-center">
            <div className="stats-card pink">
              <h3>10K +</h3>
            </div>
            <p className="stats-para">Invoices Processed Per Year</p>
          </Col>
    
          <Col lg={3} md={6} className="text-center">
            <div className="stats-card peach">
              <h3>6.5 K+</h3>
            </div>
            <p className="stats-para">Transactions Processed Annually</p>
          </Col>
    
          <Col lg={3} md={6} className="text-center">
            <div className="stats-card blue">
              <h3>50%</h3>
            </div>
            <p className="stats-para">Pharma & FMCG Powered by Our Software</p>
          </Col>
    
          <Col lg={3} md={6} className="text-center">
            <div className="stats-card blue">
              <h3>1 K</h3>
            </div>
            <p className="stats-para">Businesses Served Worldwide</p>
          </Col>
    
        </Row>
    
      </Container>
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


     <section className="email-hero-section">
      <Container>
        <Row className="align-items-center">

          {/* LEFT CONTENT */}
          <Col lg={6}>
            <div className="hero-content">
              <h1>
                Email innovation: Craft <br />
                marketing an success
              </h1>

              <p>
                Email marketing journey transforms into a streamlined and
                powerful experience. Our cutting-edge platform equips you
                with tools to craft compelling, personalized campaigns.
              </p>

              <Button className="hero-btn">
                Sign Up For Free
              </Button>
            </div>
          </Col>

          {/* RIGHT IMAGE */}
          <Col lg={6}>
            <div className="hero-image">
              <img src={cta1} alt="analytics" className="img-fluid" />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
      
      



<footer className="footer-section">

  <Container>
    <Row className="gy-5">

      {/* COMPANY INFO */}
      <Col lg={4} md={6}>
       <div className="footer-brand1">
  <div className="logo-circle1">
    <span className="logo-icon1">D</span>
  </div>
  <span className="brand-text1">Drafticode</span>
</div>


        <p className="footer-about">
          SmartRx is a complete pharmacy management solution designed to
          simplify billing, inventory control, compliance tracking, and
          daily medical store operations with accuracy and efficiency.
        </p>

        <div className="footer-social">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
      </Col>

      {/* PRODUCT LINKS */}
      <Col lg={2} md={6}>
        <h5 className="footer-title">Product</h5>

        <ul className="footer-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Integrations</a></li>
          <li><a href="#">Updates</a></li>
        </ul>
      </Col>

      {/* COMPANY LINKS */}
      <Col lg={3} md={6}>
        <h5 className="footer-title">Company</h5>

        <ul className="footer-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </Col>

     {/* CONTACT INFO */}
<Col lg={3} md={6}>
  <h5 className="footer-title">Contact Info</h5>

  <ul className="footer-links">
    <li><a href="#">Kolkata, West Bengal, India</a></li>
    <li><a href="tel:+919876543210">+91 98765 43210</a></li>
    <li><a href="mailto:support@drafticode.com">support@drafticode.com</a></li>
    <li><a href="#">Mon – Sat : 9:00 AM – 7:00 PM</a></li>
  </ul>
</Col>


    </Row>
  </Container>

  {/* COPYRIGHT */}
  <div className="footer-bottom">
    <Container className="d-flex justify-content-between flex-wrap">
      <p>© {new Date().getFullYear()} Drafticode. All rights reserved.</p>

      <div className="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Refund Policy</a>
      </div>
    </Container>
  </div>

</footer>
    </>
  );
}



export default Features;
