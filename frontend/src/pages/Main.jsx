import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const Main = (props) => {
  const location = useLocation()

  const isComposePath = location.pathname.includes('/compose')

  return (
    <div className="main-wrapper">
      <div>
        <Header setIsLoggedIn={props.setIsLoggedIn} roleId={props.roleId}/>
      </div>
      <div className="sub-wrapper">
        <div className="sidebars">
          <Sidebar roleId={props.roleId} />
        </div>
        {isComposePath ? (
          <Outlet />
          ) : (
          <div className="content">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;