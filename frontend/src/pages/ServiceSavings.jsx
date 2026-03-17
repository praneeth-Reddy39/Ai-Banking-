import "./Article.css";
import { NavLink } from "react-router-dom";

function ServiceSavings() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>Savings Account</h1>
        <p>Competitive rates, instant alerts, and no hidden fees.</p>
      </div>
      <div className="article-body">
        <h3>Features</h3>
        <p>Free transfers, round-up savings, and automated deposits.</p>
        <h3>Eligibility</h3>
        <p>Available to all registered users with verified mobile.</p>
        <h3>How to open</h3>
        <p>Sign in, go to Dashboard → Accounts → Open Savings.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/services" className="btn">Back to Services</NavLink>
      </div>
    </div>
  );
}

export default ServiceSavings;
