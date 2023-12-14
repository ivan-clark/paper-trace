import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DateFormat from '../../components/common/DateFormat'
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import Table from "../../components/common/Table";
import Api from "../../services/Api";
import { useNavigate } from "react-router";
import './users.scss'

const Users = () => {
  const controller = new AbortController();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      navigate('/users')
    })
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const columns = [
    { field: 'id', headerName: '#', width: 70 },
    {
      field: 'department',
      headerName: 'Department',
      width: 150
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 230
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230
    },
    {
      field: 'createdDate',
      headerName: 'Date created',
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
          console.log(params);
          Api.deleteUser({id: params.row.id}).then(()=>{
            getUsers(controller);
          }).catch((error)=>{
            console.log(error);
          })
          e.stopPropagation();
        };
  
        return <>
        <div className='action-btns'>
          <Tooltip title='Edit'>
            <button className='users-edit' onClick={handleEdit}><EditIcon fontSize='small'/></button>
          </Tooltip>
          <Tooltip title='Delete'>
            <button className='users-delete' onClick={handleDelete}><DeleteOutlineOutlinedIcon fontSize='small'/></button>
          </Tooltip>
        </div>
        </>;
      }
    }
  ];

  const rows = data && data.map((d) => ({
    id: d.id, 
    department: d.department.name,
    name: `${d.firstName} ${d.lastName}`,
    role: d.role.name,
    email: d.email,
    createdDate: DateFormat({createdAt: d.createdDate})
  }));

  return (
    <div className='area'>
      <div className="admin-header">
        {loading && (
        <div className="circularProgress">
          <CircularProgress />
        </div>
         )}
         <Table columns={columns} rows={rows} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Users;
