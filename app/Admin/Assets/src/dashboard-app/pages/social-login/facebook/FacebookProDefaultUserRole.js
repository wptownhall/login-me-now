import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import { Listbox } from "@headlessui/react";
import apiFetch from "@wordpress/api-fetch";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ProBtn from "../google/components/ProBtn";
import { Tooltip } from "antd";

const FacebookProDefaultUserRole = () => {
  const enableFacebookLogin = useSelector((state) => state.enableFacebookLogin);
  const enableFacebookLoginStatus = false === enableFacebookLogin ? false : true;
  const dispatch = useDispatch();
  const isProAvailable = lmn_admin.pro_available ? true : false;

  const getUserRoles = useSelector((state) => state.getUserRoles);

  const updateFacebookProDefaultUserRole = (role) => {
    console.log("role check: ", role)
    dispatch({
      type: "UPDATE_SELECT_FACEBOOK_PRO_DEFAULT_USER_ROLE",
      payload: role,
    });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "facebook_pro_default_user_role");
    formData.append("value", role);

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

  const role = useSelector((state) => state.selectGoogleProDefaultUserRole);
	let currentOption = 'Subscriber';
	if (getUserRoles && Object.hasOwnProperty.call(getUserRoles, role)) {
		currentOption = getUserRoles[role];
	}

  return (
    <section
      className={`${
        enableFacebookLoginStatus ? "block" : "hidden"
      } block border-b border-solid border-slate-200 py-12 justify-between`}
    >
      <div className="mr-16 w-full flex flex-col pr-[10%]">
        <h3 className="p-0 flex-1 justify-right inline-flex text-[20px] leading-6 font-semibold text-slate-800">
          {__("User role permission level", "login-me-now")}
          {!lmn_admin.pro_available ? <ProBtn /> : ""}
        </h3>
        <p className="mt-6 mb-6 w-9/12 text-[16px] text-slate-500 tablet:w-full">
          {__(
            "Select the role that will be assigned to new users who sign up",
            "login-me-now"
          )}
        </p>
        <Listbox
          disabled={isProAvailable ? false : true}
          onChange={updateFacebookProDefaultUserRole}
        >
          <Tooltip
            title={`${isProAvailable === false ? "Upgrade to Pro" : ""}`}
            placement="rightTop"
          >
            <Listbox.Button
              className={`${
                !isProAvailable && "opacity-40"
              } block w-full text-left h-[50px] pl-3 pr-0 py-0 mt-3 text-lg border !border-slate-200 rounded-[4px]`}
            >
              <span className="block truncate text-[16px]">{currentOption}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Listbox.Options className="p-3 absolute mt-1 max-h-60 w-[400px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-[16px]">
              {Object.keys(getUserRoles).map((key) => (
                <Listbox.Option
                  key={key}
                  value={key}
                  className="text-lg text-slate-800 relative cursor-pointer py-2 pr-1 mb-1"
                >
                  {getUserRoles[key]}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Tooltip>
        </Listbox>

        {/* <Selector getUserRoles={getUserRoles}/> */}
      </div>
      <p className="mt-6 w-9/12 text-[16px] text-slate-500 tablet:w-full leading-[1.7]">
        {__("By default user role is set as per", "login-me-now")}
        <span className="text-slate-500 font-medium">
          {__(" Settings > New User Default Role", "login-me-now")}
        </span>
      </p>
    </section>
  );
};

export default FacebookProDefaultUserRole;
