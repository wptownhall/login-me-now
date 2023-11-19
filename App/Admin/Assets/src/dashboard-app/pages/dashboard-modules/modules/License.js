import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import apiFetch from "@wordpress/api-fetch";

export default function License() {
  const [license, setLicense] = useState(""); 
  const [licenseSuccessfull , setLicenseSuccessfull] = useState("")
  const dispatch = useDispatch();
  const lmnProLic = useSelector((state) => state);

  // Set the initial value of 'license' to 'lmnProLic' when the component mounts
  useEffect(() => {
    setLicense(lmnProLic);
  }, [lmnProLic]);

  console.log(license)
  const updateLicense = () => {
    dispatch({ type: "UPDATE_LMN_PRO_LIC", payload: license });
    const formData = new window.FormData();

    formData.append("action", "login_me_now_pro_activate_license");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "lmn_pro_lic");
    formData.append("value", license);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    }).then((data) => {
      if( false === data.success ) {
        dispatch({ type: 'UPDATE_SETTINGS_NOT_SAVED_NOTIFICATION', payload: data.data});
      } else {
        dispatch({ type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __('Successfully saved!', 'login-me-now') });
      }

      console.log(licenseSuccessfull === "Successfully updated license!" ? true : false);
      setLicenseSuccessfull(data.data.message);
      console.log(lmn_admin.lmnProLic)
    });
  };
  // console.log(lmnProLic)

  return (
    <div className="gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm p-8 mt-8">
      <h1 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800 mb-4">
        License
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
          className={`h-[50px] !p-3 !border-slate-200 border ml-3 rounded-[4px] ${licenseSuccessfull === "Successfully updated license!" ? 'bg-[#ff0e0e] text-white' : 'text-[#2271B1] bg-white'}`}
          onClick={updateLicense}
        >
          {licenseSuccessfull === "Successfully updated license!" ? 'Deactive' : 'Active'}
        </button>
      </div>
    </div>
  );
}