using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Shared.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BakeMarket.API.Controllers
{
    [Authorize(Roles = "BakeryOwner")]
    [Route("api/[controller]")]
    [ApiController]
    public class BakeriesController : ControllerBase
    {
        private readonly IBakeryService _bakeryService;

        public BakeriesController(IBakeryService bakeryService)
        {
            _bakeryService = bakeryService;
        }

        // GET: api/Bakeries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetBakeries()
        {
            var bakeries = await _bakeryService.GetAllAsync();

            return Ok(bakeries);
        }

        // GET: api/Bakeries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bakery>> GetBakery(Guid id)
        {
            var bakery = await _bakeryService.GetByIdAsync(id);

            if (bakery == null)
            {
                return NotFound();
            }

            return bakery;
        }

        // POST: api/Bakeries
        //[HttpPost]
        //public async Task<IActionResult> CreateBakery([FromBody] CreateBakeryRequest request)
        //{
        //    if (request == null || !ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var newUser = await _userService.CreateUserAsync(request);

        //    return Ok(newUser);
        //}

        //// PUT: api/Bakeries
        //[HttpPut]
        //public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request)
        //{
        //    if (request == null || !ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var updatedUser = await _userService.UpdateUserAsync(request);

        //    return Ok(updatedUser);
        //}
    }
}
