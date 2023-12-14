import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { styles } from './styles'
import { Link, useLocation } from 'react-router-dom'
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = (props) => {
  const location = useLocation();
  const isUsersPath = location.pathname.includes('/users')

  const handleDelete = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
      />
    </>
  );
};

export default Table;
