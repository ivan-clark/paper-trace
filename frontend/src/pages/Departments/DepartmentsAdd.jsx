import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, {useState} from "react"
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import { useNavigate } from "react-router";
import {Link} from "react-router-dom"
import Api from "../../services/Api"


function DepartmentAdd() {
  const controller = new AbortController();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const navigate = useNavigate();

  const getDepartments = () => {
    Api.getDepartments(controller).then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    })
  };

  const handleSave = () => {
    let model = {
      name: name
    };

    Api.createDepartment(model).then((response)=> {
      console.log(response);
      setShowSnackbar(true)
      getDepartments(controller)
      setName(" ")
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  return (
    <>
    <div className="add-user-form-wrapper">
      <div className="add-header-content">
        <div className="add-text-and-back-icon">
          <div className="back-icon">
            <Link to="/departments"><ArrowBackIcon /></Link>
          </div>
          <div>
            <h3>Add a new department</h3>
          </div>
        </div>
      </div>
      <div className="line-header">
      </div>
        <div className="edit-content-wrapper">
        <div className="admin-form-wrapper" >
            <div id="admin-add-user-form">
              <div className="select">
                <TextField 
                  label="Department Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  />
              </div>
              <div className="admin-edit-buttons">
                <div>
                  <Link to="/departments" className="cancel">Cancel</Link>
                </div>
                <div>
                  <button className="save" onClick={()=>handleSave()}>Save</button>
                </div>
              </div>
              {error && <div id="admin-add-user-error">{error}</div>}
            </div>
        </div>
        </div>
    </div>
    <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} variant="filled" severity="success">Department added successfully!</Alert>
    </Snackbar>
    </>
  )
}

export default DepartmentAdd