import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ActiveEmail() {
    const dispatch = useDispatch()

  const enableSignInActiveEmail = useSelector((state) => state.enableSignInEmailAddress);
  const handleActiveEmail = () => {
    let assetStatus;
    if (enableSignInActiveEmail === false || enableSignInActiveEmail === undefined) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "ENABLE_SIGN_IN_EMAIL_ADDRESS",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "enable_sign_in_email_address");
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
        enableSignInActiveEmail && "bg-[#f5f5f5]"
      } flex justify-between items-center p-4 rounded-[6px] mb-2`}
    >
      <div className="flex items-center">
        <svg
          class="flex-shrink-0 mr-4 stroke-inherit"
          width="20px"
          height="20px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="mail-filled-white"
              fill="#8e8e8e"
              transform="translate(42.686667, 85.339333)"
            >
              <path
                d="M3.55271368e-14,28.7 L213.333914,220.70134 L426.667,28.701 L426.667248,341.333608 L0.00058094128,341.333608 L3.55271368e-14,28.7 Z M394.776,1.42108547e-14 L213.333914,163.285608 L31.89,1.42108547e-14 L394.776,1.42108547e-14 Z"
                id="Combined-Shape"
              ></path>
            </g>
          </g>
        </svg>
        <span className="text-[16px] font-semibold">Email Address</span>
        <span className="text-[12px] italic text-[#368149] font-bold ml-3">
          Popular
        </span>
      </div>

      <Switch
        onChange={handleActiveEmail}
        className={classNames(
          enableSignInActiveEmail ? "bg-lmn" : "bg-slate-200",
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
            enableSignInActiveEmail ? "bg-lmn" : "bg-gray-200",
            "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enableSignInActiveEmail ? "translate-x-5" : "translate-x-0",
            "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
          )}
        />
      </Switch>
    </div>
  );
}

export default ActiveEmail;
