﻿using API.Models;
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

        public void CreateRoute(RouteModel model)
        {
            var route = new Route
            {
                TransactionId = model.Transaction?.Id,
                RecepientId = model.RecepientId?.Id,
                StatusId = model.StatusId?.Id,
                UpdatedDate = DateTime.Now
            };

            _dbcontext.Routes.Add(route);
            _dbcontext.SaveChanges();

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

    }
}