import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsIcons from "../settings/SettingsIcons";
import { useSelector, useDispatch } from "react-redux";
import ContainerSettings from "@DashboardApp/pages/settings/ContainerSettings";
import SettingsSkeleton from "@DashboardApp/pages/settings/SettingsSkeleton";
import { __ } from "@wordpress/i18n";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Settings = () => {
  const query = new URLSearchParams(useLocation()?.search);
  const dispatch = useDispatch();
  const [socialSubItem, setSocialSubItem] = useState(false);

  const activeSettingsNavigationTab = useSelector(
    (state) => state.activeSettingsNavigationTab
  );
  const initialStateSetFlag = useSelector((state) => state.initialStateSetFlag);

  const isProAvailable = lmn_admin.pro_available ? true : false;

  const navigation = wp.hooks.applyFilters(
    "login_me_now_dashboard.settings_navigation",
    [
      {
        name: __("General", "login-me-now"),
        slug: "global-settings",
        icon: SettingsIcons["global-settings"],
      },
      ...(isProAvailable
        ? [
            {
              name: __("License", "login-me-now"),
              slug: "license",
              icon: SettingsIcons["license"],
            },
          ]
        : []),
    ]
  );

  useEffect(() => {
    const activePath = query.get("path");
    const activeHash = query.get("settings");
    const activeSettingsTabFromHash =
      activeHash && "settings" === activePath ? activeHash : "global-settings";
    dispatch({
      type: "UPDATE_SETTINGS_ACTIVE_NAVIGATION_TAB",
      payload: activeSettingsTabFromHash,
    });
  }, [initialStateSetFlag, activeSettingsNavigationTab]);

  if (!initialStateSetFlag) {
    return <SettingsSkeleton />;
  }
  const handleToggleSubItem = (e) => {
    setSocialSubItem(!socialSubItem);
  };

  return (
    <div className="px-6 w-full">
      <div className="mx-auto mt-10 mb-8 font-semibold text-2xl lg:max-w-[80rem]">
        Settings
      </div>
      <main className="mx-auto my-[2.43rem] bg-white rounded-md shadow overflow-hidden min-h-[36rem] lg:max-w-[80rem]">
        <div className="lg:grid lg:grid-cols-12 min-h-[36rem] h-full">
          <aside className="py-6 sm:px-6 lg:py-6 lg:px-0 lg:col-span-2">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <>
                  <Link
                    to={{
                      pathname: "admin.php",
                      search: `?page=${lmn_admin.home_slug}&path=settings&settings=${item.slug}`,
                    }}
                    key={item.name}
                    className={classNames(
                      activeSettingsNavigationTab === item.slug
                        ? "border-lmn text-lmn focus:text-lmn-hover active:text-lmn hover:text-lmn-hover stroke-lmn fill-lmn focus:stroke-lmn focus:fill-lmn hover:stroke-lmn hover:fill-lmn"
                        : "border-white text-slate-800 stroke-slate-800 fill-slate-800 focus:text-slate-900 focus:border-slate-200 focus:stroke-slate-900 focus:fill-slate-900 hover:text-slate-900 hover:border-slate-200 hover:stroke-slate-900 hover:fill-slate-900",
                      "border-l-4 group cursor-pointer py-3 pl-5 flex items-center text-base font-medium"
                    )}
                    onClick={() => {
                      dispatch({
                        type: "UPDATE_SETTINGS_ACTIVE_NAVIGATION_TAB",
                        payload: item.slug,
                      });
                      if (item.slug === "social-login") {
                        handleToggleSubItem();
                      }
                    }}
                  >
                    {item.icon}
                    <span className="truncate">{item.name}</span>
                    {item.name === "Social Login" ? (
                      socialSubItem ? (
                        <svg
                          className="ml-[10%]"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12 9.414-6.293 6.293a1 1 0 1 1 -1.414 -1.414l6.646-6.647a1.5 1.5 0 0 1 2.122 0L19.707 14.293a1 1 0 0 1 -1.414 1.414L12 9.414z"
                            fill="#000000"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="ml-[10%]"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12 14.586 6.293-6.293a1 1 0 1 1 1.414 1.414l-6.646 6.647a1.5 1.5 0 0 1-2.122 0L4.293 9.707a1 1 0 0 1 1.414-1.414L12 14.586z"
                            fill="#000000"
                          />
                        </svg>
                      )
                    ) : (
                      ""
                    )}
                  </Link>
                </>
              ))}
            </nav>
            <nav className="space-y-1 mt-1">
              {socialSubItem &&
                navigation
                  .find((item) => item.slug === "social-login")
                  .subItems.map((subItem) => (
                    <Link
                      to={{
                        pathname: "admin.php",
                        search: `?page=${lmn_admin.home_slug}&path=settings&settings=${subItem.slug}`,
                      }}
                      key={subItem.name}
                      className={classNames(
                        activeSettingsNavigationTab === subItem.slug
                          ? "border-lmn text-lmn focus:text-lmn-hover active:text-lmn hover:text-lmn-hover stroke-lmn fill-lmn focus:stroke-lmn focus:fill-lmn hover:stroke-lmn hover:fill-lmn"
                          : "border-white text-slate-800 stroke-slate-800 fill-slate-800 focus:text-slate-900 focus:border-slate-200 focus:stroke-slate-900 focus:fill-slate-900 hover:text-slate-900 hover:border-slate-200 hover:stroke-slate-900 hover:fill-slate-900",
                        "border-l-4 group cursor-pointer py-3 pl-9 flex items-center text-base font-medium"
                      )}
                      onClick={() => {
                        dispatch({
                          type: "UPDATE_SETTINGS_ACTIVE_NAVIGATION_TAB",
                          payload: subItem.slug,
                        });
                      }}
                    >
                      {subItem.icon}
                      <span className="truncate">{subItem.name}</span>
                    </Link>
                  ))}
            </nav>
          </aside>
          <ContainerSettings />
        </div>
      </main>
    </div>
  );
};

export default Settings;
