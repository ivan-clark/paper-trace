using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Transaction
{
    public int Id { get; set; }

    public int? DocumentId { get; set; }

    public int? StatusId { get; set; }

    public bool Restricted { get; set; }

    public DateTime? CreatedDate { get; set; }
}
