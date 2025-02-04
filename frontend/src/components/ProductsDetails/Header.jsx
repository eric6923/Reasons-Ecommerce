import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X, LogOut } from 'lucide-react';

const Header = ({ cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user profile if needed
      // For now, we'll just set a dummy user
      setUser({ name: 'John Doe' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-[#9D2235]">REASONS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-[#9D2235] transition-colors"
            >
              <Search size={20} />
            </button>
            <a href="/wishlist" className="text-gray-600 hover:text-[#9D2235] transition-colors relative">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-[#9D2235] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </a>
            <a href="/cart" className="text-gray-600 hover:text-[#9D2235] transition-colors relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#9D2235] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </a>
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="text-gray-600 hover:text-[#9D2235] transition-colors focus:outline-none"
              >
                <User size={20} />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        {user.name}
                      </div>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <a
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </a>
                      <a
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#9D2235] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9D2235] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/wishlist"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-[#9D2235] transition-colors"
            >
              <Heart size={20} className="mr-2" /> Wishlist
            </a>
            <a
              href="/cart"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-[#9D2235] transition-colors"
            >
              <ShoppingCart size={20} className="mr-2" /> Cart
              {cartItemsCount > 0 && (
                <span className="ml-2 bg-[#9D2235] text-white text-xs rounded-full px-2 py-1">
                  {cartItemsCount}
                </span>
              )}
            </a>
            <a
              href="/profile"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-[#9D2235] transition-colors"
            >
              <User size={20} className="mr-2" /> Profile
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;