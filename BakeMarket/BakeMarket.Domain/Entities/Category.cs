using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class Category : BaseEntity
    {
        [Required, MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Description { get; set; }

        [MaxLength(255)]
        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation properties
        public ICollection<Cake>? Cakes { get; set; }
    }
}
