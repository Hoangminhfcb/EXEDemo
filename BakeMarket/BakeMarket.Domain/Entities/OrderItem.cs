namespace BakeMarket.Domain.Entities
{
    public class OrderItem
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Subtotal => Quantity * UnitPrice;
        public Guid OrderId { get; set; }
        public Order? Order { get; set; }
        public Guid CakeId { get; set; }
        public Cake? Cake { get; set; }
    }
}