import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react'

function SentDetails() {
  const [isChecked, setIsChecked] = useState(false)

  const handleChecked = () => {
    setIsChecked(!isChecked)
  }

  const handleDelete = (e) => {
    e.preventDefault()
  }

  return (
    <table>
      <tbody>
        <tr className={`sent-tbl-row ${isChecked ? 'checked' : ''}`}>
          <td>
            <Checkbox onChange={handleChecked}/>
          </td>
          <td className='sender'>
            <div className='text'>
              <span>{`To: Student Affairs Office`}</span>
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
          <div className={`sent-tr ${isChecked ? 'checked' : ''}`}>
            <Tooltip title='Delete'>
            <button onClick={handleDelete} className={`delete sent-delete ${isChecked ? 'checked' : ''}`}>
                <div>
                  <DeleteOutlineOutlinedIcon fontSize='small'/>
                </div>
              </button>
            </Tooltip>
          </div>
        </tr>
      </tbody>
    </table>
  )
}

export default SentDetails