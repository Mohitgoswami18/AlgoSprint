import { GiLaurelsTrophy } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import pic1 from "../../assets/images/pic1.jpg";
import pic2 from "../../assets/images/pic2.jpeg";
import pic3 from "../../assets/images/pic3.jpeg";

const Leaderboard = () => {

  const Leaderboardtop10 = [
    {
      rank: "#4",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
    {
      rank: "#5",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
    {
      rank: "#6",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
    {
      rank: "#7",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
    {
      rank: "#8",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
    {
      rank: "#9",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
    {
      rank: "#10",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },

  ];

  const Leaderboardtop3 = [
    {
      rank: "1",
      name: "User1",
      title: "Algo Master",
      img: "",
      points: "1,233",
      BattleWon: "45",
    },
    {
      rank: "2",
      name: "User2",
      title: "Algo Queen",
      img: "",
      points: "1,123",
      BattleWon: "35",
    },
    {
      rank: "3",
      name: "User3",
      title: "Algo assauler",
      img: "",
      points: "1,000",
      BattleWon: "39",
    },
  ];

  const LeaderboardStats = [
    {
      number: "1,243",
      name: "Active Coders"
    },
    {
      number: "4,578",
      name: "Problem Solved"
    },
    {
      number: "890",
      name: "Battles Faughts"
    }
  ]

  return (
    <div className="dark:bg-black transition-all duration-500 bg-slate-50 text-black dark:text-white font-[Inter] p-5">
      <div className="bg-white/10 ring-2 ring-slate-200 backdrop-blur-2xl p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center ">
          <div className="dark:bg-[#222]  transition-all duration-500 bg-slate-50 text-cyan-500 dark:text-white px-2 py-3 text-4xl rounded-xl">
            <GiLaurelsTrophy />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Global Leaderboard
            </h1>
            <p className="text-[#A0AEC0] text-[14px] tracking-tight">
              Top performers at AlgoSprint
            </p>
          </div>
        </div>

        <div className="flex items-center justify-around pt-6 gap-3">
          {LeaderboardStats.map((elem, idx) => (
            <div
              key={idx}
              className=" dark:bg-[#333] ring-[0.5px] dark:ring-white/20 transition-all  flex flex-col items-center justify-center duration-500 bg-slate-50 text-black dark:text-whiteackdrop-blur-2xl p-5 basis-[33%] rounded-md shadow-xl"
            >
              <h1 className=" text-green-500 font-bold">{elem.number}</h1>
              <h2 className="font-bold text-black dark:text-white">
                {elem.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-around pt-6">
        {/*  #3rd Rank holder */}

        <div className="bg-white/10 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl px-5 basis-[30%] rounded-md shadow-xl">
          <div className="flex items-center flex-col p-2 justify-center">
            <h1 className="p-1">#3</h1>
            <p className="py-2 rounded-full text-4xl">
              <img src={pic3} alt="" className="w-24 h-24 rounded-full p-1" />
            </p>
            <p className="text-black dark:text-white font-bold">John</p>
            <div className="rounded-full bg-cyan-300 font-semibold text-sm px-2 py-1">
              AlgoMaster
            </div>
          </div>

          <div className="flex items-center justify-between p-1 pt-6">
            <p>Points </p>
            <p className="text-green-500 text-md ">234</p>
          </div>
          <div className="flex items-center justify-between p-1">
            <p>Battle Won </p>
            <p className="text-green-500">22</p>
          </div>
          <div className="flex items-center justify-between p-1">
            <p>Ratings </p>
            <p className="text-green-500">234</p>
          </div>
        </div>

        {/* #1 Rank Holder */}
        <div className="bg-white/10 py-8 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl p-5 basis-[30%] rounded-md shadow-xl">
          <div className="flex items-center flex-col p-2 justify-center">
            <h1 className="p-1">#1</h1>
            <p className="py-2 rounded-full text-4xl">
              <img src={pic1} alt="" className="w-24 h-24 rounded-full p-1" />
            </p>
            <p className="text-black dark:text-white font-bold">Sun Flower</p>
            <div className="rounded-full bg-cyan-300 font-semibold text-sm px-6 py-1">
              Flash
            </div>
          </div>

          <div className="flex items-center justify-between p-1 pt-6">
            <p>Points </p>
            <p className="text-green-500">299</p>
          </div>
          <div className="flex items-center justify-between p-1">
            <p>Battle Won </p>
            <p className="text-green-500">34</p>
          </div>
          <div className="flex items-center justify-between p-1">
            <p>Ratings: </p>
            <p className="text-green-500">345</p>
          </div>
        </div>

        {/* #2nd Rank Holder */}
        <div className="bg-white/10 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl px-5 basis-[30%] rounded-md shadow-xl">
          <div className="flex items-center flex-col p-2 justify-center">
            <h1 className="p-1">#2</h1>
            <p className="py-2 rounded-full text-4xl">
              <img src={pic2} alt="" className="w-24 h-24 rounded-full p-1" />
            </p>
            <p className="text-black dark:text-white font-bold">priya</p>
            <div className="rounded-full bg-cyan-300 font-semibold text-sm px-2 py-1">
              CodingSage
            </div>
          </div>

          <div className="flex items-center justify-between p-1 pt-6">
            <p>Points </p>
            <p className="text-green-500">236</p>
          </div>
          <div className="flex items-center justify-between p-1">
            <p>Battle Won </p>
            <p className="text-green-500">24</p>
          </div>
          <div className="flex items-center justify-between p-1">
            <p>Ratings </p>
            <p className="text-green-500">245</p>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-2xl m-3 rounded-xl bg-white/10 p-4">
        <h1 className="py-6">Rankings</h1>
        <div>
          {Leaderboardtop10.map((elem, idx) => (
            <div key={idx} className="bg-white/10 rounded-md p-2 pr-5 m-1 flex">
              <div className="flex w-full">
                <h1 className="p-2">{elem.rank}</h1>
                <div className="bg-white w-10 mx-4 rounded-full ">
                  <img src={elem.img} alt="profilepic" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="text-white dark:text-white font-semibold text-md p-1 ">
                      {elem.name}
                    </div>
                    <h1 className="text-[10px] dark:bg-white/4 bg-black/4 rounded-md px-1">
                      {elem.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 dark:text-gray-300">
                    <div className="text-sm px-2">Levl.{elem.level}</div>
                    <div className="text-sm">{elem.points} Pts</div>
                  </div>
                </div>
              </div>

              <div className="text-white text-lg font-bold my-auto ">
                {elem.BattleWon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard
