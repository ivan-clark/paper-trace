using DataAccess.Entities;

namespace API.Models
{
    public class TransactionModel
    {
        public int Id { get; set; }

        public User? Sender { get; set; }

        public Department? Recepient { get; set; }

        public string? Subject { get; set; }

        public string? Message { get; set; }

        public Status? Status { get; set; }

        public DateTime? ModifiedDate { get; set; }
    }
}
