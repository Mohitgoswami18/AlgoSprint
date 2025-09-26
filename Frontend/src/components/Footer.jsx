import {useNavigate} from "react-router-dom"

const Footer = ({
  homeRef,
  languageRef,
  featureRef,
  workFlowRef,
  rankLineRef,
}) => {

  const navigate = useNavigate();

  const handleScroll = (ref) => {
     ref.current?.scrollIntoView({
       behavior: "smooth",
       block: "start",
     });
  }

  return (
    <footer
      className="
        bg-slate-100 font-[Inter] dark:bg-zinc-900
        backdrop-blur-md border-t border-black/10 dark:border-white/10
        px-6 pt-10 pb-2
        text-gray-700 dark:text-gray-300
      "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h1 className="text-cyan-600 dark:text-cyan-400 text-2xl font-bold">
            AlgoSprint
          </h1>
          <p className="mt-2 text-sm">
            Turning DSA practice into an engaging, competitive, and fun
            experience for all coders.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-black dark:text-white font-semibold text-lg mb-2">
            Quick Links
          </h2>
          <ul className="text-xs flex flex-wrap">
            <div className="space-y-1">
              <li
                className="hover:text-black dark:hover:text-white cursor-pointer"
                onClick={() => handleScroll(homeRef)}
              >
                Home
              </li>
              <li
                className="hover:text-black dark:hover:text-white cursor-pointer"
                onClick={() => handleScroll(featureRef)}
              >
                features
              </li>
              <li
                className="hover:text-black dark:hover:text-white cursor-pointer"
                onClick={() => handleScroll(languageRef)}
              >
                languages
              </li>
              <li
                className="hover:text-black dark:hover:text-white cursor-pointer"
                onClick={() => handleScroll(rankLineRef)}
              >
                Ranks & Leaderboard
              </li>
            </div>
            <div className="space-y-1">
              <li
                className="hover:text-black dark:hover:text-white cursor-pointer"
                onClick={() => handleScroll(workFlowRef)}
              >
                How It Works
              </li>
              <li
                className="hover:text-black dark:hover:text-white cursor-pointer"
                onClick={() => navigate("/auth/signin")}
              >
                Login
              </li>
            </div>
          </ul>
        </div>

        <div>
          <h2 className="text-black dark:text-white font-semibold text-lg mb-3">
            Stay Connected
          </h2>
          <ul className="space-y-1 text-xs">
            <li>
              <a
                href="mailto:contact@AlgoSprint.dev"
                className="hover:text-black dark:hover:text-white"
              >
                mohitgoswami18326@gmail.com
              </a>
            </li>
            <li className="flex gap-4 mt-2">
              <a
                href="https://github.com/mohitgoswami18"
                target="_blank"
                className="hover:text-black dark:hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mohitgoswami18/?originalSubdomain=in"
                target="_blank"
                className="hover:text-black dark:hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/Mohit_Goswami18"
                target="_blank"
                className="hover:text-black dark:hover:text-white"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 mt-10 pt-6 text-sm text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} AlgoSprint. Built with ❤️ for coders.
      </div>
    </footer>
  );
};

export default Footer;
