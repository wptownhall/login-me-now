import React from "react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

export default function LoginBtnStyle() {
  const loginButtonStyleData = useSelector((state) => state.loginButtonStyle);
  const dispatch = useDispatch();
  const handleButtonStyle = (style) => {
    dispatch({
      type: "LOGIN_BUTTON_STYLE",
      payload: style,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "login_button_style");
    formData.append("value", style);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    }).then(() => {
      dispatch({
        type: "UPDATE_SETTINGS_SAVED_NOTIFICATION",
        payload: __("Successfully saved!", "login-me-now"),
      });
    });
  };
  return (
    <div className="mt-12">
      <p class="mt-0 text-[20px] text-[#000000] tablet:w-full font-medium mb-8">
        Login form button style
      </p>
      <div className="flex items-center mb-4">
        <input
          checked={
            loginButtonStyleData === "text" ||
            loginButtonStyleData === undefined
              ? true
              : false
          }
          onChange={(e) => handleButtonStyle("text")}
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
          checked={loginButtonStyleData === "icon" ? true : false}
          onChange={(e) => handleButtonStyle("icon")}
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
