using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class Bakery : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Address { get; set; } = string.Empty;

        [Required, MaxLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(255)]
        public string CoverImageUrl { get; set; } = string.Empty;

        [MaxLength(255)]
        public string LogoImageUrl { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        public bool IsVerified { get; set; } = false;

        public int TotalProduct => Cakes?.Count ?? 0;
        public int TotalOrder => Orders?.Count ?? 0;

        // Business hours
        [MaxLength(500)]
        public string BusinessHours { get; set; } = string.Empty; // JSON format

        // Ratings computed
        public double AverageRating => BakeryReviews?.Any() == true
            ? BakeryReviews.Average(r => r.Rating) : 0;
        public int TotalReviews => BakeryReviews?.Count ?? 0;

        [Required]
        public Guid OwnerId { get; set; }
        public User? Owner { get; set; }

        // Navigation properties
        public ICollection<BakeryReview>? BakeryReviews { get; set; }
        public ICollection<Cake>? Cakes { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<BakeryImage>? Images { get; set; }
    }
}