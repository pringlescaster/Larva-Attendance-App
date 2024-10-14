import React, { useState, useRef, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import DatePicker from 'react-datepicker'; // Import DatePicker component
import Image from 'next/image'; // Import Image component from Next.js for optimized images
import dropdownArrow from "../../../public/assets/dropdownArrow.svg"; // Import dropdown arrow icon

// Define the CalendarSelection component
function CalendarSelection({ onDateChange }) {
  // Set the current date as the default selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state between true and false
  };

  // Function to handle date selection from the DatePicker
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
    setIsOpen(false); // Close the dropdown after selecting a date
    onDateChange(date); // Call the parent component's onDateChange function with the selected date
  };

  // Function to handle clicks outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return (
    <div ref={dropdownRef} className='relative inline-block text-left'>
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleDropdown}
        className="text-[#666666] justify-between text-[12px] font-semibold bg-white border-[#e9e9e9] border-[1px] px-3 py-3 rounded-lg flex gap-x-4 items-center"
      >
        {/* Display the selected date or the current date by default */}
        <span className='ml-2'>
          {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
        </span>
        {/* Dropdown arrow icon */}
        <Image src={dropdownArrow} alt="Dropdown Arrow" />
      </button>
      {/* Conditionally render the DatePicker if the dropdown is open */}
      {isOpen && (
        <div className="absolute left-0 md:right-0 mt-2 bg-white border rounded-md z-50">
          <DatePicker
            selected={selectedDate} // Pass the selected date to DatePicker
            onChange={handleDateChange} // Update date on change
            inline // Display the calendar inline
          />
        </div>
      )}
    </div>
  );
}

export default CalendarSelection;
