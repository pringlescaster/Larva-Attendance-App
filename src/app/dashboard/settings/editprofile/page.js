"use client";
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import profilee from '../../../../../public/assets/profilee.svg';
import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';
import Success from '@/app/components/success';
import loading from "../../../../../public/assets/rolling.gif";
import { AuthContext } from '../../../../../context/authContext';

function Page() {
  const { user, updateProfile } = useContext(AuthContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loadingState, setLoadingState] = useState(false); // Only one loading state
  const router = useRouter();

  // Pre-fill the form with the current user's details
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        course: user.course || '',
      });
    }
  }, [user]);

  // Handle input change and set form data
  const handleInputChange = (e) => {
    setIsEditing(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please enter your name.';
    if (!formData.email) newErrors.email = 'Please enter your email.';
    if (!formData.course) newErrors.course = 'Please enter your course.';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoadingState(true); // Correct loading state
      setFormError(''); // Reset form error

      try {
        await updateProfile(formData.name, formData.email, formData.course);
        setShowSuccessModal(true);

        // Automatically close the success modal after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push('/dashboard/markattendance'); // Redirect after success
        }, 3000); // 3 seconds timer

      } catch (error) {
        setFormError('Profile update failed. Please try again.');
      } finally {
        setLoadingState(false); // Ensure loading state is reset
        setIsEditing(false); // Disable edit mode after submission
      }
    } else {
      setErrors(newErrors);
      setFormError('Please fill in all required fields.');
    }
  };

  const currentPage = "Settings"; // Define the current page

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && <Success message="Profile updated successfully!" />}

      {/* Desktop view */}
      <div className="w-[60%] hidden py-8 gap-y-6 px-8 md:flex flex-col items-center">
        <div className="">
          {loadingState ? ( // Show loading GIF when loading
            <Image 
              src={loading} 
              alt="Loading..." 
              className="w-16 mx-auto flex justify-center items-center mt-32 h-16"
            />
          ) : (
            <div className="flex flex-col gap-y-2">
              <Image className="w-[100px]" src={profilee} alt="Profile" />
              <button className="text-[#f39b3b] font-semibold">Change Picture</button>
            </div>
          )}

          <form className="px-6 text-sm w-full grid gap-y-4" onSubmit={handleSubmit}>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <input
              className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
              className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleInputChange}
            />
            {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}

            <button
              type="submit"
              className={`bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base transition-opacity duration-300 ${
                isEditing ? 'opacity-100' : 'opacity-65'
              }`}
              disabled={loadingState || !isEditing} // Disable button when loading or no edits
            >
              {loadingState ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex md:hidden">
        {showSideBar ? (
          <Sidebar closeSidebar={() => setShowSideBar(false)} currentPage={currentPage} />
        ) : (
          <Navbar openSidebar={() => setShowSideBar(true)} />
        )}
      </div>
      <div className="w-full h-screen py-8 gap-y-6 px-3 md:hidden flex-col items-center">
        <div className="flex flex-col gap-y-2">
          <Image className="w-[80px] mx-auto" src={profilee} alt="Profile" />
          <button className="text-[#f39b3b] font-semibold">Change Picture</button>
        </div>
        <form className="px-3 text-sm w-full pt-10 grid gap-y-4" onSubmit={handleSubmit}>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <input
            className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="w-full rounded-lg outline-[#F39B3B] text-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className={`bg-[#f39b3b] mt-6 w-full py-3 px-4 rounded-md text-white text-md font-base transition-opacity duration-300 ${
              isEditing ? 'opacity-100' : 'opacity-65'
            }`}
            disabled={loadingState || !isEditing} // Disable button when loading or no edits
          >
            {loadingState ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Page;
