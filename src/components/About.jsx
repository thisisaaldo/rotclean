import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Shield } from 'lucide-react';
const About = () => {
  const stats = [{
    icon: Users,
    number: '500+',
    label: 'Happy Customers'
  }, {
    icon: Clock,
    number: '10+',
    label: 'Years in Melbourne'
  }, {
    icon: Award,
    number: '4.9',
    label: 'Star Rating'
  }, {
    icon: Shield,
    number: '100%',
    label: 'Insured'
  }];
  return <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
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
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Melbourne's Choice: <span className="gradient-text">RotClean</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">Founded in 2015, RotClean Windows has been the trusted choice for professional window cleaning services in Melbourne. We combine traditional craftsmanship with modern technology to deliver exceptional results.</p>
              <p className="text-lg text-gray-600">
                Our team of certified professionals uses eco-friendly cleaning solutions and 
                state-of-the-art equipment to ensure your windows are spotless and streak-free. 
                We're fully insured for all Melbourne properties and committed to your complete satisfaction.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="text-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Right Content - Images */}
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
        }} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img alt="Professional window cleaning team posing in Melbourne" className="w-full h-48 object-cover rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1561114601-5c8f97072146" />
                <img alt="Window cleaning equipment and eco-friendly solutions" className="w-full h-32 object-cover rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1642764732251-9dacf60eb423" />
              </div>
              <div className="space-y-4 mt-8">
                <img alt="Clean office building windows in Melbourne CBD" className="w-full h-32 object-cover rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1702264955697-8239bcde88f1" />
                <img alt="A residential house in a Melbourne suburb with perfectly clean windows" className="w-full h-48 object-cover rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1692690135399-abf8d0d102ce" />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div animate={{
            y: [-5, 5, -5]
          }} transition={{
            duration: 3,
            repeat: Infinity
          }} className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-sm font-bold">Eco-Friendly</div>
                <div className="text-xs">Solutions</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;