using BakeMarket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Domain.Interfaces
{
    public interface IBakeryRepository : IGenericRepository<Bakery>
    {
        Task<Bakery?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
        //Task<IEnumerable<Bakery>> GetAllWithCakesAsync(CancellationToken cancellationToken = default);
        //Task<Bakery?> GetWithCakesByIdAsync(Guid id, CancellationToken cancellationToken = default);
        //Task<Bakery?> GetWithOrdersByIdAsync(Guid id, CancellationToken cancellationToken = default);
        //Task<Bakery?> GetWithImagesByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
