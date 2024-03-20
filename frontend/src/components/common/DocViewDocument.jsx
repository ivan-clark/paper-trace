import { Alert, LinearProgress, CircularProgress } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DocStatus from '../../components/common/DocStatus';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import DialogTitle from '@mui/material/DialogTitle';
import DateFormatLong from '../../services/Format';
import FormControl from '@mui/material/FormControl';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Snackbar from "@mui/material/Snackbar";
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
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
  const [isLoading, setIsLoading] = useState(false)
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
 
  const handleClickOpen = () => {
    setOpenDialog(true)
    setDocToDecline()
    console.log()
  }
  const handleClose = () => {
    setOpenDialog(false)
    setDocToDecline(null)
  }

  return (
    <>
      <div className="view-message-wrapper">
      <div className="button-section">
        <div className="button-inner-section">
          <div>
            <Tooltip title={
              isAcceptedPath 
              ? "Back to accepted docs" 
              :  isDeclinedPath 
              ? "Back to declined docs"
              : " "
            } 
              enterDelay={600}
              >
              <Link to={
                isAcceptedPath 
                ? "/accepted-docs" 
                :  isDeclinedPath 
                ? "/declined-docs"
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
          <span>{"Application for graduation"}</span>
          <div className="status-uniId">
            <DocStatus status={"Accepted"}/>
          </div>
        </div>
       <div className="message-and-footer">
        <div className="message-body">
            <div className="sender-profile">
              <div className="profile">
                <span>
                  {"vince".toUpperCase().charAt(0)}
                  {"tapdasan".toUpperCase().charAt(0)}
                </span>
              </div>
            </div>
            <div className="sender-message-body">
              <div className="top-section">
                <div>
                  <span><strong>{"Vince"} {"Tapdasan"} </strong></span>
                  <span>{"CCS"} </span>
                  <span>{"Head"}</span>
                </div>
                <div className="time-sent">
                  <span>{DateFormatLong({ createdDate: "1/24/24" })}</span>
                </div>
              </div>
              <div className="to-me">
                <div className="to-me-doc-urgency">
                  <div>to me</div>
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
              <div className="footer-button-section">
                <div className="left-section-button">
                  <div>
                    <button onClick={() => handleClickOpen(id)} className="decline">
                      <CloseIcon />
                      <span>Decline</span>
                    </button>
                  </div>
                  <div>
                    <button 
                    disabled={isAccepting}
                    //onClick={handleAccept} 
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
                            //handleDecline()

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
                            variant="standard"
                            value={declineNote}
                            onChange={(e) => setDeclineNote(e.target.value)}
                            label={"Write a note"}
                            placeholder="Write a note to let them know"
                          />
                        </DialogContent>
                        <DialogActions>
                          <button
                            disabled={isDeclining}
                            className="confirm-decline"
                          >
                            {isDeclining ? <CircularProgress size={20} color="inherit" />  : "Confirm Decline"}
                          </button> 
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
          <Snackbar open={showSnackbar && (status === "Accepted" || status === "Declined")}>
            <Alert onClose={handleClose} variant="filled" severity={status === "Accepted" ? "success" : "error"}>
              {status === "Accepted" ? "Document Accepted" : "Document Declined"}
            </Alert>
        </Snackbar>
       </div>
      </div>
    )}
    </div>
    </>
  )
}

export default DocViewDocument