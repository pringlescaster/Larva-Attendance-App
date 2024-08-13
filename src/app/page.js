"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import larvaLogo from "../../public/assets/larvaLogo.svg";
import emailLogo from "../../public/assets/emailLogo.svg";
import passwordIcon from "../../public/assets/passwordIcon.svg";
import loginImage from "../../public/assets/loginImage.svg";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // To handle errors
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  // e.preventDefault stops the page from reloading
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted", formData);
      setFormError("");
    } else {
      setErrors(newErrors);
      setFormError("Please fill in all required fields");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Please enter your email";
    if (!formData.password) newErrors.password = "Please enter your password";
    return newErrors;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:gap-x-16 bg-white">
      <div className="grid px-4 md:px-48 items-center lg:pt-10 md:pt-48 lg:px-20 gap-y-12 py-10">
        <div className="grid gap-y-2 text-center md:text-left">
          <Image className="w-24 md:w-40" src={larvaLogo} alt="Larva Logo" />
          <h1 className="text-[#111111] font-bold text-left text-[18px] md:text-[22px]">
            Log in to your Account
          </h1>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          {formError && <p className="text-red-500 relative bottom-4 text-sm">{formError}</p>}
          <div className="grid gap-y-4">
            <div className={`w-full flex items-center gap-x-3 px-4 py-[12px] border-2 rounded-[10px] bg-[#f9f9f9] border-[#D3D3D3] hover:border-[#F39B3B] ${errors.email ? 'border-red-500' : ''}`}>
              <Image className="w-[18px]" src={emailLogo} alt="Email Icon" />
              <input
                className="outline-none bg-transparent text-[#222222] text-[16px] flex-1"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={`w-full flex items-center gap-x-3 px-4 py-[12px] border-2 rounded-[10px] bg-[#f9f9f9] border-[#D3D3D3] hover:border-[#F39B3B] ${errors.password ? 'border-red-500' : ''}`}>
              <Image className="w-[16px]" src={passwordIcon} alt="Password Icon" />
              <input
                className="outline-none bg-transparent text-[#222222] text-[16px] flex-1"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid gap-y-4">
            <Link href="/dashboard/markattendance">
              <button className="mt-10 bg-[#F39B3B] text-white font-semibold text-[16px] px-4 py-[14px] w-full rounded-lg" type="submit">
                Log In as Tutor
              </button>
            </Link>
            <button className="bg-[#1E1206] text-white font-semibold text-[16px] px-4 py-[14px] w-full rounded-lg">
              Log In as Super Admin
            </button>
          </div>
        </form>
      </div>
      <div className="w-full hidden md:hidden lg:block">
        <Image src={loginImage} alt="Login Image" />
      </div>
    </div>
  );
}
