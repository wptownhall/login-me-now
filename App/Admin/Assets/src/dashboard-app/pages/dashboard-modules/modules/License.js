import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import apiFetch from "@wordpress/api-fetch";

export default function License() {
  const [license, setLicense] = useState("");
  const dispatch = useDispatch();
  const lmnProLic = useSelector((state) => state.lmnProLic)

  const updateLicense = () => {
    console.log(license);
    dispatch({ type: "UPDATE_LMN_PRO_LIC", payload: license });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    // login_me_now_update_admin_setting
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "lmn_pro_lic");
    formData.append("value", license);

    console.log(license);

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
    <div className="gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm p-8 mt-8">
      <h1 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
        Licence
      </h1>
      <div className="flex">
        <input
          onChange={(e) => setLicense(e.target.value)}
          className="block w-full h-[50px] !p-3 !border-slate-200"
          type="password"
          name="lmn_pro_lic"
          value={license}
          placeholder="Enter your license here..."
        />
        <button
          className="h-[50px] !p-3 !border-slate-200 border ml-3 rounded-[4px]"
          onClick={updateLicense}
        >
          Active
        </button>
      </div>
    </div>
  );
}
