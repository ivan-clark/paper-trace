using DataAccess.Entities;


namespace API.Models
{
    public class MulitipleComposeModel
    {
        public DocumentModel? DocumentModel { get; set; }
        public TransactionModel? TransactionModel { get; set; }
        public List<RouteModel>? RouteModel { get; set; }
    }
}
