import React from 'react'
import Image from 'next/image';
import successImg from "../../../public/assets/success.svg";



function success() {
  return (
    <div className='bg-white flex flex-col py-4 px-2'>
      <Image src={successImg} alt='' />
      <h1 className='font-medium text-[#444444] text-center'>Success!</h1>
    </div>
  )
}

export default success
