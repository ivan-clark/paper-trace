import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Api from "./services/Api";
import Http from "./services/Http";
import Admin from "./pages/Admin";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Users from "./pages/Users";
import UsersAdd from './components/layout/Admin/UsersAdd'
import UsersEdit from './components/layout/Admin/UsersEdit'
import Departments from "./pages/Departments";
import DepartmentAdd from './components/layout/Admin/DepartmentAdd'
import DepartmentEdit from './components/layout/Admin/DepartmentEdit'

const Protected = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Api.validate().then(() => {
      setIsLoggedIn(true);
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
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route element={<Protected isLoggedIn={isLoggedIn}><Main setIsLoggedIn={setIsLoggedIn} /></Protected>}>
          <Route path="admin" element={<Admin/>} />
          <Route path="users" element={<Users/>} />
          <Route path="users/add" element={<UsersAdd/>} />
          {/* need to add /:id for edit */}
          <Route path="users/edit/" element={<UsersEdit/>} />
          <Route path="departments" element={<Departments/>} />
          <Route path="departments/add" element={<DepartmentAdd/>} />
          {/* need to add /:id for edit */}
          <Route path="departments/edit/" element={<DepartmentEdit/>} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
