using BakeMarket.Domain.Enums;
namespace BakeMarket.Domain.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; }
        public string DeliveryAddress { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;
        public Guid CustomerId { get; set; }
        public User? Customer { get; set; }
        public Guid BakeryId { get; set; }
        public Bakery? Bakery { get; set; }
        public Guid? DriverId { get; set; }
        public User? Driver { get; set; }
        public ICollection<OrderItem>? Items { get; set; }
        public decimal TotalAmount => Items?.Sum(i => i.Subtotal) ?? 0;
    }
}