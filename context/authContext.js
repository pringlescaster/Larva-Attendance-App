"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// AuthProvider that wraps the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [loading, setLoading] = useState(true); // Loading state to control when data is ready
  const [error, setError] = useState(null); // Error state for better error handling

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:2000/api/v1/tutor/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setUser(response.data.user);  // Store user data in state
        localStorage.setItem('token', response.data.accessToken); // Save JWT token to local storage
        setError(null); // Clear any previous errors
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials and try again.');
      throw error; // This will bubble up the error to the Login component
    }
  };

  //function to update user's profile

  const updateProfile = async (name, email, course) => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error("No authentication token found. Please log in again");
      }
      const response = await axios.put(
        `http://localhost:2000/api/v1/tutor/profile`,
        {
          name,
          email,
          course,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token for authorization
          },
        }
      )
      
      if (response.status === 200) {
        alert("Profile updated successfully.");
        setError(null); // Clear any errors
      }
    } 
    catch (error) {
      console.error("Profile change failed:", error.response?.data || error.message);
      setError("Profile change failed. Please try again.");
      throw error; // This will allow error handling in the component
    }
  }

  // Function to change the user's password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token from local storage
  
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }
  
      // console.log("Attempting password change with token:", token);
  
      // Make the request to your backend server to change the password
      const response = await axios.put(
        `http://localhost:2000/api/v1/tutor/password`, 
        {
          currentpassword: currentPassword,
          newpassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token for authorization
          },
        }
      );
  
      // console.log("Password change response:", response);
  
      if (response.status === 200) {
        alert("Password updated successfully.");
        setError(null); // Clear any errors
      }
    } catch (error) {
      console.error("Password change failed:", error.response?.data || error.message);
      setError("Password change failed. Please try again.");
      throw error; // This will allow error handling in the component
    }
  };
  
  // Function to handle logout
  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:2000/api/v1/tutor/logout');

      if (response.status === 200) {
        setUser(null); // Clear user state
        localStorage.removeItem('token'); // Clear JWT from local storage
        setError(null);
      }
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      setError('Logout failed. Please try again.');
    }
  };

  const token = localStorage.getItem('token'); // Get JWT token from local storage
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    delete axios.defaults.headers.common['Authorization'];
}


  // Function to load user from local storage (if using JWT)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Set user state based on token
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    login,
    logout,
    changePassword, 
    updateProfile,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
