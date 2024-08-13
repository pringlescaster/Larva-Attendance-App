import React from 'react';
import Image from 'next/image';
import larvaLogo from "../../../public/assets/larvaLogo.svg";
import logoIcon from "../../../public/assets/logoutIcon.svg";

function sidebar() {
  return (
//md
    <aside className='px-4 py-4 h-screen flex flex-col justify-around w-[25%] border-r-2 border-r-[#e6e6e6] gap-y-20'>
    <Image className='w-24' src={larvaLogo} />

    <div className='text-[#222222] font-semibold text-base flex flex-col gap-y-6'>
        <h1 className=''>Mark Attendance</h1>
        <h1 className=''>Register Students</h1>
        <h1 className=''>Student List</h1>
        <h1 className=''>Settings</h1>
    </div>

    <div className='flex gap-x-2 text-[#222222] text-base font-semibold'>
        <Image src={logoIcon} />
        <h1 className='font-semibold'>Log Out</h1>
    </div>
    </aside>
  )
}

export default sidebar
