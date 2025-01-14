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

  const isProAvailable = lmn_admin.pro_available ? true : false;

  const handleLocationChange = (payload) => {
    payload === "selected_pages" ? setCheckbox(true) : setCheckbox(false);

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

  const location = useSelector((state) => state.selectGoogleSelectedLocation);

  const enableGoogleOneTap = useSelector((state) => state.enableGoogleOneTap);
  const enableGoogleOneTapStatus = false === enableGoogleOneTap ? false : true;
  const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
  const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;

  const updateStatus = () => {
    let assetStatus;
    if (enableGoogleOneTap === false) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "UPDATE_ENABLE_GOOGLE_ONETAP",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_onetap");
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
    <div className={`${enableGoogleLoginStatus ? "block" : "hidden"} py-12 `}>
      <div className="flex justify-between items-start">
        <p className="mt-0 text-[20px] text-[#000000] tablet:w-full font-medium mb-8">
          {__("Enable one tap login", "login-me-now")}
        </p>

        <Switch
          checked={enableGoogleOneTapStatus}
          onChange={updateStatus}
          className={classNames(
            enableGoogleOneTapStatus ? "bg-lmn" : "bg-slate-200",
            "group relative inline-flex h-[8px] w-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-lmn focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableGoogleOneTapStatus ? "bg-lmn" : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableGoogleOneTapStatus ? "translate-x-5" : "translate-x-0",
              "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
      {enableGoogleOneTapStatus && (
        <div className="flex pr-[10%]">
          <div className="w-[30%]">
            <p className="w-9/12 text-[18px] text-[#000000] tablet:w-full font-medium">
              {__("Select location ", "login-me-now")}
            </p>
          </div>
          <div className="w-[70%]">
            <div class="flex items-center mb-4">
              <input
                defaultChecked={location === "login_screen" ? true : false}
                id="login_screen"
                onChange={() => handleLocationChange("login_screen")}
                type="radio"
                value=""
                name="options"
                class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600 !mt-[2px]"
              />
              <label
                for="login_screen"
                class="ml-2 text-[16px] font-medium text-[#424344] dark:text-[#424344]"
              >
                Only on login screen
              </label>
            </div>

            <div class="flex items-center mb-4">
              <input
                defaultChecked={
                  location === "side_wide"
                    ? true
                    : false ||
                      location === "login_screen" ||
                      location === "side_wide" ||
                      location === "selected_pages"
                    ? false
                    : true
                }
                id="site_wide"
                onChange={() => handleLocationChange("side_wide")}
                type="radio"
                value=""
                name="options"
                class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600  !mt-[2px]"
              />
              <label
                for="site_wide"
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
                defaultChecked={location === "selected_pages" ? true : false}
                id="selected_pages"
                onChange={() => handleLocationChange("selected_pages")}
                type="radio"
                value=""
                name="options"
                class="w-4 h-4 !text-transparent bg-gray-100 !border-[#878787] border-[1px] focus:ring-blue-600  !mt-[2px]"
              />
              <label
                for="selected_pages"
                class={`ml-2 text-[16px] font-medium text-[#424344] dark:text-[#424344] ${
                  isProAvailable === false ? "opacity-40" : ""
                }`}
              >
                Specific page{" "}
              </label>
              {!isProAvailable ? (
                <ProBtn extraClass="py-[1px] px-[10px]" />
              ) : (
                ""
              )}
            </div>

            {checkbox === true ? (
              <GoogleProSelectedPages />
            ) : "" || location === "selected_pages" ? (
              <GoogleProSelectedPages />
            ) : (
              ""
            )}
            {checkbox && <OneTapSelectTag />}
          </div>
        </div>
      )}
    </div>
  );
}
