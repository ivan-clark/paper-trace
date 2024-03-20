import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useEffect, useState } from "react"
import Outgoing from "../../assets/Outgoing.png"
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DateFormat from "../../services/Util"
import Tooltip from "@mui/material/Tooltip";
import Api from "../../services/Api";
import Box from '@mui/system/Box';

function InboxOutgoing(props) {
  const controller = new AbortController();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [senderId, setSenderId] = useState(0)
  const [lastname, setLastname] = useState("")
  const [isEmpty, setIsEmpty] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [documents, setDocuments] = useState([]);
  const [createdDate, setCreatedDate] = useState("")
  const [loadingOutoing, setloadingOutoing] = useState(false)
  const [loadingSender, setloadingSender] = useState(false)
  

  useEffect(() => {
    setLoading(true);
    getOutgoing(controller);
    if (senderId !== 0) {
      getSender(controller);
    }

    return () => {
      controller.abort();
    }
  }, [senderId]);

  const getOutgoing = () => {
    Api.getOutGoingImproved(props.senderId).then((response) => {
      const transactionChecked = response.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setIsEmpty(transactionChecked.length === 0);
      setSenderId(props.senderId)
      setDocuments(transactionChecked);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setloadingOutoing(false);
    })
  };

  const getSender = () => {
    Api.getUserById(senderId, controller).then((res) => {
      const data = res.data.data;
      setFirstname(data.firstName)
      setLastname(data.lastName)
    }).finally(() => {
      setloadingSender(false)
    })
  }
  // flipper
  const handleChecked = (i) => {
    const updatedDocuments = [...documents]
    updatedDocuments[i].isChecked = !updatedDocuments[i].isChecked
    setDocuments(updatedDocuments)
  }

  const handleDelete = (e) => {
    
  }

  const isLoading = loadingOutoing || loadingSender;

  return (
    <>
      {isLoading ? (
          <LinearProgress />
        ) : (
        <>
        {isEmpty ? (
            <Box sx={{
              height: "80vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div className="isEmpty">
                <div>
                  <img className="img" src={Outgoing} alt="" draggable={false} />
                </div>
                <span id="h1">Outgoing mails go here :)</span>
                <span>Start sending to other Departments!</span>
              </div>
            </Box>
            ) : (
            <table>
            <tbody>
              {documents.map((document, i) => (
                <tr onClick={(e) => {
                  // this checks if checkbox is clicked or not, very useful
                  if(!e.target.closest(".MuiCheckbox-root")) {
                    navigate(`/inbox/outgoing/${document.id}`)
                  }
                }} 
                key={document.id} 
                className={`tbl-row ${document.isChecked ? "checked" : ""}`}
                >
                <td>
                  <Checkbox 
                    onChange={() => handleChecked(i)} size="small" checked={document.isChecked || false}
                  />
                </td>
                  <td className="sender">
                    <span className={document.urgent === true ? "urgent" : "non-urgent"}>{document.urgent === true ? "HIGH" : "LOW"} </span>
                    <span>{firstname} {lastname}</span>
                  </td>
                  <td id="td-spacer"></td>
                  <td className="title-and-message">
                    <span><strong>{document.subject} - </strong></span>
                    <span>{document.description}</span>
                  </td>
                  <td id="td-spacer"></td>
                  {/* <td className="date">
                    <span><strong>{DateFormat({ createdAt: document.modifiedDate })}</strong></span>
                  </td> */}
                  <td className={`inbox-tr ${document.isChecked ? "checked" : ""}`}>
                    <Tooltip title="Delete">
                      <button onClick={(e) => {
                          // prevent tr onclick when button is clicked
                          e.stopPropagation()
                          handleDelete()
                        }} 
                        className={`delete inbox-delete ${document.isChecked ? "checked" : ""}`}>
                        <DeleteOutlineIcon fontSize="small"/>
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
            )}
        </>
      )}
    </>
  )
}

export default InboxOutgoing