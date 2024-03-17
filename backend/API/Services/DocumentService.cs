using API.Models;
using API.Repositories;
using API.Repositories.Data;
using DataAccess.Entities;

namespace API.Services
{
    public class DocumentService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly DocumentService _documentService;
        private readonly IDepartmentRepository _departmentRepository;

        public DocumentService(IDocumentRepository documentRepository, IDepartmentRepository departmentRepository, DocumentService documentService)
        {
            _documentRepository = documentRepository;
            _documentService = documentService;
            _departmentRepository = departmentRepository;         
        }

        public DocumentModel GetDocumentById(int id)
        {
            var document = _documentRepository.GetDocumentById(id);

            return new DocumentModel
            {
                Id = document?.Id ?? 0,
                SenderId = _departmentRepository.GetDepartmentById(document?.SenderId ?? 0),
                Subject = document?.Subject,
                Description = document?.Description,
                Doctype = document?.Doctype,
                CreatedDate = document?.CreatedDate,
                Urgent = document?.Urgent
            };
        }

        public List<DocumentModel> GetDocuments()
        {
            var result = new List<DocumentModel>();
            var documents = _documentRepository.GetDocuments();

            foreach (var document in documents)
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

            return result;
        }

        public void CreateDocument(DocumentModel model)
        {
            _documentRepository.CreateDocument(model);
        }

        public void DeleteDocument(int documentId)
        {
            _documentRepository.DeleteDocument(documentId);
        }

        public void UpdateDocument(DocumentModel model)
        {
            _documentRepository.UpdateDocument(model);
        }

        public void ForTestingDeleteDocument()
        {
            var maxDocumentId = _documentRepository.GetMaxDocumentId();
            for (int i = 0; i < maxDocumentId; i++)
            {
                _documentRepository.DeleteDocument(i);
            }
        }

        public List<DocumentModel> GetDocumentBySubjectBackEnd(string subject)
        {
            var documents = _documentRepository.GetDocumentBySubjectBackEnd(subject);
            var documentModels = new List<DocumentModel>();

            foreach (var document in documents)
            {
                var documentModel = new DocumentModel
                {
                    Id = document?.Id ?? 0,
                    SenderId = _departmentRepository.GetDepartmentById(document?.SenderId ?? 0),
                    Subject = document?.Subject,
                    Description = document?.Description,
                    Doctype = document?.Doctype,
                    CreatedDate = document?.CreatedDate,
                    Urgent = document?.Urgent
                };
                documentModels.Add(documentModel);
            }
            return documentModels;
        }

        //public List<SubjectDocumentModel> GetDocumentsBySubjects(string docsubject)
        //{
        //    var documents = _documentRepository.GetDocumentsBySubjects(docsubject);
        //    var wholeTransactions = new List<SubjectDocumentModel>();

        //    foreach (var document in documents)
        //    {
        //        var wholeTransaction = new SubjectDocumentModel();

        //        var documentModel = new DocumentModel
        //        {
        //            Id = document?.Id ?? 0,
        //            SenderId = _departmentRepository.GetDepartmentById(document?.SenderId ?? 0),
        //            Subject = document?.Subject,
        //            Description = document?.Description,
        //            Doctype = document?.Doctype,
        //            CreatedDate = document?.CreatedDate,
        //            Urgent = document?.Urgent
        //        };

        //        var transaction = new TransactionModel
        //        {
        //            Id = transaction?.Id ?? 0,
        //            Restricted = transaction?.Restricted ?? false,
        //            Document = _documentRepository.GetDocumentById(transaction?.DocumentId ?? 0),
        //            Status = _statusRepository.GetStatusById(transaction?.StatusId ?? 0),
        //            CreatedDate = transaction?.CreatedDate
        //        };

        //        var route = new RouteModel
        //        {
        //            Id = route?.Id ?? 0,
        //            UniId = route?.UniId,
        //            Transaction = _transactionService.GetTransactionById(route?.TransactionId ?? 0),
        //            RecepientId = _departmentRepository.GetDepartmentById(route?.RecepientId ?? 0),
        //            StatusId = _statusRepository.GetStatusById(route?.StatusId ?? 0),
        //            RecievedBy = _userRepository.GetUserById(route?.RecievedBy ?? 0),
        //            UpdatedDate = route?.UpdatedDate
        //        };

        //        wholeTransaction.DocumentModel = documentModel;
        //        wholeTransaction.TransactionModel = transaction;
        //        wholeTransaction.RouteModel = route;

        //        wholeTransactions.Add(wholeTransaction);
        //    }

        //    return wholeTransactions;
        //}
    }
}
