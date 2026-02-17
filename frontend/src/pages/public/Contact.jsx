
import React, { useState,useRef,useEffect } from "react";
import { Container, Row, Col, Button, Navbar, Nav ,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import BreadcrumbImage from './images/breadcrumb.webp';
import cta1 from "./images/cta-about.webp";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";



function Contact() {


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
            <h2 className="about-title">Customer Support</h2>

            <p className="about-text">
               Need help managing your pharmacy operations? Our smart medicine store
                software simplifies billing, stock monitoring, expiry tracking, and
                customer management. Reach out to our support team for quick assistance
                and seamless store management.
            </p>

            <div className="about-buttons">
              <Button className="primary-btn ">
                Get Started Now
              </Button>

              <Button className="secondary-btn">
               Request Free Demo
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
<section className="contact-section py-5">
      <Container className="bg-white p-5">
        <Row className="g-5">

          {/* LEFT FORM */}
          <Col lg={7}>
            <div className="contact-form-wrapper">
              <h3>Send us a Message</h3>
              <p>
                As a fellow small business owner, we know the fulfillment
                that comes from running your own business contact to Finacy.
              </p>

              <Form>
                <Row className="g-3">

                  <Col md={6}>
                    <Form.Control placeholder="First Name*" className="contact-input" />
                  </Col>

                  <Col md={6}>
                    <Form.Control placeholder="Email*" className="contact-input" />
                  </Col>

                  <Col md={6}>
                    <Form.Control placeholder="Phone*" className="contact-input" />
                  </Col>

                  <Col md={6}>
                    <Form.Control placeholder="Website*" className="contact-input" />
                  </Col>

                  <Col md={12}>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your Message*"
                      className="contact-input"
                    />
                  </Col>

                  <Col md={12} className="text-end">
                    <Button className="contact-btn">
                      Submit Now
                    </Button>
                  </Col>

                </Row>
              </Form>
            </div>
          </Col>

          {/* RIGHT CONTACT INFO */}
          <Col lg={5}>
            <div className="contact-info">

              <div className="info-card">
                <div className="info-icon">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h6>Call</h6>
                  <p>281-789-6642</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <h6>Email</h6>
                  <p>info@activedigitalmedia.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div>
                  <h6>Schedule Time</h6>
                  <p>Mon - Fri: 10am to 5pm</p>
                </div>
              </div>

            </div>
          </Col>

        </Row>
      </Container>
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



export default Contact;
