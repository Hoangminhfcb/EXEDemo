using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;
using BakeMarket.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace BakeMarket.Infrastructure.Repositories
{
    public class BakeryRepository : GenericRepository<Bakery>, IBakeryRepository
    {
        private readonly BakeMarketDbContext context;
        public BakeryRepository(BakeMarketDbContext context) : base(context)
        {
            this.context = context;
        }

        public override async Task<IEnumerable<Bakery>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await context.Bakeries
                .Include(u => u.Owner)
                .Include(c => c.Cakes)
                .Include(b => b.Images)
                .Include(o => o.Orders)
                .Include(r => r.BakeryReviews)
                .ToListAsync(cancellationToken);
        }

        public async Task<Bakery?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            return await context.Bakeries
                .Include(u => u.Owner)
                .Include(c => c.Cakes)
                .Include(b => b.Images)
                .Include(o => o.Orders)
                .Include(r => r.BakeryReviews)
                .FirstOrDefaultAsync(b => b.OwnerId == userId, cancellationToken);
        }

        public override async Task<Bakery?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await context.Bakeries
                .Include(u => u.Owner)
                .Include(c => c.Cakes)
                .Include(b => b.Images)
                .Include(o => o.Orders)
                .Include(r => r.BakeryReviews)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }
    }
}
