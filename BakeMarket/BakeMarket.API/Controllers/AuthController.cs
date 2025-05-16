using BakeMarket.Application.Interfaces;
using BakeMarket.Shared.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BakeMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SignInRequest request)
        {
            var result = await _authService.SignIn(request);
            if (result == null)
            {
                return BadRequest("Somethings went wrong");
            }
            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.Logout();
            return Ok(new { message = "Logged out successfully" });
        }
    }
}
