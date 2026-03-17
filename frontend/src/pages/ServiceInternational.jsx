import "./Article.css";
import { NavLink } from "react-router-dom";

function ServiceInternational() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>International</h1>
        <p>Global transfers with competitive FX rates and speed.</p>
      </div>
      <div className="article-body">
        <h3>Features</h3>
        <p>Swift payouts, low fees, and transparent currency conversion.</p>
        <h3>Supported corridors</h3>
        <p>Major geographies; see Dashboard → International for list.</p>
        <h3>How to send</h3>
        <p>Add beneficiary and fund transfer from your linked account.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/services" className="btn">Back to Services</NavLink>
      </div>
    </div>
  );
}

export default ServiceInternational;
