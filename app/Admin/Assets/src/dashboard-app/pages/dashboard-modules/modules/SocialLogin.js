import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { RedirectUrl } from "../../components/RedirectUrl";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SocialLogin({ colorChange, proItem }) {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const enableDmSocialLogin = useSelector((state) => state.dmSocialLogin);

  const handleDmSocialLogin = () => {
    let assetStatus;
    if (enableDmSocialLogin === false || enableDmSocialLogin === undefined) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "ENABLE_DM_SOCIAL_LOGIN",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "social_login");
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
    <div className="mb-8 mx-4 flex">
      <div
        class={`relative rounded-[8px] border border-[#cacaca] flex flex-col justify-between ${
          hover === true ? "bg-[#0da071b0]" : "bg-[#F8FAFC]"
        }`}
        onMouseEnter={proItem === true ? handleMouseEnter : null}
        onMouseLeave={proItem === true ? handleMouseLeave : null}
      >
        <div className={`px-8 pt-16 pb-10 text-center responsive-box ${hover && "invisible"}`}>
          <div
            className="bg-[#FFFFFF] border-[1px] border-[#DFDFDF] inline-block py-2.5 px-3 rounded-[8px] mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M22.4774 23.4059C21.604 22.2495 20.474 21.3117 19.1764 20.6663C17.8788 20.021 16.4491 19.6858 14.9999 19.6871C13.5507 19.6858 12.121 20.021 10.8234 20.6663C9.52583 21.3117 8.39582 22.2495 7.5224 23.4059M22.4774 23.4059C24.1818 21.8899 25.3838 19.8916 25.9264 17.676C26.469 15.4604 26.3252 13.1322 25.5142 11.0002C24.7032 8.86822 23.2633 7.0331 21.3854 5.73825C19.5075 4.4434 17.2803 3.75 14.9993 3.75C12.7182 3.75 10.4911 4.4434 8.61315 5.73825C6.73524 7.0331 5.29531 8.86822 4.48431 11.0002C3.67332 13.1322 3.52958 15.4604 4.07217 17.676C4.61475 19.8916 5.81802 21.8899 7.5224 23.4059M22.4774 23.4059C20.4199 25.2411 17.7569 26.2536 14.9999 26.2496C12.2424 26.2539 9.58019 25.2414 7.5224 23.4059M18.7499 12.1871C18.7499 13.1817 18.3548 14.1355 17.6515 14.8388C16.9483 15.542 15.9945 15.9371 14.9999 15.9371C14.0053 15.9371 13.0515 15.542 12.3482 14.8388C11.645 14.1355 11.2499 13.1817 11.2499 12.1871C11.2499 11.1926 11.645 10.2387 12.3482 9.53548C13.0515 8.83222 14.0053 8.43713 14.9999 8.43713C15.9945 8.43713 16.9483 8.83222 17.6515 9.53548C18.3548 10.2387 18.7499 11.1926 18.7499 12.1871Z"
                stroke="#023A2E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-[#000000] text-[17px] font-medium text-center mb-5">
            Social login
            {proItem && (
              <span className="bg-[#0DA071] text-[#ffffff] px-2 py-0.5 text-[8px] rounded-[4px] ml-1.5">
                Pro
              </span>
            )}
          </h1>
          <p className="text-[#6B6D71] text-[14px] text-center leading-[1.9]">
            Simplify the login process and make it more convenient for users to
            login / register with social login options.
          </p>
        </div>
        <div
          className={`bg-[#F0F2F4] py-3 rounded-b-[8px] flex justify-between items-center px-4 border-t-[1px] border-t-[#cacaca] border-b-[#cacaca] ${
            hover && "invisible"
          }`}
        >
          <Link to={RedirectUrl("social-login")}>
          <button
            type="button"
            className={`bg-[#F8FAFC] border border-[#cacaca]  text-[#6B6D71] px-2 py-1 text-[14px] rounded-[8px] hover:border-[#0DA071]  hover:text-[#0DA071] ${
              !enableDmSocialLogin && "invisible"
            }`}
          >
            Settings
          </button>
          </Link>
          <Switch
            onChange={handleDmSocialLogin}
            className={classNames(
              enableDmSocialLogin ? "bg-lmn" : "bg-slate-200",
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
                enableDmSocialLogin ? "bg-lmn" : "bg-gray-200",
                "pointer-events-none absolute mx-auto h-[16px] w-[32px] rounded-full transition-colors duration-200 ease-in-out"
              )}
            />
            <span
              aria-hidden="true"
              className={classNames(
                enableDmSocialLogin ? "translate-x-5" : "translate-x-0",
                "toggle-bubble pointer-events-none absolute left-0 inline-block h-[16px] w-[16px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
              )}
            />
          </Switch>
        </div>
        <button
          className={`bg-white px-6 py-3 text-[18px] font-semibold text-[#0DA071] rounded-[8px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            !hover && "invisible"
          }`}
        >
          Buy Pro
        </button>
      </div>
    </div>
  );
}

export default SocialLogin;
