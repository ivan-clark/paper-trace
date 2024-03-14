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
        List<int> CreateMultipleRoute(List<RouteModel> models ,int transactionId);
        void UpdateRoute(RouteModel model);
        int GetMaxRouteId();
        void AcceptDocument(RouteModel model);
        void DeclineDocument(RouteModel model);
        void MultipleCompose(RouteModel model);
    }
}
