using API.Models;
using API.Services;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly PapertracedbContext _dbcontext;
        private readonly ITransactionRepository _transactionRepository;
        private readonly TransactionService _transactionService;
        private readonly RouteService _routeService;
        private readonly DocumentService _documentService;

        public DocumentRepository(PapertracedbContext dbcontext, ITransactionRepository transactionRepository, TransactionService transactionService, RouteService routeService, DocumentService documentService)
        {
            _dbcontext = dbcontext;
            _transactionRepository = transactionRepository;
            _transactionService = transactionService;
            _routeService = routeService;
            _documentService = documentService;
        }

        public Document? GetDocumentById(int id)
        {
            return _dbcontext.Documents.FirstOrDefault(u => u.Id == id);
        }

        public List<Document> GetDocuments()
        {
            return _dbcontext.Documents.ToList();
        }

        public void DeleteDocument(int statusId)
        {
            var document = new Document { Id = statusId };

            _dbcontext.Documents.Attach(document);
            _dbcontext.Documents.Remove(document);
            _dbcontext.SaveChanges();
        }

        public int CreateDocument(DocumentModel model)
        {
            var document = new Document
            {
                SenderId = model.SenderId?.Id,
                Subject = model.Subject,
                Description = model.Description,
                Doctype = model.Doctype,
                CreatedDate = DateTime.Now,
                Urgent = model.Urgent
            };

            var result = _dbcontext.Documents.Add(document);
            _dbcontext.SaveChanges();

            return result.Entity.Id;
        }

        public void UpdateDocument(DocumentModel model)
        {
            var document = _dbcontext.Documents.SingleOrDefault(u => u.Id == model.Id);

            if (document != null)
            {
                document.SenderId = model.SenderId?.Id;
                document.Subject = model.Subject;
                document.Description = model.Description;
                document.Doctype = model.Doctype;
                document.Urgent = model.Urgent;

                _dbcontext.SaveChanges();
            }
        }

        public int GetMaxDocumentId()
        {
            int maxDocumentId = _dbcontext.Documents.Max(t => t.Id);

            return maxDocumentId;
        }

        public Document? GetDocumentBySubject(string subject)
        {
            return _dbcontext.Documents.FirstOrDefault(u => u.Subject == subject);
        }

        public List<Document> GetDocumentBySubjectBackEnd(string subject) 
        {
            return _dbcontext.Documents.Where(d => d.Subject.StartsWith(subject)).ToList();
        }

        public List<SubjectDocumentModel> GetDocumentsBySubjects(string docsubject)
        {
            var allItems = new List<SubjectDocumentModel>();

            var subjects = _documentService.GetDocumentBySubjectBackEnd(docsubject);

            foreach (var subject in subjects)
            {
                allItems.Add(new SubjectDocumentModel { DocumentModel = subject});
                var tempTransaction = _transactionService.GetTransactionByDocumentId(subject.Id);
                allItems.Add(new SubjectDocumentModel { TransactionModel = tempTransaction });
                var tempTransactionId = _routeService.GetRouteByTransactionId(tempTransaction.Id);
                allItems.Add(new SubjectDocumentModel { TransactionModel = tempTransaction });
            }
                return allItems;
        }
    }
}
