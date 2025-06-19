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

                //await SeedProductsAsync(dbContext, logger);
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
            string[] roleNames = { "Admin", "BakeryOwner", "Customer", "DeliveryDriver" };

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
            new Category { Name = "Bánh Sinh Nhật" },
            new Category { Name = "Bánh Cưới" },
            new Category { Name = "Bánh Nhỏ" },
            new Category { Name = "Bánh Theo Mùa" },
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
        ("vangnau@gmail.com", "Vàng Nâu", "0905863700"),
        ("lebordeaux@gmail.com", "Le Bordeaux", "0902135210"),
        ("bloompatisserie@gmail.com", "Bloom Patisserie", "0799334888"),
        ("AnLe@gmail.com", "An Lê", "0795569656"),

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
                        PhoneNumberConfirmed = true,
                        ProfileImageUrl = "BakeMarket/Avatar/cb6282e1-f190-4130-bab8-111f7873060c_download.jpg"
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
            new Bakery { Name = "Vàng Nâu", 
                Address = "83 Lê Hồng Phong, Phước Ninh, Hải Châu, Đà Nẵng", 
                OwnerId = owners[0].Id, 
                BusinessHours = "6h - 19h",
                PhoneNumber = owners[0].PhoneNumber ,
                LogoImageUrl = "BakeMarket/Bakery/88704260-193d-4387-8cf0-5bcd45669cb1_07369b5f-0935-49f3-8795-fdfac19aad0a.png",
                CoverImageUrl = "BakeMarket/Bakery/ffc858c0-47c6-46cd-990b-721dc85e7a97_vn-11134513-7r98o-lua6940bg9w134@resize_ss1242x600!@crop_w1242_h600_cT.jpg",
                Description = "Cuối tháng 8 năm 2017, từ một bếp bánh online nhỏ, Vàng Nâu đã ra đời với tất cả niềm đam mê dành cho bánh trái. Tinh yêu đó đã nuôi dưỡng và luôn là nguồn động lực thôi thúc Vàng Nâu phát triển cho đến ngày hôm nay. Mỗi một chiếc bánh với Vàng Nâu không đơn thuần chỉ để thỏa mãn phần nhìn; mà nó còn phải đánh thức được vị giác của người thưởng thức. Chúng tôi luôn tự hào rằng mỗi chiếc bánh mà Vàng Nâu đem đến đều là những thành phẩm chỉn chu nhất từ ngoại hình thanh lịch cho đến trải nghiệm hương vị tuyệt vời."
            },
            new Bakery { Name = "Le Bordeaux",
                Address = "18 Mỹ Đa Đông 12, Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng",
                OwnerId = owners[1].Id,
                BusinessHours = "7h - 20h",
                PhoneNumber = owners[1].PhoneNumber,
                LogoImageUrl ="BakeMarket/Bakery/35b61bc1-840c-4e7a-8112-dd512052f860_e4cc8c02-05bc-498d-9359-1a143316d1b1.png",
                CoverImageUrl = "BakeMarket/Bakery/b0eba574-117b-42c5-95f6-a69c19bfe747_aeon-bakery.jpg",
                Description = "Một đội ngũ đam mê làm bánh Emi, Adrien và Guillaume, tất cả đều đam mê làm bánh, mang đến thị trường Đà Nẵng các loại bánh mì, bánh ngọt, bánh sandwich và các món ngon Pháp chất lượng cao. Le Bordeaux Bakery – thành lập năm 2014 – là nhà cung cấp bánh mì Pháp bán buôn duy nhất tại thành phố Đà Nẵng, Việt Nam. Trọng tâm của chúng tôi luôn là chất lượng tuyệt vời của sản phẩm và dịch vụ ngay từ những ngày đầu thành lập. "
            },
            new Bakery { Name = "Bloom Patisserie",
                Address = "189 Trần Hưng Đạo, An Hải Bắc, Sơn Trà, Đà Nẵng",
                OwnerId = owners[2].Id,
                BusinessHours = "6h30 - 19h",
                PhoneNumber = owners[2].PhoneNumber,
                LogoImageUrl ="BakeMarket/Bakery/ce432ad4-06c7-4067-8f21-362cc1f97edb_252b56a1-233e-494f-a89e-e4b1e678f5d8.png",
                CoverImageUrl = "BakeMarket/Bakery/beed95dc-6fe9-4a92-b8d5-67cf8b3ddea7_open-a-bakery-header.jpg",
                Description = "Taste The Experience - Bừng Vị Trải Nghiệm"
            },
            new Bakery { Name = "An Lê",
                Address = "37 Trần Quốc Toản, Đà Nẵng",
                OwnerId = owners[3].Id,
                BusinessHours = "6h - 19h30",
                PhoneNumber = owners[3].PhoneNumber,
                LogoImageUrl ="BakeMarket/Bakery/1fd6c217-04c6-48fe-bd35-5c2c435e08fc_e12c738b-565c-4f26-a68b-5bb87abf2d8b.png",
                CoverImageUrl = "BakeMarket/Bakery/417e9991-1a14-4946-b16e-0632cc99b225_photo1jpg.jpg",
                Description = "Chuyên sản xuất và bán bánh các loại"
            }
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
                        Price = 500000,
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