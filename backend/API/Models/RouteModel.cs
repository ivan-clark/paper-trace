using DataAccess.Entities;

namespace API.Models
{
    public class RouteModel
    {
        public int Id { get; set; }

        public TransactionModel? Transaction { get; set; }

        public string? UniId { get; set; }

        public Department? RecepientId { get; set; }

        public Status? StatusId { get; set; }

        public User? RecievedBy { get; set; }

        public bool? Read { get; set; }

        public bool? Visible { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public string? Note { get; set; }

    }
}
