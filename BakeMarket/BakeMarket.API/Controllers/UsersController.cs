using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeMarket.Domain.Entities;
using BakeMarket.Infrastructure.Data;
using BakeMarket.Application.Interfaces;
using BakeMarket.Shared.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AutoMapper;

namespace BakeMarket.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService,
            IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetAllAsync();  
            
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("by-phone/{phone}")]
        public async Task<ActionResult<User>> GetUserByPhone(string phone)
        {
            var user = await _userService.FindByConditionAsync(u => u.PhoneNumber == phone);

            if (!user.Any())
            {
                return NotFound();
            }

            return user.FirstOrDefault();
        }

        // GET: api/Users/me
        [HttpGet("me")]
        public async Task<ActionResult<AboutMe>> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }
            var user = await _userService.GetByIdAsync(Guid.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }
            return _mapper.Map<AboutMe>(user);
        }

        // POST: api/Users
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newUser = await _userService.CreateUserAsync(request);

            return Ok(newUser);
        }

        // PUT: api/Users
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedUser = await _userService.UpdateUserAsync(request);

            return Ok(updatedUser);
        }
    }
}
