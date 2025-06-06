using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class SignInResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string[] Roles { get; set; }
    }
}
