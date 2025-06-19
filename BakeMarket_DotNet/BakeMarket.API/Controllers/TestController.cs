using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BakeMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
    

    [HttpGet]
        public IActionResult Get()
        {
            return Ok("Test endpoint is working!");
        }
    }
}