import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsIcons from "@DashboardApp/pages/settings/SettingsIcons";
import { useSelector, useDispatch } from "react-redux";
import ContainerSettings from "@DashboardApp/pages/social-login/ContainerSettings";
import SettingsSkeleton from "@DashboardApp/pages/settings/SettingsSkeleton";
import { __ } from "@wordpress/i18n";
import { Tooltip } from "antd";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SocialLogin = () => {
  const query = new URLSearchParams(useLocation()?.search);
  const dispatch = useDispatch();
  const [socialSubItem, setSocialSubItem] = useState(false);

  const activeSocialLoginNavigationTab = useSelector(
    (state) => state.activeSocialLoginNavigationTab
  );
  const initialStateSetFlag = useSelector((state) => state.initialStateSetFlag);

  const isProAvailable = lmn_admin.pro_available ? true : false;

  const navigation = wp.hooks.applyFilters(
    "login_me_now_dashboard.settings_navigation",
    [
      {
        name: __("Google", "login-me-now"),
        slug: "google",
        icon: SettingsIcons["google-login"],
      },
      {
        name: __("Facebook", "login-me-now"),
        slug: "facebook",
        icon: SettingsIcons["facebook-login"],
      },
    ]
  );

  useEffect(() => {
    const activePath = query.get("path");
    const activeHash = query.get("settings");
    const activeSettingsTabFromHash =
      activeHash && "social-login" === activePath ? activeHash : "google";
    dispatch({
      type: "UPDATE_SOCIAL_LOGIN_ACTIVE_NAVIGATION_TAB",
      payload: activeSettingsTabFromHash,
    });
  }, [initialStateSetFlag, activeSocialLoginNavigationTab]);

  if (!initialStateSetFlag) {
    return <SettingsSkeleton />;
  }
  const handleToggleSubItem = (e) => {
    setSocialSubItem(!socialSubItem);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:max-w-screen-2xl">
      <div className="mx-auto mt-10 mb-8 font-semibold text-2xl">
        Social Login
      </div>
      <main className="mx-auto my-[2.43rem] bg-white rounded-md shadow overflow-hidden min-h-[36rem]">
        <div className="lg:grid lg:grid-cols-12 min-h-[36rem] h-full">
          <aside className="py-6 sm:px-6 lg:py-6 lg:px-0 lg:col-span-2">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <>
                  <Link
                    to={{
                      pathname: "admin.php",
                      search: `?page=${lmn_admin.home_slug}&path=social-login&settings=${item.slug}`,
                    }}
                    key={item.name}
                    className={classNames(
                      activeSocialLoginNavigationTab === item.slug
                        ? "border-lmn text-lmn focus:text-lmn-hover active:text-lmn hover:text-lmn-hover stroke-lmn fill-lmn focus:stroke-lmn focus:fill-lmn hover:stroke-lmn hover:fill-lmn"
                        : "border-white text-slate-800 stroke-slate-800 fill-slate-800 focus:text-slate-900 focus:border-slate-200 focus:stroke-slate-900 focus:fill-slate-900 hover:text-slate-900 hover:border-slate-200 hover:stroke-slate-900 hover:fill-slate-900",
                      "border-l-4 group cursor-pointer py-3 pl-5 flex items-center text-base font-medium"
                    )}
                    onClick={() => {
                      dispatch({
                        type: "UPDATE_SOCIAL_LOGIN_ACTIVE_NAVIGATION_TAB",
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
              {/* custom social login item code start from here */}
              <div className="flex pl-[18px] py-3 cursor-pointer border-l-4 border-l-transparent hover:border-l-[#E2E8F0] opacity-60">
                <Tooltip title="Upcoming" placement="right">
                  <span className="flex">
                    <svg
                      className="flex-shrink-0 mr-4 stroke-inherit"
                      xmlns="http://www.w3.org/2000/svg"
                      height="25"
                      viewBox="0 0 512 512"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                    <span className="text-[16px] text-[#1e293b] font-medium">
                      X (Twitter)
                    </span>
                  </span>
                </Tooltip>
              </div>
              {/* custom social login item code end from here */}
            </nav>
            <nav className="space-y-1 mt-1">
              {socialSubItem &&
                navigation
                  .find((item) => item.slug === "social-login")
                  .subItems.map((subItem) => (
                    <Link
                      to={{
                        pathname: "admin.php",
                        search: `?page=${lmn_admin.home_slug}&path=social-login&settings=${subItem.slug}`,
                      }}
                      key={subItem.name}
                      className={classNames(
                        activeSocialLoginNavigationTab === subItem.slug
                          ? "border-lmn text-lmn focus:text-lmn-hover active:text-lmn hover:text-lmn-hover stroke-lmn fill-lmn focus:stroke-lmn focus:fill-lmn hover:stroke-lmn hover:fill-lmn"
                          : "border-white text-slate-800 stroke-slate-800 fill-slate-800 focus:text-slate-900 focus:border-slate-200 focus:stroke-slate-900 focus:fill-slate-900 hover:text-slate-900 hover:border-slate-200 hover:stroke-slate-900 hover:fill-slate-900",
                        "border-l-4 group cursor-pointer py-3 pl-9 flex items-center text-base font-medium"
                      )}
                      onClick={() => {
                        dispatch({
                          type: "UPDATE_SOCIAL_LOGIN_ACTIVE_NAVIGATION_TAB",
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

export default SocialLogin;