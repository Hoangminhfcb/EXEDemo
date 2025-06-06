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
        private readonly IJwtService _jwtService;

        public AuthController(IAuthService authService,
            IJwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
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

        [HttpPost("verification-token")]
        public IActionResult VerifyToken()
        {
            if (!Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
            {
                return Ok(new { valid = false });
            }

            // Loại bỏ "Bearer " nếu có
            var token = authorizationHeader.ToString().Replace("Bearer ", "").Trim();

            if (string.IsNullOrEmpty(token))
            {
                return Ok(new { valid = false });
            }

            var isValid = _jwtService.VerifyToken(token);

            return Ok(new { valid = isValid });
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.Logout();
            return Ok(new { message = "Logged out successfully" });
        }
    }
}
