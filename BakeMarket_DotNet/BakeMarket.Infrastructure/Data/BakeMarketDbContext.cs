using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BakeMarket.Domain.Entities;

namespace BakeMarket.Infrastructure.Data
{
    public class BakeMarketDbContext : IdentityDbContext<User, Role, Guid>
    {
        public BakeMarketDbContext(DbContextOptions<BakeMarketDbContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<Bakery> Bakeries { get; set; }
        public DbSet<Cake> Cakes { get; set; }
        public DbSet<CakeImage> CakeImages { get; set; }
        public DbSet<BakeryImage> BakeryImages { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BakeryReview> BakeryReviews { get; set; }
        public DbSet<CakeReview> CakeReviews { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<OrderTracking> OrderTrackings { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ===== USER RELATIONSHIPS =====

            // User -> CustomerOrders (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.CustomerOrders)
                .WithOne(o => o.Customer)
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            // User -> DeliveryOrders (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.DeliveryOrders)
                .WithOne(o => o.Driver)
                .HasForeignKey(o => o.DriverId)
                .OnDelete(DeleteBehavior.SetNull);

            // User -> Bakery (One-to-One)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Bakery)
                .WithOne(b => b.Owner)
                .HasForeignKey<Bakery>(b => b.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            // User -> BakeryReviews (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.BakeryReviews)
                .WithOne(br => br.User)
                .HasForeignKey(br => br.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // User -> CakeReviews (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.CakeReviews)
                .WithOne(cr => cr.User)
                .HasForeignKey(cr => cr.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // User -> SocialMedia (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.SocialMedia)
                .WithOne(sm => sm.User)
                .HasForeignKey(sm => sm.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // User -> Notifications (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Notifications)
                .WithOne(n => n.User)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ===== BAKERY RELATIONSHIPS =====

            // Bakery -> Orders (One-to-Many)
            modelBuilder.Entity<Bakery>()
                .HasMany(b => b.Orders)
                .WithOne(o => o.Bakery)
                .HasForeignKey(o => o.BakeryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Bakery -> Cakes (One-to-Many)
            modelBuilder.Entity<Bakery>()
                .HasMany(b => b.Cakes)
                .WithOne(c => c.Bakery)
                .HasForeignKey(c => c.BakeryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Bakery -> Images (One-to-Many)
            modelBuilder.Entity<Bakery>()
                .HasMany(b => b.Images)
                .WithOne(bi => bi.Bakery)
                .HasForeignKey(bi => bi.BakeryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Bakery -> Reviews (One-to-Many)
            modelBuilder.Entity<Bakery>()
                .HasMany(b => b.BakeryReviews)
                .WithOne(br => br.Bakery)
                .HasForeignKey(br => br.BakeryId)
                .OnDelete(DeleteBehavior.Cascade);

            // ===== CAKE RELATIONSHIPS =====

            // Cake -> Images (One-to-Many)
            modelBuilder.Entity<Cake>()
                .HasMany(c => c.Images)
                .WithOne(ci => ci.Cake)
                .HasForeignKey(ci => ci.CakeId)
                .OnDelete(DeleteBehavior.Cascade);

            // Cake -> Reviews (One-to-Many)
            modelBuilder.Entity<Cake>()
                .HasMany(c => c.CakeReviews)
                .WithOne(cr => cr.Cake)
                .HasForeignKey(cr => cr.CakeId)
                .OnDelete(DeleteBehavior.Cascade);

            // Cake -> OrderItems (One-to-Many)
            modelBuilder.Entity<Cake>()
                .HasMany(c => c.OrderItems)
                .WithOne(oi => oi.Cake)
                .HasForeignKey(oi => oi.CakeId)
                .OnDelete(DeleteBehavior.Restrict);

            // Category -> Cakes (One-to-Many)
            modelBuilder.Entity<Category>()
                .HasMany(cat => cat.Cakes)
                .WithOne(c => c.Category)
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            // ===== ORDER RELATIONSHIPS =====

            // Order -> OrderItems (One-to-Many)
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Items)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order -> OrderTracking (One-to-Many)
            modelBuilder.Entity<Order>()
                .HasMany(o => o.TrackingHistory)
                .WithOne(ot => ot.Order)
                .HasForeignKey(ot => ot.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order -> Payment (One-to-One)
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Order -> BakeryReviews (One-to-Many) - Optional reference
            modelBuilder.Entity<Order>()
                .HasMany<BakeryReview>()
                .WithOne(br => br.Order)
                .HasForeignKey(br => br.OrderId)
                .OnDelete(DeleteBehavior.SetNull);

            // Order -> CakeReviews (One-to-Many) - Optional reference
            modelBuilder.Entity<Order>()
                .HasMany<CakeReview>()
                .WithOne(cr => cr.Order)
                .HasForeignKey(cr => cr.OrderId)
                .OnDelete(DeleteBehavior.SetNull);

            // ===== DECIMAL PRECISION CONFIGURATION =====

            // Cake Price
            modelBuilder.Entity<Cake>()
                .Property(c => c.Price)
                .HasColumnType("decimal(18,2)");

            // OrderItem UnitPrice
            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.UnitPrice)
                .HasColumnType("decimal(18,2)");

            // Order money fields
            modelBuilder.Entity<Order>()
                .Property(o => o.DeliveryFee)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Order>()
                .Property(o => o.TaxAmount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Order>()
                .Property(o => o.DiscountPercent)
                .HasColumnType("decimal(5,2)");

            // Payment Amount
            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

            // ===== UNIQUE CONSTRAINTS =====

            // Ensure one bakery per owner
            modelBuilder.Entity<Bakery>()
                .HasIndex(b => b.OwnerId)
                .IsUnique();

            // Ensure unique social media platform per user
            modelBuilder.Entity<SocialMedia>()
                .HasIndex(sm => new { sm.UserId, sm.Platform })
                .IsUnique();

            // Ensure unique review per user per bakery
            modelBuilder.Entity<BakeryReview>()
                .HasIndex(br => new { br.UserId, br.BakeryId })
                .IsUnique();

            // Ensure unique review per user per cake
            modelBuilder.Entity<CakeReview>()
                .HasIndex(cr => new { cr.UserId, cr.CakeId })
                .IsUnique();

            // ===== INDEXES FOR PERFORMANCE =====

            // Common query indexes
            modelBuilder.Entity<Order>()
                .HasIndex(o => o.OrderDate);

            modelBuilder.Entity<Order>()
                .HasIndex(o => o.Status);

            modelBuilder.Entity<Bakery>()
                .HasIndex(b => b.IsActive);

            modelBuilder.Entity<Bakery>()
                .HasIndex(b => b.IsVerified);

            modelBuilder.Entity<Cake>()
                .HasIndex(c => c.IsAvailable);

            modelBuilder.Entity<Cake>()
                .HasIndex(c => c.CategoryId);

            modelBuilder.Entity<BakeryReview>()
                .HasIndex(br => br.Rating);

            modelBuilder.Entity<CakeReview>()
                .HasIndex(cr => cr.Rating);

            modelBuilder.Entity<UserNotification>()
                .HasIndex(n => new { n.UserId, n.IsRead });

            // ===== QUERY FILTERS FOR SOFT DELETE =====

            // Global query filter for soft delete
            modelBuilder.Entity<Bakery>()
                .HasQueryFilter(b => !b.IsDeleted);

            modelBuilder.Entity<Cake>()
                .HasQueryFilter(c => !c.IsDeleted);

            modelBuilder.Entity<Category>()
                .HasQueryFilter(cat => !cat.IsDeleted);

            modelBuilder.Entity<BakeryImage>()
                .HasQueryFilter(bi => !bi.IsDeleted);

            modelBuilder.Entity<CakeImage>()
                .HasQueryFilter(ci => !ci.IsDeleted);

            modelBuilder.Entity<Order>()
                .HasQueryFilter(o => !o.IsDeleted);

            modelBuilder.Entity<OrderItem>()
                .HasQueryFilter(oi => !oi.IsDeleted);

            modelBuilder.Entity<BakeryReview>()
                .HasQueryFilter(br => !br.IsDeleted);

            modelBuilder.Entity<CakeReview>()
                .HasQueryFilter(cr => !cr.IsDeleted);

            modelBuilder.Entity<Payment>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<OrderTracking>()
                .HasQueryFilter(ot => !ot.IsDeleted);

            modelBuilder.Entity<SocialMedia>()
                .HasQueryFilter(sm => !sm.IsDeleted);

            modelBuilder.Entity<UserNotification>()
                .HasQueryFilter(n => !n.IsDeleted);

            // ===== SEED DATA (Optional) =====

            /*// Seed default categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = Guid.NewGuid(), Name = "Birthday Cakes", Description = "Cakes for birthday celebrations", CreatedAt = DateTime.UtcNow },
                new Category { Id = Guid.NewGuid(), Name = "Wedding Cakes", Description = "Elegant cakes for weddings", CreatedAt = DateTime.UtcNow },
                new Category { Id = Guid.NewGuid(), Name = "Cupcakes", Description = "Individual portion cakes", CreatedAt = DateTime.UtcNow },
                new Category { Id = Guid.NewGuid(), Name = "Cheesecakes", Description = "Creamy cheese-based cakes", CreatedAt = DateTime.UtcNow },
                new Category { Id = Guid.NewGuid(), Name = "Custom Cakes", Description = "Personalized cake designs", CreatedAt = DateTime.UtcNow }
            );

            // Seed default roles
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = Guid.NewGuid(), Name = "Customer", NormalizedName = "CUSTOMER", Description = "Regular customer role" },
                new Role { Id = Guid.NewGuid(), Name = "BakeryOwner", NormalizedName = "BAKERYOWNER", Description = "Bakery owner role" },
                new Role { Id = Guid.NewGuid(), Name = "DeliveryDriver", NormalizedName = "DELIVERYDRIVER", Description = "Delivery driver role" },
                new Role { Id = Guid.NewGuid(), Name = "Admin", NormalizedName = "ADMIN", Description = "System administrator role" }
            );*/
        }

        // Override SaveChanges to handle audit fields
        public override int SaveChanges()
        {
            UpdateAuditFields();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateAuditFields();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateAuditFields()
        {
            var entries = ChangeTracker.Entries<BaseEntity>();

            foreach (var entry in entries)
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedAt = DateTime.UtcNow;
                        // Set CreatedBy if you have current user context
                        break;

                    case EntityState.Modified:
                        entry.Entity.UpdatedAt = DateTime.UtcNow;
                        // Set UpdatedBy if you have current user context
                        break;
                }
            }
        }
    }
}