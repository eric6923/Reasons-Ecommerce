import React, { useState, useEffect } from "react";
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const metals = {
  GOLD: {
    Necklace: ["Choker", "Long Necklace", "Rani Haar"],
    Earrings: ["Jhumka", "Chandbalis", "Studs", "Drop Earrings"],
    Rings: ["Cocktail Rings", "Stackable Rings", "Statement Rings"],
    Bracelet: ["Cuffs", "Bangles", "Bracelets"],
    Others: ["Mang Tika", "Nath", "Nose Pin", "Armlets"],
  },
  SILVER: {
    Necklace: ["Pendants", "Statement Pieces"],
    Earrings: ["Hoops", "Studs", "Drop Earrings"],
    Rings: ["Solitaire Rings", "Adjustable Rings"],
    Bracelet: ["Cuffs", "Bangles"],
    Others: ["Anklets", "Brooches"],
  },
  DIAMOND: {
    Necklace: ["Diamond Pendant", "Solitaire", "Tennis", "Cluster"],
    Earrings: ["Studs", "Hoops", "Chandeliers"],
    Rings: ["Fashion Rings"],
    Bracelet: ["Bangles", "Fashion Bracelets"],
    Others: ["Watches", "Brooches", "Anklets"],
  },
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [price, setPrice] = useState(10000);
  const [showFilter, setShowFilter] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    metals: false,
    categories: false,
    subcategories: false,
    price: false,
  });

  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://reasons-server.vercel.app/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    const subtype = params.get("subtype");

    if (type) {
      setSelectedMetals([type.toUpperCase()]);
    }
    if (subtype) {
      setSelectedCategories([subtype.charAt(0).toUpperCase() + subtype.slice(1)]);
    }
  }, [location.search]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesMetal =
      selectedMetals.length === 0 ||
      selectedMetals.includes(product.material);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(cat => 
        product.category.name.toLowerCase().includes(cat.toLowerCase())
      );

    const matchesPrice = parseInt(product.discountedPrice) <= price;

    return matchesSearch && matchesMetal && matchesCategory && matchesPrice;
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMetalChange = (metal) => {
    if (selectedMetals.includes(metal)) {
      setSelectedMetals(selectedMetals.filter((m) => m !== metal));
    } else {
      setSelectedMetals([...selectedMetals, metal]);
    }
    setSelectedCategories([]);
    setSubCategories([]);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const getAvailableCategories = () => {
    const allCategories = new Set();
    selectedMetals.forEach((metal) => {
      if (metals[metal]) {
        Object.keys(metals[metal]).forEach((category) => {
          allCategories.add(category);
        });
      }
    });

    if (selectedMetals.length === 0) {
      Object.keys(metals).forEach((metal) => {
        Object.keys(metals[metal]).forEach((category) => {
          allCategories.add(category);
        });
      });
    }

    return [...allCategories];
  };

  const handlePriceChange = (e) => {
    setPrice(parseInt(e.target.value));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 hero-text">
      <img
        src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        alt="Banner"
        className="w-full h-60 object-cover brightness-50"
      />

      {/* Search Bar */}
      <div className="flex items-center p-3 mt-2 w-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-1 p-3 pl-6 rounded-full border hero-text border-gray-300 mr-2 focus:border-black focus:outline-none"
        />
        <button
          className="bg-white border border-gray-300 text-black p-3 rounded-full flex-shrink-0"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <FaFilter />
        </button>
      </div>

      {/* Filter Section */}
      {showFilter && (
        <div className="fixed inset-0 bg-white z-50 p-6 max-w-[500px] overflow-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-lg hero-text font-medium">Filters</h3>
            <button
              className="text-gray-500 text-2xl"
              onClick={() => setShowFilter(false)}
            >
              <FaTimes />
            </button>
          </div>

          {/* Metal Filter */}
          <div className="mt-4">
            <h4
              className="text-lg hero-text cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("metals")}
            >
              Metals
              <span className={`ml-2 transition-transform ${expandedSections.metals ? "rotate-180" : ""}`}>
                {expandedSections.metals ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </h4>
            {expandedSections.metals && (
              <>
                {Object.keys(metals).map((metal) => (
                  <div key={metal} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedMetals.includes(metal)}
                      onChange={() => handleMetalChange(metal)}
                      className="mr-2 w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <span className="hero-text text-lg">{metal}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Category Filter */}
          <div className="mt-4">
            <h4
              className="text-lg hero-text cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("categories")}
            >
              Categories
              <span className={`ml-2 transition-transform ${expandedSections.categories ? "rotate-180" : ""}`}>
                {expandedSections.categories ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </h4>
            {expandedSections.categories && (
              <>
                {getAvailableCategories().map((category) => (
                  <div key={category} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 w-4 h-6 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label className="hero-text text-lg">{category}</label>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Price Filter */}
          <div className="mt-4">
            <h4
              className="text-lg hero-text cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection("price")}
            >
              Price
              <span className={`ml-2 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}>
                {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </h4>
            {expandedSections.price && (
              <div className="mt-2">
                <input
                  type="range"
                  min="100"
                  max="100000"
                  value={price}
                  onChange={handlePriceChange}
                  className="w-full"
                />
                <p className="mt-2 hero-text">Max Price: ₹{price}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 py-6">
          {filteredProducts.length === 0 ? (
            <p className="hero-text text-gray-500 col-span-full text-center">No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/Product/${product.id}`}
                className="block"
              >
                <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl sm:rounded-3xl p-2 sm:p-4 text-center">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <img
                      src={product.images[0]?.imageUrl || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-full h-32 sm:h-52 object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-2 sm:mt-4 space-y-0.5 sm:space-y-2">
                    <h4 className="hero-text text-gray-800 font-medium text-sm sm:text-lg line-clamp-1">{product.name}</h4>
                    <p className="hero-text text-gray-500 text-xs sm:text-base">{product.material}</p>
                    <div className="flex justify-center items-center space-x-1 sm:space-x-3">
                      <span className="hero-text text-gray-400 line-through text-xs sm:text-sm">₹{product.actualPrice}</span>
                      <span className="hero-text text-green-600 font-semibold text-sm sm:text-lg">₹{product.discountedPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;