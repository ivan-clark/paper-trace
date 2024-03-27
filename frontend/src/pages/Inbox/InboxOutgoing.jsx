import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import DocStatusSmall from "../../components/common/DocStatusSmall";
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
  const [documents, setDocuments] = useState([])
  const [loadingOutoing, setloadingOutoing] = useState(true)
  const [loadingSender, setloadingSender] = useState(true)

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
    Api.getOutGoingImproved(props.senderId).then((res) => {
      const transactionChecked = res.data.data.map((transaction) => ({
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

  const handleDelete = (e, id) => {
    e.stopPropagation()
    console.log(id)
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
                className={`tbl-row ${document.isChecked ? "checked" : ""} tbl-row-read`}
                >
                <td>
                  <Checkbox 
                    onChange={() => handleChecked(i)} size="small" checked={document.isChecked || false}
                  />
                </td>
                  <td className="sender">
                    <span className={document.transaction.document?.urgent === true ? "urgent" : "non-urgent"}>{document.transaction.document?.urgent === true ? "HIGH" : "LOW"} </span>
                    <span>To: {document.recepientId?.name}</span>
                  </td>
                  <td id="td-spacer"></td>
                  <td className="title-and-message">
                  <span>{document.transaction.document?.subject} - </span>
                  <span>{document.transaction.document?.description}</span>
                  </td>
                  <td id="td-spacer"></td>
                  <td className="date">
                    <span className="doc-stat">
                      <DocStatusSmall status={document.statusId?.name.charAt(0).toUpperCase() + document.statusId?.name.slice(1)} />
                    </span>
                    <span>{DateFormat({ createdDate: document.transaction.document?.createdDate })}</span>
                  </td>
                  <td className={`inbox-tr ${document.isChecked ? "checked" : ""} inbox-tr-read`}>
                    <Tooltip title="Mark as unread">
                      <button onClick={(e) => {
                          handleDelete(e, document.id)
                        }} 
                        className={`delete inbox-delete ${document.isChecked ? "checked" : ""}`}>
                        <MarkEmailUnreadOutlinedIcon fontSize="small"/>
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