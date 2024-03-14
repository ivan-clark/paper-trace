import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react"

function AcceptedDetails() {
  const [isChecked, setIsChecked] = useState(false)

  const handleChecked = () => {
    setIsChecked(!isChecked)
  }

  const handleDelete = (e) => {
    e.preventDefault()
  }

  return (
    <table>
      <tbody>
        <tr className={`sent-tbl-row ${isChecked ? "checked" : ""}`}>
          <td>
            <Checkbox 
              sx={{ paddingRight: 3 }}
              size="small"
              onChange={handleChecked}
            />
          </td>
          <td className="sender">
            <span>{`From: Student Affairs Office`}</span>
          </td>
          <td id="td-spacer"></td>
          <td className="title-and-message">
            <span className="title">Title - </span>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis et velit, quis earum id optio tenetur. Repellendus necessitatibus id sapiente culpa velit dolorum nostrum. Adipisci nobis necessitatibus quo quaerat tempora?</span>
          </td>
          <td id="td-spacer"></td>
          <td className="date">
            <span><strong>Nov 14</strong></span>
          </td>
          <td className={`sent-tr ${isChecked ? "checked" : ""}`}>
            <Tooltip title="Delete">
              <button onClick={handleDelete} className={`delete sent-delete ${isChecked ? "checked" : ""}`}>
                <DeleteOutlineOutlinedIcon fontSize="small"/>
              </button>
            </Tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AcceptedDetails