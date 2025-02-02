import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, ChevronDown, Clock, ShieldCheck, RotateCcw } from "lucide-react";

function ProductDetails() {
  // State Management
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Fetch product data
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || !product) return null;

  const discount = Math.round(((product.actualPrice - product.discountedPrice) / product.actualPrice) * 100);

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link to="/" className="inline-flex items-center text-gray-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-50">
              <img
                src={product.images[selectedImage]?.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Fullscreen button */}
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-pink-500' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-medium text-gray-900">{product.name}</h1>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                      ★ {product.rating || "4.9"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews || "8"} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold">₹{product.discountedPrice}</span>
                <span className="text-lg text-gray-500 line-through">MRP ₹{product.actualPrice}</span>
                <span className="text-green-600 text-sm font-medium">
                  {discount}% OFF
                </span>
              </div>
              <p className="text-sm text-gray-500">Incl. of all taxes</p>
            </div>

            {/* Delivery Estimation */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Estimated Delivery Time</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6 digit pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  maxLength={6}
                />
                <button className="px-6 py-2 bg-pink-50 text-pink-600 rounded-lg font-medium">
                  Check
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Easy 30 Day Return</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Lifetime Plating</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-sm">6-Month Warranty</span>
              </div>
            </div>

            {/* Gift Wrap Option */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-4 h-4 text-pink-600" />
              <div>
                <p className="font-medium">Add gift wrap to your order (₹50)</p>
                <p className="text-sm text-gray-600">Make it special with our premium gift wrapping</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full py-3 px-6 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors">
                Buy Now
              </button>
              <button className="w-full py-3 px-6 border-2 border-pink-600 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-colors">
                Add to Cart
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4 border-t pt-6">
              {['Product Description', 'Shipping Details'].map((section) => (
                <div key={section} className="border-b pb-4">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                    className="w-full flex justify-between items-center"
                  >
                    <span className="font-medium">{section}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedSection === section ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedSection === section && (
                    <div className="mt-4 text-gray-600">
                      {product[section.toLowerCase().replace(' ', '_')] || 'Details not available'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;