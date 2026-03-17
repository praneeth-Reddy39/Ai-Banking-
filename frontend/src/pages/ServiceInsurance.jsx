import "./Article.css";
import { NavLink } from "react-router-dom";

function ServiceInsurance() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>Insurance</h1>
        <p>Coverage options that fit your life and budget.</p>
      </div>
      <div className="article-body">
        <h3>Products</h3>
        <p>Health, term life, and device protection with simple claims.</p>
        <h3>Eligibility</h3>
        <p>Available to verified users in supported regions.</p>
        <h3>How to get covered</h3>
        <p>Go to Dashboard → Insurance and compare plans.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/services" className="btn">Back to Services</NavLink>
      </div>
    </div>
  );
}

export default ServiceInsurance;
