namespace BakeMarket.Domain.Entities
{
    public class Bakery
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Guid OwnerId { get; set; }
        public User? Owner { get; set; }
        public ICollection<Cake>? Cakes { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<BakeryImage>? Images { get; set; }
    }
}