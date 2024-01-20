import DeclinedDetails from "./DeclinedDetails"
import React from "react"
import "./_declined.scss"

function Declined() {
  return (
    <div className="sent-wrapper">
      <div className="sent-header">
        <div className="inbox-header-header">
          Documents <span className="span2">declined</span>
        </div>
      </div>
      <div className="inbox-outlet">
        <div className="inbox-outlet-wrapper">
          <div className="inbox-inbox">
            <DeclinedDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Declined