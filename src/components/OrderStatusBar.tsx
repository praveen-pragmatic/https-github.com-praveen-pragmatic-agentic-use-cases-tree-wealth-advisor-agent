import React from 'react';
import { Clock, Package, CheckCircle } from 'lucide-react';
import type { Order } from '../types';

interface OrderStatusBarProps {
  orders: {
    pending: Order[];
    preparing: Order[];
    ready: Order[];
    delivered: Order[];
  };
}

export function OrderStatusBar({ orders }: OrderStatusBarProps) {
  return (
    <div className="flex gap-8 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-purple-600" />
        <div>
          <p className="text-sm font-medium">New Orders</p>
          <p className="text-lg font-bold text-purple-600">{orders.pending.length}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 text-yellow-600" />
        <div>
          <p className="text-sm font-medium">In Progress</p>
          <p className="text-lg font-bold text-yellow-600">{orders.preparing.length}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div>
          <p className="text-sm font-medium">Ready</p>
          <p className="text-lg font-bold text-green-600">{orders.ready.length}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm font-medium">Completed</p>
          <p className="text-lg font-bold text-blue-600">{orders.delivered.length}</p>
        </div>
      </div>
    </div>
  );
}