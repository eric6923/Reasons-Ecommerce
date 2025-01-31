import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.4, ease: 'easeInOut' } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto text-center">
        <div className="text-left mb-4 flex flex-col md:flex-row justify-between">

          <div className="w-full md:w-auto">
            <div
              onClick={() => toggleSection('whatsNew')}
              className="cursor-pointer text-lg py-2 flex justify-between items-center md:block"
              style={{ position: 'relative' }}
            >
              <span className="ml-2 relative">
                WHAT'S NEW
                <motion.div
                  className="underline"
                  variants={underlineVariants}
                  initial="hidden"
                  animate={openSection === 'whatsNew' ? 'visible' : 'hidden'}
                  style={{
                    height: '2px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: '-2px',
                    width: '100%',
                  }}
                />
              </span>
              <FaChevronDown className="transition-transform transform rotate-180 mr-2 md:hidden" />
            </div>
            <AnimatePresence>
              {(openSection === 'whatsNew' || window.innerWidth >= 768) && (
                <motion.div
                  className="pl-4 md:pl-0"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ul className="text-s">
                    <li>Autumn / Winter 2024</li>
                    <li>The Western Era</li>
                    <li>Bridal Couture 2024</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full md:w-auto">
            <div
              onClick={() => toggleSection('world')}
              className="cursor-pointer text-lg py-2 flex justify-between items-center md:block"
              style={{ position: 'relative' }}
            >
              <span className="ml-2 relative">
                WORLD OF REASONS
                <motion.div
                  className="underline"
                  variants={underlineVariants}
                  initial="hidden"
                  animate={openSection === 'world' ? 'visible' : 'hidden'}
                  style={{
                    height: '2px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: '-2px',
                    width: '100%',
                  }}
                />
              </span>
              <FaChevronDown className="transition-transform transform rotate-180 mr-2 md:hidden" />
            </div>
            <AnimatePresence>
              {(openSection === 'world' || window.innerWidth >= 768) && (
                <motion.div
                  className="pl-4 md:pl-0"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ul className="text-s">
                    <li>History</li>
                    <li>Collaborations</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full md:w-auto">
            <div
              onClick={() => toggleSection('customerCare')}
              className="cursor-pointer text-lg py-2 flex justify-between items-center md:block"
              style={{ position: 'relative' }}
            >
              <span className="ml-2 relative">
                CUSTOMER CARE
                <motion.div
                  className="underline"
                  variants={underlineVariants}
                  initial="hidden"
                  animate={openSection === 'customerCare' ? 'visible' : 'hidden'}
                  style={{
                    height: '2px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: '-2px',
                    width: '100%',
                  }}
                />
              </span>
              <FaChevronDown className="transition-transform transform rotate-180 mr-2 md:hidden" />
            </div>
            <AnimatePresence>
              {(openSection === 'customerCare' || window.innerWidth >= 768) && (
                <motion.div
                  className="pl-4 md:pl-0"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ul className="text-s">
                    <li>Contact</li>
                    <li>Stores</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        <hr className="border-t border-gray-600 my-4" />

        <div className="flex items-center justify-center">
          <img
            width="30"
            height="30"
            src="./thelogo.png"
            alt="lion-head"
            className="mr-2"
          />
          <h1 className="text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>
            REASONS |  © {new Date().getFullYear()} All rights reserved.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
