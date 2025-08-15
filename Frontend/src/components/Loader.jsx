import React from 'react'

const Loader = () => {
  return (
    <div className="Loader flex items-center justify-center gap-1">
      <div className="w-2 h-2 rounded-full bg-white animate-caret-blink "></div>
      <div className="w-2 h-2 rounded-full bg-white animate-caret-blink  delay-100"></div>
      <div className="w-2 h-2 rounded-full bg-white animate-caret-blink  delay-300"></div>
    </div>
  );
}

export default Loader
