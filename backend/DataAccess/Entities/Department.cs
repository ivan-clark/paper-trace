using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Department
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public int? HeadId { get; set; }

    public DateTime? CreatedDate { get; set; }
}
