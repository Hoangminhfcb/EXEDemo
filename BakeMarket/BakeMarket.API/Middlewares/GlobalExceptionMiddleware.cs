using Azure;
using BakeMarket.Application.Exceptions;
using System.Text.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace BakeMarket.API.Middlewares
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            switch (ex)
            {
                case ValidationException validationEx:
                    response.StatusCode = StatusCodes.Status422UnprocessableEntity;
                    var validationError = new
                    {
                        errors = validationEx.Errors
                    };
                    return response.WriteAsync(JsonSerializer.Serialize(validationError));

                case ConflictException conflictEx:
                    response.StatusCode = StatusCodes.Status409Conflict;
                    var conflictError = new
                    {
                        errors = conflictEx.Errors
                    };
                    return response.WriteAsync(JsonSerializer.Serialize(conflictError));

                case ArgumentException:
                    response.StatusCode = StatusCodes.Status400BadRequest;
                    break;

                case KeyNotFoundException:
                    response.StatusCode = StatusCodes.Status404NotFound;
                    break;

                case UnauthorizedAccessException:
                    response.StatusCode = StatusCodes.Status401Unauthorized;
                    break;

                default:
                    response.StatusCode = StatusCodes.Status500InternalServerError;
                    break;
            }

            var errorResponse = new
            {
                message = ex.Message
            };

            return response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        }

    }
}
