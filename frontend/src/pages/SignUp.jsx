import { useState, useEffect, useRef } from "react";
import { authApi } from "../api/bankingApi";
import { useNavigate, Link } from "react-router-dom";
import "../style/SignUp.css";

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 60, 255, ${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(120, 60, 255, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="su-particle-canvas" />;
}

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSignUp = async () => {
    setError("");
    if (!name || name.trim().length < 2) {
      setError("Enter your full name (at least 2 characters)");
      triggerShake();
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      triggerShake();
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      triggerShake();
      return;
    }
    try {
      setLoading(true);
      const res = await authApi.register({ name, email, password });
      localStorage.setItem("token", res.data.token);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (e) {
      setError(e?.response?.data?.message || "Registration failed. Please try again.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignUp();
  };

  return (
    <div className="su-page">
      <ParticleCanvas />

      <div className="su-orb su-orb-1" />
      <div className="su-orb su-orb-2" />
      <div className="su-orb su-orb-3" />

      <div className={`su-card ${shake ? "su-shake" : ""} ${success ? "su-success-pop" : ""}`}>
        {/* Logo */}
        <div className="su-icon-wrap">
          <div className="su-icon">🚀</div>
        </div>

        <h1 className="su-title">Create Account</h1>
        <p className="su-subtitle">Join AI Banking Network in seconds</p>

        {error && (
          <div className="su-error">
            <span className="su-error-icon">⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="su-success-msg">
            <span>✅</span> Account created! Redirecting…
          </div>
        )}

        <div className="su-input-group">
          <span className="su-input-icon">👤</span>
          <input
            id="signup-name"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="name"
          />
        </div>

        <div className="su-input-group">
          <span className="su-input-icon">✉️</span>
          <input
            id="signup-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="email"
          />
        </div>

        <div className="su-input-group">
          <span className="su-input-icon">🔒</span>
          <input
            id="signup-password"
            type="password"
            placeholder="Password (min. 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="new-password"
          />
        </div>

        <button
          id="signup-btn"
          className={`su-btn ${loading ? "su-loading" : ""}`}
          onClick={handleSignUp}
          disabled={loading || success}
        >
          {loading ? (
            <span className="su-spinner" />
          ) : success ? (
            "✓ Success"
          ) : (
            "Create Account"
          )}
        </button>

        <p className="su-footer-link">
          Already have an account?{" "}
          <Link to="/login" className="su-link">Sign in</Link>
        </p>

        <p className="su-footer">Secured with AI · © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default SignUp;
