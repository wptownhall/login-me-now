import React from "react";

function Input({ type, placeholder, classNames, value, onChange, disabled, ref, defaultValue, required }) {
  return (
    < >
      <input
        className={`${classNames}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        ref={ref}
        defaultValue={defaultValue}
      />
    </>
  );
}

export default Input;
