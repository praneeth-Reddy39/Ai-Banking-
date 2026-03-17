import "./Blog.css";
import { NavLink } from "react-router-dom";

function Blog() {
  const posts = [
    { id: 1, title: "5 Ways to Boost Savings", excerpt: "Practical tips to build your emergency fund.", to: "/blog/savings" },
    { id: 2, title: "Credit Score Essentials", excerpt: "Understand factors that impact your score.", to: "/blog/credit-score" },
    { id: 3, title: "Small Business Banking 101", excerpt: "Accounts, payouts, and lending for SMEs.", to: "/blog" },
  ];

  return (
    <div className="page blog">
      <section className="page-hero">
        <h1>Blog</h1>
        <p>Insights and guides to help you make smarter money decisions.</p>
      </section>

      <section className="posts">
        {posts.map((p) => (
          <NavLink key={p.id} to={p.to} className="post">
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
            <div className="meta">2 min read</div>
          </NavLink>
        ))}
      </section>
    </div>
  );
}

export default Blog;
