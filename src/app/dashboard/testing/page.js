import React from 'react';
import Image from 'next/image';
import successImg from "../../../../public/assets/success.svg";

function page() {
  return (
    <div className='bg-white w-[328px] h-[263px] md:w-[480px] md:h-[300px] rounded-md md: flex flex-col gap-y-2 justify-center items-center py-16 px-4 md:px-16'>
    <Image className='w-12 h-12 md:h-16 md:w-16' src={successImg} alt='Success' />
    <h1 className='font-medium text-[#444444] text-center text-sm md:text-base lg:text-l'>Success!</h1>
  </div>
  )
}

export default page
