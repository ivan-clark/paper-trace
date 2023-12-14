import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom'
import React, {useState} from 'react'

function DepartmentEdit() {
  const [deptAssigned, setDeptAssigned] = useState('')
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setDeptAssigned(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  };
  return (
    <>
      <form 
      // key={department._id}
      onSubmit={handleSubmit}
      className='edit-form-main-wrapper'
      >
        <div className="edit-form-wrapper">
          <div className="header-content">
            <>
            <div className="edit-text-and-back-icon">
              <div div className='back-icon'>
                <Link to='/departments'><ArrowBackIcon /></Link>
              </div>
              <div>
                <h3>Edit</h3>
              </div>
            </div>
            <div className='edited-time'> 
              <span>Last edited: </span>
                {`12:00 AM 1/1/2024`}
            </div>
            </>
          </div>
          <div className='line-header'></div>
          <div className="edit-content-wrapper">
            <div className="edit-content-border">
              <div className="edit-content">
                <div className="edit-input-wrapper">
                  <div className='select'>
                    <label>Department</label>
                    <Select 
                      value={deptAssigned}
                      onChange={handleChange}
                      >
                      {[].map((department) => (
                        <MenuItem key={department.value} value={department.value}>
                          {department.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  </div>
                  <div className="admin-edit-buttons">
                    <div>
                      <Link to='/departments' className='cancel'>Cancel</Link>
                    </div>
                    <div>
                    <button className='save'>Save</button>
                    {error && <div id='admin-add-user-error'>{error}
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default DepartmentEdit