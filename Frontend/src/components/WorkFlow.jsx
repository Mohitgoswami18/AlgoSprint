import { GrUserNew } from "react-icons/gr";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";
import authDark from "../assets/images/authDark.png"
import whiteRoom from "../assets/images/whiteRoom.png"
import darkRoom from "../assets/images/darkRoom.png"
import authLight from "../assets/images/authLight.png"

const steps = [
  {
    icon: <GrUserNew />,
    title: "create a Account ",
    description: "Quickly create an account with an seamless authentication protected and secured by the clerk Authentication",
    color: "text-blue-500",
    imgs: [authDark, authLight],
  },
  {
    icon: <FaPeopleRoof />,
    title: "Create Room",
    description: "Quickly create a Personalised Room and genrate a random passkey ( ID ) to share with other to join the room and compete with you .",
    color: "text-green-500",
    imgs: [whiteRoom, darkRoom],
  },
  {
    icon: <MdOutlineSettingsSuggest />,
    title: "Customize Settings",
    description: "customize the settings - time, difficulty, opponent all according to you and chellenge anyone ",
    color: "text-purple-500",
    imgs: [authDark, authDark],
  },
  {
    icon: <FaShareAlt />,
    title: "Share Link",
    description: "Send this random genrated room id with other so that they can join thier room and compete with you in realtime battle",
    color: "text-yellow-500",
    imgs: [authDark, authDark],
  },
  {
    icon: <MdOutlineNotStarted />,
    title: "Game Begins",
    description: "Once both the user joined the room then a timer of 3 second will start and the battle begins ",
    color: "text-red-500",
    imgs: [authDark, authDark],
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
              className="w-[900px] border-l-1 px-4 py-8 flex items-center   relative"
            >
              <div className="flex px-8 w-full ">
                <div className="w-full">
                  <div className="absolute top-10 -left-4 bg-gradient-to-br from-cyan-200 to-cyan-500 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-[13px] pr-24 text-zinc-600 dark:text-zinc-300">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="w-fit flex items-end text-center">
                  <div className="relative w-fit flex">
                    <img
                      src={step.imgs[0]}
                      className=" rounded-md w-1/2 left-[50%] hover:z-44 hover:scale-105 -0 transition-all rotate-5 duration-100 mx-auto"
                      alt="Auth Feature"
                    />
                    <img
                      src={step.imgs[1]}
                      className=" rounded-md w-1/2 left-[10%] z-0 hover:z-99 transition-all hover:scale-105 duration-100 -rotate-12 mx-auto absolute"
                      alt="Auth Feature"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
