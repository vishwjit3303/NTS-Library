import React from 'react';

const acquisitions = [
  {
    id: 1,
    title: 'The Green Planet: A Sustainable Future',
    author: 'By Dr. Emily Nature',
    rating: 4.9,
    reviews: 150,
    imageUrl: '/images/11.jpeg',
  },
  {
    id: 2,
    title: 'Coding Mastery: From Novice to Pro',
    author: 'By John Coder',
    rating: 4.7,
    reviews: 210,
    imageUrl: '/images/12.jpeg',
  },
  {
    id: 3,
    title: 'Unraveling Ancient Mysteries',
    author: 'By Prof. Historian',
    rating: 4.6,
    reviews: 95,
    imageUrl: '/images/13.jpeg',
  },
  {
    id: 4,
    title: 'Digital Marketing Handbook 2024',
    author: 'By Sarah Innovate',
    rating: 4.8,
    reviews: 180,
    imageUrl: '/images/14.jpeg',
  },
  {
    id: 5,
    title: 'The Global Culinary Journey',
    author: 'By Chef Antoine',
    rating: 4.9,
    reviews: 130,
    imageUrl: '/images/15.jpeg',
  },
  {
    id: 6,
    title: 'Beyond the Stars: Space Exploration',
    author: 'By Dr. Astro',
    rating: 4.7,
    reviews: 110,
    imageUrl: '/images/16.jpeg',
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(fullStars)].map((_, i) => (
        <svg key={'full' + i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#f5c518" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.23L12 18.896l-7.416 4.604L6 15.27 0 9.423l8.332-1.268z"/>
        </svg>
      ))}
      {halfStar && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#f5c518" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="#f5c518" />
              <stop offset="50%" stopColor="#d3d3d3" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGrad)" d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.23L12 18.896l-7.416 4.604L6 15.27 0 9.423l8.332-1.268z"/>
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={'empty' + i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#d3d3d3" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.23L12 18.896l-7.416 4.604L6 15.27 0 9.423l8.332-1.268z"/>
        </svg>
      ))}
    </div>
  );
};

const LatestAcquisitions = () => {
  return (
    <section style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ fontWeight: '700', fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Latest Acquisitions
      </h2>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
        }}
      >
        {acquisitions.map(({ id, title, author, rating, reviews, imageUrl }) => (
          <div
            key={id}
            style={{
              minWidth: '180px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{ width: '100%', height: '180px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.75rem 1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>{author}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                <StarRating rating={rating} />
                <span style={{ fontSize: '0.75rem', color: '#999' }}>
                  {rating.toFixed(1)} ({reviews} reviews)
                </span>
              </div>
              <a
                href="#"
                style={{
                  marginTop: 'auto',
                  fontSize: '0.875rem',
                  color: '#4a6cf7',
                  textDecoration: 'none',
                  fontWeight: '500',
                }}
              >
                Read Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestAcquisitions;
