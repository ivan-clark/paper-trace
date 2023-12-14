import React, { useState } from "react";
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import MainLogo from "../assets/MainLogo.svg";
import Api from "../services/Api";
import Http from "../services/Http";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please fill in both fields.");
      return false;
    }

    setIsLoading(true);

    Api.login(username, password)
      .then((response) => {
        setIsLoading(false);
        if (!response.data.isError) {
          // reset storage
          localStorage.clear();
          delete Http.defaults.headers.Authorization;
          
          // reassign storage
          localStorage.setItem("token", response.data.data.token);
          Http.defaults.headers.Authorization = `Bearer ${response.data.data.token}`;
          
          // set logged in
          const userId = response.data.data.userId;
          const roleId = response.data.data.roleId;

          props.setIsLoggedIn(true);
          props.setUserId(userId);
          props.setRoleId(roleId);

          if (roleId === 1)
            navigate("users");
          else if (roleId === 2)
            navigate("inbox");
          else
            navigate("inbox");
          
        } else {
          setErrorMessage("Username or password is incorrect");
          return false;
        }
      })
      .catch(function (error) {
        console.error("Error during login:", error);
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  return (
    <form onSubmit={handleLogin}>
      <div id="form-container">
        <div id="form-wrapper">
          <div id="login-header">
            <img id="main-logo" alt="logo" src={MainLogo} />
            <span id="span1">Login to PaperTrace</span>
            <span id="span2">Use your <span id="span3">UCLM ID</span></span>
          </div>

          <div id="input-wrapper">
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div>
              {errorMessage && <div className="login-error">{errorMessage}</div>}
            </div>
          </div>
          <div id="button-link-wrapper">
          <Button
            disabled={isLoading}
            onClick={handleLogin}
            variant="contained"
            color="primary"
            id="login-button"
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
          </Button>
            <Link className="forgotPassLink" to="/forgot-password" >Forgot password?</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
