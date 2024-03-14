using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Document
{
    public int Id { get; set; }

    public int? SenderId { get; set; }

    public string? Subject { get; set; }

    public string? Description { get; set; }

    public bool? Doctype { get; set; }

    public DateTime? CreatedDate { get; set; }

    public sbyte? Urgent { get; set; }
}
