import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useState, useEffect, useRef } from 'react'
import { Alert, LinearProgress, CircularProgress } from "@mui/material";
import DateFormatLong from '../../services/Format';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DocStatus from '../../components/common/DocStatus';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Snackbar from "@mui/material/Snackbar";
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import Api from "../../services/Api"

function InboxViewMessage(props) {
  const controller = new AbortController()
  const menuRef = useRef()
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [urgent, setUrgent] = useState("")
  const [status, setStatus] = useState("")
  const [subject, setSubject] = useState("")
  const [senderId, setSenderId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [createdDate, setCreatedDate] = useState("")
  const [description, setDescription] = useState("")
  const [declineNote, setDeclineNote] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isAccepting, setIsAccepting] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [receivedBy, setReceivedBy] = useState("")

  const [role, setRole] = useState("")
  const [lastname, setLastname] = useState("")
  const [firstname, setFirstname] = useState("")
  const [department, setDepartment] = useState("")
  
  const handleClickOpen = () => {
    setOpenDialog(true)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }

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
      setDepartment(data.department?.name)
      setRole(data.role?.name.charAt(0).toUpperCase() + data.role?.name.slice(1))
      setLastname(data.lastName?.charAt(0).toUpperCase() + data.lastName?.slice(1))
      setFirstname(data.firstName?.charAt(0).toUpperCase() + data.firstName?.slice(1))
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleAccept = () => {
    setIsAccepting(true)

    const statusId = id 
    Api.acceptDocument(statusId, props.user.id).then((res) => {
      setShowSnackbar(true)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      getRouteById(controller)
      setShowSnackbar(true)
      setTimeout(() => {  
        setShowSnackbar(false);
        setIsAccepting(false); 
        //navigate("/inbox"); 
      }, 1300);
    })
  }

  const handleDecline = () => {
    

    if(!declineNote.trim()) {
      setErrorMessage("Note is required")
      return false;
    }
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
          <span>{subject}</span>
          <DocStatus status={status}/>
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
                  <span>{name} </span>
                  <span>{role}</span>
                </div>
                <div className="time-sent">
                  <span>{DateFormatLong({ createdDate: createdDate })}</span>
                </div>
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
              <div className="footer-button-section">
                <div className="left-section-button">
                  <div>
                    <button onClick={handleClickOpen} className="decline">
                      <CloseIcon />
                      <span>Decline</span>
                    </button>
                  </div>
                  <div>
                    <button 
                    disabled={isAccepting}
                    onClick={handleAccept} 
                    className="accept">
                      <CheckIcon />
                      {isAccepting ? <CircularProgress size={20} color="inherit" /> : "Accept"}
                    </button>
                  </div>
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
                        >{`Decline document?`}</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            required
                            fullWidth
                            name="note"
                            type="text"
                            margin="dense"
                            variant="standard"
                            value={declineNote}
                            error={isLoading ? null : Boolean(errorMessage)}
                            onClick={() => setErrorMessage(null)}
                            onChange={(e) => setDeclineNote(e.target.value)}
                            label={isLoading ? "Write a note" : errorMessage ? errorMessage : "Write a note to let them know"}
                            sx={{ 
                              fontFamily: "Inter", 
                            }}
                            placeholder="Write a note to let them know"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleDecline}
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
        <Snackbar open={showSnackbar}>
          <Alert onClose={handleClose} variant="filled" severity="success">
            {`Document Accepted`}
          </Alert>
        </Snackbar>
       </div>
      </div>
    )}
    </div>
  )
}

export default InboxViewMessage