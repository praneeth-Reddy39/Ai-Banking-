import "./Contact.css";

function Contact() {
  return (
    <div className="page contact">
      <section className="page-hero">
        <h1>Contact</h1>
        <p>We’re here to help. Reach out and we’ll get back to you quickly.</p>
      </section>

      <section className="contact-grid">
        <div className="contact-card">
          <h3>Support</h3>
          <p>Email: support@aibanking.local</p>
          <p>Phone: +1 (555) 000-0000</p>
        </div>
        <div className="contact-form">
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full name" required />
            <input type="email" placeholder="Email address" required />
            <textarea placeholder="Message" rows="4" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
