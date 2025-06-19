using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BakeMarket.Application.Exceptions
{
    public class ConflictException : Exception
    {
        public IDictionary<string, string[]> Errors { get; }
        public ConflictException(IDictionary<string, string[]> errors)
            : base("Conflict")
        {
            Errors = errors;
        }
    }
}
