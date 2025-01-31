import React, { useState, useEffect, useRef } from "react";

const EveryDay = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);
  const cardsRef = useRef([]);

  const updateImageSize = () => {
    if (imgRef.current) {
      const { width, height } = imgRef.current.getBoundingClientRect();
      setImageSize({ width, height });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateImageSize);
    updateImageSize();
    return () => window.removeEventListener("resize", updateImageSize);
  }, []);

  const getHotspotStyle = (xCoord, yCoord) => {
    const originalWidth = 354;
    const originalHeight = 514;
    const top = (imageSize.height * yCoord) / originalHeight;
    const left = (imageSize.width * xCoord) / originalWidth;
    return { top: `${top}px`, left: `${left}px` };
  };

  const handleHotspotClick = (item) => {
    const cardIndex =
      item === "necklace"
        ? 0
        : item === "earrings"
        ? 1
        : item === "ring"
        ? 2
        : 3;
    cardsRef.current[cardIndex].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full">
        <img
          ref={imgRef}
          src="./assets/v2/DailyLuxe.png"
          alt="Model"
          className="w-full h-auto object-cover"
          onLoad={updateImageSize}
        />
        <div
          className="absolute w-8 h-8 bg-transparent cursor-pointer neon-effect"
          style={getHotspotStyle(202, 221)}
          onClick={() => handleHotspotClick("bracelet")}
          onMouseEnter={() => setHoveredItem("bracelet")}
          onMouseLeave={() => setHoveredItem(null)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 bg-purple-500 animate-ping"></div>
          </div>
        </div>
        <div
          className="absolute w-8 h-8 bg-transparent cursor-pointer neon-effect"
          style={getHotspotStyle(311, 419)}
          onClick={() => handleHotspotClick("ring")}
          onMouseEnter={() => setHoveredItem("ring")}
          onMouseLeave={() => setHoveredItem(null)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 bg-purple-500 animate-ping"></div>
          </div>
        </div>
        <div
          className="absolute w-8 h-8 bg-transparent cursor-pointer neon-effect"
          style={getHotspotStyle(208, 449)}
          onClick={() => handleHotspotClick("earrings")}
          onMouseEnter={() => setHoveredItem("earrings")}
          onMouseLeave={() => setHoveredItem(null)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 bg-purple-500 animate-ping"></div>
          </div>
        </div>
        <div
          className="absolute w-8 h-8 bg-transparent cursor-pointer neon-effect"
          style={getHotspotStyle(219, 159)}
          onClick={() => handleHotspotClick("necklace")}
          onMouseEnter={() => setHoveredItem("necklace")}
          onMouseLeave={() => setHoveredItem(null)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 bg-purple-500 animate-ping"></div>
          </div>
        </div>
      </div>
      <div className="lg:pl-4 p-4 mt-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Necklace", image: "https://tyaani.com/cdn/shop/products/JDN60260_728333a8-4afd-4a01-a6a6-8695879a9388.jpg" },
            { name: "Earrings", image: "https://tyaani.com/cdn/shop/products/JDT60260_e90982f3-bb83-4442-ba61-3ba070716eea.jpg" },
            { name: "Ring", image: "https://www.curiocottage.in/cdn/shop/files/FRE102_2_3a021959-51f6-4b80-8c7d-af1a9cc97bac_2048x2048.jpg?v=1700375566" },
            { name: "Bracelet", image: "https://ishhaara.com/cdn/shop/files/ishhaara-handmade-triangle-shaped-kundan-and-pearl-studded-bangle-42514897415451.jpg?v=1728560772&width=600" },
          ].map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative rounded-3xl border border-gray-200 transition-opacity duration-300 transform hover:scale-105"
              onClick={() => handleHotspotClick(item.name.toLowerCase())}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-3xl"/>
              <p className="mt-2 mb-1 text-center text-lg text-gray-800">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EveryDay;
