import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './index.scss'
import Api from "./services/Api";
import Http from "./services/Http";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Sent from './pages/Sent/Sent'
import Track from './pages/Track/Track'
import Trash from './pages/Trash/Trash'
import Inbox from './pages/Inbox/Inbox'
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import Compose from './pages/Compose/Compose'
import UsersAdd from './pages/Users/UsersAdd'
import UsersEdit from './pages/Users/UsersEdit'
import Declined from './pages/Declined/Declined'
import Accepted from './pages/Accepted/Accepted'
import Departments from "./pages/Departments/Departments";
import DepartmentAdd from './pages/Departments/DepartmentsAdd'
import DepartmentEdit from './pages/Departments/DepartmentsEdit'

const Protected = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [roleId, setRoleId] = useState();

  useEffect(() => {
    Api.validate().then((response) => {
      setIsLoggedIn(true);
      setUserId(response.data.data.userId);
      setRoleId(response.data.data.roleId);
      setIsLoading(false);
    }).catch(() => {
      setIsLoggedIn(false);
      setIsLoading(false);
      localStorage.clear();
      delete Http.defaults.headers.Authorization;
    })
  }, []);

  return (
    !isLoading &&
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} setRoleId={setRoleId}/>} />
        <Route element={<Protected isLoggedIn={isLoggedIn}><Main setIsLoggedIn={setIsLoggedIn} roleId={roleId} /></Protected>}>
          {roleId !== 3 && (
            <>
              <Route path="users" element={<Users />} />
              <Route path="users/add" element={<UsersAdd />} />
              <Route path="users/edit/:id" element={<UsersEdit />} />
            </>
          )}
          {roleId === 1 && (
            <>
              <Route path="admin" element={<Admin/>} />
              <Route path="departments" element={<Departments />} />
              <Route path="departments/add" element={<DepartmentAdd />} />
              <Route path="departments/edit/:id" element={<DepartmentEdit />} />
            </>
          )}
          {(roleId === 2 || roleId == 3) && (
            <>
              <Route path="track" element={<Track />} />
              <Route path="compose" element={<Compose />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="sent" element={<Sent />} />
              <Route path="accepted-docs" element={<Accepted />} />
              <Route path="declined-docs" element={<Declined />} />
              <Route path="trash" element={<Trash />} />
              
            </>
          )}
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
