import { NavLink } from "react-router-dom";
import "../style/pages.css";

function BlogCredit() {
  return (
    <div className="pg">
      <NavLink to="/blog" className="pg-back">← Back to Blog</NavLink>
      <div className="pg-hero">
        <h1>📊 Credit Score <span>Essentials</span></h1>
        <p>Understand the factors that shape your credit score and how to improve it fast.</p>
      </div>
      <div className="pg-section">
        <h2>What Is a Credit Score?</h2>
        <p>A credit score is a 3-digit number (300–900 in India) that lenders use to evaluate your creditworthiness. Scores above 750 are considered excellent and qualify you for the best loan rates. RBI-approved credit bureaus like CIBIL, Experian, and CRIF calculate your score based on your financial behaviour.</p>
      </div>
      <div className="pg-section">
        <h2>Key Factors That Impact Your Score</h2>
        <ul>
          <li><strong>Payment History (35%):</strong> Always pay EMIs and credit card bills on time. Even one missed payment can drop your score by 50–100 points.</li>
          <li><strong>Credit Utilization (30%):</strong> Keep your credit card usage below 30% of the limit. Using ₹30,000 on a ₹1L card = 30% utilization (ideal).</li>
          <li><strong>Credit Age (15%):</strong> The older your credit accounts, the better. Avoid closing old credit cards.</li>
          <li><strong>Credit Mix (10%):</strong> Having a healthy mix of secured (home loan) and unsecured (credit card) credit helps.</li>
          <li><strong>New Inquiries (10%):</strong> Every time you apply for a new loan or card, a hard inquiry is registered. Too many = red flag.</li>
        </ul>
      </div>
      <div className="pg-section">
        <h2>How to Improve Your Score Quickly</h2>
        <ul>
          <li>Pay all outstanding dues immediately</li>
          <li>Set up auto-pay for EMIs and credit card minimum dues</li>
          <li>Increase your credit card limit (request, don't spend more)</li>
          <li>Dispute errors in your CIBIL report online</li>
          <li>Avoid applying for multiple loans in a short period</li>
        </ul>
      </div>
      <div className="pg-section">
        <h2>Score Ranges Explained</h2>
        <ul>
          <li>🟢 <strong>750–900:</strong> Excellent — best loan rates available</li>
          <li>🟡 <strong>650–749:</strong> Good — approved with standard rates</li>
          <li>🟠 <strong>550–649:</strong> Fair — limited options, higher interest</li>
          <li>🔴 <strong>300–549:</strong> Poor — most applications rejected</li>
        </ul>
      </div>
      <div className="pg-cta">
        <h2>Check your score for free</h2>
        <p>AI Banking Network shows your credit score on your dashboard in real-time.</p>
        <NavLink to="/login" className="pg-btn">View Dashboard →</NavLink>
      </div>
    </div>
  );
}

export default BlogCredit;
