import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { CheckCircle, Clock, Package, AlertCircle } from 'lucide-react';

export function Orders() {
  const navigate = useNavigate();
  const orders = useStore((state) => state.orders);
  const user = useStore((state) => state.user);

  if (!user) {
    navigate('/login');
    return null;
  }

  // Filter orders for the current user
  const userOrders = orders.filter((order) => order.userId === user.id);
  const activeOrder = userOrders.find(order => 
    !['delivered', 'cancelled'].includes(order.status)
  );

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5 text-purple-600" />,
          text: 'Order Received',
          description: 'Your order has been received and is waiting to be prepared.',
          color: 'purple'
        };
      case 'preparing':
        return {
          icon: <Package className="h-5 w-5 text-yellow-600" />,
          text: 'Preparing Your Order',
          description: 'Your order is being prepared by our expert mixologists.',
          color: 'yellow'
        };
      case 'ready':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
          text: 'Ready for Pickup',
          description: 'Your order is ready! Please collect it from the counter.',
          color: 'green'
        };
      case 'delivered':
        return {
          icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
          text: 'Order Completed',
          description: 'Thank you for your order! Feel free to place a new one.',
          color: 'blue'
        };
      case 'cancelled':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-600" />,
          text: 'Order Cancelled',
          description: 'This order has been cancelled.',
          color: 'red'
        };
      default:
        return {
          icon: <Clock className="h-5 w-5 text-gray-600" />,
          text: 'Processing',
          description: 'Order is being processed.',
          color: 'gray'
        };
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          No orders yet
        </h2>
        <p className="text-gray-500 mb-8">
          Visit our menu to place your first order!
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          View Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
      
      {activeOrder && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-purple-100">
          <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
            <h2 className="text-xl font-semibold text-purple-900">Active Order</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-medium">{activeOrder.cocktailName || activeOrder.menuItemName}</p>
                  <p className="text-sm text-gray-500">
                    Order #{activeOrder.id.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordered at {format(new Date(activeOrder.timestamp), 'PPp')}
                  </p>
                  {activeOrder.price && (
                    <p className="text-sm font-medium text-purple-600 mt-1">
                      ${activeOrder.price.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusDetails(activeOrder.status).icon}
                    <span className={`font-medium text-${getStatusDetails(activeOrder.status).color}-600`}>
                      {getStatusDetails(activeOrder.status).text}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getStatusDetails(activeOrder.status).description}
                  </p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm bg-${getStatusDetails(activeOrder.status).color}-100 text-${getStatusDetails(activeOrder.status).color}-800 self-start`}>
                {getStatusDetails(activeOrder.status).text}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
        <div className="space-y-4">
          {userOrders
            .filter(order => ['delivered', 'cancelled'].includes(order.status))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{order.cocktailName || order.menuItemName}</p>
                      <span className="text-sm text-gray-500">
                        #{order.id.slice(-8)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.timestamp), 'PPp')}
                    </p>
                    {order.price && (
                      <p className="text-sm font-medium text-purple-600">
                        ${order.price.toFixed(2)}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      {getStatusDetails(order.status).icon}
                      <span className={`text-sm text-${getStatusDetails(order.status).color}-600`}>
                        {getStatusDetails(order.status).text}
                      </span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm bg-${getStatusDetails(order.status).color}-100 text-${getStatusDetails(order.status).color}-800 self-start`}>
                    {getStatusDetails(order.status).text}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}