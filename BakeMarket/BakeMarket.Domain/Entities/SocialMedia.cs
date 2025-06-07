using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class SocialMedia : BaseEntity
    {
        [Required, MaxLength(50)]
        public string Platform { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string Url { get; set; } = string.Empty;

        [Required]
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
