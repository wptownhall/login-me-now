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
import ActiveLog from "./modules/ActiveLog";
import BrowserExtension from "./modules/BrowserExtension";
import UserSwitching from "./modules/UserSwitching";

function DashboardModules() {
  const isProAvailable = lmn_admin.pro_available ? true : false;
  console.log(isProAvailable);
  return (
    <main className="py-[2.43rem]">
      <div className="max-w-3xl mx-auto px-6 lg:max-w-screen-2xl">
        <div className="gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm py-8 px-4">
          <div className="">
            <section aria-labelledby="section-1-title h-full">
              <div class="w-fullpx-4 grid sm:grid-cols-2 large-grid extralarge-grid md:grid-cols-3">
                <div class={`mx-4 bg-[#023A2E] rounded-[8px] flex ${isProAvailable === true ? 'justify-center' : 'justify-between'} flex-col mb-16 `}>
                  <div className="px-8 pt-16 pb-10">
                    {isProAvailable === true ? (
                      <h1 className="text-[#1BD8B9] text-[16px] font-medium text-center mb-5">
                      Congratulation you have unlocked all the pro features!
                    </h1>
                    ) : (
                      <>
                        <h1 className="text-[#1BD8B9] text-[16px] font-medium text-center mb-5">
                          More powerful options
                        </h1>
                        <div className="inline-box-flex">
                          <TickIcon />
                          <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                            Express login
                          </span>
                        </div>
                        <div className="inline-box-flex">
                          <TickIcon />
                          <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                            Advance share
                          </span>
                        </div>
                        <div className="inline-box-flex">
                          <TickIcon />
                          <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                            Extra social login options
                          </span>
                        </div>
                        <div className="inline-box-flex">
                          <TickIcon />
                          <span className="ml-3 mb-[12px] text-[#D9F5EC] text-[14px] noto-serif">
                            24/7 Priority Support
                          </span>
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
                          BUY
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
                <AdvanceShare colorChange={true} proItem={false} none={false} />

                <SocialLogin colorChange={false} proItem={false} none={false} />
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
                <OTPLogin colorChange={false} proItem={false} none={false} />
                <BrowserExtension
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                {/* <UserSwitching
                  colorChange={false}
                  proItem={false}
                  none={false}
                /> */}
                <UserSwitching
                  colorChange={false}
                  proItem={false}
                  none={false}
                />
                <ActiveLog colorChange={false} proItem={false} none={false} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardModules;
