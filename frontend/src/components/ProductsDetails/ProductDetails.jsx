import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, ChevronDown, Clock, ShieldCheck, RotateCcw, Maximize2, Check, X, Plus, Minus } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showPincodeSuccess, setShowPincodeSuccess] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemId, setCartItemId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://reasons-server.vercel.app/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://reasons-server.vercel.app/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cart || []);
          // Find if current product exists in cart
          const cartItem = data.cart?.find(item => item.productId === id);
          if (cartItem) {
            setCartItemId(cartItem.id);
            setQuantity(cartItem.quantity);
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [id]);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !id) return;

        const response = await fetch('https://reasons-server.vercel.app/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const isInWishlist = data.wishlist?.products.some(item => item.id === id);
          setIsWishlist(isInWishlist);
        }
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    checkWishlistStatus();
  }, [id]);

  const updateCartQuantity = async (newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !cartItemId) return;

      const response = await fetch(`https://reasons-server.vercel.app/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: newQuantity
        })
      });

      if (response.ok) {
        setQuantity(newQuantity);
        setCartMessage("Cart updated successfully!");
        setTimeout(() => setCartMessage(""), 3000);
      } else {
        setCartMessage("Failed to update cart. Please try again.");
        setTimeout(() => setCartMessage(""), 3000);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      setCartMessage("Error updating cart. Please try again later.");
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    if (cartItemId) {
      // If item exists in cart, update quantity
      await updateCartQuantity(newQuantity);
    } else {
      // If item doesn't exist in cart, just update local state
      setQuantity(newQuantity);
    }
  };

  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User not logged in');
        return;
      }

      const response = await fetch('https://reasons-server.vercel.app/api/wishlist', {
        method: isWishlist ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: id
        })
      });

      if (response.ok) {
        setIsWishlist(!isWishlist);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on our store!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAddToCart = async () => {
    setIsCartOpen(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User not logged in');
        return;
      }

      if (cartItemId) {
        // If item exists in cart, update quantity
        await updateCartQuantity(quantity);
      } else {
        // If item doesn't exist, add to cart
        const response = await fetch('https://reasons-server.vercel.app/api/cart', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: id,
            quantity: quantity
          })
        });

        if (response.ok) {
          const data = await response.json();
          setCartItemId(data.cartItem.id);
          setCartMessage("Product added to cart successfully!");
          setTimeout(() => setCartMessage(""), 3000);
        } else {
          setCartMessage("Failed to add product to cart. Please try again.");
          setTimeout(() => setCartMessage(""), 3000);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartMessage("Error adding to cart. Please try again later.");
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  const handlePincodeCheck = () => {
    if (pincode.length === 6) {
      setShowPincodeSuccess(true);
      setTimeout(() => setShowPincodeSuccess(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-pink-200 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-pink-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !product) return null;

  const discount = Math.round(((product.actualPrice - product.discountedPrice) / product.actualPrice) * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/Catalogue" className="flex items-center space-x-2 text-gray-800 hover:text-pink-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Back to Shop</span>
          </Link>
          <div className="text-sm text-gray-600">Premium Collection</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 group">
              <img
                src={product.images[selectedImage]?.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all">
                <Maximize2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImage === index 
                      ? 'ring-2 ring-pink-500 ring-offset-2' 
                      : 'hover:ring-2 hover:ring-pink-200 hover:ring-offset-1'
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-pink-500/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 sm:space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.9) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {product.rating || "4.9"}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews || "8"} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                      isWishlist 
                        ? 'bg-pink-50 text-pink-600' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    onClick={handleWishlist}
                  >
                    <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isWishlist ? 'fill-current' : ''}`} />
                  </button>
                  <div className="relative">
                    <button 
                      className="p-2.5 sm:p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-all duration-300"
                      onClick={handleShare}
                    >
                      <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    {showTooltip && (
                      <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
                        Link copied!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ₹{product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-base sm:text-lg text-gray-500 line-through">
                    ₹{product.actualPrice.toLocaleString()}
                  </span>
                  <span className="px-2.5 py-1 text-sm font-semibold text-green-700 bg-green-50 rounded-full">
                    {discount}% OFF
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Options</h3>
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter delivery pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                    />
                    {showPincodeSuccess && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={handlePincodeCheck}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    disabled={pincode.length !== 6}
                  >
                    Check
                  </button>
                </div>
                {showPincodeSuccess && (
                  <div className="absolute mt-2 px-4 py-2 bg-green-50 text-green-700 text-sm rounded-lg">
                    Delivery available to this location in 2-3 business days
                  </div>
                )}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              {[
                { icon: RotateCcw, text: "30 Day Easy Returns", subtext: "No questions asked" },
                { icon: ShieldCheck, text: "Lifetime Plating Warranty", subtext: "Quality guaranteed" },
                { icon: Clock, text: "Express Delivery", subtext: "2-3 business days" },
                { icon: Check, text: "100% Authentic", subtext: "Certified products" }
              ].map(({ icon: Icon, text, subtext }) => (
                <div key={text} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                  <div className="p-2 rounded-lg bg-white">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{text}</p>
                    <p className="text-sm text-gray-500">{subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:relative sm:p-0 sm:bg-transparent sm:border-0">
              {cartMessage && (
                <div className="absolute -top-12 left-0 right-0 px-4 py-2 bg-green-50 text-green-700 text-sm rounded-lg text-center">
                  {cartMessage}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-7xl mx-auto">
                <button className="w-full py-3.5 sm:py-4 px-6 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                  Buy Now
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-3.5 sm:py-4 px-6 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4 border-t pt-6 sm:pt-8 pb-24 sm:pb-0">
              {[
                { title: 'Product Description', content: product.product_description },
                { title: 'Shipping Details', content: product.shipping_details }
              ].map(({ title, content }) => (
                <div key={title} className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setExpandedSection(expandedSection === title ? null : title)}
                    className="w-full flex justify-between items-center group"
                  >
                    <span className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                      {title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        expandedSection === title ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedSection === title && (
                    <div className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                      {content || 'Details not available'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Cart Panel */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {product && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex gap-4">
                  <img 
                    src={product.images[0]?.imageUrl} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-lg font-semibold">₹{product.discountedPrice.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.actualPrice.toLocaleString()}</span>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="mt-3 flex items-center gap-3">
                      <button 
                        onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-white">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{(product?.discountedPrice * quantity).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <button className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}

export default ProductDetails;