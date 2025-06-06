using BakeMarket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Interfaces
{
    public interface IBakeryService : IGenericService<Bakery>
    {
        Task<Bakery?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    }
}
