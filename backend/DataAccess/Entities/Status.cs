using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Status
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }
}
