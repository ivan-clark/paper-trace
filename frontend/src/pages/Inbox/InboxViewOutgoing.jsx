import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useState, useEffect, useRef } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { Link, useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Api from "../../services/Api"

function InboxViewOutgoing() {
  const controller = new AbortController()

  const { id } = useParams()
  const menuRef = useRef()
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [urgent, setUrgent] = useState("")
  const [subject, setSubject] = useState("")
  const [senderId, setSenderId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState("")

  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [department, setDepartment] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    setIsLoading(true)
    getDocument(controller)

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

  const getDocument = () => {
    Api.getDocumentById(id, controller).then((res) => {
      const data = res.data.data;
      setName(data.senderId?.name)
      setUrgent(data.urgent)
      setSubject(data.subject)
      setSenderId(data.senderId?.id)
      setDescription(data.description)
      console.log(res.data.data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getUser = () => {
    Api.getUserById(senderId, controller).then((res) => {
      const data = res.data.data;
      setFirstname(data.firstName)
      setLastname(data.lastName)
      setDepartment(data.department?.name)
      setRole(data.role?.name)
    })
  }

  return (
    <div className="view-message-wrapper">
      <div className="button-section">
        <div>
          <Tooltip title="Back to inbox" enterDelay={600}>
            <Link to={'/inbox'}>
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
      {isLoading ? (
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
                  <span>{name}</span>
                  <span> {role}</span>
                </div>
                <div className="time-sent"><span>10:48am (2hrs ago)</span></div>
              </div>
              <div className="to-me">
                <div className="to-me-doc-urgency">
                  <span>to {name}</span>
                  <div>
                    <Tooltip title="Show details" enterDelay={600}>
                      <button onClick={() => {setOpen(!open)}} className="show-details-button">
                        <ArrowDropDownIcon id="down-icon"/>
                      </button>
                    </Tooltip>
                  </div>
                  <div className={urgent === 1 ? "urgent" : "non-urgent"}>{urgent === 1 ? "HIGH" : "LOW"}</div>
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
                    <span>{firstname} {lastname} <strong>{role}</strong></span>
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