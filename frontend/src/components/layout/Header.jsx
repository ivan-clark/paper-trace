import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import React, {useState, useEffect, useRef} from "react";
import {styles} from '../common/styles'
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import MainLogo from "../../assets/MainLogo.svg";
import Http from "../../services/Http";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUsersPath = location.pathname.includes('/users')
  const iseDeptPath = location.pathname.includes('/departments')

  const [modal, setModal] = useState(false)
  const modalRef = useRef()

  const toggleModal = () => { 
    setModal(!modal);
  }

  const handleLogout = () => {
    localStorage.clear();
    props.setIsLoggedIn(false);
    delete Http.defaults.headers.Authorization;
    
    navigate("/");
  };

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setModal(false);
      } 
    }

    document.addEventListener("mousedown", handler)
    
    // detach event listener
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, [])

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
        {isUsersPath && (
          <div className='admin-add-user-or-dept'>
            <Link 
              to={'/users/add'}>
                <PersonAddIcon />
            </Link>
              <div className='tooltip'>
                <span>Add a new head</span>
              </div>
          </div>
        )}
          {iseDeptPath && (
            <div className='admin-add-user-or-dept'>
            <Link 
              to={'/departments/add'}>
                <DomainAddIcon />
            </Link>
              <div className='tooltip'>
                <span>Add new department</span>
              </div>
          </div>
          )}
        <div className='user-and-logout-section'>
        </div>
        <div onClick={toggleModal} ref={modalRef} id="account-initials">
          <div>
            <span>
              IC
            </span>
          </div>
        </div>
        {modal && (
        <div className='modal'>
          <div className="modal-wrapper">
            <div className="modal-header">
              <div div className="modal-profile">
                <AccountCircleIcon style={styles.largeIcon}/>
              </div>
              <div className='modal-name'>
                {`Hi Ivan`}
              </div>
              <div className='modal-role'>
                {`ADMIN`}
              </div>
              <div className='modal-dept'>
                {`ADMIN Department`}
              </div>
            </div>
            <div className='modal-btn-wrapper'>
              <div className='view-profile'>
                <div>
                  <AccountCircleIcon style={styles.smallIcon}/>
                </div>
                <div>
                  View profile
                </div>
              </div>
              <div onClick={handleLogout} className='logout'>
                <div>
                  <LogoutIcon style={styles.smallIcon}/>
                </div>
                <div>
                  Sign out
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Header;
