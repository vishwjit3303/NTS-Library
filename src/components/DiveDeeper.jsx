import React from 'react';

const DiveDeeper = () => {
  return (
    <section style={{ backgroundColor: '#fdeef2', padding: '3rem 1rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left-aligned content */}
        <div style={{ flex: '1 1 600px', textAlign: 'left' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '0.75rem',
              color: '#1a1a1a',
            }}
          >
            Ready to Dive Deeper?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#6b6b6b',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Explore premium content, unlock exclusive features, and enhance your
            digital library experience with a subscription plan.
          </p>
        </div>

        {/* Button on the right */}
        <div style={{ flexShrink: 0 }}>
          <button
            style={{
              backgroundColor: '#6c63ff',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '0.75rem 1.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              whiteSpace: 'nowrap',
            }}
          >
            View Subscription Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiveDeeper;
