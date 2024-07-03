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

const GoogleClientID = () => {
  const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
  const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;
  let enableGoogleClientID = useSelector((state) => state.enableGoogleClientID);
  let enableGoogleClientSecret = useSelector((state) => state.enableGoogleClientSecret);

  const dispatch = useDispatch();

  const updateGoogleClientSecret = (clientSecret) => {
    dispatch({
      type: "UPDATE_GOOGLE_CLIENT_SECRET",
      payload: clientSecret.target.value,
    });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_client_secret");
    formData.append("value", clientSecret.target.value);

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

  const updateGoogleClientID = (clientID) => {
    dispatch({
      type: "UPDATE_GOOGLE_CLIENT_ID",
      payload: clientID.target.value,
    });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_client_id");
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
        enableGoogleLoginStatus ? "block" : "hidden"
      } text-[16px] border-b border-solid border-slate-200 pt-6 pb-12 justify-between pr-[10%]`}
    >
      <div className="mr-16 w-full flex space-y-3">
        <span class="text-black-400 w-[30%]">
          {__("Enter", "login-me-now")}
          <a
            class="text-[#2271B1] text-[16px]"
            target="_blank"
            href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid"
          >
            {__(" Google Client ID", "login-me-now")}
          </a>
        </span>
        <input
          onChange={updateGoogleClientID}
          className="block h-[50px] !p-3 !border-slate-200 w-[70%] !mt-0"
          value={enableGoogleClientID}
          type="text"
          name="name"
          placeholder="ex: ********-**********.apps.googleusercontent.com"
        />
      </div>

      <div className="mr-16 mt-2 w-full flex space-y-3">
        <span class="text-black-400 w-[30%]">
          {__("Enter Google Client Secret", "login-me-now")}
        </span>

        <input
          onChange={updateGoogleClientSecret}
          className="block h-[50px] !p-3 !border-slate-200 w-[70%] !mt-0"
          value={enableGoogleClientSecret}
          type="text"
          name="name"
          placeholder="ex: ***-***********-GsF"
        />
        
      </div>
      

      <div className="mr-16 w-full flex space-y-3 al">
        
         <span class="text-black-400 w-[30%] text-[16px] mt-5">
            {__("Follow the ", "login-me-now")}
          <a
              class="text-[#2271B1] underline"
              target="_blank"
              href="https://youtu.be/qS4dY7syQwA?t=471"
            >
            {__("tutorial", "login-me-now")}
          </a>
        </span>
      </div>
     

      <div className="mr-16 w-full flex space-y-3 al mt-3">
        {__("Redirect URL ", "login-me-now")}
        
        <pre> {lmn_admin.google_redirect_url}</pre>

      </div>

    </section>
  );
};

export default GoogleClientID;
