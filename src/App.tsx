import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import References from './pages/References';
import About from './pages/About';
import Projets from './pages/Projets';
import { ContactPage } from './components/Pages';

function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="bg-background text-on-background antialiased selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col gap-0">
        <Routes>
          <Route path="/" element={
            <>
              <section id="accueil">
                <Home />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="references">
                <References />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="contact" className="bg-surface">
                <ContactPage />
              </section>
            </>
          } />
          <Route path="/projets" element={<Projets />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
