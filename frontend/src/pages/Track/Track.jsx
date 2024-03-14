import { TextField, Button, InputAdornment  } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
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

function Track() {
  const [isEmpty, setIsEmpty] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const sampleTimeline = [
    {id:1 ,date: "Jan. 1, 2024", time: "9:30AM", status: "Accepted", details: "Document accepted by CADS",},
    {id:2 ,date: "Jan. 4, 2024", time: "5:49PM", status: "Pending", details: "Document is pending"},
    {id:3 ,date: "Jan. 6, 2024", time: "7:22PM", status: "Declined", details: "Document declined by Records",},
    {id:4 ,date: "Jan. 8, 2024", time: "9:10AM", status: "Accepted", details: "Document accepted by C6",},
    {id:5 ,date: "Jan. 1, 2024", time: "9:30AM", status: "Accepted", details: "Document accepted by CCS",},
    {id:6 ,date: "Jan. 4, 2024", time: "5:49PM", status: "Pending", details: "Document is pending"},
  ]

  const [timelineItem, setTimelineItem] = useState(sampleTimeline)

  useEffect(() => {
    getTransactionById();

  }, [])

  const getTransactionById = () => {
    setIsEmpty(false)
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
              className="track-button"
              variant="contained"
            >
              Track
            </Button>
          </div>
        </div>
      </div>
      {isEmpty ? (
        <div className="timeline-section">
        <div className="timeline">
          <div className="timeline-isEmpty">
            <div>
              <img draggable={false} className="doc-svg" src={Documents} />
            </div>
            <div>
              <span>Timelines show up here.</span>
            </div>
          </div>
        </div>
      </div>
      ) : (
      <div className="timeline-bg">
        <div className="timeline-notEmpty"> 
          {showDetails ? (
            <>
              <div className="arrow-left-div">
              <Tooltip title="Collapse">
                <button onClick={() => setShowDetails(false)} id="arrow-left">
                  <ArrowRightIcon />
                </button>
              </Tooltip>
              </div>
              <div className="doc-details">
                <div>
                  <div className="doc-header">Document Details</div>
                  <div className="doc-wrap">
                    <span>To:</span>
                    <span>From:</span>
                    <span>Date:</span>
                    <span>Sent by:</span> 
                  </div>
                </div>
              </div>
            </>
          ) : (
            null
          )}
          <div className="timeline-timeline-timeline">
            {showDetails ? null : (
            <div className="arrow-left-div">
              <Tooltip title="View document details">
                <button onClick={() => setShowDetails(true)} id="arrow-left">
                  <ArrowLeftIcon />
                </button>
              </Tooltip>
            </div>
            )}
            <div className="timeline-timeline">
              {timelineItem.map((item) => (
              <Timeline 
                className="mui-timeline" 
                key={item.id}
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
                        {`${item.date} ${item.time}`}
                      </div>
                      <div id="item-status">
                        <strong>{item.status}</strong>
                      </div>
                    </div>
                    <div>
                      {item.details} 
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Track