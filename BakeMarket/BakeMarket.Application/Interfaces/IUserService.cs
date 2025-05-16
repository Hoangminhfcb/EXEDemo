using BakeMarket.Domain.Entities;
using BakeMarket.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Interfaces
{
    public interface IUserService : IGenericService<User>
    {
        Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request, CancellationToken cancellationToken = default);
        Task<UpdateUserResponse> UpdateUserAsync(UpdateUserRequest request, CancellationToken cancellationToken = default);
    }
}
