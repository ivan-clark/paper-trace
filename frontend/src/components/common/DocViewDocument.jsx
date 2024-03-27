import { LinearProgress } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DocStatus from '../../components/common/DocStatus';
import DateFormatLong from '../../services/Format';
import Tooltip from '@mui/material/Tooltip';
import Api from "../../services/Api"

function DocViewDocument(props) {
  const controller = new AbortController()
  const menuRef = useRef(null)
  const { id } = useParams()
  const location = useLocation()
  const { pathname } = location

  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [uniId, setUniId] = useState("")
  const [open, setOpen] = useState(false)
  const [urgent, setUrgent] = useState("")
  const [status, setStatus] = useState("")
  const [subject, setSubject] = useState("")
  const [senderId, setSenderId] = useState(0)
  const [loading, setIsLoading] = useState(false)
  const [createdDate, setCreatedDate] = useState("")
  const [description, setDescription] = useState("")
  const [declineNote, setDeclineNote] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [docToDecline, setDocToDecline] = useState(null)
  const [isLoadingRoute, setLoadingRoute] = useState(true); 
  const [isLoadingUser, setLoadingUser] = useState(true);

  const [role, setRole] = useState("")
  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [department, setDepartment] = useState("")

  const isAcceptedPath = pathname.includes("/accepted-docs")
  const isDeclinedPath = pathname.includes("/declined-docs")
  const isSentPath = pathname.includes("/sent")
  const isTrashPath = pathname.includes("/trash")

  useEffect(() => {
    setIsLoading(true);
    getRouteById(controller);
    if (senderId !== 0) {
      getUser(controller)
    }

    return () => {
      controller.abort();
    }
  }, [senderId])

  useEffect(() => {
    let handler = (e) => {
      if(menuRef.current && !menuRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)

    return() => {
      document.removeEventListener("mousedown", handler)
    }
  }, [menuRef])

  const getRouteById = () => {
    Api.getRouteById(id, controller).then((res) => {
      const data = res.data.data;
      setName(data.recepientId?.name)
      setUrgent(data.transaction.document?.urgent);
      setCreatedDate(data.transaction?.createdDate)
      setSubject(data.transaction.document?.subject);
      setSenderId(data.transaction.document?.senderId)
      setDescription(data.transaction.document?.description);
      setStatus(data.statusId?.name.charAt(0).toUpperCase() + data.statusId?.name.slice(1))
      setUniId(data?.uniId)
    }).catch((error) =>{
      console.log(error)
    }).finally(() => {
      setLoadingRoute(false)
    })
  }

  const getUser = () => {
    Api.getUserById(senderId, controller).then((res) => {
      const data = res.data.data;
      setDepartment(data.department?.name)
      setRole(data.role?.name.charAt(0).toUpperCase() + data.role?.name.slice(1))
      setLastname(data.lastName?.charAt(0).toUpperCase() + data.lastName?.slice(1))
      setFirstname(data.firstName?.charAt(0).toUpperCase() + data.firstName?.slice(1))
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoadingUser(false)
    })
  }

  const isLoading = isLoadingRoute || isLoadingUser;


  return (
    <>
      <div className="view-message-wrapper">
      <div className="button-section">
        <div className="button-inner-section">
          <div>
            <Tooltip title={
              isAcceptedPath 
              ? "Back to accepted docs" 
              : isDeclinedPath 
              ? "Back to declined docs"
              : isSentPath 
              ? "Back to sent docs"
              : isTrashPath
              ? "Back to trash docs"
              : " "
            } 
              enterDelay={600}
              >
              <Link to={
                isAcceptedPath 
                ? "/accepted-docs" 
                :  isDeclinedPath 
                ? "/declined-docs"
                : isSentPath
                ? "/sent"
                : isTrashPath
                ? "/trash"
                : " "
              }>
                <ArrowBackIcon className="back" />
              </Link>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Move to trash" enterDelay={600}>
              <button className="move-to-trash">
                <DeleteOutlineIcon className="delete-svg"/>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LinearProgress />
      ) : (
      <div className="scrollable-area">
        <div className="message-title-header">
          <span>{subject}</span>
          <div className="status-uniId">
            <DocStatus status={status}/>
          </div>
        </div>
       <div className="message-and-footer">
        <div className="message-body">
            <div className="sender-profile">
              <div className="profile">
                <span>
                  {firstname.toUpperCase().charAt(0)}
                  {lastname.toUpperCase().charAt(0)}
                </span>
              </div>
            </div>
            <div className="sender-message-body">
              <div className="top-section">
                <div>
                  <span><strong>{firstname} {lastname} </strong></span>
                  <span>{department} </span>
                  <span>{role}</span>
                </div>
                <div className="time-sent">
                  <span>{DateFormatLong({ createdDate: createdDate })}</span>
                </div>
              </div>
              <div className="to-me">
                <div className="to-me-doc-urgency">
                  <div>{isSentPath ? "from you" : "to me"}</div>
                  <div>
                    <Tooltip title="Show details" enterDelay={600}>
                      <button onClick={() => {setOpen(!open)}} className="show-details-button">
                        <ArrowDropDownIcon id="down-icon"/>
                      </button>
                    </Tooltip>
                  </div>
                  <div className={urgent === true ? "urgent" : "non-urgent"}>{urgent === true ? "HIGH" : "LOW"}
                  </div>
                </div>
                <div className="uniId">
                    <span className="upper-text">Tracking #:</span>
                    <span> {uniId}</span>
                </div>
                {open && (
                  <div ref={menuRef} className="show-details-modal">
                  <div className="first-section">
                    <span>from:</span>
                    <span>to:</span>
                    <span>date:</span>
                    <span>subject:</span>
                    <span>sent by:</span>
                  </div>
                  <div className="second-section">
                    <span>{department} Department</span>
                    <span>{name} Department</span>
                    <span>{DateFormatLong({ createdDate: createdDate })}</span>
                    <span>{subject}</span>
                    <span>{firstname} {lastname} <strong>{department} {role}</strong></span>
                  </div>
                </div>
              )}  
              </div>
              <div className="message-cont">
                <div className="message-text">
                  <span>
                    {description}
                  </span> 
                </div>
              </div>
            </div>
          </div>
       </div>
      </div>
    )}
    </div>
    </>
  )
}

export default DocViewDocument