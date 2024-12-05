import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, User, ShoppingBag, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navigation() {
  const user = useStore((state) => state.user);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wine className="h-8 w-8 text-purple-600" />
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">E1 Serving Now</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/menu"
              className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Menu
            </Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <>
                    <Link
                      to="/admin"
                      className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/menu-management"
                      className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Settings className="h-5 w-5" />
                    </Link>
                  </>
                )}
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <ShoppingBag className="h-5 w-5" />
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}