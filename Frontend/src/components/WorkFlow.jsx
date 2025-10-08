import { GrUserNew } from "react-icons/gr";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdOutlineSettingsSuggest, MdOutlineNotStarted } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import whiteRoom from "../assets/images/whiteRoom.png";
import darkRoom from "../assets/images/darkRoom.png";
import authLight from "../assets/images/authLight.png";
import authDark from "../assets/images/authDark.png";
import settingLight from "../assets/images/settingLight.png";
import settingDark from "../assets/images/settingDark.png";
import shareLight from "../assets/images/shareLight.png";
import shareDark from "../assets/images/shareDark.png";
import codePlaygroundDark from "../assets/images/codePlaygroundDark.png";
import codePlaygroundLight from "../assets/images/codePlaygroundLight.png";

const steps = [
  {
    icon: <GrUserNew />,
    title: "Create an Account",
    description:
      "Quickly create an account with seamless authentication protected by Clerk.",
    imgs: [authDark, authLight],
  },
  {
    icon: <FaPeopleRoof />,
    title: "Create Room",
    description:
      "Create a personalized room and generate a random passkey (ID) to share with others to join and compete.",
    imgs: [whiteRoom, darkRoom],
  },
  {
    icon: <MdOutlineSettingsSuggest />,
    title: "Customize Settings",
    description:
      "Customize time, difficulty, opponent, and other settings according to your preferences.",
    imgs: [settingLight, settingDark],
  },
  {
    icon: <FaShareAlt />,
    title: "Share Room ID",
    description:
      "Send the room ID to others so they can join and compete with you in real-time.",
    imgs: [shareDark, shareLight],
  },
  {
    icon: <MdOutlineNotStarted />,
    title: "Game Begins",
    description: "Once everyone in the lobby is ready, the contest begins.",
    imgs: [codePlaygroundDark, codePlaygroundLight],
  },
];

const HowItWorks = () => {
  return (
    <section className="font-[Inter] transition-all duration-500 ease-in-out bg-slate-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-black dark:text-white">
        How to Start Your Journey
      </h2>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-start gap-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full md:w-[45%] lg:w-[40%] border-l-2 border-zinc-300 dark:border-zinc-700 relative px-4 md:px-6 py-6"
          >
            {/* Step number */}
            <div className="absolute -left-3 top-4 bg-gradient-to-br from-cyan-200 to-cyan-500 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full">
              {index + 1}
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {step.description}
              </p>
            </div>

            {/* Images */}
            <div className="flex flex-1 items-center justify-center mt-4 md:mt-0 md:ml-4 relative">
              <img
                src={step.imgs[0]}
                alt={step.title}
                className="rounded-md w-32 sm:w-36 md:w-40 hover:scale-105 transition-transform duration-200 z-20 relative"
              />
              <img
                src={step.imgs[1]}
                alt={step.title}
                className="rounded-md w-32 sm:w-36 md:w-40 absolute top-0 left-6 -z-10 rotate-3 hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
