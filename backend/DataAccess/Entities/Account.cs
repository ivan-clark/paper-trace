using System;
using System.Collections.Generic;

namespace DataAccess.Entities;

public partial class Account
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public int? UserId { get; set; }
}
