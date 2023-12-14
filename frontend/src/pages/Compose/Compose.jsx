import {Link} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import {sortedDepartments} from '../../components/layout/Admin/Departments'
import React from 'react'
import './compose.scss'

function Compose() {
  const handleSubmit = (e) => {
    e.preventDefault()
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
            <TextField 
              select
              label="To:"
              size='small'
              className='compose-select'
              labelId="test-select-label"
              // value={deptAssigned}
              // onChange={handleChange}
              >
                {sortedDepartments.map((department) => (
                  <MenuItem key={department.value} value={department.value}>
                    {department.label}
                  </MenuItem>
                ))}
            </TextField>
            <input 
              className='subject' 
              placeholder='Subject:'/>
          </div>
          <div className="body-body">
            <textarea />
          </div>
          <div className="send-button-wrapper">
            <button className='cancel'>
              <Link to={'/inbox'}>
                Cancel
              </Link>
            </button>
            <button className='send-doc-btn'>
              <span>
                <SendIcon fontSize='small'/> 
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