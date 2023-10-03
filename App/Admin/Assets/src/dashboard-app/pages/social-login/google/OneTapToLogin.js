import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import ProBtn from "./components/ProBtn";
import OneTapSelectTag from "./components/OneTapSelectTag";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";
import GoogleProSelectedPages from "./GoogleProSelectedPages";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OneTapToLogin() {
  const dispatch = useDispatch();
  const [checkbox, setCheckbox] = useState();

  const globalStates = useSelector((state) => state);
  const locationState = globalStates.selectGoogleSelectedLocation;
  const enableGoogleLoginSelectLocation =
    globalStates.enableGoogleLoginSelectLocation;

  const isProAvailable = lmn_admin.pro_available ? true : false;

  const handleLocationChange = (payload) => {
    payload === "specificPage" ? setCheckbox(true) : setCheckbox(false);
    console.log(payload);

    dispatch({
      type: "UPDATE_SELECT_GOOGLE_PRO_SELECTED_LOCATION",
      payload: payload,
    });
    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_onetap_display_location");
    formData.append("value", payload);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    })
      .then(() => {
        dispatch({
          type: "UPDATE_SETTINGS_SAVED_NOTIFICATION",
          payload: "Successfully saved!",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // my code end from here

  const enableGoogleCancelOnTapOutside = useSelector(
    (state) => state.enableGoogleCancelOnTapOutside
  );
  const enableGoogleCancelOnTapOutsideStatus =
    false === enableGoogleCancelOnTapOutside ? false : true;

  const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
  const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;

  const updateStatus = () => {
    let assetStatus;
    if (enableGoogleCancelOnTapOutside === false) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "UPDATE_ENABLE_CANCEL_ON_TAP_OUTSIDE",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_cancel_on_tap_outside");
    formData.append("value", assetStatus);

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
    <div
      className={`${
        enableGoogleLoginStatus ? "block" : "hidden"
      } py-12 border-b border-solid border-slate-200 `}
    >
      <div className="flex justify-between items-start">
        <p className="mt-0 text-[22px] text-[#000000] tablet:w-full font-medium mb-8">
          {__("Enable one tap login", "login-me-now")}
        </p>

        <Switch
          checked={enableGoogleCancelOnTapOutsideStatus}
          onChange={updateStatus}
          className={classNames(
            enableGoogleCancelOnTapOutsideStatus ? "bg-lmn" : "bg-slate-200",
            "group relative inline-flex h-2 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-lmn focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableGoogleCancelOnTapOutsideStatus ? "bg-lmn" : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-4 w-7 rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableGoogleCancelOnTapOutsideStatus
                ? "translate-x-5"
                : "translate-x-0",
              "toggle-bubble pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
      {enableGoogleCancelOnTapOutsideStatus && (
        <div className="flex pr-[10%]">
          <div className="w-[30%]">
            <p className="w-9/12 text-[18px] text-[#000000] tablet:w-full font-medium">
              {__("Select location ", "login-me-now")}
            </p>
          </div>
          <div className="w-[70%]">
            <div class="flex items-center mb-4">
              <input
                id="loginScreen"
                onChange={() => handleLocationChange("loginScreen")}
                type="radio"
                value=""
                name="options"
                class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
              />
              <label
                for="loginScreen"
                class="ml-2 text-[16px] font-medium text-[#424344] dark:text-[#424344]"
              >
                Only on login screen
              </label>
            </div>

            <div class="flex items-center mb-4">
              <input
                id="siteWide"
                onChange={() => handleLocationChange("siteWide")}
                type="radio"
                value=""
                name="options"
                class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600  !mt-[2px]"
              />
              <label
                for="siteWide"
                class="ml-2 text-[16px] font-medium text-[#424344] dark:text-[#424344]"
              >
                Site wide
              </label>
            </div>

            <div
              class={`flex items-center mb-4 ${
                isProAvailable === false ? "pointer-events-none" : ""
              }`}
            >
              <input
                id="specificPage"
                onChange={() => handleLocationChange("specificPage")}
                type="radio"
                value=""
                name="options"
                class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600  !mt-[2px]"
              />
              <label
                for="specificPage"
                class={`ml-2 text-[16px] font-medium text-[#424344] dark:text-[#424344] ${
                  isProAvailable === false ? "opacity-40" : ""
                }`}
              >
                Specific page{" "}
                {!isProAvailable ? (
                  <ProBtn extraClass="py-[4px] px-[10px]" />
                ) : (
                  ""
                )}
              </label>
            </div>

            {checkbox && <GoogleProSelectedPages />}
            {checkbox && <OneTapSelectTag />}
          </div>
        </div>
      )}
    </div>
  );
}
