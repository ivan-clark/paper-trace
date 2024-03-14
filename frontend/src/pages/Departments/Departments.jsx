import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DateFormat from "../../services/Util"
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Table from "../../components/common/Table";
import Api from "../../services/Api";
import { useNavigate } from "react-router";
import './_departments.scss'

const Departments = () => {
  let controller = new AbortController();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    getDepartments(controller);
    
    return () => {
      controller.abort();
    }
  }, []);

  const getDepartments = () => {
    Api.getDepartments(controller).then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
      setShowSnackbar(false)
    })
  };

  const handleOpenDialog = (id) => {
    setUserToDelete(id)
    setOpenDialog(true)
  };
  

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "department",
      headerName: "Department",
      width: 300
    },
    {
      field: "createdDate",
      headerName: "Date created",
      width: 300
    },
    {
      field: " ",
      width: 300,
      className:"action-btn-wrapper",
      sortable: false,
      renderCell: (params) => {
        const handleEdit = (e) => {
          console.log(params);
          navigate(`/departments/edit/${params.row.id}`);
          e.stopPropagation();
        };

        const handleDelete = (e) => {
          console.log(userToDelete);
          Api.deleteDepartment({id: userToDelete}).then(()=>{
            getDepartments(controller);
            setShowSnackbar(true)
          }).catch((error)=>{
            console.log(error);
          }).finally(() => {
            setOpenDialog(false)
          })
          e.stopPropagation();
        };
  
        return <>
        <div className="row-wrapper">          
          <div className="action-btns">
            <Tooltip title="Edit">
              <button className="users-edit" onClick={handleEdit}><EditIcon fontSize="small"/></button>
            </Tooltip>
            <Tooltip title="Delete">
              <button className="users-delete" onClick={() => {handleOpenDialog(params.row.id)}}><DeleteOutlineOutlinedIcon fontSize="small"/></button>
            </Tooltip>
            <Dialog
              open={openDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{
                background: 'rgba(0, 0, 0, 0.03)',
                '& .MuiPaper-root': {
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.03)', 
                },
                '& .MuiBackdrop-root': {
                  backgroundColor: 'transparent',
                },
              }}
            > 
              <DialogTitle id="users-dialog">
                {"Delete Department"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-text">
                  Once deleted, the action cannot be undone, confirm?
                </DialogContentText>
              </DialogContent>
              <DialogActions id="action-buttons">
                <Button id="cancel-dialog" variant="contained" onClick={() => {setOpenDialog(false)}}>Cancel</Button>
                <Button id="delete-dialog" variant="contained" onClick={handleDelete}>Delete</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        </>;
      }
    }
  ];

  const rows = data && data.map((d) => ({
    id: d.id, 
    department: d.name,
    //name: `${d.head?.firstname} ${d.head?.lastname}`,
    createdDate: DateFormat({createdDate: d?.createdDate})
  }));

  return (
    <div className="area">
      <div className="admin-header">
      {loading && (
        <div className="circularProgress">
          <CircularProgress />
        </div>
         )}
        <Table stickyHeader aria-label="sticky table" columns={columns} rows={rows} />
        <Snackbar open={showSnackbar} autoHideDuration={3000}>
          <Alert variant="filled" severity="error">User deleted</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Departments;
