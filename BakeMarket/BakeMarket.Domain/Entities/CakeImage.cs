namespace BakeMarket.Domain.Entities
{
    public class CakeImage
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public Guid CakeId { get; set; }
        public Cake? Cake { get; set; }
    }
}