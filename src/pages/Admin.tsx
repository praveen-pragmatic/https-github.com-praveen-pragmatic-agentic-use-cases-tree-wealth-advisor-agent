import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Clock, Package, CheckCircle, Trash2 } from 'lucide-react';
import { OrderColumn } from '../components/admin/OrderColumn';
import { OrderStats } from '../components/admin/OrderStats';
import { useSocket } from '../hooks/useSocket';
import { socket } from '../services/socket';

export function Admin() {
  const navigate = useNavigate();
  const [user, orders, updateOrderStatus, setOrders] = useStore((state) => [
    state.user,
    state.orders,
    state.updateOrderStatus,
    state.setOrders,
  ]);

  // Initialize WebSocket connection
  useSocket();

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

  const handleClearOrders = () => {
    socket.emit('clear_orders');
  };

  const columns = [
    {
      title: 'Accepted',
      icon: <Clock className="h-5 w-5" />,
      status: 'pending' as const,
      colorClass: 'text-purple-600',
      orders: ordersByStatus.pending,
    },
    {
      title: 'Brewing',
      icon: <Package className="h-5 w-5" />,
      status: 'preparing' as const,
      colorClass: 'text-yellow-600',
      orders: ordersByStatus.preparing,
    },
    {
      title: 'PickUp',
      icon: <CheckCircle className="h-5 w-5" />,
      status: 'ready' as const,
      colorClass: 'text-green-600',
      orders: ordersByStatus.ready,
    },
    {
      title: 'Delivered',
      icon: <CheckCircle className="h-5 w-5" />,
      status: 'delivered' as const,
      colorClass: 'text-blue-600',
      orders: ordersByStatus.delivered,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <div className="flex items-center gap-4">
          <OrderStats orders={ordersByStatus} />
          <button
            onClick={handleClearOrders}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <OrderColumn
            key={column.status}
            {...column}
            onStatusUpdate={updateOrderStatus}
          />
        ))}
      </div>
    </div>
  );
}