import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Listbox } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";

const FacebookAppId = () => {
  const dispatch = useDispatch();
  const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);
  const enableFacebookLoginStatus = false === enableFacebookLogin ? false : true;
  let enableFacebookAppID = useSelector((state) => state.enableFacebookAppID);

  const updateFacebookAppID = (appID) => {
    dispatch({
      type: "UPDATE_FACEBOOK_APP_ID",
      payload: appID.target.value,
    });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "facebook_app_id");
    formData.append("value", appID.target.value);

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
      } text-[16px] border-b border-solid border-slate-200 pt-6 pb-12 justify-between pr-[10%]`}
    >
      <div className="mr-16 w-full flex space-y-3">
        <span class="text-black-400 w-[30%]">
          {__("Enter ", "login-me-now")}
          <a
            class="text-[#2271B1] text-[16px]"
            target="_blank"
            href="https://developers.facebook.com/apps/"
          >
            {__("Facebook App ID", "login-me-now")}
          </a>
          {__(" here ", "login-me-now")}
        </span>
        <input
          onChange={updateFacebookAppID}
          className="block h-[50px] !p-3 !border-slate-200 w-[70%] !mt-0"
          value={enableFacebookAppID}
          type="text"
          name="name"
          placeholder="ex: 10************57"
        />
      </div>
    </section>
  );
};

export default FacebookAppId;
