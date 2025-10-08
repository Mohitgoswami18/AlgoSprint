import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
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
  { name: "Legend", min: 2000, max: 3000, img: legend },
];

const RankLine = () => {
  return (
    <div className="w-full font-[Inter] flex flex-col items-center px-4 py-8 mt-24 transition-all duration-500 max-w-[900px] mx-auto">
      <h2 className="text-3xl sm:text-4xl mb-2 font-bold text-gray-800 dark:text-gray-100 text-center">
        Rise the Ranks, Climb the Ladder
      </h2>
      <p className="text-sm sm:text-md text-center text-gray-600 dark:text-gray-400 mb-8">
        A whole setup to pass the gaming vibe while practicing for competitive
        coding.
      </p>

      <div className="flex flex-wrap justify-between items-start w-full border-t border-gray-200 dark:border-zinc-900/50 pt-6 gap-6">
        {ranks.map((rank) => (
          <div key={rank.name} className="flex flex-col items-center">
            <img
              src={rank.img}
              alt={rank.name}
              className="w-16 h-16 sm:w-24 sm:h-24 object-contain mb-1"
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


      <div className="flex flex-col md:flex-row w-full mt-16 md:mt-32 items-start md:items-center gap-8">

        <div className="md:basis-1/2 w-full">
          <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 dark:text-gray-100">
            Earn Badges
          </h1>
          <div className="flex flex-wrap gap-4 sm:gap-6 p-4 sm:p-8 border-[0.5px] border-zinc-900 w-full mx-auto justify-center">
            <Badge variant="ghost">Newbie</Badge>
            <Badge variant="default">Gladiator</Badge>
            <Badge variant="destructive">SpeedDemon</Badge>
            <Badge variant="ghost">AlgoMaster</Badge>
            <Badge variant="ghost">Flash</Badge>
            <Badge variant="secondary">CodingSage</Badge>
          </div>
        </div>


        <div className="md:basis-1/2 w-full flex flex-col items-center">
          <h1 className="text-2xl text-center font-bold mb-4 text-gray-800 dark:text-gray-100">
            Climb Leaderboard
          </h1>
          <img
            src={leaderboard}
            alt="Leaderboard"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default RankLine;
