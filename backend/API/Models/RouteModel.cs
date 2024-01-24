using DataAccess.Entities;

namespace API.Models
{
    public class RouteModel
    {
        public int Id { get; set; }

        public Transaction? TransactionId { get; set; }

        public Department? RecepientId { get; set; }

        public Status? StatusId { get; set; }

        public DateTime? UpdatedDate { get; set; }

    }
}
