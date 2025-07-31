import React from 'react';
import '../styles/SignIn.css';

const SignIn = ({ switchToSignUp, switchToForget }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png"
            alt="logo"
          />
        </div>

        <h2>Welcome Back</h2>
        <p>Enter your credentials to access your account.</p>

        <form>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="name@example.com" required />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="********" required />

          <button type="submit">Log In</button>
        </form>

        <div className="footer-links">
          <p className="forgot-password" onClick={switchToForget} style={{ color: '#f97316', cursor: 'pointer' }}>
            Forgot Password?
          </p>
          <p className="signup-text">
            Haven't any account?{' '}
            <span className="signup-link" onClick={switchToSignUp} style={{ cursor: 'pointer' }}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
