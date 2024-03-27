import { TextField, Button, 
    InputAdornment, CircularProgress  } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import DateFormatLong from "../../services/Format"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import TimelineContent from "@mui/lab/TimelineContent";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react"
import Typography from '@mui/material/Typography';
import Documents from "../../assets/Documents.svg"
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineDot from "@mui/lab/TimelineDot";
import DateFormat from "../../services/Util";
import Tooltip from "@mui/material/Tooltip";
import Timeline from "@mui/lab/Timeline";
import Api from "../../services/Api"
import "./_track.scss"

function Track(props) {
  const controller = new AbortController()

  const [uniId, setUniId] = useState("")
  const [isEmpty, setIsEmpty] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [documents, setDocuments] = useState([])
  const [dept, setDept] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  
  const handleSubmit = () => {
    setIsLoading(true)
    Api.trackDocument(uniId).then((res) => {
      const data = res.data.data
      setIsEmpty(false)
      setDocuments(data)
      getUser(controller)
      const sender = data.transaction.document?.senderId
      setFrom(sender)
      getUser(sender)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getUser = (sender) => {
    Api.getUserById(sender).then((res) => {
      const data = res.data.data
      setDept(data.department?.name)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="track-bg">
      <div className="track-header">
        <div className="track-header-text">
          <span>Track a document and its timeline.</span>
        </div>
        <div className="track-input-wrapper">
          <div className="track-input">
            <TextField 
              value={uniId}
              onChange={(e) => setUniId(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: "6px 0px 0px 6px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              autoComplete="off"
              className="track-doc-input"
              label="Enter a document number"
            />
            <Button
              onClick={handleSubmit}
              className="track-button"
              variant="contained"
            >
              Track
            </Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <>
          <div className="loading-time">
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          {isEmpty ? (
          <div className="timeline-section">
          <div className="timeline">
            <div className="timeline-isEmpty">
              <div>
                <img draggable={false} alt="/" className="doc-svg" src={Documents} />
              </div>
              <div>
                <span>Timelines show up here.</span>
              </div>
            </div>
          </div>
        </div>
          ) : (
          <>
            {documents.map((doc, i) => (
            <div key={i} className="timeline-bg">
              <div className="timeline-notEmpty"> 
                <div className="doc-details">
                  <div className="doc-head">
                    <span>Document Details</span>
                  </div>
                    <div className="doc-head2">
                      <div className="doc-section1">
                        <span>From:</span>
                        <span>To:</span>
                        <span>Date:</span>
                        <span>Subject:</span>
                        <span>sent by:</span>
                      </div>
                      <div className="doc-section2">
                        <span>{from} Department</span>
                        <span>{doc.recepientId?.name} Department</span>
                        <span>{DateFormatLong({ createdDate: doc.transaction.document?.createdDate })}</span>
                        <span>{doc.transaction.document?.subject}</span>
                        <span>{"firstname"} {"lastname"} <strong>{"department"} {"role"}</strong></span>
                      </div>
                    </div>
                    <div className="doc-body">
                      <span>{doc.transaction.document?.subject}</span>
                      <span>{doc.transaction.document?.description}</span>
                    </div>
                </div>
                <div className="timeline-timeline-timeline">
                  <div className="timeline-timeline">
                    <div className="doc-head">
                      <span>Tracking Details</span>
                    </div>
                    {/* {timelineItem.map((item) => ( */}
                    <Timeline 
                      className="mui-timeline" 
                      //key={item.id}
                      sx={{
                        padding: 0,
                      }}
                      >
                      <TimelineItem sx={{padding: 0}}>
                        <TimelineSeparator>
                          <TimelineDot sx={{
                            marginBottom: 0,
                            marginTop: 0
                          }}/>
                          <TimelineConnector sx={{
                            height: 80,
                            marginBottom: 0
                          }}/>
                        </TimelineSeparator>
                        <TimelineContent 
                          sx={{
                            paddingTop: 0, 
                            paddingBottom: 0
                            }}>
                          <div className="timeline-head">
                            <div id="item-and-date">
                              {DateFormatLong({ createdDate: doc.transaction.createdDate })}
                            </div>
                            <div id="item-status">
                              <strong>{doc.transaction.status?.name}</strong>
                            </div>
                          </div>
                          <div>
                            {/* {item.details}  */}
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
            ))}
          </>
          )}
        </>
      )}
    </div>
  )
}

export default Track