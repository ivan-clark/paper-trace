import { useNavigate } from "react-router-dom";
import Http from "../services/Http";

const Logout = (props) => {
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    
    delete Http.defaults.headers.Authorization
    
    props.setIsLoggedIn(false)

    navigate('/')
  }
  return {logout}
}

export default Logout