using DataAccess.Entities;


namespace API.Models
{
    public class SubjectDocumentModel
    {
        public DocumentModel? DocumentModel { get; set; }
        public TransactionModel? TransactionModel { get; set; }
        public List<RouteModel>? RouteModel { get; set; }
    }
}
