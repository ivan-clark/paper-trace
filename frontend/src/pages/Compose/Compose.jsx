import { Link, useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react'
import './compose.scss'
import Api from "../../services/Api";
import { Select } from "@mui/material";
import { CircularProgress } from '@mui/material';


const Compose = (props) => {
  const controller = new AbortController();

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  const [department, setDepartment] = useState(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDepartments(controller);

    return () => {
      controller.abort();
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const model = {
      sender: {id: props.user.id},
      recepient: {id: department},
      subject: subject,
      message: message
    };
    Api.createTransaction(model).then(()=>{
      alert("Successfully sent");
    }).catch(()=>{

    })
  }

  return (
    <form onSubmit={handleSubmit} className="send-content">
      <div className="send-content-wrapper">
        <div className="send-header-wrapper">
          <div className="send-message-header">
            <span>New Message</span>
          </div>
        </div>
        <div className="send-body-wrapper">
          <div className="recipient-and-subject">
            <InputLabel id="select-label">To:</InputLabel>
            <Select
              labelId="select-label"
              className='compose-select'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              label="To:"
            >
              {loading ? (
                <div className="circularProgress">
                  <CircularProgress size={16} thickness={6}/>
                </div>
              ) : (
                departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))
              )}
            </Select>
            <input
              className='subject'
              placeholder='Subject:'
              value={subject}
              onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="body-body">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
          </div>
          <div className="send-button-wrapper">
            <button className='cancel'>
              <Link to={'/inbox'}>
                Cancel
              </Link>
            </button>
            <button className='send-doc-btn'>
              <span>
                <SendIcon fontSize='small' />
                Send
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Compose