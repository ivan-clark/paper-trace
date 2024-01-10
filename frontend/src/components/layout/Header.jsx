import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import React, {useState} from "react";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HeaderLogo from "../../assets/HeaderLogo.svg";
import Http from "../../services/Http";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUsersPath = location.pathname.includes("/users")
  const isComposePath = location.pathname.includes("/compose")
  const isTrackPath = location.pathname.includes("/track")
  const iseDeptPath = location.pathname.includes("/departments")
  const isSentPath = location.pathname.includes("/sent")
  const isAcceptedPath = location.pathname.includes("/accepted")
  const isDeclinedPath = location.pathname.includes("/declined")
  const isTrashPath = location.pathname.includes("/trash")


  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear();
    props.setIsLoggedIn(false);
    delete Http.defaults.headers.Authorization;
    
    navigate("/");
  };

  return (
    <div id="header">
      <div id="left-and-middle">
        <div id="left-section">
          <div id="left-wrapper">
            <div id="burger">
              <MenuIcon />
            </div>
            <div>
              <Link to="/inbox">
                <img id="main-logo" src={HeaderLogo} alt="logo" />
              </Link>
            </div>
          </div>
        </div>
        <div id="middle-section">
          <form id="search-form" role="search">
          {isComposePath ? (
          <>
            <input
              disabled={true}
              type="text"
            />
            <button disabled={true}><SearchIcon /></button>
          </>
          ) : isTrackPath ? (
          <>
            <input
              hidden={true}
              type="text"
            />
            <button hidden={true}><SearchIcon /></button>
          </>
          ) : (
            <>
              <input
                type="text"
                placeholder={isSentPath ? "in:sent" 
                            : isAcceptedPath ? "in:accepted" 
                            : isDeclinedPath ? "in:declined" 
                            : isTrashPath ? "in:trash" 
                            : "Search inbox"}
              />
              <button><SearchIcon /></button>
            </>
          )}
          </form>
        </div>
      </div>
      <div id="right-section">
        {isUsersPath && (
          <div className="admin-add-user-or-dept">
            <Link 
              to={"/users/add"}>
                <PersonAddIcon />
            </Link>
              <div className="tooltip">
                <span>Add a new head</span>
              </div>
          </div>
        )}
          {iseDeptPath && (
            <div className="admin-add-user-or-dept">
            <Link 
              to={"/departments/add"}>
                <DomainAddIcon />
            </Link>
              <div className="tooltip">
                <span>Add new department</span>
              </div>
          </div>
          )}
        <div className="user-and-logout-section">
        </div>
        <div onClick={() => {setOpen(!open)}} id="account-initials">
          <div>
            <span>
              {`${props.user.firstName.charAt(0).toUpperCase()}${props.user.lastName.charAt(0).toUpperCase()}`}
            </span>
          </div>
        </div>
        {open && (
         <div className="modal">
          <div className="modal-wrapper">
            <div className="modal-header">
              <div className="modal-profile">
                <AccountCircleIcon style={{width: 50, height: 50, color: 'gray'}}/>
              </div>
              <div className="modal-profile-info">
                <div className="modal-and-role">
                  <div className="modal-role">
                    {`${props.user.role.name.toUpperCase()}`}
                  </div>
                  <div className="modal-name">
                    {`Hi ${props.user.firstName}!`}
                  </div>
                  <div className="modal-dept">
                    {`${props.user.department.name} Department`}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-btn-wrapper">
              <div className="view-profile">
                <div>
                  <AccountCircleIcon style={{color: 'gray'}}/>
                </div>
                <div>
                  View profile
                </div>
              </div>
              <div onClick={() => handleLogout()} className="logout">
                <div>
                  <LogoutIcon style={{color: 'gray'}}/>
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
