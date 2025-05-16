using BakeMarket.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BakeMarket.Infrastructure.Data
{
    // Create a non-static class to use for logging purposes
    public class SeedDataMarker { }

    public static class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            try
            {
                // Get required services from DI container
                using var scope = serviceProvider.CreateScope();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<SeedDataMarker>>();

                // Seed roles
                await SeedRolesAsync(roleManager, logger);

                // Seed admin user
                await SeedAdminUserAsync(userManager, logger);
            }
            catch (Exception ex)
            {
                // Handle exception when seeding data
                var logger = serviceProvider.GetService<ILogger<SeedDataMarker>>();
                logger?.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        private static async Task SeedRolesAsync(RoleManager<Role> roleManager, ILogger logger)
        {
            // List of roles to initialize
            string[] roleNames = { "Admin", "BakeryOwner", "Customer" };

            // Check and create each role
            foreach (var roleName in roleNames)
            {
                var roleExists = await roleManager.RoleExistsAsync(roleName);
                if (!roleExists)
                {
                    logger.LogInformation($"Creating new role: {roleName}");
                    var role = new Role { Name = roleName };
                    var result = await roleManager.CreateAsync(role);

                    if (!result.Succeeded)
                    {
                        var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                        logger.LogError($"Failed to create role '{roleName}': {errors}");
                        throw new InvalidOperationException($"Failed to create role '{roleName}': {errors}");
                    }
                    else
                    {
                        logger.LogInformation($"Role {roleName} created successfully.");
                    }
                }
            }
        }

        private static async Task SeedAdminUserAsync(UserManager<User> userManager, ILogger logger)
        {
            const string adminEmail = "hoangminhfcb@gmail.com";
            const string adminPassword = "Password@123";

            // Check if admin account already exists
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                logger.LogInformation($"Creating new admin account: {adminEmail}");

                // Create new admin user
                var admin = new User
                {
                    FirstName = "Hoang Le",
                    LastName = "Nhat Minh",
                    UserName = adminEmail,
                    Email = adminEmail,
                    PhoneNumber = "0889968520",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    ProfileImageUrl = string.Empty
                };

                var result = await userManager.CreateAsync(admin, adminPassword);
                if (!result.Succeeded)
                {
                    var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                    logger.LogError($"Failed to create admin account: {errors}");
                    throw new InvalidOperationException($"Failed to create admin account: {errors}");
                }

                // Assign roles to admin
                string[] adminRoles = { "Admin", "Customer" };
                foreach (var role in adminRoles)
                {
                    var roleResult = await userManager.AddToRoleAsync(admin, role);
                    if (!roleResult.Succeeded)
                    {
                        var errors = string.Join(", ", roleResult.Errors.Select(e => e.Description));
                        logger.LogError($"Failed to assign role '{role}' to admin: {errors}");
                    }
                }

                logger.LogInformation("Admin account created and configured successfully.");
            }
            else
            {
                logger.LogInformation("Admin account already exists, skipping creation.");
            }
        }
    }
}