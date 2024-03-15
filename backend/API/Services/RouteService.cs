using API.Models;
using API.Repositories;
using API.Repositories.Data;
using API.Utils;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Services
{
    public class RouteService
    {
        private readonly IRouteRepository _routeRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IStatusRepository _statusRepository;
        private readonly TransactionService _transactionService;
        private readonly IDocumentRepository _documentRepository;

        public RouteService(IRouteRepository routeRepository, ITransactionRepository transactionRepository, IDepartmentRepository departmentRepository, IStatusRepository statusRepository, TransactionService transactionService, IDocumentRepository documentRepository)
        {
            _routeRepository = routeRepository;
            _transactionRepository = transactionRepository;
            _statusRepository = statusRepository;
            _departmentRepository = departmentRepository;
            _transactionService = transactionService;
            _documentRepository = documentRepository;
        }

        public RouteModel GetRouteById(int id)
        {
            var route = _routeRepository.GetRouteById(id);

            return new RouteModel
            {
                Id = route?.Id ?? 0,
                Transaction = _transactionService.GetTransactionById(route?.TransactionId ?? 0),
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
                    Transaction = _transactionService.GetTransactionById(route.TransactionId ?? 0),
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

        public List<RouteModel> GetIncoming(int id)
        {
            var result = new List<RouteModel>();
            var routes = _routeRepository.GetRoutes();

            foreach (var route in routes)
            {
                if (route.RecepientId == id)
                {
                    result.Add(new RouteModel
                    {
                        Id = route.Id,
                        Transaction = _transactionService.GetTransactionById(route.TransactionId ?? 0),
                        RecepientId = _departmentRepository.GetDepartmentById(route.RecepientId ?? 0),
                        StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                        UpdatedDate = route?.UpdatedDate
                    });
                }
            }

            return result;
        }

        public List<DocumentModel> GetOutgoing(int id)
        {
            var result = new List<DocumentModel>();
            var documents = _documentRepository.GetDocuments();

            foreach (var document in documents)
            {
                if (document.SenderId == id)
                {
                    result.Add(new DocumentModel
                    {
                        Id = document.Id,
                        SenderId = _departmentRepository.GetDepartmentById(document?.SenderId ?? 0),
                        Subject = document?.Subject,
                        Description = document?.Description,
                        Urgent = document?.Urgent
                    });
                }
            }

            return result;
        }

        public void ForTestingDeleteRoute()
        {
            var maxRouteId = _routeRepository.GetMaxRouteId();
            for (int i = 0; i < maxRouteId; i++)
            {
                _routeRepository.DeleteRoute(i);
            }
        }
        
        public void CreateUserTransmittal(DocumentModel documentModel,TransactionModel transactionModel, RouteModel routeModel)
        {
            var newDocumentId = _documentRepository.CreateDocument(documentModel);
            transactionModel.Document = new DataAccess.Entities.Document { Id = newDocumentId };
            transactionModel.Status = new DataAccess.Entities.Status { Id = 1 };

            var newTransactionId = _transactionRepository.CreateTransaction(transactionModel);
            routeModel.Transaction = new API.Models.TransactionModel{ Id = newTransactionId };       
            routeModel.StatusId = new DataAccess.Entities.Status { Id = 1 };

            _routeRepository.CreateRoute(routeModel);         
        }

        public void AcceptDocument(int RouteId) 
        {
            var routeModel = GetRouteById(RouteId);
            _routeRepository.AcceptDocument(routeModel);
        }

        public void DeclineDocument(int RouteId)
        {
            var routeModel = GetRouteById(RouteId);
            _routeRepository.DeclineDocument(routeModel);
        }

        public void MultipleCompose(DocumentModel documentModel, TransactionModel transactionModel, List<RouteModel> routeModel)
        {
            var newDocumentId = _documentRepository.CreateDocument(documentModel);
            transactionModel.Document = new DataAccess.Entities.Document { Id = newDocumentId };
            transactionModel.Status = new DataAccess.Entities.Status { Id = 1 };

            var newTransactionId = _transactionRepository.CreateTransaction(transactionModel);
            var ReturnedDocModel= _documentRepository.GetDocumentById(newDocumentId);
            var DocUrgency = ReturnedDocModel?.Urgent; 
            var DocType = ReturnedDocModel?.Doctype;
            
                
           // _routeRepository.CreateMultipleRoute(routeModel, newTransactionId, DocUrgency, DocType);
        }
    }
}
