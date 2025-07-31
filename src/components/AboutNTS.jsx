import React from 'react';
import './AboutNTS.css';

const AboutNTS = () => {
  return (
    <section className="about-nts-container">
      <h2 className="about-nts-title">About the NTS</h2>
      <p className="about-nts-subtitle">
        Meet the visionary leading our research initiatives, dedicated to pushing the boundaries of knowledge and fostering global collaboration.
      </p>
      <div className="about-nts-content">
        <div className="about-nts-image">
          {/* Dummy placeholder image */}
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: '#aaa',
            borderRadius: '12px'
          }}>
            &#128100;
          </div>
        </div>
        <div className="about-nts-text">
          <h3>NTS description..</h3>
          <p>
            Dr. Anya Sharma is a distinguished researcher and thought leader with over 15 years of experience in interdisciplinary studies. Her work primarily focuses on the intersection of artificial intelligence, environmental science, and social impact. Anya is passionate about leveraging cutting-edge technology to solve complex global challenges and is a strong advocate for open science and collaborative research models. She has published numerous peer-reviewed articles and frequently speaks at international conferences, inspiring the next generation of innovators.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutNTS;
