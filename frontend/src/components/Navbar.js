import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiX,
  FiMenu,
  FiChevronRight,
  FiChevronDown,
  FiUser,
  FiShoppingCart,
  FiPackage,
  FiLogOut
} from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [submenuOpen, setSubmenuOpen] = useState("");
  const [currentMenu, setCurrentMenu] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const handleMenuClick = (menu) => {
    if (currentMenu === menu) {
      // If the menu is already open, close it
      setCurrentMenu("");
      setActiveSubMenu("");
    } else {
      // Set the current menu and reset active submenu
      setCurrentMenu(menu);
      setActiveSubMenu("");
    }
  };

  const handleSubMenuClick = (submenu) => {
    // Toggle the submenu: if already open, close it; otherwise, open the new one.
    if (activeSubMenu === submenu) {
      setActiveSubMenu(""); // Close it
    } else {
      setActiveSubMenu(submenu); // Open the clicked submenu
    }
  };

  const handleMouseEnter = (menuIndex) => {
    setActiveMenu(menuIndex);
  };

  const handleMouseLeave = () => {
    // Do nothing to keep the submenu open while hovering over it
  };

  const handleSubMenuLeave = () => {
    // This clears both menu and submenu when leaving the submenu area
    setActiveMenu(null);
    setActiveSubMenu("");
  };

  const handleMouseEnterSubMenu = (submenu) => {
    setActiveSubMenu(submenu);
  };

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    // Add any additional logout logic here
  };
  const ProfileDropdown = () => (
    <div className="relative group">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="py-0 px-4 text-lg group-hover:text-black flex items-center space-x-1 h-full"
      >
        <span>Hi, {user?.name}</span>
        <FiChevronDown className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsProfileOpen(false)}
          >
            <FiUser className="mr-2" />
            Profile
          </Link>
          <Link
            to="/cart"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsProfileOpen(false)}
          >
            <FiShoppingCart className="mr-2" />
            Cart
          </Link>
          <Link
            to="/orders"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsProfileOpen(false)}
          >
            <FiPackage className="mr-2" />
            Orders
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileProfileOpen) {
        setIsMobileProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileProfileOpen]);

  return (
    <nav
      className={`absolute w-full top-0 z-50 transition-all duration-800 ${scrolled ? "bg-white text-black" : "bg-transparent text-white"
        } md:hover:bg-white md:hover:text-black`}
    >
      <div className="container mx-auto p-5">
        {/* Desktop Navbar */}
        <div className="hidden md:flex flex-col items-center hero-text relative z-20">
          <div className="text-3xl hero-title font-bold mb-4 text-center z-20">
            REASONS
          </div>

          <ul className="flex space-x-8 relative z-20">
            {/* Home menu */}
            <li
              className="group relative"
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/" className="py-2 px-4 text-lg group-hover:text-black">
                HOME
              </Link>
              {activeMenu === 0 && (
                <div
                  className="fixed inset-0 bg-white z-30 flex p-10 mt-28 transition-opacity duration-300 mb-24"
                  onMouseEnter={() => handleMouseEnter(0)} // Keep the submenu open when hovering on it
                  onMouseLeave={handleSubMenuLeave} // Close submenu when leaving it
                >
                  <div className="flex flex-col w-1/3 text-black">
                    <Link to="/whatsnew" className="py-2 hover:bg-gray-200">
                      WHAT'S NEW
                    </Link>
                    <Link
                      to="/HighJewelryComponent"
                      className="py-2 hover:bg-gray-200"
                    >
                      Occasions
                    </Link>
                    <Link to="/Catalogue" className="py-2 hover:bg-gray-200">
                      SHOP
                    </Link>
                    <Link to="/login" className="py-2 hover:bg-gray-200">
                      LOGIN
                    </Link>
                  </div>
                  <div className="border-l border-gray-300 mx-4 h-auto"></div>
                  {/* Images section */}
                  <div className="flex flex-col ml-10 w-2/3">
                    <div className="flex space-x-4 mt-8">
                      <div className="flex flex-col items-center">
                        <img
                          src="https://i.pinimg.com/564x/55/93/44/559344712a4dde584e12c34461462da4.jpg"
                          alt="Image 1"
                          className="h-60 object-cover mb-2 rounded-3xl"
                        />
                        <span className="text-center text-black">
                          Description 1
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          src="https://i.pinimg.com/564x/c7/d1/d2/c7d1d2b647a03a23fa1833f89fc90b14.jpg"
                          alt="Image 2"
                          className="h-60 object-cover mb-2 rounded-3xl"
                        />
                        <span className="text-center text-black">
                          Description 2
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          src="https://i.pinimg.com/564x/ce/1f/0b/ce1f0ba489010bd6c1bd3f92c4297b5c.jpg"
                          alt="Image 3"
                          className="h-60 object-cover mb-2 rounded-3xl"
                        />
                        <span className="text-center text-black">
                          Description 3
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link
                to="/whatsnew"
                className="py-2 px-4 text-lg group-hover:text-black"
              >
                WHAT'S NEW
              </Link>
            </li>

            {/* High Jewellery menu */}
            <li
              className="group relative"
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <Link className="py-2 px-4 text-lg group-hover:text-black">
                Occasions
              </Link>
              {activeMenu === 2 && (
                <div
                  className="fixed inset-0 bg-white mt-28 z-30 flex p-10 transition-opacity duration-300 mb-24"
                  onMouseEnter={() => handleMouseEnter(2)}
                  onMouseLeave={handleSubMenuLeave}
                >
                  <div className="flex flex-col w-1/3 text-black">
                    <Link to="/indianbride" className="py-2 hover:bg-gray-200">
                      Bride
                    </Link>
                    <Link to="/everyday" className="py-2 hover:bg-gray-200">
                      Daily Luxe
                    </Link>
                  </div>
                  <div className="border-l border-gray-300 mx-4 h-auto"></div>

                  {/* Horizontal image display */}
                  <div className="flex flex-row ml-10 space-x-4 w-full">
                    <div>
                      <img
                        src="./assets/v2/IMG_9019.jpg" // Replace with your image URL
                        alt="REASONS Exclusive"
                        className="h-60 w-auto rounded" // Adjust styles as needed
                      />
                    </div>
                    <div>
                      <img
                        src="./assets/v2/IMG_9020.jpg" // Replace with your image URL
                        alt="South Indian"
                        className="h-60 w-auto rounded" // Adjust styles as needed
                      />
                    </div>
                    <div>
                      <img
                        src="./assets/v2/IMG_9021.jpg" // Replace with your image URL
                        alt="Everyday Everready"
                        className="h-60 w-auto rounded" // Adjust styles as needed
                      />
                    </div>
                  </div>
                </div>
              )}
            </li>
            {/* Shop menu with submenu items */}
            <li
              className="group relative"
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/Catalogue"
                className="py-2 px-4 text-lg group-hover:text-black"
              >
                SHOP
              </Link>
              {activeMenu === 3 && (
                <div
                  className="fixed inset-0 bg-white mt-28 z-30 flex p-10 transition-opacity duration-300 mb-24"
                  onMouseEnter={() => handleMouseEnter(3)}
                  onMouseLeave={handleSubMenuLeave}
                >
                  <div className="flex flex-col w-1/3 text-black">
                    <Link
                      to="/Catalogue?type=kundan"
                      className="py-2 hover:bg-gray-200"
                      onMouseEnter={() => handleMouseEnterSubMenu("kundan")}
                    >
                      KUNDAN
                    </Link>
                    <Link
                      to="/Catalogue?type=silver"
                      className="py-2 hover:bg-gray-200"
                      onMouseEnter={() => handleMouseEnterSubMenu("silver")}
                    >
                      SILVER
                    </Link>
                    <Link
                      to="/Catalogue?type=diamond"
                      className="py-2 hover:bg-gray-200"
                      onMouseEnter={() => handleMouseEnterSubMenu("diamond")}
                    >
                      DIAMOND
                    </Link>
                  </div>

                  <div className="border-l border-gray-300 mx-4 h-auto"></div>

                  <div className="flex flex-col ml-10 w-2/3">
                    {/* Default images before hovering on submenu */}
                    {!activeSubMenu && (
                      <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <img
                            src="https://i.pinimg.com/564x/55/93/44/559344712a4dde584e12c34461462da4.jpg"
                            alt="Image 1"
                            className="h-60 object-cover mb-2 rounded-3xl"
                          />
                          <span className="text-center text-black">
                            Description 1
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <img
                            src="https://i.pinimg.com/564x/c7/d1/d2/c7d1d2b647a03a23fa1833f89fc90b14.jpg"
                            alt="Image 2"
                            className="h-60 object-cover mb-2 rounded-3xl"
                          />
                          <span className="text-center text-black">
                            Description 2
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <img
                            src="https://i.pinimg.com/564x/ce/1f/0b/ce1f0ba489010bd6c1bd3f92c4297b5c.jpg"
                            alt="Image 3"
                            className="h-60 object-cover mb-2 rounded-3xl"
                          />
                          <span className="text-center text-black">
                            Description 3
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Submenu content for Kundan, Silver, Diamond */}
                    <div
                      className={`flex flex-col ${activeSubMenu === "kundan" ? "block" : "hidden"
                        }`}
                    >
                      <h3 className="text-lg font-bold">KUNDAN</h3>
                      <Link
                        to="/Catalogue?type=kundan&subtype=necklace"
                        className="py-2 hover:bg-gray-200"
                      >
                        Necklace
                      </Link>
                      <Link
                        to="/Catalogue?type=kundan&subtype=earring"
                        className="py-2 hover:bg-gray-200"
                      >
                        Earring
                      </Link>
                      <Link
                        to="/Catalogue?type=kundan&subtype=ring"
                        className="py-2 hover:bg-gray-200"
                      >
                        Ring
                      </Link>
                      <Link
                        to="/Catalogue?type=kundan&subtype=bracelet"
                        className="py-2 hover:bg-gray-200"
                      >
                        Bracelet
                      </Link>
                      <Link
                        to="/Catalogue?type=kundan&subtype=mangtikka"
                        className="py-2 hover:bg-gray-200"
                      >
                        Mang Tikka
                      </Link>
                      <Link
                        to="/Catalogue?type=kundan&subtype=nosepin"
                        className="py-2 hover:bg-gray-200"
                      >
                        Nose Pin
                      </Link>
                      <Link
                        to="/Catalogue?type=kundan&subtype=armlet"
                        className="py-2 hover:bg-gray-200"
                      >
                        Armlets
                      </Link>
                      <Link
                        to="/Catalogue?type=kundan&subtype=nath"
                        className="py-2 hover:bg-gray-200"
                      >
                        Nath
                      </Link>
                    </div>
                    <div
                      className={`flex flex-col ${activeSubMenu === "silver" ? "block" : "hidden"
                        }`}
                    >
                      <h3 className="text-lg font-bold">SILVER</h3>
                      <Link
                        to="/Catalogue?type=silver&subtype=necklace"
                        className="py-2 hover:bg-gray-200"
                      >
                        Necklace
                      </Link>
                      <Link
                        to="/Catalogue?type=silver&subtype=earring"
                        className="py-2 hover:bg-gray-200"
                      >
                        Earring
                      </Link>
                      <Link
                        to="/Catalogue?type=silver&subtype=ring"
                        className="py-2 hover:bg-gray-200"
                      >
                        Ring
                      </Link>
                      <Link
                        to="/Catalogue?type=silver&subtype=bracelet"
                        className="py-2 hover:bg-gray-200"
                      >
                        Bracelet
                      </Link>
                      <Link
                        to="/Catalogue?type=silver&subtype=anklet"
                        className="py-2 hover:bg-gray-200"
                      >
                        Anklets
                      </Link>
                      <Link
                        to="/Catalogue?type=silver&subtype=brooch"
                        className="py-2 hover:bg-gray-200"
                      >
                        Brooches
                      </Link>
                    </div>
                    <div
                      className={`flex flex-col ${activeSubMenu === "diamond" ? "block" : "hidden"
                        }`}
                    >
                      <h3 className="text-lg font-bold">DIAMOND</h3>
                      <Link
                        to="/Catalogue?type=diamond&subtype=necklace"
                        className="py-2 hover:bg-gray-200"
                      >
                        Necklace
                      </Link>
                      <Link
                        to="/Catalogue?type=diamond&subtype=earring"
                        className="py-2 hover:bg-gray-200"
                      >
                        Earring
                      </Link>
                      <Link
                        to="/Catalogue?type=diamond&subtype=bracelet"
                        className="py-2 hover:bg-gray-200"
                      >
                        Bracelet
                      </Link>
                      <Link
                        to="/Catalogue?type=diamond&subtype=ring"
                        className="py-2 hover:bg-gray-200"
                      >
                        Ring
                      </Link>
                      <Link
                        to="/Catalogue?type=diamond&subtype=watches"
                        className="py-2 hover:bg-gray-200"
                      >
                        Watches
                      </Link>
                      <Link
                        to="/Catalogue?type=diamond&subtype=brooch"
                        className="py-2 hover:bg-gray-200"
                      >
                        Brooches
                      </Link>
                      <Link
                        to="/Catalogue?type=diamond&subtype=anklet"
                        className="py-2 hover:bg-gray-200"
                      >
                        Anklets
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li>
              {user ? (
                <ProfileDropdown />
              ) : (
                <Link to="/login" className="py-2 px-4 text-lg group-hover:text-black">
                  LOGIN
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div>
          <div className="md:hidden flex justify-between items-center w-full">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl"
              whileTap={{ rotate: 90 }}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </motion.button>


            <div className="flex items-center justify-center relative">
              <span className={`text-3xl hero-title font-bold ${user ? 'mr-4' : 'mr-16'}`}>REASONS</span>
              {user && (
                <div className="relative ml-4">
                  <button
                    onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                    className="p-2 rounded-full hover:bg-gray-100/10"
                  >
                    <FiUser className="text-2xl" />
                  </button>

                  {/* Dropdown Menu */}
                  {isMobileProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMobileProfileOpen(false)}
                      >
                        <FiUser className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMobileProfileOpen(false)}
                      >
                        <FiShoppingCart className="mr-2" />
                        Cart
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMobileProfileOpen(false)}
                      >
                        <FiPackage className="mr-2" />
                        Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileProfileOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>


          {/* Full-Screen Mobile Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? "0%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-full bg-white text-black z-40"
          >
            <div className="flex justify-between items-center mt-10 mx-5">
              <h2 className="text-2xl hero-title font-bold">REASONS</h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-3xl"
              >
                <FiX />
              </motion.button>
            </div>
            {/* Main Menu Items */}
            {currentMenu === "" && (
              <ul className="flex flex-col space-y-4 p-5 mt-10 text-left">
                <li>
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-xl flex items-center justify-between"
                  >
                    <span>HOME</span>
                    <FiChevronRight />
                  </Link>
                </li>
                <hr className="border-gray-600" />
                <li>
                  <Link
                    to="/whatsnew"
                    onClick={() => setIsOpen(false)}
                    className="text-xl flex items-center justify-between"
                  >
                    <span>WHAT'S NEW</span>
                    <FiChevronRight />
                  </Link>
                </li>
                <hr className="border-gray-600" />
                <li>
                  <Link
                    to="/Catalogue"
                    onClick={() => setIsOpen(false)}
                    className="text-xl flex items-center justify-between w-full"
                  >
                    <span>SHOP</span>
                    <FiChevronRight />
                  </Link>
                </li>
                <hr className="border-gray-600" />
                <li>
                  <button
                    onClick={() => handleMenuClick("occasions")}
                    className="text-xl flex items-center justify-between w-full"
                  >
                    <span>OCCASIONS</span>
                    <FiChevronRight />
                  </button>
                </li>
                <hr className="border-gray-600" />
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-xl flex items-center justify-between"
                  >
                    <span>LOGIN</span>
                    <FiChevronRight />
                  </Link>
                </li>
              </ul>
            )}
            {/* Shop Submenu Items */}

            {currentMenu === "shop" && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {/* Show the "SHOP" Header and Main Menu only if no Submenu is Active */}
                {!activeSubMenu && (
                  <>
                    {/* Back Button and SHOP Header */}
                    <div className="flex justify-between items-center p-5">
                      <button
                        onClick={() => setCurrentMenu("")}
                        className="text-lg"
                      >
                        <IoChevronBackOutline />
                      </button>
                      <h3 className="text-xl">SHOP</h3>
                    </div>

                    {/* Main Menu */}
                    <ul className="flex flex-col space-y-4 p-5 mt-10 text-left">
                      <li>
                        <button
                          onClick={() => handleSubMenuClick("kundan")}
                          className="text-xl flex items-center justify-between w-full"
                        >
                          <span>KUNDAN</span>
                          <FiChevronRight />
                        </button>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <button
                          onClick={() => handleSubMenuClick("silver")}
                          className={`text-xl flex items-center justify-between w-full ${activeSubMenu === "silver"
                              ? "text-gray-400"
                              : "text-black"
                            }`}
                        >
                          <span>SILVER</span>
                          <FiChevronRight />
                        </button>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <button
                          onClick={() => handleSubMenuClick("diamond")}
                          className={`text-xl flex items-center justify-between w-full ${activeSubMenu === "diamond"
                              ? "text-gray-400"
                              : "text-black"
                            }`}
                        >
                          <span>DIAMOND</span>
                          <FiChevronRight />
                        </button>
                      </li>
                    </ul>
                  </>
                )}

                {/* KUNDAN Submenu */}
                {activeSubMenu === "kundan" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center p-5">
                      <button
                        onClick={() => setActiveSubMenu("")}
                        className="text-lg"
                      >
                        <IoChevronBackOutline />
                      </button>
                      <h3 className="text-xl">KUNDAN</h3>
                    </div>

                    <ul className="flex flex-col space-y-4 p-5 mt-10 text-left">
                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=necklace"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Necklace
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=bracelet"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Bracelet
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=Earrings"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Earrings
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=ring"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Ring
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=mangtikka"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Mang Tika
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=nosepin"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Nose Pin
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=nath"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Nath
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=kundan&subtype=armlets"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Armlets
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {/* SILVER Submenu */}
                {activeSubMenu === "silver" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center p-5">
                      <button
                        onClick={() => setActiveSubMenu("")}
                        className="text-lg"
                      >
                        <IoChevronBackOutline />
                      </button>
                      <h3 className="text-xl">SILVER</h3>
                    </div>
                    <ul className="flex flex-col space-y-4 p-5 mt-10 text-left">
                      <li>
                        <Link
                          to="/Catalogue?type=silver&subtype=ring"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Ring
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=silver&subtype=earring"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Earring
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=silver&subtype=necklace"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Necklace
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=silver&subtype=bracelet"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Bracelet
                        </Link>
                      </li>
                      <hr className="border-gray-600" />

                      <li>
                        <Link
                          to="/Catalogue?type=silver&subtype=anklet"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Anklets
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <Link
                          to="/Catalogue?type=silver&subtype=brooch"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Brooches
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {/* DIAMOND Submenu */}
                {activeSubMenu === "diamond" && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center p-5">
                      <button
                        onClick={() => setActiveSubMenu("")}
                        className="text-lg"
                      >
                        <IoChevronBackOutline />
                      </button>
                      <h3 className="text-xl">DIAMOND</h3>
                    </div>
                    <ul className="flex flex-col space-y-4 p-5 mt-10 text-left">
                      <li>
                        <Link
                          to="/Catalogue?type=diamond&subtype=ring"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Ring
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <Link
                          to="/Catalogue?type=diamond&subtype=necklace"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Necklace
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <Link
                          to="/Catalogue?type=diamond&subtype=earring"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Earrings
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <Link
                          to="/Catalogue?type=diamond&subtype=bracelet"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Bracelets
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <Link
                          to="/Catalogue?type=diamond&subtype=watch"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Watches
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <Link
                          to="/Catalogue?type=diamond&subtype=brooch"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Brooches
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                      <li>
                        <Link
                          to="/Catalogue?type=diamond&subtype=anklet"
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentMenu("");
                            setActiveSubMenu("");
                          }}
                          className="text-xl flex items-center"
                        >
                          Anklets
                        </Link>
                      </li>
                      <hr className="border-gray-600" />
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Occasions Submenu Items */}
            {currentMenu === "occasions" && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center p-5">
                  <button
                    onClick={() => setCurrentMenu("")}
                    className="text-lg"
                  >
                    <IoChevronBackOutline />
                  </button>
                  <h3 className="text-xl">OCCASIONS</h3>
                </div>
                <ul className="flex flex-col space-y-4 p-5 mt-10 text-left">
                  <li>
                    <Link
                      to="/indianBride"
                      onClick={() => {
                        setIsOpen(false);
                        setCurrentMenu("");
                        setActiveSubMenu("");
                      }}
                      className="text-xl flex items-center justify-between w-full"
                    >
                      <span>Bride</span>
                      <FiChevronRight />
                    </Link>
                  </li>

                  <hr className="border-gray-600" />

                  <li>
                    <Link
                      to="/everyday"
                      onClick={() => {
                        setIsOpen(false);
                        setCurrentMenu("");
                        setActiveSubMenu("");
                      }}
                      className="text-xl flex items-center justify-between w-full"
                    >
                      <span>Daily Luxe</span>
                      <FiChevronRight />
                    </Link>
                  </li>

                  <hr className="border-gray-600" />
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
