import { __ } from "@wordpress/i18n";
import { useSelector } from "react-redux";

import GoogleLogin from "./google/GoogleLogin";
import GoogleClientID from "./google/GoogleClientID";
import GoogleInNativeLogin from "./google/GoogleInNativeLogin";
import GoogleInUpdateExistingUserData from "./google/GoogleInUpdateExistingUserData";
import GoogleCancelOnTapOutside from "./google/GoogleCancelOnTapOutside";
import GoogleProDefaultUserRole from "./google/GoogleProDefaultUserRole";
import GoogleProRedirectUrl from "./google/GoogleProRedirectUrl";
import GoogleUpdateUserAvatar from "./google/GoogleUpdateUserAvatar";
import OneTapToLogin from "./google/OneTapToLogin";
import FacebookAppId from "./facebook/FacebookAppId";
import FacebookLogin from "./facebook/FacebookLogin";
import FacebookInNativeLogin from "./facebook/FacebookNativeLogin";
import FacebookProDefaultUserRole from "./facebook/FacebookProDefaultUserRole";
import FacebookInUpdateExistingUserData from "./facebook/FacebookInUpdateExistingUserData";
import FacebookUpdateUserAvatar from "./facebook/FacebookUpdateUserAvatar";
import FacebookProRedirectUrl from "./facebook/FacebookProRedirectUrl";
// import PasscodeInput from "./PasscodeInput";


function SettingsWrapper({ state }) {
  const wrappers = wp.hooks.applyFilters(
    "login_me_now_dashboard.settings_tab_wrappers",
    {
      "google": (
        <>
          <GoogleLogin />
          <GoogleClientID />
          <OneTapToLogin /> 
          <GoogleCancelOnTapOutside />
          <GoogleInNativeLogin />
          <GoogleProDefaultUserRole />
          <GoogleInUpdateExistingUserData />
          <GoogleUpdateUserAvatar />
          <GoogleProRedirectUrl />
        </>
      ),
      "facebook": (
        <>
          <FacebookLogin />
          <FacebookAppId />
          <FacebookInNativeLogin />
          <FacebookProDefaultUserRole />
          <FacebookInUpdateExistingUserData />
          <FacebookUpdateUserAvatar />
          <FacebookProRedirectUrl />
        </>
      ),
    }
  );
  return <div>{wrappers[state]}</div>;
}

const ContainerSettings = () => {
  const activeSocialLoginNavigationTab = useSelector(
    (state) => state.activeSocialLoginNavigationTab
  );

  // Parent Div is Required to add Padding to the Entire Structure for Smaller Windows.
  return (
    <>
      <div className="lg:col-span-10 border-l px-14">
        {wp.hooks.applyFilters(
          `login_me_now_dashboard.settings_screen_before_${activeSocialLoginNavigationTab}`,
          <span />
        )}
        <SettingsWrapper state={activeSocialLoginNavigationTab}></SettingsWrapper>
        {wp.hooks.applyFilters(
          `login_me_now_dashboard.settings_screen_after_${activeSocialLoginNavigationTab}`,
          <span />
        )}
      </div>
    </>
  );
};

export default ContainerSettings;