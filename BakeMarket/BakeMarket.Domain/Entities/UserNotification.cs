using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class UserNotification : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        public string Message { get; set; } = string.Empty;

        public bool IsRead { get; set; } = false;
        public DateTime? ReadAt { get; set; }

        [MaxLength(50)]
        public string? NotificationType { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
