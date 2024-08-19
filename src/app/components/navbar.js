import React from 'react';
import Image from 'next/image';
import profileImage from "../../../public/assets/profileImage.svg";
import larvaLogo from "../../../public/assets/larvaLogo.svg";
import hamBugger from "../../../public/assets/hamBugger.svg";

function Navbar({ openSidebar }) {
  return (
    <>
      {/* Desktop Navbar */}
      <div className='lg:flex hidden justify-between items-center w-full bg-white px-6 py-4 border-b-2 border-b-[#e6e6e6]'>
        <h1 className='text-[#111111] text-lg font-semibold'>School Attendance</h1>
        <div className="flex gap-x-[8px]">
          <Image className="w-10" src={profileImage} alt="Profile Image" />
          <div className="flex flex-col gap-y-[2px] justify-center">
            <h1 className="text-[#333333] text-[14px] font-semibold text-left">Ayantoye David</h1>
            <h2 className="text-[#666666] text-[12px] font-medium text-left">Web Development</h2>
          </div>
        </div>
      </div>

      {/* Mobile Navbar with Hamburger Menu */}
      <div className='flex md:hidden justify-between items-center px-4 py-4 w-full'>
        <Image className="w-24" src={larvaLogo} alt="Larva Logo" />
        <Image className="cursor-pointer" src={hamBugger} alt="Hamburger Menu" onClick={openSidebar} />
      </div>
    </>
  );
}

export default Navbar;

