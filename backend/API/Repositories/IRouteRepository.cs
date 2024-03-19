using API.Models;
using DataAccess.Entities;
using Route = DataAccess.Entities.Route;

namespace API.Repositories
{
    public interface IRouteRepository
    {
        Route? GetRouteById(int id);
        List<Route> GetRoutes();
        void DeleteRoute(int routeId);
        int CreateRoute(RouteModel model);
        List<int> CreateMultipleRoute(List<RouteModel> models, string deptName, int transactionId, bool urgency, bool doctype);
        void UpdateRoute(RouteModel model);
        int GetMaxRouteId();
        void AcceptDocument(RouteModel model, int recievebyId);
        void DeclineDocument(RouteModel model, int recievebyId, string note);
        void ApproveDocument(RouteModel model, int recievebyId);
        void TrashDocument(RouteModel model);
        string UniqueIdGenerator(string DeptName, bool Urgency, bool docType);
        List<Route>? GetRouteByTransactionId(int id);
    }
}
