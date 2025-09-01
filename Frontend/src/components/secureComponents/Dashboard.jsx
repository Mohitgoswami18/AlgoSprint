import { Badge } from "@/components/ui/badge";
import { Line, LineChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MdOutlineEventRepeat } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import { GiBattleGear } from "react-icons/gi";
import { SiStylelint } from "react-icons/si";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  
import axios from "axios";

const Dashboard = () => {

  const params = useParams();
  const username = params.username;
  const [userDetails, setUserDetails] = useState({});
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  let feature = [];

  if(data) {

    feature = [
      {
        logo: <MdOutlineEventRepeat />,
        discription: "Win Streak",
        stats: userDetails.winStreak,
      },
      {
        logo: <GiBattleGear />,
        discription: "Total Battles",
        stats: userDetails.totalBattles,
      },
      {
        logo: <FaRankingStar />,
        discription: "Max Rank",
        stats: userDetails.maximumRatings,
      },
      {
        logo: <SiStylelint />,
        discription: "PlayStyle",
        stats: userDetails.playstyle,
      },
    ];
  }

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

  useEffect(() => {
    const handleFetchRequest = async () => {
      await axios
      .get(`https://algosprint-vxi4.onrender.com/api/v1/${username}/dashboard`)
      .then((res) => {
        setUserDetails(res.data);
        setData(true);
      })
      .catch((err) => {
        console.log("An error occurred", err);
        setErr(true);
      });
    }

    handleFetchRequest();
  }, [username]);

  return (
    <div>
      {err ? (
        <p className="text-black dark:text-white text-center mt-[30%] font-bold text-3xl">
          Something went wrong
        </p>
      ) : (
        <div className="bg-slate-50 dark:bg-black/80 transition-all duration-500 font-[Inter] px-16 pt-4 text-black dark:text-white min-h-screen">
          {data ? (
            <div className="flex items-center gap-10">
              <div className="bg-slate-50 transition-all duration-500 dark:bg-[#111] rounded-xl basis-[80%] shadow-md">
                <div className="p-4 shadow-lg transition-all duration-500 flex justify-between">
                  <div className="transition-all duration-500">
                    <h1 className="text-4xl p-1 font-bold">
                      Welcome Back, {userDetails.username}
                    </h1>
                    <p className="text-sm px-3 text-[#4a5568] dark:text-[#A0AEC0]">
                      Ready for some new challenges today
                    </p>
                  </div>
                  <div className="pt-1 flex flex-col items-end gap-2">
                    <div className="backdrop-blur-2xl bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg shadow-xs text-white px-2">
                      {userDetails.ranking}{" "}
                      {/* FIX THIS BASED ON THE RANK LATER */}
                    </div>
                    <div className="text-sm font-semibold">
                      Level {userDetails.level}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-1">
                  <div className="text-[11px] font-semibold">XP Progress</div>
                  <div className="text-[11px] text-sm font-semibold">
                    {userDetails.xp}/100 XP
                  </div>
                </div>
                <div className="w-19/20 mx-auto pb-3">
                  <Progress value={userDetails.xp} />
                </div>
              </div>

              <div className="rounded-full transition-all duration-500 w-fit p-1 hover:scale-105 h-4/5 flex items-center justify-center bg-gray-200 dark:bg-[#111]">
                <img
                  src={userDetails.profileImage}
                  alt=""
                  className="w-full rounded-full"
                />
              </div>
            </div>
          ) : (
            <Skeleton className="h-36 w-full rounded-xl mb-6" />
          )}

          <div className="flex items-center gap-2">
            <div className="Area-chart max-w-md shadow-md mb-6 mt-6">
              {data ? (
                <Card className="bg-white ring-[0.5px] dark:ring-white/20 dark:bg-white/4 shadow-md">
                  <CardHeader>
                    <CardTitle>Ranking Chart</CardTitle>
                    <CardDescription>
                      Total Battles Fought: {userDetails.totalBattles}
                    </CardDescription>
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
              ) : (
                <Skeleton className="h-48 w-[350px] rounded-xl mb-6" />
              )}
            </div>

            <div className="flex gap-2 flex-col w-4/9 items-center justify-center">
              {data ? (
                <div className="bg-white ring-[0.5px] shadow-md dark:ring-white/20 dark:bg-white/4 w-full py-2 text-center p-2 text-md font-bold rounded-md">
                  Total Win
                  <p className="p-4 text-lg text-green-600 font-bold">
                    {userDetails.totalWin}
                  </p>
                </div>
              ) : (
                <Skeleton className="h-16 w-full rounded-md mb-6" />
              )}
              {data ? (
                <div className="bg-white ring-[0.5px] shadow-md dark:ring-white/20 dark:bg-white/4 w-full text-center py-2 text-sm font-bold rounded-md">
                  Win ratio
                  <p className="p-4 text-orange-500 text-lg">
                    {userDetails.winRatio}
                  </p>
                </div>
              ) : (
                <Skeleton className="h-16 w-full rounded-md mb-6" />
              )}
            </div>

            {
              data ? (
                <div className="bg-white shadow-md ring-[0.5px] dark:ring-white/20 dark:bg-white/4 p-4 rounded-md">
              <h1 className="text-center font-bold text-md">Badges Earned</h1>
              <p className="gap-2 p-4 py-9 flex flex-wrap items-center justify-center">
                <Badge variant="outline">Newbie</Badge>
                <Badge variant="default">Gladiator</Badge>
                <Badge variant="destructive">SpeedDemon</Badge>
                <Badge variant="ghost">AlgoMaster</Badge>
                <Badge variant="ghost">Flash</Badge>
                <Badge variant="secondary">CodingSage</Badge>
                <button className="cursor-pointer bg-gray-300 dark:bg-white/10 px-2 py-1 rounded-lg">
                  see all
                </button>
              </p>
            </div>
              ) : (
                <Skeleton className="h-46 w-full rounded-md mb-6" />
              )
            }
          </div>
          <div className="flex justify-between gap-3 items-center">
            {feature.map((elem, idx) => (
              <div
                key={idx}
                className="bg-white ring-[0.5px] dark:ring-white/20 dark:bg-white/4 backdrop-blur-2xl shadow-md p-2 basis-[48%] mb-2 rounded-md"
              >
                <div className="flex items-center justify-around">
                  <div>
                    <h1 className="font-bold text-2xl mx-2 text-gray-900 dark:text-[#F7FAFC]">
                      {elem.stats}
                    </h1>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <p className="text-5xl font-bold">{elem.logo}</p>
                    <p className="text-sm text-gray-600 dark:text-[#A0AEC0] m-2">
                      {elem.discription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {
            data ? (
              <div className="my-4 rounded-md bg-white/4">
            <Table>
              <TableCaption>Recent Battles</TableCaption>
              <TableHeader className="font-[Inter]">
                <TableRow>
                  <TableHead className="w-[100px] text-md p-4">
                    Match Type
                  </TableHead>
                  <TableHead className="p-4">Result</TableHead>
                  <TableHead className="p-4">opponent</TableHead>
                  <TableHead className="text-right p-4">xp Gained</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium p-4">bullet</TableCell>
                  <TableCell className="p-4">Win</TableCell>
                  <TableCell className="p-4">user2</TableCell>
                  <TableCell className="p-4 text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium">bullet</TableCell>
                  <TableCell className="p-4">Win</TableCell>
                  <TableCell className="p-4">user2</TableCell>
                  <TableCell className="p-4 text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-4 font-medium">bullet</TableCell>
                  <TableCell className="p-4">Win</TableCell>
                  <TableCell className="p-4">user2</TableCell>
                  <TableCell className="p-4 text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">bullet</TableCell>
                  <TableCell>Win</TableCell>
                  <TableCell>user2</TableCell>
                  <TableCell className="text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">bullet</TableCell>
                  <TableCell>Win</TableCell>
                  <TableCell>user2</TableCell>
                  <TableCell className="text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">bullet</TableCell>
                  <TableCell>Win</TableCell>
                  <TableCell>user2</TableCell>
                  <TableCell className="text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">bullet</TableCell>
                  <TableCell>Win</TableCell>
                  <TableCell>user2</TableCell>
                  <TableCell className="text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">bullet</TableCell>
                  <TableCell>Win</TableCell>
                  <TableCell>user2</TableCell>
                  <TableCell className="text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">bullet</TableCell>
                  <TableCell>Win</TableCell>
                  <TableCell>user2</TableCell>
                  <TableCell className="text-right">*15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">bullet</TableCell>
                  <TableCell>Win</TableCell>
                  <TableCell>user2</TableCell>
                  <TableCell className="text-right">*15</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
            ) : (
              <Skeleton className="h-96 w-full"/>
            )
          }
        </div>
      )}
    </div>
  );
};

export default Dashboard;
