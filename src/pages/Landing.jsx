import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import TopWorkers from "../components/TopWorkers";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Landing() {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    if (role === "client") {
      return <Navigate to="/client/dashboard" replace />;
    }
    if (role === "worker") {
      return <Navigate to="/worker/dashboard" replace />;
    }
  }

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