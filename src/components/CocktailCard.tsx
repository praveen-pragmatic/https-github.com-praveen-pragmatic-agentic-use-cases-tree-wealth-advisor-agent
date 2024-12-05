import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import type { Cocktail } from '../types';

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
        <h3 className="text-xl font-semibold mb-2">{cocktail.name}</h3>
        <p className="text-gray-600 mb-4">{cocktail.description}</p>
        <div className="flex justify-between items-center">
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
      </div>
    </motion.div>
  );
}