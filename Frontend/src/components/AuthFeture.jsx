import logo from "../assets/images/logo.png";
import { FaLaptop } from "react-icons/fa";
import { GiRank3 } from "react-icons/gi";
import { SlBadge } from "react-icons/sl";
import { GiDiscussion } from "react-icons/gi";
import { RiChatAiFill } from "react-icons/ri";

const AuthFeture = () => {
  return (
    <div className="relative bg-slate-50 pt-4 dark:bg-black rounded-md font-[Inter] overflow-clip w-full border-2">
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="bg-slate-300/50 dark:bg-zinc-950 h-10/11 w-11/12 rotate-45 transform scale-135"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <img
          src={logo}
          alt="logo"
          className="w-24 pb-3 animate-pulse animation-duration-4000 mx-auto"
        />
        <h1 className="text-center text-black dark:text-white text-5xl font-bold">
          Welcome to the Arena 🏫
        </h1>
        <p className="py-2 px-40 text-base text-gray-600 dark:text-[#A0AEC0] text-center">
          Step into the digital battlefield, a coding arena to compete and
          challenge your skills with your friends. Compete and upskill together.
        </p>

        <div className="text-left">
          <p className="py-3 flex items-center gap-4 px-40 text-base p-3 text-gray-600 dark:text-[#A0AEC0]">
            Your coding adventure awaits you
          </p>
          <p className="py-2 flex items-center gap-4 px-40 text-base text-gray-600 dark:text-[#A0AEC0]">
            <FaLaptop className="text-xl" /> Exciting coding battles with your
            friends
          </p>
          <p className="py-2 flex items-center gap-4 px-40 text-base text-gray-600 dark:text-[#A0AEC0]">
            <GiRank3 className="text-xl" /> Increase rank and climb leaderboard
          </p>
          <p className="py-2 flex items-center gap-4 px-40 text-base text-gray-600 dark:text-[#A0AEC0]">
            <SlBadge className="text-xl" /> Earn badges and titles
          </p>
          <p className="py-2 flex items-center gap-4 px-40 text-base text-gray-600 dark:text-[#A0AEC0]">
            <GiDiscussion className="text-xl" /> Discuss post-contest with
            others in private collaborative rooms
          </p>
          <p className="py-2 flex items-center pb-12 gap-4 px-40 text-base text-gray-600 dark:text-[#A0AEC0]">
            <RiChatAiFill className="text-xl" /> See others Thoughts and share
            your progress in the global chat
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthFeture;
