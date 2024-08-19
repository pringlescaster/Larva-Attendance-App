import React from "react";
import Image from "next/image";
import larvaLogo from "../../../public/assets/larvaLogo.svg";
import logoIcon from "../../../public/assets/logoutIcon.svg";
import profileImage from "../../../public/assets/profileImage.svg";
import closeSideBar from "../../../public/assets/closeSideBar.svg";

function Sidebar({ closeSidebar }) {
  return (
    <>
      {/* First aside - visible on large screens */}
      <aside className="px-4 py-6 h-screen lg:flex hidden flex-col justify-around w-[20%] border-r-2 border-r-[#e6e6e6] gap-y-20">
        <Image className="w-24" src={larvaLogo} alt="Larva Logo" />

        <div className="text-[#222222] font-semibold text-base flex flex-col gap-y-6">
          <h1 className="">Mark Attendance</h1>
          <h1 className="">Register Students</h1>
          <h1 className="">Student List</h1>
          <h1 className="">Settings</h1>
        </div>

        <div className="flex gap-x-2 text-[#222222] text-base font-semibold">
          <Image src={logoIcon} alt="Logout Icon" />
          <h1 className="font-semibold">Log Out</h1>
        </div>
      </aside>

      {/* Second aside - visible on smaller screens */}
      <aside className="px-4 py-8 h-screen flex flex-col justify-between w-[80%] gap-y-20 lg:hidden">
        <div className="flex justify-between items-start">
          <div className="grid gap-y-[8px]">
            <Image className="w-12" src={profileImage} alt="Profile Image" />
            <div className="grid gap-y-[2px]">
              <h1 className="text-[#333333] text-base font-semibold text-left">Ayantoye David</h1>
              <h2 className="text-[#666666] text-sm font-medium text-left">Web Development</h2>
            </div>
          </div>
          <Image
            className="cursor-pointer"
            src={closeSideBar}
            alt="Close Sidebar Icon"
            onClick={closeSidebar}
          />
        </div>

        <div className="text-[#222222] font-semibold mb-48 text-sm flex flex-col gap-y-6">
          <h1 className="">Mark Attendance</h1>
          <h1 className="">Register Students</h1>
          <h1 className="">Student List</h1>
          <h1 className="">Settings</h1>
        </div>

        <div className="flex mb-24 gap-x-2 text-[#222222] text-sm font-semibold">
          <Image src={logoIcon} alt="Logout Icon" />
          <h1 className="font-semibold">Log Out</h1>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
