import React from 'react'

const CodingRooms = () => {
  return (
    <div className="bg-[#0e1d2e] font-[Inter] p-5 h-screen relative">
      <div className=" backdrop-blur-2xl bg-white/10 p-5 rounded-md shadow-xl ">
        <div className="flex gap-4 items-center ">
          <div className="bg-white/10 backdrop-blur-2xl px-2 py-3 text-4xl rounded-xl">
            👑
          </div>
          <div className="">
            <h1 className="text-xl font-bold text-[#F7FAFC]">
              Collaborative verse
            </h1>
            <p className="text-[#A0AEC0] text-[12px] tracking-tight w-2/3">
              enters an collaborative space for sharing codes questions concepts
              and learning together with your friends
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0e1d2e] font-[Inter] p-5 grid place-items-center">
        <div className="flex items-center justify-center gap-3 absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%]">
          <div className="bg-zinc-600 rounded-md border-2 shadow p-15">
            Create Your Room
          </div>
          <div className="bg-zinc-600 rounded-md border-2 shadow p-15 px-19">
            Join public Room
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodingRooms
