import React from "react";
import { useSelector } from "react-redux";

export default function FormFacebookItem() {
  const loginButtonStyleData = useSelector((state) => state.loginButtonStyle);
  return (
    <>
      {loginButtonStyleData === "icon" && (
        <div className="bg-[#1877F2] flex items-center justify-center shadow-md h-[50px] w-[50px] rounded-[4px] mx-2">
          <svg
            class="flex-shrink-0 stroke-inherit"
            height="34px"
            width="34px"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="transparent"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#CCCCCC"
              stroke-width="1.9200000000000004"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M20 12.05C19.9813 10.5255 19.5273 9.03809 18.6915 7.76295C17.8557 6.48781 16.673 5.47804 15.2826 4.85257C13.8921 4.2271 12.3519 4.01198 10.8433 4.23253C9.33473 4.45309 7.92057 5.10013 6.7674 6.09748C5.61422 7.09482 4.77005 8.40092 4.3343 9.86195C3.89856 11.323 3.88938 12.8781 4.30786 14.3442C4.72634 15.8103 5.55504 17.1262 6.69637 18.1371C7.83769 19.148 9.24412 19.8117 10.75 20.05V14.38H8.75001V12.05H10.75V10.28C10.7037 9.86846 10.7483 9.45175 10.8807 9.05931C11.0131 8.66687 11.23 8.30827 11.5161 8.00882C11.8022 7.70936 12.1505 7.47635 12.5365 7.32624C12.9225 7.17612 13.3368 7.11255 13.75 7.14003C14.3498 7.14824 14.9482 7.20173 15.54 7.30003V9.30003H14.54C14.3676 9.27828 14.1924 9.29556 14.0276 9.35059C13.8627 9.40562 13.7123 9.49699 13.5875 9.61795C13.4627 9.73891 13.3667 9.88637 13.3066 10.0494C13.2464 10.2125 13.2237 10.387 13.24 10.56V12.07H15.46L15.1 14.4H13.25V20C15.1399 19.7011 16.8601 18.7347 18.0985 17.2761C19.3369 15.8175 20.0115 13.9634 20 12.05Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
        </div>
      )}
      {loginButtonStyleData === "text" || loginButtonStyleData === undefined ? (
        <div className="bg-[#1877F2] flex items-center border border-[#CCCCBE] rounded-[8px] p-3 mb-3">
          <div className="w-[20%] flex justify-center">
          <svg
          class="flex-shrink-0 stroke-inherit"
          height="20px"
          width="20px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M24 12C24 5.37262 18.6274 0 12 0C5.37262 0 0 5.37253 0 12C0 17.9895 4.38825 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6575 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3398 7.875 13.875 8.80003 13.875 9.74906V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6117 22.954 24 17.9896 24 12Z"
            fill="white"
          />
        </svg>
          </div>
          <div className="w-[60%] text-center">
            <span className="text-[16px] text-[#ffffff]">
              Continue with <span className="font-medium">Google</span>
            </span>
          </div>
          <div className="w-[20%]"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
