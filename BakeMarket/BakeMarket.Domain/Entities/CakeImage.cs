using System.Text.Json.Serialization;

namespace BakeMarket.Domain.Entities
{
    public class CakeImage
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public Guid? CakeId { get; set; }
        [JsonIgnore]
        public Cake? Cake { get; set; }
    }
}