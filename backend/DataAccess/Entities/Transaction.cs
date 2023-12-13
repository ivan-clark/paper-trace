using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Transaction
{
    public int Id { get; set; }

    public int? SenderId { get; set; }

    public int? RecepientId { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }
}
