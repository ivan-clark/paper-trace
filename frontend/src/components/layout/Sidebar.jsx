import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

const Sidebar = (props) => {
  const location = useLocation();

  const navItems = [
    {
      title: "Home",
      path: "/admin",
      icon: <HomeOutlinedIcon />,
      activeIcon: <HomeIcon/>,
      cName: "sidebar-text"
    },
    ...(props.roleId !==3 ? [
      {
        title: "Users",
        path: "/users",
        icon: <PersonOutlineIcon/>,
        activeIcon: <PersonIcon/>,
        cName: "sidebar-text"
      }    
    ] : []),
    ...(props.roleId === 1 ? [
      {
        title: "Departments",
        path: "/departments",
        icon: <MeetingRoomOutlinedIcon/>,
        activeIcon: <MeetingRoomIcon/>,
        cName: "sidebar-text"
      }
    ] : [])
  ];

  const isActive = (item) => {
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  };

  return (
    <div id="sidebar">
      <div id="sidebar-wrapper">
        <ul>
          {navItems.map((item, index) =>
            <nav id="section-1" key={index}>
              <li>
                <NavLink to={item.path} id={item.cName}>
                  { isActive(item) ? item.activeIcon : item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            </nav>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
