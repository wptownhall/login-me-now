import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FacebookUpdateUserAvatar = () => {
  const dispatch = useDispatch();

  const enableFacebookUpdateExistingUserAvatar = useSelector(
    (state) => state.enableFacebookUpdateExistingUserAvatar
  );
  const enableFacebookUpdateExistingUserAvatarStatus =
    false === enableFacebookUpdateExistingUserAvatar ? false : true;

  const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);
  const enableFacebookLoginStatus =
    false === enableFacebookLogin ? false : true;

  const updateLogsStatus = () => {
    let assetStatus;
    if (enableFacebookUpdateExistingUserAvatar === false) {
      assetStatus = true;
    } else {
      assetStatus = false;
    }

    dispatch({
      type: "UPDATE_ENABLE_FACEBOOK_UPDATE_EXISTING_USER_AVATAR",
      payload: assetStatus,
    });

    const formData = new window.FormData();

    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "facebook_pro_user_avatar");
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
    <section
      className={`${
        enableFacebookLoginStatus ? "block" : "hidden"
      } login-me-now-dep-field-${enableFacebookLoginStatus} border-b border-solid border-slate-200 px-8 py-8 justify-between`}
    >
      <div className="mr-16 w-full flex items-center">
        <h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
          {__("Update User Avatar", "login-me-now")}
        </h3>
        <Switch
          checked={enableFacebookUpdateExistingUserAvatarStatus}
          onChange={updateLogsStatus}
          className={classNames(
            enableFacebookUpdateExistingUserAvatarStatus
              ? "bg-lmn"
              : "bg-slate-200",
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
              enableFacebookUpdateExistingUserAvatarStatus
                ? "bg-lmn"
                : "bg-gray-200",
              "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enableFacebookUpdateExistingUserAvatarStatus
                ? "translate-x-5"
                : "translate-x-0",
              "toggle-bubble pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
      <p className="mt-2 w-9/12 text-sm text-slate-500 tablet:w-full">
        {__(
          "It retrieves the first name, last name, display name, and nickname from users' Facebook profile",
          "login-me-now"
        )}
      </p>
    </section>
  );
};

export default FacebookUpdateUserAvatar;
