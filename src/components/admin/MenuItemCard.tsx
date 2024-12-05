import React from 'react';
import { Switch } from '../ui/Switch';
import { Edit, Trash2 } from 'lucide-react';
import type { MenuItem, Cocktail } from '../../types';

interface MenuItemCardProps {
  item: MenuItem | Cocktail;
  onToggleAvailability: (item: MenuItem | Cocktail) => void;
  onEdit: (item: MenuItem | Cocktail) => void;
  onDelete: (id: string) => void;
}

export function MenuItemCard({
  item,
  onToggleAvailability,
  onEdit,
  onDelete,
}: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative h-48">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Switch
            checked={item.available}
            onCheckedChange={() => onToggleAvailability(item)}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        
        {'spirit' in item && (
          <div className="mb-4">
            <span className="text-sm font-medium text-purple-600">
              Base Spirit: {item.spirit}
            </span>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-gray-600 hover:text-purple-600"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-gray-600 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}