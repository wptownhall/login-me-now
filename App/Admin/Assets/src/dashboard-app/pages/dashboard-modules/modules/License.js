import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import apiFetch from "@wordpress/api-fetch";

export default function License() {
  const [license, setLicense] = useState("");
  const [isLicenseActivate, setIsLicenseActivate] = useState(false);
  const dispatch = useDispatch();
  const lmnProLic = useSelector((state) => state.lmnProLic);

  useEffect(() => {
    setLicense(lmnProLic);
    lmnProLic !== "" && setIsLicenseActivate(true);
  }, [lmnProLic]);

  const updateLicense = () => {
   
    dispatch({
      type: "UPDATE_LMN_PRO_LIC",
      payload: isLicenseActivate === true ? "" : license,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_pro_activate_license");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "lmn_pro_lic");
    formData.append("value", isLicenseActivate === true ? "" : license);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    }).then((data) => {
      console.log(data)
      if (false === data.success) {
        dispatch({
          type: "UPDATE_SETTINGS_NOT_SAVED_NOTIFICATION",
          payload: data.data,
        });
        setIsLicenseActivate(false);
      } else {
        dispatch({
          type: "UPDATE_SETTINGS_SAVED_NOTIFICATION",
          payload: __("Successfully saved!", "login-me-now"),
        });

        if( '' === data.data.license ) {
          setIsLicenseActivate(false);
        } else {
          setIsLicenseActivate(true);
        }
      }
    });
  };

  return (
    <div className="gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm p-8 mt-8">
      <h1 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800 mb-4">
        License
      </h1>
      <div className="flex">
       {
        isLicenseActivate === false 
        ? <>
            <input
              onChange={(e) => setLicense(e.target.value)}
              className={`block w-full h-[50px] !p-3 !border-slate-200 ${
                isLicenseActivate === true ? "placeholder-[#9be99b]" : ""
              }`}
              type="text"
              name="lmn_pro_lic"
              placeholder= "Enter your license here."
            />
            <button
              className={`h-[50px] !p-3 !border-slate-200 border ml-3 rounded-[4px] bg-[#d9534f] text-white`}
              onClick={updateLicense}
            >
              Activate
            </button>
        </>

        : 
        <>
          <h3 className="">Your license is activate</h3>
          <button
            className="ml-2 text-red-500"
            onClick={updateLicense}
          >
            Deactivate
          </button>
        </>
          
       }
      </div>
    </div>
  );
}