
import gold from "../assets/images/gold.png"
import silver from "../assets/images/silver.png"
import bronze from "../assets/images/bronze.png";
import ace from "../assets/images/ace.png";
import platinum from "../assets/images/platinum.png";
import daimond from "../assets/images/daimond.png";
import legend from "../assets/images/legend.png";
import leaderboard from "../assets/images/leaderboard.png";
import { Badge } from "@/components/ui/badge";

const ranks = [
  { name: "Bronze", min: 0, max: 100, img: bronze },
  { name: "Silver", min: 100, max: 300, img: silver },
  { name: "Gold", min: 300, max: 500, img: gold },
  { name: "Platinum", min: 500, max: 1000, img: platinum },
  { name: "Diamond", min: 1000, max: 1500, img: daimond },
  { name: "Ace", min: 1500, max: 2000, img: ace },
  { name: "Legend", min: 2000, max:2000, img: legend },
];

const RankLine = () => {
  return (
    <div>
      <div className="w-full font-[Inter] mt-24 flex max-w-[900px] mx-auto transition-all duration-500 flex-col items-center px-4 py-8">
        <h2 className="text-4xl mb-1 font-bold text-gray-800 dark:text-gray-100">
          Rise the Ranks Climb the Ladder
        </h2>
        <p className="text-md text-[#4A5568] mb-6 dark:text-[#A0AEC0]">
          A Whole setup to pass the gaming vibe while practicing for competitive
          coding.
        </p>
        <div className="relative w-full mt-14 h-[0.5px] b bg-gray-200 dark:bg-zinc-900/50 rounded-full">
          {ranks.map((rank, idx) => (
            <div
              key={rank.name}
              className="absolute flex w-fit flex-col justify-center p-1 items-center rounded-md ring-[0.5px] dark:ring-zinc-800"
              style={{
                left: `${(idx / (ranks.length - 1)) * 90}%`,
                top: "-2.5rem",
              }}
            >
              <img
                src={rank.img}
                alt={rank.name}
                className="w-24 h-24 object-contain mb-1"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {rank.name}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {rank.min} - {rank.max}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full mt-32 items-center max-w-[900px] mx-auto">
        <div className="basis-[48%]">
          <h1 className="text-2xl text-center font-bold mb-2 text-gray-800 dark:text-gray-100">
            Earn Badges
          </h1>
          <div className="flex flex-wrap gap-10 p-12 border-[0.5px] border-zinc-900 w-full mx-auto">
            <Badge variant="ghost">Newbie</Badge>
            <Badge variant="default">Gladiator</Badge>
            <Badge variant="destructive">SpeedDemon</Badge>
            <Badge variant="ghost">AlgoMaster</Badge>
            <Badge variant="ghost">Flash</Badge>
            <Badge variant="secondary">CodingSage</Badge>
          </div>
        </div>
        <div className="basis-[48%] ml-6">
          <h1 className="text-2xl text-center font-bold mb-2  text-gray-800 dark:text-gray-100">
            Climb Leaderboard
          </h1>
          <div>
            <img src={leaderboard} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankLine;
