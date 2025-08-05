import React from 'react'

const McqRooms = () => {

  const quizList = [
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },
    {
      name: "Data Structures",
      Questions: "25",
      time: "15 mintues",
      button: "start Quiz",
      reward: "15xp",
    },

  ];

  return (
    <div className="bg-[#0e1d2e] font-[Inter] p-5">
      <div className=" backdrop-blur-2xl bg-white/10 p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center ">
          <div className="bg-white/10 backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
            👑
          </div>
          <div className="">
            <h1 className="text-xl font-bold text-[#F7FAFC]">
              Mcq Rooms - Quiz Arena
            </h1>
            <p className="text-[#A0AEC0] text-[12px] tracking-tight">
              test your theoritical knowledge with an rapid fire MZQ rounds with
              your friends
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-6 justify-center gap-4 rounded-xl text-white">
        <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">solo</div>
        <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">duo</div>
        <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">trio</div>
        <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">squad</div>
        <div className="bg-white/10 backdrop:2xl px-2 rounded-xl">multiverse</div>
      </div>

      <div className='flex items-center flex-wrap max-w-[900px] mx-auto p-4'>
        {
          quizList.map((elem, idx)=>(
            <div key={idx} className='flex flex-col basis-[48%] border-2 p-2 bg-white/10 m-2 rounded-md'>
              <h1 className='text-white font-bold m-2'>{elem.name}</h1>
              <div className='flex text-gray-300 text-sm gap-4 m-2'>
                <p >
                  {elem.Questions}
                </p>
                <p>{elem.time}</p>
              </div>

              <div className='flex justify-between items-center m-2'>
                <div className='px-2 py-1 bg-white/10 backdrop-blur-2xl rounded-lg'>
                  {elem.button}
                </div>
                <div>
                  {elem.reward}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default McqRooms
