using API.Models;
using API.Repositories;
using API.Repositories.Data;
using DataAccess.Entities;

namespace API.Services
{
    public class RouteService
    {
        private readonly IRouteRepository _routeRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IStatusRepository _statusRepository;
       
        public RouteService(IRouteRepository routeRepository, ITransactionRepository transactionRepository, IDepartmentRepository departmentRepository, IStatusRepository statusRepository)
        {
            _routeRepository = routeRepository;
            _transactionRepository = transactionRepository;
            _statusRepository = statusRepository;
            _departmentRepository = departmentRepository;
        }

        public RouteModel GetRouteById(int id)
        {
            var route = _routeRepository.GetRouteById(id);

            return new RouteModel
            {
                Id = route?.Id ?? 0,
                TransactionId = _transactionRepository.GetTransactionById(route?.TransactionId ?? 0),
                RecepientId = _departmentRepository.GetDepartmentById(route?.RecepientId ?? 0),
                StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                UpdatedDate = route?.UpdatedDate
            };
        }

        public List<RouteModel> GetRoutes()
        {
            var result = new List<RouteModel>();
            var routes = _routeRepository.GetRoutes();

            foreach (var route in routes)
            {
                result.Add(new RouteModel
                {
                    Id = route.Id,
                    TransactionId = _transactionRepository.GetTransactionById(route.TransactionId ?? 0),
                    RecepientId = _departmentRepository.GetDepartmentById(route.RecepientId ?? 0),
                    StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                    UpdatedDate = route?.UpdatedDate
                });
            }

            return result;
        }

        public void CreateRoute(RouteModel model)
        {
            model.StatusId = new DataAccess.Entities.Status { Id = 1 };
            _routeRepository.CreateRoute(model);
        }

        public void DeleteRoute(int routeId)
        {
            _routeRepository.DeleteRoute(routeId);
        }

        public void UpdateRoute(RouteModel model)
        {
            _routeRepository.UpdateRoute(model);
        }
    }
}
