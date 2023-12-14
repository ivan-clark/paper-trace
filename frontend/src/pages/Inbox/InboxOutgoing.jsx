import React, { useEffect, useState } from 'react'
import Api from "../../services/Api";

function InboxOutgoing(props) {
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
    Api.getTransactions(props.userId, null, 1, controller).then((response) => {
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
      <table>
        <tbody>
          {transactions.map((transaction) => (
            <tr className={`tbl-row ${isChecked ? 'checked' : ''}`}>
              <td className='sender'>
                <div className='text'>
                  <span><strong>{transaction.recepient.name}</strong></span>
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
                  <span><strong>{transaction.modifiedDate}</strong></span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default InboxOutgoing