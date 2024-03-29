﻿using DataAccess.Entities;

namespace API.Models
{
    public class DepartmentModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public User? HeadId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
