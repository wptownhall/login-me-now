import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Twitter() {
  const dispatch = useDispatch();

  const enableSignInActiveTwitter = useSelector(
    (state) => state.lfEnableSignInTwitter
  );
  const handleActiveGoogle = () => {
    let assetStatus;
    if (
      enableSignInActiveTwitter === false ||
      enableSignInActiveTwitter === undefined
    ) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "ENABLE_SIGN_IN_TWITTER",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "enable_sign_in_twitter");
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
      className={`bg-black flex justify-between items-center p-4 rounded-[6px] mb-3 border border-[#9F9F9F]`}
    >
      <div className="flex items-center">
        <svg
          class="flex-shrink-0 stroke-inherit"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_1490_8)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.753 4.659C19.8395 4.56011 19.9056 4.44516 19.9477 4.32071C19.9897 4.19626 20.0069 4.06475 19.9981 3.93368C19.9893 3.80261 19.9548 3.67455 19.8965 3.55682C19.8383 3.43908 19.7574 3.33398 19.6585 3.2475C19.5596 3.16102 19.4447 3.09487 19.3202 3.05282C19.1958 3.01077 19.0642 2.99364 18.9332 3.00242C18.8021 3.01119 18.6741 3.0457 18.5563 3.10396C18.4386 3.16223 18.3335 3.24311 18.247 3.342L13.137 9.182L8.8 3.4C8.70685 3.2758 8.58607 3.175 8.44721 3.10557C8.30836 3.03614 8.15525 3 8 3H4C3.81429 3 3.63225 3.05171 3.47427 3.14935C3.31629 3.24698 3.18863 3.38668 3.10557 3.55279C3.02252 3.71889 2.98736 3.90484 3.00404 4.08981C3.02072 4.27477 3.08857 4.45143 3.2 4.6L9.637 13.182L4.247 19.342C4.16053 19.4409 4.09437 19.5558 4.05232 19.6803C4.01027 19.8047 3.99314 19.9363 4.00192 20.0673C4.01069 20.1984 4.0452 20.3264 4.10347 20.4442C4.16173 20.5619 4.24262 20.667 4.3415 20.7535C4.44039 20.84 4.55534 20.9061 4.67979 20.9482C4.80424 20.9902 4.93575 21.0074 5.06682 20.9986C5.19789 20.9898 5.32595 20.9553 5.44368 20.897C5.56142 20.8388 5.66653 20.7579 5.753 20.659L10.863 14.818L15.2 20.6C15.2931 20.7242 15.4139 20.825 15.5528 20.8944C15.6916 20.9639 15.8448 21 16 21H20C20.1857 21 20.3678 20.9483 20.5257 20.8507C20.6837 20.753 20.8114 20.6133 20.8944 20.4472C20.9775 20.2811 21.0126 20.0952 20.996 19.9102C20.9793 19.7252 20.9114 19.5486 20.8 19.4L14.363 10.818L19.753 4.659ZM16.5 19L6 5H7.5L18 19H16.5Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1490_8">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="text-[18px] text-white ml-3">
          X (formerly Twitter)
        </span>
      </div>
      <div className="bg-[#f8fafc] px-2 py-2">
        <Switch
          onChange={handleActiveGoogle}
          className={classNames(
            enableSignInActiveTwitter ? "bg-lmn" : "bg-slate-200",
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
              enableSignInActiveTwitter ? "bg-lmn" : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableSignInActiveTwitter ? "translate-x-5" : "translate-x-0",
              "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Twitter;