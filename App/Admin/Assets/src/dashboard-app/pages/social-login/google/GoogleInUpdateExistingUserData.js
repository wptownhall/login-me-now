import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";
import { Tooltip } from "antd";
import ProBtn from "./components/ProBtn";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GoogleInUpdateExistingUserData = () => {
  const dispatch = useDispatch();

  const enableGoogleUpdateExistingUserData = useSelector(
    (state) => state.enableGoogleUpdateExistingUserData
  );
  const enableGoogleUpdateExistingUserDataStatus =
    false === enableGoogleUpdateExistingUserData ? false : true;

  const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
  const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;

  const updateLogsStatus = () => {
    let assetStatus;
    if (enableGoogleUpdateExistingUserData === false) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "UPDATE_ENABLE_GOOGLE_UPDATE_EXISTING_USER_DATA",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_update_existing_user_data");
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

  const isProAvailable = lmn_admin.pro_available ? true : false;

  return (
    <section
      className={`${
        enableGoogleLoginStatus ? "block" : "hidden"
      } login-me-now-dep-field-${enableGoogleLoginStatus} border-b border-solid border-slate-200 py-12 justify-between`}
    >
      <div className="mr-16 w-full flex items-center ">
        <h3 className="p-0 flex-1 justify-right inline-flex text-[20px] leading-6 font-semibold text-slate-800">
          {__("Update existing user name", "login-me-now")}
          {!isProAvailable ? <ProBtn /> : ""}
        </h3>
        <Tooltip title={`${isProAvailable === false ? "Upgrade to Pro" : ""}`}>
          <Switch
            checked={enableGoogleUpdateExistingUserDataStatus}
            onChange={isProAvailable === true ? updateLogsStatus : false}
            className={classNames(
              enableGoogleUpdateExistingUserDataStatus
                ? "bg-lmn"
                : "bg-slate-200",
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
                enableGoogleUpdateExistingUserDataStatus
                  ? "bg-lmn"
                  : "bg-gray-200",
                "pointer-events-none absolute mx-auto h-4 w-7 rounded-full transition-colors duration-200 ease-in-out"
              )}
            />
            <span
              aria-hidden="true"
              className={classNames(
                enableGoogleUpdateExistingUserDataStatus
                  ? "translate-x-5"
                  : "translate-x-0",
                "toggle-bubble pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
              )}
            />
          </Switch>
        </Tooltip>
      </div>
      <p className="mt-6 w-9/12 text-[16px] text-slate-500 tablet:w-full leading-[1.7]">
        {__(
          "Automatically retrieve the existing user first, last, nick & display name from google account upon login using gmail",
          "login-me-now"
        )}
      </p>
    </section>
  );
};

export default GoogleInUpdateExistingUserData;
