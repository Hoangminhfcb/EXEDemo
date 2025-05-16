using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string Address { get; set; } = string.Empty;
        public string ProfileImageUrl { get; set; } = string.Empty;
        public Bakery? Bakery { get; set; }
        public ICollection<Order>? CustomerOrders { get; set; }
        public ICollection<Order>? DeliveryOrders { get; set; }
    }
}
