import React from 'react'

function DocStatusSmall({ status }) {
  
  let statusClass = " ";
  
  switch(status){
    case "Ongoing":
      statusClass = "ongoing-s";
      break
    case "Accepted":
      statusClass = "accepted-s";
      break
    case "Declined":
      statusClass = "declined-s";
      break
    case "Completed":
      statusClass = "completed-s";
      break
    default:
      statusClass = "ongoing-s";
  }

  return <div className={statusClass}>{status}</div>
}

export default DocStatusSmall