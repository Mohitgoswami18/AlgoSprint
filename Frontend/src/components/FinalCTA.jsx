import React from "react";

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-cyan-500/20 via-violet-600/10 to-purple-500/20 rounded-2xl shadow-xl mx-4 md:mx-auto my-20 max-w-5xl p-10 text-center backdrop-blur-lg border border-white/10">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Game Your Coding?
      </h2>
      <p className="text-gray-300 text-sm md:text-base mb-8 max-w-2xl mx-auto">
        Dive into a whole new way of practicing DSA with friends, challenges,
        real-time rooms, and competitive vibes. Whether you’re prepping for
        interviews or just love coding — make it fun.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-all font-semibold text-white shadow-md">
          Create a Room
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all font-medium text-gray-200">
          Join with Code
        </button>
      </div>
    </section>
  );
};

export default CTA;
