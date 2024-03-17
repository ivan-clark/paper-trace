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
  
  static createDocument(model) {
    return Http.post("/api/Document/CreateDocument", model);
  }

  static multipleCompose(model) {
    return Http.post("/api/Route/MulitipleCompose", model)
  }
  
  static getDocuments(senderId, recepientId, statusId, controller) {
    const params = new URLSearchParams();

    senderId && params.append("senderId", senderId);
    recepientId && params.append("recepientId", recepientId);
    statusId && params.append("statusId", statusId);
  
    const url = `/api/Document/GetDocuments?${params.toString()}`;

    return Http.get(url, { signal: controller?.signal });
  }

  static getDocumentById(id, controller) {
    return Http.get(`/api/Document/GetDocumentById?id=${id}`, { signal: controller?.signal });
  }

  static getRoutes(controller) {
    return Http.get("api/Route/GetRoutes", {signal: controller?.signal})
  }

  static createRoute(model) {
    return Http.post("/api/Route/CreateRoute", model)
  }

  static getIncoming(recipientId) { 
    return Http.get(`/api/Route/GetIncoming?id=${recipientId}`, )
  }

  static getOutgoing(senderId) {
    return Http.get(`/api/Route/GetOutgoing?id=${senderId}`)
  }
  
  static getTransactionById(id, controller) {
    return Http.get(`/api/Transaction/GetTransactionById?id=${id}`, {signal: controller?.signal});
  }

  static getTransactions(controller) {
    return Http.get(`api/Transaction/GetTransactions`, {signal: controller?.signal});
  }

  static getRouteById(id, controller) {
    return Http.get(`api/Route/GetRouteById?id=${id}`, {signal: controller?.signal},)
  }

  static acceptDocument(RouteId, recievebyId) {
    return Http.post(`/api/Route/AcceptDocument?RouteId=${RouteId}&recievebyId=${recievebyId}`, {
      RouteId: RouteId, 
      recievebyId: recievebyId
    })
  }
} 
  
export default Api;
