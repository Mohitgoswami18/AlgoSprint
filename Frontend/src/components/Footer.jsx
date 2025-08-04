import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-600 backdrop-blur-md border-t border-white/10 px-6 py-10 text-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand and Tagline */}
        <div>
          <h1 className="text-cyan-400 text-2xl font-bold">CodeSamrat</h1>
          <p className="mt-2 text-sm">
            Turning DSA practice into an engaging, competitive, and fun
            experience for all coders.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Leaderboard</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-2">
            Stay Connected
          </h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="mailto:contact@codesamrat.dev"
                className="hover:text-white"
              >
                contact@codesamrat.dev
              </a>
            </li>
            <li className="flex gap-4 mt-2">
              <a href="#" className="hover:text-white">
                GitHub
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-10 pt-6 text-sm text-center text-gray-400">
        &copy; {new Date().getFullYear()} CodeSamrat. Built with ❤️ for coders.
      </div>
    </footer>
  );
};

export default Footer;
