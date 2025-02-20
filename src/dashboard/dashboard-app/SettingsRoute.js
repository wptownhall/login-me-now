import React from "react";
import { useLocation } from "react-router-dom";
import Welcome from "@DashboardApp/pages/welcome/Welcome";
import AdvancedSharing from "@DashboardApp/pages/advanced-settings/AdvancedSharing";
import { FormDataProvider } from "../context/FormContext";
import BrowserExtensions from "./pages/browser-extensions/BrowserExtensions";
import DashboardModules from "./pages/dashboard-modules/DashboardModules";
import SocialLogin from './pages/social-login/SocialLogin';
import { useSelector } from "react-redux";

import License from "./pages/license/License";
const isProAvailable = lmn_admin.pro_available ? true : false;

function SettingsRoute() {
  const query = new URLSearchParams(useLocation().search);
  const page = query.get("page");
  const path = query.get("path");
  const currentEvent = query.get("event");
  const navStatus = useSelector((state) => state);

  const temporaryLoginStatus = navStatus.dmTemporaryLogin;
  const browserExtensionStatus = navStatus.dmBrowserExtension;
  const SocialLoginStatus = navStatus.dmSocialLogin;
  const OTPLoginStatus = navStatus.dmOTPLogin;

  let routePage = <p> Login Me Now Dashboard is Loading... </p>;

  if (lmn_admin.home_slug === page) {
    if ("getting-started" === currentEvent) {
      routePage = <Welcome />;
    } else {
      switch (path) {
        case "browser-extensions":
          if(browserExtensionStatus){
            routePage = <BrowserExtensions />;
          }
          break;
        case "temporary-login":
          if(temporaryLoginStatus){
            routePage = <Welcome />;
          }
          break;
        case 'social-login':
          if(SocialLoginStatus){
            routePage = <SocialLogin />
          }
          break;
        case 'otp-login':
          if(OTPLoginStatus){
            routePage = <OTPLogin />
          }
          break;
        case 'advanced-sharing':
          routePage = (
            <FormDataProvider>
              <AdvancedSharing />
            </FormDataProvider>
          );
          break;

        case 'license':
          if(isProAvailable){
            routePage = <License />
          }
          break;

        default:
          routePage = <DashboardModules />;
          break;
      }
    }

    astWpMenuClassChange(path);
  }

  return <>{routePage}</>;
}

export default SettingsRoute;
