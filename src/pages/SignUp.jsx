import React from 'react';
import '../styles/SignIn.css';

const SignUp = ({ switchToSignIn }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png"
            alt="logo"
          />
        </div>
        <h2>Create Account</h2>
        <p>Join us by creating your account</p>

        <form>
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" required />

          <label>Email</label>
          <input type="email" placeholder="name@example.com" required />

          <label>Phone Number</label>
          <input type="tel" placeholder="1234567890" required pattern="[0-9]{10}" />

          <label>Password</label>
          <input type="password" placeholder="********" required />

          <label>Confirm Password</label>
          <input type="password" placeholder="********" required />

          <button type="submit">Create Account</button>
        </form>

        <div className="footer-links">
          <p className="signup-text">
            Already have an account?{' '}
            <span className="signup-link" onClick={switchToSignIn} style={{ cursor: 'pointer' }}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
