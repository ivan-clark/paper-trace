import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState, useEffect, useRef } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { Link, useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Api from "../../services/Api"

function InboxViewOutgoing(props) {
  const controller = new AbortController()

  const { id } = useParams()
  const menuRef = useRef()
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [uniId, setUniId] = useState("")
  const [open, setOpen] = useState(false)
  const [urgent, setUrgent] = useState("")
  const [subject, setSubject] = useState("")
  const [status, setStatus] = useState("")
  const [senderId, setSenderId] = useState(0)
  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [department, setDepartment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState("")
  const [createdDate, setCreatedDate] = useState("")
  const [loadingOutoing, setloadingOutoing] = useState(false)
  const [loadingSender, setloadingSender] = useState(false)

  const loggedUserRole = props.user.role?.name.toUpperCase().charAt(0) + props.user.role?.name.slice(1)
  const loggedFirstname = props.user?.firstName.toUpperCase().charAt(0) + props.user?.firstName.slice(1)
  const loggedLastname = props.user?.lastName.toUpperCase().charAt(0) + props.user?.lastName.slice(1)

  useEffect(() => {
    setIsLoading(true)
    getRouteById(controller)
    if (senderId !== 0) {
      getUser(controller)
    }

    return () => {
      controller.abort()
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
      setName(props.user.department?.name)
      setUrgent(data.transaction.document?.urgent);
      setCreatedDate(data.transaction?.createdDate)
      setSubject(data.transaction.document?.subject);
      setSenderId(data.recepientId?.id)
      setDescription(data.transaction.document?.description);
      setStatus(data.statusId?.name.charAt(0).toUpperCase() + data.statusId?.name.slice(1))
      setUniId(data?.uniId)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setloadingOutoing(false)
    })
  }

  const getUser = () => {
    Api.getUserById(senderId, controller).then((res) => {
      const data = res.data.data;
      setDepartment(data.department?.name)
      // setLastname(data?.lastName.charAt(0).toUpperCase() + data?.lastName.slice(1))
      // setFirstname(data?.firstName.charAt(0).toUpperCase() + data?.firstName.slice(1))
      setLastname(data.lastName)
      setFirstname(data.firstName)
      setRole(data.role?.name.charAt(0).toUpperCase() + data.role?.name.slice(1))
    }).finally(() => {
      setloadingSender(false)
    })
  }

  const loading = loadingOutoing || loadingSender;

  return (
    <div className="view-message-wrapper">
      <div className="button-section">
        <div className="button-inner-section">
          <div>
            <Tooltip title="Back to inbox" enterDelay={600}>
              <Link to={'/inbox'}>
                <ArrowBackIcon className="back" />
              </Link>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Mark as unread" enterDelay={600}>
              <button className="move-to-trash">
                <MarkEmailUnreadOutlinedIcon className="delete-svg"/>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="scrollable-area">
        <div className="message-title-header">
          <div>
            {subject}
          </div>
        </div>
       <div className="message-and-footer">
        <div className="message-body">
            <div className="sender-profile">
              <div className="profile">
                <span>
                  {firstname?.charAt(0).toUpperCase()}
                  {lastname?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="sender-message-body">
              <div className="top-section">
                <div>
                  <span><strong>{firstname} {lastname} </strong></span>
                  <span>{department}</span>
                  <span> {role}</span>
                </div>
                <div className="time-sent"><span>10:48am (2hrs ago)</span></div>
              </div>
              <div className="to-me">
                <div className="to-me-doc-urgency">
                  <span>from you</span>
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
                    <span>{name} Department</span>
                    <span>{department} Department</span>
                    <span>{`December 23, 2023 12:00AM`}</span>
                    <span>{subject}</span>
                    <span>{loggedFirstname} {loggedLastname} <strong>{loggedUserRole}</strong></span>
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
              <div className="footer-button-section">
                <div className="left-section-button">
                  <div>
                    <button className="decline">
                      <CloseIcon />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
                <div className="right-section-button">
                  <div>
                    <button className="forward">
                      <ShortcutIcon />
                      <span>Forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer">
                
          </div>
       </div>
      </div>
      )}
    </div>
  )
}

export default InboxViewOutgoing