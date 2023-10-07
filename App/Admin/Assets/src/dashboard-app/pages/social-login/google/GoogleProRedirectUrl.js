import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";
import ProBtn from "./components/ProBtn";
import { Tooltip } from "antd";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GoogleProRedirectUrl = () => {
  const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
  const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;
  const dispatch = useDispatch();
  const inputGoogleProRedirectUrl = useSelector(
    (state) => state.inputGoogleProRedirectUrl
  );
  const inputGoogleProRedirectUrlStatus =
    false === inputGoogleProRedirectUrl ? false : true;
  const isProAvailable = lmn_admin.pro_available ? true : false;

  const updateGoogleProRedirectUrl = (URL) => {
    dispatch({
      type: "UPDATE_INPUT_GOOGLE_PRO_REDIRECT_URL",
      payload: URL.target.value,
    });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_pro_redirect_url");
    formData.append("value", URL.target.value);

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
    <section
      className={`${
        enableGoogleLoginStatus ? "block" : "hidden"
      } text-[16px] block border-b border-solid border-slate-200 py-12 justify-between`}
    >
      <div className="mr-16 w-full flex flex-col space-y-3 pr-[10%]">
        <h3 className="p-0 mb-5 flex-1 justify-right inline-flex text-[20px] leading-6 font-semibold text-slate-800">
          {__(
            "Redirect after successful login and registration",
            "login-me-now"
          )}
          {!isProAvailable ? <ProBtn /> : ""}
        </h3>
        <Tooltip
          placement="rightTop"
          title={`${isProAvailable === false ? "Upgrade to Pro" : ""}`}
        >
          <input
            disabled={isProAvailable ? false : true}
            onChange={updateGoogleProRedirectUrl}
            className={`${
              !isProAvailable && "opacity-40"
            } block w-full h-[50px] !p-3 !border-slate-200`}
            value={inputGoogleProRedirectUrl}
            type="text"
            name="name"
            placeholder="ex: https://example.com/dashboard/"
          />
        </Tooltip>
        <p className="mt-6 text-[16px] text-slate-500 tablet:w-full leading-[1.7]">
          By default redirection is set to dashboard
        </p>
      </div>
    </section>
  );
};

export default GoogleProRedirectUrl;
