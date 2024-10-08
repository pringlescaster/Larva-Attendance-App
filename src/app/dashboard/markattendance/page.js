"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/authContext.js";
import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import searchIcon from "../../../../public/assets/searchIcon.svg";
import filterIcon from "../../../../public/assets/filterIcn.svg";
import CoursesSelection from "@/app/components/coursesSelection.js";
import CohortSelection from "@/app/components/cohortSelection.js";
import CalendarSelection from "@/app/components/calenderSelection.js";
import axios from "axios";
import Avatar from "@/app/components/avatar.js";

function Page() {
  const { user, logout, error } = useContext(AuthContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [students, setStudents] = useState([]);
  const [notification, setNotification] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const currentPage = "Mark Attendance";

  useEffect(() => {
    const fetchStudents = async () => {
      if (user) {
        try {
          const response = await axios.get("http://localhost:2000/api/v1/students", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          setStudents(response.data);
          const initialAttendanceStatus = {};
          response.data.forEach(student => {
            initialAttendanceStatus[student._id] = null;
          });
          setAttendanceStatus(initialAttendanceStatus);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    fetchStudents();
  }, [user]);

  const markAttendance = async (studentId, status) => {
    try {
      await axios.post("http://localhost:2000/api/v1/attendance", {
        date: selectedDate,
        status: status,
        studentId: studentId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setAttendanceStatus((prevStatus) => ({
        ...prevStatus,
        [studentId]: status,
      }));

      setNotification("Attendance marked successfully!");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("Error marking attendance:", error);
      setNotification("Error marking attendance.");
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearchTerm = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse ? student.course === selectedCourse : true;
    const matchesCohort = selectedCohort ? student.cohort === selectedCohort : true;
    return matchesSearchTerm && matchesCourse && matchesCohort;
  });

  const getButtonStyles = (status, currentStatus) => {
    if (status === currentStatus) {
      switch (status) {
        case "present":
          return "bg-[#4caf50] text-white";
        case "absent":
          return "bg-[#f44336] text-white";
        case "left":
          return "bg-[#ff9800] text-white";
        default:
          return "bg-[#efefef] text-[#222222]";
      }
    }
    return "bg-[#efefef] text-[#222222]";
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAttendanceStatus(prevStatus => {
      const newStatus = {};
      Object.keys(prevStatus).forEach(studentId => {
        newStatus[studentId] = null;
      });
      return newStatus;
    });
  };

  return (
    <>
      {/* Notification Popup */}
      {notification && (
        <div className="fixed bottom-0 right-0 m-4 p-2 bg-green-500 text-white rounded">
          {notification}
        </div>
      )}

      {/* Mobile View - Sidebar toggles with hamburger */}
      <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar closeSidebar={() => setShowSideBar(false)} currentPage={currentPage} />
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
            <h1 className="text-[#1a1a1a] text-center font-semibold">Mark Attendance</h1>
            {error && <p className="text-red-500">{error}</p>}
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
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-start items-start gap-4">
              <CalendarSelection onDateChange={handleDateChange} />
              <CoursesSelection onCourseChange={setSelectedCourse} />
              <CohortSelection onCohortChange={setSelectedCohort} />
            </div>

            {/* Display Students List */}
            <div className="mt-4">
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div key={student._id} className="bg-white rounded-[20px] shadow flex flex-col justify-start items-center gap-2 p-4">
                      <Avatar name={student.name} />
                      <p className="text-[#222222] mt-1 text-sm font-medium">{student.name}</p>
                      <div className="gap-x-2 flex mt-2">
                        <button
                          className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles("present", attendanceStatus[student._id])}`}
                          onClick={() => markAttendance(student._id, "present")}
                        >
                          P
                        </button>
                        <button
                          className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles("absent", attendanceStatus[student._id])}`}
                          onClick={() => markAttendance(student._id, "absent")}
                        >
                          A
                        </button>
                        <button
                          className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles("left", attendanceStatus[student._id])}`}
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
        <h1 className="text-[#1a1a1a] text-center font-semibold">Mark Attendance</h1>
        <div className="flex gap-x-3 rounded-md bg-[#ffffff] pl-6 py-4 w-full border-[1px] border-[#e9e9e9]">
                <Image src={searchIcon} alt="Search Icon" />
                <input
                  className="bg-transparent outline-none h-full w-full text-[#666666] font-base"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
        <CalendarSelection onDateChange={handleDateChange} />
        <CoursesSelection onCourseChange={setSelectedCourse} />
        <CohortSelection onCohortChange={setSelectedCohort} />

        <div className="grid gap-3">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student._id} className="bg-white rounded-[20px] shadow flex flex-col justify-start items-center gap-2 p-4">
                <Avatar name={student.name} />
                <p className="text-[#222222] mt-1 text-sm font-medium">{student.name}</p>
                <div className="gap-x-2 flex mt-2">
                  <button
                    className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles("present", attendanceStatus[student._id])}`}
                    onClick={() => markAttendance(student._id, "present")}
                  >
                    P
                  </button>
                  <button
                    className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles("absent", attendanceStatus[student._id])}`}
                    onClick={() => markAttendance(student._id, "absent")}
                  >
                    A
                  </button>
                  <button
                    className={`text-center rounded-[8px] px-[12px] py-1 ${getButtonStyles("left", attendanceStatus[student._id])}`}
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
    </>
  );
}

export default Page;
