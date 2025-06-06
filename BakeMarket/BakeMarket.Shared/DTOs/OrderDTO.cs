using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class OrderDTO
    {
        public Guid Id { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus Status { get; set; }
        public string DeliveryAddress { get; set; }
        public string ContactPhone { get; set; }
        public Guid CustomerId { get; set; }
        public UserDTO? Customer { get; set; }
        public Guid BakeryId { get; set; }
        public BakeryDTO? Bakery { get; set; }
        public Guid? DriverId { get; set; }
        public UserDTO? Driver { get; set; }
        public ICollection<OrderItemDTO>? Items { get; set; }
        public decimal TotalAmount => Items?.Sum(i => i.Subtotal) ?? 0;
    }
}
