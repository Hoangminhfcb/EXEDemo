using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class BakeryImage : BaseEntity
    {
        [Required, MaxLength(255)]
        public string ImageUrl { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Caption { get; set; }

        public int DisplayOrder { get; set; } = 0;

        [Required]
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }
    }
}