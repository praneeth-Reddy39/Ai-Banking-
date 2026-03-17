import "./About.css";

function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>AI Banking System</h1>
        <p>
          A secure, intelligent, and user-friendly digital banking application integrating React and Spring Boot with AI.
        </p>
      </section>

      <section className="about-section">
        <h2>Overview</h2>
        <p>
          The AI Banking System is a modern web-based banking application developed to provide secure, intelligent, and user-friendly digital financial services. The system integrates advanced web technologies with Artificial Intelligence techniques to enhance banking operations such as account management, fund transfers, loan processing, and fraud detection. The primary objective of this project is to design and implement a smart banking platform that improves operational efficiency, strengthens security, and enhances customer experience.
        </p>
      </section>

      <section className="about-section">
        <h2>Frontend (React)</h2>
        <p>
          The frontend is developed using React to enable dynamic, responsive, and interactive interfaces. It ensures smooth navigation and real-time updates without page reloads. Modules include user registration, secure login, account dashboard, balance inquiry, fund transfer, transaction history, and loan application submission. The component-based architecture makes the application scalable and easy to maintain.
        </p>
      </section>

      <section className="about-section">
        <h2>Backend (Spring Boot)</h2>
        <p>
          The backend uses Spring Boot to provide robust, secure, and scalable RESTful services. It handles core functionalities such as business logic, database communication, authentication, authorization, and transaction management. The system uses JWT for secure authentication and role-based access control. Passwords are encrypted using secure hashing to protect sensitive user information.
        </p>
      </section>

      <section className="about-section">
        <h2>Database</h2>
        <p>
          A relational database such as MySQL stores structured banking data including user details, account balances, transactions, and loan information. This ensures data integrity, consistency, and reliable transaction management—critical for any banking system.
        </p>
      </section>

      <section className="about-section">
        <h2>AI Modules</h2>
        <p>
          The platform incorporates AI-based modules. A fraud detection module analyzes transaction patterns, amounts, and frequency to identify suspicious activities in real time. Machine learning algorithms classify transactions as normal or potentially fraudulent. A loan approval prediction module evaluates parameters such as income, credit score, and repayment history to assist automated decision-making. An AI-powered chatbot can provide instant responses to common queries, improving support efficiency.
        </p>
      </section>

      <section className="about-section">
        <h2>Security</h2>
        <p>
          Security is a key focus: secure API communication, encrypted data handling, authentication tokens, and rigorous validation protect against unauthorized access and common web vulnerabilities. The modular architecture allows easy expansion and integration of additional AI features.
        </p>
      </section>

      <section className="about-section">
        <h2>Conclusion</h2>
        <p>
          The AI Banking System demonstrates how React and Spring Boot can be combined with AI to create a secure, scalable, and intelligent digital banking solution—improving security, automating decisions, and enhancing overall efficiency.
        </p>
      </section>
    </div>
  );
}

export default About;
