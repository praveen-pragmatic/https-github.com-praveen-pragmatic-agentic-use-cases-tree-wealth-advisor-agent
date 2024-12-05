import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogOut } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-lg font-medium">{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Mobile</label>
            <p className="text-lg font-medium">{user.mobile}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center space-x-2 text-red-600 hover:text-red-700"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}