// Sidebar Component
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import larvaLogo from "../../../public/assets/larvaLogo.svg";
import logoIcon from "../../../public/assets/logoutIcon.svg";
import profileImage from "../../../public/assets/profileImage.svg";
import closeSideBar from "../../../public/assets/closeSideBar.svg";
import Avatar from "./avatar";
import { AuthContext } from "../../../context/authContext";

function Sidebar({ closeSidebar }) {
  const [selectedLink, setSelectedLink] = useState("");
  const { user, logout } = useContext(AuthContext); // Accessing logout from context

  useEffect(() => {
    setSelectedLink(window.location.pathname);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className=" bg-white px-4 py-6 h-screen md:flex lg:flex hidden flex-col justify-between md:w-[30%] lg:w-[20%] border-r-2 border-r-[#e6e6e6] overflow-y-auto">
        <div className="mb-6">
          <Image className="w-24" src={larvaLogo} alt="Larva Logo" />
        </div>
        <div className="text-[#222222] font-semibold text-sm flex flex-col gap-y-6">
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
        <div className="flex gap-x-2 text-[#222222] text-base font-semibold mb-4" onClick={handleLogout}>
          <Image src={logoIcon} alt="Logout Icon" />
          <h1 className="font-semibold text-sm cursor-pointer">Log Out</h1>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className="px-4 md:hidden py-8 h-screen flex flex-col justify-between w-[80%] lg:hidden overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-x-[8px]">
            <Avatar name={user?.name || 'Anonymous'} />
            <div className="grid gap-y-[2px]">
              <h1 className="text-[#333333] text-base font-semibold text-left">{user?.name || 'Anonymous'}</h1>
              <h2 className="text-[#666666] text-sm font-medium text-left">{user?.course || 'N/A'}</h2>
            </div>
          </div>
          <Image
            className="cursor-pointer"
            src={closeSideBar}
            alt="Close Sidebar Icon"
            onClick={closeSidebar}
          />
        </div>

        <div className="text-[#222222] font-semibold text-sm flex flex-col gap-y-6">
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

        <div className="mb-48 flex gap-x-2 text-[#222222] text-sm font-semibold" onClick={handleLogout}>
          <Image src={logoIcon} alt="Logout Icon" />
          <h1 className="font-semibold cursor-pointer">Log Out</h1>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
