using BakeMarket.Domain.Entities;
using BakeMarket.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Interfaces
{
    public interface ICakeService : IGenericService<Cake>
    {
        Task<IEnumerable<Cake>> GetCakesByBakery(Guid bakeryId, CancellationToken cancellationToken = default);
        Task<Cake> CreateCake(CreateCakeRequest request, CancellationToken cancellationToken = default);
        Task<IEnumerable<CakeDTO>> GetCakesByCategory(Guid categoryId, CancellationToken cancellationToken = default);
        Task<IEnumerable<CakeDTO>> GetCakes(CancellationToken cancellationToken = default);
        Task<CakeDTO> GetById(Guid id, CancellationToken cancellationToken = default);
    }
}
