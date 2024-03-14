using DataAccess.Entities;

namespace API.Models
{
    public class DocumentModel
    {
        public int Id { get; set; }

        public Department? SenderId { get; set; }

        public string? Subject { get; set; }

        public string? Description { get; set; }

        public sbyte? Urgent { get; set; }
    }
}
