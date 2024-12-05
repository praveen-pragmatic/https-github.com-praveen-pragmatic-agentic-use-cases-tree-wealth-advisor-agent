import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import type { Cocktail } from '../types';
import { Droplets, Zap, Coffee, Flame } from 'lucide-react';

interface CocktailCardProps {
  cocktail: Cocktail;
  onOrder: (cocktail: Cocktail) => void;
}

export function CocktailCard({ cocktail, onOrder }: CocktailCardProps) {
  const user = useStore((state) => state.user);
  const hasActiveOrder = useStore((state) => 
    state.orders.some(order => 
      order.userId === user?.id && 
      !['delivered', 'cancelled'].includes(order.status)
    )
  );

  const isDisabled = !cocktail.available || hasActiveOrder;
  const buttonText = !cocktail.available 
    ? 'Unavailable' 
    : hasActiveOrder 
    ? 'Complete Current Order First'
    : 'Order Now';

  const getTasteProfileMatch = () => {
    if (!user?.preferences?.tasteProfile) return null;

    const userProfile = user.preferences.tasteProfile;
    const cocktailProfile = cocktail.tasteProfile;

    // Calculate match percentage based on taste profiles
    const attributes = ['sweet', 'sour', 'bitter', 'strong'] as const;
    let totalDiff = 0;
    let maxPossibleDiff = 0;

    attributes.forEach(attr => {
      const diff = Math.abs(userProfile[attr] - cocktailProfile[attr]);
      totalDiff += diff;
      maxPossibleDiff += 5; // Max difference possible for each attribute
    });

    const matchPercentage = 100 - (totalDiff / maxPossibleDiff) * 100;
    return Math.round(matchPercentage);
  };

  const matchPercentage = getTasteProfileMatch();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={cocktail.imageUrl}
        alt={cocktail.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{cocktail.name}</h3>
          {matchPercentage !== null && (
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-medium">
              {matchPercentage}% Match
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4">{cocktail.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Taste Profile:</h4>
          <div className="flex gap-4">
            {cocktail.tasteProfile.sweet > 0 && (
              <div className="flex items-center gap-1" title="Sweetness">
                <Droplets className="h-4 w-4 text-pink-500" />
                <span className="text-sm">{cocktail.tasteProfile.sweet}/5</span>
              </div>
            )}
            {cocktail.tasteProfile.sour > 0 && (
              <div className="flex items-center gap-1" title="Sourness">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{cocktail.tasteProfile.sour}/5</span>
              </div>
            )}
            {cocktail.tasteProfile.bitter > 0 && (
              <div className="flex items-center gap-1" title="Bitterness">
                <Coffee className="h-4 w-4 text-brown-500" />
                <span className="text-sm">{cocktail.tasteProfile.bitter}/5</span>
              </div>
            )}
            {cocktail.tasteProfile.strong > 0 && (
              <div className="flex items-center gap-1" title="Strength">
                <Flame className="h-4 w-4 text-red-500" />
                <span className="text-sm">{cocktail.tasteProfile.strong}/5</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onOrder(cocktail)}
          disabled={isDisabled}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isDisabled
              ? 'bg-gray-300 cursor-not-allowed text-gray-600'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
}