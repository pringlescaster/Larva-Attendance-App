import React, { useState, useEffect, useRef } from "react";
import dropdownArrow from "../../../public/assets/dropdownArrow.svg";
import Image from "next/image";

function BulkSelection({ onBulkFilterChange, students, setAttendanceStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Bulk Selection");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onBulkFilterChange) {
      onBulkFilterChange(option); // Call the onBulkFilterChange prop with the selected option
      handleBulkAction(option); // Apply the bulk action
    }
  };

  const handleBulkAction = (action) => {
    const updatedStatus = {};
    students.forEach(student => {
      updatedStatus[student._id] = action === "Mark all as present" ? "present" :
                                   action === "Mark all as absent" ? "absent" : "left";
    });
    setAttendanceStatus(prevStatus => ({ ...prevStatus, ...updatedStatus }));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-[#2c2c2c] justify-between text-[12px] font-semibold bg-white shadow-md px-3 py-3 rounded-sm w-48 flex gap-x-4 items-center"
      >
        <span className="ml-2">{selectedOption}</span>
        <Image src={dropdownArrow} alt="Filter Icon" className="" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 text-sm mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <button
            onClick={() => selectOption("Mark all as present")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Mark all as present
          </button>
          <button
            onClick={() => selectOption("Mark all as absent")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Mark all as absent
          </button>
          <button
            onClick={() => selectOption("Mark all as left")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Mark all as left
          </button>
        </div>
      )}
    </div>
  );
}

export default BulkSelection;
