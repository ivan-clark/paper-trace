import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DateFormat from '../../components/common/DateFormat'
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import Table from "../../components/common/Table";
import Api from "../../services/Api";
import { useNavigate } from "react-router";

const Departments = () => {
  let controller = new AbortController();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      width: 300
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
          navigate(`/departments/edit/${params.row.id}`);
          e.stopPropagation();
        };

        const handleDelete = (e) => {
          console.log(params);
          Api.deleteDepartment({id: params.row.id}).then(()=>{
            getDepartments(controller);
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
    department: d.name,
    //name: `${d.head.firstname} ${d.head.lastname}`,
    createdDate: DateFormat({createdAt: d.createdDate})
  }));

  return (
    <div className="area">
      <div className="admin-header">
      {loading && (
        <div className="circularProgress">
          <CircularProgress />
        </div>
         )}
        <Table columns={columns} rows={rows} handleDelete={handleDelete}/>
      </div>
    </div>
  );
};

export default Departments;
