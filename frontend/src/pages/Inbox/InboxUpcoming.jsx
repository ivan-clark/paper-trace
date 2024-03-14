import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LinearProgress, Alert } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from '@mui/material/Snackbar';
import Tooltip from "@mui/material/Tooltip";
import Api from "../../services/Api";
import DateFormat from "../../services/Util"
import Box from '@mui/system/Box';

function InboxUpcoming(props) {
  const controller = new AbortController();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [createdDate, setCreatedDate] = useState("")
  const [isEmpty, setIsEmpty] = useState(false)
  const [senderId, setSenderId] = useState(0)
  const [lastname, setLastname] = useState("")
  const [department, setDepartment] = useState("")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [read, setRead] = useState(true)

  useEffect(() => {
    setLoading(true);
    getIncoming();
    if (senderId !== 0) {
      getSender(controller)
    }

    return () => {
      controller.abort();
    }
  }, [senderId]);

  const getIncoming = () => {
    Api.getIncoming(props.recipientId).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setIsEmpty(transactionChecked.length === 0);
      res.data.data.forEach((sender) => {
        setSenderId(sender.transaction.document?.senderId)
        setCreatedDate(sender.transaction?.createdDate)
      })
      setDocuments(transactionChecked);
      console.log(res.data.data)
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  };
  
  const getSender = () => {
    Api.getUserById(senderId, controller).then((res) => {
      const data = res.data.data;
      setLastname(data.lastName?.charAt(0).toUpperCase() + data.lastName?.slice(1))
      setDepartment(data.department?.name)
      console.log(res.data.data)
    })
  }

  // flipper, turns true to false and vice versa
  const handleChecked = (i) => {
    const updatedDocuments = [...documents]
    updatedDocuments[i].isChecked = !updatedDocuments[i].isChecked
    setDocuments(updatedDocuments)
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    // Api.deleteDocument(id).then(() => {
    //   getDocuments(controller)
    // }).catch((error) => {
    //   console.log(error)
    // }).finally(() => {
    //   setLoading(false)
    // })
  }

  return (
    <>
      {loading ? (  
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
              <span id="h1">Incoming mails go here :)</span>
              <span>Start sending to other Departments!</span>
            </div>
          </Box>
        ): (
          <table>
          <tbody>
            {documents.map((document, i) => (
              <tr onClick={(e) => {
                  // this checks if checkbox is clicked or not, very useful
                  if(!e.target.closest(".MuiCheckbox-root")) {
                    navigate(`/inbox/incoming/${document.id}`)
                  }
                  setRead(false)
                }} 
                key={document.id} 
                className={`tbl-row ${document.isChecked ? "checked" : ""}`}>
                <td>
                  <Checkbox 
                    onChange={() => handleChecked(i)} size="small" checked={document.isChecked || false}
                  />
                </td>
                <td className="sender">
                  <span className={document.transaction.document?.urgent === 1 ? "urgent" : "non-urgent"}>{document.transaction.document?.urgent === 1 ? "HIGH" : "LOW"} </span>
                  <span className={read ? "name-dept bold" : "name-dept"}>{lastname} {department}</span>
                </td>
                <td id="td-spacer"></td>
                <td className="title-and-message">
                  <strong>{document.transaction.document?.subject} - </strong>
                  <span>{document.transaction.document?.description?.slice(0, 200)}...</span>
                </td>
                <td id="td-spacer"></td>
                <td className="date">
                  <span><strong>{DateFormat({ createdDate: createdDate })}</strong></span>
                </td>
                <td className={`inbox-tr ${document.isChecked ? "checked" : ""}`}>
                  <Tooltip title="Delete">
                    <button 
                      onClick={(e) => handleDelete(e, document.id)} 
                      className={`delete inbox-delete ${document.isChecked ? "checked" : ""}`}>
                      <DeleteOutlineIcon fontSize="small"/>
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
          <Snackbar open={showSnackbar} autoHideDuration={3000}>
              <Alert variant="filled" severity="error">Document deleted</Alert>
          </Snackbar>
        </table>
        )}
        </>
      )}
    </>
  )
}

export default InboxUpcoming