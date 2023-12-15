import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DateFormat from '../../components/common/DateFormat'
import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Api from "../../services/Api";

function InboxUpcoming(props) {
  const controller = new AbortController();
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTransactions(controller);

    return () => {
      controller.abort();
    }
  }, []);

  const getTransactions = () => {
    Api.getTransactions(null, props.departmentId, 1, controller).then((response) => {
      console.log(response.data.data);
      setTransactions(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  const handleChecked = () => {
    setIsChecked(!isChecked)
  }

  const handleDelete = (e) => {
    e.preventDefault()
  }

  return (
    <>
    {loading ? (
          <div className="circularProgress">
            <CircularProgress />
          </div>
        ) : (
      <table>
        <tbody>
          {transactions.map((transaction) => (
            <tr className={`tbl-row ${isChecked ? 'checked' : ''}`}>
              <td>
                <Checkbox onChange={handleChecked} size='small'/>
              </td>
              <td className='sender'>
                <div className='text'>
                  <span><strong>{transaction.sender.firstname}</strong></span>
                </div>
              </td>
              <td id='td-spacer'></td>
              <td className='title-and-message'>
                <div>
                  <span className='title'>{transaction.subject} - </span>
                  <span>{transaction.message}</span>
                </div>
              </td>
              <td id='td-spacer'></td>
              <td className='date'>
                <div>
                  <span><strong>{DateFormat({ createdAt: transaction.modifiedDate })}</strong></span>
                </div>
              </td>
              <div className={`inbox-tr ${isChecked ? 'checked' : ''}`}>
              <Tooltip title='Delete'>
                <button onClick={handleDelete} className={`delete inbox-delete ${isChecked ? 'checked' : ''}`}>
                  <div>
                    <DeleteOutlineIcon fontSize='small'/>
                  </div>
                </button>
              </Tooltip>
            </div>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </>
  )
}

export default InboxUpcoming