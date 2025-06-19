using BakeMarket.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class OrderTracking : BaseEntity
    {
        public OrderStatus Status { get; set; }

        [MaxLength(200)]
        public string? Notes { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [Required]
        public Guid OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
