using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class CakeImage : BaseEntity
    {
        [Required, MaxLength(255)]
        public string ImageUrl { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Caption { get; set; }

        public int DisplayOrder { get; set; } = 0;

        [Required]
        public Guid CakeId { get; set; }
        public Cake? Cake { get; set; }
    }
}