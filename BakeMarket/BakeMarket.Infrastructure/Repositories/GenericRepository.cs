using BakeMarket.Domain.Interfaces;
using BakeMarket.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly BakeMarketDbContext _context;

        public GenericRepository(BakeMarketDbContext context)
        {
            _context = context;
        }

        public virtual async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
        {
            try
            {
                var entityEntry = await _context.Set<T>().AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return entityEntry.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error adding entity: {ex.Message}");
            }
        }

        public virtual async Task<T> UpdateAsync(T entity, CancellationToken cancellationToken = default)
        {
            try
            {
                _context.Set<T>().Update(entity);
                await _context.SaveChangesAsync(cancellationToken);
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating entity: {ex.Message}");
            }
        }

        public virtual async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            try
            {
                var entity = await _context.Set<T>().FindAsync(new object[] { id }, cancellationToken);
                if (entity == null) return false;

                _context.Attach(entity).State = EntityState.Deleted;
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting entity: {ex.Message}");
            }
        }

        public virtual async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Set<T>().FindAsync(new object[] { id }, cancellationToken);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<T>().AsNoTracking().ToListAsync(cancellationToken);
        }

        public virtual async Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return await _context.Set<T>().AsNoTracking().Where(predicate).ToListAsync(cancellationToken);
        }

        public virtual async Task<T?> FindOneByConditionAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(predicate, cancellationToken);
        }
    }
}
