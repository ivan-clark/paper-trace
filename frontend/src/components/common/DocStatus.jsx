import React from 'react'

function DocStatus({ status }) {
  
  let statusClass = " ";
  
  switch(status){
    case "ongoing":
      statusClass = "ongoing";
      break
    case "accepted":
      statusClass = "accepted";
      break
    case "declined":
      statusClass = "declined";
      break
    case "completed":
      statusClass = "completed";
      break
    default:
      statusClass = "ongoing";
  }

  return <div className={statusClass}>{status}</div>
}

export default DocStatus