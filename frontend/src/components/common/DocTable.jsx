import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LinearProgress, Alert } from "@mui/material";
import React, { useEffect, useState } from "react"
import Accepted from "../../assets/Accepted.png"
import { useNavigate, useLocation } from "react-router-dom";
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

  const [read, setRead] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState([])
  const [senderId, setSenderId] = useState(0)
  const [department, setDepartment] = useState("")
  const [lastname, setLastname] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [createdDate, setCreatedDate] = useState("")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [docLoading, setDocLoading] = useState(true)
  const [senderLoading, setSenderLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (isAcceptedPath) {
      getAcceptedDocs()
    } else if (isDeclinedPath) {
      getDeclinedDocs()
    }

    if(senderId !== 0) {
      getSender(controller)
    }

    return () => {
      controller.abort()
    }
  }, [senderId])

  const handleChecked = (i) => {
    const updatedDocuments = [...documents]
    updatedDocuments[i].isChecked = !updatedDocuments[i].isChecked
    setDocuments(updatedDocuments)
  }


  const handleDelete = (e) => {
    e.preventDefault()
  }

  const getDeclinedDocs = () => {
    Api.getDeclinedDocs(props.receiver).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      setIsEmpty(transactionChecked.length === 0)
      res.data.data.forEach((sender) => {
        setSenderId(sender.transaction.document?.senderId)
        setCreatedDate(sender.transaction?.createdDate)
      })
      setDocuments(transactionChecked)
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
      res.data.data.forEach((sender) => {
        setSenderId(sender.transaction.document?.senderId)
        setCreatedDate(sender.transaction?.createdDate)
      })
      setDocuments(transactionChecked)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setDocLoading(false)
    })
  }

  const getSender = () => {
    Api.getUserById(senderId, controller).then((res) => {
      const data = res.data.data
      setLastname(data.lastName?.charAt(0).toUpperCase() + data.lastName?.slice(1))
      setDepartment(data.department?.name)
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
                <img className="img" src={Accepted} alt="" draggable={false} />
              </div>
              <span id="h1">Accepted mails go here :)</span>
              <span>Start sending to other Departments!</span>
            </div>
          </Box>
        ) : (
      <table>
        <tbody>
          {documents.map((document, i) => (
            <tr 
              onClick={(e) => {
                if(!e.target.closest(".MuiCheckbox-root")) {
                  if(isAcceptedPath) {
                    navigate(`/accepted-docs/doc/${document.id}`)
                  } else if(isDeclinedPath) {
                    navigate(`/declined-docs/doc/${document.id}`)
                  }
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
              <span className={document.transaction.document?.urgent === true ? "urgent" : "non-urgent"}>{document.transaction.document?.urgent === true ? "HIGH" : "LOW"} </span>
              <span className={read ? "name-dept bold" : "name-dept"}>{lastname} {department}</span>
            </td>
            <td id="td-spacer"></td>
            <td className="title-and-message2">
              <strong>{document.transaction.document?.subject} - </strong>
              <span>{document.transaction.document?.description}</span>
            </td>
            <td id="td-spacer"></td>
            <td className="date">
              <span className="doc-stat">
                <DocStatusSmall status={document.statusId?.name.charAt(0).toUpperCase() + document.statusId?.name.slice(1)} />
              </span>
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

export default DocTable