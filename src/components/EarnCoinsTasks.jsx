import React from 'react';

const tasks = [
  {
    id: 1,
    title: 'Submit a book review',
    description: 'Share your thoughts on a recently read e-book to help others.',
    coins: 30,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" viewBox="0 0 24 24">
        <path d="M19 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM9 4h10v16H9V4z"/>
        <path d="M7 6H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2V6z"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Participate in a forum discussion',
    description: 'Join the community and contribute to ongoing discussions.',
    coins: 30,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" viewBox="0 0 24 24">
        <path d="M21 6h-2v9H5v2h14a1 1 0 0 0 1-1V6z"/>
        <path d="M3 4h14v2H3z"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Update your payment method',
    description: 'Ensure your subscription remains active by updating details.',
    coins: 20,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" viewBox="0 0 24 24">
        <path d="M21 7H3v10h18V7zM3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>
        <path d="M7 10h10v2H7z"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Complete your profile',
    description: 'Fill in all profile sections to unlock new features.',
    coins: 40,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" viewBox="0 0 24 24">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/>
        <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"/>
      </svg>
    ),
  },
];

const EarnCoinsTasks = () => {
  return (
    <section style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{
        fontWeight: '700',
        fontSize: '1.75rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#222'
      }}>
        Earn Coins by Completing Tasks
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
      }}>
        {tasks.map(({ id, title, description, coins, icon }) => (
          <div key={id} style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #eee',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{
                border: '1.5px solid #6c63ff',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
              }}>
                {icon}
              </div>
              <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#f06292' }}>
                <span style={{ fontSize: '1rem', fontWeight: '700', marginRight: '4px' }}>{coins}</span>
                Coins
              </div>
            </div>
            <h3 style={{ fontWeight: '700', fontSize: '1rem', margin: '0 0 0.25rem 0' }}>{title}</h3>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: '0 0 1rem 0' }}>{description}</p>
            <button style={{
              backgroundColor: '#6c63ff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.625rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: 'auto',
            }}>
              Complete Task
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EarnCoinsTasks;
