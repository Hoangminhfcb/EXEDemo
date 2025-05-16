using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class SignInRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
