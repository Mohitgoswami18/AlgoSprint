import { Button } from "@/components/ui/button";
import {DiCode} from "react-icons/di";
import Eye from "./Eyepart";
import terminal from "../assets/images/terminal.png";

const HeroSection = () => {
  return (
    <div className="transition-all duration-500 ease-in-out pt-26 px-10 flex items-center justify-between bg-slate-50 dark:bg-black font-[Inter]">
      <div>
        <div className="rounded-xl ease-in-out transition-all duration-500 bg-white shadow-md dark:bg-white/10 w-fit py-1 text-[12px] px-2 text-gray-600 dark:text-[#A0AEC0]">
          🐦‍🔥 join and compete in coding rooms
        </div>
        <h1 className="text-4xl my-4 font-bold text-gray-900 dark:text-[#F7FAFC]">
          Code, Compete, Conquer !
        </h1>
        <p className="my-4 tracking-tighter text-gray-600 dark:text-[#A0AEC0] w-2/5">
          Step into a competitive coding arena built for warriors. Solve
          problems, battle friends, and climb the leaderboard. This isn’t just
          practice — it’s a war of logic and speed.
        </p>
        <div className="flex items-center justify-start gap-4 border-l-2 border-b-2 p-2 w-2/5 border-gray-300 dark:border-[#A0AEC0]">
          {/* <Button variant="personal" className="cursor-pointer">
            start your journey
          </Button> */}

          <button className="relative group overflow-hidden px-4 py-2 rounded-md bg-cyan-600 text-white text-lg font-semibold">
            {/* Sliding overlay */}
            <div className="absolute top-0 left-0 w-0 h-full bg-zinc-300 transition-all duration-400 group-hover:w-full z-10"></div>

            {/* Button Text */}
            <span className="relative z-20 group-hover:text-black transition-colors duration-400">
              Start your journey
            </span>
          </button>

          <Button variant="outline" className="cursor-pointer">
            {" "}
            Explore ➡️
          </Button>
        </div>
      </div>
      <div className="border-2 border-gray-300 dark:border-white/10 shadow-md relative rounded-md mr-8">
        <div className="absolute top-1/2 left-1/2 translate-[-50%]">
          <Eye />
          <p>
            <DiCode className="text-white text-3xl absolute top-15/16 left-1/2 translate-[-50%]"></DiCode>
          </p>
        </div>
        <img src={terminal} alt="" className="rounded-md" />
      </div>
    </div>
  );
};

export default HeroSection;
