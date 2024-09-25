import React, { useState, useEffect, useRef } from "react";
import dropdownArrow from "../../../public/assets/dropdownArrow.svg";
import Image from "next/image";

function CohortSelection({ onCohortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Cohort");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onCohortChange) {
      onCohortChange(option); // Call the onCohortChange prop with the selected option
    }
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
  }, []); // Added dependency array to prevent multiple event listeners

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Button with Icon */}
      <button
        onClick={toggleDropdown}
        className="text-[#2c2c2c] justify-between text-[12px] font-semibold bg-white shadow-md px-3 py-3 rounded-sm w-48 flex gap-x-4 items-center"
      >
        <span className="ml-2">{selectedOption}</span>
        <Image src={dropdownArrow} alt="Dropdown Arrow" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 text-sm mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
          style={{ zIndex: 1000 }} // Adjust z-index as needed
        >
          {["1", "2", "3", "4"].map((option) => (
            <button
              key={option}
              onClick={() => selectOption(option)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CohortSelection;
