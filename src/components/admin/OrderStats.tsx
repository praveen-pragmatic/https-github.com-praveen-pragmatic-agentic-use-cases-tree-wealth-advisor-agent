import React from 'react';
import type { Order } from '../../types';

interface OrderStatsProps {
  orders: {
    pending: Order[];
    preparing: Order[];
    ready: Order[];
    delivered: Order[];
  };
}

export function OrderStats({ orders }: OrderStatsProps) {
  return (
    <div className="flex gap-4">
      <div className="text-sm">
        <span className="font-medium">New Orders:</span>{' '}
        <span className="text-purple-600">{orders.pending.length}</span>
      </div>
      <div className="text-sm">
        <span className="font-medium">In Progress:</span>{' '}
        <span className="text-yellow-600">{orders.preparing.length}</span>
      </div>
      <div className="text-sm">
        <span className="font-medium">Ready:</span>{' '}
        <span className="text-green-600">{orders.ready.length}</span>
      </div>
      <div className="text-sm">
        <span className="font-medium">Completed:</span>{' '}
        <span className="text-blue-600">{orders.delivered.length}</span>
      </div>
    </div>
  );
}