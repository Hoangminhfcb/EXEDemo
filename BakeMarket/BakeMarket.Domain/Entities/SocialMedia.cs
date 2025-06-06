using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Domain.Entities
{
    public class SocialMedia
    {
        public Guid Id { get; set; }
        public string Platform { get; set; }
        public string Url { get; set; }
        public User? User { get; set; }
    }
}
