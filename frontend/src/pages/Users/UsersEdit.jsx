import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Api from "../../services/Api"
import { MenuItem, Select } from "@mui/material";

function UsersEdit() {
  const controller = new AbortController();

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(0);
  const [role, setRole] = useState(0);
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)

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

  const handleChange = (value) => {
    console.log(value);
  }

  const handleSave = () => {
    let model = {
      id: id,
      firstName: firstname,
      lastName: lastname,
      email: email,
      sendEmail: false,
      role: {
        id: role
      },
      department: {
        id: department
      }
    };
    Api.updateUser(model).then(() => {
      alert("Successfully saved");
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
          {loading ? (
            <div className="circularProgress">
              <CircularProgress />
            </div>
          ) : (
          <div className="edit-content-wrapper">
            <div className='edit-content-border'>
              <div className='edit-content'>
                <>
                  <div className='two-input-inline'>
                    <div className='user-edit-dept'>
                      <label>Dept. Assigned</label>
                      <Select value={department} onChange={(e)=>setDepartment(e.target.value)}>
                        {departments.map((dept) => (
                          <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className='two-input-inline'>
                    <div className='input-flex-one'>
                      <label>Firstname</label>
                      <input
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                      />
                    </div>
                    <div className='input-flex-one'>
                      <label>Lastname</label>
                      <input
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                      />
                    </div>
                  </div>
                  <div className='two-input-inline'>
                    <div className="input-flex-one">
                      <div>
                        <label>Email</label>
                        <input
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                    </div>
                  </div>
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
          </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UsersEdit