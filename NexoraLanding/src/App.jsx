import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Questions from "./sections/Questions";
import TrustSection from "./sections/TrustSection";
import DashboardCTA from "./sections/DashboardCTA";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Questions />
        <TrustSection />
        <DashboardCTA />
      </main>
      <Footer />
    </>
  );
}