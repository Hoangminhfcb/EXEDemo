using BakeMarket.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class Order : BaseEntity
    {
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;

        [Required, MaxLength(200)]
        public string DeliveryAddress { get; set; } = string.Empty;

        [Required, MaxLength(15)]
        public string ContactPhone { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Notes { get; set; }

        public DateTime? EstimatedDeliveryTime { get; set; }
        public DateTime? ActualDeliveryTime { get; set; }

        [Range(0, double.MaxValue)]
        public decimal DeliveryFee { get; set; } = 0;

        [Range(0, double.MaxValue)]
        public decimal TaxAmount { get; set; } = 0;

        [Range(0, 100)]
        public decimal DiscountPercent { get; set; } = 0;

        // Computed properties
        public decimal SubtotalAmount => Items?.Sum(i => i.Subtotal) ?? 0;
        public decimal DiscountAmount => SubtotalAmount * DiscountPercent / 100;
        public decimal TotalAmount => SubtotalAmount - DiscountAmount + DeliveryFee + TaxAmount;

        [Required]
        public Guid CustomerId { get; set; }
        public User? Customer { get; set; }

        [Required]
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }

        public Guid? DriverId { get; set; }
        public User? Driver { get; set; }

        // Navigation properties
        public ICollection<OrderItem>? Items { get; set; }
        public ICollection<OrderTracking>? TrackingHistory { get; set; }
        public Payment? Payment { get; set; }
    }
}