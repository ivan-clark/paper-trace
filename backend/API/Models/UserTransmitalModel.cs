using DataAccess.Entities;

namespace API.Models
{
    public class UserTransmitalModel
    {
        public DocumentModel DocumentModel { get; set; }
        public TransactionModel TransactionModel { get; set; }
        public RouteModel RouteModel { get; set; }
    }
}
