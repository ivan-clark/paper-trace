import axios from "axios";

class Http {
  static token = localStorage.getItem("token");

  static headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...(Http.token && { "Authorization": `Bearer ${Http.token}` }),
  };

  static instance = axios.create({
    //baseURL: "https://test1-d0ztmbdg.b4a.run/",
    baseURL: "https://9976-155-137-107-21.ngrok-free.app/",
    headers: Http.headers
  });
}

export default Http.instance; 