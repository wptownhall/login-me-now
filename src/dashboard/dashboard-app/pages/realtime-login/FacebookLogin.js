import React from "react";

function FacebookLogin() {
  return (
    <div className="flex items-center border-[2px] border-solid p-2 rounded-[4px] hover:bg-[#f5f5f5] cursor-pointer">
      <svg
        class="flex-shrink-0 mr-4 stroke-inherit"
        height="18px"
        width="18px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          fill="#1877F2"
          d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
        />
        <path
          fill="#ffffff"
          d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
        />
      </svg>
      <span className="font-bold text-[16px]">Continue with Facebook</span>
    </div>
  );
}

export default FacebookLogin;
