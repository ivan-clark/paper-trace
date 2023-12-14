import React, { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import DateFormat from '../../components/common/DateFormat'
import Table from "../../components/common/Table";
import Api from "../../services/Api";
import { useNavigate } from "react-router";

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
    })
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'department',
      headerName: 'Department',
      width: 150
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150
    },
    {
      field: 'createdDate',
      headerName: 'Date created',
      width: 150
    },
    {
      field: " ",
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
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
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
    createdDate: d.createdDate
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
