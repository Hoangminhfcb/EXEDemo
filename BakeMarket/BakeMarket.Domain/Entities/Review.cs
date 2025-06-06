using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Domain.Entities
{
    public class Review
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
