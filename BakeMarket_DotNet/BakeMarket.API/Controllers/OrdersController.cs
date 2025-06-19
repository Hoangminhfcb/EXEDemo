using AutoMapper;
using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Enums;
using BakeMarket.Shared.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BakeMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService,
            IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }
        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
        {
            var orders = await _orderService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<OrderDTO>>(orders));
        }
        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(Guid id)
        {
            var order = await _orderService.GetByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<OrderDTO>(order));
        }

        [HttpGet("by-phone/{phone}")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrder(string phone)
        {
            var order = await _orderService.GetByPhoneAsync(phone);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<IEnumerable<OrderDTO>>(order));
        }

        [HttpGet("by-bakery/{id}")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrderBakery(Guid id)
        {
            var order = await _orderService.GetAllAsync();
            var res = order.Where(b => b.BakeryId == id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<IEnumerable<OrderDTO>>(res));
        }
        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder(OrderCreateRequest request)
        {
            var createdOrder = await _orderService.AddAsync(_mapper.Map<Order>(request));
            return Ok(_mapper.Map<OrderDTO>(createdOrder));
        }
        
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] OrderStatus status)
        {
            var order = await _orderService.GetByIdAsync(id);
            order.Status = status;
            var newOrder = await _orderService.UpdateAsync(order);
            return Ok(_mapper.Map<OrderDTO>(newOrder));
        }
    }
}
