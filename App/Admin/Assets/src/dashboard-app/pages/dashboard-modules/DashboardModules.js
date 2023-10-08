import React, { useState } from "react";
import TickIcon from "./TickIcon";
import Module from "./Module";

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
                <Module
                  colorChange={false}
                  title="Temporary login"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={false}
                  none={false}
                />
                <Module
                  colorChange={true}
                  title="Advance share"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={false}
                  none={false}
                />
                <Module
                  colorChange={false}
                  title="Social login"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={false}
                  none={false}
                />
              </div>
              <div class="flex w-full mb-16 px-4">
                <Module
                  colorChange={false}
                  title="Express login- WC"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={true}
                  none={false}
                />
                <Module
                  colorChange={false}
                  title="Express login- EDD"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={true}
                  none={false}
                />
                <Module
                  colorChange={false}
                  title="Express login- email"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={true}
                  none={false}
                />
                <Module
                  colorChange={false}
                  title="OTP login"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={false}
                  none={false}
                />
              </div>
              <div class="flex w-full mb-16 px-4">
                <Module
                  colorChange={false}
                  title="Browser extension"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={false}
                  none={false}
                />
                <Module
                  colorChange={false}
                  title="User switching"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
                  proItem={false}
                  none={false}
                />
                <Module
                  colorChange={false}
                  title="Activity log"
                  subtitle="Redirect non-existent content easily with 301 and 302 status code.
          This can help improve your site ranking. Also supports many"
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
