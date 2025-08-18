import React from 'react'

const Loader = () => {
  return (
    <div className="Loader flex items-center justify-center gap-1">
      <div className="w-2 h-2 rounded-full bg-black animate-caret-blink dark:bg-white"></div>
      <div className="w-2 h-2 rounded-full bg-black animate-caret-blink dark:bg-white delay-100"></div>
      <div className="w-2 h-2 rounded-full bg-black animate-caret-blink dark:bg-white delay-300"></div>
    </div>
  );
}

export default Loader
