import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Listbox } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";

const expirationOptions = [
  { days: 7, name: __("7 Days", "login-me-now") },
  { days: 30, name: __("30 Days", "login-me-now") },
  { days: 60, name: __("60 Days", "login-me-now") },
  { days: 90, name: __("90 Days", "login-me-now") },
];

const FacebookClientID = () => {
  const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);
  const enableFacebookLoginStatus =
    false === enableFacebookLogin ? false : true;
  let enableFacebookClientID = useSelector(
    (state) => state.enableFacebookClientID
  );

  const dispatch = useDispatch();

  const updateFacebookClientID = (clientID) => {
    dispatch({
      type: "UPDATE_FACEBOOK_CLIENT_ID",
      payload: clientID.target.value,
    });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "facebook_client_id");
    formData.append("value", clientID.target.value);

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
      } text-sm border-b border-solid border-slate-200 px-8 py-8 justify-between`}
    >
      <div className="mr-16 w-full flex flex-col space-y-3">
        <h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
          {__("App ID", "login-me-now")}
        </h3>
        <input
          onChange={updateFacebookClientID}
          className="block w-full h-[50px] !p-3 !border-slate-200"
          value={enableFacebookClientID}
          type="text"
          name="name"
          placeholder="ex: ********-**********.apps.facebookusercontent.com"
        />
        <span class="text-blue-400">
          {__("Find your Facebook App ID for", "login-me-now")}
          <a
            class="text-green-400"
            target="_blank"
            href="https://developers.facebook.com/identity/gsi/web/guides/get-facebook-api-clientid"
          >
            {__(" FREE", "login-me-now")}
          </a>
          . {__("Follow the", "login-me-now")}
          <a
            class="text-green-400"
            target="_blank"
            href="https://youtu.be/qS4dY7syQwA?t=471"
          >
            {__(" Tutorial", "login-me-now")}
          </a>
        </span>
      </div>
    </section>
  );
};

export default FacebookClientID;
