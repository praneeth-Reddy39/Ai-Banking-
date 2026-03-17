import { NavLink } from "react-router-dom";
import "../style/pages.css";

function BlogSavings() {
  return (
    <div className="pg">
      <NavLink to="/blog" className="pg-back">← Back to Blog</NavLink>
      <div className="pg-hero">
        <h1>🐷 5 Ways to <span>Boost Your Savings</span></h1>
        <p>Practical, actionable tips to build your emergency fund and grow wealth consistently.</p>
      </div>
      <div className="pg-section">
        <h2>1. Automate Your Savings</h2>
        <p>Set up an automatic transfer to your savings account on payday. What you don't see, you don't spend. Even ₹500/month grows to ₹6,000 a year — and with compound interest, much more over time.</p>
      </div>
      <div className="pg-section">
        <h2>2. Use the 50/30/20 Rule</h2>
        <p>Allocate 50% of income to needs (rent, food), 30% to wants (dining out, subscriptions), and 20% to savings and debt repayment. This simple framework keeps spending in check automatically.</p>
      </div>
      <div className="pg-section">
        <h2>3. Cancel Unused Subscriptions</h2>
        <p>The average person pays for 3–5 subscriptions they rarely use. Review your bank statement monthly and cancel anything you haven't used in 30+ days. That ₹299/month adds up fast.</p>
      </div>
      <div className="pg-section">
        <h2>4. Switch to a High-Interest Savings Account</h2>
        <p>Traditional savings accounts offer 3–4% interest. AI Banking Network's savings account offers up to 7% annual interest — that's nearly double the standard. Switching could earn you thousands more per year.</p>
      </div>
      <div className="pg-section">
        <h2>5. Use Round-Up Savings</h2>
        <p>Every time you spend ₹47, round up to ₹50 and save the ₹3 difference. It feels negligible, but users who enable round-ups save an average of ₹3,200 extra per year without thinking about it.</p>
      </div>
      <div className="pg-cta">
        <h2>Start saving smarter today</h2>
        <p>Open a high-yield savings account in minutes.</p>
        <NavLink to="/signup" className="pg-btn">Get Started →</NavLink>
      </div>
    </div>
  );
}

export default BlogSavings;
