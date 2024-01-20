import { Alert, LinearProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import Api from "../../services/Api"


function UsersAdd() {
  const controller = new AbortController();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(0);
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [uclmID, setUclmID] = useState('')
  const [error, setError] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false)

  useEffect(() => {
    setLoading(true);
    getDepartments();

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
  
  const handleSave = () => {
    let model = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      sendEmail: false,
      role: {
        id: 2
      },
      department: {
        id: department
      }
    };

    Api.createUser(model).then((response)=>{
      setShowSnackbar(true)
      getUsers(controller)
      setDepartment(" ")
      setFirstname(" ")
      setLastname(" ")
      setEmail(" ")
    }).catch((error)=>{
      console.log(error);
    });
  }
  const getUsers = () => {
    Api.getUsers(controller).then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
      setShowSnackbar(false)
    })
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  return (
    <div className="add-user-form-wrapper">
      <div className='add-header-content'>
        <div className="add-text-and-back-icon">
          <div className='back-icon'>
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
      <div className="edit-content-wrapper">
        <div className='edit-content-border'>
          <div className='edit-content'>
            <>
              <div className='edit-input-wrapper'>
                <div className='select'>
                  <TextField select label="Department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                    {loading ? (
                      <LinearProgress />
                    ) : (
                    departments.map((dept, index) => (
                        <MenuItem key={index} value={dept.id}>
                        {dept.name}
                        </MenuItem>
                        ))
                    )}
                  </TextField>
                </div>
                <div className="two-input-inline">
                  <div className='input-flex-one'>
                    <label>Role</label>
                    <input
                      type="text"
                      disabled={true}
                      value={"Department Head"}
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
              </div>
              <div className='two-input-inline'>
                <div className='input-flex-one'>
                  <label>Email</label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className='input-flex-one'>
                  <label>UCLM ID#</label>
                  <input
                    disabled={true}
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
                  <button className='save' onClick={()=>handleSave()}>Save</button>
                </div>
              </div>
              {error && <div id='admin-add-user-error'>{error}</div>}
            </>
          </div>
        </div>
      </div>
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} id="alert-success" variant="filled" severity="success">User added successfully!</Alert>
      </Snackbar>
    </div>
  )
}

export default UsersAdd