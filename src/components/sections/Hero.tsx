import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import Button from '../ui/Button';
import Feature from '../ui/Feature';

const Hero = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Planning',
      description: 'Your financial security is our top priority',
    },
    {
      icon: TrendingUp,
      title: 'Growth Strategy',
      description: 'Maximize returns with smart investments',
    },
    {
      icon: Users,
      title: 'Expert Advisors',
      description: 'Dedicated team of financial experts',
    },
  ];

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Your Future</span>
                <span className="block text-blue-600">Starts Here</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                Expert financial guidance tailored to your goals. We help you make informed decisions
                about your wealth, ensuring a secure and prosperous future.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button href="#contact" icon={ArrowRight}>
                    Get Started
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button href="#services" variant="secondary">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {features.map((feature) => (
                <Feature
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;