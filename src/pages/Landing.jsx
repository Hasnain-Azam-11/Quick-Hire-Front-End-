import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import TopWorkers from "../components/TopWorkers";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <TopWorkers />
      <Stats />
      <Footer />
    </div>
  );
}