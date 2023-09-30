import React from "react";
import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import ProBtn from "./components/ProBtn";

function GoogleProSelectedPages() {
  const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
  const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;
  const dispatch = useDispatch();

  const selectedIDs = useSelector(
    (state) => state.selectGoogleProSelectedPages
  );
  const isProAvailable = lmn_admin.pro_available ? true : false;
  const allPages = useSelector((state) => state.getPages);



  let selectedPages;
  if (selectedIDs && selectedIDs.length > 0) {
    selectedPages = allPages.filter((page) => selectedIDs.includes(page.id));
  } else {
    selectedPages = [];
  }
  const updatedSelectedPages = selectedPages.map((page) => {
    return page.name
  })

  console.log("test: ", selectedPages)

  const updateGoogleProExcludePage = (selectedPages, value) => {
    const options = allPages;
    // console.log(`Selected: ${JSON.stringify(value)}`);

    const ids = selectedPages.map((page) => {
      return parseInt(page)
    })

    dispatch({ type: "UPDATE_SELECT_GOOGLE_PRO_SELECTED_PAGES", payload: ids });

    const formData = new window.FormData();
    formData.append("action", "login_me_now_update_admin_setting");
    formData.append("security", lmn_admin.update_nonce);
    formData.append("key", "google_pro_selected_pages");
    formData.append("value", ids);

    console.log("Id: ", ids)

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

  return (
    <section
      className={`${
        enableGoogleLoginStatus ? "block" : "hidden"
      }`}
    >
      <div className="mr-16 w-full items-center pr-[10%]">

        <div>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Select
              defaultValue={updatedSelectedPages}
              className={`mt-3 ${!isProAvailable && "pointer-events-none"}`}
              mode="tags"
              size="middle"
              placeholder="Please select"
              onChange={updateGoogleProExcludePage}
              style={{
                width: "100%",
              }}
            >
              {/* Map your options properly */}
              {allPages.map((option) => (
                <Select.Option
                  key={option.id.toString()}
                  value={option.id.toString()}
                >
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>
      </div>
    </section>
  );
}

export default GoogleProSelectedPages;
