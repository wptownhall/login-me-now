import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ActivePhoneNumber() {
  const dispatch = useDispatch();

  const enableSignInActivePhone = useSelector(
    (state) => state.enableSignInPhoneNumber
  );
  const handleActivePhone = () => {
    let assetStatus;
    if (
      enableSignInActivePhone === false ||
      enableSignInActivePhone === undefined
    ) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "ENABLE_SIGN_IN_PHONE_NUMBER",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "enable_sign_in_phone_number");
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
        enableSignInActivePhone && "bg-[#f5f5f5]"
      } flex justify-between items-center p-4 rounded-[6px] mb-2`}
    >
      <div className="flex items-center">
        <svg
          class="flex-shrink-0 mr-4 stroke-inherit"
          fill="#8e8e8e"
          width="20px"
          height="20px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M478.94,370.14c-5.22-5.56-23.65-22-57.53-43.75-34.13-21.94-59.3-35.62-66.52-38.81a3.83,3.83,0,0,0-3.92.49c-11.63,9.07-31.21,25.73-32.26,26.63-6.78,5.81-6.78,5.81-12.33,4-9.76-3.2-40.08-19.3-66.5-45.78s-43.35-57.55-46.55-67.3c-1.83-5.56-1.83-5.56,4-12.34.9-1.05,17.57-20.63,26.64-32.25a3.83,3.83,0,0,0,.49-3.92c-3.19-7.23-16.87-32.39-38.81-66.52-21.78-33.87-38.2-52.3-43.76-57.52A3.9,3.9,0,0,0,138,32.2,322.35,322.35,0,0,0,82,57.65,338,338,0,0,0,33.35,92a3.83,3.83,0,0,0-1.26,3.74c2.09,9.74,12.08,50.4,43.08,106.72,31.63,57.48,53.55,86.93,100,133.22S252,405.21,309.54,436.84c56.32,31,97,41,106.72,43.07a3.86,3.86,0,0,0,3.75-1.26A337.73,337.73,0,0,0,454.35,430a322.7,322.7,0,0,0,25.45-56A3.9,3.9,0,0,0,478.94,370.14Z" />
        </svg>
        <span className="text-[16px] font-semibold">Phone Number</span>
      </div>

      <Switch
        onChange={handleActivePhone}
        className={classNames(
          enableSignInActivePhone ? "bg-lmn" : "bg-slate-200",
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
            enableSignInActivePhone ? "bg-lmn" : "bg-gray-200",
            "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enableSignInActivePhone ? "translate-x-5" : "translate-x-0",
            "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
          )}
        />
      </Switch>
    </div>
  );
}

export default ActivePhoneNumber;
