"use client";

import React from 'react';
import Image from 'next/image';
import rightArrow from "../../../public/assets/rightArrow.svg";

function SettingSec({ onEditProfileClick, onChangePassword }) {
  return (
    <div className="bg-[#FAF9F9] w-[40%] flex flex-col justify-between border-r-2 border-r-[#E6E6E6]">
      <div className='grid py-10 gap-y-2'>
        <div 
          className="flex bg-none w-full px-3 mx-auto hover:bg-[#E2E2E2] hover:border-r-[#CC791E] hover:border-r-2"
          onClick={onEditProfileClick} // Trigger the function on click
        >
          <button className="text-[#222222] text-[14px] font-medium py-[16px] w-full text-left">
            Edit Profile
          </button>
          <Image className="w-[8.6px]" src={rightArrow} alt="right arrow"/>
        </div>
        <div 
          className="flex bg-none w-full px-3 mx-auto hover:bg-[#E2E2E2] hover:border-r-[#CC791E] hover:border-r-2"
          onClick={onChangePassword}
        >
          <button className="text-[#222222] text-[14px] font-medium py-[16px] w-full text-left">
            Change Your Password
          </button>
          <Image className="w-[8.6px]" src={rightArrow} alt="right arrow"/>
        </div>
      </div>
    </div>
  );
}

export default SettingSec;
