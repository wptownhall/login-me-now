import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";
import ProBtn from "../google/components/ProBtn";
import { Tooltip } from "antd";

const FacebookProRedirectUrl = () => {
  const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);
  const enableFacebookLoginStatus = false === enableFacebookLogin ? false : true;
  const dispatch = useDispatch();
  const inputFacebookProRedirectUrl = useSelector(
    (state) => state.inputFacebookProRedirectUrl
  );

  const isProAvailable = lmn_admin.pro_available ? true : false;

  const updateFacebookProRedirectUrl = (URL) => {
    dispatch({
      type: "UPDATE_INPUT_FACEBOOK_PRO_REDIRECT_URL",
      payload: URL.target.value,
    });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "facebook_pro_redirect_url");
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
        enableFacebookLoginStatus ? "block" : "hidden"
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
            onChange={updateFacebookProRedirectUrl}
            className={`${
              !isProAvailable && "opacity-40"
            } block w-full h-[50px] !p-3 !border-slate-200`}
            value={inputFacebookProRedirectUrl}
            type="text"
            name="name"
            placeholder="ex: https://example.com/dashboard/"
          />
        </Tooltip>
      </div>
    </section>
  );
};

export default FacebookProRedirectUrl;
