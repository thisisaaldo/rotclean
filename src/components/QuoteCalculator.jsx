import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
const QuoteCalculator = () => {
  const [formData, setFormData] = useState({
    propertyType: 'residential',
    windows: 10,
    floors: 1,
    frequency: 'one-time',
    extras: [],
    address: '',
    name: '',
    email: '',
    phone: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [quote, setQuote] = useState(null);
  const baseRates = {
    residential: {
      min: 8,
      max: 12
    },
    // per window
    commercial: {
      min: 12,
      max: 18
    },
    // per window
    'post-construction': {
      min: 15,
      max: 25
    } // per window
  };
  const frequencyDiscounts = {
    'one-time': 0,
    'monthly': 0.15,
    'bi-monthly': 0.10,
    'quarterly': 0.05
  };
  const extraServices = [{
    id: 'screens',
    name: 'Screen Cleaning',
    price: {
      min: 3,
      max: 5
    }
  }, {
    id: 'sills',
    name: 'Window Sill Cleaning',
    price: {
      min: 2,
      max: 4
    }
  }, {
    id: 'tracks',
    name: 'Track Cleaning',
    price: {
      min: 2,
      max: 4
    }
  }];
  const calculateQuote = () => {
    // Return fixed price ranges based on property type for rough estimates
    if (formData.propertyType === 'residential') {
      return {
        minTotal: '89',
        maxTotal: '299'
      };
    } else if (formData.propertyType === 'commercial') {
      return {
        minTotal: '149',
        maxTotal: '499'
      };
    } else if (formData.propertyType === 'post-construction') {
      return {
        minTotal: '149',
        maxTotal: '499'
      };
    }
    
    // Fallback
    return {
      minTotal: '89',
      maxTotal: '299'
    };
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleExtraToggle = extraId => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId) ? prev.extras.filter(id => id !== extraId) : [...prev.extras, extraId]
    }));
  };
  const handleGetQuote = () => {
    const calculatedQuote = calculateQuote();
    setQuote(calculatedQuote);
    setCurrentStep(2);
  };
  const handleBookService = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all contact details to book your service.",
        variant: "destructive"
      });
      return;
    }

    // Save booking to localStorage
    const booking = {
      id: Date.now(),
      ...formData,
      quote,
      date: new Date().toISOString(),
      status: 'pending'
    };
    const existingBookings = JSON.parse(localStorage.getItem('windowCleaningBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('windowCleaningBookings', JSON.stringify(existingBookings));
    toast({
      title: "Booking Confirmed! 🎉",
      description: "We'll contact you within 24 hours to schedule your service in Melbourne."
    });

    // Reset form
    setFormData({
      propertyType: 'residential',
      windows: 10,
      floors: 1,
      frequency: 'one-time',
      extras: [],
      address: '',
      name: '',
      email: '',
      phone: ''
    });
    setQuote(null);
    setCurrentStep(1);
  };
  return <section id="quote" className="py-20 bg-white">
      <div className="container mx-auto px-4">
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
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your <span className="gradient-text">Instant Melbourne Quote</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your window cleaning cost in seconds and book online for any Melbourne property.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Quote Calculator */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="space-y-8">
              {currentStep === 1 && <>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Property Type
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['residential', 'commercial', 'post-construction'].map(type => <button key={type} onClick={() => handleInputChange('propertyType', type)} className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.propertyType === type ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                          </button>)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Number of Windows
                        </label>
                        <input type="number" min="1" max="100" value={formData.windows} onChange={e => handleInputChange('windows', parseInt(e.target.value) || 1)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Number of Floors
                        </label>
                        <select value={formData.floors} onChange={e => handleInputChange('floors', parseInt(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                          <option value={1}>1 Floor</option>
                          <option value={2}>2 Floors</option>
                          <option value={3}>3 Floors</option>
                          <option value={4}>4+ Floors</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Service Frequency
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[{
                      value: 'one-time',
                      label: 'One Time'
                    }, {
                      value: 'monthly',
                      label: 'Monthly (15% off)'
                    }, {
                      value: 'bi-monthly',
                      label: 'Bi-Monthly (10% off)'
                    }, {
                      value: 'quarterly',
                      label: 'Quarterly (5% off)'
                    }].map(freq => <button key={freq.value} onClick={() => handleInputChange('frequency', freq.value)} className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.frequency === freq.value ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                            {freq.label}
                          </button>)}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Extra Services
                      </label>
                      <div className="space-y-2">
                        {extraServices.map(extra => <label key={extra.id} className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" checked={formData.extras.includes(extra.id)} onChange={() => handleExtraToggle(extra.id)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600" />
                            <span className="text-sm text-gray-700">
                              {extra.name} (additional cost per window)
                            </span>
                          </label>)}
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleGetQuote} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg py-6">
                    <Calculator className="w-5 h-5 mr-2" />
                    Get Instant Quote
                  </Button>
                </>}

              {currentStep === 2 && quote && <div className="space-y-6">
                  <div className="quote-card rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Your Melbourne Quote</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-2xl font-bold">
                        <span>Rough Estimate</span>
                        <span>${quote.minTotal} - ${quote.maxTotal}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This is a rough estimate range. A final quote will be provided after an on-site inspection.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Book Your Melbourne Service</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                      <input type="email" placeholder="Email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                      <input type="text" placeholder="Melbourne Address" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={() => setCurrentStep(1)} variant="outline" className="flex-1">
                      Back to Quote
                    </Button>
                    <Button onClick={handleBookService} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Service
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>No hidden fees. Cancel anytime. Fully insured.</p>
                  </div>
                </div>}
            </motion.div>

            {/* Right Side - Benefits */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="space-y-8">
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us in Melbourne?</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Melbourne Local & Trusted</h4>
                      <p className="text-gray-600 text-sm">
                        Family-owned business serving Melbourne for over 10 years
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Flexible Scheduling</h4>
                      <p className="text-gray-600 text-sm">
                        Same-day service available across Melbourne
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Easy Payment</h4>
                      <p className="text-gray-600 text-sm">
                        Multiple payment options including online payment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img alt="Before and after comparison of a dirty and clean window in a Melbourne home" className="w-full h-64 object-cover rounded-2xl" src="https://horizons-cdn.hostinger.com/8f6778b3-225d-42e3-bca8-45e5960f8d2a/window-wdYh4.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">See the Difference</h4>
                  <p className="text-sm opacity-90">Professional results every time</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default QuoteCalculator;