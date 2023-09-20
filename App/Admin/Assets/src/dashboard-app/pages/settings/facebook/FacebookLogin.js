import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";
import { useState } from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FacebookLogin = () => {
  const dispatch = useDispatch();

  const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);

  const [enabled, setEnabled] = useState(
    enableFacebookLogin === false ? false : true
  );
  const enableFacebookLoginStatus =
    false === enableFacebookLogin ? false : true;

  const updateLogsStatus = () => {
    let assetStatus;
    if (enableFacebookLogin === false) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({ type: "UPDATE_ENABLE_FACEBOOK_LOGIN", payload: assetStatus });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "facebook_login");
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

  const handleSocialHidden = () => {
    setEnabled(enableFacebookLogin === false ? false : !enabled);
    console.log("enableFacebook: ", enableFacebookLogin, "hidden: ", enabled);
  };

  return (
    <section className="block bg-slate-50 border-b border-solid border-slate-200 px-8 py-8 justify-between">
      <div className="mr-16 w-full flex items-center">
        <h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
          {__("Facebook Login", "login-me-now")}
        </h3>
        <Switch
          checked={enableFacebookLoginStatus}
          onChange={updateLogsStatus}
          className={classNames(
            enableFacebookLoginStatus ? "bg-lmn" : "bg-slate-200",
            "group relative inline-flex h-4 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-lmn focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableFacebookLoginStatus ? "bg-lmn" : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableFacebookLoginStatus ? "translate-x-5" : "translate-x-0",
              "toggle-bubble pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
      <p className="mt-2 w-9/12 text-sm text-slate-500 tablet:w-full">
        {__(
          "Enable this option to allow users to use facebook account for login and register in one click.",
          "login-me-now"
        )}
      </p>
    </section>
  );
};

export default FacebookLogin;
