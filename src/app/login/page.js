"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/authContext"; // Adjust the path as needed
import larvaLogo from "../../../public/assets/larvaLogo.svg";
import emailLogo from "../../../public/assets/emailLogo.svg";
import passwordIcon from "../../../public/assets/passwordIcon.svg";
import loginImage from "../../../public/assets/loginImage.svg";

export default function Login() {
  const { login, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length === 0) {
    setIsLoading(true); // Set loading state to true
    try {
      await login(formData.email, formData.password);
      router.push("/dashboard/markattendance");
    } catch (error) {
      setFormError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  } else {
    setErrors(newErrors);
    setFormError("Please fill in all required fields.");
  }
};

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Please enter your email.";
    if (!formData.password) newErrors.password = "Please enter your password.";
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
            <div className={`w-full flex items-center gap-x-3 px-4 py-[12px] border-2 rounded-[10px] bg-[#f9f9f9] border-[#D3D3D3] hover:border-[#F39B3B] ${errors.email ? "border-red-500" : ""}`}>
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <div className={`w-full flex items-center gap-x-3 px-4 py-[12px] border-2 rounded-[10px] bg-[#f9f9f9] border-[#D3D3D3] hover:border-[#F39B3B] ${errors.password ? "border-red-500" : ""}`}>
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="grid gap-y-4">
          <button
  className="mt-10 bg-[#F39B3B] text-white font-semibold text-[16px] px-4 py-[14px] w-full rounded-lg"
  type="submit"
  disabled={isLoading} // Disable when loading
>
  {isLoading ? "Logging In..." : "Log In as Tutor"}
</button>

            <button
              className="bg-[#1E1206] text-white font-semibold text-[16px] px-4 py-[14px] w-full rounded-lg"
              type="button"
              onClick={() => router.push("/admin-login")}
            >
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
