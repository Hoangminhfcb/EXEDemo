using AutoMapper;
using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Shared.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BakeMarket.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BakeriesController : ControllerBase
    {
        private readonly IBakeryService _bakeryService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public BakeriesController(IBakeryService bakeryService,
            IUserService userService,
            IMapper mapper)
        {
            _bakeryService = bakeryService;
            _userService = userService;
            _mapper = mapper;
        }

        //[Authorize(Roles = "Admin")]
        // GET: api/Bakeries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BakeryDTO>>> GetBakeries()
        {
            var bakeries = await _bakeryService.GetAllAsync();

            return Ok(_mapper.Map<IEnumerable<BakeryDTO>>(bakeries));
        }

        //[Authorize(Roles = "BakeryOwner")]
        // GET: api/Bakeries/5
        [HttpGet("MyBakery")]
        public async Task<IActionResult> GetBakery()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var bakery = await _bakeryService.GetByUserIdAsync(Guid.Parse(userId));

            if (bakery == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<BakeryDTO>(bakery));
        }

        // POST: api/Bakeries
        [HttpPost]
        public async Task<IActionResult> CreateBakery([FromBody] CreateBakeryRequest request)
        {
            if (request == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newBakery = await _bakeryService.AddAsync(_mapper.Map<Bakery>(request));
            await _userService.AddRole(request.OwnerId, "BakeryOwner");

            return Ok(_mapper.Map<BakeryDTO>(newBakery));
        }
    }
}
