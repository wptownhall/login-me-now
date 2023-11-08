import React, { useState } from "react";

export default function LoginBtnStyle() {
  const [textbtnStyle, setTextbtnStyle] = useState(true);
  const [iconBtnStyle, setIconBtnStyle] = useState(false);
  const handleTextBtnStyle = () => {
    setTextbtnStyle(true);
    setIconBtnStyle(false);
    console.log("1");
  };
  const handleIconBtnStyle = () => {
    setTextbtnStyle(false);
    setIconBtnStyle(true);
    console.log("2");
  };
  return (
    <div className="mt-12">
      <p class="mt-0 text-[20px] text-[#000000] tablet:w-full font-medium mb-8">
        Login form button style
      </p>
      <div className="flex items-center mb-4">
        <input
          checked={textbtnStyle}
          onChange={handleTextBtnStyle}
          id="login_text"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="login_text"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Text
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          checked={iconBtnStyle}
          onChange={handleIconBtnStyle}
          id="login_icon"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="login_icon"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Icon
        </label>
      </div>
    </div>
  );
}
