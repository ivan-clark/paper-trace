import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Table from "../../components/common/Table";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from '@mui/material/Snackbar';
import Tooltip from "@mui/material/Tooltip";
import DateFormat from "../../services/Util"
import { useNavigate } from "react-router";
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import Api from "../../services/Api";
import "./_users.scss"

const Users = () => {
  const controller = new AbortController();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    getUsers(controller);
    
    return () => {
      controller.abort();
    }
  }, []);

  const getUsers = () => {
    Api.getUsers(controller).then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
      navigate("/users")
      setShowSnackbar(false)
    })
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true)
    setUserToDelete(id)
  };

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "department",
      headerName: "Department",
      width: 150
    },
    {
      field: "name",
      headerName: "Name",
      width: 230
    },
    {
      field: "role",
      headerName: "Role",
      width: 150
    },
    {
      field: "email",
      headerName: "Email",
      width: 230
    },
    {
      field: "createdDate",
      headerName: "Date created",
      width: 150
    },
    {
      field: " ",
      width: 300,
      className:"action-btn-wrapper",
      sortable: false,
      renderCell: (params) => {
        const handleEdit = (e) => {
          console.log(params);
          navigate(`/users/edit/${params.row.id}`);
          e.stopPropagation();
        };

        const handleDelete = (e) => {
          console.log(userToDelete);
          Api.deleteUser({id: userToDelete }).then(()=>{
            getUsers(controller);
            setShowSnackbar(true)
            setOpenDialog(false)
          }).catch((error)=>{
            console.log(error);
          })
          e.stopPropagation();
        };
  
        return <>
        <div className="action-btns">
          <Tooltip disableFocusListener={true} title="Edit">
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
              {`Delete User`}
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
        </>;
      }
    }
  ];

  const rows = data && data.map((d) => ({
    id: d?.id, 
    department: d?.department?.name,
    name: `${d?.firstName} ${d?.lastName}`,
    role: d?.role?.name,
    email: d?.email,
    createdDate: DateFormat({createdAt: d?.createdDate})
  }));

  return (
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
  );
};

export default Users;
