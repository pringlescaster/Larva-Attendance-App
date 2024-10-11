"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";
import { AuthContext } from "../../../../../context/authContext";

function Page() {
  const { changePassword } = useContext(AuthContext); // Fetch changePassword from context
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const currentPage = "Settings"; // Define the current page
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setFormError(""); // Reset form error

      try {
        // Call the changePassword function from context
        await changePassword(formData.oldPassword, formData.newPassword);
        alert("Password changed successfully");
        router.push("/dashboard/markattendance"); // Redirect after success
      } catch (error) {
        setFormError("Password change failed. Please try again."); // Handle errors from context
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
      setFormError("Please fill in all required fields.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.oldPassword) newErrors.oldPassword = "Please enter your current password.";
    if (!formData.newPassword) newErrors.newPassword = "Please enter a new password.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your new password.";
    return newErrors;
  };

  return (
    <>
      {/* Desktop View */}
      <div className="w-[60%] hidden py-8 gap-y-6 px-8 md:flex flex-col items-center">
        <form className="px-6 password-sm text-sm w-full text-[#333333] grid gap-y-4" onSubmit={handleSubmit}>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          
          <input
            className="w-full text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}

          <input
            className="w-full text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}

          <input
            className="w-full text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button
            type="submit"
            className={`bg-[#f39b3b] mt-6 w-full text-[#ffffff] py-3 px-4 rounded-md transition-opacity duration-300 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Changing Password..." : "Save"}
          </button>
        </form>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar closeSidebar={() => setShowSideBar(false)} currentPage={currentPage} />
        ) : (
          <Navbar openSidebar={() => setShowSideBar(true)} />
        )}
      </div>

      <div className="w-full text-[#333333] h-screen py-8 gap-y-6 px-3 md:hidden flex-col items-center">
        <form className="px-3 password-sm w-full text-[#333333] grid gap-y-4" onSubmit={handleSubmit}>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          
          <input
            className="w-full text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            value={formData.oldPassword}
            onChange={handleChange}
          />

          <input
            className="w-full text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <input
            className="w-full text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            className={`bg-[#f39b3b] mt-6 w-full text-[#ffffff] py-3 px-4 rounded-md transition-opacity duration-300 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Changing Password..." : "Save"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Page;
