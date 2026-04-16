import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header'; // Import the Header component
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import ForFundis from './components/ForFundis';
import Testimonials from './components/Testimonials';
import DownloadApp from './components/DownloadApp';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import FundiPlatform from './components/FundiPlatform';
import GetStartedPage from './components/GetStartedPage';
import ClientPlatform from './components/ClientPlatform';
import FundiGetStartedPage from './components/FundiGetStartedPage';


import AboutUs from './components/AboutUs'; // Import AboutUs component
import ContactUs from './components/ContactUs'; // Import ContactUs component
import NotFound from './components/NotFound'; // Import NotFound component

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Render the Header component here */}
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <HowItWorks />
              <Services />
              <WhyChooseUs />
              <ForFundis />
              <Testimonials />
              <DownloadApp />
              <Footer />
            </>
          } />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/fundi-platform" element={<FundiPlatform />} />

          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/client-platform" element={<ClientPlatform />} />
          <Route path="/fundi-get-started" element={<FundiGetStartedPage />} />
          <Route path="/about" element={<AboutUs />} /> {/* Route for About Us page */}
          <Route path="/contact" element={<ContactUs />} /> {/* Route for Contact Us page */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
