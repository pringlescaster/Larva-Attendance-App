"use client";

import React, { useState, useContext } from "react";
import { AuthContext } from "../../../../context/authContext";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import registerProfile from "../../../../public/assets/registerProfile.svg";
import axios from "axios";

function Page() {
  const { user, logout, error } = useContext(AuthContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [ notification, setNotification] = useState("");
  const [studentData, setStudentData] = useState({
    name: "",
    studentnumber: "",
    course: "",
    cohort: "",
  });
  const currentPage = "Register Student";
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      setMessage("Check your internet connection");
      return;
    }

  try {
    const response = await axios.post(
      "http://localhost:2000/api/v1/student/register",
      studentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      setMessage ("Student registerd successfully");
      setStudentData({  name: "",
        studentnumber: "",
        course: "",
        cohort: "",
      });
    }
    else { 
      setMessage(response.data.message || " Error registering student");
    }
  } catch (error) {
    console.error("Error registering student:", error);
    setMessage("Error registering student");
  }
};
    

  return (
    <>
      {/* Mobile View - Sidebar toggles with hamburger */}
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

      {/* Desktop View - Sidebar always visible */}
      <div className="hidden md:flex">
        <Sidebar currentPage={currentPage} />
        <div className="flex-grow overflow-x-hidden">
          <Navbar />
          <div className="py-5 border-b-2 border-[#e9e9e9] px-8 bg-[#FAF9F9]">
            <h1 className="text-[#1a1a1a] text-center font-semibold">
              Register Students
            </h1>
          </div>
          <div className="bg-[#FAF9F9]">
            <div className="py-8 gap-y-4 px-8 flex flex-col items-center max-w-lg mx-auto">
              <div className="flex flex-col gap-y-2">
                <Image
                  className="w-[120px]"
                  src={registerProfile}
                  alt="Register Profile"
                />
                <button className="text-[#f39b3b] font-semibold">
                  Add Photo
                </button>
              </div>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <input
                  className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                />
                <input
                  className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                  type="number"
                  name="studentnumber"
                  value={studentData.studentnumber}
                  onChange={handleChange}
                  placeholder="Student Number"
                  required
                />
                <input
                  className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                  type="text"
                  name="course"
                  value={studentData.course}
                  onChange={handleChange}
                  placeholder="Course"
                  required
                />
                <input
                  className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
                  type="text"
                  name="cohort"
                  value={studentData.cohort}
                  onChange={handleChange}
                  placeholder="Cohort"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base"
                >
                  Register Student
                </button>
              </form>
              {message && <p className="text-center mt-4">{message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Registration Form */}
      <div className="md:hidden flex flex-col px-4 gap-y-4">
        <h1 className="text-[#1a1a1a] text-center font-semibold">
          Register Students
        </h1>
        <div className="py-8 gap-y-6 px-8 flex flex-col items-center">
          <div className="flex flex-col gap-y-2">
            <Image
              className="w-[100px]"
              src={registerProfile}
              alt="Register Profile"
            />
            <button className="text-[#f39b3b] font-semibold">Add Photo</button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="px-4 text-sm w-screen grid gap-y-4"
          >
            <input
              className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
              type="number"
              name="studentnumber"
              value={studentData.studentnumber}
              onChange={handleChange}
              placeholder="Student Number"
              required
            />
            <input
              className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
              type="text"
              name="course"
              value={studentData.course}
              onChange={handleChange}
              placeholder="Course"
              required
            />
            <input
              className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
              type="text"
              name="cohort"
              value={studentData.cohort}
              onChange={handleChange}
              placeholder="Cohort"
              required
            />
            <button
              type="submit"
              className="bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base"
            >
              Register Student
            </button>
          </form>
          {message && <p className="text-center mt-4">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Page;
