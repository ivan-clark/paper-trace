import TrashDetails from "./TrashDetails"
import React from "react"
import "./_trash.scss"

function Trash() {
  return (
    <div className="sent-wrapper">
      <div className="sent-header">
        <div className="inbox-header-header">
          Documents in trash
        </div>
      </div>
      <div className="inbox-outlet">
        <div className="inbox-outlet-wrapper">
          <div className="inbox-inbox">
            <TrashDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trash