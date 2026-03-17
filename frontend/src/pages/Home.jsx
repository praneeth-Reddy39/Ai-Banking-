import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  const features = [
    { icon: "🐷", title: "Savings Account", desc: "Grow your money with up to 7% interest and zero hidden fees.", link: "/services/savings" },
    { icon: "💼", title: "Business Loans", desc: "Flexible lending tailored to fuel your company's growth.", link: "/services/business" },
    { icon: "💳", title: "Debit & Credit", desc: "Secure cards with rewards and instant spend notifications.", link: "/services/cards" },
    { icon: "🛡️", title: "Insurance", desc: "Comprehensive life, health, and vehicle coverage options.", link: "/services/insurance" },
    { icon: "📈", title: "Wealth Management", desc: "AI-powered investing with transparent fees and real returns.", link: "/services/wealth" },
    { icon: "🌍", title: "International Transfers", desc: "Send money to 180+ countries at the best exchange rates.", link: "/services/international" },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🤖 AI-Powered Banking</div>
          <h1>Where Money<br /><span>Meets Intelligence.</span></h1>
          <p>
            Smart banking for everyday life — secure, instant, and designed around you. Experience the future of finance with AI Banking Network.
          </p>
          <div className="hero-actions">
            <NavLink to="/signup" className="cta cta-primary">Get Started Free</NavLink>
            <NavLink to="/login" className="cta cta-outline">Sign In</NavLink>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hv-card">
            <div className="hv-card-row"><span className="hv-dot g" /><span>Balance</span><span className="hv-val">₹2,48,000</span></div>
            <div className="hv-card-row dep"><span className="hv-dot" style={{background:"#6dffc0"}} />Deposit<span className="hv-val g">+₹12,500</span></div>
            <div className="hv-card-row wit"><span className="hv-dot" style={{background:"#ffb3b3"}} />Withdraw<span className="hv-val r">−₹3,200</span></div>
            <div className="hv-ai">🤖 Spending is 12% below average this month — great work!</div>
          </div>
          <div className="hv-ring" />
          <div className="hv-ring2" />
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div className="stat-item"><div className="stat-val">2.4M+</div><div className="stat-lbl">Customers</div></div>
        <div className="stat-item"><div className="stat-val">₹840Cr</div><div className="stat-lbl">Transactions/month</div></div>
        <div className="stat-item"><div className="stat-val">99.98%</div><div className="stat-lbl">Uptime</div></div>
        <div className="stat-item"><div className="stat-val">4.9★</div><div className="stat-lbl">App Rating</div></div>
      </section>

      {/* Services Grid */}
      <section className="home-features" id="services">
        <div className="hf-head">
          <h2>Everything you need, <span>in one place</span></h2>
          <p>Comprehensive financial products built for the modern era.</p>
        </div>
        <div className="hf-grid">
          {features.map(f => (
            <NavLink key={f.title} to={f.link} className="hf-card">
              <div className="hf-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="hf-arrow">→</span>
            </NavLink>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to bank smarter?</h2>
        <p>Join 2.4 million customers who trust AI Banking Network with their finances.</p>
        <NavLink to="/signup" className="cta cta-primary">Open Free Account →</NavLink>
      </section>
    </div>
  );
}

export default Home;
