import FormControlLabel from '@mui/material/FormControlLabel';
import { Alert, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from '@mui/material/FormGroup';
import React, { useEffect, useState } from "react"
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Api from "../../services/Api";
import Box from "@mui/material/Box";
import "./_compose.scss"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Compose = (props) => {
  const controller = new AbortController();

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  //changed state value 0 to array
  const [error, setError] = useState(null)
  const [urgent, setUrgent] = useState(false)
  const [subject, setSubject] = useState("");
  const [doctype, setDoctype] = useState(false)
  const [department, setDepartment] = useState([]);
  const [description, setDescription] = useState("");
  const [restricted, setRestricted] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDepartment(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    setLoading(true);
    getDepartments(controller);

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

  const handleSubmit = () => {
    const model = {
      documentModel: {
        senderId: {
          id: props.user.id
        },
        subject: subject,
        description: description,
        urgent: urgent,
        doctype: doctype,
      },
      transactionModel: {
        restricted: restricted,
      },
      routeModel: [
        {
          recepientId: {
            id: department[0]
          },
        }
      ]
    };
    Api.multipleCompose(model).then(()=>{
      setShowSnackbar(true)
    }).catch(()=>{
      console.log(error)
    }).finally(() =>{
      navigate('/inbox')
      console.log(model)
    })
  }

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false)
  }

  return (
    <div className="send-content">
      <div className="send-content-wrapper">
        <div className="send-header-wrapper">
          <div className="send-message-header">
            <span>New Message</span>
          </div>
        </div>
        <div className="send-body-wrapper">
        <FormControl sx={{ m: 1, height: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <InputLabel id="demo-multiple-chip-label">To:</InputLabel>  
            <Select
              sx={{
                flex: 6
              }}
              label="To:"
              multiple
              labelId="demo-multiple-chip-label"
              className="compose-select"
              value={department}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, flex: 1 }}>
                {Array.isArray(selected) ? (
                  selected.map((value) => (
                    // label returns an id but displays dept name
                    <Chip key={value.id} label={departments.find(dept => dept.id === value).name} />
                  ))
                  ) : ( 
                <Chip key={selected} label={selected} />
              )}
                </Box>
              )}
              MenuProps={MenuProps}
              // onChange={(e) => setDepartment(e.target.value)}
            >
              {loading ? (
                <LinearProgress />
              ) : (
                departments.map((dept) => (
                  //changed value dept.id to value dept.name
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem> 
                ))
              )}
            </Select>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <TextField
              sx={{ flex: 6 }}
              label="Subject:"
              className="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)} 
            />
            <FormControl sx={{ flex: 3, marginTop: .8 }}>
              <InputLabel id="doctype">Document type</InputLabel>  
              <Select
                value={doctype}
                onChange={(e) => setDoctype(e.target.value)}
                id="doctype"
                label="Document type"
              >
                <MenuItem value={true}>For signature</MenuItem>
                <MenuItem value={false}>Carbon copy</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="body-body">
            <textarea placeholder="Type here..." value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className="send-button-wrapper">
            <div className="checkboxes">
              <div>
                <FormControlLabel 
                label="Restricted?" control={<Checkbox 
                checked={restricted}
                onChange={(e) => setRestricted(e.target.checked)}
                size="small"/>} 
                />
                <FormControlLabel 
                label="Is this urgent?" control={<Checkbox 
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                size="small"/>} 
                />
              </div>
            </div>
            <div>
              <button className="cancel">
                <Link to={"/inbox"}>
                  Cancel
                </Link>
              </button>
              <button onClick={handleSubmit} className="send-doc-btn">
                <span>
                  <SendIcon fontSize="small" />
                  Send
                </span>
              </button>
            </div>
          </div>
          </FormControl>
        </div>
      </div>
      <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant="filled" severity="success">
          {`Message sent successfully`}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Compose