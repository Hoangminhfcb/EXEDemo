using AutoMapper;
using BakeMarket.Application.Exceptions;
using BakeMarket.Application.Interfaces;
using BakeMarket.Domain.Entities;
using BakeMarket.Domain.Interfaces;
using BakeMarket.Shared.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BakeMarket.Application.Services
{
    public class UserService : GenericService<User>, IUserService
    {
        private readonly IGenericRepository<User> _repository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IGenericRepository<User> repository,
                           UserManager<User> userManager,
                           RoleManager<Role> roleManager,
                           IMapper mapper,
                           IJwtService jwtService,
                           IHttpContextAccessor httpContextAccessor)
            : base(repository)
        {
            _repository = repository;
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _jwtService = jwtService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task AddRole(Guid userId, string roleName, CancellationToken cancellationToken = default)
        {
            var user = await _repository.GetByIdAsync(userId, cancellationToken);

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains(roleName))
            {
                throw new ConflictException(new Dictionary<string, string[]>
        {
            { "role", new[] { $"User already has '{roleName}' role" } }
        });
            }

            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                throw new Exception();
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to assign role '{roleName}' to user.");
            }

            await _roleManager.AddClaimAsync(role, new Claim(ClaimTypes.NameIdentifier, userId.ToString()));
        }

        public async Task<CreateUserResponse> CreateUserAsync(CreateUserRequest request, CancellationToken cancellationToken = default)
        {
            var errors = new Dictionary<string, string[]>();

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                errors.Add("email", new[] { "Email already exists" });
                throw new ConflictException(errors);
            }

            var existingPhoneNumber = await _repository.FindOneByConditionAsync(u => u.PhoneNumber == request.PhoneNumber, cancellationToken: cancellationToken);
            if (existingPhoneNumber != null)
            {
                errors.Add("phoneNumber", new[] { "Phone number already exists" });
                throw new ConflictException(errors);
            }

            var user = _mapper.Map<User>(request);
            user.UserName = request.Email;

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                var error = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception($"Failed to create user: {error}");
            }

            var roleExist = await _roleManager.RoleExistsAsync("Customer");
            if (!roleExist)
            {
                var roleResult = await _roleManager.CreateAsync(new Role { Name = "Customer" });
                if (!roleResult.Succeeded)
                {
                    var roleErrors = string.Join(", ", roleResult.Errors.Select(e => e.Description));
                    throw new Exception($"Failed to create role 'Customer': {roleErrors}");
                }
            }

            var addRoleResult = await _userManager.AddToRoleAsync(user, "Customer");
            if (!addRoleResult.Succeeded)
            {
                var addRoleErrors = string.Join(", ", addRoleResult.Errors.Select(e => e.Description));
                throw new Exception($"Failed to assign role 'Customer' to user: {addRoleErrors}");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, "Customer")
            };

            var accessToken = _jwtService.GenerateAccessToken(claims);
            var refreshToken = _jwtService.GenerateRefreshToken(claims);

            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new InvalidOperationException("HttpContext is not available.");
            }

            httpContext.Response.Cookies.Append("accessToken", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(15),

            });

            httpContext.Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7),

            });

            return new CreateUserResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Email = user.Email,
                UserId = user.Id,
                FullName = user.FullName
            };
        }

        public async Task<UpdateUserResponse> UpdateUserAsync(UpdateUserRequest request, CancellationToken cancellationToken = default)
        {
            var updateUser = await _repository.GetByIdAsync(request.Id, cancellationToken);

            if (updateUser == null) 
            {
                throw new KeyNotFoundException("User not found");
            }

            _mapper.Map(request, updateUser);
            await _repository.UpdateAsync(updateUser, cancellationToken);

            return _mapper.Map<UpdateUserResponse>(updateUser);
        }
    }
}