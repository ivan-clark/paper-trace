using API.Models;
using API.Repositories;
using API.Repositories.Data;
using API.Utils;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using sib_api_v3_sdk.Model;

namespace API.Services
{
    public class RouteService
    {
        private readonly IRouteRepository _routeRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IStatusRepository _statusRepository;
        private readonly IDocumentRepository _documentRepository;
        private readonly IUserRepository _userRepository;
        private readonly TransactionService _transactionService;
        

        public RouteService(IRouteRepository routeRepository, ITransactionRepository transactionRepository, IDepartmentRepository departmentRepository, IUserRepository userRepository, IStatusRepository statusRepository, TransactionService transactionService, IDocumentRepository documentRepository)
        {
            _routeRepository = routeRepository;
            _transactionRepository = transactionRepository;
            _statusRepository = statusRepository;
            _departmentRepository = departmentRepository;
            _transactionService = transactionService;
            _userRepository = userRepository;
            _documentRepository = documentRepository;
        }

        public RouteModel GetRouteById(int id)
        {
            var route = _routeRepository.GetRouteById(id);

            return new RouteModel
            {
                Id = route?.Id ?? 0,
                UniId = route?.UniId,
                Transaction = _transactionService.GetTransactionById(route?.TransactionId ?? 0),
                RecepientId = _departmentRepository.GetDepartmentById(route?.RecepientId ?? 0),
                StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                RecievedBy = _userRepository.GetUserById(route?.RecievedBy ?? 0),
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
                    UniId = route.UniId,
                    Transaction = _transactionService.GetTransactionById(route.TransactionId ?? 0),
                    RecepientId = _departmentRepository.GetDepartmentById(route.RecepientId ?? 0),
                    StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                    RecievedBy = _userRepository.GetUserById(route?.RecievedBy ?? 0),
                    Note = route?.Note ?? "",
                    UpdatedDate = route?.UpdatedDate
                    
            });
            }
            result = result.OrderByDescending(r => r.UpdatedDate).ToList();

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
                        UniId = route.UniId,
                        Transaction = _transactionService.GetTransactionById(route.TransactionId ?? 0),
                        RecepientId = _departmentRepository.GetDepartmentById(route.RecepientId ?? 0),
                        StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                        RecievedBy = _userRepository.GetUserById(route?.RecievedBy ?? 0),
                        Note = route?.Note ?? "",
                        UpdatedDate = route?.UpdatedDate
                    });
                }
            }
            result = result.OrderByDescending(r => r.UpdatedDate).ToList();

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
                        Doctype = document?.Doctype,
                        CreatedDate = document?.CreatedDate,
                        Urgent = document?.Urgent
                    });
                }
            }
            result = result.OrderByDescending(r => r.CreatedDate).ToList();

            return result;
        }

        public List<RouteModel> GetAcceptedDocuments(int id)
        {
            var result = new List<RouteModel>();
            var routes = _routeRepository.GetRoutes();

            foreach (var route in routes)
            {
                if (route.RecievedBy == id)
                {
                    result.Add(new RouteModel
                    {
                        Id = route.Id,
                        UniId = route.UniId,
                        Transaction = _transactionService.GetTransactionById(route.TransactionId ?? 0),
                        RecepientId = _departmentRepository.GetDepartmentById(route.RecepientId ?? 0),
                        StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                        RecievedBy = _userRepository.GetUserById(route?.RecievedBy ?? 0),
                        Note = route?.Note ?? "",
                        UpdatedDate = route?.UpdatedDate
                    });
                }
            }
            result = result.OrderByDescending(r => r.UpdatedDate).ToList();

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

        public void ApproveDocument(int RouteId)
        {
            var routeModel = GetRouteById(RouteId);
            _routeRepository.ApproveDocument(routeModel);
        }

        public void TrashDocument(int RouteId) 
        {
            var routeModel = GetRouteById(RouteId);
            _routeRepository.ApproveDocument(routeModel);
        }

        public List<RouteModel> TrackingDocument(string uniId) 
        {
            var result = new List<RouteModel>();
            var routes = _routeRepository.GetRoutes();

            foreach (var route in routes)
            {
                if (route.UniId == uniId)
                {
                    result.Add(new RouteModel
                    {
                        Id = route.Id,
                        UniId = route.UniId,
                        Transaction = _transactionService.GetTransactionById(route.TransactionId ?? 0),
                        RecepientId = _departmentRepository.GetDepartmentById(route.RecepientId ?? 0),
                        StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
                        RecievedBy = _userRepository.GetUserById(route?.RecievedBy ?? 0),
                        Note = route?.Note ?? "",
                        UpdatedDate = route?.UpdatedDate
                    });
                }
            }

            return result;
        }

        public void MultipleCompose(DocumentModel documentModel, TransactionModel transactionModel, List<RouteModel> routeModel)
        {
            var newDocumentId = _documentRepository.CreateDocument(documentModel);
            transactionModel.Document = new DataAccess.Entities.Document { Id = newDocumentId };
            transactionModel.Status = new DataAccess.Entities.Status { Id = 1 };

            var newTransactionId = _transactionRepository.CreateTransaction(transactionModel);

            var docModel = _documentRepository.GetDocumentById(newDocumentId);
            var docsenderID = docModel?.SenderId;
            var SenderID = _userRepository.GetUserById(docsenderID ?? 0);
            var SenderDeptID = SenderID?.DepartmentId;
            var SenderDeptModel = _departmentRepository.GetDepartmentById(SenderDeptID ?? 0);
            var SenderDeptName = SenderDeptModel?.Name;
            var deptName = SenderDeptName ?? "";

            var ReturnedDocModel = _documentRepository.GetDocumentById(newDocumentId);
            var DocUrgency = ReturnedDocModel?.Urgent ?? false; 
            var DocType = ReturnedDocModel?.Doctype ?? false;
                           
            _routeRepository.CreateMultipleRoute(routeModel, deptName, newTransactionId, DocUrgency, DocType);
        }

        public List<ReportItemModel> GenerateReport(int id)
        {
            var allItems = new List<ReportItemModel>();

            var outgoingDocuments = GetOutgoing(id);
            foreach (var document in outgoingDocuments)
            {
                allItems.Add(new ReportItemModel { Document = document });
            }

            var incomingRoutes = GetIncoming(id);
            foreach (var route in incomingRoutes)
            {
                allItems.Add(new ReportItemModel { Route = route });
            }

            var acceptedDocuments = GetAcceptedDocuments(id);
            foreach (var route in acceptedDocuments)
            {
                allItems.Add(new ReportItemModel { Route = route });
            }

            return allItems;
        }
    }
}
