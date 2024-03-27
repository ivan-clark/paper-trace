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
    return Http.get(`/api/User/GetUserById?id=${id}`, { signal: controller?.signal })
  }

  static getUsersByIds(ids) {
    const string = ids.map(id => `ids=${id}`).join("&")
    return Http.get(`/api/User/GetUsersByIds?${string}&`)
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
    return Http.get(`/api/Route/GetIncoming?id=${recipientId}`)
  }

  static getOutGoingImproved(senderId) {
    return Http.get(`/api/Route/GetOutgoingImproved?senderId=${senderId}`)
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

  static declineDocument(RouteId, recievebyId, note) {
    return Http.post(`/api/Route/DeclineDocument?RouteId=${RouteId}&recievebyId=${recievebyId}&note=${note}`, {
      RouteId: RouteId, 
      recievebyId: recievebyId, 
      note: note,
    })
  }

  static getAcceptedDocs(id) {
    return Http.get(`/api/Route/GetAcceptedDocuments?id=${id}`)
  }

  static getDeclinedDocs(routeId) {
    return Http.get(`/api/Route/GetDeclineDocuments?routeId=${routeId}`)
  }

  static trackDocument(uniId) {
    return Http.get(`/api/Route/TrackingDocument?uniId=${uniId}`)
  }

  static getSentDocs(senderId) {
    return Http.get(`/api/Route/GetSentDocuments?senderId=${senderId}`)
  }

  static trashDocument(RouteId) {
    return Http.post(`/api/Route/TrashDocument?RouteId=${RouteId}`)
  }

  static getTrashDocuments(userId) {
    return Http.get(`/api/Route/GetTrashDocuments?userId=${userId}`)
  }

  static readDocument(RouteId) {
    return Http.post(`/api/Route/ReadDocument?RouteId=${RouteId}`)
  }
} 
  
export default Api;
