import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { CheckCircle, Clock, Package, XCircle, GripVertical } from 'lucide-react';
import type { Order } from '../../types';

interface DraggableOrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export function DraggableOrderCard({ order, onStatusUpdate }: DraggableOrderCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-purple-600" />;
      case 'preparing':
        return <Package className="h-5 w-5 text-yellow-600" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move mb-4"
      {...attributes}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button {...listeners} className="text-gray-400 hover:text-gray-600">
              <GripVertical className="h-5 w-5" />
            </button>
            <div>
              <p className="font-medium">
                {order.cocktailName || order.menuItemName}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(order.timestamp), 'PPp')}
              </p>
              <p className="text-sm text-purple-600 mt-1">
                Customer: {order.userName}
              </p>
              {order.price && (
                <p className="text-sm text-gray-600">
                  Price: ${order.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {getStatusIcon(order.status)}
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <>
              {order.status === 'pending' && (
                <button
                  onClick={() => onStatusUpdate(order.id, 'preparing')}
                  className="text-yellow-600 hover:text-yellow-800"
                  title="Start Preparing"
                >
                  <Package className="h-5 w-5" />
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => onStatusUpdate(order.id, 'ready')}
                  className="text-green-600 hover:text-green-800"
                  title="Mark as Ready"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  onClick={() => onStatusUpdate(order.id, 'delivered')}
                  className="text-blue-600 hover:text-blue-800"
                  title="Mark as Delivered"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}