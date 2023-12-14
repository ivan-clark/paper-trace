using DataAccess.Entities;

namespace API.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public bool? SendEmail { get; set; }
        public Role? Role { get; set; }
        public Department? Department { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
