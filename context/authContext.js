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
      const response = await axios.post('https://larva-attendance-app-server.vercel.app/api/v1/tutor/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setUser(response.data.user);  // Store user data in state
        localStorage.setItem('token', response.data.accessToken); // Save JWT token to local storage
        setError(null); // Clear any previous errors
        await loadProfile();
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials and try again.');
      throw error; // This will bubble up the error to the Login component
    }
  };

  // Function to update user's profile
  const updateProfile = async (name, email, course) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found. Please log in again");
      }
      const response = await axios.put(
        'https://larva-attendance-app-server.vercel.app/api/v1/tutor/profile',
        { name, email, course },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setUser({ ...user, name, email, course }); 
        alert("Profile updated successfully.");
        setError(null); // Clear any errors
      }
    } catch (error) {
      console.error("Profile change failed:", error.response?.data || error.message);
      setError("Profile change failed. Please try again.");
      throw error; // This will allow error handling in the component
    }
  };

  // Function to load user profile
  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.get('https://larva-attendance-app-server.vercel.app/api/v1/tutor/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Profile response:', response.data); // Check the response data

      if (response.status === 200) {
        console.log('Loading profile for user:', response.data); // Log the entire user object
        setUser(response.data); // Set user data directly from response
      }
    } catch (error) {
      console.error("Failed to load profile:", error.response?.data || error.message);
      setError("Failed to load profile. Please try again.");
    }
  };

  // Function to change the user's password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const response = await axios.put(
        'https://larva-attendance-app-server.vercel.app/api/v1/tutor/password', 
        { currentpassword: currentPassword, newpassword: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
      const response = await axios.post("https://larva-attendance-app-server.vercel.app/api/v1/tutor/logout");

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

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
      loadProfile(); // Set user state based on token
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    login,
    logout,
    changePassword, 
    updateProfile,
    loadProfile,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
