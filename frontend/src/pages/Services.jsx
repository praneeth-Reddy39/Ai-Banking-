import "./Services.css";
import { NavLink } from "react-router-dom";

function Services() {
  return (
    <div className="page services">
      <section className="page-hero">
        <h1>Services</h1>
        <p>Comprehensive products designed to keep your money safe and working for you.</p>
      </section>

      <section className="cards">
        <NavLink className="card" to="/services/savings">
          <div className="card-icon">🐷</div>
          <h3>Savings Account</h3>
          <p>Competitive rates, instant alerts, and no hidden fees.</p>
        </NavLink>
        <NavLink className="card" to="/services/cards">
          <div className="card-icon">💳</div>
          <h3>Debit & Credit</h3>
          <p>Secure cards with rewards and dynamic spending limits.</p>
        </NavLink>
        <NavLink className="card" to="/services/business">
          <div className="card-icon">💼</div>
          <h3>Business Banking</h3>
          <p>Accounts, payouts, and lending tailored for growth.</p>
        </NavLink>
        <NavLink className="card" to="/services/insurance">
          <div className="card-icon">🛡️</div>
          <h3>Insurance</h3>
          <p>Coverage options that fit your life and budget.</p>
        </NavLink>
        <NavLink className="card" to="/services/wealth">
          <div className="card-icon">📈</div>
          <h3>Wealth</h3>
          <p>Goal-based investing with clear, transparent fees.</p>
        </NavLink>
        <NavLink className="card" to="/services/international">
          <div className="card-icon">🌐</div>
          <h3>International</h3>
          <p>Global transfers with competitive FX rates and speed.</p>
        </NavLink>
      </section>

      <section className="cta-banner">
        <h2>Ready to get started?</h2>
        <p>Open an account in minutes and take control of your finances.</p>
      </section>
    </div>
  );
}

export default Services;
