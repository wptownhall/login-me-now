import React from 'react'

function Button({type, buttonText, className, handleClick}) {
  return (
    <button type={type} className={className} onClick={handleClick}>{buttonText}</button>
  )
}

export default Button
