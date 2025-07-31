import React from "react";
import paypalLogo from '../assets/paypal-icon.png';
import cardLogo from '../assets/card-icons.png';

export default function PaymentPage() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', color: '#000', minHeight: '100vh', paddingBottom: '50px' }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '40px 10%', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 100%' }}>
          <h2 style={{ marginBottom: 10 }}>Finalize Your Payment</h2>
          <p style={{ color: '#555', marginBottom: 30 }}>Just a few steps away from unlocking your NTS Digital Library experience!</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 30, flexWrap: 'wrap', width: '100%' }}>
          <section style={{ flex: '1 1 400px', background: '#fff', padding: 30, borderRadius: 10, color: '#000', maxWidth: 600, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h3>Payment Details</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <input type="radio" name="method" defaultChecked /> Credit Card
              <img src={cardLogo} alt="Cards" height="30" />
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontWeight: 600, marginBottom: 5, display: 'block' }}>Name on card</label>
              <input type="text" placeholder="Name on card" style={inputStyle} />
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
              <input type="text" placeholder="Card number" style={inputStyle} />
              <input type="text" placeholder="MM/YY" style={inputStyle} />
              <input type="text" placeholder="CVC" style={inputStyle} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <input type="radio" name="method" /> PayPal
              <img src={paypalLogo} alt="PayPal" height="20" />
            </div>

            <h3>Billing Details</h3>
            <div style={{ marginBottom: 15 }}>
              <input type="email" placeholder="user.email@example.com" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <input type="text" placeholder="Zip code / Postcode" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <select style={inputStyle}>
                <option>United States of America</option>
                <option>India</option>
                <option>Canada</option>
              </select>
            </div>
          </section>

          <aside style={{ flex: '1 1 300px', background: '#fff', padding: 30, borderRadius: 10, color: '#000', maxWidth: 360, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h3>Your Subscription</h3>

            <div style={{ marginTop: 20 }}>
              <strong>Billing Cycle</strong>
              <div style={{ marginTop: 10 }}>
                <label><input type="radio" name="cycle" /> Annual <span style={{ fontSize: 12, color: '#0070f3' }}>Go Annual and Save!</span></label><br />
                <label><input type="radio" name="cycle" defaultChecked /> Monthly</label>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <p><strong>Pro Subscription Plan</strong><br />$9.00 <span style={{ fontSize: 12 }}>USD per month</span></p>
              <p style={{ color: '#f26b3a', cursor: 'pointer' }}>Add Coupon Code</p>
              <hr />
              <p><strong>Due today</strong> <span style={{ float: 'right' }}>$9.00 USD</span></p>
              <button style={{ marginTop: 20, width: '100%', backgroundColor: '#f26b3a', color: '#fff', padding: 12, border: 'none', borderRadius: 5, cursor: 'pointer' }}>Pay Now</button>
              <p style={{ fontSize: 12, color: '#888', marginTop: 10 }}>We'll bill you every month on the 27th, unless you cancel. You can cancel anytime.</p>
            </div>
          </aside>
        </div>
      </div>

      <footer style={{ background: '#fff', textAlign: 'center', padding: 30, marginTop: 60 }}>
        <h3 style={{ color: '#000' }}>NTS Digital Library</h3>
        <p style={{ color: '#000' }}>Stay updated!</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type="email" placeholder="Your email" style={{ padding: 10, border: '1px solid #ccc', borderRadius: '5px 0 0 5px', width: 250 }} />
          <button style={{ padding: '10px 20px', background: '#f26b3a', color: '#fff', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}>Subscribe</button>
        </div>
        <p style={{ marginTop: 20, fontSize: 12, color: '#666' }}>&copy; 2023 NTS Digital Library.</p>
      </footer>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: 10,
  fontSize: 16,
  border: '1px solid #ccc',
  borderRadius: 5
};
