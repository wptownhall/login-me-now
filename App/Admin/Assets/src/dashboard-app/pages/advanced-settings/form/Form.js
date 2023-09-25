import React, { useState, useContext, useEffect } from "react";
import Input from "./Input";
import LoginTimes from "./selector/LoginTimes";
import UserRole from "./selector/UserRole";
import Button from "./Button";
import FormDataContext from "../../../../context/FormContext";
import TextArea from "./TextArea";
import "../../../../custom-css/global.css";
import apiFetch from "@wordpress/api-fetch";

function Form({
  isSuccess,
  setIsSuccess,
  isError,
  setIsError,
  isLoading,
  setIsLoading,
  classNames,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disAllow, setDisAllow] = useState("");
  const { updateFormData } = useContext(FormDataContext);
  const [loginTimes, setLoginTimes] = useState("");
  const [expiration, setExpiration] = useState("");
  const [userRole, setUserRole] = useState("");
  const [note, setNote] = useState("");
  const [dataResult, setDataResult] = useState("");

  const month = expiration ? expiration.substring(5, 7) : "";
  const date = expiration ? expiration.substring(8, 10) : "";
  const year = expiration ? expiration.substring(0, 4) : "";

  let formattedMonth = "";

  if (month === "01") {
    formattedMonth = "Jan";
  } else if (month === "02") {
    formattedMonth = "Feb";
  } else if (month === "03") {
    formattedMonth = "March";
  } else if (month === "04") {
    formattedMonth = "Apr";
  } else if (month === "05") {
    formattedMonth = "May";
  } else if (month === "06") {
    formattedMonth = "June";
  } else if (month === "07") {
    formattedMonth = "July";
  } else if (month === "08") {
    formattedMonth = "Aug";
  } else if (month === "09") {
    formattedMonth = "Sept";
  } else if (month === "10") {
    formattedMonth = "Oct";
  } else if (month === "11") {
    formattedMonth = "Nov";
  } else if (month === "12") {
    formattedMonth = "Dec";
  }

  useEffect(() => {
    const formData = {
      name,
      email,
      disAllow,
      loginTimes,
      expiration,
      userRole,
      note,
      formattedMonth,
      date,
      year,
      dataResult,
    };
    updateFormData(formData);
  }, [
    name,
    email,
    disAllow,
    loginTimes,
    expiration,
    userRole,
    note,
    formattedMonth,
    date,
    year,
    dataResult,
  ]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDisAllowChange = (e) => {
    setDisAllow(e.target.value);
  };

  const handleLoginTimes = (e) => {
    setLoginTimes(e.target.value);
  };

  const handleExpiration = (e) => {
    setExpiration(e.target.value);
  };

  const handleUserRole = (e) => {
    setUserRole(e.target.value);
  };

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new window.FormData();

    formData.append("action", "login_me_now_advanced_sharing");
    formData.append("security", lmn_admin.generate_token_nonce);
    formData.append("name", name);
    formData.append("email", email);
    formData.append(
      "times",
      loginTimes === null || loginTimes === undefined || loginTimes === ""
        ? 5
        : loginTimes
    );
    formData.append("expiration", expiration);
    formData.append(
      "role",
      userRole === null || userRole === undefined || userRole === ""
        ? "administrator"
        : userRole
    );
    formData.append("note", note);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: "POST",
      body: formData,
    })
      .then((result) => {
        setDataResult(result);
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.error(error);
      });
  };


  // default input field date
  const curr = new Date();
  curr.setDate(curr.getDate() + 7);
  const myDate = curr.toISOString().substring(0, 10);

  return (
    <>
      <form onSubmit={handleFormSubmit} className={`${classNames} p-8`}>
        <Input
          classNames="formBorder border-4 border-[#e5e7eb] shadow appearance-none rounded w-[49%] input-padding text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mr-[1%]"
          type="text"
          name="name"
          placeholder="Recipient Name"
          value={name}
          onChange={handleNameChange}
        />
        <Input
          classNames="formBorder shadow appearance-none border border-red-500 rounded w-[49%] input-padding text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ml-[1%]"
          type="email"
          name="email"
          placeholder="Recipient Email*"
          value={email}
          onChange={handleEmailChange}
          required="required"
        />
        <div className="flex justify-between items-start">
          <LoginTimes
            loginTimes={loginTimes}
            handleLoginTimes={handleLoginTimes}
            classNames="shadow appearance-none border border-red-500 rounded w-[49%] selector-padding text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mr-[1%]"
          />
          <Input
            classNames="formBorder shadow appearance-none border border-red-500 rounded w-[49%] timer-padding text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ml-[1%]"
            type="date"
            expiration={expiration}
            onChange={handleExpiration}
            defaultValue={myDate}
          />
        </div>

        <div>
          <UserRole
            className="block"
            userRole={userRole}
            handleUserRole={handleUserRole}
            classNames="shadow appearance-none border border-red-500 rounded flex w-full max-full-width selector-padding text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <Input
          classNames="formBorder shadow appearance-none border border-red-500 rounded w-full input-padding text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="disAllow"
          placeholder={`Disallow Capabilities (Upcoming)`}
          value={disAllow}
          onChange={handleDisAllowChange}
          disabled="disabled"
        />

        <TextArea
          placeholder="Take a Note"
          cols="30"
          rows="7"
          classNames="formBorder mb-2 rounded w-full py-2 px-3 text-gray-700"
          note={note}
          handleNote={handleNote}
        />

        <Button
          disabled={isLoading}
          buttonText={isLoading ? "Loading..." : "Generate Access"}
          className="sm:inline-flex items-center px-4 py-2 border border-transparent text-[16px] font-medium rounded-md shadow-sm text-white bg-lmn focus-visible:bg-lmn-hover hover:bg-lmn-hover focus:outline-none mr-4 mb-2 sm:mb-0"
        />

        <Button
          value="sendEmail"
          disabled={isLoading}
          buttonText={
            isLoading ? "Loading..." : "Generate Access & Send Email (PRO)"
          }
          className="sm:inline-flex items-center px-4 py-2 border border-transparent text-[16px] font-medium rounded-md shadow-sm text-white bg-lmn-hover focus-visible:bg-lmn-hover hover:bg-lmn focus:outline-none mr-4 mb-2 sm:mb-0"
        />
      </form>
    </>
  );
}

export default Form;
