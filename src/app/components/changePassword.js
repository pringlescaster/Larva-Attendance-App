import React,{useState} from 'react'

function changePassword() {
    const [isEditing, setisEditing] = useState(false);
    const handleInputChange = () => {
        setisEditing(true);
    }

  return (
  
  <div className="w-[60%] items-center flex flex-col gap-y-4 px-8 py-8 password-sm text-[#333333]">
    <input
      className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
      type="password"
      placeholder="Current Password"
      onChange={handleInputChange}
    />
    <input
      className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
      type="password"
      placeholder="New Password"
      onChange={handleInputChange}
    />
    <input
      className="w-full text-[#333333] rounded-lg outline-[#F39B3B] password-[#222222] hover:border-[#F39B3B] bg-[#F9F9F9] px-4 py-3 border border-[#D3D3D3]"
      type="password"
      placeholder="Confirm Password"
      onChange={handleInputChange}
    />
    <button className={`bg-[#f39b3b] mt-6 w-full text-[#ffffff] py-3 px-4 rounded-md password-white password-md font-base transition-opacity duration-300 ${isEditing ? 'opacity-100' : 'opacity-65'}`}>
      Save
    </button>
  </div>


  )
}

export default changePassword
