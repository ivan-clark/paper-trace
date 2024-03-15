using API.Models;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using sib_api_v3_sdk.Model;
using Route = DataAccess.Entities.Route;

namespace API.Repositories.Data
{
    public class RouteRepository :IRouteRepository
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly PapertracedbContext _dbcontext;
        public RouteRepository(PapertracedbContext dbcontext, IDepartmentRepository departmentRepository)
        {
            _dbcontext = dbcontext;
            _departmentRepository = departmentRepository;
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
                UniId = model?.UniId,
                RecepientId = model?.RecepientId?.Id,
                RecievedBy = model?.RecievedBy?.Id,
                StatusId = model?.StatusId?.Id,
                UpdatedDate = DateTime.Now,
                Note = model?.Note
            };

            var result = _dbcontext.Routes.Add(route);
            _dbcontext.SaveChanges();

            return result.Entity.Id;
        }

        public List<int> CreateMultipleRoute(List<RouteModel> models, string deptName, int transactionId, bool urgency, bool doctype)
        {
            List<int> createdRouteIds = new List<int>();
            
            foreach (var model in models)
            {
                var uniId = UniqueIdGenerator(deptName, urgency,doctype);
                var route = new Route
                {
                    TransactionId = transactionId,
                    UniId = uniId,
                    RecepientId = model.RecepientId?.Id,
                    RecievedBy = model.RecievedBy?.Id,
                    StatusId = 1,
                    Note = model.Note,
                    UpdatedDate = DateTime.Now   
                };

                var result = _dbcontext.Routes.Add(route);
                _dbcontext.SaveChanges();

                createdRouteIds.Add(route.Id);
            }

            return createdRouteIds;
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

                if (model.Note != null)
                    route.Note = "Your Document Has Been Accepted";

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

                if (model.Note != null)
                    route.Note = model.Note;

                route.UpdatedDate = model.UpdatedDate;

                _dbcontext.SaveChanges();
            }
        }

        public void ApproveDocument(RouteModel model) 
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

                if (model.Note != null)
                    route.Note = "Your Document Has Been Approved";

                route.UpdatedDate = model.UpdatedDate;

                _dbcontext.SaveChanges();
            }
        }

        public string UniqueIdGenerator(string DeptName, bool Urgency, bool docType)
        {
            string newDeptName = DeptName.Substring(0, Math.Min(DeptName.Length, 3)).ToUpper();

            int newUrgency = Urgency ? 1 : 0;
            int newdocType = docType ? 1 : 0;

            var dateNow = DateTime.Now.ToString("MMddyyHH");

            var uniId = newDeptName + dateNow + newUrgency + newdocType;

            return uniId;
        }
    }
}
