import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import MainLogo from "../../assets/MainLogo.svg";

const Header = (props) => {
  return (
    <div id="header">
      <div id="left-and-middle">
        <div id="left-section">
          <div id="left-wrapper">
            <Link to='/admin'>
              <img id='main-logo' src={MainLogo} alt="logo" />
            </Link>
          </div>
        </div>
        <div id="middle-section">
          <form id='search-form' role='search'>
            <input type="text" placeholder='Search inbox' />
            <button><SearchIcon/></button>
          </form>
        </div>
      </div>
      <div id="right-section">
        <div className='user-and-logout-section'>
        </div>
        <div onClick={()=>{}} ref={null} id="account-initials">
          <div>
            <span>
              Ivan Clark
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
