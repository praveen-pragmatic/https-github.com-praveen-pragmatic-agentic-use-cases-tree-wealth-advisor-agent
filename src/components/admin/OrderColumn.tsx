import React from 'react';
import { OrderCard } from './OrderCard';
import type { Order } from '../../types';

interface OrderColumnProps {
  title: string;
  icon: React.ReactNode;
  orders: Order[];
  status: Order['status'];
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
  colorClass: string;
}

export function OrderColumn({
  title,
  icon,
  orders,
  status,
  onStatusUpdate,
  colorClass
}: OrderColumnProps) {
  return (
    <div className="flex flex-col h-full">
      <h2 className={`font-semibold text-lg ${colorClass} flex items-center gap-2 mb-4`}>
        {icon}
        <span>{title}</span>
        <span className="ml-auto text-sm bg-gray-100 px-2 py-1 rounded-full">
          {orders.length}
        </span>
      </h2>
      <div className="flex-1 min-h-[calc(100vh-12rem)] p-4 bg-gray-50 rounded-lg border-2 border-gray-200 overflow-y-auto">
        {orders.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No orders
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={onStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}