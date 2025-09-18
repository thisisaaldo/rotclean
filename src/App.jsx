
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import QuoteCalculator from '@/components/QuoteCalculator';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <Helmet>
        <title>Melbourne’s #1 Window Cleaning Service - RotClean</title>
        <meta name="description" content="Get crystal-clear, streak-free windows for your home or business. At RotClean, we make booking easy — get an instant online quote in seconds and schedule your service today." />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <QuoteCalculator />
        <About />
        <Contact />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
