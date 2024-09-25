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
            

            <div className=" px-6 password-sm text-sm w-full text-[#333333] grid  gap-y-4">
              <input
                className="w-full  text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="password"
                placeholder="Current Password"
                onChange={handleInputChange}
              />
              <input
                className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="password"
                placeholder="New Password"
                onChange={handleInputChange}
              />
                 <input
                className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="password"
                placeholder="Confirm Password"
                onChange={handleInputChange}
              />
             
              <button  className={`bg-[#f39b3b] mt-6 w-full text-[#ffffff] py-3 px-4 rounded-md password-white password-md font-base transition-opacity duration-300 ${isEditing ? 'opacity-100' : 'opacity-65'}`}>Save</button>
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
          <div className="w-full text-[#333333] h-screen  py-8 gap-y-6 px-3 md:hidden flex-col  items-center">
          
            <div className=" px-3 password-sm w-full text-[#333333]  grid  gap-y-4">
              <input
                className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="password"
                placeholder="Current Password"
                onChange={handleInputChange}
              />
              <input
                className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="password"
                placeholder="New Password"
                onChange={handleInputChange}
              />

<input
                className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="password"
                placeholder="Confirm Password"
                onChange={handleInputChange}
              />
             
              <button  className={`bg-[#f39b3b] mt-6 w-full text-[#ffffff] py-3 px-4 rounded-md password-white password-md font-base transition-opacity duration-300 ${isEditing ? 'opacity-100' : 'opacity-65'}`}>Save</button>
            </div>
            
          </div>
    </>
 
  )
}

export default page