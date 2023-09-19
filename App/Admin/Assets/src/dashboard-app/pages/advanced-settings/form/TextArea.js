import React from 'react'

function TextArea({placeholder, cols, rows, classNames, handleNote, note}) {
  return (
    <textarea name="" id="" cols={cols} rows={rows} placeholder={placeholder} className={classNames} onChange={handleNote} value={note}></textarea>
  )
}

export default TextArea
