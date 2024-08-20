// Import necessary React hooks and libraries
import React, { useState, useRef, useEffect } from 'react'; // React hooks
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import DatePicker from 'react-datepicker'; // Import DatePicker component
import Image from 'next/image'; // Import Image component from Next.js for optimized images
import dropdownArrow from "../../../public/assets/dropdownArrow.svg"; // Import dropdown arrow icon


// Define the CalendarSelection component
function CalendarSelection() {
  // State to manage whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Ref to attach to the dropdown container for click outside detection
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state between true and false
  };

  // Function to handle date selection from the DatePicker
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
    setIsOpen(false); // Close the dropdown after selecting a date
  };

  // Function to handle clicks outside the dropdown to close it
  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdownRef
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown
    }
  };

  // useEffect hook to add and remove the event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Add event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  // Render the component
  return (
    <div ref={dropdownRef} className='relative inline-block text-left'>
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleDropdown} // Toggle dropdown visibility on click
        className="text-[#2c2c2c] justify-between text-[12px] font-semibold bg-white shadow-md px-3 py-3 rounded-sm w-48 flex gap-x-4 items-center"
      >
        {/* Display selected date or placeholder text */}
        <span className='ml-2'>
          {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
        </span>
        {/* Dropdown arrow icon */}
        <Image src={dropdownArrow} alt="Dropdown Arrow" />
      </button>
      {/* Conditionally render the DatePicker if the dropdown is open */}
      {isOpen && (
        <div className="absolute right- mt-2 bg-white border rounded-md shadow-md z-10">
          <DatePicker className='bg-black'
            selected={selectedDate} // Pass the selected date to DatePicker
            onChange={handleDateChange} // Update date on change
            inline // Display the calendar inline
          />
        </div>
      )}
    </div>
  );
}

export default CalendarSelection; // Export the component for use in other files

