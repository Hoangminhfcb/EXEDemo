using BakeMarket.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class CreateUserResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string Email { get; set; }
        public Guid UserId { get; set; }
        public string FullName { get; set; }
    }
}
