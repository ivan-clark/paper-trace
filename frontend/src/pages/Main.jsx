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
        <Header setIsLoggedIn={props.setIsLoggedIn} user={props.user}/>
      </div>
      <div className="sub-wrapper">
        <div className="sidebars">
          <Sidebar roleId={props.user.role.id} />
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