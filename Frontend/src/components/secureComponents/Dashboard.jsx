import React from 'react'
import { Progress } from "@/components/ui/progress";

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

  return (
    <div className="bg-[#0e1d2e] font-[Inter] px-8 py-10">
      <div className="bg-[#224164] rounded-xl">
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

      <div className="flex mt-22 flex-wrap max-w-[1080px] justify-between mx-auto ">
        {feature.map((elem, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-2xl shadow-10 p-4 basis-[46%] m-3 rounded-md"
          >
            <div className="flex flex-col">
              <p> {elem.logo} </p>
              <h1 className="font-bold text-lg mx-2 text-[#F7FAFC]">
                {elem.title}
              </h1>
            </div>
            <p className="text-sm text-[#A0AEC0] m-2">{elem.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard
