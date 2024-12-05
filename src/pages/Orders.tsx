import React from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { CheckCircle, Clock, Package, AlertCircle } from 'lucide-react';

export function Orders() {
  const orders = useStore((state) => state.orders);
  const user = useStore((state) => state.user);
  const cocktails = useStore((state) => state.cocktails);

  if (!user) {
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
          text: 'Preparing',
          description: 'Your cocktail is being crafted by our mixologist.',
          color: 'yellow'
        };
      case 'ready':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-600" />,
          text: 'Ready for Pickup',
          description: 'Your cocktail is ready! Please collect it from the bar.',
          color: 'green'
        };
      case 'cancelled':
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-600" />,
          text: 'Cancelled',
          description: 'This order has been cancelled.',
          color: 'red'
        };
      default:
        return {
          icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
          text: 'Delivered',
          description: 'Order completed.',
          color: 'blue'
        };
    }
  };

  const getCocktailName = (cocktailId: string) => {
    const cocktail = cocktails.find(c => c.id === cocktailId);
    return cocktail ? cocktail.name : 'Unknown Cocktail';
  };

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">
          No orders yet. Visit our menu to place an order!
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
      
      {activeOrder && (
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Active Order</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-medium">{getCocktailName(activeOrder.cocktailId)}</p>
                  <span className="text-sm text-gray-500">
                    Ordered at {format(new Date(activeOrder.timestamp), 'PPp')}
                  </span>
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
              <div className={`px-3 py-1 rounded-full text-sm bg-${getStatusDetails(activeOrder.status).color}-100 text-${getStatusDetails(activeOrder.status).color}-800`}>
                #{activeOrder.id.slice(-4)}
              </div>
            </div>
            {activeOrder.specialInstructions && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Special Instructions:</span> {activeOrder.specialInstructions}
                </p>
              </div>
            )}
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
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="font-medium">{getCocktailName(order.cocktailId)}</p>
                    <span className="text-sm text-gray-500">
                      {format(new Date(order.timestamp), 'PPp')}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusDetails(order.status).icon}
                      <span className={`text-sm text-${getStatusDetails(order.status).color}-600`}>
                        {getStatusDetails(order.status).text}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm bg-${getStatusDetails(order.status).color}-100 text-${getStatusDetails(order.status).color}-800`}>
                    #{order.id.slice(-4)}
                  </div>
                </div>
                {order.specialInstructions && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Special Instructions:</span> {order.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}