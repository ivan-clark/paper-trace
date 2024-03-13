import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useState, useEffect, useRef } from 'react'
import { LinearProgress } from "@mui/material";
import DateFormatLong from '../../services/Format';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import Api from "../../services/Api"
import { Button } from '@mui/material';

function InboxViewMessage() {
  const controller = new AbortController()
  const menuRef = useRef()
  const { id } = useParams()
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [urgent, setUrgent] = useState("")
  const [subject, setSubject] = useState("")
  const [createdDate, setCreatedDate] = useState("")
  const [senderId, setSenderId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [department, setDepartment] = useState("")
  const [role, setRole] = useState("")

  const handleClickOpen = () => {
    setOpenDialog(true)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }

  useEffect(() => {
    setIsLoading(true);
    getRouteById(controller);
    if(senderId !== 0) {
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
      setSubject(data.transaction.document?.subject);
      setDescription(data.transaction.document?.description);
      setUrgent(data.transaction.document?.urgent);
      setSenderId(data.transaction.document?.senderId)
      setName(data.recepientId?.name)
      setCreatedDate(data.transaction?.createdDate)
      console.log(res.data.data)
    }).catch((error) =>{
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getUser = () => {
    Api.getUserById(senderId, controller).then((res) => {
      const data = res.data.data;
      setFirstname(data.firstName?.charAt(0).toUpperCase() + data.firstName?.slice(1))
      setLastname(data.lastName?.charAt(0).toUpperCase() + data.lastName?.slice(1))
      setRole(data.role?.name.charAt(0).toUpperCase() + data.role?.name.slice(1))
      setDepartment(data.department?.name)
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
                  <span>{role}</span>
                </div>
                <div className="time-sent"><span>{DateFormatLong({ createdDate: createdDate })}</span></div>
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
                    <span>{DateFormatLong({ createdDate: createdDate })}</span>
                    <span>{subject}</span>
                    <span>{firstname} {lastname} <strong>{name} {role}</strong></span>
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
                    <button onClick={handleClickOpen} className="decline">
                      <CloseIcon />
                      <span>Decline</span>
                    </button>
                    <FormControl sx={{ mt: 2, minWidth: 120 }}>
                      <Dialog
                        fullWidth
                        sx={{maxWidth: 420, margin: "auto"}}
                        open={openDialog}
                        onClose={handleClose}
                        PaperProps={{
                          component: "form",
                          onSubmit: (e) => {
                            e.preventDefault()
                            handleClose()
                          }
                        }}
                      >
                        <DialogTitle 
                          sx={{ fontFamily: "Inter" }}
                        >{`Decline`}</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            required
                            fullWidth
                            name="note"
                            type="text"
                            margin="dense"
                            variant="standard"
                            label="Write a note"
                            sx={{ 
                              fontFamily: "Inter", 
                            }}
                            placeholder="Write a note to let them know"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="outlined" 
                            sx={{
                              borderRadius: 10,
                              paddingInline: 2,
                              fontFamily: "Inter",
                              textTransform: "none",
                              border: "none",
                              bgcolor: "#b50000",
                              color: "white",
                              "&:hover": {
                                bgcolor: "#9c0606",
                                border: "none"
                              },
                            }}
                          >
                            <span>Confirm Decline</span>
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </FormControl>
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
    )}
    </div>
  )
}

export default InboxViewMessage