import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Google() {
  const dispatch = useDispatch();

  const enableSignInActiveGoogle = useSelector(
    (state) => state.lfEnableSignInGoogle
  );
  const handleActiveGoogle = () => {
    let assetStatus;
    if (
      enableSignInActiveGoogle === false ||
      enableSignInActiveGoogle === undefined
    ) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "ENABLE_SIGN_IN_GOOGLE",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "enable_sign_in_google");
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
      className={`flex justify-between items-center p-4 rounded-[6px] mb-3 border border-[#9F9F9F]`}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M22.714 10.4596H21.875V10.4163H12.5V14.583H18.387C17.5281 17.0085 15.2203 18.7497 12.5 18.7497C9.04842 18.7497 6.24998 15.9512 6.24998 12.4997C6.24998 9.04811 9.04842 6.24967 12.5 6.24967C14.0932 6.24967 15.5427 6.85072 16.6463 7.83249L19.5927 4.88613C17.7323 3.15228 15.2437 2.08301 12.5 2.08301C6.74738 2.08301 2.08331 6.74707 2.08331 12.4997C2.08331 18.2523 6.74738 22.9163 12.5 22.9163C18.2526 22.9163 22.9166 18.2523 22.9166 12.4997C22.9166 11.8012 22.8448 11.1195 22.714 10.4596Z"
            fill="#FFC107"
          />
          <path
            d="M3.28436 7.65124L6.70676 10.1611C7.6328 7.86842 9.87551 6.24967 12.5 6.24967C14.0932 6.24967 15.5427 6.85072 16.6463 7.83249L19.5927 4.88613C17.7323 3.15228 15.2437 2.08301 12.5 2.08301C8.49895 2.08301 5.02915 4.34186 3.28436 7.65124Z"
            fill="#FF3D00"
          />
          <path
            d="M12.5 22.9165C15.1906 22.9165 17.6354 21.8868 19.4839 20.2124L16.2599 17.4842C15.1789 18.3063 13.8581 18.7509 12.5 18.7499C9.79063 18.7499 7.4901 17.0223 6.62344 14.6113L3.22656 17.2285C4.95052 20.602 8.45156 22.9165 12.5 22.9165Z"
            fill="#4CAF50"
          />
          <path
            d="M22.7141 10.4602H21.875V10.417H12.5V14.5837H18.387C17.9761 15.738 17.2361 16.7468 16.2583 17.4852L16.2599 17.4842L19.4839 20.2123C19.2557 20.4196 22.9167 17.7087 22.9167 12.5003C22.9167 11.8019 22.8448 11.1201 22.7141 10.4602Z"
            fill="#1976D2"
          />
        </svg>
        <span className="text-[18px] text-black ml-3">Google</span>
      </div>
      <div className="px-2 py-2">
        <Switch
          onChange={handleActiveGoogle}
          className={classNames(
            enableSignInActiveGoogle ? "bg-lmn" : "bg-slate-200",
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
              enableSignInActiveGoogle ? "bg-lmn" : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableSignInActiveGoogle ? "translate-x-5" : "translate-x-0",
              "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Google;
