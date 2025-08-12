import { GrUserNew } from "react-icons/gr";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";

const steps = [
  {
    icon: <GrUserNew />,
    title: "Sign Up",
    description: "Quickly create your account to get started.",
    color: "text-blue-500",
  },
  {
    icon: <FaPeopleRoof />,
    title: "Create Room",
    description: "Spin up a game room with one click.",
    color: "text-green-500",
  },
  {
    icon: <MdOutlineSettingsSuggest />,
    title: "Customize Settings",
    description: "Pick topics, difficulty & time limits.",
    color: "text-purple-500",
  },
  {
    icon: <FaShareAlt />,
    title: "Share Link",
    description: "Invite friends to join your room.",
    color: "text-yellow-500",
  },
  {
    icon: <MdOutlineNotStarted/>,
    title: "Room Starts",
    description: "Timer kicks in. Let the battle begin!",
    color: "text-red-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="transition-all mt-12 duration-500 ease-in-out bg-slate-50 dark:bg-black font-[Inter] ">
      <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">
        How to start your journey
      </h2>

      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              className="bg-slate-100 ring-[0.5px] dar:ring-slate-100 dark:bg-white/10 flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-zinc-700 transition rounded-xl shadow-lg p-6 w-[280px] relative"
            >
              <p className="p-2 bg-white/5 flex items-center justify-center w-fit rounded-full text-3xl">
                {step.icon}
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">{step.description}</p>
              </div>

              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-cyan-200 to-cyan-500 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full">
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
