using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class Role : IdentityRole<Guid>
    {
        [MaxLength(200)]
        public string? Description { get; set; }
    }
}
