import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DateFormat from "../../services/Util"
import Tooltip from "@mui/material/Tooltip";
import Api from "../../services/Api";

function InboxOutgoing(props) {
  const controller = new AbortController();
  const navigate = useNavigate()
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
      const transactionChecked = response.data.data.map((transaction) => ({
        ...transaction,
        isChecked: false
      }))
      console.log(response.data.data);
      setTransactions(transactionChecked);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  // flipper
  const handleChecked = (i) => {
    const updatedTransactions = [...transactions]
    updatedTransactions[i].isChecked = !updatedTransactions[i].isChecked
    setTransactions(updatedTransactions)
  }

  const handleDelete = (e) => {
    
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
          {transactions.map((transaction, i) => (
            <tr onClick={(e) => {
              // this checks if checkbox is clicked or not, very useful
              if(!e.target.closest(".MuiCheckbox-root")) {
                navigate(`/inbox/outgoing/${transaction.id}`)
              }
            }} 
            key={transaction.id} 
            className={`tbl-row ${transaction.isChecked ? "checked" : ""}`}
            >
            <td>
              <Checkbox onChange={() => handleChecked(i)} size="small" checked={transaction.isChecked || false}/>
            </td>
              <td className="sender">
                <span><strong>{transaction.recepient?.name}</strong></span>
              </td>
              <td id="td-spacer"></td>
              <td className="title-and-message">
                <strong><span className="title">{transaction.subject} - </span></strong>
                <span>{transaction.message}</span>
              </td>
              <td id="td-spacer"></td>
              <td className="date">
                <span><strong>{DateFormat({ createdAt: transaction.modifiedDate })}</strong></span>
              </td>
              <td className={`inbox-tr ${transaction.isChecked ? "checked" : ""}`}>
                <Tooltip title="Delete">
                  <button onClick={(e) => {
                      // prevent tr onclick when button is clicked
                      e.stopPropagation()
                      handleDelete()
                    }} 
                    className={`delete inbox-delete ${transaction.isChecked ? "checked" : ""}`}>
                    <DeleteOutlineIcon fontSize="small"/>
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </>
  )
}

export default InboxOutgoing