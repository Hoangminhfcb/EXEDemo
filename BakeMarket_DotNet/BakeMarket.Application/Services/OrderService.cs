using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Services
{
    public class OrderService : GenericService<Order>, IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IGenericRepository<Order> repository, IOrderRepository orderRepository) : base(repository)
        {
            _orderRepository = orderRepository;
        }

        public override Task<IEnumerable<Order>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return _orderRepository.GetAllAsync(cancellationToken);
        }

        public Task<IEnumerable<Order>> GetByPhoneAsync(string phone, CancellationToken cancellationToken = default)
        {
            return _orderRepository.GetByPhone(phone);
        }

        public override Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return _orderRepository.GetByIdAsync(id, cancellationToken);
        }
    }
}
