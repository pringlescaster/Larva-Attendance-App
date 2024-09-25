"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/authContext.js"; // Adjust the import path as necessary
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import searchIcon from "../../../../public/assets/searchIcon.svg";
import filterIcon from "../../../../public/assets/filterIcn.svg";
import CoursesSelection from "@/app/components/coursesSelection";
import CohortSelection from "@/app/components/cohortSelection";
import BulkSelection from "@/app/components/bulkSelection";
import CalenderSelection from "@/app/components/calenderSelection";
import axios from "axios"; // Import Axios
import Avatar from "@/app/components/avatar.js";

function Page() {
  const { user, logout, error } = useContext(AuthContext); // Access AuthContext
  const [showSideBar, setShowSideBar] = useState(false);
  const [students, setStudents] = useState([]);
  const [notification, setNotification] = useState(""); // State for notification message
  const currentPage = "Mark Attendance";
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  useEffect(() => {
    const fetchStudents = async () => {
      if (user) {
        // Check if user is logged in
        try {
          const response = await axios.get(
            "http://localhost:2000/api/v1/students",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token from localStorage
                "Content-Type": "application/json", // Specify content type if needed
              },
            }
          );
          setStudents(response.data); // Assuming the API returns an array of students
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [user]); // Depend on user to fetch students when user state changes

  const markAttendance = async (studentId, status) => {
    try {
      await axios.post(
        "http://localhost:2000/api/v1/attendance",
        {
          date: currentDate,
          status: status,
          studentId: studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update student attendance status in state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, attendanceStatus: status } // Create a new object with updated status
            : student // Return unchanged student object
        )
      );

      setNotification("Attendance marked successfully!");
      setTimeout(() => {
        setNotification(""); // Clear notification after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error marking attendance:", error);
      setNotification("Error marking attendance."); // Set notification for error
    }
  };

  // Function to get button styles based on attendance status
  const getButtonStyles = (status, currentStatus) => {
    if (status === currentStatus) {
      switch (status) {
        case "present":
          return "bg-[#4caf50] text-white"; // Green for Present
        case "absent":
          return "bg-[#f44336] text-white"; // Red for Absent
        case "left":
          return "bg-[#ff9800] text-white"; // Yellow for Left
        default:
          return "bg-[#efefef] text-[#222222]"; // Default style
      }
    }
    return "bg-[#efefef] text-[#222222]"; // Default style for unselected buttons
  };

  return (
    <>
      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-0 right-0 m-4 p-2 bg-green-500 text-white rounded">
          {notification}
        </div>
      )}

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
          <div className="py-[20px] px-8 bg-[#FAF9F9] gap-y-4 grid">
            <h1 className="text-[#1a1a1a] text-center font-semibold">
              Mark Attendance
            </h1>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error message if any */}
            <div className="flex justify-between">
              <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6 py-4 w-[90%] border-[1px] border-[#e9e9e9]">
                <Image src={searchIcon} alt="Search Icon" />
                <input
                  className="bg-transparent outline-none h-full w-full text-[#666666] font-base"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <Image src={filterIcon} alt="Filter Icon" />
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-start items-start gap-4">
              <CalenderSelection />
              <CoursesSelection />
              <CohortSelection />
              <BulkSelection />
            </div>
            {/* Display Students List */}
            <div className="mt-4">
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {students.length > 0 ? (
                  students.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white rounded-[20px] shadow flex flex-col justify-start items-center gap-2 p-4"
                    >
                      {/* Added padding */}
                      <Avatar name={student.name} />
                      <p className="text-[#222222] mt-1 text-sm font-medium">
                        {student.name}
                      </p>
                      <div className="gap-x-2 flex mt-2">
                        <button
                          className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles(
                            "present",
                            student.attendanceStatus
                          )}`}
                          onClick={() => markAttendance(student._id, "present")}
                        >
                          P
                        </button>
                        <button
                          className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles(
                            "absent",
                            student.attendanceStatus
                          )}`}
                          onClick={() => markAttendance(student._id, "absent")}
                        >
                          A
                        </button>
                        <button
                          className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles(
                            "left",
                            student.attendanceStatus
                          )}`}
                          onClick={() => markAttendance(student._id, "left")}
                        >
                          L
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <li>No students found</li>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Content */}
      <div className="flex md:hidden flex-col px-4 gap-y-4">
        <h1 className="text-[#1a1a1a] text-center font-semibold">
          Mark Attendance
        </h1>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message if any */}
        <div className="flex justify-between">
          <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6 py-4 w-[90%] border-[1px] border-[#e9e9e9]">
            <Image src={searchIcon} alt="Search Icon" />
            <input
              className="bg-transparent outline-none h-full w-full text-[#666666] font-base"
              type="text"
              placeholder="Search"
            />
          </div>
          <Image src={filterIcon} alt="Filter Icon" />
        </div>
        <div className="flex flex-col gap-3 items-start">
          <CalenderSelection />
          <CoursesSelection />
          <CohortSelection />
          <BulkSelection />
        </div>
        {/* Mobile Students List */}
        <div className="mt-4">
          <h2 className="text-[#1a1a1a] font-semibold">Students List</h2>
          <ul className="flex flex-col gap-3">
            {students.length > 0 ? (
              students.map((student) => (
                <li
                  key={student.id}
                  className="bg-white rounded-[20px] shadow flex flex-col justify-start items-center gap-2 p-4"
                >
                  <Avatar name={student.name} />
                  <p className="text-[#222222] mt-1 text-sm font-medium">
                    {student.name}
                  </p>
                  <div className="flex gap-x-2 mt-1">
                    <button
                      className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles(
                        "present",
                        student.attendanceStatus
                      )}`}
                      onClick={() => markAttendance(student._id, "present")}
                    >
                      P
                    </button>
                    <button
                      className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles(
                        "absent",
                        student.attendanceStatus
                      )}`}
                      onClick={() => markAttendance(student._id, "absent")}
                    >
                      A
                    </button>
                    <button
                      className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles(
                        "left",
                        student.attendanceStatus
                      )}`}
                      onClick={() => markAttendance(student._id, "left")}
                    >
                      L
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>No students found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Page;
