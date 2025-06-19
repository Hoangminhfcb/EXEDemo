using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class BakeryReview : BaseEntity
    {
        [Required, MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        [Range(1, 5)]
        public int Rating { get; set; }

        public bool IsVerifiedPurchase { get; set; } = false;

        [Required]
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public User? User { get; set; }

        // Reference to order that allows this review
        public Guid? OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
