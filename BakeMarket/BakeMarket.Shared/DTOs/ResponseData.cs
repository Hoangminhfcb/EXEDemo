using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Shared.DTOs
{
    public class ResponseData<T>
    {
        public T? Data { get; set; }
        public string? Message { get; set; }
        public int Status { get; set; }
    }
}
