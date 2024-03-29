import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DateFormat from "../../services/Util"
import Tooltip from "@mui/material/Tooltip";
import TrashDetails from "./TrashDetails"
import Api from "../../services/Api";
import "./_trash.scss"

function Trash() {
  const controller = new AbortController();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

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