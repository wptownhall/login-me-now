import { __ } from "@wordpress/i18n";
import { useSelector } from "react-redux";

import UserSwitching from "./general/UserSwitching";

import License from "./license/License";

function SettingsWrapper({ state }) {
  const wrappers = wp.hooks.applyFilters(
    "login_me_now_dashboard.settings_tab_wrappers",
    {
      "global-settings": (
        <>
          <UserSwitching />
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
