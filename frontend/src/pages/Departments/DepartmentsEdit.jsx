import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import Api from "../../services/Api"
import { useNavigate } from "react-router";

function DepartmentEdit() {
  const controller = new AbortController();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(0);
  const [error, setError] = useState(null)

  const getDepartments = () => {
    Api.getDepartments(controller).then((response) => {
      setData(response.data.data)
      setDepartment()
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    Api.getDepartments(controller).then((response) => {
      setDepartments(response.data.data);
    }).catch((error) => {
      console.log(error)
    })

    return () => { controller.abort() }
  }, [])
  const handleSave = () => {
    Api.updateDepartment({id}).then(() => {
      getDepartments(controller)
    }).catch((error) => {
      console.log(error)
    })
  };
  return (
    <>
      <div 
      // key={department._id}
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
                    <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                    {departments.map((dept, index) => (
                      <MenuItem key={index} value={dept.id}>
                        {dept.name}
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
                    <button className='save' onClick={() =>handleSave()}>Save</button>
                    {error && <div id='admin-add-user-error'>{error}
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DepartmentEdit