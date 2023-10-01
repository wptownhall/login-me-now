import { __ } from "@wordpress/i18n";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import apiFetch from "@wordpress/api-fetch";
import ProBtn from "./components/ProBtn";
import React, { useState } from 'react';
import { Radio, Select, Space } from 'antd';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GoogleProSelectedPages = () => {
  const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
  const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;
  const dispatch = useDispatch();

  const selectedIDs = useSelector((state) => state.selectGoogleProSelectedPages);
  const isProAvailable = lmn_admin.pro_available ? true : false;
  const allPages = useSelector((state) => state.getPages);

  let selectedPages;
  if (selectedIDs && selectedIDs.length > 0) {
    selectedPages = allPages.filter((page) => selectedIDs.includes(page.id));
  } else {
    selectedPages = [];
  }

  const updateGoogleProExcludePage = (selectedPageValues) => {
    // Convert selected page names back to IDs
    const selectedIDs = allPages
      .filter((page) => selectedPageValues.includes(page.name))
      .map((page) => page.id);
  
    dispatch({ type: "UPDATE_SELECT_GOOGLE_PRO_SELECTED_PAGES", payload: selectedIDs });
  
    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_pro_selected_pages");
    formData.append("value", selectedIDs);
  
    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    }).then(() => {
      dispatch({
        type: "UPDATE_SETTINGS_SAVED_NOTIFICATION",
        payload: __("Successfully saved!", "login-me-now"),
      });
    });
  };

  // antd code

  const pages = allPages.map(option => ({ label: option.name, value: option.name }))
  const arrayPages = Array.from(pages)

  const selectedPageValues = selectedPages.map((page) => page.name);
  console.log(selectedPageValues)

  return (
    <section
      className={`${
        enableGoogleLoginStatus ? "block" : "hidden"
      } block border-b border-solid border-slate-200 py-12 justify-between`}
    >
      <div className="mr-16 w-full items-center pr-[10%]">
        <h3 className="mb-6 p-0 flex-1 justify-right inline-flex text-[22px] leading-6 font-semibold text-slate-800">
          {__("Exclude one tap prompt for", "login-me-now")}
          {!lmn_admin.pro_available ? <ProBtn /> : ""}
        </h3>

        {/* <Multiselect
          options={allPages}
          selectedValues={selectedPages}
          onSelect={updateGoogleProExcludePage}
          onRemove={updateGoogleProExcludePage}
          displayValue="name"
          className={`mt-3 ${!isProAvailable && "pointer-events-none"}`}
        /> */}
        <Select
          mode="tags"
          size="middle"
          placeholder="Please select"
          defaultValue={selectedPageValues}
          onChange={updateGoogleProExcludePage}
          style={{
            width: '100%',
          }}
          
          options={arrayPages}
        />
      </div>
      <p className="mt-6 w-9/12 text-[16px] text-slate-500 tablet:w-full leading-[1.7]">
        {__(
          "Select for which pages one tap prompt won't display",
          "login-me-now"
        )}
      </p>
    </section>
  );
};

export default GoogleProSelectedPages;
