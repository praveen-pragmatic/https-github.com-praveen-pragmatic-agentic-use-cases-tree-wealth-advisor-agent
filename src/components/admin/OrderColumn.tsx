import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableOrderCard } from './DraggableOrderCard';
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
    <div className="space-y-4">
      <h2 className={`font-semibold text-lg ${colorClass} flex items-center gap-2`}>
        {icon}
        {title}
      </h2>
      <div
        className="min-h-[200px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
        id={status}
      >
        <SortableContext
          items={orders.map(order => order.id)}
          strategy={verticalListSortingStrategy}
        >
          {orders.map((order) => (
            <DraggableOrderCard
              key={order.id}
              order={order}
              onStatusUpdate={onStatusUpdate}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}