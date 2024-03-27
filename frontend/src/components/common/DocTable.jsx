import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate, useLocation } from "react-router-dom";
import { LinearProgress, Alert } from "@mui/material";
import React, { useEffect, useState } from "react"
import Accepted from "../../assets/Accepted.png"
import Declined from "../../assets/Declined.png"
import Trash from "../../assets/Trash.png"
import Sent from "../../assets/Sent.png"
import Checkbox from "@mui/material/Checkbox";
import Snackbar from '@mui/material/Snackbar';
import DocStatusSmall from "./DocStatusSmall";
import DateFormat from "../../services/Util";
import Tooltip from "@mui/material/Tooltip";
import Api from "../../services/Api";
import Box from '@mui/system/Box';

function DocTable(props) {
  const controller = new AbortController()
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const isAcceptedPath = pathname.startsWith("/accepted-docs")
  const isDeclinedPath = pathname.startsWith("/declined-docs")
  const isSentPath = pathname.startsWith("/sent")
  const isTrashPath = pathname.startsWith("/trash")

  const docToDelete = 0
  const [read, setRead] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState([])
  const [department, setDepartment] = useState("")
  const [lastname, setLastname] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [senderIds, setSenderIds] = useState([])
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [docLoading, setDocLoading] = useState(true)
  const [senderLoading, setSenderLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (isAcceptedPath) {
      getAcceptedDocs()
    } else if (isDeclinedPath) {
      getDeclinedDocs()
    } else if (isSentPath) {
      getSentDocs()
    } else if (isTrashPath) {
      getTrashDocs()
    }

    return () => {
      controller.abort()
    }
  }, [isAcceptedPath, isDeclinedPath, isSentPath, isTrashPath])

  useEffect(() => {
    if (senderIds.length !== 0) {
      getSender(controller);
    }

    return () => {
      controller.abort()
    }
  }, [senderIds]);

  const handleChecked = (i) => {
    const updatedDocuments = [...documents]
    updatedDocuments[i].isChecked = !updatedDocuments[i].isChecked
    setDocuments(updatedDocuments)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation()
    setShowSnackbar(true)
    Api.trashDocument(id).then((res) => {
      console.log(res.data.data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      if (isAcceptedPath) {
        getAcceptedDocs()
      } else if (isDeclinedPath) {
        getDeclinedDocs()
      } else if (isSentPath) {
        getSentDocs()
      }
    })
  } 
  
  const markAsUnread = (e, id) => {
    e.stopPropagation()
    console.log(id)
  }
  const getTrashDocs = () => {
    Api.getTrashDocuments(props.user).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setIsEmpty(transactionChecked.length === 0)
      setDocuments(transactionChecked)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setDocLoading(false)
    })
  }

  const getSentDocs = () => {
    Api.getSentDocs(props.receiver).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setIsEmpty(transactionChecked.length === 0)
      setDocuments(transactionChecked)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setDocLoading(false)
    })
  }

  const getDeclinedDocs = () => {
    Api.getDeclinedDocs(props.receiver).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setIsEmpty(transactionChecked.length === 0)
      const newSenderIds = res.data.data.map((sender) => sender.transaction.document?.senderId)
      setSenderIds(newSenderIds)
      setDocuments(transactionChecked)
      getSender(newSenderIds)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setDocLoading(false)
    })
  }

  const getAcceptedDocs = () => {
    Api.getAcceptedDocs(props.receiver).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setIsEmpty(transactionChecked.length === 0)
      const newSenderIds = res.data.data.map((sender) => sender.transaction.document?.senderId)
      setSenderIds(newSenderIds)
      setDocuments(transactionChecked)
      getSender(newSenderIds)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setDocLoading(false)
    })
  }

  const getSender = () => {
    Api.getUsersByIds(senderIds).then((res) => {
      const data = res.data.data;
      const departments = {}
      const lastNames = {}

      documents.forEach(doc => {
        const senders = data.find(sender => sender.id === doc.transaction.document?.senderId)
        if (senders) {
          if(senders.department) {
            departments[doc.id] = senders.department.name
          }
          lastNames[doc.id] = senders.lastName.charAt(0).toUpperCase() + senders.lastName.slice(1)
        }
      })
      setDepartment(departments)
      setLastname(lastNames)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setSenderLoading(false)
    })
  }

  const isLoading = docLoading && senderLoading;

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
                <img className="img" src={
                  isAcceptedPath ? Accepted 
                  : isDeclinedPath ? Declined
                  : isSentPath ? Sent 
                  : isTrashPath ? Trash : " "
                } alt="" draggable={false} />
              </div>
              <span id="h1">{
                isAcceptedPath ? "Accepted"
                : isDeclinedPath ? "Declined"
                : isSentPath ? "Sent" 
                : isTrashPath ? "Trash" : " "
              } mails go here :)</span>
              <span>Start sending to other Departments!</span>
            </div>
          </Box>
        ) : (
      <table>
        <tbody>
          {documents.map((document, i) => (
            <tr 
              onClick={(e) => {
                const isCheckbox = e.target.closest(".MuiCheckbox-root")
                const isDeleteBtn = e.target.closest(".delete-inbox")

                if(!isCheckbox && !isDeleteBtn) {
                  if (isAcceptedPath) {
                    navigate(`/accepted-docs/doc/${document.id}`)
                  } else if (isDeclinedPath) {
                    navigate(`/declined-docs/doc/${document.id}`)
                  } else if (isSentPath) {
                    navigate(`/sent/doc/${document.id}`)
                  } else if (isTrashPath) {
                    navigate(`/trash/doc/${document.id}`)
                  }
                }
                setRead(false)
              }}
                key={document.id}
                className={`tbl-row ${document.isChecked ? "checked" : ""} 
                ${document.isChecked 
                || isAcceptedPath 
                || isDeclinedPath 
                || isSentPath 
                || isTrashPath 
                ? "tbl-row-read" : ""}`
              }>
            <td>
              <Checkbox 
                onChange={() => handleChecked(i)} size="small" checked={document.isChecked || false}
              />
            </td>
            <td className="sender">
              <span className={document.transaction.document?.urgent === true ? "urgent" : "non-urgent"}>{document.transaction.document?.urgent === true ? "HIGH" : "LOW"} </span>
              <span className={read ? "name-dept bold" : "name-dept"}>
                {isSentPath ? (
                  <>
                    <span>To: {document.recepientId?.name}</span>
                  </>
                ) : (
                  <>
                    From: {department[document.id]} {lastname[document.id]}
                  </> 
                )}
              </span>
            </td>
            <td id="td-spacer"></td>
            <td className="title-and-message2">
              <span>{document.transaction.document?.subject} - </span>
              <span>{document.transaction.document?.description}</span>
            </td>
            <td id="td-spacer"></td>
            <td className="date">
              <span className="doc-stat">
                <DocStatusSmall status={document.statusId?.name.charAt(0).toUpperCase() + document.statusId?.name.slice(1)} />
              </span>
              <span className="date-date">{DateFormat({ createdDate: document.transaction.document?.createdDate })}</span>
            </td>
            <td className={`inbox-tr ${document.isChecked ? "checked" : ""}
                ${document.isChecked 
                  || isAcceptedPath 
                  || isDeclinedPath 
                  || isSentPath 
                  || isTrashPath 
                  ? "inbox-tr-read" : ""}`}>
                <Tooltip title="Delete">
                  <button 
                    onClick={(e) => {
                      handleDelete(e, document.id)

                    }} 
                    className={`delete inbox-delete ${document.isChecked ? "checked" : ""}`}>
                    <DeleteOutlineIcon fontSize="small"/>
                  </button>
                </Tooltip>
                <Tooltip title="Mark as unread">
                  <button 
                    onClick={(e) => {
                      markAsUnread(e, document.id)

                    }} 
                    className={`delete inbox-delete ${document.isChecked ? "checked" : ""}`}>
                    <MarkEmailUnreadOutlinedIcon fontSize="small"/>
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
        <Snackbar 
          open={showSnackbar} 
          onClose={handleClose}
          autoHideDuration={3000}
        >
          <Alert variant="filled" severity="error">Document deleted</Alert>
        </Snackbar>
      </table>
        )}
        </>
      )}
    </>
  )
}

export default DocTable