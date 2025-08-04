import React from 'react'
import ProfileHeroSection from './ProfileHeroSection'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <div className="flex w-full relative bg-[hsl(212,53%,12%)]">
      <div className="w-full fixed ">
        <ProfileHeroSection />
      </div>
      <div className="basis-[80%] ml-[253px]">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout
