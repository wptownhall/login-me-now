import React, { useState } from "react";
import Google from "./components/Google";
import Facebook from "./components/Facebook";
import Twitter from "./components/Twitter";
import FormGoogleItem from "./components/FormGoogleItem";
import FormFacebookItem from "./components/FormFacebookItem";
import FormTwitterItem from "./components/FormTwitterItem";
import { useSelector } from "react-redux";
import LoginLayout from "./components/LoginLayout";
import LoginBtnStyle from "./components/LoginBtnStyle";

function LoginForm() {
  const isGoogleActive = useSelector((state) => state.lfEnableSignInGoogle);
  const isTwitterActive = useSelector((state) => state.lfEnableSignInTwitter);
  const isFacebookActive = useSelector((state) => state.lfEnableSignInFacebook);
  const loginLayoutData = useSelector((state) => state.loginLayout);

  return (
    <div className="py-12 flex">
      <div className="w-[40%] pr-8">
        <p class="mt-0 text-[20px] text-[#000000] tablet:w-full font-medium mb-8">
          Login option appearance
        </p>
        {/* login item components start from here  */}
        <Google />
        <Facebook />
        <Twitter />

        {/* Login option appearance code end here */}

        <LoginLayout />
        <LoginBtnStyle />

        {/* login item components end from here  */}
      </div>
      <div className="w-[60%]">
        <div className="border border-[#9F9F9F] rounded-[12px] overflow-hidden">
          {/* header start from here  */}
          <div className="p-4 bg-[#F8FAFC]">
            <p className="h-[16px] w-[16px] bg-[#DF5840] rounded-full inline-block mr-2"></p>
            <p className="h-[16px] w-[16px] bg-[#CEB64B] rounded-full inline-block mr-2"></p>
            <p className="h-[16px] w-[16px] bg-[#6CB336] rounded-full inline-block mr-2"></p>
          </div>
          {/* header end from here  */}

          {/* body start from here  */}
          <div className="bg-[#F0F2F4] py-20 px-16">
            {/* login box code start from here  */}
            <div className="p-6 border border-[#9F9F9F] rounded-[8px] bg-[#ffffff]">
              <div className="mb-6">
                <p className="text-[#646464] text-[18px] mb-2">
                  Username or Email Address
                </p>
                <input
                  type="text"
                  className="border border-[#9F9F9F] !bg-[#F8FAFC] w-full h-[44px]"
                />
              </div>
              <div className="mb-6">
                <p className="text-[#646464] text-[18px] mb-2">Password</p>
                <input
                  type="password"
                  className="border border-[#9F9F9F] !bg-[#F8FAFC] w-full h-[44px]"
                />
              </div>

              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center">
                  <input type="checkbox" />
                  <span className="mt-[-4px] text-[#646464] text-[16px]">
                    Remember Me
                  </span>
                </div>
                <button className="bg-[#007CBA] border border-[#9F9F9F] text-[16px] text-white px-4 py-1.5 rounded-[4px]">
                  Log In
                </button>
              </div>
              {loginLayoutData === "bellowSeparator" && (<div className={`flex justify-between items-center ${isGoogleActive === true || isFacebookActive === true || isTwitterActive === true ? 'mb-6' : ''}`}>
                <div className="w-[42%] h-[1px] bg-[#9F9F9F]"></div>
                <div className="w-[16%] text-center">
                  <span className="text-[#646464] text-[18px] font-medium">
                    OR
                  </span>
                </div>
                <div className="w-[42%] h-[1px] bg-[#9F9F9F]"></div>
              </div>)}
              

              {isGoogleActive && <FormGoogleItem />}
              {isFacebookActive && <FormFacebookItem />}
              {isTwitterActive && <FormTwitterItem />}
            </div>
            {/* login box code end from here  */}
          </div>
          {/* body end from here  */}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
