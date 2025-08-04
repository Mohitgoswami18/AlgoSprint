import React, { useEffect, useState } from "react";

const Eye = () => {

  const[angle, setAngle] = useState(0);
   useEffect(() => {
     const handleMouseMove = (e) => {
       // Get the center of the viewport
       const centerX = window.innerWidth / 2;
       const centerY = window.innerHeight / 2;

       // Calculate the angle from center to mouse position
       const deltaX = e.clientX - centerX;
       const deltaY = e.clientY - centerY;
       const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

       setAngle(newAngle - 180);
     };

     window.addEventListener("mousemove", handleMouseMove);
     return () => window.removeEventListener("mousemove", handleMouseMove);
   }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="bg-zinc-100 relative rounded-full w-16 h-15">
        <div
          style={{ transform: `rotate(${angle}deg)` }}
          className="absolute w-full h-full flex items-center justify-start pl-2"
        >
          <div className="bg-black rounded-full w-1/2 h-1/2"></div>
        </div>
      </div>
      <div className="bg-zinc-100 relative rounded-full w-16 h-15">
        <div
          style={{ transform: `rotate(${angle}deg)` }}
          className="absolute w-full h-full flex items-center justify-start pl-2"
        >
          <div className="bg-black rounded-full w-1/2 h-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Eye;
