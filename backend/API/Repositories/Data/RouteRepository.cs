using API.Models;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Route = DataAccess.Entities.Route;

namespace API.Repositories.Data
{
    public class RouteRepository :IRouteRepository
    {
        private readonly PapertracedbContext _dbcontext;
        public RouteRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public Route? GetRouteById(int id)
        {
            return _dbcontext.Routes.FirstOrDefault(u => u.Id == id);
        }

        public int CreateRoute(RouteModel model)
        {
            var route = new Route
            {
                TransactionId = model.Transaction?.Id,
                RecepientId = model.RecepientId?.Id,
                StatusId = model.StatusId?.Id,
                UpdatedDate = DateTime.Now
            };

            var result = _dbcontext.Routes.Add(route);
            _dbcontext.SaveChanges();

            return result.Entity.Id;
        }

        public List<Route> GetRoutes()
        {
            return _dbcontext.Routes.ToList();
        }

        public void DeleteRoute(int routeId)
        {
            var route = new Route { Id = routeId };

            _dbcontext.Routes.Attach(route);
            _dbcontext.Routes.Remove(route);
            _dbcontext.SaveChanges();
        }

        public void UpdateRoute(RouteModel model) 
        {
            var route = _dbcontext.Routes.SingleOrDefault(u => u.Id == model.Id);

            if (route != null)
            {

                route.TransactionId = model.Transaction?.Id;
                route.RecepientId = model.RecepientId?.Id;
                route.StatusId = model.StatusId?.Id;
                route.UpdatedDate = model.UpdatedDate;

                _dbcontext.SaveChanges();
            }

        }

        public int GetMaxRouteId()
        {
            int maxRouteId = _dbcontext.Routes.Max(t => t.Id);

            return maxRouteId;
        }

        public void AcceptDocument(RouteModel model) 
        {
            var route = _dbcontext.Routes.SingleOrDefault(u => u.Id == model.Id);

            if (route != null)
            {
                if (model.Transaction != null)
                    route.TransactionId = model.Transaction.Id;

                if (model.RecepientId != null)
                    route.RecepientId = model.RecepientId.Id;

                if (model.StatusId != null)
                    route.StatusId = 2;

                route.UpdatedDate = model.UpdatedDate;

                _dbcontext.SaveChanges();
            }
        }

        public void DeclineDocument(RouteModel model)
        {
            var route = _dbcontext.Routes.SingleOrDefault(u => u.Id == model.Id);

            if (route != null)
            {
                if (model.Transaction != null)
                    route.TransactionId = model.Transaction.Id;

                if (model.RecepientId != null)
                    route.RecepientId = model.RecepientId.Id;

                if (model.StatusId != null)
                    route.StatusId = 3;

                route.UpdatedDate = model.UpdatedDate;

                _dbcontext.SaveChanges();
            }
        }
    }
}
