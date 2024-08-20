import React from 'react';
import Image from 'next/image';
import rightArrow from "../../../public/assets/rightArrow.svg";


function settingSec() {
  return (
    <div className="bg-[#FAF9F9] w-[40%] flex flex-col justify-between border-r-2 border-r-[#E6E6E6]">
        <div className='grid py-10 gap-y-2'>
        <div className="flex bg-none w-full px-3 mx-auto hover:bg-[#E2E2E2] hover:border-r-[#CC791E] hover:border-r-2">
      <button className="text-[#222222] text-[14px] font-medium py-[16px] w-full text-left">
        Edit Profile
      </button>
      <Image className="w-[8.6px]" src={rightArrow} />
    </div>
    <div className="flex bg-none w-full px-3 mx-auto hover:bg-[#E2E2E2] hover:border-r-[#CC791E] hover:border-r-2">
      <button className="text-[#222222] text-[14px] font-medium py-[16px] w-full text-left">
        Change Your Password
      </button>
      <Image className="w-[8.6px]" src={rightArrow} />
    </div>
        </div>


  </div>
  
  )
}

export default settingSec
