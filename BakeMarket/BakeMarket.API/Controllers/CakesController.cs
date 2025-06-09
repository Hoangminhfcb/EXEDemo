using AutoMapper;
using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Shared.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BakeMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CakesController : ControllerBase
    {
        private readonly ICakeService _cakeService;
        private readonly IMapper _mapper;
        public CakesController(ICakeService cakeService,
            IMapper mapper)
        {
            _cakeService = cakeService;
            _mapper = mapper;
        }
        // GET: api/Cakes
        [HttpGet("Bakery/{id}")]
        public async Task<ActionResult<IEnumerable<Cake>>> GetCakesByBakery(Guid id)
        {
            var cakes = await _cakeService.GetCakesByBakery(id);
            return Ok(_mapper.Map<IEnumerable<CakeDTO>>(cakes));
        }

        // GET: api/Cakes/Category/{id}
        [HttpGet("Category/{id}")]
        public async Task<ActionResult<IEnumerable<Cake>>> GetCakesByCategory(Guid id)
        {
            var cakes = await _cakeService.GetCakesByCategory(id);
            return Ok(cakes);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CakeDTO>>> GetCakes()
        {
            var cakes = await _cakeService.GetCakes();
            return Ok(cakes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CakeDTO>> GetCake(Guid id)
        {
            var cakes = await _cakeService.GetById(id);
            return Ok(cakes);
        }

        // POST api/<CakesController>
        [HttpPost]
        public async Task<ActionResult<CakeDTO>> CreateCake([FromBody] CreateCakeRequest request)
        {
            if (request == null)
            {
                return BadRequest("Cake cannot be null");
            }
            var createdCake = await _cakeService.CreateCake(request);
            return _mapper.Map<CakeDTO>(createdCake);
        }


        // DELETE api/<CakesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var result = _cakeService.DeleteAsync(id);
            if (result.Result)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
