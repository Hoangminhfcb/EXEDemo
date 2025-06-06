using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class OrderCreateRequest
    {
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string DeliveryAddress { get; set; }
        public string ContactPhone { get; set; }
        public Guid BakeryId { get; set; }
        public Guid CustomerId { get; set; }
        public List<OrderItemCreateRequest> Items { get; set; } = new();
    }
}
