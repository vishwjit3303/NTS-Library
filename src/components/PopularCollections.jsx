import React from 'react';

const collections = [
  {
    id: 1,
    title: 'Literary Fiction Gems',
    description: 'Explore timeless narratives and modern masterpieces.',
    items: 320,
    imageUrl: '/images/1.jpeg',
  },
  {
    id: 2,
    title: 'Cutting-Edge Science',
    description: 'Discover breakthroughs in physics, biology, and beyond.',
    items: 180,
    imageUrl: '/images/2.jpeg',
  },
  {
    id: 3,
    title: 'World History Archives',
    description: 'Journals and records from ancient civilizations to modern times.',
    items: 450,
    imageUrl: '/images/3.jpeg',
  },
  {
    id: 4,
    title: 'Visual Arts Compendium',
    description: 'Immerse yourself in art history and contemporary works.',
    items: 210,
    imageUrl: '/images/4.jpeg',
  },
  {
    id: 5,
    title: 'Tech Innovation Hub',
    description: 'Stay updated with the latest in software, AI, and cybersecurity.',
    items: 280,
    imageUrl: '/images/5.jpeg',
  },
  {
    id: 6,
    title: 'Global Travel Guides',
    description: 'Plan your next adventure with our comprehensive travel resources.',
    items: 150,
    imageUrl: '/images/6.jpeg',
  },
];

const PopularCollections = () => {
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ textAlign: 'center', fontWeight: '700', fontSize: '1.75rem', marginBottom: '2rem' }}>
        Popular Collections
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {collections.map(({ id, title, description, items, imageUrl }) => (
          <div
            key={id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{ width: '100%', height: '160px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem', flexGrow: 1 }}>
                {description}
              </p>
              <div style={{ fontSize: '0.875rem', color: '#999', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ color: '#d9534f' }}
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.42-3.58-8-8-8zm0 14.5c-3.59 0-6.5-2.91-6.5-6.5S4.41 1.5 8 1.5 14.5 4.41 14.5 8 11.59 14.5 8 14.5z"/>
                  <path d="M10.5 7h-5v2h5V7z"/>
                </svg>
                <span>{items} Items</span>
              </div>
              <a
                href="#"
                style={{
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  color: '#4a6cf7',
                  textDecoration: 'none',
                  fontWeight: '500',
                }}
              >
                View Collection
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCollections;
