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

  static getUserById(id, controller) {
    return Http.get(`/api/User/GetUserById?id=${id}`, { signal: controller?.signal });
  }

  static createUser(model) {
    return Http.post("/api/User/CreateUser", model);
  }

  static deleteUser(model) {
    return Http.post("/api/User/DeleteUser", model);
  }

  static updateUser(model) {
    return Http.post("/api/User/UpdateUser", model);
  }

  static getDepartments(controller) {
    return Http.get("/api/Department/GetDepartments", { signal: controller?.signal });
  }

  static getDepartmentById(id, controller) {
    return Http.get(`/api/Department/GetUserById?id=${id}`, { signal: controller?.signal });
  }

  static createDepartment(model) {
    return Http.post("/api/Department/CreateDepartment", model);
  }

  static deleteDepartment(model) {
    return Http.post("/api/Department/DeleteDepartment", model);
  }

  static updateDepartment(model) {
    return Http.post("/api/Department/UpdateDepartment", model);
  }

  static getTransactions(senderId, recepientId, statusId, controller) {
    const params = new URLSearchParams();

    senderId && params.append('senderId', senderId);
    recepientId && params.append('recepientId', recepientId);
    statusId && params.append('statusId', statusId);
  
    const url = `/api/Transaction/GetTransactions?${params.toString()}`;

    return Http.get(url, { signal: controller?.signal });
  }

  static createTransaction(model) {
    return Http.post("/api/Transaction/CreateTransaction", model);
  }
}

export default Api;
