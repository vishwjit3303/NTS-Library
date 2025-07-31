import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section: Title & Newsletter */}
        <div style={styles.leftSection}>
          <h3 style={styles.title}>NTS Digital Library</h3>
          <p style={styles.subtitle}>Stay updated!</p>
          <form style={styles.form}>
            <input
              type="email"
              placeholder="Your email"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#ff6a00")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e65a00")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff6a00")}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Middle Section: Quick Links */}
        <div style={styles.middleSection}>
          <h4 style={styles.sectionHeading}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li>
              <a href="#" style={styles.link}>
                About Us
              </a>
            </li>
            <li>
              <a href="#" style={styles.link}>
                Services
              </a>
            </li>
            <li>
              <a href="#" style={styles.link}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" style={styles.link}>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Contact & Social */}
        <div style={styles.rightSection}>
          <h4 style={styles.sectionHeading}>Contact Us</h4>
          <p style={styles.contactText}>Email: support@ntslibrary.com</p>
          <p style={styles.contactText}>Phone: +1 (555) 123-4567</p>
          <div style={styles.socialIcons}>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" style={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.8 2.6 4.8 6v9.7h-4v-8.6c0-2-.1-4.5-2.7-4.5-2.7 0-3.1 2.1-3.1 4.3v8.8H8V8z" />
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" aria-label="Facebook" style={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.594 0 0 .594 0 1.326V22.67C0 23.4.594 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.787 4.658-4.787 1.324 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.762v2.31h3.59l-.467 3.623h-3.123V24h6.116c.73 0 1.324-.6 1.324-1.33V1.325C24 .594 23.405 0 22.675 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={styles.footerBottom}>
        © 2025 NTS Digital Library. All rights reserved.
      </div>
    </footer>
  );
};

// Inline Styles
const styles = {
  footer: {
    backgroundColor: "#f9f9f9",
    padding: "3rem 1rem",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#222",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "2rem",
  },
  leftSection: {
    flex: "1 1 300px",
    minWidth: "280px",
  },
  title: {
    fontWeight: "700",
    marginBottom: "0.75rem",
    fontSize: "1.75rem",
    letterSpacing: "0.05em",
  },
  subtitle: {
    marginBottom: "1.5rem",
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#555",
  },
  form: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    maxWidth: "400px",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    flex: "1 1 auto",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
  },
  button: {
    backgroundColor: "#ff6a00",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 1.5rem",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1rem",
    boxShadow: "0 4px 8px rgba(255, 106, 0, 0.4)",
    transition: "background-color 0.3s ease",
  },
  middleSection: {
    flex: "1 1 200px",
    minWidth: "180px",
  },
  sectionHeading: {
    fontWeight: "700",
    marginBottom: "1rem",
    fontSize: "1.25rem",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "#555",
  },
  link: {
    color: "#555",
    textDecoration: "none",
    display: "block",
    marginBottom: "0.5rem",
  },
  rightSection: {
    flex: "1 1 250px",
    minWidth: "220px",
    textAlign: "center",
  },
  contactText: {
    margin: "0.25rem 0",
    color: "#666",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "1.25rem",
    marginTop: "1rem",
  },
  icon: {
    color: "#444",
    fontSize: "1.75rem",
  },
  footerBottom: {
    marginTop: "2rem",
    borderTop: "1px solid #ddd",
    paddingTop: "1rem",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#777",
  },
};

export default Footer;
