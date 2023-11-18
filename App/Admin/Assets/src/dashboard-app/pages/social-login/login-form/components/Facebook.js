import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Facebook() {
  const dispatch = useDispatch();

  const enableSignInActiveFacebook = useSelector(
    (state) => state.lfEnableSignInFacebook
  );
  const handleActiveGoogle = () => {
    let assetStatus;
    if (
      enableSignInActiveFacebook === false ||
      enableSignInActiveFacebook === undefined
    ) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "ENABLE_SIGN_IN_FACEBOOK",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "enable_sign_in_facebook");
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
      className={`bg-[#1877F2] flex justify-between items-center p-4 rounded-[6px] mb-3 border border-[#9F9F9F]`}
    >
      <div className="flex items-center">
        <svg
          class="flex-shrink-0 stroke-inherit"
          height="24px"
          width="24px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M24 12C24 5.37262 18.6274 0 12 0C5.37262 0 0 5.37253 0 12C0 17.9895 4.38825 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6575 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3398 7.875 13.875 8.80003 13.875 9.74906V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6117 22.954 24 17.9896 24 12Z"
            fill="white"
          />
        </svg>
        <span className="text-[18px] text-white ml-3">Facebook</span>
      </div>
      <div className="bg-[#f8fafc] px-2 py-2">
        <Switch
          onChange={handleActiveGoogle}
          className={classNames(
            enableSignInActiveFacebook ? "bg-lmn" : "bg-slate-200",
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
              enableSignInActiveFacebook ? "bg-lmn" : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableSignInActiveFacebook ? "translate-x-5" : "translate-x-0",
              "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Facebook;
