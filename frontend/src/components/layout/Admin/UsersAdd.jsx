import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {sortedDepartments} from './Departments'
import {Link} from 'react-router-dom'
import React, {useState} from 'react'

function UsersAdd() {
  const [deptAssigned, setDeptAssigned] = useState('')
  const [role, setRole] = useState('DEPT-HEAD')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('P@ssw0rd')
  const [uclmID, setUclmID] = useState('')
  const [campus, setCampus] = useState('UCLM')
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setDeptAssigned(e.target.value);
  };

  return (
    <div className="add-user-form-wrapper">
          <div className='add-header-content'>
            <div className="add-text-and-back-icon">
              <div div className='back-icon'>
                <Link to='/users'><ArrowBackIcon /></Link>
              </div>
              <div>
                <h3>Add a new head</h3>
              </div>
            </div>
            <div id="dept-head-and-role">
            </div>
          </div>              
          <div className='line-header'> 
          </div>
          <form>
            <div className="edit-content-wrapper">
              <div className='edit-content-border'>
                <div className='edit-content'>
                  <>
                    <div className='edit-input-wrapper'>  
                      <div className='select'>
                        <label>Department</label>
                        <Select 
                          value={deptAssigned}
                          onChange={handleChange}
                          >
                          {sortedDepartments.map((department) => (
                            <MenuItem key={department.value} value={department.value}>
                              {department.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="two-input-inline">
                        <div className='input-flex-one'>
                          <label>Campus</label>
                          <input  
                            type="text"
                            onChange={(e) => setCampus(e.target.value)}
                            value={campus}
                            disabled={true}
                            />
                        </div>
                        <div className='input-flex-one'>
                          <label>Role</label>
                          <input  
                            type="text"
                            disabled={true}
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            />
                        </div>
                      </div>
                    </div>
                    <div className='two-input-inline'>  
                      <div className='input-flex-one'> 
                        <label>First name</label>
                        <input  
                          type="text"
                          onChange={(e) => setFirstname(e.target.value)}
                          value={firstname}
                          />
                      </div>
                      <div className='input-flex-one'>
                        <label>Last name</label>
                        <input  
                          type="text"
                          onChange={(e) => setLastname(e.target.value)}
                          value={lastname}
                          />
                      </div>
                      <div className='input-flex-one'>
                        <label>Email</label>
                        <input  
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          />
                      </div>
                    </div>
                    <div className='two-input-inline'>  
                      <div className='input-flex-two'>
                        <label>Username</label>
                        <input  
                          type="text"
                          maxLength={13}
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                          />
                      </div>
                      <div className='input-flex-two'>
                        <label>Password</label>
                        <input  
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          disabled={true}
                          />
                      </div>
                      <div className='input-flex-two'>
                        <label>UCLM ID#</label>
                        <input  
                          type="text"
                          onChange={(e) => setUclmID(e.target.value)}
                          value={uclmID}
                          />
                      </div>
                    </div>
                    <div className='admin-edit-buttons'>
                      <div>
                        <Link to='/users' className='cancel'>Cancel</Link>
                      </div>
                      <div>
                        <button className='save'>Save</button>
                      </div>
                    </div>
                    {error && <div id='admin-add-user-error'>{error}</div>}
                  </>
                </div>
              </div>
            </div>
          </form>
      </div>
  )
}

export default UsersAdd