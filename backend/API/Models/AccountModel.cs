using DataAccess.Entities;

namespace API.Models
{
    public class AccountModel
    {
        public int Id { get; set; }

        public string? Username { get; set; }

        public string? Password { get; set; }

        public User? User { get; set; }
    }
}
