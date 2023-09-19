import React from "react";
import { __ } from "@wordpress/i18n";

function SubTitle({text, size}) {
  return (
    <p className={`text-base leading-[1.625rem] text-slate-600 pb-7 ${size}`}>
      {__(
        `${text}`,
        "login-me-now"
      )}
    </p>
  );
}

export default SubTitle;
