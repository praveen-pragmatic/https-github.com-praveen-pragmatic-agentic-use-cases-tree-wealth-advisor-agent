import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch (currentStatus) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'delivered';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">
                {order.cocktailName || order.menuItemName || 'Unknown Item'}
              </p>
              <p className="text-sm text-gray-500">
                #{order.id.slice(-8)}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {format(new Date(order.timestamp), 'PPp')}
            </p>
            <p className="text-sm text-purple-600">
              Customer: {order.userName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {nextStatus && (
            <button
              onClick={() => onStatusUpdate(order.id, nextStatus)}
              className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              title={`Mark as ${nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}`}
            >
              <CheckCircle className="h-5 w-5" />
            </button>
          )}
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <button
              onClick={() => onStatusUpdate(order.id, 'cancelled')}
              className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="Cancel Order"
            >
              <XCircle className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}