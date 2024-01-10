import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect, useRef } from 'react'

function InboxViewMessage() {
  const menuRef = useRef()
  const [open, setOpen] = useState(false)

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
      <div className="scrollable-area">
        <div className="message-title-header">
          <div>
            message title go here
          </div>
        </div>
       <div className="message-and-footer">
        <div className="message-body">
            <div className="sender-profile">
              <div className="profile">
                <span>JT</span>
              </div>
            </div>
            <div className="sender-message-body">
              <div className="top-section">
                <div>
                  <span><strong>Sender Fullname</strong></span>
                  <span> Department</span>
                  <span> Role</span>
                </div>
                <div className="time-sent"><span>10:48am (2hrs ago)</span></div>
              </div>
              <div className="to-me">
                <div className="to-me-doc-urgency">
                  <span>to me</span>
                  <div>
                    <Tooltip title="Show details" enterDelay={600}>
                      <button onClick={() => {setOpen(!open)}} className="show-details-button">
                        <ArrowDropDownIcon id="down-icon"/>
                      </button>
                    </Tooltip>
                  </div>
                  <div className='doc-urgency'>Urgent</div>
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
                    <span>{`CCS Department`}</span>
                    <span>{`CCS Department`}</span>
                    <span>{`December 23, 2023 12:00AM`}</span>
                    <span>{`Message title goes here`}</span>
                    <span>{`Sender fullname uclmID and role`}</span>
                  </div>
                </div>
              )}  
              </div>
              <div className="message-cont">
                <div className="message-text">
                  <span>
                    Message goes here
                  </span>
                </div>
              </div>
              <div className="footer-button-section">
                <div className="left-section-button">
                  <div>
                    <button className="decline">
                      <CloseIcon />
                      <span>Decline</span>
                    </button>
                  </div>
                  <div>
                    <button className="accept">
                      <CheckIcon />
                      <span>Accept</span>
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
    </div>
  )
}

export default InboxViewMessage