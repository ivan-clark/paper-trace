import axios from "axios";

class Http {
  static token = localStorage.getItem("token");

  static headers = {
    "Content-Type": "application/json",
    //"ngrok-skip-browser-warning": "true",
    ...(Http.token && { "Authorization": `Bearer ${Http.token}` }),
  };

  static instance = axios.create({
    baseURL: "https://localhost:32770/",
    headers: Http.headers
  });
}

export default Http.instance;