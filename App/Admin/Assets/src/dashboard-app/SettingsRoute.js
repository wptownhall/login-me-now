import React from "react";
import { useLocation } from "react-router-dom";
import Welcome from "@DashboardApp/pages/welcome/Welcome";
import Settings from "@DashboardApp/pages/settings/Settings";
import AdvancedSharing from "@DashboardApp/pages/advanced-settings/AdvancedSharing";
import { FormDataProvider } from "../context/FormContext";
import BrowserExtensions from "./pages/browser-extensions/BrowserExtensions";
import DashboardModules from "./pages/dashboard-modules/DashboardModules";
import SocialLogin from './pages/social-login/SocialLogin';

function SettingsRoute() {
  const query = new URLSearchParams(useLocation().search);
  const page = query.get("page");
  const path = query.get("path");
  const currentEvent = query.get("event");

  let routePage = <p> Fallback Route Page </p>;

  if (lmn_admin.home_slug === page) {
    if ("getting-started" === currentEvent) {
      routePage = <Welcome />;
    } else {
      switch (path) {
        case "settings":
          routePage = <Settings />;
          break;
        case "browser-extensions":
          routePage = <BrowserExtensions />;
          break;
        case "temporary-login":
          routePage = <Welcome />;
          break;
        case "advanced-sharing":
        case 'social-login':
          routePage = <SocialLogin />;
          break;
        case 'advanced-sharing':
          routePage = (
            <FormDataProvider>
              <AdvancedSharing />
            </FormDataProvider>
          );
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
