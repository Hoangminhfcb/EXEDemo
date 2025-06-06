using System.Text.Json.Serialization;

namespace BakeMarket.Domain.Entities
{
    public class Bakery
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string CoverImageUrl { get; set; }
        public string LogoImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid OwnerId { get; set; }
        public User? Owner { get; set; }
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<Cake>? Cakes { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<BakeryImage>? Images { get; set; }
    }
}