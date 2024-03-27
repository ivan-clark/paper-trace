import DocTable from "../../components/common/DocTable"
import React from "react"
import "./_declined.scss"

function Declined(props) {
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
            <DocTable receiver={props.user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Declined