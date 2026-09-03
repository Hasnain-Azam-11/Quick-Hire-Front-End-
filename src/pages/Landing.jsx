import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import PopularServices from '../components/PopularServices';
import Testimonials from '../components/Testimonials';
import SatisfactionGuarantee from '../components/SatisfactionGuarantee';
import HowItWorks from '../components/HowItWorks';
import GetHelpTaskMatrix from '../components/GetHelpTaskMatrix';
import Footer from '../components/Footer';

export default function Landing() {
  // ✅ No redirect here — public landing page for everyone
  return (
    <div className="min-h-screen bg-white font-sans text-[#0A0A0A] antialiased">
      <Navbar />
      <Hero />
      <Stats />
      <PopularServices />
      <Testimonials />
      <SatisfactionGuarantee />
      <HowItWorks />
      <GetHelpTaskMatrix />
      <Footer />
    </div>
  );
}