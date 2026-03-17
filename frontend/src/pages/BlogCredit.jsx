import "./Article.css";
import { NavLink } from "react-router-dom";

function BlogCredit() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>Credit Score Essentials</h1>
        <p>Understand the factors that impact your score and how to improve it.</p>
      </div>
      <div className="article-body">
        <h3>Payment History</h3>
        <p>On-time payments have the biggest impact. Set reminders and automate minimum dues.</p>
        <h3>Credit Utilization</h3>
        <p>Keep utilization below 30%. Request limit increases or pay down balances early.</p>
        <h3>Length of Credit</h3>
        <p>Older accounts help. Avoid closing long-standing cards without a clear reason.</p>
        <h3>New Credit</h3>
        <p>Multiple hard inquiries can reduce your score. Space out applications.</p>
        <h3>Credit Mix</h3>
        <p>A healthy mix of installment and revolving credit supports a stable profile.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/blog" className="btn">Back to Blog</NavLink>
      </div>
    </div>
  );
}

export default BlogCredit;
