import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Plus, Search, Wine, UtensilsCrossed, Coffee, BabyBottle } from 'lucide-react';
import type { MenuItem, Cocktail } from '../types';

type ItemType = 'cocktail' | 'mocktail' | 'kids' | 'food';

interface MenuItemForm {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  available: boolean;
  imageUrl: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

interface CocktailForm extends MenuItemForm {
  spirit: string;
  tasteProfile: {
    sweet: number;
    sour: number;
    bitter: number;
    strong: number;
  };
  ingredients: string[];
}

export function MenuManagement() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<ItemType>('cocktail');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<MenuItemForm | CocktailForm | null>(null);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleToggleAvailability = (item: MenuItem | Cocktail) => {
    // TODO: Implement toggle availability
    console.log('Toggle availability for:', item.id);
  };

  const handleAddItem = () => {
    // TODO: Implement add item
    console.log('Add new item:', newItem);
    setShowAddForm(false);
    setNewItem(null);
  };

  const renderAddForm = () => {
    if (!showAddForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <h3 className="text-xl font-bold mb-4">Add New Item</h3>
          {/* Form fields will go here */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            {/* Add more form fields */}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'cocktail', label: 'Cocktails', icon: <Wine className="h-5 w-5" /> },
    { id: 'mocktail', label: 'Mocktails', icon: <Coffee className="h-5 w-5" /> },
    { id: 'kids', label: 'Kids Menu', icon: <BabyBottle className="h-5 w-5" /> },
    { id: 'food', label: 'Food', icon: <UtensilsCrossed className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ItemType)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
              activeTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Menu items will be rendered here */}
      </div>

      {renderAddForm()}
    </div>
  );
}