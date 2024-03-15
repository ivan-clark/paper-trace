using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Route
{
    public int Id { get; set; }

    public string? UniId { get; set; }

    public int? TransactionId { get; set; }

    public int? RecepientId { get; set; }

    public int? RecievedBy { get; set; }

    public int? StatusId { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public string? Note { get; set; }
}
