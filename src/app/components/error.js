import React from 'react'
import Image from 'next/image'
import Errorimg from "../../../public/assets/error.svg";


function error() {
  return (
    <div className='flex flex-col mt-8 md:mt-0 gap-y-2 justify-center items-center'>
      <Image className='size-20 md:size-40' src={Errorimg} alt='Error' />
      <h1 className='font-medium text-center text-sm md:text-base text-[#444444]'>Error loading students</h1>
    </div>
  )
}

export default error
