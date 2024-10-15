import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/authContext';
import Image from 'next/image';
import profilee from '../../../public/assets/profilee.svg';

function EditProfile() {
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      setFormError(''); // Reset form error

      try {
        await updateProfile(formData.name, formData.email, formData.course);
        alert('Profile updated successfully');
        router.push('/dashboard/markattendance'); // Redirect after success
      } catch (error) {
        setFormError('Profile update failed. Please try again.');
      } finally {
        setIsLoading(false);
        setIsEditing(false); // Disable edit mode after submission
      }
    } else {
      setErrors(newErrors);
      setFormError('Please fill in all required fields.');
    }
  };

  return (
    <div className="w-[60%] py-8 gap-y-6 px-8 flex flex-col items-center">
      <div className="flex flex-col gap-y-2">
        <Image className="w-[100px]" src={profilee} alt="Profile" />
        <button className="text-[#f39b3b] font-semibold">Change Picture</button>
      </div>

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
          disabled={isLoading || !isEditing} // Disable button when loading or no edits
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
