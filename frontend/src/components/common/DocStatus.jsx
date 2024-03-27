import React from 'react'

function DocStatus({ status }) {
  
  let statusClass = " ";
  
  switch(status){
    case "Ongoing":
      statusClass = "ongoing";
      break
    case "Accepted":
      statusClass = "accepted";
      break
    case "Declined":
      statusClass = "declined";
      break
    case "Completed":
      statusClass = "completed";
      break
    default:
      statusClass = "ongoing";
  }

  return <div className={statusClass}>{status}</div>
}

export default DocStatus