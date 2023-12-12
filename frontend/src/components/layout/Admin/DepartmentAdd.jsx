import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {sortedDepartments} from './Departments'
import {Link} from 'react-router-dom'
import React, {useState} from 'react'

function DepartmentAdd() {
  const [deptAssigned, setDeptAssigned] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (event) => {
    setDeptAssigned(event.target.value);
  };

  return (
    <div className="add-user-form-wrapper">
      <div className="add-header-content">
        <div className="add-text-and-back-icon">
          <div className="back-icon">
            <Link to='/departments'><ArrowBackIcon /></Link>
          </div>
          <div>
            <h3>Add a new department</h3>
          </div>
        </div>
      </div>
      <div className="line-header">
      </div>
        <div className="edit-content-wrapper">
        <div 
          className='admin-form-wrapper' 
          onSubmit={handleSubmit}
          >
            <form id='admin-add-user-form'>
              <div className='select'>
              <label>Department name</label>
                <Select 
                  // value={deptAssigned}
                  onChange={handleChange}
                >
                  {sortedDepartments.map((department) => (
                    <MenuItem key={department.value} value={department.value}>
                      {department.label}
                    </MenuItem>
                  ))}
              </Select>
              </div>
              <div className='admin-edit-buttons'>
                <div>
                  <Link to='/departments' className='cancel'>Cancel</Link>
                </div>
                <div>
                  <button className='save'>Save</button>
                </div>
              </div>
              {error && <div id='admin-add-user-error'>{error}</div>}
            </form>
        </div>
        </div>
    </div>
  )
}

export default DepartmentAdd