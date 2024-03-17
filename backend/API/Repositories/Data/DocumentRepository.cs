using API.Models;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly PapertracedbContext _dbcontext;

        public DocumentRepository(PapertracedbContext dbcontext)
        {
            _dbcontext = dbcontext;
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

        public Document? GetDocumentBySubject(string docSubject)
        {
            return _dbcontext.Documents.FirstOrDefault(u => u.Subject.StartsWith(docSubject));
        }

        public List<Document> GetDocumentsBySubject(string docSubject)
        {
            var result = _dbcontext.Documents.Where(u => u.Subject.StartsWith(docSubject)).ToList();
            return result;
        }
    }
}
