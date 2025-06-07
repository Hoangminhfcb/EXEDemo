using System.ComponentModel.DataAnnotations;

namespace BakeMarket.Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Range(0, double.MaxValue)]
        public decimal UnitPrice { get; set; }

        [MaxLength(500)]
        public string? SpecialInstructions { get; set; }

        public decimal Subtotal => Quantity * UnitPrice;

        [Required]
        public Guid OrderId { get; set; }
        public Order? Order { get; set; }

        [Required]
        public Guid CakeId { get; set; }
        public Cake? Cake { get; set; }
    }
}