import React from 'react';
import Hero from '../components/hero';
import AboutNTS from '../components/AboutNTS';
import PopularCollections from '../components/PopularCollections';
import LatestAcquisitions from '../components/LatestAcquisitions';
import EarnCoinsTasks from '../components/EarnCoinsTasks';
import DiveDeeper from '../components/DiveDeeper';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main>
      <Hero />
      <AboutNTS />
      <PopularCollections />
      <LatestAcquisitions />
      <EarnCoinsTasks />
      <DiveDeeper />
      <Footer />
    </main>
  );
};

export default Home;
