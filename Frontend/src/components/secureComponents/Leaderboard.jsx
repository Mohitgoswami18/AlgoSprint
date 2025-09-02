// import { GiLaurelsTrophy } from "react-icons/gi";
// import pic1 from "../../assets/images/pic1.jpg";
// import pic2 from "../../assets/images/pic2.jpeg";
// import pic3 from "../../assets/images/pic3.jpeg";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Skeleton } from "@/components/ui/skeleton";

// const Leaderboard = () => {
//   const params = useParams();
//   const [data, setData] = useState(false);
//   const [err, setErr] = useState(false);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   let leaderboardTop10 = [];
//   let leaderboardTop3 = [];
//   let leaderboardStats = [];

//   console.log(leaderboardData);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://algosprint-vxi4.onrender.com/api/v1/user/leaderboard`
//         );
//         setData(true);
//         setLeaderboardData(response.data);
//         setErr(false); // ✅ Reset error state on success
//       } catch (err) {
//         console.log("An error occured", err);
//         setLeaderboardData([]);
//         setErr(true);
//         setData(false); // ✅ Set data to false on error
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ Added null check for leaderboardData.top10
//   if (data && leaderboardData && leaderboardData.top10) {
//     leaderboardTop10 = [
//       {
//         rank: "#4",
//         name: leaderboardData?.top10[3]?.username || "",
//         title: leaderboardData?.top10[3]?.title || "",
//         img: leaderboardData?.top10[3]?.profilePicture || "",
//         points: leaderboardData?.top10[3]?.currentRating || 0,
//         BattleWon: leaderboardData?.top10[3]?.totalWins || 0,
//         level: leaderboardData?.top10[3]?.level || 0,
//       },
//       {
//         rank: "#5",
//         img: leaderboardData.top10[4]?.profilePicture || "",
//         name: leaderboardData.top10[4]?.username || "",
//         title: leaderboardData.top10[4]?.title || "",
//         points: leaderboardData.top10[4]?.currentRating || 0,
//         level: leaderboardData.top10[4]?.level || 0,
//         BattleWon: leaderboardData.top10[4]?.totalWins || 0,
//       },
//       {
//         rank: "#6",
//         img: leaderboardData.top10[5]?.profilePicture || "",
//         name: leaderboardData.top10[5]?.username || "",
//         title: leaderboardData.top10[5]?.title || "",
//         points: leaderboardData.top10[5]?.currentRating || 0,
//         level: leaderboardData.top10[5]?.level || 0,
//         BattleWon: leaderboardData.top10[5]?.totalWins || 0,
//       },
//       {
//         rank: "#7",
//         img: leaderboardData.top10[6]?.profilePicture || "",
//         name: leaderboardData.top10[6]?.username || "",
//         title: leaderboardData.top10[6]?.title || "",
//         points: leaderboardData.top10[6]?.currentRating || 0,
//         level: leaderboardData.top10[6]?.level || 0,
//         BattleWon: leaderboardData.top10[6]?.totalWins || 0,
//       },
//       {
//         rank: "#8",
//         img: leaderboardData.top10[7]?.profilePicture || "",
//         name: leaderboardData.top10[7]?.username || "",
//         title: leaderboardData.top10[7]?.title || "",
//         points: leaderboardData.top10[7]?.currentRating || 0,
//         level: leaderboardData.top10[7]?.level || 0,
//         BattleWon: leaderboardData.top10[7]?.totalWins || 0,
//       },
//       {
//         rank: "#9",
//         img: leaderboardData.top10[8]?.profilePicture || "",
//         name: leaderboardData.top10[8]?.username || "",
//         title: leaderboardData.top10[8]?.title || "",
//         points: leaderboardData.top10[8]?.currentRating || 0,
//         level: leaderboardData.top10[8]?.level || 0,
//         BattleWon: leaderboardData.top10[8]?.totalWins || 0,
//       },
//       {
//         rank: "#10",
//         img: leaderboardData.top10[9]?.profilePicture || "",
//         name: leaderboardData.top10[9]?.username || "",
//         title: leaderboardData.top10[9]?.title || "",
//         points: leaderboardData.top10[9]?.currentRating || 0,
//         level: leaderboardData.top10[9]?.level || 0,
//         BattleWon: leaderboardData.top10[9]?.totalWins || 0,
//       },
//     ];

//     leaderboardStats = [
//       {
//         number: leaderboardData.totalUsers,
//         name: "Active Coders",
//       },
//       {
//         number: "7465",
//         name: "Problem Solved",
//       },
//       {
//         number: leaderboardData.totalBattleFought,
//         name: "Battles Faughts",
//       },
//     ];
//   }

//   return (
//     <div>
//       {err ? (
//         <div className="text-black dark:text-white text-center mt-[30%] font-bold text-3xl">
//           Error fetching leaderboard data
//         </div>
//       ) : (
//         <div className="dark:bg-black transition-all duration-500 bg-slate-50 text-black dark:text-white font-[Inter] p-5">
//           {data ? (
//             <div className="bg-white/10 ring-2 ring-slate-200 backdrop-blur-2xl p-5 rounded-md shadow-xl ">
//               <div className="flex gap-4 items-center ">
//                 <div className="dark:bg-[#222]  transition-all duration-500 bg-slate-50 text-cyan-500 dark:text-white px-2 py-3 text-4xl rounded-xl">
//                   <GiLaurelsTrophy />
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-black dark:text-white">
//                     Global Leaderboard
//                   </h1>
//                   <p className="text-[#A0AEC0] text-[14px] tracking-tight">
//                     Top performers at AlgoSprint
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center justify-around pt-6 gap-3">
//                 {leaderboardStats.map((elem, idx) => (
//                   <div
//                     key={idx}
//                     className=" dark:bg-[#333] ring-[0.5px] dark:ring-white/20 transition-all  flex flex-col items-center justify-center duration-500 bg-slate-50 text-black dark:text-whiteackdrop-blur-2xl p-5 basis-[33%] rounded-md shadow-xl"
//                   >
//                     <h1 className=" text-green-500 font-bold">{elem.number}</h1>
//                     <h2 className="font-bold text-black dark:text-white">
//                       {elem.name}
//                     </h2>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <Skeleton className="h-36 w-full" />
//           )}

//           <div className="flex items-center justify-around pt-6">
//             {/* #3 Rank Holder */}
//             {data ? (
//               <div className="bg-white/10 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl px-5 basis-[30%] rounded-md shadow-xl">
//                 <div className="flex items-center flex-col p-2 justify-center">
//                   <h1 className="p-1">#3</h1>
//                   <p className="py-2 rounded-full text-4xl">
//                     <img
//                       src={leaderboardData.top[2]?.profilePicture || " "}
//                       alt=""
//                       className="w-24 h-24 rounded-full p-1"
//                     />
//                   </p>
//                   <p className="text-black dark:text-white font-bold">
//                     {leaderboardData.top[2]?.username || " "}
//                   </p>
//                   <div className="rounded-full bg-cyan-300 font-semibold text-sm px-2 py-1">
//                     {leaderboardData.top[2]?.title || " "}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between p-1 pt-6">
//                   <p className="text-green-500 text-md ">
//                     {leaderboardData.top[2]?.points || " "}
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between p-1">
//                   BattleWon
//                   <p className="text-green-500">{leaderboardData.top[2]?.BattleWon || " "}</p>
//                 </div>
//                 <div className="flex items-center justify-between p-1">
//                   ratings
//                   <p className="text-green-500">{leaderboardData?.top[2]?.ratings || " "}</p>
//                 </div>
//               </div>
//             ) : (
//               <Skeleton className="h-76 w-1/3" />
//             )}

//             {/* #1 Rank Holder */}
//             {data ? (
//               <div className="bg-white/10 py-8 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl p-5 basis-[30%] rounded-md shadow-xl">
//                 <div className="flex items-center flex-col p-2 justify-center">
//                   <h1 className="p-1">#1</h1>
//                   <p className="py-2 rounded-full text-4xl">
//                     <img
//                       src={leaderboardData.top10[0]?.profilePicture || " "}
//                       alt=""
//                       className="w-24 h-24 rounded-full p-1"
//                     />
//                   </p>
//                   <p className="text-black dark:text-white font-bold">
//                     {leaderboardData.top10[0]?.username || " "}
//                   </p>
//                   <div className="rounded-full bg-cyan-300 font-semibold text-sm px-6 py-1">
//                     {leaderboardData.top10[0]?.title || " "}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between p-1 pt-6">
//                   <p>Points </p>
//                   <p className="text-green-500">
//                     {leaderboardData.top10[0]?.points || " "}
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between p-1">
//                   <p>Battle Won </p>
//                   <p className="text-green-500">
//                     {leaderboardData.top10[0]?.BattleWon || " "}
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between p-1">
//                   <p>Ratings: </p>
//                   <p className="text-green-500">
//                     {leaderboardData.top10[0]?.ratings || " "}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <Skeleton className="h-92 w-1/3" />
//             )}

//             {/* #2nd Rank Holder */}
//             {data ? (
//               <div className="bg-white/10 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl px-5 basis-[30%] rounded-md shadow-xl">
//                 <div className="flex items-center flex-col p-2 justify-center">
//                   <h1 className="p-1">#2</h1>
//                   <p className="py-2 rounded-full text-4xl">
//                     <img
//                       src={pic2}
//                       alt=""
//                       className="w-24 h-24 rounded-full p-1"
//                     />
//                   </p>
//                   <p className="text-black dark:text-white font-bold">priya</p>
//                   <div className="rounded-full bg-cyan-300 font-semibold text-sm px-2 py-1">
//                     CodingSage
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between p-1 pt-6">
//                   <p>Points </p>
//                   <p className="text-green-500">236</p>
//                 </div>
//                 <div className="flex items-center justify-between p-1">
//                   <p>Battle Won </p>
//                   <p className="text-green-500">24</p>
//                 </div>
//                 <div className="flex items-center justify-between p-1">
//                   <p>Ratings </p>
//                   <p className="text-green-500">245</p>
//                 </div>
//               </div>
//             ) : (
//               <Skeleton className="h-76 w-[30%]" />
//             )}
//           </div>

//           <div className="backdrop-blur-2xl m-3 rounded-xl bg-white/10 p-4">
//             <h1 className="py-6">Rankings</h1>
//             <div>
//               {/* ✅ Added condition to check if leaderboardTop10 has data */}
//               {leaderboardTop10.length > 0 &&
//                 leaderboardTop10.map((elem, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white/10 rounded-md p-2 pr-5 m-1 flex"
//                   >
//                     <div className="flex w-full">
//                       <h1 className="p-2">{elem.rank}</h1>
//                       <div className="bg-white w-10 mx-4 rounded-full ">
//                         <img
//                           src={elem.img}
//                           alt="profilepic"
//                           className="w-full"
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <div className="flex items-center gap-2">
//                           <div className="text-white dark:text-white font-semibold text-md p-1 ">
//                             {elem.name}
//                           </div>
//                           <h1 className="text-[10px] dark:bg-white/4 bg-black/4 rounded-md px-1">
//                             {elem.title}
//                           </h1>
//                         </div>
//                         <div className="flex items-center gap-4 text-slate-600 dark:text-gray-300">
//                           <div className="text-sm px-2">Levl.{elem.level}</div>
//                           <div className="text-sm">{elem.points} Pts</div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-white text-lg font-bold my-auto ">
//                       {elem.BattleWon}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;

import { GiLaurelsTrophy } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Leaderboard = () => {
  const params = useParams();
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState({ top10: [] });
  let leaderboardTop10 = [];
  let leaderboardStats = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching the data");
        const response = await axios.get(
          `https://algosprint-vxi4.onrender.com/api/v1/user/leaderboard`
        ).then((res)=> {setData(true);
          console.log("data fetched successfully")
          
        setLeaderboardData({
          top10: res.data.data.top10 || [],
          ...res.data.data,
        });
        setErr(false);
      })
      .catch((error) => {
        setErr(true);
        console.log("Error fetching leaderboard data", error);
      });

      } catch (err) {
        console.log("An error occurred", err);
        setLeaderboardData({ top10: [] });
        setErr(true);
        setData(false);
      }
    };

    fetchData();
  }, []);

  if (data && leaderboardData?.top10?.length > 0) {
    console.log(leaderboardData.top10, leaderboardData.totalBattleFought, leaderboardData.totalUsers);
    leaderboardTop10 = [
      {
        rank: "#4",
        name: leaderboardData.top10[3]?.username || "",
        title: leaderboardData.top10[3]?.title || "",
        img: leaderboardData.top10[3]?.profilePicture || "",
        points: leaderboardData.top10[3]?.currentRating || 0,
        BattleWon: leaderboardData.top10[3]?.totalWins || 0,
        level: leaderboardData.top10[3]?.level || 0,
      },
      {
        rank: "#5",
        img: leaderboardData.top10[4]?.profilePicture || "",
        name: leaderboardData.top10[4]?.username || "",
        title: leaderboardData.top10[4]?.title || "",
        points: leaderboardData.top10[4]?.currentRating || 0,
        level: leaderboardData.top10[4]?.level || 0,
        BattleWon: leaderboardData.top10[4]?.totalWins || 0,
      },
      {
        rank: "#6",
        img: leaderboardData.top10[5]?.profilePicture || "",
        name: leaderboardData.top10[5]?.username || "",
        title: leaderboardData.top10[5]?.title || "",
        points: leaderboardData.top10[5]?.currentRating || 0,
        level: leaderboardData.top10[5]?.level || 0,
        BattleWon: leaderboardData.top10[5]?.totalWins || 0,
      },
      {
        rank: "#7",
        img: leaderboardData.top10[6]?.profilePicture || "",
        name: leaderboardData.top10[6]?.username || "",
        title: leaderboardData.top10[6]?.title || "",
        points: leaderboardData.top10[6]?.currentRating || 0,
        level: leaderboardData.top10[6]?.level || 0,
        BattleWon: leaderboardData.top10[6]?.totalWins || 0,
      },
      {
        rank: "#8",
        img: leaderboardData.top10[7]?.profilePicture || "",
        name: leaderboardData.top10[7]?.username || "",
        title: leaderboardData.top10[7]?.title || "",
        points: leaderboardData.top10[7]?.currentRating || 0,
        level: leaderboardData.top10[7]?.level || 0,
        BattleWon: leaderboardData.top10[7]?.totalWins || 0,
      },
      {
        rank: "#9",
        img: leaderboardData.top10[8]?.profilePicture || "",
        name: leaderboardData.top10[8]?.username || "",
        title: leaderboardData.top10[8]?.title || "",
        points: leaderboardData.top10[8]?.currentRating || 0,
        level: leaderboardData.top10[8]?.level || 0,
        BattleWon: leaderboardData.top10[8]?.totalWins || 0,
      },
      {
        rank: "#10",
        img: leaderboardData.top10[9]?.profilePicture || "",
        name: leaderboardData.top10[9]?.username || "",
        title: leaderboardData.top10[9]?.title || "",
        points: leaderboardData.top10[9]?.currentRating || 0,
        level: leaderboardData.top10[9]?.level || 0,
        BattleWon: leaderboardData.top10[9]?.totalWins || 0,
      },
    ];

    leaderboardStats = [
      {
        number: leaderboardData.totalUsers || 0,
        name: "Active Coders",
      },
      {
        number: "7465",
        name: "Problem Solved",
      },
      {
        number: leaderboardData.totalBattleFought || 0,
        name: "Battles Fought",
      },
    ];
  }

  return (
    <div>
      {err ? (
        <div className="text-black dark:text-white text-center mt-[30%] font-bold text-3xl">
          Error fetching leaderboard data
        </div>
      ) : (
        <div className="dark:bg-black transition-all duration-500 bg-slate-50 text-black dark:text-white font-[Inter] p-5">
          {data ? (
            <div className="bg-white/10 ring-2 ring-slate-200 backdrop-blur-2xl p-5 rounded-md shadow-xl ">
              <div className="flex gap-4 items-center ">
                <div className="dark:bg-[#222] transition-all duration-500 bg-slate-50 text-cyan-500 dark:text-white px-2 py-3 text-4xl rounded-xl">
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
                {leaderboardStats.map((elem, idx) => (
                  <div
                    key={idx}
                    className="dark:bg-[#333] ring-[0.5px] dark:ring-white/20 transition-all flex flex-col items-center justify-center duration-500 bg-slate-50 text-black dark:text-white p-5 basis-[33%] rounded-md shadow-xl"
                  >
                    <h1 className=" text-green-500 font-bold">{elem.number}</h1>
                    <h2 className="font-bold text-black dark:text-white">
                      {elem.name}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Skeleton className="h-36 w-full" />
          )}

          <div className="flex items-center justify-around pt-6">
            {/* #3 Rank Holder */}
            {data ? (
              <div className="bg-white/10 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl px-5 basis-[30%] rounded-md shadow-xl">
                <div className="flex items-center flex-col p-2 justify-center">
                  <h1 className="p-1">#3</h1>
                  <img
                    src={leaderboardData.top10[2]?.profilePicture || "#"}
                    alt=""
                    className="w-24 h-24 rounded-full p-1"
                  />
                  <p className="text-black dark:text-white font-bold">
                    {leaderboardData.top10[2]?.username || ""}
                  </p>
                  <div className="rounded-full bg-cyan-300 font-semibold text-sm px-2 py-1">
                    {leaderboardData.top10[2]?.title || ""}
                  </div>
                </div>
                <div className="flex items-center justify-between p-1 pt-6">
                  <p>Points</p>
                  <p className="text-green-500">
                    {leaderboardData.top10[2]?.currentRating || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between p-1">
                  <p>Battle Won</p>
                  <p className="text-green-500">
                    {leaderboardData.top10[2]?.totalWins || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between p-1">
                  <p>Level</p>
                  <p className="text-green-500">
                    {leaderboardData.top10[2]?.level || 0}
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton className="h-76 w-1/3" />
            )}

            {/* #1 Rank Holder */}
            {data ? (
              <div className="bg-white/10 py-8 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl p-5 basis-[30%] rounded-md shadow-xl">
                <div className="flex items-center flex-col p-2 justify-center">
                  <h1 className="p-1">#1</h1>
                  <img
                    src={leaderboardData.top10[0]?.profilePicture || "#"}
                    alt=""
                    className="w-24 h-24 rounded-full p-1"
                  />
                  <p className="text-black dark:text-white font-bold">
                    {leaderboardData.top10[0]?.username || ""}
                  </p>
                  <div className="rounded-full bg-cyan-300 font-semibold text-sm px-6 py-1">
                    {leaderboardData.top10[0]?.title || ""}
                  </div>
                </div>
                <div className="flex items-center justify-between p-1 pt-6">
                  <p>Points </p>
                  <p className="text-green-500">
                    {leaderboardData.top10[0]?.currentRating || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between p-1">
                  <p>Battle Won </p>
                  <p className="text-green-500">
                    {leaderboardData.top10[0]?.totalWins || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between p-1">
                  <p>Level</p>
                  <p className="text-green-500">
                    {leaderboardData.top10[0]?.level || 0}
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton className="h-92 w-1/3" />
            )}

            {/* #2 Rank Holder */}
            {data ? (
              <div className="bg-white/10 ring-[0.5px] dark:ring-white/20 text-sm text-black dark:text-white backdrop-blur-2xl px-5 basis-[30%] rounded-md shadow-xl">
                <div className="flex items-center flex-col p-2 justify-center">
                  <h1 className="p-1">#2</h1>
                  <img
                    src={leaderboardData.top10[1]?.profilePicture || "#"}
                    alt=""
                    className="w-24 h-24 rounded-full p-1"
                  />
                  <p className="text-black dark:text-white font-bold">
                    {leaderboardData.top10[1]?.username || ""}
                  </p>
                  <div className="rounded-full bg-cyan-300 font-semibold text-sm px-2 py-1">
                    {leaderboardData.top10[1]?.title || ""}
                  </div>
                </div>
                <div className="flex items-center justify-between p-1 pt-6">
                  <p>Points </p>
                  <p className="text-green-500">
                    {leaderboardData.top10[1]?.currentRating || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between p-1">
                  <p>Battle Won </p>
                  <p className="text-green-500">
                    {leaderboardData.top10[1]?.totalWins || 0}
                  </p>
                </div>
                <div className="flex items-center justify-between p-1">
                  <p>Level</p>
                  <p className="text-green-500">
                    {leaderboardData.top10[1]?.level || 0}
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton className="h-76 w-[30%]" />
            )}
          </div>

          <div className="backdrop-blur-2xl m-3 rounded-xl bg-white/10 p-4">
            <h1 className="py-6">Rankings</h1>
            <div>
              {leaderboardTop10.length > 0 &&
                leaderboardTop10.map((elem, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-md p-2 pr-5 m-1 flex"
                  >
                    <div className="flex w-full">
                      <h1 className="p-2">{elem.rank}</h1>
                      <div className="bg-white w-10 mx-4 rounded-full ">
                        <img
                          src={elem.img}
                          alt="profilepic"
                          className="w-full rounded-full"
                        />
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
                          <div className="text-sm px-2">Lvl.{elem.level}</div>
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
      )}
    </div>
  );
};

export default Leaderboard;
