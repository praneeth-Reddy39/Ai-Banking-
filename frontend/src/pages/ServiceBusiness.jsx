import "./Article.css";
import { NavLink } from "react-router-dom";

function ServiceBusiness() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>Business Banking</h1>
        <p>Accounts, payouts, and lending tailored for growth.</p>
      </div>
      <div className="article-body">
        <h3>Features</h3>
        <p>Bulk payouts, multi-user access, and working capital loans.</p>
        <h3>Eligibility</h3>
        <p>Registered entities with valid tax IDs and KYC.</p>
        <h3>How to apply</h3>
        <p>Contact support for onboarding or apply via Dashboard → Business.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/services" className="btn">Back to Services</NavLink>
      </div>
    </div>
  );
}

export default ServiceBusiness;
