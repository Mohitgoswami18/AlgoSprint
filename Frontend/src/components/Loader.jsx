import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-3 border-t-3 border-cyan-400 dark:border-white rounded-full loader-spin"></div>
    </div>
  );
};

export default Loader;
