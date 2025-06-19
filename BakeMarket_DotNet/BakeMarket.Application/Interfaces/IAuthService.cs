using BakeMarket.Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Interfaces
{
    public interface IAuthService
    {
        Task<SignInResponse> SignIn(SignInRequest request);
        Task Logout();
    }
}
