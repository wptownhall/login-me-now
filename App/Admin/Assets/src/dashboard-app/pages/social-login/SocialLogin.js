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
    <div className="px-6 w-full">
      <div className="mx-auto mt-10 mb-8 font-semibold text-2xl lg:max-w-[80rem]">
        Social Login
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
                      height="25px"
                      width="25px"
                      viewBox="0 0 256 256"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#1877F2"
                        d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                      />
                      <path
                        fill="#FFF"
                        d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"
                      />
                    </svg>
                    <span className="text-[16px] text-[#1e293b] font-medium">
                      Facebook
                    </span>
                  </span>
                </Tooltip>
              </div>
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
