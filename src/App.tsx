import { Routes, Route } from "react-router-dom";
import { RulesPage } from "./pages/RulesPage";
import { Header } from "./components/ui/header";
import { About } from "./components/ui/about";
import { Hero } from "./components/ui/image-main";
import { Location } from "./components/ui/location";
import { ApartmentCatalog } from "./components/ui/catalog";
import { Rules } from "./components/ui/rules";
import { AdditionalServices } from "./components/ui/additional-services";
import { Reviews } from "./components/ui/reviews";
import { Questions } from "./components/ui/questions";
import { Booking } from "./components/ui/booking";
import { Footer } from "./components/ui/footer";
import { Contact } from "./components/ui/contact/contact"
import { AdminPage } from "./pages/AdminPage";
import { ApartmentPage } from "./pages/ApartmentPage";
import { AnimatedSection } from "./components/ui//animated/AnimatedSection";
import "./App.css";

function MainPage() {
  return (
    <>
      <Header />

      <Hero />

      <AnimatedSection>
        <About />
      </AnimatedSection>

      <AnimatedSection>
        <Location />
      </AnimatedSection>

      <AnimatedSection>
        <ApartmentCatalog />
      </AnimatedSection>

      <AnimatedSection>
        <Rules />
      </AnimatedSection>

      <AnimatedSection>
        <AdditionalServices />
      </AnimatedSection>

      <AnimatedSection>
        <Reviews />
      </AnimatedSection>

      <AnimatedSection>
        <Questions />
      </AnimatedSection>

      <AnimatedSection>
        <Booking />
      </AnimatedSection>

      <AnimatedSection>
        <Contact />
      </AnimatedSection>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin-volpart" element={<AdminPage />} />
      <Route path="/apartments/:id" element={<ApartmentPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/apartments/:id" element={<ApartmentPage />} />
    </Routes>
  );
}

export default App;