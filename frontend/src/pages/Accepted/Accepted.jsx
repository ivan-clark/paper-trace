import AcceptedDetails from "./AcceptedDetails"
import React from "react"
import "./_accepted.scss"

function Accepted() {
  return (
    <div className="sent-wrapper">
      <div className="sent-header">
        <div className="inbox-header-header">
          Documents <span className="span1">accepted</span>
        </div>
      </div>
      <div className="inbox-outlet">
        <div className="inbox-outlet-wrapper">
          <div className="inbox-inbox">
            <AcceptedDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accepted