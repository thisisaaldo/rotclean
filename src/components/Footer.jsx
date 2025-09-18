import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
const Footer = () => {
  const {
    toast
  } = useToast();
  const handleNotImplemented = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: "We are working hard to bring this feature to you soon."
    });
  };
  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐾</span>
              </div>
              <span className="text-xl font-bold">RotClean</span>
            </div>
            <p className="text-gray-300 text-sm">
              Melbourne's trusted professional window cleaning service for residential and commercial properties.
            </p>
            <div className="flex space-x-4">
              <button onClick={handleNotImplemented} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </button>
              <button onClick={handleNotImplemented} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} viewport={{
          once: true
        }}>
            <p className="text-lg font-semibold mb-4 block">Quick Links</p>
            <div className="space-y-2">
              <button onClick={() => scrollToSection('home')} className="block text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block text-gray-300 hover:text-white transition-colors text-sm">
                Services
              </button>
              <button onClick={() => scrollToSection('quote')} className="block text-gray-300 hover:text-white transition-colors text-sm">
                Get Quote
              </button>
              <button onClick={() => scrollToSection('about')} className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact
              </button>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            <p className="text-lg font-semibold mb-4 block">Melbourne Services</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Residential Windows</p>
              <p>Commercial Buildings</p>
              <p>Post-Construction Cleanup</p>
              <p>Screen Cleaning</p>
              <p></p>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }}>
            <p className="text-lg font-semibold mb-4 block">Contact Info</p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">0493105484</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">info@rotclean.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Greater Melbourne Area</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} viewport={{
        once: true
      }} className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} RotClean Melbourne. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={handleNotImplemented} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={handleNotImplemented} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
          </div>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;