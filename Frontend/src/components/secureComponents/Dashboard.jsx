import { Badge } from "@/components/ui/badge";
import { Line, LineChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FaRegUserCircle } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const feature = [
    {
      logo: <i className="fa-brands text-5xl mb-4 fa-battle-net "></i>,
      discription: "Current Streak",
      stats: "69",
    },
    {
      logo: <i className="fa-brands text-5xl mb-4 fa-battle-net"></i>,
      discription: "Total Battles",
      stats: "69",
    },
    {
      logo: <i className="fa-brands text-5xl mb-4 fa-battle-net"></i>,
      discription: "Win Ratio",
      stats: "69",
    },
    {
      logo: <i className="fa-brands text-5xl mb-4 fa-battle-net"></i>,
      discription: "Battle Wins",
      stats: "69",
    },
  ];

  const chartData = [
    { amateur: 186 },
    { amateur: 305 },
    { amateur: 237 },
    { amateur: 732 },
    { amateur: 109 },
    { amateur: 314 },
    { amateur: 405 },
    { amateur: 637 },
    { amateur: 83 },
    { amateur: 609 },
    { amateur: 14 },
  ];

  const chartConfig = {
    desktop: {
      label: "amateur",
      color: "cyan",
    },
  };

  return (
    <div className="bg-slate-200 dark:bg-black/80 transition-all duration-500 font-[Inter] px-16 pt-4 text-black dark:text-white min-h-screen">
      <div className="flex items-center gap-10">
        <div className="bg-white dark:bg-[#111] rounded-xl basis-[80%] shadow-md">
          <div className="p-4 shadow-lg transition-all duration-500 flex justify-between">
            <div className="transition-all duration-500">
              <h1 className="text-4xl p-1 font-bold">Welcome Back, Name</h1>
              <p className="text-sm px-3 text-[#4a5568] dark:text-[#A0AEC0]">
                Ready for some new challenges today
              </p>
            </div>
            <div className="pt-1 flex flex-col items-end gap-2">
              <div className="backdrop-blur-2xl bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg shadow-xs text-white px-2">
                Amateur
              </div>
              <div className="text-sm font-semibold">Level 6</div>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-1">
            <div className="text-[11px] font-semibold">XP Progress</div>
            <div className="text-[11px] text-sm font-semibold">10/100 XP</div>
          </div>
          <div className="w-19/20 mx-auto pb-3">
            <Progress value={10} />
          </div>
        </div>

        <div className="rounded-full w-fit p-4 h-4/5 flex items-center justify-center bg-gray-200 dark:bg-[#111]">
          <FaRegUserCircle className="text-9xl" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="Area-chart max-w-md shadow-md mb-6 mt-6">
          <Card className="bg-white dark:bg-white/4 shadow-md">
            <CardHeader>
              <CardTitle>Ranking Chart</CardTitle>
              <CardDescription>Total Battles Fought: 69</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  className="text-black dark:text-white"
                  data={chartData}
                  margin={{ left: 12, right: 12 }}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="amateur"
                    type="linear"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 flex-col w-4/9 items-center justify-center">
          <div className="bg-white shadow-md dark:bg-white/4 w-full py-2 text-center p-2 text-md font-bold rounded-md">
            Total Win
            <p className="p-4 text-lg text-green-600 font-bold">102</p>
          </div>
          <div className="bg-white shadow-md dark:bg-white/4 w-full text-center py-2 text-sm font-bold rounded-md">
            Win ratio
            <p className="p-4 text-orange-500 text-lg">0.7</p>
          </div>
        </div>

        <div className="bg-white shadow-md dark:bg-white/4 p-4 rounded-md">
          <h1 className="text-center font-bold text-md">Badges Earned</h1>
          <p className="gap-2 p-4 py-9 flex flex-wrap items-center justify-center">
            <Badge variant="outline">100 Streak</Badge>
            <Badge variant="default">battleMaster</Badge>
            <Badge variant="destructive">battleMaster</Badge>
            <Badge variant="ghost">battleMaster</Badge>
            <Badge variant="secondary">Undefeatable</Badge>
            <button className="cursor-pointer bg-gray-300 dark:bg-white/10 px-2 py-1 rounded-lg">
              see all
            </button>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        {feature.map((elem, idx) => (
          <div
            key={idx}
            className="bg-gray-100 dark:bg-white/10 backdrop-blur-2xl shadow p-4 basis-[48%] mb-2 rounded-md"
          >
            <div className="flex flex-row-reverse justify-between">
              <div>
                <p>{elem.logo}</p>
              </div>
              <div>
                <h1 className="font-bold text-lg mx-2 text-gray-900 dark:text-[#F7FAFC]">
                  {elem.stats}
                </h1>
                <p className="text-sm text-gray-600 dark:text-[#A0AEC0] m-2">
                  {elem.discription}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
