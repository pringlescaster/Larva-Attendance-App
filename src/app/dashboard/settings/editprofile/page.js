"use client"

import React, {useState} from 'react';
import Image from 'next/image';
import profilee from "../../../../../public/assets/profilee.svg";
import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';


function page() {
    const [isEditing, setisEditing] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const currentPage = "Settings"; // Define the current page

     
    const handleInputChange = () => {
        setisEditing(true);
    }


  return (
    <>
       <div className="w-[60%] hidden py-8 gap-y-6 px-8 md:flex flex-col items-center">
            <div className="flex flex-col gap-y-2">
            <Image className="w-[100px]" src={profilee} alt="registerProfile" />
            <button className="text-[#f39b3b] font-semibold">Change Picture</button>
            </div>

            <div className=" px-6 text-sm w-full grid  gap-y-4">
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Name"
                onChange={handleInputChange}
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Course"
                onChange={handleInputChange}
              />
             
              <button  className={`bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base transition-opacity duration-300 ${isEditing ? 'opacity-100' : 'opacity-65'}`}>Save</button>
            </div>
            
          </div>
          <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar 
            closeSidebar={() => setShowSideBar(false)} 
            currentPage={currentPage} // Pass the current page to the Sidebar
          />
        ) : (
          <Navbar openSidebar={() => setShowSideBar(true)} />
        )}
      </div>
          <div className="w-full h-screen  py-8 gap-y-6 px-3 md:hidden flex-col  items-center">
            <div className="flex flex-col gap-y-2">
            <Image className="w-[80px] mx-auto" src={profilee} alt="registerProfile" />
            <button className="text-[#f39b3b] font-semibold">Change Picture</button>
            </div>

            <div className=" px-3 text-sm w-full pt-10 grid  gap-y-4">
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Name"
                onChange={handleInputChange}
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Course"
                onChange={handleInputChange}
              />
             
              <button  className={`bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base transition-opacity duration-300 ${isEditing ? 'opacity-100' : 'opacity-65'}`}>Save</button>
            </div>
            
          </div>
    </>
 
  )
}

export default page