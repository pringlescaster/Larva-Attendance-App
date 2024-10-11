import React, { useContext } from 'react';
import Image from 'next/image';
import larvaLogo from '../../../public/assets/larvaLogo.svg';
import hamBugger from '../../../public/assets/hamBugger.svg';
import Avatar from './avatar';
import { AuthContext } from '../../../context/authContext';

function Navbar({ openSidebar }) {
  const { user } = useContext(AuthContext); // Access user state

  return (
    <>
      {/* Desktop Navbar */}
      <div className='hidden lg:flex justify-between items-center w-full bg-white px-6 py-4 border-b-2 border-b-[#e6e6e6]'>
        <h1 className='text-[#111111] text-lg font-semibold'>School Attendance</h1>

        {/* User Profile */}
        <div className="flex gap-x-[8px] items-center">
          <Avatar name={user?.name || 'Anonymous'} /> {/* Use optional chaining */}
          <div className="flex flex-col gap-y-[2px] justify-center">
            <h1 className="text-[#333333] text-[14px] font-semibold text-left">
              {user?.name || 'Anonymous'}
            </h1>
            <h2 className="text-[#666666] text-[12px] font-medium text-left">
              {user?.course || 'N/A'} {/* Fallback if course is not available */}
            </h2>
          </div>
        </div>
      </div>

      {/* Mobile Navbar with Hamburger Menu */}
      <div className='flex md:hidden justify-between items-center px-4 py-4 w-full'>
        <Image className="w-24" src={larvaLogo} alt="Larva Logo" />
        <Image 
          className="cursor-pointer" 
          src={hamBugger} 
          alt="Hamburger Menu" 
          onClick={openSidebar} 
        />
      </div>
    </>
  );
}

export default Navbar;
