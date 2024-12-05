import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wine, UtensilsCrossed } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CocktailCard } from '../components/CocktailCard';
import { MenuSection } from '../components/MenuSection';
import { TasteProfileQuiz } from '../components/TasteProfileQuiz';
import { menuItems } from '../data/menuItems';
import { cocktails } from '../data/cocktails';
import type { Cocktail, MenuItem } from '../types';

export function Menu() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const addOrder = useStore((state) => state.addOrder);
  const [activeTab, setActiveTab] = useState<'drinks' | 'food'>('drinks');
  const [showQuiz, setShowQuiz] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleOrder = (item: Cocktail | MenuItem) => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      cocktailId: 'spirit' in item ? item.id : undefined,
      cocktailName: 'spirit' in item ? item.name : undefined,
      menuItemId: 'category' in item ? item.id : undefined,
      menuItemName: 'category' in item ? item.name : undefined,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    
    addOrder(order);
    navigate('/orders');
  };

  if (showQuiz) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Cocktail
          </h1>
          <p className="text-gray-600">
            Take our quick quiz to help us understand your taste preferences
          </p>
        </div>
        <TasteProfileQuiz />
      </div>
    );
  }

  const foodCategories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, {user.name}!
        </h1>
        {!user.preferences.tasteProfile && (
          <button
            onClick={() => setShowQuiz(true)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Take our taste quiz for personalized recommendations
          </button>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setActiveTab('drinks')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full ${
              activeTab === 'drinks'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Wine className="h-5 w-5" />
            <span>Drinks</span>
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full ${
              activeTab === 'food'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <UtensilsCrossed className="h-5 w-5" />
            <span>Food</span>
          </button>
        </div>
      </div>

      {activeTab === 'drinks' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.id}
              cocktail={cocktail}
              onOrder={handleOrder}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {foodCategories.map((category) => (
            <MenuSection
              key={category}
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              items={menuItems.filter((item) => item.category === category)}
              onOrder={handleOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
}