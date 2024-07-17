import { __ } from "@wordpress/i18n";
import { useSelector } from "react-redux";

import GoogleLogin from "./phone/GoogleLogin";
import GoogleClientID from "./phone/GoogleClientID";
import GoogleInNativeLogin from "./phone/GoogleInNativeLogin";
import GoogleInUpdateExistingUserData from "./phone/GoogleInUpdateExistingUserData";
import GoogleCancelOnTapOutside from "./phone/GoogleCancelOnTapOutside";
import GoogleProDefaultUserRole from "./phone/GoogleProDefaultUserRole";
import GoogleProRedirectUrl from "./phone/GoogleProRedirectUrl";
import GoogleUpdateUserAvatar from "./phone/GoogleUpdateUserAvatar";
import OneTapToLogin from "./phone/OneTapToLogin";
import FacebookAppId from "./email/FacebookAppId";
import FacebookLogin from "./email/FacebookLogin";
import FacebookInNativeLogin from "./email/FacebookNativeLogin";
import FacebookProDefaultUserRole from "./email/FacebookProDefaultUserRole";
import FacebookInUpdateExistingUserData from "./email/FacebookInUpdateExistingUserData";
import FacebookProRedirectUrl from "./email/FacebookProRedirectUrl";


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
          {/* <FacebookUpdateUserAvatar /> */}
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