import React from 'react'
// import Option from './Option'

function LoginTimes({LoginTimes, handleLoginTimes, classNames}) {
  return (
    <select value={LoginTimes} onChange={handleLoginTimes} className={`${classNames}`}>
        <option value={5}>5 Times</option>
        <option value={10}>10 Times</option>
        <option value={20}>20 Times</option>
        <option value={50}>50 Times</option>
        <option value={100}>100 Times</option>
    </select>
  )
}

export default LoginTimes;