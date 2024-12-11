import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const benefits = [
    'Personalized financial strategies',
    'Expert team with decades of experience',
    'Comprehensive wealth management solutions',
    'Regular portfolio reviews and adjustments',
    'Transparent fee structure',
    'Dedicated support team',
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Agent Wealth Advisor?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              With over two decades of experience in wealth management, we've helped thousands of clients
              achieve their financial goals. Our approach combines traditional wisdom with modern
              investment strategies.
            </p>
            <div className="mt-8">
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-blue-600" />
                    <span className="ml-3 text-gray-500">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="aspect-w-16 aspect-h-9">
              <img
                className="rounded-lg shadow-lg object-cover"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team meeting"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;