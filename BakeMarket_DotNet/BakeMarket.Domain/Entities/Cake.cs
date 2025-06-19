using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class Cake : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [MaxLength(255)]
        public string ThumbnailUrl { get; set; } = string.Empty;

        public bool IsAvailable { get; set; } = true;
        public int StockQuantity { get; set; } = 0;

        // Ratings computed
        public double AverageRating => CakeReviews?.Any() == true
            ? CakeReviews.Average(r => r.Rating) : 0;
        public int TotalReviews => CakeReviews?.Count ?? 0;

        [Required]
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }

        // Navigation properties
        public ICollection<CakeImage>? Images { get; set; }
        public ICollection<CakeReview>? CakeReviews { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
