import { FaLaptopCode } from "react-icons/fa";
import { GiCrosshair } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";
import { FcCollaboration } from "react-icons/fc";

const Features = () => {
  const feature = [
    {
      divStyle: `bg-white/70 dark:bg-white/10 
                backdrop-blur-md shadow-md 
                hover:shadow-lg hover:scale-[1.01]`,
      logo: <FaLaptopCode />,
      Logostyle: "dark:text-zinc-30 gray-300",
      title: "Live Coding Battles",
      description:
        "Engage in real-time coding duels with friends to test your speed and logic.",
    },
    {
      divStyle: `bg-white/70 dark:bg-white/10 
                backdrop-blur-md shadow-md 
                hover:shadow-lg hover:scale-[1.01]`,
      logo: <GiCrosshair></GiCrosshair>,
      title: "MCQ Arena",
      logoStyle: "text-red-600",
      description:
        "Sharpen your concepts through rapid-fire MCQs tailored for competitive programming and interviews.",
    },
    {
      divStyle: `bg-white/70 dark:bg-white/10 
                backdrop-blur-md shadow-md 
                hover:shadow-lg hover:scale-[1.01]`,
      logo: <MdLeaderboard></MdLeaderboard>,
      title: "Global Leaderboard",
      logoStyle: "text-yellow-300",
      description:
        "Track your progress, earn points, and climb the ranks among a community of coders across the globe.",
    },
    {
      divStyle: `bg-white/70 dark:bg-white/10 
                backdrop-blur-md shadow-md 
                hover:shadow-lg hover:scale-[1.01]`,
      logo: <FcCollaboration></FcCollaboration>,
      title: "Collaborative Rooms",
      description:
        "Join rooms to brainstorm, code together, and grow through peer learning and mentorship.",
    },
  ];

  return (
    <div className="font-[Inter] pt-22 bg-slate-50 dark:bg-black transition-colors duration-500">
      <h1 className="text-center font-bold text-4xl text-[#1a202c] dark:text-[#F7FAFC]">
        Master your Programming Skills
      </h1>
      <p className="text-center text-sm pt-4 font-semibold text-[#4A5568] dark:text-[#A0AEC0]">
        Everything you need to become a pro at programming
      </p>

      <div className="flex mt-16 flex-wrap max-w-[1080px] justify-between mx-auto">
        {feature.map((elem, idx) => (
          <div
            key={idx}
            className={`bg-gray-100 dark:bg-white/10 dark:backdrop-blur-2xl dark:shadow-lg shadow-md p-4 pb-0 basis-[46%] m-3 rounded-md transition duration-300 ${elem.divStyle}`}
          >
            <div className="flex flex-col">
              <p className={`my-3 m-2 text-4xl  ${elem.logoStyle}`}>
                {elem.logo}
              </p>
              <h1 className="font-bold pt-2 text-lg mx-2 text-[#1a202c] dark:text-[#F7FAFC]">
                {elem.title}
              </h1>
            </div>
            <p className="text-sm mx-2 pb-2 text-[#4A5568] dark:text-[#A0AEC0]">
              {elem.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
