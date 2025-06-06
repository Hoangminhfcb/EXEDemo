using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class CreateCakeRequest
    {
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public Guid? CategoryId { get; set; }
        public decimal Price { get; set; }
        public string ThumbnailUrl { get; set; } = string.Empty;
        public Guid BakeryId { get; set; }
        public ICollection<CakeImageDTO>? Images { get; set; }
    }
}
