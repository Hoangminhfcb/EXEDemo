using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;
using BakeMarket.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Infrastructure.Repositories
{
    public class BakeryRepository : GenericRepository<Bakery>, IBakeryRepository
    {
        public BakeryRepository(BakeMarketDbContext context) : base(context)
        {
        }
    }
}
