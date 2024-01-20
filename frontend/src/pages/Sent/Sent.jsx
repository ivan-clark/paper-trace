import SentDetails from "./SentDetails"
import React from "react"
import "./_sent.scss"

function Sent() {
  return (
    <div className="sent-wrapper">
      <div className="sent-header">
        <div className="inbox-header-header">
          Documents sent
        </div>
      </div>
      <div className="inbox-outlet">
        <div className="inbox-outlet-wrapper">
          <div className="inbox-inbox">
            <SentDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sent