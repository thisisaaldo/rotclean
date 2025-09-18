import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const greetingText = "G'day, my name is Rot!";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const speechBubbleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      rotate: -5,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: {
        delay: 1,
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }
    },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return <section id="home" className="pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-8">
            <div className="space-y-4">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="flex items-center space-x-2 text-blue-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Melbourne's #1 Window Cleaning Service</span>
              </motion.div>
              
              <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="text-4xl md:text-6xl font-bold leading-tight">
                Professional Window Cleaning 
                <span className="gradient-text block">in Melbourne</span>
                <span className="text-gray-700">Residential & Commercial Services</span>
              </motion.h1>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="text-xl text-gray-600 max-w-lg">
                Melbourne's trusted window cleaning experts. Get instant online quotes, eco-friendly cleaning solutions, and streak-free results for your home or business. Fully insured and Melbourne-wide service.
              </motion.p>
            </div>

            {/* Features */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Instant Online Quotes</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Melbourne-Wide Service</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Fully Insured & Licensed</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Eco-Friendly Cleaning</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="flex flex-col sm:flex-row gap-4">
              <Button onClick={scrollToQuote} size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 py-6">
                Get Instant Quote
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-8 py-6">
                Call 0493105484
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.7
          }} className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">4.9/5</span> from 500+ Melbourne reviews
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="relative flex items-center justify-center">
            <div className="relative z-10 w-full max-w-md">
              <img alt="Friendly dog mascot for a Melbourne window cleaning service" className="w-full h-auto" src="https://horizons-cdn.hostinger.com/8f6778b3-225d-42e3-bca8-45e5960f8d2a/chatgpt-image-sep-16-2025-07_20_06-pm-JuVTp.png" />
                <motion.div 
                    className="speech-bubble"
                    variants={speechBubbleVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileInView="pulse"
                    viewport={{ once: true }}
                >
                    <motion.p 
                      className="font-semibold"
                      variants={sentence}
                      initial="hidden"
                      animate="visible"
                    >
                      {greetingText.split("").map((char, index) => (
                        <motion.span 
                          key={char + "-" + index} 
                          variants={letter}
                          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.p>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;