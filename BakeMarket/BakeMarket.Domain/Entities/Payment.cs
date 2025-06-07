using BakeMarket.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class Payment : BaseEntity
    {
        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        public PaymentMethod Method { get; set; }
        public PaymentStatus Status { get; set; }

        [MaxLength(100)]
        public string? TransactionId { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }

        public DateTime? PaidAt { get; set; }

        [Required]
        public Guid OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
