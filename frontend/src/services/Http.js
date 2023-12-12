import axios from "axios";

class Http {
  static token = localStorage.getItem("token");

  static headers = {
    "Content-Type": "application/json",
    ...(Http.token && { "Authorization": `Bearer ${Http.token}` }),
  };

  static instance = axios.create({
    baseURL: "https://papertrace-3c1u7kfw.b4a.run/",
    headers: Http.headers
  });
}

export default Http.instance;
