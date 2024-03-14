﻿using DataAccess.Entities;

namespace API.Models
{
    public class StatusModel
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }
    }
}
