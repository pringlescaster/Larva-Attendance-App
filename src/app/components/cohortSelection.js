import React, { useState, useEffect, useRef } from "react";
import dropdownArrow from "../../../public/assets/dropdownArrow.svg";
import Image from "next/image";

function CohortSelection({ onCohortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Cohort");
  const dropdownRef = useRef(null);
  const [cohorts, setCohorts] = useState([]); // State for cohorts

  // Fetch cohorts data (you can replace this with your API call)
  useEffect(() => {
    const fetchCohorts = async () => {
      const fetchedCohorts = ["Cohort 1", "Cohort 2", "Cohort 3", "Cohort 4"];
      setCohorts(fetchedCohorts);
    };
    fetchCohorts();
  }, []);

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
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Button with Icon */}
      <button
        onClick={toggleDropdown}
        className="text-[#666666] justify-between text-[12px] font-semibold bg-white border-[#e9e9e9] border-[1px] px-3 py-3 rounded-lg flex gap-x-4 items-center"
      >
        <span className="ml-2">{selectedOption}</span>
        <Image src={dropdownArrow} alt="Dropdown Arrow" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute md:right-0 left-0  text-sm text-left mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
          style={{ zIndex: 1000 }} // Adjust z-index as needed
        >
          {cohorts.map((cohort) => (
            <button
              key={cohort}
              onClick={() => selectOption(cohort)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              {cohort}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CohortSelection;
