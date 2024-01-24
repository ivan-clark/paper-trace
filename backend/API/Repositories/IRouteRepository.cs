using API.Models;
using DataAccess.Entities;

namespace API.Repositories
{
    public interface IRouteRepository
    {
        Document? GetDocumentById(int id);
        List<Document> GetDocuments();
        void DeleteDocument(int documentId);
        int CreateDocument(DocumentModel model);
        void UpdateDocument(DocumentModel model);
    }
}
