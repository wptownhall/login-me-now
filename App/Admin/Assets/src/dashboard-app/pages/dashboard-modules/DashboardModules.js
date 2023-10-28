import React, { useState } from "react";
import TickIcon from "./TickIcon";
import Module from "./Module";
import TemporaryLogin from "./modules/TemporaryLogin";
import AdvanceShare from "./modules/AdvanceShare";
import SocialLogin from "./modules/SocialLogin";
import ExpressLoginWC from "./modules/ExpressLoginWC";
import ExpressLoginEDD from "./modules/ExpressLoginEDD";
import ExpressLoginEmail from "./modules/ExpressLoginEmail";
import OTPLogin from "./modules/OTPLogin";
import ActivityLog from "./modules/ActivityLog";
import BrowserExtension from "./modules/BrowserExtension";
import UserSwitching from "./modules/UserSwitching";
import ConditionalLogin from "./modules/ConditionalLogin";

function DashboardModules() {
  const isProAvailable = lmn_admin.pro_available ? true : false;
  return (
    <main className="py-[2.43rem]">
      <div className="max-w-3xl mx-auto px-6 lg:max-w-screen-2xl">
        <div className="gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm py-8 px-4">
          <div className="">
            <section aria-labelledby="section-1-title h-full">
              <div class="w-fullpx-4 grid sm:grid-cols-2 large-grid extralarge-grid md:grid-cols-3">
                <div
                  class={`mx-4 bg-[#023A2E] rounded-[8px] flex ${
                    isProAvailable === true
                      ? "justify-center"
                      : "justify-between"
                  } flex-col mb-16 `}
                >
                  <div className="px-8 pt-16 pb-10 text-center">
                    {isProAvailable === true ? (
                      <h1 className="text-[#1BD8B9] text-[16px] font-medium text-center mb-5">
                        Congratulation you have unlocked all the pro features!
                      </h1>
                    ) : (
                      <>
                        <div
                          className="bg-[#D9F5EC] inline-block py-2.5 px-3 rounded-[8px] mb-4"
                          title="Pro"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M28.5752 8.92802C28.3637 8.74362 28.1022 8.62624 27.8238 8.59077C27.5455 8.5553 27.2629 8.60334 27.0119 8.7288L21.1279 11.6585L16.2154 3.49872C16.0891 3.28934 15.9109 3.11614 15.698 2.99591C15.4851 2.87568 15.2447 2.8125 15.0002 2.8125C14.7557 2.8125 14.5153 2.87568 14.3024 2.99591C14.0895 3.11614 13.9112 3.28934 13.7849 3.49872L8.87244 11.662L2.9908 8.73232C2.74042 8.60797 2.45889 8.56034 2.18154 8.59541C1.90419 8.63049 1.64338 8.74669 1.43183 8.92945C1.22028 9.11221 1.06742 9.35337 0.992434 9.62269C0.917448 9.892 0.923675 10.1775 1.01033 10.4433L5.34627 23.7276C5.38987 23.8611 5.46288 23.9831 5.55992 24.0845C5.65696 24.186 5.77555 24.2643 5.90694 24.3138C6.03832 24.3633 6.17914 24.3827 6.31901 24.3705C6.45887 24.3583 6.59421 24.3148 6.71502 24.2433C6.74432 24.2257 9.7408 22.4995 15.0002 22.4995C20.2596 22.4995 23.256 24.2257 23.283 24.2421C23.4038 24.3143 23.5394 24.3584 23.6796 24.371C23.8198 24.3837 23.9611 24.3646 24.0929 24.3151C24.2248 24.2657 24.3438 24.1872 24.4411 24.0855C24.5385 23.9838 24.6117 23.8615 24.6553 23.7276L28.9912 10.4468C29.0803 10.1809 29.0884 9.89454 29.0143 9.62409C28.9402 9.35364 28.7874 9.11134 28.5752 8.92802ZM23.2033 22.128C21.7971 21.5315 18.9939 20.6245 15.0002 20.6245C11.0064 20.6245 8.2033 21.5315 6.79705 22.128L3.13026 10.8979L8.4119 13.5311C8.73159 13.6888 9.09874 13.721 9.44101 13.6215C9.78328 13.5219 10.0759 13.2978 10.2611 12.9933L15.0002 5.11591L19.7392 12.9909C19.9247 13.295 20.217 13.5187 20.559 13.6182C20.9009 13.7177 21.2677 13.6858 21.5873 13.5288L26.8701 10.8979L23.2033 22.128ZM20.6099 18.378C20.5717 18.5949 20.4583 18.7914 20.2897 18.933C20.121 19.0747 19.9079 19.1524 19.6877 19.1526C19.6327 19.1526 19.5778 19.1479 19.5236 19.1386C16.5291 18.6245 13.4689 18.6245 10.4744 19.1386C10.2295 19.1818 9.97745 19.1259 9.77372 18.9833C9.56999 18.8407 9.43127 18.6229 9.38807 18.378C9.34487 18.1331 9.40073 17.8811 9.54336 17.6773C9.68599 17.4736 9.9037 17.3349 10.1486 17.2917C13.3587 16.7401 16.6393 16.7401 19.8494 17.2917C20.0938 17.3346 20.3113 17.4727 20.4541 17.6757C20.5968 17.8786 20.6533 18.13 20.6111 18.3745L20.6099 18.378Z"
                              fill="#023A2E"
                            />
                          </svg>
                        </div>

                        <h1 className="text-[#1BD8B9] text-[17px] font-medium text-center mb-5">
                          More powerful options
                        </h1>
                        <div className="flex flex-col flex-wrap content-center">
                          <div className="inline-box-flex inline-size-auto">
                            <TickIcon />
                            <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[17px] noto-serif">
                              Advanced social login
                            </span>
                          </div>
                          <div className="inline-box-flex inline-size-auto">
                            <TickIcon />
                            <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[17px] noto-serif">
                              Express login - WC
                            </span>
                          </div>
                          <div className="inline-box-flex inline-size-auto">
                            <TickIcon />
                            <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[17px] noto-serif">
                              Express login - EDD
                            </span>
                          </div>
                          <div className="inline-box-flex inline-size-auto">
                            <TickIcon />
                            <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[17px] noto-serif">
                              24/7 Priority Support
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {!isProAvailable && (
                    <div className="bg-black py-3 text-center rounded-b-[8px] border-t-[2px] border-t-[#000000] ">
                      <a
                        href="https://wptownhall.com/login-me-now/pricing/"
                        target="_blank"
                      >
                        <button
                          type="button"
                          className="bg-[#EDEDED] px-6 py-1 text-[#023A2E] text-[16px] font-semibold rounded-[8px]"
                        >
                          Upgrade to Pro
                        </button>
                      </a>
                    </div>
                  )}
                </div>
                <TemporaryLogin
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <BrowserExtension
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <SocialLogin colorChange={false} proItem={false} none={false} />
                {/* <AdvanceShare colorChange={true} proItem={false} none={false} /> */}

                <ExpressLoginWC
                  colorChange={false}
                  proItem={true}
                  none={false}
                  isAvailable={false}
                />
                <ExpressLoginEDD
                  colorChange={false}
                  proItem={true}
                  none={false}
                  isAvailable={false}
                />
                {/* <ExpressLoginEmail
                  colorChange={false}
                  proItem={true}
                  none={false}
                /> */}
                <OTPLogin
                  colorChange={false}
                  proItem={false}
                  none={false}
                  isAvailable={false}
                />
                <ConditionalLogin
                  colorChange={false}
                  proItem={false}
                  none={false}
                  isAvailable={false}
                />
                <UserSwitching
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <ActivityLog
                  colorChange={false}
                  proItem={false}
                  none={false}
                  isAvailable={false}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardModules;
