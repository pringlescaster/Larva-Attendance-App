"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/app/components/sidebar';
import Image from 'next/image';
import Navbar from '@/app/components/navbar';
import searchIcon from "../../../../public/assets/searchIcon.svg";
import filterIcon from "../../../../public/assets/filterIcn.svg";
import CalenderSelection from "@/app/components/calenderSelection";
import CohortSelection from "@/app/components/cohortSelection";
import CoursesSelection from "@/app/components/coursesSelection";
import axios from 'axios';

function Page() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Authentication token not found.");
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:2000/students", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error("Loading:", error);
      setError("Loading");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterStudents(query, selectedDate, selectedCohort, selectedCourse);
  };

  const filterStudents = (query, date, cohort, course) => {
    let filtered = students;

    if (query) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(query)
      );
    }

    if (date) {
      filtered = filtered.filter((student) =>
        student.attendanceDate === date
      );
    }

    if (cohort) {
      filtered = filtered.filter((student) =>
        student.cohort === cohort
      );
    }

    if (course) {
      filtered = filtered.filter((student) =>
        student.course === course
      );
    }

    setFilteredStudents(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterStudents(searchQuery, date, selectedCohort, selectedCourse);
  };

  const handleCohortChange = (cohort) => {
    setSelectedCohort(cohort);
    filterStudents(searchQuery, selectedDate, cohort, selectedCourse);
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    filterStudents(searchQuery, selectedDate, selectedCohort, course);
  };

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
            <h1 className="text-[#1a1a1a] text-center font-semibold">Student List</h1>
            <div className="flex justify-between">
              <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6 py-4 w-[90%] border-[1px] border-[#e9e9e9]">
                <Image src={searchIcon} alt="Search Icon" />
                <input
                  className="bg-transparent outline-none h-full w-full text-[#666666] font-base"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Image src={filterIcon} alt="Filter Icon" />
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-start gap-x-8 items-start gap-4">
              <CalenderSelection onDateChange={handleDateChange} />
              <CoursesSelection onCourseChange={handleCourseChange} />
              <CohortSelection onCohortChange={handleCohortChange} />
            </div>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className='text-black'>
                      <th className="border-b px-4 py-2 text-left">Name</th>
                      <th className="border-b px-4 py-2 text-left">Course</th>
                      <th className="border-b px-4 py-2 text-left">Cohort</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr className='text-black' key={student._id}>
                        <td className="border-b px-4 py-2">{student.name}</td>
                        <td className="border-b px-4 py-2">{student.course}</td>
                        <td className="border-b px-4 py-2">{student.cohort}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {!showSideBar && (
        <div className="flex md:hidden flex-col px-4 gap-y-4">
          <h1 className="text-[#1a1a1a] text-center font-semibold">Student List</h1>
          <div className="flex justify-between">
            <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6 py-4 w-[90%] border-[1px] border-[#e9e9e9]">
              <Image src={searchIcon} alt="Search Icon" />
              <input
                className="bg-transparent outline-none h-full w-full text-[#666666] font-base"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Image src={filterIcon} alt="Filter Icon" />
          </div>
          <div className="flex flex-col gap-3 items-start">
            <CalenderSelection onDateChange={handleDateChange} />
            <CoursesSelection onCourseChange={handleCourseChange} />
            <CohortSelection onCohortChange={handleCohortChange} />
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className='text-black'>
                  <th className="border-b px-4 py-2 text-left">Name</th>
                  <th className="border-b px-4 py-2 text-left">Course</th>
                  <th className="border-b px-4 py-2 text-left">Cohort</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr className='text-black' key={student._id}>
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
