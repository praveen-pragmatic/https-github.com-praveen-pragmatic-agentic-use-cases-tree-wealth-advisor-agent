import React from 'react';
import { BarChart3, PiggyBank, LineChart, Calculator, Building2, HeartHandshake } from 'lucide-react';
import Feature from '../ui/Feature';

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: 'Investment Planning',
      description: 'Strategic investment solutions tailored to your risk tolerance and financial goals.',
    },
    {
      icon: PiggyBank,
      title: 'Retirement Planning',
      description: 'Secure your future with comprehensive retirement strategies and pension planning.',
    },
    {
      icon: LineChart,
      title: 'Wealth Management',
      description: 'Holistic wealth management services to grow and protect your assets.',
    },
    {
      icon: Calculator,
      title: 'Tax Planning',
      description: 'Optimize your tax efficiency with strategic financial planning and advice.',
    },
    {
      icon: Building2,
      title: 'Estate Planning',
      description: 'Preserve and transfer your wealth to future generations effectively.',
    },
    {
      icon: HeartHandshake,
      title: 'Insurance Solutions',
      description: 'Protect your assets and loved ones with comprehensive insurance strategies.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Comprehensive Financial Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Expert solutions tailored to your unique financial needs and goals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Feature
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;