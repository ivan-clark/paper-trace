import { useLocation } from 'react-router-dom'
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';

const Table = (props) => {
  const location = useLocation();
  const isUsersPath = location.pathname.includes('/users')  

  return (
    <>
    <Box sx={{ height: '97%', width: '100%', borderRadius: 12 }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        />
      </Box>
    </>
  );
};

export default Table;
