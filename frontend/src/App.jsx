import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.scss"
import Api from "./services/Api";
import Http from "./services/Http";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Sent from "./pages/Sent/Sent"
import Track from "./pages/Track/Track"
import Trash from "./pages/Trash/Trash"
import Inbox from "./pages/Inbox/Inbox"
import Admin from "./pages/Admin/Admin";
import Users from "./pages/Users/Users";
import Compose from "./pages/Compose/Compose"
import UsersAdd from "./pages/Users/UsersAdd"
import UsersEdit from "./pages/Users/UsersEdit"
import Declined from "./pages/Declined/Declined"
import Accepted from "./pages/Accepted/Accepted"
import Departments from "./pages/Departments/Departments";
import DepartmentAdd from "./pages/Departments/DepartmentsAdd"
import DepartmentEdit from "./pages/Departments/DepartmentsEdit"
import InboxViewUpcoming from "./pages/Inbox/InboxViewUpcoming";
import InboxViewOutgoing from "./pages/Inbox/InboxViewOutgoing";
import DocViewDocument from "./components/common/DocViewDocument";

const Protected = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(); 

  useEffect(() => {
    Api.validate().then((response) => {
      setIsLoggedIn(true);
      setUser(response.data.data);
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
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
        <Route element={<Protected isLoggedIn={isLoggedIn}><Main setIsLoggedIn={setIsLoggedIn} user={user}/></Protected>}>
          {user?.role.id !== 3 && ( 
            <>
              <Route path="users" element={<Users />} />
              <Route path="users/add" element={<UsersAdd />} />
              <Route path="users/edit/:id" element={<UsersEdit />} />
            </>
          )}
          {user?.role.id === 1 && (
            <>
              <Route path="admin" element={<Admin/>} />
              <Route path="departments" element={<Departments />} />
              <Route path="departments/add" element={<DepartmentAdd />} />
              <Route path="departments/edit/:id" element={<DepartmentEdit />} />
            </>
          )}
          {(user?.role.id !== 1) && (
            <>
              <Route path="track" element={<Track />} />
              <Route path="compose" element={<Compose user={user}/>} />
              <Route path="inbox" element={<Inbox user={user}/>} />
              <Route path="inbox/outgoing/:id" element={<InboxViewOutgoing user={user}/>} />
              <Route path="inbox/incoming/:id" element={<InboxViewUpcoming user={user}/>} />
              <Route path="sent" element={<Sent />} />
              <Route path="accepted-docs" element={<Accepted user={user}/>} />
              <Route path="accepted-docs/doc/:id" element={<DocViewDocument user={user}/>} />
              <Route path="declined-docs" element={<Declined user={user}/>} />
              <Route path="declined-docs/doc/:id" element={<DocViewDocument user={user}/>} />
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
