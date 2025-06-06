using BakeMarket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class BakeryDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string CoverImageUrl { get; set; }
        public string LogoImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserDTO? Owner { get; set; }
        public ICollection<BakeryImage>? Images { get; set; }
    }
}
