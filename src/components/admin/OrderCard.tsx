import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, Package, XCircle } from 'lucide-react';
import type { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium">Order #{order.id}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(order.timestamp), 'PPp')}
          </p>
        </div>
        <div className="flex gap-2">
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <>
              {order.status === 'pending' && (
                <button
                  onClick={() => onStatusUpdate(order.id, 'preparing')}
                  className="text-blue-600 hover:text-blue-800"
                  title="Start Preparing"
                >
                  <Clock className="h-5 w-5" />
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => onStatusUpdate(order.id, 'ready')}
                  className="text-yellow-600 hover:text-yellow-800"
                  title="Mark as Ready"
                >
                  <Package className="h-5 w-5" />
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  onClick={() => onStatusUpdate(order.id, 'delivered')}
                  className="text-green-600 hover:text-green-800"
                  title="Mark as Delivered"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => onStatusUpdate(order.id, 'cancelled')}
                className="text-red-600 hover:text-red-800"
                title="Cancel Order"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
      {order.specialInstructions && (
        <p className="text-sm text-gray-600 mt-2">
          Note: {order.specialInstructions}
        </p>
      )}
    </div>
  );
}