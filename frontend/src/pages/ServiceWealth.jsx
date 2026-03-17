import "./Article.css";
import { NavLink } from "react-router-dom";

function ServiceWealth() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>Wealth</h1>
        <p>Goal-based investing with clear, transparent fees.</p>
      </div>
      <div className="article-body">
        <h3>Features</h3>
        <p>Automated portfolios, rebalancing, and risk profiling.</p>
        <h3>Eligibility</h3>
        <p>KYC-compliant users with risk disclosures accepted.</p>
        <h3>How to start</h3>
        <p>Dashboard → Wealth → Create a goal and fund it.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/services" className="btn">Back to Services</NavLink>
      </div>
    </div>
  );
}

export default ServiceWealth;
