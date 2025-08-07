import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, XAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import logo from"../../assets/images/logo.png"
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
      discription: "current Streak",
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
    { month: "January", desktop: 186},
    { month: "February", desktop: 305,  },
    { month: "March", desktop: 237,  },
    { month: "April", desktop: 73, },
    { month: "May", desktop: 209,},
    { month: "June", desktop: 214 },
  ];


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  }
}

  return (
    <div className="bg-[#0e1d2e] font-[Inter] px-8 py-10">
      <div className="flex items-center ">
        <div className="bg-[#224164] rounded-xl basis-[80%]">
          <div className="p-4 shadow-lg flex  justify-between ">
            <div>
              <h1 className="text-4xl p-3 font-bold text-[#F7FAFC]">
                Welcome Back, Dummy 🐦‍🔥
              </h1>
              <p className="text-sm px-3 text-[#A0AEC0]">
                ready for some new challenges today
              </p>
            </div>

            <div className="pt-1 flex flex-col items-end gap-2">
              <div className="backdrop-blur-2xl bg-white/10 rounded-md text-white px-2">
                Amateur
              </div>
              <div className="text-white text-sm font-semibold">Level 1</div>
            </div>
          </div>
          <div className=" flex items-center justify-between px-3 py-2">
            <div className="text-white text-sm font-semibold px-4">
              Xp Progress
            </div>
            <div className="text-white text-sm font-semibold">33/100 XP</div>
          </div>
          <div className="w-19/20 mx-auto pb-3">
            <Progress value={33} />
          </div>
        </div>
        <div className="w-1/5 rounded-full bg-white basis-[20%]">
          <img src={logo} alt="" className="w-full rounded-full" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="Area-chart max-w-md basis-[70%] m-4">
          <Card>
            <CardHeader>
              <CardTitle>Ranking</CardTitle>
              <CardDescription>Ranking status per battle</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="bg-red-900 p-4 rounded-md">
          <h1 className="text-white font-bold text-md">Badges Earned</h1>
          <p className="w-full p-4 flex flex-wrap items-center justify-center basis-[30%]">
            Badges Show Honge
            <Badge variant="outline">
              100 Streak
            </Badge>
            <Badge variant="default">
              battleMaster
            </Badge>
            <Badge variant="destructive">
              IQmaster
            </Badge>
            <Badge variant="secondary">
              Undefeatable
            </Badge>
          </p>
        </div>
      </div>

      <div className="flex mt-22 flex-wrap max-w-[1080px] justify-between mx-auto ">
        {feature.map((elem, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-2xl shadow-10 p-4 basis-[46%] m-3 rounded-md"
          >
            <div className="flex flex-row-reverse justify-between">
              <div>
                <p> {elem.logo} </p>
              </div>
              <div>
                <h1 className="font-bold text-lg mx-2 text-[#F7FAFC]">
                  {elem.stats}
                </h1>
                <p className="text-sm text-[#A0AEC0] m-2">{elem.discription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard
