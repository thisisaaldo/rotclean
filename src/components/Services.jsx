import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building, Construction, Droplets, Shield, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Windows',
      description: 'Professional cleaning for Melbourne homes, apartments, and condos',
      features: ['Interior & Exterior', 'Screen Cleaning', 'Sill Wiping'],
      price: 'Starting at $89'
    },
    {
      icon: Building,
      title: 'Commercial Buildings',
      description: 'Retail stores & up to 2-story commercial buildings in Melbourne. No high-rise.',
      features: ['Retail Store Fronts', 'Office Buildings (Up to 2 Stories)', 'Regular Maintenance', 'Insured Service'],
      price: 'Custom Quote'
    },
    {
      icon: Construction,
      title: 'Post-Construction',
      description: 'Construction cleanup and new building window cleaning across Melbourne',
      features: ['Paint Removal', 'Debris Cleaning', 'Final Touch-ups'],
      price: 'Starting at $149'
    }
  ];

  const features = [
    {
      icon: Droplets,
      title: 'Streak-Free Guarantee',
      description: 'Professional techniques ensure crystal clear results every time'
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Complete liability and workers compensation coverage for Melbourne'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Same-day service available with convenient time slots'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Melbourne <span className="gradient-text">Window Cleaning Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional window cleaning services in Melbourne for every need, from residential homes to commercial buildings.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="service-card rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="text-2xl font-bold gradient-text">{service.price}</div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;