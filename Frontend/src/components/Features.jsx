import { FaLaptopCode } from "react-icons/fa";
import { GiCrosshair } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";
import { FcCollaboration } from "react-icons/fc";

const Features = () => {
  const feature = [
    {
      divStyle: `bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02]`,
      logo: <FaLaptopCode />,
      logoStyle: "text-blue-500 dark:text-cyan-400",
      title: "Live Coding Battles",
      description:
        "Engage in real-time coding duels with friends to test your speed and logic.",
    },
    {
      divStyle: `bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02]`,
      logo: <GiCrosshair />,
      logoStyle: "text-red-600 dark:text-red-400",
      title: "MCQ Arena",
      description:
        "Sharpen your concepts through rapid-fire MCQs tailored for competitive programming and interviews.",
    },
    {
      divStyle: `bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02]`,
      logo: <MdLeaderboard />,
      logoStyle: "text-yellow-400 dark:text-yellow-300",
      title: "Global Leaderboard",
      description:
        "Track your progress, earn points, and climb the ranks among a community of coders across the globe.",
    },
    {
      divStyle: `bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-[1.02]`,
      logo: <FcCollaboration />,
      logoStyle: "text-green-500",
      title: "Collaborative Rooms",
      description:
        "Join rooms to brainstorm, code together, and grow through peer learning and mentorship.",
    },
  ];

  return (
    <div className="font-[Inter] pt-12 bg-slate-50 dark:bg-black transition-colors duration-500 px-4 sm:px-6 lg:px-20">
      {/* Heading */}
      <h1 className="text-center font-bold text-3xl sm:text-4xl text-[#1a202c] dark:text-[#F7FAFC]">
        Master your Programming Skills
      </h1>
      <p className="text-center text-sm sm:text-base pt-2 sm:pt-4 font-semibold text-[#4A5568] dark:text-[#A0AEC0]">
        Everything you need to become a pro at programming
      </p>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {feature.map((elem, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-md transition duration-300 ${elem.divStyle}`}
          >
            <div className="flex flex-col items-start sm:items-center">
              <div className={`text-4xl mb-2 ${elem.logoStyle}`}>
                {elem.logo}
              </div>
              <h2 className="font-bold text-lg sm:text-xl text-[#1a202c] dark:text-[#F7FAFC] mb-2 text-left sm:text-center">
                {elem.title}
              </h2>
            </div>
            <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0] text-left sm:text-center">
              {elem.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
