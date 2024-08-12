import Image from "next/image";
import larvaLogo from "../../public/assets/larvaLogo.svg";
import emailLogo from "../../public/assets/emailLogo.svg";
import passwordIcon from "../../public/assets/passwordIcon.svg";
import loginImage from "../../public/assets/loginImage.svg";

export default function Home() {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:gap-x-16 bg-white">
      <div className=" grid px-4 md:px-48 items-center lg:pt-10 md:pt-48 lg:px-20 gap-y-12 py-10">
        <div className="grid gap-y-2 text-center md:text-left">
          <Image className="w-24 md:w-40" src={larvaLogo} alt="Larva Logo" />
          <h1 className="text-[#111111] font-bold text-left text-[18px] md:text-[22px]">
            Log in to your Account
          </h1>
        </div>
        <form className=" w-full">
          <div className="grid gap-y-4">
            {" "}
            <div className="w-full flex items-center gap-x-3 px-4 py-[12px] border-2 rounded-[10px] bg-[#f9f9f9] border-[#D3D3D3] hover:border-[#F39B3B]">
              <Image className="w-[18px]" src={emailLogo} alt="Email Icon" />
              <input
                className="outline-none bg-transparent text-[#222222] text-[16px] flex-1"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="w-full flex items-center gap-x-3 px-4 py-[12px] border-2 rounded-[10px] bg-[#f9f9f9] border-[#D3D3D3] hover:border-[#F39B3B]">
              <Image className="w-[16px]" src={passwordIcon} alt="Paasword Icon" />
              <input
                className="outline-none bg-transparent text-[#222222] text-[16px] flex-1"
                type="text"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="grid gap-y-4">
            <button className="mt-10 bg-[#F39B3B] text-white font-semibold text-[16px] px-4 py-[14px] w-full rounded-lg">
              Log In as Tutor
            </button>
            <button className="bg-[#1E1206] text-white font-semibold text-[16px] px-4 py-[14px] w-full rounded-lg">
              Log In as Super Admin
            </button>
          </div></form>

      </div>
      <div className="w-full hidden md:hidden lg:block"> <Image src={loginImage} /></div>
     
    </div>
  );
}
