import React from 'react'
import ProfileHeroSection from './ProfileHeroSection'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <div className="flex w-full relative dark:bg-black">
      <div className="w-full fixed ">
        <ProfileHeroSection />
      </div>
      <div className="absolute right-0 dark:bg-black top-0 w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout
