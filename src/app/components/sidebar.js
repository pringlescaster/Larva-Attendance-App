import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import larvaLogo from "../../../public/assets/larvaLogo.svg";
import logoIcon from "../../../public/assets/logoutIcon.svg";
import profileImage from "../../../public/assets/profileImage.svg";
import closeSideBar from "../../../public/assets/closeSideBar.svg";

function Sidebar({ closeSidebar }) {
  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    setSelectedLink(window.location.pathname);
  }, []);

  //In your sidebar code, you're using window.location.pathname to check the current route. If the route matches a specific link, you change the text color to indicate that the user is on that page. For example, if you're on the "Mark Attendance" page, the text for that link will change color to show that it's the active link.

  return (
    <>
      <aside className="px-4 py-6 h-screen md:flex lg:flex hidden flex-col justify-between md:w-[40%] lg:w-[20%] border-r-2 border-r-[#e6e6e6] overflow-y-auto">
        <div className="mb-6">
          <Image className="w-24" src={larvaLogo} alt="Larva Logo" />
        </div>
        <div className="text-[#222222] font-semibold text-base flex flex-col gap-y-6">
          <Link href="/dashboard/markattendance">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/markattendance" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/markattendance")}
            >
              Mark Attendance
            </span>
          </Link>
          <Link href="/dashboard/registerstudent">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/registerstudent" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/registerstudent")}
            >
              Register Students
            </span>
          </Link>
          <Link href="/dashboard/studentlist">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/studentlist" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/studentlist")}
            >
              Student List
            </span>
          </Link>
          <Link href="/dashboard/settings">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/settings" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/settings")}
            >
              Settings
            </span>
          </Link>
        </div>
        <div className="flex gap-x-2 text-[#222222] text-base font-semibold mb-4">
          <Image src={logoIcon} alt="Logout Icon" />
          <h1 className="font-semibold cursor-pointer">Log Out</h1>
        </div>
      </aside>

      <aside className="px-4 md:hidden py-8 h-screen flex flex-col justify-between w-[80%] lg:hidden overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
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

        <div className="text-[#222222] font-semibold text-sm flex flex-col gap-y-6 mb-48">
          <Link href="/dashboard/markattendance">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/markattendance" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/markattendance")}
            >
              Mark Attendance
            </span>
          </Link>
          <Link href="/dashboard/registerstudent">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/registerstudent" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/registerstudent")}
            >
              Register Students
            </span>
          </Link>
          <Link href="/dashboard/studentlist">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/studentlist" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/studentlist")}
            >
              Student List
            </span>
          </Link>
          <Link href="/dashboard/settings">
            <span
              className={`cursor-pointer ${
                selectedLink === "/dashboard/settings" ? "text-[#F39B3B]" : ""
              }`}
              onClick={() => setSelectedLink("/dashboard/settings")}
            >
              Settings
            </span>
          </Link>
        </div>

        <div className="mb-48 flex gap-x-2 text-[#222222] text-sm font-semibold">
          <Image src={logoIcon} alt="Logout Icon" />
          <h1 className="font-semibold cursor-pointer">Log Out</h1>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
