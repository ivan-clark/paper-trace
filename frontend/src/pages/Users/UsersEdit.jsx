import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams} from 'react-router-dom'
import React, {useEffect, useState} from 'react'

function UsersEdit() {
  const [deptAssigned, setDeptAssigned] = useState('')
  const [role, setRole] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [uclmID, setUclmID] = useState('')
  const [campus, setCampus] = useState('')
  const [error, setError] = useState(null)

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setDeptAssigned(e.target.value);
  };

  return (
    <> 
      <form 
        onSubmit={handleSubmit} 
        className="edit-form-main-wrapper"
      >
      <div className="edit-form-wrapper">
        <div className='header-content'>
          <>
            <div className="edit-text-and-back-icon">
              <div div className='back-icon'>
                <Link to='/users'><ArrowBackIcon /></Link>
              </div>
              <div>
                <h3>Edit</h3>
              </div>
            </div>
            <div id="dept-head-and-role">
              <div className='edited-time'> 
                <span>Last edited: </span>
                {`12:00 AM 1/1/2024`}
              </div>
              <div>
                <div>
                  {'Ivan'} {`Clark`}
                </div>
                <div id='role-text'>
                  {`ADMIN`}
                </div>
              </div>
            </div>
          </>  
        </div>              
        <div className='line-header'>
        </div>
        <div className="edit-content-wrapper">
          <div className='edit-content-border'>
            <div className='edit-content'>
              <>
                <div className='two-input-inline'>  
                  <div className='input-flex-one'>
                    <label>Dept. Assigned</label>
                    <input 
                      type="text" 
                      // onChange={(e) => setDeptAssigned(e.target.value)}
                      // value={deptAssigned}
                      disabled={true}
                    />
                  </div>
                  <div className='input-flex-one'>
                    <label>Role</label>
                    <input 
                      // onChange={(e) => setRole(e.target.value)}
                      disabled={true}
                      type="text" 
                      // value={role}
                    />
                  </div>
                </div>
                <div className='two-input-inline'>  
                  <div className='input-flex-one'>
                    <label>Firstname</label>
                    <input 
                      type="text" 
                      // onChange={(e) => setFirstname(e.target.value)}
                      // value={firstname}
                    />
                  </div>
                  <div className='input-flex-one'>
                    <label>Lastname</label>
                    <input 
                      type="text" 
                      // onChange={(e) => setLastname(e.target.value)}
                      // value={lastname}
                    />
                  </div>
                </div>
                <div className='two-input-inline'>  
                    <div className="input-flex-one">
                      <div>
                        <label>Email</label>
                        <input 
                          type="text" 
                          // onChange={(e) => setUclmID(e.target.value)}
                          // value={uclmID}
                        />
                      </div>
                    </div>
                    <div className="input-flex-one">
                      <div>
                        <label>Campus</label>
                        <input 
                          type="text" 
                          // onChange={(e) => setCampus(e.target.value)}
                          // value={campus}
                        />
                      </div>
                    </div>
                  </div>
                <div className='admin-edit-buttons'>
                  <div>
                    <Link to='/users' className='cancel'>Cancel</Link>
                  </div>
                  <div>
                    <button className='save'>Save</button>
                    {error && <div id='admin-add-user-error'>{error}</div>}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  )
}

export default UsersEdit