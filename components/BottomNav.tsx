import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Repeat, MessageCircle, Heart, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, path: '/home', label: 'Home' },
    { icon: Repeat, path: '/swap', label: 'Swap' },
    { icon: MessageCircle, path: '/messages', label: 'Messages' },
    { icon: Heart, path: '/favourites', label: 'Fav' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  // Hide nav on splash, welcome, auth screens
  const hiddenRoutes = ['/', '/welcome', '/login', '/register'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-swap-green/20 pb-6 pt-4 px-6 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center transition-colors ${
            isActive(item.path) ? 'text-swap-green' : 'text-gray-400'
          }`}
        >
          <item.icon 
            size={24} 
            strokeWidth={isActive(item.path) ? 2.5 : 2}
            fill={isActive(item.path) && item.path === '/favourites' ? '#9abeaa' : 'none'}
          />
        </button>
      ))}
    </div>
  );
};