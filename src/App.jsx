import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Coins from './pages/coins';
import Subscription from './pages/subscription';
import AuthFlow from './components/AuthFlow';
import PaymentPage from './pages/PaymentPage';
import './App.css';

const RolesPermissionsPage = lazy(() => import('./pages/RolesPermissionsPage'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/auth" element={<AuthFlow />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/roles-permissions" element={<RolesPermissionsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
