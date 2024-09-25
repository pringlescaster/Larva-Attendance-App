"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import SettingSec from "@/app/components/settingSec";
import EditProfile from "@/app/components/editProfile";
import ChangePassword from "@/app/components/changePassword";

function Page() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const currentPage = "Settings";

  // Function to handle editing profile
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setIsChangingPassword(false);
  };

  // Function to handle changing password
  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setIsEditingProfile(false);
  };

  return (
    <>
      {/* Mobile view */}
      <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar
            closeSidebar={() => setShowSideBar(false)}
            currentPage={currentPage}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              zIndex: 1000, // Ensure it stays on top
            }}
          />
        ) : (
          <Navbar openSidebar={() => setShowSideBar(true)} />
        )}
      </div>

      {!showSideBar && (
        <div className="md:hidden flex flex-col px-3 w-full">
          <h1 className="text-[#1a1a1a] text-center font-semibold">Settings</h1>
          <div className="flex py-8 flex-col gap-y-3">
            <Link href="/dashboard/settings/editprofile">
              <button
                className="py-4 pl-4 font-semibold w-full bg-[#E2E2E2] text-[#333333] text-left text-sm rounded-md"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </Link>
            <Link href="/dashboard/settings/changepassword">
              <button
                className="py-4 pl-4 font-semibold w-full bg-[#E2E2E2] text-[#333333] text-left text-sm rounded-md"
                onClick={handleChangePassword}
              >
                Change Your Password
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Desktop View - Sidebar always visible */}
      <div className="hidden md:flex h-screen">
        <Sidebar currentPage={currentPage} />
        <div className="flex-grow overflow-x-hidden">
          <Navbar />
          <div className="py-5 border-b-2 border-[#e9e9e9] px-8 bg-[#FAF9F9]">
            <h1 className="text-[#1a1a1a] text-center font-semibold">Settings</h1>
          </div>
          <div className="flex bg-[#FAF9F9] h-full">
            <SettingSec 
              onEditProfileClick={handleEditProfile}  
              onChangePassword={handleChangePassword}
            />
            {isEditingProfile && <EditProfile />}
            {isChangingPassword && <ChangePassword />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
