"use client";

import { useState } from "react";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import SettingSec from "@/app/components/settingSec";
import EditProfile from "@/app/components/editProfile";
import Link from "next/link";
function page() {
  const [showSideBar, setShowSideBar] = useState(false);
  const currentPage = "Settings"; // Define the current page
  return (
    <>
      {/* Mobile view */}
      <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar
            closeSidebar={() => setShowSideBar(false)}
            currentPage={currentPage}
          />
        ) : (
          <Navbar openSidebar={() => setShowSideBar(true)} />
        )}
      </div>

      <div className="md:hidden flex flex-col justify-center px-3 w-full">
        <h1 className="text-[#1a1a1a] text-center font-semibold">Settings</h1>
      </div>

      <div className="flex py-[32px] flex-col gap-y-3 px-3 md:hidden">
        
        <Link href="/dashboard/settings/editprofile"><button className="py-4 pl-4 font-semibold w-full bg-[#E2E2E2] text-[#333333] text-left text-sm rounded-md">
          Edit Profile
        </button></Link>
        <Link href="/dashboard/settings/changepassword"><button className="py-4 pl-4 font-semibold w-full bg-[#E2E2E2] text-[#333333] text-left text-sm rounded-md">
          Change Your Password
        </button></Link>
      </div>

      {/* Desktop View - Sidebar always visible */}
      <div className="hidden md:flex h-screen">
        <Sidebar currentPage={currentPage} />
        <div className="flex-grow overflow-x-hidden">
          <Navbar />
          <div className="py-5 border-b-2 border-[#e9e9e9] px-8 bg-[#FAF9F9]">
            <h1 className="text-[#1a1a1a] text-center font-semibold">
              Settings
            </h1>
          </div>
          <div className="flex bg-[#FAF9F9] h-full">
            <SettingSec />
            <EditProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

