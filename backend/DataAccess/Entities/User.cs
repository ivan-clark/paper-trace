using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class User
{
    public int Id { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Email { get; set; }

    public int? DepartmentId { get; set; }

    public int? RoleId { get; set; }

    public DateTime? CreatedDate { get; set; }
}
