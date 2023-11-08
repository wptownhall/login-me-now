import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

function LoginLayout() {
  const [bellow, setBellow] = useState(true);
  const [bellowSeparator, setBellowSeparator] = useState(false);
  const [above, setAbove] = useState(false);
  const [aboveSeparator, setAboveSeparator] = useState(false);
  const dispatch = useDispatch()

  const handleBellow = () => {
    setBellow(true);
    setBellowSeparator(false);
    setAbove(false);
    setAboveSeparator(false);
  };
  const handleBellowSeparator = () => {
    setBellow(false);
    setBellowSeparator(true);
    setAbove(false);
    setAboveSeparator(false);
  };
  const handleAbove = () => {
    setBellow(false);
    setBellowSeparator(false);
    setAbove(true);
    setAboveSeparator(false);
  };
  const handleAboveSeparator = () => {
    setBellow(false);
    setBellowSeparator(false);
    setAbove(false);
    setAboveSeparator(true);
  };
  const loginLayout = {bellow: bellow, bellowSeparator: bellowSeparator, above: above, aboveSeparator: aboveSeparator}

  const loginLayoutData = useSelector((state) => state.loginLayout)
  const {bellow: reduxBellow, bellowSeparator: reduxBellowSeparator, above: reduxAbove, aboveSeparator: reduxAboveSeparator} = loginLayoutData || {}

  useEffect(() => {
    dispatch({
        type: "LOGIN_LAYOUT",
        payload: loginLayout,
      });
  
      const formData = new window.FormData();
  
      formData.append("action", "login_me_now_update_admin_setting");
      formData.append("security", lmn_admin.update_nonce);
      formData.append("key", "login_layout");
      formData.append("value", loginLayout);
  
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
  }, [bellow, bellowSeparator, above, aboveSeparator])

  return (
    <div className="mt-12">
      <p class="mt-0 text-[20px] text-[#000000] tablet:w-full font-medium mb-8">
        Login layout
      </p>
      <div className="flex items-center mb-4">
        <input
          checked={reduxBellow}
          onChange={handleBellow}
          id="bellow"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="bellow"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Bellow
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          checked={reduxBellowSeparator}
          onChange={handleBellowSeparator}
          id="bellow_with_separator"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="bellow_with_separator"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Below with separator
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          checked={reduxAbove}
          onChange={handleAbove}
          id="above"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="above"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Above
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          checked={reduxAboveSeparator}
          onChange={handleAboveSeparator}
          id="above_with_separator"
          type="radio"
          class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
        />
        <label
          for="above_with_separator"
          class="ml-2 text-[18px] text-[#424344] dark:text-[#424344]"
        >
          Above with separator
        </label>
      </div>
    </div>
  );
}

export default LoginLayout;
