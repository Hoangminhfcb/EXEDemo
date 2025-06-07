using System;
using System.Collections.Generic;
using System.Linq;
namespace BakeMarket.Domain.Enums
{
    public enum OrderStatus
    {
        Pending = 0,
        Confirmed = 1,
        InProgress = 2,
        Ready = 3,
        OutForDelivery = 4,
        Delivered = 5,
        Cancelled = 6,
        Refunded = 7
    }
}
