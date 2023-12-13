using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Timeline
{
    public int Id { get; set; }

    public int? TransactionId { get; set; }

    public int? StatusId { get; set; }

    public DateTime? CreatedDate { get; set; }
}
