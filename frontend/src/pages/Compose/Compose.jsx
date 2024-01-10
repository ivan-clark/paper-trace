import { Alert, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import SendIcon from "@mui/icons-material/Send";
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from "@mui/material/MenuItem";
import Api from "../../services/Api";
import "./_compose.scss"


const Compose = (props) => {
  const controller = new AbortController();

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDepartments(controller);

    return () => { controller.abort() }
  }, []);

  const getDepartments = () => {
    Api.getDepartments(controller).then((response) => {
      setDepartments(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  const handleSubmit = () => {
    const model = {
      sender: {id: props.user.id},
      recepient: {id: department},
      subject: subject,
      message: message
    };
    setShowSnackbar(true)
    Api.createTransaction(model).then(()=>{
    }).catch(()=>{
      console.log(error)
    }).finally(() =>{
      navigate('/inbox')
    })
  }

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
  }

  return (
    <div className="send-content">
      <div className="send-content-wrapper">
        <div className="send-header-wrapper">
          <div className="send-message-header">
            <span>New Message</span>
          </div>
        </div>
        <div className="send-body-wrapper">
          <TextField
            select
            className="compose-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            label="To:"
          >
            {loading ? (
              <LinearProgress />
            ) : (
              departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem> 
              ))
            )}
          </TextField>
            <input
              className="subject"
              placeholder="Subject:"
              value={subject}
              onChange={(e) => setSubject(e.target.value)} />
          <div className="body-body">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
          </div>
          <div className="send-button-wrapper">
            <button className="cancel">
              <Link to={"/inbox"}>
                Cancel
              </Link>
            </button>
            <button onClick={handleSubmit} className="send-doc-btn">
              <span>
                <SendIcon fontSize="small" />
                Send
              </span>
            </button>
          </div>
        </div>
      </div>
      <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          {`Message sent successfully`}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Compose