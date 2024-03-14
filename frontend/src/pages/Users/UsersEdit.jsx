import { MenuItem, 
        LinearProgress, 
        Alert, 
        CircularProgress,
        Box,
        TextField,
        FormControl } from "@mui/material";
import { Link, useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Api from "../../services/Api"
  
function UsersEdit(props) {
  const controller = new AbortController();

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(0);
  const [role, setRole] = useState(0);
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getDepartments(controller);
    getUser(controller);

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

  const getUser = () => {
    Api.getUserById(id, controller).then((response) => {
      const data = response.data.data;
      setFirstname(data.firstName);
      setLastname(data.lastName);
      setEmail(data.email);
      setDepartment(data.department.id);
      setRole(data.role.id);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
  }

  const handleSave = () => {
    let model = {
      id: id,
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
    setShowSnackbar(true)
    Api.updateUser(model).then(() => {
      navigate('/users')
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <div className="edit-form-main-wrapper">
        <div className="edit-form-wrapper">
          <div className='header-content'>
            <>
              <div className="edit-text-and-back-icon">
                <div className='back-icon'>
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
                    {props.user?.firstname} {props.user?.lastname}
                  </div>
                  <div id='role-text'>
                    {props.user?.role.name}
                  </div>
                </div>
              </div>
            </>
          </div>
          <div className='line-header'>
          </div>
          {loading ? (
            <div className="circularProgress">
              <CircularProgress />
            </div>
          ) : (
          <div className="edit-content-wrapper">
            <div className='edit-content-border'>
              <>
                <FormControl sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection:"column",
                      gap: 1.4
                    }}
                    >
                    <Box 
                      sx={{ 
                        width: "100%",
                        display: "flex", 
                        flexDirection: "row", 
                        gap: 1.5 
                      }}
                      >
                      <TextField 
                        sx={{
                          width: "100%",
                          flex: 2
                        }}
                        select label="Department" 
                        value={department} 
                        onChange={(e) => setDepartment(e.target.value)}>
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
                      <TextField 
                          sx={{
                            width: "100%",
                            flex: 1
                          }}
                          label="Role" 
                          variant="outlined"  
                          value={"Department Head"}
                        />
                    </Box>
                    <Box  
                      sx={{ 
                        width: "100%",
                        display: "flex", 
                        flexDirection: "row", 
                        gap: 1.5 
                      }}
                      >
                      <TextField 
                          sx={{
                            width: "100%",
                            flex: 1
                          }}
                          label="First name" 
                          variant="outlined"  
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                        <TextField 
                          sx={{
                            width: "100%",
                            flex: 1
                          }}
                          label="Last name" 
                          variant="outlined"  
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                    </Box>
                    <Box
                      sx={{ 
                        width: "100%",
                        display: "flex", 
                        flexDirection: "row", 
                        gap: 1.5 
                      }}
                      >
                    <TextField 
                        sx={{
                          width: "100%",
                          flex: 2
                        }}
                        label="Email" 
                        variant="outlined"  
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField 
                        sx={{
                          width: "100%",
                          flex: 1
                        }}
                        label="UCLM ID" 
                        variant="outlined" 
                        disabled={true}
                      />
                    </Box>
                  </Box>
                </FormControl>
                <div className='admin-edit-buttons'>
                  <div>
                    <Link to='/users' className='cancel'>Cancel</Link>
                  </div>
                  <div>
                    <button className='save' onClick={() => handleSave()}>Save</button>
                    {error && <div id='admin-add-user-error'>{error}</div>}
                  </div>
                </div>
              </>
            </div>
          </div>
          )}
        </div>
        <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} variant="filled" severity="success">
            User edited successfully!
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default UsersEdit