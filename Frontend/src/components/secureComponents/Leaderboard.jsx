import React from 'react'

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
      rank: "#4",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
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
      rank: "#4",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
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
      rank: "#4",
      img: "",
      name: "User1",
      title: "Algo Master",
      points: "1,233",
      level: "2",
      BattleWon: "45",
    },
    {
      rank: "#4",
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
    <div className="bg-[#0e1d2e] font-[Inter] p-5">
      <div className="bg-white/10 backdrop-blur-2xl p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center">
          <div className="bg-white/10 backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
            👑
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#F7FAFC]">
              Global Leaderboard
            </h1>
            <p className="text-[#A0AEC0] text-[12px] tracking-tight">
              Top performers at AlgoSprint
            </p>
          </div>
        </div>

        <div className="flex items-center justify-around pt-6 gap-3">
          {LeaderboardStats.map((elem, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-2xl p-5 basis-[33%] rounded-md shadow-xl"
            >
              <h1>{elem.number}</h1>
              <h2>{elem.name}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-around pt-6">
        {Leaderboardtop3.map((elem, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-2xl p-5 basis-[30%] rounded-md shadow-xl"
          >
            <div className="flex items-center flex-col p-2 justify-center">
              <h1 className="p-1">{elem.rank}</h1>
              <img
                className="w-10 p-12 rounded-full"
                src={elem.img}
                alt="User1"
              />
              <div className="p-1">{elem.title}</div>
            </div>

            <div className="flex items-center justify-between p-1 pt-4">
              <p>Points: </p>
              <p>{elem.points}</p>
            </div>
            <div className="flex items-center justify-between p-1">
              <p>Battle Won: </p>
              <p>{elem.BattleWon}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-2xl m-3 rounded-xl bg-white/10 p-4">
        <h1 className="py-6">Rankings</h1>
        <div>
          {Leaderboardtop10.map((elem, idx) => (
            <div key={idx} className="bg-white/10 rounded-md p-2 pr-5 m-1 flex">
              <div className='flex w-full'>
                <h1 className="p-2">{elem.rank}</h1>
                <div className="bg-white w-10 mx-4 rounded-full ">
                  <img src={elem.img} alt="profilepic" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="text-white font-bold text-lg">
                      {elem.name}
                    </div>
                    <h1 className="text-[10px] bg-white rounded-md px-1">
                      {elem.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div>Levl.{elem.level}</div>
                    <div>{elem.points} Pts</div>
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
