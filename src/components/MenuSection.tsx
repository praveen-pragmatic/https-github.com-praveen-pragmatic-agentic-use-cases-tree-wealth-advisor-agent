import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Leaf } from 'lucide-react';
import type { MenuItem } from '../types';
import { useStore } from '../store/useStore';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onOrder: (item: MenuItem) => void;
}

export function MenuSection({ title, items, onOrder }: MenuSectionProps) {
  const user = useStore((state) => state.user);
  const hasActiveOrder = useStore((state) => 
    user ? state.hasActiveOrder(user.id) : false
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                {item.isSpicy && (
                  <span className="bg-red-500 text-white p-1 rounded-full">
                    <Flame className="h-4 w-4" />
                  </span>
                )}
                {item.isVegetarian && (
                  <span className="bg-green-500 text-white p-1 rounded-full">
                    <Leaf className="h-4 w-4" />
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-purple-600">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onOrder(item)}
                  disabled={!item.available || hasActiveOrder}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {!item.available 
                    ? 'Unavailable' 
                    : hasActiveOrder 
                    ? 'Complete Current Order First'
                    : 'Order Now'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}