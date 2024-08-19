"use client";

import { useState } from "react";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import searchIcon from "../../../../public/assets/searchIcon.svg";
import filterIcon from "../../../../public/assets/filterIcn.svg";
import CoursesSelection from "@/app/components/coursesSelection";
import CohortSelection from "@/app/components/cohortSelection";
import BulkSelection from "@/app/components/bulkSelection";

function Page() {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      {/* Mobile View - Sidebar toggles with hamburger */}
      <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar closeSidebar={() => setShowSideBar(false)} />
        ) : (
          <Navbar openSidebar={() => setShowSideBar(true)} />
        )}
      </div>

      {/* Desktop View - Sidebar always visible */}
      <div className="hidden md:flex">
        <Sidebar />
        <div className="flex-grow overflow-x-hidden"> {/* Prevents horizontal scrolling */}
          <Navbar />
          <div className="py-[20px] px-8 bg-[#FAF9F9] gap-y-4 grid">
            <h1 className="text-[#1a1a1a] text-center font-semibold">Mark Attendance</h1>
            <div className=" flex justify-between">
              <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6  py-4 w-[90%] border-[1px] border-[#e9e9e9]">
                <Image src={searchIcon}/><input className="bg-transparent outline-none h-full w-full text-[#666666] font-base " type="text" placeholder="Search" /></div>
<Image src={filterIcon} className="" />
            </div>
            <div className="flex gap-x-4">
             <CoursesSelection />
             <CohortSelection />
             <BulkSelection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
