import React, { useState, useEffect } from 'react';
import { MapPin, Gift, Plus, Trash2, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        // Fetch addresses with token
        const addressResponse = await fetch('https://reasons-server.vercel.app/api/addresses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (addressResponse.ok) {
          const addressData = await addressResponse.json();
          setAddresses(addressData.addresses || []);
        }

        // Fetch cart items
        const cartResponse = await fetch('https://reasons-server.vercel.app/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!cartResponse.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const cartData = await cartResponse.json();
        const items = cartData.cartItems || [];
        setCartItems(items);

        // Fetch images for each product
        const imagePromises = items.map(async (item) => {
          try {
            const imageResponse = await fetch(`https://reasons-server.vercel.app/api/products/${item.product.id}`);
            
            if (!imageResponse.ok) {
              console.warn(`Failed to fetch image for product ${item.product.id}`);
              return { [item.product.id]: null };
            }

            const productData = await imageResponse.json();
            return { 
              [item.product.id]: productData.images[0]?.imageUrl || null 
            };
          } catch (err) {
            console.error(`Error fetching image for product ${item.product.id}:`, err);
            return { [item.product.id]: null };
          }
        });

        const imageResults = await Promise.all(imagePromises);
        const imagesMap = imageResults.reduce((acc, curr) => ({...acc, ...curr}), {});
        setProductImages(imagesMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('https://reasons-server.vercel.app/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAddress)
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      const data = await response.json();
      setAddresses([...addresses, data.address]);
      
      // Reset form
      setNewAddress({
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      });
      setIsAddingNewAddress(false);
    } catch (err) {
      console.error('Error adding address:', err);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`https://reasons-server.vercel.app/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      setAddresses(addresses.filter(addr => addr.id !== addressId));
      if (selectedAddress?.id === addressId) {
        setSelectedAddress(null);
      }
    } catch (err) {
      console.error('Error deleting address:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9D2235]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (Number(item.product.discountedPrice) * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FDF8F8] flex items-center justify-center">
                <MapPin className="text-[#9D2235]" />
              </div>
              <h2 className="text-xl font-medium">DELIVER TO</h2>
            </div>
            
            {/* Addresses Grid */}
            {addresses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id} 
                    className={`
                      border rounded-lg p-4 cursor-pointer relative
                      ${selectedAddress?.id === addr.id 
                        ? 'border-[#9D2235] bg-[#FDF8F8]' 
                        : 'hover:border-gray-300'}
                    `}
                    onClick={() => setSelectedAddress(addr)}
                  >
                    {selectedAddress?.id === addr.id && (
                      <CheckCircle 
                        className="absolute top-2 right-2 text-[#9D2235]" 
                        size={20} 
                      />
                    )}
                    <p>{addr.address}</p>
                    <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                    <p>{addr.country}</p>
                    <div className="flex justify-between mt-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(addr.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg p-4 mb-4">
                <p className="text-gray-500">No saved addresses</p>
              </div>
            )}
            
            {/* Add New Address Button or Form */}
            {!isAddingNewAddress ? (
              <button 
                className="bg-[#9D2235] text-white px-6 py-2 rounded-lg flex items-center gap-2"
                onClick={() => setIsAddingNewAddress(true)}
              >
                <Plus size={20} /> New Address
              </button>
            ) : (
              <form onSubmit={handleAddAddress} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text"
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                  <input 
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                  <input 
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                  <input 
                    type="text"
                    placeholder="Postal Code"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                  <input 
                    type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    type="submit" 
                    className="bg-[#9D2235] text-white px-6 py-2 rounded-lg"
                  >
                    Save Address
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="border border-[#9D2235] text-[#9D2235] px-6 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Gift Cards Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FDF8F8] flex items-center justify-center">
                <Gift className="text-[#9D2235]" />
              </div>
              <h2 className="text-xl font-medium">GIFTCARDS AND VOUCHERS</h2>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Apply DigiGold, Encircle Points, NeuCoins, GiftCards/E-Gift Cards, E-Vouchers, Discount Vouchers etc.
            </p>
            
            <button className="text-[#9D2235] border border-[#9D2235] px-6 py-2 rounded-lg">
              Coupons and Vouchers
            </button>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-medium mb-6">ORDER SUMMARY</h2>
          
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 mb-6 border-b pb-4">
              <img 
                src={
                  productImages[item.product.id] || 
                  `/api/placeholder/80/80`
                }
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = `/api/placeholder/80/80` 
                }}
              />
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">{item.product.sku}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
                <p className="text-sm font-medium">₹{Number(item.product.discountedPrice).toLocaleString()}</p>
              </div>
            </div>
          ))}

          {/* Price Details */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Delivery Charge</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>TOTAL <span className="text-sm text-gray-500">(Incl of all Taxes)</span></span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium text-[#9D2235]">
              <span>AMOUNT PAYABLE <span className="text-sm text-gray-500">(Incl of all Taxes)</span></span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
          </div>

          <button 
            className="w-full bg-[#9D2235] text-white py-3 rounded-lg mt-6 hover:bg-[#8A1E2F] transition-colors"
            disabled={!selectedAddress}
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;