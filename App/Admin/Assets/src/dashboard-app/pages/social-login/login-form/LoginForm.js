import React from "react";
import Google from "./components/Google";
import Facebook from "./components/Facebook";
import Twitter from "./components/Twitter";

function LoginForm() {
  return (
    <div className="py-12 flex">
      <div className="w-[40%] h-[500px] pr-8">
        <p class="mt-0 text-[20px] text-[#000000] tablet:w-full font-medium mb-8">
          Login option appearance
        </p>
        {/* login item components start from here  */}
        <Google />
        <Facebook />
        <Twitter />
        {/* login item components end from here  */}
      </div>
      <div className="w-[60%] bg-[#f5f5f5] h-[500px]"></div>
    </div>
  );
}

export default LoginForm;
