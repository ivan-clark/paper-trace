import './inbox.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InboxOutgoing from './InboxOutgoing'
import InboxUpcoming from './InboxUpcoming'
import Typography from '@mui/material/Typography';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import React, { useState } from 'react'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Inbox() {
  let outgoing = 6
  let upcoming = 0

  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className='inbox-wrapper'>
      <div className='inbox-header'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab 
            iconPosition="start" 
            icon={<FileUploadOutlinedIcon />} 
            label={
              <div className="tab-label">
                <div className="tab-sub-wrapper">
                  <span>Outgoing</span>
                  {outgoing !== 0 && <span className='notif'>{`${outgoing} new`}</span>}
                </div>
                <span className="additional-label">docs to other departments</span>
              </div>
            }
            {...a11yProps(0)} />
          <Tab 
            iconPosition="start" 
            icon={<FileDownloadOutlinedIcon />} 
            label={
              <div className="tab-label">
                <div className="tab-sub-wrapper">
                  <span>Upcoming</span>
                  {upcoming !== 0 && <span className='notif'>{`${upcoming} new`}</span>}
                </div>
                <span className="additional-label">docs from other departments</span>
              </div>
            }
            {...a11yProps(1)} />
        </Tabs>
      </div>
      <div className="inbox-outlet">
        <div className="inbox-outlet-wrapper">
          <div className="inbox-inbox">
            <CustomTabPanel value={value} index={0}>
              <InboxOutgoing />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <InboxUpcoming />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inbox