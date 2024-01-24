using API.Models;
using API.Repositories;
using API.Repositories.Data;
using DataAccess.Entities;

namespace API.Services
{
    public class DocumentService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IDepartmentRepository _departmentRepository;

        public DocumentService(IDocumentRepository documentRepository, IDepartmentRepository departmentRepository)
        {
            _documentRepository = documentRepository;
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

    }
}
