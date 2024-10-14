import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/authContext';

function ChangePassword() {
  const { changePassword } = useContext(AuthContext); // Fetch the changePassword function from AuthContext
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        // Call the changePassword function from the context
        await changePassword(formData.oldPassword, formData.newPassword);
        alert('Password changed successfully');
        router.push("/dashboard/markattendance"); // Redirect after success
      } catch (error) {
        setFormError('Password change failed. Please try again.'); // Handle errors from AuthContext
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
    <form className="w-[60%] items-center flex flex-col gap-y-4 px-8 py-8 password-sm text-[#333333]" onSubmit={handleSubmit}>
      {formError && <p className="text-red-500 relative bottom-4 text-sm">{formError}</p>}
      
      <input
        className="w-full text-sm text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
        type="password"
        name="oldPassword"
        placeholder="Current Password"
        value={formData.oldPassword}
        onChange={handleChange}
      />
      {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword}</p>}

      <input
        className="w-full text-sm text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
      />
      {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}

      <input
        className="w-full text-sm text-[#333333] rounded-lg outline-[#F39B3B] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

      <button
        className="bg-[#F39B3B] mt-6 w-full font-medium text-white text-sm rounded-lg px-4 py-3"
        type="submit"
        disabled={isLoading} // Disable when loading
      >
        {isLoading ? "Changing Password..." : "Change Password"}
      </button>
    </form>
  );
}

export default ChangePassword;
