import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import {styles} from './styles'
import {Link, useLocation} from 'react-router-dom'
import React from "react";

const Table = (props) => {
  const location = useLocation();
  const isUsersPath = location.pathname.includes('/users')

  const handleDelete = () => {
    
  }

  return (
    <>
    <table>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((r, i) => (
              <td key={i}>
                {r}
              </td>
            ))}
            <td>
              <div id='absolute' className="td-tooltip-wrapper">
                <div className="tooltip-bg">
                  <Tooltip title='Edit'>
                    <Link to={isUsersPath ? '/users/edit' : '/departments/edit'}    className='edit'>
                      <div>
                        <EditIcon 
                        style={styles.small}/>
                      </div>
                    </Link>
                  </Tooltip>
                  <Tooltip title='Delete'>
                    <button onClick={handleDelete} className='delete'>
                      <div>
                        <DeleteOutlineIcon 
                        style={styles.small}/>
                      </div>
                    </button>
                  </Tooltip>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  );
};

export default Table;
