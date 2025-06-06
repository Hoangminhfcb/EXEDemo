using BakeMarket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Interfaces
{
    public interface IOrderService : IGenericService<Order>
    {
        Task<IEnumerable<Order>> GetByPhoneAsync(string phone, CancellationToken cancellationToken = default);
    }
}
