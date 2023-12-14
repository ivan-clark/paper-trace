import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Api from "../../services/Api"

function UsersEdit() {
  const controller = new AbortController();
  
  const [departments, setDepartments] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("");
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();
  const { id } = useParams();

  const getUsers = () => {
    Api.getUsers(controller).then((response) => {
      setData(response.data.data);
      setDepartment()
      setFirstname()
      setLastname()
      setEmail()
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    })
  };

  useEffect(() => {
    setLoading(true)
    getUsers(controller);
    
    return () => {
      controller.abort();
    }
  }, []);


  useEffect(() => {
    Api.getDepartments(controller).then((response) => {
      setDepartments(response.data.data);
    }).catch((error) => {
      console.log(error);
    })

    return () => { controller.abort() }
  }, []);
  
  const handleSave = () => {
    Api.updateUser({id}).then(() => {
      getUsers(controller);
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <> 
      <div  
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
                      onChange={(e) => setDepartment(e.target.value)}
                      value={department}
                      disabled={true}
                    />
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
                    {/* <div className="input-flex-one">
                      <div>
                        <label>Campus</label>
                        <input 
                          type="text" 
                          onChange={(e) => setCampus(e.target.value)}
                          value={campus}
                        />
                      </div>
                    </div> */}
                  </div>
                <div className='admin-edit-buttons'>
                  <div>
                    <Link to='/users' className='cancel'>Cancel</Link>
                  </div>
                  <div>
                    <button className='save' onClick={()=>handleSave()}>Save</button>
                    {error && <div id='admin-add-user-error'>{error}</div>}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default UsersEdit