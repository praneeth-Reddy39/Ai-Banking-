import "./Article.css";
import { NavLink } from "react-router-dom";

function ServiceCards() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>Debit & Credit Cards</h1>
        <p>Secure cards with rewards and dynamic spending limits.</p>
      </div>
      <div className="article-body">
        <h3>Features</h3>
        <p>Instant virtual cards, card lock, and real-time notifications.</p>
        <h3>Rewards</h3>
        <p>Earn points on everyday spends and redeem for cashbacks.</p>
        <h3>How to request</h3>
        <p>Go to Dashboard → Cards and follow verification steps.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/services" className="btn">Back to Services</NavLink>
      </div>
    </div>
  );
}

export default ServiceCards;
