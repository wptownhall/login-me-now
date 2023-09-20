import { __ } from "@wordpress/i18n";
import { useSelector } from "react-redux";

import Logs from "./general/Logs";
import LogsExpiration from "./general/LogsExpiration";
import UserSwitching from "./general/UserSwitching";

import GoogleLogin from "./google/GoogleLogin";
import GoogleClientID from "./google/GoogleClientID";
import GoogleInNativeLogin from "./google/GoogleInNativeLogin";
import GoogleInUpdateExistingUserData from "./google/GoogleInUpdateExistingUserData";
import GoogleCancelOnTapOutside from "./google/GoogleCancelOnTapOutside";
import GoogleProDefaultUserRole from "./google/GoogleProDefaultUserRole";
import GoogleProExcludePages from "./google/GoogleProExcludePages";
import GoogleProRedirectUrl from "./google/GoogleProRedirectUrl";


import License from "./license/License";
import GoogleUpdateUserAvatar from "./google/GoogleUpdateUserAvatar";
import Dashboard from "./social-login/Dashboard";
import FacebookClientID from "./facebook/FacebookClientID";
import FacebookLogin from "./facebook/FacebookLogin";
import FacebookInNativeLogin from "./facebook/FacebookInNativeLogin";
import FacebookInUpdateExistingUserData from "./facebook/FacebookInUpdateExistingUserData";
import FacebookUpdateUserAvatar from "./facebook/FacebookUpdateUserAvatar";
import FacebookProRedirectUrl from "./facebook/FacebookProRedirectUrl";


function SettingsWrapper({ state }) {
  const wrappers = wp.hooks.applyFilters(
    "login_me_now_dashboard.settings_tab_wrappers",
    {
      "global-settings": (
        <>
          <UserSwitching />
          {/* <Logs />
          <LogsExpiration /> */}
        </>
      ),
      "social-login": (
        <>
          <Dashboard />
        </>
      ),
      "login-with-facebook": (
        <>
          <FacebookLogin />
          <FacebookClientID />
          <FacebookInNativeLogin />
          {/* <FacebookProDefaultUserRole /> */}
          <FacebookInUpdateExistingUserData />
          <FacebookUpdateUserAvatar />
          <FacebookProRedirectUrl />
        </>
      ),
      "login-with-google": (
        <>
          <GoogleLogin />
          <GoogleClientID />
          <GoogleInNativeLogin />
          <GoogleProDefaultUserRole />
          <GoogleInUpdateExistingUserData />
          <GoogleUpdateUserAvatar />
          <GoogleProExcludePages />
          <GoogleCancelOnTapOutside />
          <GoogleProRedirectUrl />
        </>
      ),
      license: (
        <>
          <License />
        </>
      ),
    }
  );
  return <div>{wrappers[state]}</div>;
}

const ContainerSettings = () => {
  const activeSettingsNavigationTab = useSelector(
    (state) => state.activeSettingsNavigationTab
  );

  // Parent Div is Required to add Padding to the Entire Structure for Smaller Windows.
  return (
    <>
      <div className="lg:col-span-9 border-l">
        {wp.hooks.applyFilters(
          `login_me_now_dashboard.settings_screen_before_${activeSettingsNavigationTab}`,
          <span />
        )}
        <SettingsWrapper state={activeSettingsNavigationTab}></SettingsWrapper>
        {wp.hooks.applyFilters(
          `login_me_now_dashboard.settings_screen_after_${activeSettingsNavigationTab}`,
          <span />
        )}
      </div>
    </>
  );
};

export default ContainerSettings;
