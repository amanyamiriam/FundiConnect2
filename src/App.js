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
import UserProfile from './components/UserProfile';
import JobMarket from './components/JobMarket';
import PaymentSystem from './components/PaymentSystem';
import MessagingSystem from './components/MessagingSystem';
import BookingSystem from './components/BookingSystem';
import ReviewSystem from './components/ReviewSystem';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import FAQ from './components/FAQ';

import AboutUs from './components/AboutUs'; // Import AboutUs component
import ContactUs from './components/ContactUs'; // Import ContactUs component
import NotFound from './components/NotFound'; // Import NotFound component
import InvestorContactForm from './components/InvestorContactForm';
import PartnerApplicationForm from './components/PartnerApplicationForm';
import FundiRegistrationForm from './components/FundiRegistrationForm';

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
          <Route path="/job-market" element={<JobMarket />} />
          <Route path="/payments" element={<PaymentSystem />} />
          <Route path="/messages" element={<MessagingSystem />} />
          <Route path="/bookings" element={<BookingSystem />} />
          <Route path="/reviews" element={<ReviewSystem />} />
          <Route path="/client-profile" element={<UserProfile userType="client" />} />
          <Route path="/fundi-profile" element={<UserProfile userType="fundi" />} />
          <Route path="/about" element={<AboutUs />} /> {/* Route for About Us page */}
          <Route path="/contact" element={<ContactUs />} /> {/* Route for Contact Us page */}
          <Route path="/investors" element={<InvestorContactForm />} />
          <Route path="/partners" element={<PartnerApplicationForm />} />
          <Route path="/fundi-registration" element={<FundiRegistrationForm />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
