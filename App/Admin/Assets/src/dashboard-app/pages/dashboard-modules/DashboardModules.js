import React, { useState } from "react";
import TickIcon from "./TickIcon";
import Module from "./Module";
import TemporaryLogin from "./modules/TemporaryLogin";
import AdvanceShare from "./modules/AdvanceShare";
import SocialLogin from "./modules/SocialLogin";
import ExpressLoginWC from "./modules/ExpressLoginWC";
import ExpressLoginEDD from "./modules/ExpressLoginEDD";
import ExpressLoginEmail from "./modules/ExpressLoginEmail";
import OTPLogin from "./modules/OTPLoign";
import BrowserExtension from "./modules/BrowserExtension";
import UserSwitching from "./modules/UserSwitching";
import ActiveLog from "./modules/ActiveLog";

function DashboardModules() {
  const test = "hello there";

  return (
    <main className="py-[2.43rem]">
      <div className="max-w-3xl mx-auto px-6 lg:max-w-screen-2xl">
        <div className="gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm py-8">
          <div className="">
            <section aria-labelledby="section-1-title h-full">
              <div class="flex w-full mb-16 px-4">
                <div class="w-1/4 mx-4 bg-[#023A2E] rounded-[8px] flex justify-between flex-col">
                  <div className="px-8 pt-16 pb-10">
                    <h1 className="text-[#1BD8B9] text-[16px] font-medium text-center mb-5">
                      More powerful options
                    </h1>
                    <div className="flex">
                      <TickIcon />
                      <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                        Express login
                      </span>
                    </div>
                    <div className="flex">
                      <TickIcon />
                      <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                        Advance share
                      </span>
                    </div>
                    <div className="flex">
                      <TickIcon />
                      <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                        Extra social login options
                      </span>
                    </div>
                    <div className="flex">
                      <TickIcon />
                      <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                        24/7 Priority Support
                      </span>
                    </div>
                  </div>
                  <div className="bg-black py-3 text-center rounded-b-[8px] border-t-[2px] border-t-[#000000] ">
                    <button
                      type="button"
                      className="bg-[#EDEDED] px-6 py-1 text-[#023A2E] text-[16px] font-semibold rounded-[8px]"
                    >
                      BUY
                    </button>
                  </div>
                </div>
                <TemporaryLogin
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <AdvanceShare colorChange={true} proItem={false} none={false} />

                <SocialLogin
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
              </div>
              <div class="flex w-full mb-16 px-4">
                <ExpressLoginWC
                  colorChange={false}
                  proItem={true}
                  none={false}
                />
                <ExpressLoginEDD
                  colorChange={false}
                  proItem={true}
                  none={false}
                />
                <ExpressLoginEmail
                  colorChange={false}
                  proItem={true}
                  none={false}
                />
                <OTPLogin
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
              </div>
              <div class="flex w-full mb-16 px-4">
                <BrowserExtension
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <UserSwitching
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <ActiveLog
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <Module
                  colorChange={false}
                  title="OTP login"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={false}
                  none={true}
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
