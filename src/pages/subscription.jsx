import React from 'react'
import Navbar from '../components/Navbar';
import './sub.css';
import plan1 from '/images/basic.png';
import plan2 from '/images/pro.png';
import plan3 from '/images/premium.png';
import plan4 from '/images/corporate.png';
import plan5 from '/images/academic.png';

import img1 from '/images/c1.png';
import img2 from '/images/c2.png';
import img3 from '/images/c3.png';
import img4 from '/images/c4.png';
import img5 from '/images/c5.png';
import img6 from '/images/c6.png';
import img7 from '/images/c7.png';
import img8 from '/images/c8.png';

const sub = () => {

  const PricingCard = ({ index, title, subtitle, price, image, features }) => (
    <div className="pricing-card">
      <img src={image} alt={title} className="pricing-image" />
      <h2 className="plan-title">{title}</h2>
      <p className="plan-subtitle">{subtitle}</p>
      <ul className="plan-features">
        {features.map((f, i) => (
          <li key={i} className="feature-item">✔️ {f}</li>
        ))}
        <p className="plan-price">{price}</p>
      </ul>
      {/* ✅ Conditionally show button only if not the first card */}
      {index !== 0 && (
        <button className="choose-btn">Choose Plan</button>
      )}
    </div>
  );


  const plans = [
    {
      title: 'Basic Plan (Free) ',
      subtitle: 'Perfect for casual readers to get started',
      // price: '₹299/month',
      image: plan1,
      features: ['10 courses', 'Email support', 'Community Access']
    },
    {
      title: 'Pro Plan',
      subtitle: 'Unlock enhanced features and expanded content.',
      price: '₹599/month',
      image: plan2,
      features: ['Access to public domain library', 'Basic reading customizations', 'Offline reading of downloaded content', 'Sync up to 2 devices']
    },
    {
      title: 'Premium Plan',
      subtitle: 'Unlock enhanced features and expanded content.',
      price: '₹999/month',
      image: plan3,
      features: ['Access to public domain library', 'Basic reading customizations', 'Offline reading of downloaded content', 'Sync up to 2 devices']
    },
    {
      title: 'Academic',
      subtitle: 'Unlock enhanced features and expanded content.',
      price: '₹999/month',
      image: plan4,
      features: ['Access to public domain library', 'Basic reading customizations', 'Offline reading of downloaded content', 'Sync up to 2 devices']
    },
    {
      title: ' Corporate',
      subtitle: 'Unlock enhanced features and expanded content.',
      price: '₹999/month',
      image: plan5,
      features: ['Access to public domain library', 'Basic reading customizations', 'Offline reading of downloaded content', 'Sync up to 2 devices']
    },

  ];



  const cardData = [
    { title: 'Vast Digital Collection', subtitle: 'Explore millions of books, articles, and media across diverse genres and subjects.' },
    { title: 'Continues Learning', subtitle: 'Stay ahead with constantly updated content and cutting-edge research materials.' },
    { title: 'Exclusive Content', subtitle: 'Gain access to premium, member-only content and early releases.' },
    { title: 'Earn and Redeem Coins', subtitle: 'Participate in tasks, earn coins, and redeem them for exclusive benefits and content.' },
    { title: 'Engaging Community', subtitle: 'Connect with fellow enthusiasts, share insights, and collaborate on projects.' },
    { title: 'Secure and Easy Payment', subtitle: 'Enjoy seamless and secure payment processing for all your subscriptions and purchases.' },
  ];



  const cards = [
    { image: img1, title: 'AI Ethics in Practice', subtitle: 'Technology' },
    { image: img2, title: 'Path to Mental Wellness', subtitle: 'Health and Wellness' },
    { image: img3, title: 'A Culinary Journey', subtitle: 'Culture and Lifestyle' },
    { image: img4, title: 'Blockchain For Begginers', subtitle: 'Finance and Crypto' },
    { image: img5, title: 'Sustainable Living Guide', subtitle: 'Enviroment' },
    { image: img6, title: 'Mastering Digital Art', subtitle: 'Arts and Design' },
    { image: img7, title: 'Beyond our Solar System', subtitle: 'Science' },
    { image: img8, title: 'The Fiture of Work ', subtitle: 'Bussiness and Economy' },
  ];
  return (
    <>
      <div className='sub'>
        <Navbar />
        <div className='text3'>
          Unlock Unlimited Knowledge
        </div>
        <div className='text4'>
          Choose the perfect plan to access exclusive content, advanced features, and a vibrant community.
        </div>
        <button className='btn3'>Explore Our Plans</button>
      </div>

      <div className='lowerText'>
        Flaxible Plans For Every Learner
        
        <div className="pricing-section">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              index={index} // 🟢 pass index here
              title={plan.title}
              subtitle={plan.subtitle}
              image={plan.image}
              features={plan.features}
              price={plan.price}
            />
          ))}
        </div>
      </div>

      <div className='lowerText2'>
        Why Subscribe to NTS Digital Library?

        <div className="card-grid">
          {cardData.map((card, index) => (
            <div key={index} className="card">
              {/* <img src={card.logo} alt={card.title} className="card-logo" /> */}
              <h3 className="card-title">{card.title}</h3>
              <p className="card-subtitle">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='last-text'> Discover Our Exclusive Content
        <div className="card-container">
          {cards.map((card, index) => (
            <div className="custom-card" key={index}>
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-subtitle">{card.subtitle}</p>
                <span className="view-details">View Details ➝</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
};

export default sub;
