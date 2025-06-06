using AutoMapper;
using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;
using BakeMarket.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Services
{
    public class CakeService : GenericService<Cake>, ICakeService
    {
        private readonly ICakeRepository _cakeRepository;
        private readonly IMapper _mapper;
        public CakeService(IGenericRepository<Cake> repository,
            ICakeRepository cakeRepository,
            IMapper mapper) : base(repository)
        {
            _cakeRepository = cakeRepository;
            _mapper = mapper;
        }

        public Task<Cake> CreateCake(CreateCakeRequest request, CancellationToken cancellationToken = default)
        {
            var Cake = _mapper.Map<Cake>(request);
            return _cakeRepository.AddAsync(Cake, cancellationToken);
        }

        public async Task<IEnumerable<Cake>> GetCakesByBakery(Guid bakeryId, CancellationToken cancellationToken = default)
        {
            return await _cakeRepository.FindByConditionAsync(c => c.BakeryId == bakeryId, cancellationToken);
        }

        public async Task<IEnumerable<CakeDTO>> GetCakesByCategory(Guid categoryId, CancellationToken cancellationToken = default)
        {
            return _mapper.Map<IEnumerable<CakeDTO>>(await _cakeRepository.GetCakesByCategory(categoryId, cancellationToken));
        }

        public override async Task<IEnumerable<Cake>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _cakeRepository.GetAllAsync(cancellationToken);
        }

        public override async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _cakeRepository.DeleteAsync(id, cancellationToken);
        }

        public async Task<IEnumerable<CakeDTO>> GetCakes(CancellationToken cancellationToken = default)
        {
            return _mapper.Map<IEnumerable<CakeDTO>>(await _cakeRepository.GetAllAsync(cancellationToken));
        }

        public async Task<CakeDTO> GetById(Guid id, CancellationToken cancellationToken = default)
        {
            return _mapper.Map<CakeDTO>(await _cakeRepository.GetByIdAsync(id, cancellationToken));
        }
    }
}
