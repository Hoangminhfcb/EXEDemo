using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;
using BakeMarket.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Infrastructure.Repositories
{
    public class CakeRepository : GenericRepository<Cake>, ICakeRepository
    {
        private readonly BakeMarketDbContext _context;
        public CakeRepository(BakeMarketDbContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<IEnumerable<Cake>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Cakes
                .Include(c => c.Category)
                .Include(c => c.Bakery)
                .Include(c => c.Images)
                .ToListAsync(cancellationToken);
        }

        public override async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var cake = await _context.Set<Cake>()
                    .Include(c => c.Images)
                    .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

                if (cake == null) return false;

                _context.Cakes.Remove(cake);
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting cake: {ex.Message}");
            }
        }

        public async Task<IEnumerable<Cake>> GetCakesByCategory(Guid categoryId, CancellationToken cancellationToken = default)
        {
            return await _context.Cakes
                .Include(c => c.Category)
                .Include(c => c.Bakery)
                .Include(c => c.Images)
                .Where(c => c.CategoryId == categoryId).ToListAsync(cancellationToken);
        }

        public override async Task<Cake?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Cakes
                .Include(c => c.Category)
                .Include(c => c.Bakery)
                .Include(c => c.Images)
                .Include(c => c.CakeReviews)
                .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
        }

        public async Task<IEnumerable<Cake>> GetCakesByBakery(Guid bakeryId, CancellationToken cancellationToken = default)
        {
            return await _context.Cakes
                .Include(c => c.Category)
                .Include(c => c.Bakery)
                .Include(c => c.Images)
                .Include(c => c.CakeReviews)
                .Where(c => c.BakeryId == bakeryId).ToListAsync(cancellationToken);
        }
    }
}
