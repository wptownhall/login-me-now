import React from "react";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import ActiveEmail from "./ActiveEmail";
import { useSelector } from "react-redux";
import ActivePhoneNumber from "./ActivePhoneNumber";
import ActiveUsername from "./ActiveUsername";
import ActiveGoogle from "./ActiveGoogle";
import ActiveFacebook from "./ActiveFacebook";

function RealtimeLogin() {
  const data = useSelector((state) => state);
  const isEmailEnable = data.enableSignInEmailAddress;
  const isPhoneEnable = data.enableSignInPhoneNumber;
  const isUsernameEnable = data.enableSignInUsername;
  const isGoogleEnable = data.enableSignInGoogle;
  const isFacebookEnable = data.enableSignInFacebook;

  return (
    <div className="max-w-3xl mx-auto px-6 lg:max-w-screen-2xl">
      <div className="mx-auto mt-10 mb-8 font-semibold text-2xl">
        Social Login
      </div>
      <main className="mx-auto my-[2.43rem] bg-white rounded-md shadow overflow-hidden min-h-[36rem]">
        <div className="lg:grid lg:grid-cols-12 min-h-[36rem] h-full px-8">
          <div className="sm:px-6 lg:pl-0 lg:col-span-4 py-8 lg:pr-8">
            <div>
              <span className="text-slate-800 text-[2rem] leading-10 pb-3 font-semibold text-left">{`Let's build your `}</span>
              <span className="text-[#023A2E] text-[2rem] leading-10 pb-3 font-semibold text-left">{`<SignIn/>`}</span>
            </div>
            <div>
              <p className="font-semibold text-[16px] mt-8 mb-3">
                How will your users sign in?
              </p>

              <ActiveEmail />
              <ActivePhoneNumber />
              <ActiveUsername />
              <ActiveGoogle />
              <ActiveFacebook />
            </div>
          </div>
          <div className="lg:col-span-8 border-l px-14 py-8">
            <h1 className="text-slate-800 text-[2rem] leading-10 pb-3 font-semibold text-left">
              Sign in
            </h1>
            <p className="text-base leading-[1.625rem] text-slate-600 pb-7 undefined">
              to continue to SaaS Shorts
            </p>

            <div>
              {isGoogleEnable && <GoogleLogin />}
              {isFacebookEnable && <FacebookLogin />}
              <div className="flex items-center my-12">
                <p className="border-[1px] border-[#e7e7e7] w-[47%]"></p>
                <span className="font-semibold text-center w-[6%] text-[16px]">
                  or
                </span>
                <p className="border-[1px] border-[#e7e7e7] w-[47%]"></p>
              </div>
              {isEmailEnable && (
                <>
                  <p className="text-[16px] font-bold">Email address</p>
                  <input
                    type="email"
                    className="w-full !px-2.5 !py-1.5 !border-[2px] !border-solid !border-[#E5E7EB] p-2 rounded-[4px] mb-3"
                  />
                </>
              )}
              {isPhoneEnable && (
                <>
                  <p className="text-[16px] font-bold">Phone Number</p>
                  <PhoneInput className="mb-3" defaultCountry="bd" />
                </>
              )}
              {isUsernameEnable && (
                <>
                  <p className="text-[16px] font-bold">Username</p>
                  <input
                    type="text"
                    className="w-full !px-2.5 !py-1.5 !border-[2px] !border-solid !border-[#E5E7EB] p-2 rounded-[4px] mb-3"
                  />
                </>
              )}

              <button
                type="submit"
                className="mt-3 w-full sm:inline-flex justify-center items-center py-2 px-4 border border-transparent text-[16px] font-medium rounded-md shadow-sm text-white bg-lmn focus-visible:bg-lmn-hover hover:bg-lmn-hover focus:outline-none mr-4 mb-2 sm:mb-0"
              >
                CONTINUE
              </button>
            </div>
            <div className="mt-8">
              <span className="text-[16px]">No account?</span>
              <span className="text-[#2271B1] text-[16px]"> Sign up</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RealtimeLogin;
