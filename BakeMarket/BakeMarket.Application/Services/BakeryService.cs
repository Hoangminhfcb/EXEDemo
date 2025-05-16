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
    public class BakeryService : GenericService<Bakery>, IBakeryService
    {
        public BakeryService(IGenericRepository<Bakery> repository) : base(repository)
        {
        }
    }
}
