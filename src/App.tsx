import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Testimonials from './components/sections/Testimonials';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <Hero />
        <Services />
        <About />
        <Testimonials />
      </div>
    </div>
  );
}

export default App;