import React from 'react'
import logo from '../../assets/images/logo.png'
import Dashboard from './Dashboard'
import {NavLink, Routes, Route} from 'react-router-dom'
const ProfileHeroSection = () => {
  return (
    <div className="bg-[hsl(212,53%,12%)] w-2/10 h-screen font-[Inter] px-4 py-3 flex-col">
      <div>
        <div className="flex gap-4 basis-[10%]">
          <img src={logo} alt="AlgoSprint" className="w-10" />
          <div className="">
            <h1 className="text-white text-lg font-bold">AlogSprint</h1>
            <p className="text-[12px] font-semibold text-gray-300">
              Level up your skills
            </p>
          </div>
        </div>
      </div>
      <div className="py-4 pr-4 flex flex-col gap-5 mt-3 basis-[70%] ">
        <li className="list-none bg-zinc-400 rounded-md px-3 py-[12px] text-sm text-white ">
          🐦‍🔥Dashboard
        </li>
        <li className="list-none bg-zinc-400 rounded-md px-3 py-[12px] text-sm text-white ">
          🐦‍🔥Leaderboard
        </li>
        <li className="list-none bg-zinc-400 rounded-md px-3 py-[12px] text-sm text-white ">
          🐦‍🔥Coding Room
        </li>
        <li className="list-none bg-zinc-400 rounded-md px-3 py-[12px] text-sm text-white ">
          🐦‍🔥MCQ verse
        </li>
        <li className="list-none bg-zinc-400 rounded-md px-3 py-[12px] text-sm text-white ">
          🐦‍🔥Coummunity
        </li>
        <li className="list-none bg-zinc-400 rounded-md px-3 py-[12px] text-sm text-white ">
          🐦‍🔥Collaborative Space
        </li>
      </div>
      <div className="basis-[10%] pt-3">
        <div className="px-3 py-1 text-white font-semibold text-md backdrop-blur-2xl bg-white/10 rounded-lg my-3 shadow-xl">
          {" "}
          ☀️ Light Mode
        </div>
        <div className="px-3 py-1 text-white font-semibold text-md backdrop-blur-2xl bg-white/10 rounded-lg mt-2 shadow-xl flex  justify-between">
          {" "}
          Sign Out
          <div className="bg-red-500">
            <img src="#" alt="profilepic" />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ProfileHeroSection
