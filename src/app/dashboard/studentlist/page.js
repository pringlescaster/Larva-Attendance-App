"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import Sidebar from "@/app/components/sidebar";
import { AuthContext } from "../../../../context/authContext";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import searchIcon from "../../../../public/assets/searchIcon.svg";
import filterIcon from "../../../../public/assets/filterIcn.svg";
import CalenderSelection from "@/app/components/calenderSelection";
import CohortSelection from "@/app/components/cohortSelection";
import CoursesSelection from "@/app/components/coursesSelection";
import axios from "axios";

function Page() {
  const { user, logout, error } = useContext(AuthContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const currentPage = "Student Attendance";

  useEffect(() => {
    const fetchStudents = async () => {
      if (user) {
        try {
          const response = await axios.get(
            "http://localhost:2000/api/v1/students",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          setStudents(response.data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };
    fetchStudents();
  }, [user]);

  const filteredStudents = students.filter((student) => {
    const matchesSearchTerm = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse
      ? student.course === selectedCourse
      : true;
    const matchesCohort = selectedCohort
      ? student.cohort === selectedCohort
      : true;
    return matchesSearchTerm && matchesCourse && matchesCohort;
  });

  return (
    <>
      <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar
            closeSidebar={() => setShowSideBar(false)}
            currentPage="Student List"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              zIndex: 1000,
            }}
          />
        ) : (
          <Navbar openSidebar={() => setShowSideBar(true)} />
        )}
      </div>

      <div className="hidden md:flex">
        <Sidebar currentPage="Student List" />
        <div className="flex-grow overflow-x-hidden">
          <Navbar />
          <div className="py-[20px] px-8 bg-[#FAF9F9] gap-y-4 grid">
            <h1 className="text-[#1a1a1a] text-center font-semibold">
              Student List
            </h1>
            <div className="flex justify-between">
              <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6 py-4 w-[90%] border-[1px] border-[#e9e9e9]">
                <Image src={searchIcon} alt="Search Icon" />
                <input
                  className="bg-transparent outline-none h-full w-full text-[#666666] font-base"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Image src={filterIcon} alt="Filter Icon" />
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-start gap-x-8 items-start gap-4">
              
              <CoursesSelection onCourseChange={setSelectedCourse} />
              <CohortSelection onCohortChange={setSelectedCohort} />
            </div>
           
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="text-black">
                      <th className="border-b px-4 py-2 text-left">Name</th>
                      <th className="border-b px-4 py-2 text-left">Course</th>
                      <th className="border-b px-4 py-2 text-left">Cohort</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr className="text-black" key={student._id}>
                        <td className="border-b px-4 py-2">{student.name}</td>
                        <td className="border-b px-4 py-2">{student.course}</td>
                        <td className="border-b px-4 py-2">{student.cohort}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>

      {!showSideBar && (
        <div className="flex md:hidden flex-col px-4 gap-y-4">
          <h1 className="text-[#1a1a1a] text-center font-semibold">
            Student List
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6 py-4 w-[90%] border-[1px] border-[#e9e9e9]">
              <Image src={searchIcon} alt="Search Icon" />
              <input
                className="bg-transparent outline-none h-full w-full text-[#666666] font-base"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Image src={filterIcon} alt="Filter Icon" />
          </div>
          <div className="flex flex-col gap-3 items-start">
            
            <CoursesSelection onCourseChange={setSelectedCourse} />
            <CohortSelection onCohortChange={setSelectedCohort} />
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="text-black">
                  <th className="border-b px-4 py-2 text-left">Name</th>
                  <th className="border-b px-4 py-2 text-left">Course</th>
                  <th className="border-b px-4 py-2 text-left">Cohort</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr className="text-black" key={student._id}>
                    <td className="border-b px-4 py-2">{student.name}</td>
                    <td className="border-b px-4 py-2">{student.course}</td>
                    <td className="border-b px-4 py-2">{student.cohort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
