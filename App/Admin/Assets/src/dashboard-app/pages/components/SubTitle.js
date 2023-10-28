import React from "react";
import { __ } from "@wordpress/i18n";

function SubTitle({text, size}) {
  return (
    <p className={`text-[19px] leading-[34px] text-slate-600 pb-7 text-justify mb-12 ${size}`}>

      {__(
        `${text}`,
        "login-me-now"
      )}
    </p>
  );
}

export default SubTitle;
