import React, { useEffect, useState } from "react";
import heroImage from "../assets/images/heroImage.png";

const Eye = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      setAngle(newAngle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-full max-w-[500px] aspect-square bg-center bg-no-repeat bg-contain"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Left Eye */}
      <div
        className="absolute w-[15%] aspect-square bg-zinc-100 rounded-full flex items-center justify-center"
        style={{
          top: "54%", 
          left: "35%", 
        }}
      >
        <div
          style={{ transform: `rotate(${angle}deg)` }}
          className="absolute w-full h-full flex items-center justify-start pl-[20%]"
        >
          <div className="bg-black rounded-full w-1/2 h-1/2"></div>
        </div>
      </div>

      {/* Right Eye */}
      <div
        className="absolute w-[15%] aspect-square bg-zinc-100 rounded-full flex items-center justify-center"
        style={{
          top: "50%",
          left: "52%",
        }}
      >
        <div
          style={{ transform: `rotate(${angle}deg)` }}
          className="absolute w-full h-full flex items-center justify-start pl-[20%]"
        >
          <div className="bg-black rounded-full w-1/2 h-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Eye;
