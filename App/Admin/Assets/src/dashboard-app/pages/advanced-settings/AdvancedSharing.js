import React, { useContext } from "react";
import Form from "./form/Form";
import FormDataContext from "../../../context/FormContext";
import { useState } from "react";
import Button from "./form/Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AdvancedSharing() {
  const getUserRoles = useSelector((state) => state.getUserRoles);

  const { formData } = useContext(FormDataContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const curr = new Date();
  curr.setDate(curr.getDate() + 7);
  const formattedDate = curr.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const resetFormData = () => {
    // Set the form data-related state variables to their initial values
    // Add more state variables here if needed
    setIsSuccess(false);
    setIsError(false);
    setIsLoading(false);
  };

  const handleCreateAccessAgain = () => {
    resetFormData();
  };

  return (
    <div className="px-6 w-full">
      <div>
        <h1 className="mx-auto mt-10 mb-8 font-semibold text-2xl lg:max-w-[80rem] text-[#3C434A]">
          Advanced Sharing
        </h1>
        <main className="mx-auto my-[2.43rem] bg-white rounded-md shadow overflow-hidden min-h-[36rem] lg:max-w-[80rem]">
          <div className="lg:flex min-h-[36rem] h-full">
            <div className="lg:col-span-5 w-[40%] p-8 border-r">
              {isLoading ? (
                <>
                  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-[#005e54]"></div>
                </>
              ) : formData.dataResult?.success && isSuccess ? (
                <>
                  <div
                    className="mb-3 inline-flex w-full items-center rounded-lg bg-[#00F27F] px-6 py-5 text-base text-[#2A2F38]"
                    role="alert"
                  >
                    <span className="mr-2 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="font-medium">
                      Access Generated Successfully!
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-xl leading-loose text-black">
                    <span className={"font-bold"}>
                      {formData.name || "Someone"}
                    </span>{" "}
                    will get{" "}
                    <span className={"font-bold"}>
                      {formData.userRole
                        ? getUserRoles[formData.userRole]
                        : "Administrator"}
                    </span>{" "}
                    role, can use until{" "}
                    <span className={"font-bold"}>
                      {formData.formattedMonth ||
                      formData.date ||
                      formData.year ? (
                        <>
                          {formData.formattedMonth +
                            " " +
                            formData.date +
                            ", " +
                            " " +
                            formData.year}
                        </>
                      ) : (
                        formattedDate
                      )}
                    </span>{" "}
                    & can access for{" "}
                    <span className={"font-bold"}>
                      {formData.loginTimes ? formData.loginTimes : "5"} times
                    </span>
                    , and will get all the information in this email{" "}
                    <span className={"font-bold"}>
                      {formData.email ? formData.email : "Recipient Email"}
                    </span>
                  </h1>
                  <h1 className="text-xl text-black mt-3">
                    {formData.note ? (
                      <>
                        <span className="font-bold">Your Note:</span>
                      </>
                    ) : (
                      ""
                    )}{" "}
                    {formData.note}
                  </h1>
                </>
              )}
            </div>

            <div className="lg:col-span-7 bg-white w-[60%]">
              {formData.dataResult?.success && isSuccess ? (
                <div className="flex justify-center items-center h-full">
                  <Button
                    className="sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-lmn focus-visible:bg-lmn-hover hover:bg-lmn-hover focus:outline-none mr-4 mb-2 sm:mb-0"
                    buttonText="Create Access Again"
                    handleClick={handleCreateAccessAgain}
                  />
                </div>
              ) : (
                <>
                  <Form
                    isSuccess={isSuccess}
                    setIsSuccess={setIsSuccess}
                    isError={isError}
                    setIsError={setIsError}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdvancedSharing;
