import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { MdLeaderboard } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaLaptopCode } from "react-icons/fa";
import { GiChoice } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "../../components/ui/button";

const ProfileHeroSection = () => {
  const ToggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="bg-slate-200 dark:bg-black/60 w-2/10 h-screen font-[Inter] px-4 py-3 flex-col border-r-2 border-zinc-300 dark:border-zinc-600 shadow-sm dark:shadow-white transition-all duration-500">
      {/* Logo Section */}
      <div className="flex gap-4 basis-[10%] bg-black/10 px-2 py-2 rounded-md">
        <img src={logo} alt="AlgoSprint" className="w-10" />
        <div>
          <h1 className="text-black dark:text-white text-lg font-bold">
            AlgoSprint
          </h1>
          <p className="text-[12px] font-semibold text-gray-700 dark:text-gray-300">
            Level up your skills
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="py-4 pr-4 flex flex-col gap-5 mt-3 basis-[70%]">
        <NavLink
          to={"/user"}
          className="list-none transition-all duration-300 flex gap-2 items-center justify-start hover:bg-black/20 dark:hover:bg-white/6 rounded-md px-3 py-[12px] text-sm text-black dark:text-white"
        >
          <TbLayoutDashboardFilled className="text-xl" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to={"/user/leaderboard"}
          className="list-none transition-all duration-300 flex gap-2 items-center justify-start hover:bg-black/10 dark:hover:bg-white/6 rounded-md px-3 py-[12px] text-sm text-black dark:text-white"
        >
          <MdLeaderboard className="text-xl" /> <p>Leaderboard</p>
        </NavLink>
        <NavLink
          to={"/user/codingrooms"}
          className="list-none transition-all duration-300 flex gap-2 items-center justify-start hover:bg-black/10 dark:hover:bg-white/6 rounded-md px-3 py-[12px] text-sm text-black dark:text-white"
        >
          <FaLaptopCode className="text-xl" /> <p>Coding Room</p>
        </NavLink>
        <NavLink
          to={"/user/mcqrooms"}
          className="list-none transition-all duration-300 flex gap-2 items-center justify-start hover:bg-black/10 dark:hover:bg-white/6 rounded-md px-3 py-[12px] text-sm text-black dark:text-white"
        >
          <GiChoice className="text-xl" /> <p>MCQ verse</p>
        </NavLink>
        <NavLink
          to={"/user/community"}
          className="list-none transition-all duration-300 flex gap-2 items-center justify-start hover:bg-black/10 dark:hover:bg-white/6 rounded-md px-3 py-[12px] text-sm text-black dark:text-white"
        >
          <RiUserCommunityFill className="text-xl" /> <p>Community</p>
        </NavLink>
        <NavLink
          to={"/user/collaborativerooms"}
          className="list-none transition-all duration-300 flex gap-2 items-center justify-start hover:bg-black/10 dark:hover:bg-white/6 rounded-md px-3 py-[12px] text-sm text-black dark:text-white"
        >
          <SiGoogleclassroom className="text-xl" /> <p>Collaborative Space</p>
        </NavLink>
      </div>

      {/* Toggle and Sign Out */}
      <div className="basis-[10%] pt-3 flex flex-col gap-2">
        <Button
          variant="personal"
          className="hover:bg-cyan-500/70 dark:hover:bg-cyan-600/80"
          onClick={ToggleTheme}
        >
          Toggle Theme
        </Button>
        <Button
          variant="destructive"
          className="hover:bg-red-600/70 dark:hover:bg-red-600/60"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeroSection;
