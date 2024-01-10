import { TextField, Button, InputAdornment  } from "@mui/material";
import Documents from "../../assets/Documents.svg"
import SearchIcon from "@mui/icons-material/Search";
import React from "react"
import "./_track.scss"

function Track() {
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
    </div>
  )
}

export default Track