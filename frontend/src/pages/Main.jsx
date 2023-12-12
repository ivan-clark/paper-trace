import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const Main = (props) => {
  return (
    <div className="main-wrapper">
      <div>
        <Header setIsLoggedIn={props.setIsLoggedIn} roleId={props.roleId}/>
      </div>
      <div className="sub-wrapper">
        <div className="sidebars">
          <Sidebar roleId={props.roleId} />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>

  );
}

export default Main;