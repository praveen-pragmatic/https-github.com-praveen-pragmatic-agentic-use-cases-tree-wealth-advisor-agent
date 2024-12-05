import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Clock, Package, CheckCircle } from 'lucide-react';
import { OrderColumn } from '../components/admin/OrderColumn';
import { OrderStats } from '../components/admin/OrderStats';
import { useSocket } from '../hooks/useSocket';

export function Admin() {
  const navigate = useNavigate();
  const [user, orders, updateOrderStatus] = useStore((state) => [
    state.user,
    state.orders,
    state.updateOrderStatus,
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

  const columns = [
    {
      title: 'New Orders',
      icon: <Clock className="h-5 w-5" />,
      status: 'pending' as const,
      colorClass: 'text-purple-600',
      orders: ordersByStatus.pending,
    },
    {
      title: 'Preparing',
      icon: <Package className="h-5 w-5" />,
      status: 'preparing' as const,
      colorClass: 'text-yellow-600',
      orders: ordersByStatus.preparing,
    },
    {
      title: 'Ready',
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
        <OrderStats orders={ordersByStatus} />
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