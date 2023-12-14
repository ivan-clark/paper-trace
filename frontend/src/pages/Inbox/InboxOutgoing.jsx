import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'

function InboxOutgoing() {  
  const [isChecked, setIsChecked] = useState(false)

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
        <tr className={`tbl-row ${isChecked ? 'checked' : ''}`}>
          <td>
            <Checkbox onChange={handleChecked}/>
          </td>
          <td className='sender'>
            <div className='text'>
              <span><strong>Student Affairs Office</strong></span>
            </div>
          </td>
          <td id='td-spacer'></td>
          <td className='title-and-message'>
            <div>
              <span className='title'>Title - </span>
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis et velit, quis earum id optio tenetur. Repellendus necessitatibus id sapiente culpa velit dolorum nostrum. Adipisci nobis necessitatibus quo quaerat tempora?</span>
            </div>
          </td>
          <td id='td-spacer'></td>
          <td className='date'>
            <div>
              <span><strong>Nov 14</strong></span>
            </div>
          </td>
          <div className={`inbox-tr ${isChecked ? 'checked' : ''}`}>
            <Tooltip title='Delete'>
              <button onClick={handleDelete} className={`delete inbox-delete ${isChecked ? 'checked' : ''}`}>
                <div>
                  <DeleteOutlineOutlinedIcon fontSize='small'/>
                </div>
              </button>
            </Tooltip>
          </div>
        </tr>
      </tbody>
    </table>
    </>
  )
}

export default InboxOutgoing