// import { GiMultipleTargets } from "react-icons/gi";
// const McqRooms = () => {
//   const quizList = [
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//     {
//       name: "Data Structures",
//       Questions: "25",
//       time: "15 mintues",
//       button: "start Quiz",
//       reward: "15xp",
//     },
//   ];

//   return (
//     <div className="bg-[#0e1d2e] font-[Inter] p-5">
//       <div className=" backdrop-blur-2xl bg-white/4 shadow-md p-5 rounded-md">
//         <div className="flex gap-4 items-center ">
//           <div className="bg-white/10 shadow-md backdrop-blur-2xl px-2 py-2 text-4xl rounded-xl">
//             <GiMultipleTargets />
//           </div>
//           <div className="">
//             <h1 className="text-xl font-bold text-[#F7FAFC]">
//               Mcq Rooms - Quiz Arena
//             </h1>
//             <p className="text-[#A0AEC0] text-[12px] tracking-tight">
//               test your theoritical knowledge with an rapid fire MCQ rounds with
//               your friends
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center mt-6 justify-center gap-4 rounded-xl text-white">
//         <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">solo</div>
//         <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">duo</div>
//         <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">trio</div>
//         <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">squad</div>
//         <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">
//           multiverse
//         </div>
//       </div>

//       <div className="flex items-center  flex-wrap max-w-[900px] mx-auto p-4">
//         {quizList.map((elem, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col basis-[48%] border-2 p-2 bg-white/4 shadow-md m-2 rounded-md"
//           >
//             <h1 className="text-white font-bold m-2">{elem.name}</h1>
//             <div className="flex text-gray-300 text-sm gap-4 m-2">
//               <p>{elem.Questions} questions</p>
//               <p className="font-bold">{elem.time}</p>
//             </div>

//             <div className="flex justify-between items-center m-2">
//               <div className="px-2 py-1 bg-white/10 backdrop-blur-2xl rounded-lg">
//                 {elem.button}
//               </div>
//               <div className="text-cyan-400">*{elem.reward}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default McqRooms;

import { GiMultipleTargets } from "react-icons/gi";

const McqRooms = () => {
  const quizList = [
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 minutes",
      button: "Start Quiz",
      reward: "15xp",
    },
  ];

  return (
    <div className="bg-slate-50 transition-all duration-500 dark:bg-black/80 text-black dark:text-white font-[Inter] p-5">
      <div className="dark:bg-[#111] transition-all duration-500 bg-slate-50 shadow-md p-5 rounded-md">
        <div className="flex gap-4 items-center">
          <div className="dark:bg-[#222] transition-all duration-500 bg-slate-100 text-black dark:text-white shadow-md px-2 py-2 text-4xl rounded-xl">
            <GiMultipleTargets />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-black dark:text-white">
              MCQ Rooms - Quiz Arena
            </h1>
            <p className="text-zinc-600 dark:text-white text-sm">
              Test your theoretical knowledge with rapid-fire MCQ rounds with
              your friends
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-6  justify-center gap-4 text-black dark:text-white">
        <div className="dark:bg-[#111] transition-all duration-500 bg-slate-50 shadow-md px-3 py-1 rounded-xl">
          Solo
        </div>
        <div className="dark:bg-[#111] transition-all duration-500 bg-slate-50 shadow-md px-3 py-1 rounded-xl">
          Duo
        </div>
        <div className="dark:bg-[#111] transition-all duration-500 bg-slate-50 shadow-md px-3 py-1 rounded-xl">
          Trio
        </div>
        <div className="dark:bg-[#111] transition-all duration-500 bg-slate-50 shadow-md px-3 py-1 rounded-xl">
          Squad
        </div>
        <div className="dark:bg-[#111] transition-all duration-500 bg-slate-50 shadow-md px-3 py-1 rounded-xl">
          Multiverse
        </div>
      </div>

      <div className="flex items-center transition-all duration-500 flex-wrap max-w-[900px] mx-auto p-4">
        {quizList.map((elem, idx) => (
          <div
            key={idx}
            className="flex flex-col basis-[48%] border transition-all duration-500 border-white/20 p-2 bg-slate-20 shadow-md ring-2 dark:ring-0 ring-slate-200 dark:bg-[#1a1a1a] m-2 rounded-md"
          >
            <h1 className="text-black dark:text-white font-bold m-2">
              {elem.name}
            </h1>
            <div className="flex text-slate-500 dark:text-gray-300 text-sm gap-4 m-2">
              <p>{elem.Questions} questions</p>
              <p className="font-bold">{elem.time}</p>
            </div>

            <div className="flex justify-between items-center m-2">
              <div className="px-2 transition-all duration-500 py-1 bg-slate-300 shadow-md dark:bg-[#333] rounded-lg">
                {elem.button}
              </div>
              <div className="text-black dark:text-white text-sm">
                *{elem.reward}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default McqRooms;
