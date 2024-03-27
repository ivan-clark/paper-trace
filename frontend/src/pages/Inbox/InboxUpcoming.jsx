import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import DocStatusSmall from "../../components/common/DocStatusSmall";
import { LinearProgress, Alert } from "@mui/material";
import React, { useEffect, useState } from "react"
import Incoming from "../../assets/Incoming.png"
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from '@mui/material/Snackbar';
import Tooltip from "@mui/material/Tooltip";
import DateFormat from "../../services/Util"
import Api from "../../services/Api";
import Box from '@mui/system/Box';

function InboxUpcoming(props) {
  const controller = new AbortController();
  const navigate = useNavigate()
  const [senderIds, setSenderIds] = useState([])
  const [lastname, setLastname] = useState("")
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [documents, setDocuments] = useState([])
  const [department, setDepartment] = useState("")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [isLoadingSender, setIsLoadingSender] = useState(true); 
  const [isLoadingIncoming, setIsLoadingIncoming] = useState(true);
  const [countDoc, setCountDoc] = useState(0)
  
  useEffect(() => {
    setLoading(true);
    getIncoming();

    return () => {
      controller.abort();
    }
  }, []);

  useEffect(() => {
    if (senderIds.length !== 0) {
      getSender(controller)
    }
  }, [senderIds])

  const getIncoming = () => {
    Api.getIncoming(props.recipientId).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setCountDoc(transactionChecked.length)
      setIsEmpty(transactionChecked.length === 0);
      const newSenderIds = res.data.data.map((sender) => sender.transaction.document?.senderId)
      setSenderIds(newSenderIds)
      setDocuments(transactionChecked);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoadingIncoming(false)
    })
  };
  
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
      setIsLoadingSender(false)
    })
  }

  // flipper, turns true to false and vice versa
  const handleChecked = (i) => {
    const updatedDocuments = [...documents]
    updatedDocuments[i].isChecked = !updatedDocuments[i].isChecked
    setDocuments(updatedDocuments)
  }

  const handleRead = (e, id) => {
    e.stopPropagation()
    Api.readDocument(id).then(() => {
      getIncoming()
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleUnread = (e, id) => {
    e.stopPropagation()
    console.log(id)
  }

  const isLoading = isLoadingIncoming && isLoadingSender;

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
                <img className="img" src={Incoming} alt="" draggable={false} />
              </div>
              <span id="h1">Incoming mails go here :)</span>
              <span>Start sending to other Departments!</span>
            </div>
          </Box>
        ) : (
          <table>
          <tbody>
            {documents.map((document, i) => (
              <tr onClick={(e) => {
                  if(!e.target.closest(".MuiCheckbox-root")) {
                    navigate(`/inbox/incoming/${document.id}`)
                    handleRead(e, document.id)
                  }
                }} 
                key={document.id} 
                className={`tbl-row ${document.isChecked ? "checked" : ""}
                ${document?.read === true ? "tbl-row-read" : " "}`}>
                <td>
                  <Checkbox 
                    onChange={() => handleChecked(i)} size="small" checked={document.isChecked || false}
                  />
                </td>
                <td className="sender">
                  <span className={document.transaction.document?.urgent === true ? "urgent" : "non-urgent"}>{document.transaction.document?.urgent === true ? "HIGH" : "LOW"} </span>
                  <span className={document?.read === true ? "name-dept-read" : "name-dept"}>
                    From: {department[document.id]} {lastname[document.id]}
                  </span>
                </td>
                <td id="td-spacer"></td>
                <td className="title-and-message">
                  <span className={document?.read === true ? "title-read" : "title"}>{document.transaction.document?.subject} - </span>
                  <span>{document.transaction.document?.description}</span>
                </td>
                <td id="td-spacer"></td>
                <td className="date">
                  <span className="doc-stat">
                    <DocStatusSmall status={document.statusId?.name.charAt(0).toUpperCase() + document.statusId?.name.slice(1)} />
                  </span>
                  <span className={document?.read === true ? "date-read" : "datefr"}>{DateFormat({ createdDate: document.transaction.document?.createdDate })}</span>
                </td>
                <td className={`inbox-tr ${document.isChecked ? "checked" : ""}
                ${document?.read === true ? "inbox-tr-read" : " "}`}>
                  <Tooltip title={document?.read === true ? "Mark as unread" : "Mark as read"}>
                      <button 
                        onClick={
                          document?.read === true ? (
                            (e) => handleUnread(e, document.id)
                          ) : (
                            (e) => handleRead(e.document.id)
                          )
                        } 
                        className={`delete inbox-delete ${document.isChecked ? "checked" : ""}`}>
                        {document?.read === true ? (
                          <MarkEmailUnreadOutlinedIcon fontSize="small"/>
                        ) : (
                          <DraftsOutlinedIcon fontSize="small" />
                        )}
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