import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ActiveGoogle() {
    const dispatch = useDispatch()

  const enableSignInActiveGoogle = useSelector((state) => state.enableSignInGoogle);
  const handleActiveGoogle = () => {
    let assetStatus;
    if (enableSignInActiveGoogle === false || enableSignInActiveGoogle === undefined) {
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
      className={`${
        enableSignInActiveGoogle && "bg-[#f5f5f5]"
      } flex justify-between items-center p-4 rounded-[6px] mb-2`}
    >
      <div className="flex items-center">
      <svg
        class="flex-shrink-0 mr-4 stroke-inherit"
        height="18px"
        width="18px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 326667 333333"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        image-rendering="optimizeQuality"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
          fill="#4285f4"
        ></path>
        <path
          d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
          fill="#34a853"
        ></path>
        <path
          d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
          fill="#fbbc04"
        ></path>
        <path
          d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
          fill="#ea4335"
        ></path>
      </svg>
        <span className="text-[16px] font-semibold">Google</span>
        <span className="text-[12px] italic text-[#368149] font-bold ml-3">
          Popular
        </span>
      </div>

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
  );
}

export default ActiveGoogle;
