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
      className={`flex justify-between items-center p-4 rounded-[6px] mb-3 border border-[#9F9F9F]`}
    >
      <div className="flex items-center">
        <svg
          class="flex-shrink-0 stroke-inherit"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.753 1.659C16.8395 1.56011 16.9056 1.44516 16.9477 1.32071C16.9897 1.19626 17.0069 1.06475 16.9981 0.933678C16.9893 0.802608 16.9548 0.674551 16.8965 0.556816C16.8383 0.439081 16.7574 0.333975 16.6585 0.2475C16.5596 0.161024 16.4447 0.0948727 16.3202 0.0528216C16.1958 0.0107705 16.0642 -0.00635638 15.9332 0.00241876C15.8021 0.0111939 15.6741 0.0456994 15.5563 0.103965C15.4386 0.16223 15.3335 0.243115 15.247 0.342L10.137 6.182L5.8 0.4C5.70685 0.275804 5.58607 0.175 5.44721 0.105573C5.30836 0.036145 5.15525 0 5 0H1C0.814289 0 0.632245 0.0517147 0.474269 0.149349C0.316293 0.246984 0.188626 0.386681 0.105573 0.552786C0.0225203 0.718892 -0.0126368 0.904844 0.00404117 1.08981C0.0207191 1.27477 0.0885733 1.45143 0.200001 1.6L6.637 10.182L1.247 16.342C1.16053 16.4409 1.09437 16.5558 1.05232 16.6803C1.01027 16.8047 0.993144 16.9363 1.00192 17.0673C1.01069 17.1984 1.0452 17.3264 1.10347 17.4442C1.16173 17.5619 1.24262 17.667 1.3415 17.7535C1.44039 17.84 1.55534 17.9061 1.67979 17.9482C1.80424 17.9902 1.93575 18.0074 2.06682 17.9986C2.19789 17.9898 2.32595 17.9553 2.44368 17.897C2.56142 17.8388 2.66653 17.7579 2.753 17.659L7.863 11.818L12.2 17.6C12.2931 17.7242 12.4139 17.825 12.5528 17.8944C12.6916 17.9639 12.8448 18 13 18H17C17.1857 18 17.3678 17.9483 17.5257 17.8507C17.6837 17.753 17.8114 17.6133 17.8944 17.4472C17.9775 17.2811 18.0126 17.0952 17.996 16.9102C17.9793 16.7252 17.9114 16.5486 17.8 16.4L11.363 7.818L16.753 1.659ZM13.5 16L3 2H4.5L15 16H13.5Z"
            fill="black"
          />
        </svg>
        <span className="text-[18px] text-black ml-3">X (formerly Twitter)</span>
      </div>

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
  );
}

export default Twitter;