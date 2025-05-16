using BakeMarket.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Domain.Entities
{
    public class Cake
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Category? Category { get; set; }
        public decimal Price { get; set; }
        public string ThumbnailUrl { get; set; } = string.Empty;
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }
        public ICollection<CakeImage>? Images { get; set; }
    }
}
