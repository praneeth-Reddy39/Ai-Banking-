import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Where Money <span>Meets Trust.</span>
          </h1>
          <p>
            Smart banking for everyday life. Secure, fast, and designed around you.
          </p>
          <div className="hero-actions">
            <NavLink to="/login" className="cta">Know More</NavLink>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="badge">$</div>
          <div className="badge right">$</div>
        </div>
      </section>

      <section className="features" id="services">
        <div className="feature">
          <div className="icon">🐷</div>
          <h3>Savings Account</h3>
          <p>Grow your money with competitive interest and zero hidden fees.</p>
        </div>
        <div className="feature">
          <div className="icon">💼</div>
          <h3>Business Loans</h3>
          <p>Get flexible lending tailored to fuel your company’s growth.</p>
        </div>
        <div className="feature">
          <div className="icon">💳</div>
          <h3>Debit & Credit</h3>
          <p>Secure cards with rewards and instant notifications.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
