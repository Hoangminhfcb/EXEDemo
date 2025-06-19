using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;

namespace BakeMarket.Application.Services
{
    public class BakeryService : GenericService<Bakery>, IBakeryService
    {
        private readonly IBakeryRepository _bakeryRepository;
        public BakeryService(IGenericRepository<Bakery> repository, IBakeryRepository bakeryRepository) : base(repository)
        {
            _bakeryRepository = bakeryRepository;
        }

        public override Task<IEnumerable<Bakery>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return _bakeryRepository.GetAllAsync(cancellationToken);
        }

        public async Task<Bakery?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            return await _bakeryRepository.GetByUserIdAsync(userId, cancellationToken);
        }

        public override async Task<Bakery?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _bakeryRepository.GetByIdAsync(id, cancellationToken);
        }
    }
}
