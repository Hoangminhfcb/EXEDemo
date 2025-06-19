using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class BakeryImageDTO
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public Guid BakeryId { get; set; }
    }
}
