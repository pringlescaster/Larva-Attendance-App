import React, { useState, useEffect, useRef } from "react";
import dropdownArrow from "../../../public/assets/dropdownArrow.svg";
import Image from "next/image";


function coursesSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Course");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
    }
  };

  useEffect(()=>{
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  })

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Button with Icon */}
      <button
        onClick={toggleDropdown}
        className=" text-[#2c2c2c] justify-between text-[12px] font-semibold bg-white shadow-md px-3 py-3 rounded-sm w-48 flex gap-x-4 items-center"
      >
          <span className="ml-2">{selectedOption}</span>
        <Image src={dropdownArrow} alt="Filter Icon" className="" />
      
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 text-sm mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
        <button
          onClick={() => selectOption('Cybersecurity')}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Cybersecurity
        </button>
        <button
          onClick={() => selectOption('Frontend Development')}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Frontend Development
        </button>
        <button
          onClick={() => selectOption('Backend Development')}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Backend Development
        </button>
        <button
          onClick={() => selectOption('Mobile Development')}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Mobile Development
        </button>
        <button
          onClick={() => selectOption('Mobile Development')}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          UIUX Design
        </button>
        <button
          onClick={() => selectOption('Data Science')}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          Data Science
        </button>
      </div>
      )}
    </div>
  );
}

export default coursesSelection;
