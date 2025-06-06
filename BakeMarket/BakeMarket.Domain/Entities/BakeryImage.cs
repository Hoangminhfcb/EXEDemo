namespace BakeMarket.Domain.Entities
{
    public class BakeryImage
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }
    }
}