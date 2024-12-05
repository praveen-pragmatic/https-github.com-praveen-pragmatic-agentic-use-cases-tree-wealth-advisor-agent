import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Clock, Package, CheckCircle } from 'lucide-react';
import { OrderColumn } from '../components/admin/OrderColumn';
import { OrderStats } from '../components/admin/OrderStats';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core';
import type { Order } from '../types';

export function Admin() {
  const navigate = useNavigate();
  const [user, orders, updateOrderStatus] = useStore((state) => [
    state.user,
    state.orders,
    state.updateOrderStatus,
  ]);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const ordersByStatus = {
    pending: orders.filter((order) => order.status === 'pending'),
    preparing: orders.filter((order) => order.status === 'preparing'),
    ready: orders.filter((order) => order.status === 'ready'),
    delivered: orders.filter((order) => order.status === 'delivered'),
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const orderId = active.id as string;
    const container = over.id as Order['status'];

    if (container !== 'pending' && container !== 'preparing' && container !== 'ready') {
      return;
    }

    updateOrderStatus(orderId, container);
  };

  const columns = [
    {
      title: 'New Orders',
      icon: <Clock className="h-5 w-5" />,
      status: 'pending' as const,
      colorClass: 'text-purple-600',
      orders: ordersByStatus.pending,
    },
    {
      title: 'In Progress',
      icon: <Package className="h-5 w-5" />,
      status: 'preparing' as const,
      colorClass: 'text-yellow-600',
      orders: ordersByStatus.preparing,
    },
    {
      title: 'Ready for Delivery',
      icon: <CheckCircle className="h-5 w-5" />,
      status: 'ready' as const,
      colorClass: 'text-green-600',
      orders: ordersByStatus.ready,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <OrderStats orders={ordersByStatus} />
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <OrderColumn
              key={column.status}
              {...column}
              onStatusUpdate={updateOrderStatus}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}