import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendIcon from "@mui/icons-material/Send";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CreateIcon from "@mui/icons-material/Create";

const Sidebar = (props) => {
  const location = useLocation();

  const navItems = [
    ...(props.roleId === 2 || props.roleId === 3 ? [
      {
        title: "Track",
        path: "/track",
        icon: <FindInPageOutlinedIcon/>,
        activeIcon: <FindInPageIcon/>,
        cName: "sidebar-text"
      },
      {
        title: "Compose",
        path: "/compose",
        icon: <CreateOutlinedIcon/>,
        activeIcon: <CreateIcon/>,
        cName: "sidebar-text"
      },
      {
        cName: "sidebar-divider"
      },
      {
        title: "Mailbox",
        path: "/inbox",
        icon: <InboxOutlinedIcon />,
        activeIcon: <InboxIcon />,
        cName: "sidebar-text"
      },
      {
        title: "Sent",
        path: "/sent",
        icon: <SendOutlinedIcon />,
        activeIcon: <SendIcon />,
        cName: "sidebar-text"
      },
      {
        title: "Accepted",
        path: "/accepted-docs",
        icon: <CheckCircleOutlineOutlinedIcon />,
        activeIcon: <CheckCircleIcon />,
        cName: "sidebar-text"
      },
      {
        title: "Declined",
        path: "/declined-docs",
        icon: <DoDisturbOnOutlinedIcon />,
        activeIcon: <DoDisturbOnIcon />,
        cName: "sidebar-text"
      },
      {
        title: "Trash",
        path: "/trash",
        icon: <DeleteOutlineOutlinedIcon />,
        activeIcon: <DeleteRoundedIcon />,
        cName: "sidebar-text"
      },
    ] : []),
    ...(props.roleId === 1 ? [
      {
        title: "Home",
        path: "/admin",
        icon: <HomeOutlinedIcon />,
        activeIcon: <HomeIcon/>,
        cName: "sidebar-text"
      },
    ] : []),
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
    ] : []),
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
