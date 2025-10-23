import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Shield, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, toggleCart } = useCart();
  const location = useLocation();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => {
    return `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActivePage(path)
        ? 'bg-primary-50 text-primary-600'
        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }`;
  };

  const mobileLinkClass = (path: string) => {
    return `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
      isActivePage(path)
        ? 'bg-primary-50 text-primary-600'
        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }`;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors duration-200" />
                <Flame className="h-4 w-4 text-ember-500 absolute top-1 left-1.5" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-fire-600 bg-clip-text text-transparent">
                  SparkSafe
                </span>
                <div className="text-xs text-gray-500 -mt-1">Wildfire Protection</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className={navLinkClass('/')}>
              Home Hardening
            </Link>
            <Link to="/marketplace" className={navLinkClass('/marketplace')}>
              Marketplace
            </Link>
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-500 hover:text-primary-600 transition-colors duration-200 ml-4"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse-slow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-500 hover:text-primary-600 transition-colors duration-200 mr-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse-slow">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-primary-600 p-2 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <Link
                to="/"
                className={mobileLinkClass('/')}
                onClick={() => setIsOpen(false)}
              >
                Home Hardening
              </Link>
              <Link
                to="/marketplace"
                className={mobileLinkClass('/marketplace')}
                onClick={() => setIsOpen(false)}
              >
                Marketplace
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
