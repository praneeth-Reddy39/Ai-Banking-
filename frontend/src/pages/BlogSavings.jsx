import "./Article.css";
import { NavLink } from "react-router-dom";

function BlogSavings() {
  return (
    <div className="article">
      <div className="article-header">
        <h1>5 Ways to Boost Savings</h1>
        <p>Practical steps to build your emergency fund and long-term wealth.</p>
      </div>
      <div className="article-body">
        <h3>1. Pay Yourself First</h3>
        <p>Automate a monthly transfer to your savings on payday. Treat savings like a bill you always pay.</p>
        <h3>2. Track and Trim Expenses</h3>
        <p>Review subscriptions and discretionary spending. Cut low-value items and redirect the surplus to savings.</p>
        <h3>3. Set Smart Goals</h3>
        <p>Define targets for emergency funds, travel, and major purchases. Break them into monthly milestones.</p>
        <h3>4. Increase Income Streams</h3>
        <p>Consider freelance work, selling unused items, or skill-based projects to boost cash flow.</p>
        <h3>5. Automate Growth</h3>
        <p>Use recurring deposits and round-up features to grow balances with minimal effort.</p>
      </div>
      <div className="article-footer">
        <NavLink to="/blog" className="btn">Back to Blog</NavLink>
      </div>
    </div>
  );
}

export default BlogSavings;
