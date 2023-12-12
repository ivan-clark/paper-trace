import Http from "./Http";

class Api {
  static login(username, password) {
    return Http.post("/api/Account/Login", {
      username: username,
      password: password
    });
  }

  static register(username, password) {
    return Http.post("/api/Account/Register", {
      username: username,
      password: password
    });
  }

  static validate() {
    return Http.post("/api/Account/Validate");
  }

  static getUsers(controller) {
    return Http.get("/api/User/GetUsers", { signal: controller?.signal });
  }

  static createUser(firstname, lastname) {
    return Http.post("/api/User/CreateUser", {
      firstname: firstname,
      lastname: lastname
    });
  }

  static getDepartments(controller) {
    return Http.get("/api/Department/GetDepartments", { signal: controller?.signal });
  }
}

export default Api;
