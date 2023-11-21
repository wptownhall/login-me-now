import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import apiFetch from "@wordpress/api-fetch";

export default function License() {
  const [license, setLicense] = useState("");
  const [isLicenseActivate, setIsLicenseActivate] = useState(false);
  const [renderDeactivation, setRenderDeactivation] = useState(false);
  const dispatch = useDispatch();
  const lmnProLic = useSelector((state) => state.lmnProLic);

  useEffect(() => {
    setLicense(lmnProLic);
    lmnProLic !== "" && setIsLicenseActivate(true);
  }, [lmnProLic]);

  useEffect(() => {
    if (renderDeactivation) {
      const timeoutId = setTimeout(() => {
        setIsLicenseActivate(false);
        setRenderDeactivation(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [renderDeactivation]);

  const updateLicense = () => {
    const formData = new window.FormData();

    formData.append("action", "login_me_now_pro_activate_license");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "lmn_pro_lic");
    formData.append("value", isLicenseActivate === true ? "" : license);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log(data);
        if (false === data.success) {
          dispatch({
            type: "UPDATE_SETTINGS_NOT_SAVED_NOTIFICATION",
            payload: data.data,
          });
        } else {
          dispatch({
            type: "UPDATE_SETTINGS_SAVED_NOTIFICATION",
            payload: __("Successfully saved!", "login-me-now"),
          });

          if ("" === data.data.license) {
            setRenderDeactivation(true);
          } else {
            setIsLicenseActivate(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error updating license:", error);
        dispatch({
          type: "UPDATE_SETTINGS_NOT_SAVED_NOTIFICATION",
          payload: "An error occurred while updating the license.",
        });
      })
      .finally(() => {
        // Always clear the input value after the API call
        setLicense("");
      });
  };

  const handleLicense = (e) => {
    if (!isLicenseActivate) {
      setLicense(e.target.value);
    } else {
      setLicense(""); // Clear the input value when isLicenseActivate is false
    }
  };

  return (
    <div className="gap-4 items-start lg:grid-cols-5 lg:gap-0 xl:gap-0 rounded-md bg-white overflow-hidden shadow-sm p-8 mt-8">
      <h1 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800 mb-4">
        License
      </h1>
      <div className="flex">
        <input
          onChange={handleLicense}
          className={`block w-full h-[50px] !p-3 !border-slate-200 ${
            isLicenseActivate === true ? "placeholder-[#9be99b]" : ""
          }`}
          type="text"
          name="lmn_pro_lic"
          placeholder={`${
            isLicenseActivate === true ? "*******" : "Enter your license"
          }`}
          value={isLicenseActivate === true ? "******************************" : license}
          disabled={isLicenseActivate}
        />
        <button
          className={`h-[50px] ! w-[100px] !border-slate-200 border ml-3 rounded-[4px] text-[#5cabd3] font-semibold`}
          onClick={updateLicense}
        >
          {isLicenseActivate ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  );
}
