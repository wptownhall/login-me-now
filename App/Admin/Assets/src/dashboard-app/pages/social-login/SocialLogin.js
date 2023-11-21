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
                      fill="#1877F2"
                      viewBox="0 0 1920 1920"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#1877F2"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M1168.737 487.897c44.672-41.401 113.824-36.889 118.9-36.663l289.354-.113 6.317-417.504L1539.65 22.9C1511.675 16.02 1426.053 0 1237.324 0 901.268 0 675.425 235.206 675.425 585.137v93.97H337v451.234h338.425V1920h451.234v-789.66h356.7l62.045-451.233H1126.66v-69.152c0-54.937 14.214-96.112 42.078-122.058"
                          fill-rule="evenodd"
                        ></path>{" "}
                      </g>
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
                      height="25px"
                      width="25px"
                      fill="#00acee"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 310 310"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g id="XMLID_826_">
                          {" "}
                          <path
                            id="XMLID_827_"
                            d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73 c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783 c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598 C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467 c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977 c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889 c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597 c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961 c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895 c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367 c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998 C307.394,57.037,305.009,56.486,302.973,57.388z"
                          ></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    <span className="text-[16px] text-[#1e293b] font-medium">
                      Twitter
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
