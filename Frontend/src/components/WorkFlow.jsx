import { GrUserNew } from "react-icons/gr";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";

const steps = [
  {
    icon: <GrUserNew />,
    title: "Create an account",
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
      <div className="border-l-1 mx-24 border-zinc-700 w-1 h-4">
      
      </div>

      <div className="flex flex-col px-24 md:flex-row flex-wrap justify-center items-center">
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              className="w-full px-8 border-l-1 border-zinc-700 flex items-center justify-between shadow-lg p-4 relative"
            >
              <div>
                <div className="absolute top-4 -left-4 bg-gradient-to-br from-cyan-200 to-cyan-500 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full">
                  {index + 1}
                </div>
                {/* <p className="p-2 bg-white/5 flex items-center justify-center w-fit rounded-full text-3xl">
                {step.icon}
              </p> */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-[13px] text-zinc-600 dark:text-zinc-300">
                    {step.description}
                  </p>
                </div>
              </div>

              <div>
                <img
                  src="fs"
                  alt=" Here goes an images of the different sections of the website"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
