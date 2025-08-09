import React from 'react'
import ProfileHeroSection from './ProfileHeroSection'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <div className="flex w-full relative bg-[hsl(212,53%,12%)]">
      <div className="w-full fixed ">
        <ProfileHeroSection />
      </div>
      <div className="absolute right-0 top-0 w-[80%]">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout
