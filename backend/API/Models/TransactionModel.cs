using DataAccess.Entities;

namespace API.Models
{
    public class TransactionModel
    {
        public int Id { get; set; }
        public bool Restricted { get; set; }
        public Document? Document { get; set; }
        public Status? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
