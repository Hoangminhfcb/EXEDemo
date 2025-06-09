using BakeMarket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Domain.Interfaces
{
    public interface ICakeRepository : IGenericRepository<Cake>
    {
        Task<IEnumerable<Cake>> GetCakesByCategory(Guid categoryId, CancellationToken cancellationToken = default);
        Task<IEnumerable<Cake>> GetCakesByBakery(Guid bakeryId, CancellationToken cancellationToken = default);
    }
}
