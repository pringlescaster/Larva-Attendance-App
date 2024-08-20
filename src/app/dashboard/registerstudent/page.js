"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import registerProfile from "../../../../public/assets/registerProfile.svg";

function Page() {
  const [showSideBar, setShowSideBar] = useState(false);
  const currentPage = "Register Student"; // Define the current page

  return (
    <>
      {/* Mobile View - Sidebar toggles with hamburger */}
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

      {/* Desktop View - Sidebar always visible */}
      <div className="hidden md:flex ">
        <Sidebar currentPage={currentPage} /> {/* Pass the current page to the Sidebar */}
        <div className="flex-grow overflow-x-hidden">
          <Navbar />
          <div className="py-5 border-b-2 border-[#e9e9e9] px-8 bg-[#FAF9F9]">
            <h1 className="text-[#1a1a1a] text-center font-semibold">Register Students</h1>
          </div>
          <div className="bg-[#FAF9F9]"> 
              <div className="py-8 gap-y-4 px-8 flex flex-col items-center max-w-lg mx-auto">
            <div className="flex flex-col gap-y-2">
            <Image className="w-[120px]" src={registerProfile} alt="registerProfile" />
            <button className="text-[#f39b3b] font-semibold">Add Photo</button>
            </div>

            <div className="w-full space-y-4">
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Name"
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Student Number"
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Course"
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Cohort"
              />
            </div>
            <button className="bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base ">Register Student</button>
          </div></div>
       
        </div>
      </div>

      <div className="md:hidden flex flex-col px-4 gap-y-4">
      <h1 className="text-[#1a1a1a] text-center font-semibold">Register Students</h1>
      <div className="py-8 gap-y-6 px-8 flex flex-col items-center">
            <div className="flex flex-col gap-y-2">
            <Image className="w-[100px]" src={registerProfile} alt="registerProfile" />
            <button className="text-[#f39b3b] font-semibold">Add Photo</button>
            </div>

            <div className=" px-4 text-sm w-screen grid  gap-y-4">
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Name"
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Student Number"
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Course"
              />
              <input
                className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                type="text"
                placeholder="Cohort"
              />
              <button className="bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base ">Register Student</button>
            </div>
            
          </div>
      </div>
    </>
  );
}

export default Page;


