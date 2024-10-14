import React from 'react';

function Avatar({ name, size = 12 }) { // Add size prop with a default value of 12 (for 48px size)

  // Get the first letter of the name, convert to uppercase, or return empty string if no name is provided
  const firstLetter = name ? name.charAt(0).toUpperCase() : '';

  // Function to generate a random color based on the first letter (using a hashing algorithm)
  const getRandomColor = (name) => {
    let hash = 0; // Variable to store the hash value

    // Loop through each character of the name to calculate the hash value
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash); // Generate a hash using character codes
    }

    // Return HSL color based on the calculated hash value
    return `hsl(${hash % 360}, 70%, 50%)`; // % 360 ensures the hue is within the valid color range
  };

  return (
    <div
      className='flex items-center justify-center rounded-full font-bold text-white'
      style={{
        width: `${size * 4}px`, // Adjust width based on the size prop
        height: `${size * 4}px`, // Adjust height based on the size prop
        fontSize: `${size * 1.5}px`, // Adjust font size based on the size prop
        backgroundColor: getRandomColor(name), // Set background color based on name
      }}
    >
      {firstLetter} {/* Display the first letter */}
    </div>
  );
}

export default Avatar;
