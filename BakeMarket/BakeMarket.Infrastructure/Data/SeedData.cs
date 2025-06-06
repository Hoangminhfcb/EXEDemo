using BakeMarket.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

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
                var dbContext = scope.ServiceProvider.GetRequiredService<BakeMarketDbContext>();
                var logger = scope.ServiceProvider.GetRequiredService<ILogger<SeedDataMarker>>();

                // Seed roles
                await SeedRolesAsync(roleManager, logger);

                // Seed admin user
                await SeedAdminUserAsync(userManager, logger);

                var bakeryOwners = await SeedBakeryOwnersAsync(userManager, logger);
                await SeedBakeriesAsync(dbContext, bakeryOwners, logger);
                await SeedCategoriesAsync(dbContext, logger);

                await SeedProductsAsync(dbContext, logger);
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

        private static async Task SeedCategoriesAsync(BakeMarketDbContext dbContext, ILogger logger)
        {
            if (!dbContext.Categories.Any())
            {
                var categories = new[]
                {
            new Category { Name = "Bánh sinh nhật" },
            new Category { Name = "Bánh cưới" },
            new Category { Name = "Bánh kem" },
        };

                dbContext.Categories.AddRange(categories);
                await dbContext.SaveChangesAsync();
                logger.LogInformation("Categories seeded.");
            }
            else
            {
                logger.LogInformation("Categories already exist.");
            }
        }
        private static async Task<List<User>> SeedBakeryOwnersAsync(UserManager<User> userManager, ILogger logger)
        {
            var owners = new List<(string Email, string FullName, string phoneNumber)>
    {
        ("bakery1@gmail.com", "Banana Bakery", "0987654321"),
        ("bakery2@gmail.com", "Nopro Bakery", "0981234756")
    };

            var createdOwners = new List<User>();

            foreach (var (email, fullName, phoneNumber) in owners)
            {
                var existingUser = await userManager.FindByEmailAsync(email);
                if (existingUser == null)
                {
                    var user = new User
                    {
                        UserName = email,
                        Email = email,
                        PhoneNumber = phoneNumber,
                        FirstName = fullName.Split(' ')[0],
                        LastName = string.Join(" ", fullName.Split(' ').Skip(1)),
                        EmailConfirmed = true,
                        PhoneNumberConfirmed = true
                    };

                    var result = await userManager.CreateAsync(user, "Password@123");
                    if (result.Succeeded)
                    {
                        user = await userManager.FindByEmailAsync(email);
                        await userManager.AddToRoleAsync(user, "BakeryOwner");
                        createdOwners.Add(user);
                        logger.LogInformation($"Created and assigned role 'BakeryOwner' to user {email}");
                    }
                    else
                    {
                        logger.LogError($"Failed to create bakery owner {email}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }
                }
                else
                {
                    logger.LogInformation($"Bakery owner {email} already exists.");
                    createdOwners.Add(existingUser);
                }
            }

            return createdOwners;
        }
        private static async Task SeedBakeriesAsync(BakeMarketDbContext dbContext, List<User> owners, ILogger logger)
        {
            if (!dbContext.Bakeries.Any())
            {
                var bakeries = new List<Bakery>
        {
            new Bakery { Name = "Tiệm Bánh Ngọt Banana", Address = "123 Đường Tran Phu, Da Nang", OwnerId = owners[0].Id, PhoneNumber = owners[0].PhoneNumber },
            new Bakery { Name = "Tiệm Bánh Nonstop", Address = "456 Đường Dien Bien Phu, Da Nang", OwnerId = owners[1].Id, PhoneNumber = owners[1].PhoneNumber }
        };

                dbContext.Bakeries.AddRange(bakeries);
                await dbContext.SaveChangesAsync();
                logger.LogInformation("Seeded bakeries with assigned owners.");
            }
            else
            {
                logger.LogInformation("Bakeries already exist.");
            }
        }

        private static async Task SeedProductsAsync(BakeMarketDbContext dbContext, ILogger logger)
        {
            if (dbContext.Cakes.Any())
            {
                logger.LogInformation("Products already exist.");
                return;
            }

            var bakeries = dbContext.Bakeries.ToList();
            var categories = dbContext.Categories.ToList();

            if (!categories.Any())
            {
                logger.LogWarning("No categories found. Cannot seed products.");
                return;
            }

            // Danh sách sản phẩm có tên, ảnh, category
            var productData = new Dictionary<string, List<(string Name, string ImageUrl, string CategoryName)>>
            {
                ["Tiệm Bánh Ngọt Banana"] = new List<(string, string, string)>
        {
            ("Thalia", "BakeMarket/Cakes/7d6c7ca5-086c-43a9-8840-bbb5a8e7aedc_thalia.jpg", "Bánh sinh nhật"),
            ("Gato Ganache", "BakeMarket/Cakes/7fd08f81-a823-4874-bd97-9f2efadc1bdb_Gato Ganache.jpg", "Bánh sinh nhật"),
        },
                ["Tiệm Bánh Nonstop"] = new List<(string, string, string)>
        {
            ("Polyhymnia", "BakeMarket/Cakes/08e70f8d-0b1f-44b7-97ba-990aa0fc78d0_Polyhymnia.jpg", "Bánh cưới"),
            ("Rose Macaron", "BakeMarket/Cakes/926ff427-9385-4b48-8440-311ffb701844_Rose Macaron.jpg", "Bánh cưới"),
            ("Pinky", "BakeMarket/Cakes/d2957591-859b-45f7-81c1-36aac5c4ec67_pinky.png", "Bánh cưới"),
        }
            };

            foreach (var bakery in bakeries)
            {
                if (!productData.TryGetValue(bakery.Name, out var productList))
                {
                    logger.LogWarning($"No products found for bakery {bakery.Name}.");
                    continue;
                }

                foreach (var (productName, imageUrl, categoryName) in productList)
                {
                    var category = categories.FirstOrDefault(c => c.Name == categoryName);
                    if (category == null)
                    {
                        logger.LogWarning($"Category '{categoryName}' not found.");
                        continue;
                    }

                    var product = new Cake
                    {
                        Name = productName,
                        Price = 20000,
                        BakeryId = bakery.Id,
                        CategoryId = category.Id,
                        ThumbnailUrl = imageUrl,
                        Description = $"This is a delicious {productName} cake from {bakery.Name}.",
                    };

                    dbContext.Cakes.Add(product);
                }
            }

            await dbContext.SaveChangesAsync();
            logger.LogInformation("Seeded images and products successfully.");
        }

    }
}