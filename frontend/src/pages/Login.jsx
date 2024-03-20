import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CircularProgress,TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import LoginLogo from "../assets/LoginLogo.png";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Link from "@mui/material/Link";
import Http from "../services/Http";
import Api from "../services/Api";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          const user = response.data.data.user;

          props.setIsLoggedIn(true);
          props.setUser(user);    

          if (user.role?.id === 1)
            navigate("users");
          else if (user.role?.id === 2)
            navigate("inbox");
          else
            navigate("inbox");
          
        } else {
          setErrorMessage("Username or password is incorrect");
          return false;
        } 
        console.log(response.data)
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
            <img draggable="false" id="main-logo" alt="logo" src={LoginLogo} />
            <span id="span1">Sign in</span>
            <span id="span2">to continue to PaperTrace</span>
          </div>

          <FormControl fullWidth sx={{ m: 1 }}>
            <FormControl className="input-form">
              <TextField
                sx={{ '& .MuiInputBase-root': { width: 330 } }}
                error={isLoading ? null : Boolean(errorMessage)}
                disabled={isLoading}
                fullWidth
                className="username-input"
                id="username"
                type="text"
                label="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // login using enter key
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                onClick={() => setErrorMessage(null)} 
                />

              <TextField
                error={isLoading ? null : Boolean(errorMessage)}
                disabled={isLoading}
                id="password"
                label="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // login using enter key  
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                onClick={() => setErrorMessage(null)}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: 
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>,
                }}
                />
              </FormControl>
              {isLoading ? null : errorMessage && <div className="login-error">{errorMessage}</div>}
          </FormControl>
          <div id="button-link-wrapper">
          <Button
            disabled={isLoading}
            onClick={handleLogin}
            variant="contained"
            color="primary"
            id="login-button"
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Login"}
          </Button>
            <Link className="forgotPassLink" to="/forgot-password" >Forgot password?</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
