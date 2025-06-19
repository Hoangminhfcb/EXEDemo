using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;
using BakeMarket.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Infrastructure.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        private readonly BakeMarketDbContext _context;
        public OrderRepository(BakeMarketDbContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<IEnumerable<Order>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Bakery)
                .Include(o => o.Driver)
                .Include(o => o.Items)
                .ThenInclude(oi => oi.Cake)
                .ToListAsync(cancellationToken);
        }

        public override async Task<Order?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Bakery)
                .Include(o => o.Driver)
                .Include(o => o.Items)
                .ThenInclude(oi => oi.Cake)
                .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
        }

        public async Task<IEnumerable<Order>> GetByPhone(string phone)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Bakery)
                .Include(o => o.Driver)
                .Include(o => o.Items)
                .ThenInclude(oi => oi.Cake)
                .Where(o => o.ContactPhone == phone)
                .ToListAsync();
        }
    }
}
