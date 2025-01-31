import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa6";

const products = [
  // Sample product data here (same as before)
];


function ProductDetail({ productId }) {
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <img src={product.img} alt={product.name} className="w-full h-96 object-cover rounded-3xl" />
      <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
      <p className="text-xl text-gray-700 mt-2">{product.price}</p>
      <p className="mt-4">Size:</p>
      <input
        type="text"
        className="border-dotted border-2 border-gray-400 p-2 w-full mt-2"
        placeholder="Enter size"
      />
      <div className="mt-4">
        <input
          type="text"
          placeholder="Street Address, Apartment"
          className="border border-gray-300 p-2 w-full mt-2"
        />
        <div className="flex mt-2">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 p-2 w-1/2 mr-2"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 p-2 w-1/2"
          />
        </div>
        <input
          type="text"
          placeholder="Pincode"
          className="border border-gray-300 p-2 w-full mt-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded-xl w-full mt-4">
          Place Order
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetailWrapper />} />
      </Routes>
    </Router>
  );
}

function ProductDetailWrapper() {
  const { id } = useParams();
  return <ProductDetail productId={id} />;
}

export default App;
