import React from 'react';
import '../styles/SignIn.css';

const ForgetPassword = ({ switchToSignIn }) => {
  return (
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: 'center' }}>Forget Password</h2>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '25px' }}>
          Don't worry, it happens. Please enter the email address associated with your account.
        </p>

        <form>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            required
            style={{
              paddingLeft: '35px',
              backgroundImage: 'url("https://img.icons8.com/ios-glyphs/30/000000/new-post.png")',
              backgroundPosition: '10px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '18px 18px',
            }}
          />

          <button type="submit">Send OTP</button>
        </form>

        <div className="footer-links">
          <p className="signup-text">
            You remember your password?{' '}
            <span className="signup-link" onClick={() => switchToSignIn()} style={{ cursor: 'pointer' }}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
