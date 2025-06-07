using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        public string FullName => $"{FirstName} {LastName}";

        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(255)]
        public string ProfileImageUrl { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public ICollection<SocialMedia>? SocialMedia { get; set; }
        public Bakery? Bakery { get; set; }
        public ICollection<Order>? CustomerOrders { get; set; }
        public ICollection<Order>? DeliveryOrders { get; set; }
        public ICollection<BakeryReview>? BakeryReviews { get; set; }
        public ICollection<CakeReview>? CakeReviews { get; set; }
        public ICollection<UserNotification>? Notifications { get; set; }
    }
}
