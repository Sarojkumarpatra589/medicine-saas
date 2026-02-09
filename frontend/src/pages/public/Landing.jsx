export default function Landing() {
  return (
    <div className="container-fluid p-0">
      {/* ====== Sticky Header ====== */}
      <header className="bg-primary text-white p-3 position-sticky top-0 shadow">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="m-0">Medicine SaaS</h4>
          <nav>
            <a href="#features" className="text-white me-3">Features</a>
            <a href="#about" className="text-white me-3">About</a>
            <a href="#testimonials" className="text-white me-3">Testimonials</a>
            <a href="#cta" className="text-white">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* ====== Hero Section ====== */}
      <section className="bg-primary text-white text-center p-5">
        <h1 className="display-4 fw-bold">Welcome to Medicine SaaS</h1>
        <p className="lead">Manage your pharmacy, inventory, and orders efficiently.</p>
        <button className="btn btn-light btn-lg mt-3">Get Started</button>
        <div className="mt-4">
          <img 
            src="https://via.placeholder.com/600x300?text=Medicine+Dashboard" 
            alt="Medicine Dashboard" 
            className="img-fluid rounded"
          />
        </div>
      </section>

      {/* ====== Features Section ====== */}
      <section id="features" className="p-5">
        <div className="text-center mb-5">
          <h2>Our Features</h2>
          <p className="text-muted">Everything you need to run your pharmacy smoothly</p>
        </div>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <img 
              src="https://via.placeholder.com/100?text=Inventory" 
              alt="Inventory" 
              className="mb-3"
            />
            <h5>Inventory Management</h5>
            <p>Keep track of stock levels, expiry dates, and supplies easily.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img 
              src="https://via.placeholder.com/100?text=Orders" 
              alt="Orders" 
              className="mb-3"
            />
            <h5>Order Management</h5>
            <p>Manage orders from customers and suppliers efficiently.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img 
              src="https://via.placeholder.com/100?text=Analytics" 
              alt="Analytics" 
              className="mb-3"
            />
            <h5>Analytics & Reports</h5>
            <p>Get insights into sales, inventory, and customer behavior.</p>
          </div>
        </div>
      </section>

      {/* ====== About Section ====== */}
      <section id="about" className="bg-light p-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img 
              src="https://via.placeholder.com/500x300?text=About+Medicine+SaaS" 
              alt="About" 
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h2>About Medicine SaaS</h2>
            <p>
              Medicine SaaS is designed to simplify pharmacy operations, helping you save time, reduce errors, 
              and provide better service to your customers.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </section>

      {/* ====== Testimonials Section ====== */}
      <section id="testimonials" className="p-5 text-center">
        <h2 className="mb-5">What Our Clients Say</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow">
              <p>"This platform has transformed our pharmacy operations. Highly recommend!"</p>
              <h6>- John Doe, Pharmacist</h6>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow">
              <p>"User-friendly and efficient. Managing inventory is now a breeze."</p>
              <h6>- Sarah Smith, Store Owner</h6>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow">
              <p>"Great analytics feature. Helps us make data-driven decisions daily."</p>
              <h6>- Mike Johnson, Manager</h6>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Call-to-Action Section ====== */}
      <section id="cta" className="bg-primary text-white text-center p-5">
        <h2>Ready to Boost Your Pharmacy?</h2>
        <p className="mb-4">Sign up today and start managing your pharmacy effortlessly!</p>
        <button className="btn btn-light btn-lg">Sign Up Now</button>
      </section>

      {/* ====== Footer ====== */}
      <footer className="bg-dark text-white text-center p-4 mt-5">
        <p className="mb-1">&copy; {new Date().getFullYear()} Medicine SaaS. All rights reserved.</p>
        <div>
          <a href="#" className="text-white me-3">Privacy Policy</a>
          <a href="#" className="text-white">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
