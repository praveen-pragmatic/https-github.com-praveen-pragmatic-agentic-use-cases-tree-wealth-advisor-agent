import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Award, Wine } from 'lucide-react';
import { TasteProfileQuiz } from '../components/TasteProfileQuiz';
import { useStore } from '../store/useStore';

export function Home() {
  const user = useStore((state) => state.user);

  return (
    <div className="space-y-16">
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Cocktail bar"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl font-bold mb-6">
              Craft Cocktails, Gourmet Food Delivered to Your Table with love
            </h1>
            <p className="text-xl mb-8">
              Experience the perfect blend of tradition and innovation with our
              handcrafted cocktails and exquisite cuisine.
            </p>
            <Link
              to="/menu"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
            >
              View Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {!user?.preferences?.tasteProfile && (
        <section className="container mx-auto px-4">
          <div className="bg-purple-50 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <Wine className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Discover Your Perfect Cocktail
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Take our quick taste profile quiz to get personalized cocktail recommendations
                based on your preferences. We'll match you with drinks that suit your palate perfectly.
              </p>
            </div>
            <TasteProfileQuiz />
          </div>
        </section>
      )}

      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              We use only the finest ingredients in our cocktails and dishes.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <Clock className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Quick Service</h3>
            <p className="text-gray-600">
              Order from your table and we'll prepare your items right away.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <Award className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Expert Craftsmanship</h3>
            <p className="text-gray-600">
              Our skilled team crafts each item with precision and care.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}