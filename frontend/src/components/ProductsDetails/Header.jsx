import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, User, Search, LogOut, Trash2 } from 'lucide-react';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowWishlist(false);
        setShowCart(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'John Doe' });
      fetchWishlist();
      fetchCart();
    }
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://reasons-server.vercel.app/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data && data.wishlist && Array.isArray(data.wishlist.products)) {
        setWishlistProducts(data.wishlist.products);
        setWishlistCount(data.wishlist.products.length);
      } else {
        setWishlistProducts([]);
        setWishlistCount(0);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlistProducts([]);
      setWishlistCount(0);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://reasons-server.vercel.app/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data && Array.isArray(data.cartItems)) {
        setCartItems(data.cartItems);
        setCartItemsCount(data.cartItems.length);
      } else {
        setCartItems([]);
        setCartItemsCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
      setCartItemsCount(0);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      
      // Add to cart API call
      const cartResponse = await fetch('https://reasons-server.vercel.app/api/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });

      if (!cartResponse.ok) {
        throw new Error('Failed to add item to cart');
      }

      // Update cart first
      await fetchCart();

      try {
        // Remove from wishlist using DELETE request
        const wishlistResponse = await fetch('https://reasons-server.vercel.app/api/wishlist/', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: product.id
          })
        });

        if (!wishlistResponse.ok) {
          throw new Error('Failed to remove item from wishlist');
        }

        // Update wishlist after successful removal
        await fetchWishlist();
      } catch (wishlistError) {
        console.error('Error removing from wishlist:', wishlistError);
        // Still update wishlist to ensure sync
        await fetchWishlist();
      }
    } catch (error) {
      console.error('Error handling add to cart:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setWishlistCount(0);
    setWishlistProducts([]);
    setCartItems([]);
    setCartItemsCount(0);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.product.discountedPrice) * item.quantity);
    }, 0);
  };

  const CartDropdown = () => (
    <div className="fixed inset-x-0 top-16 mx-4 md:mx-0 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 md:w-96 z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
            <span className="text-sm text-gray-500">{cartItemsCount} items</span>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="p-4 border-b hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-[#9D2235] font-semibold">₹{item.product.discountedPrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{item.product.actualPrice}</span>
                    </div>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-700">Total:</span>
              <span className="text-lg font-bold text-[#9D2235]">₹{calculateTotal()}</span>
            </div>
            <a 
              href="/checkout" 
              className="block w-full bg-[#9D2235] text-white text-center py-2 rounded-md hover:bg-[#7d1b2a] transition-colors"
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </div>
    </div>
  );

  const WishlistDropdown = () => (
    <div className="fixed inset-x-0 top-16 mx-4 md:mx-0 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 md:w-96 z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">My Wishlist</h2>
            <span className="text-sm text-gray-500">{wishlistCount} items</span>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div 
                key={product.id} 
                className="p-4 border-b hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-[#9D2235] font-semibold">₹{product.discountedPrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.actualPrice}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="ml-4 bg-[#9D2235] text-white px-3 py-1.5 rounded text-sm hover:bg-[#7d1b2a] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Your wishlist is empty
            </div>
          )}
        </div>
        {wishlistProducts.length > 0 && (
          <div className="p-4 bg-gray-50 border-t">
            <a 
              href="/wishlist" 
              className="block w-full text-center text-[#9D2235] hover:text-[#7d1b2a] transition-colors text-sm font-medium"
            >
              View Full Wishlist
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <header ref={headerRef} className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Icons */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#9D2235] mr-16">REASONS</span>
            
            {/* Mobile Icons */}
            <div className="flex items-center space-x-6 md:hidden">
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowWishlist(!showWishlist);
                    setShowCart(false);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="text-gray-600 hover:text-[#9D2235] transition-colors relative"
                >
                  <Heart size={20} />
                  <span className="absolute -top-2 -right-2 bg-[#9D2235] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                </button>
                {showWishlist && <WishlistDropdown />}
              </div>
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowCart(!showCart);
                    setShowWishlist(false);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="text-gray-600 hover:text-[#9D2235] transition-colors relative"
                >
                  <ShoppingCart size={20} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#9D2235] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
                {showCart && <CartDropdown />}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setShowCart(false);
                    setShowWishlist(false);
                  }}
                  className="text-gray-600 hover:text-[#9D2235] transition-colors focus:outline-none"
                >
                  <User size={20} />
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="fixed inset-x-0 top-16 mx-4 md:mx-0 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 md:w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    ) : (
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-[#9D2235] transition-colors"
            >
              <Search size={20} />
            </button>
            <div className="relative">
              <button 
                onClick={() => {
                  setShowWishlist(!showWishlist);
                  setShowCart(false);
                  setIsProfileDropdownOpen(false);
                }}
                className="text-gray-600 hover:text-[#9D2235] transition-colors relative"
              >
                <Heart size={20} />
                <span className="absolute -top-2 -right-2 bg-[#9D2235] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              </button>
              {showWishlist && <WishlistDropdown />}
            </div>
            <div className="relative">
              <button 
                onClick={() => {
                  setShowCart(!showCart);
                  setShowWishlist(false);
                  setIsProfileDropdownOpen(false);
                }}
                className="text-gray-600 hover:text-[#9D2235] transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#9D2235] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              {showCart && <CartDropdown />}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setShowCart(false);
                  setShowWishlist(false);
                }}
                className="text-gray-600 hover:text-[#9D2235] transition-colors focus:outline-none"
              >
                <User size={20} />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
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
        </div>

        {/* Search bar - Only for desktop */}
        {isSearchOpen && (
          <div className="hidden md:block py-4 border-t">
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
    </header>
  );
};

export default Header;