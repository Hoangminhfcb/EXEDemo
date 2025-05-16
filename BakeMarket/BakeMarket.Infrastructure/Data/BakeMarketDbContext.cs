using BakeMarket.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BakeMarket.Infrastructure.Data
{
    public class BakeMarketDbContext : IdentityDbContext<User, Role, Guid>
    {
        public BakeMarketDbContext(DbContextOptions<BakeMarketDbContext> options)
            : base(options)
        {
        }

        public DbSet<Bakery> Bakeries { get; set; }
        public DbSet<Cake> Cakes { get; set; }
        public DbSet<CakeImage> CakeImages { get; set; }
        public DbSet<BakeryImage> BakeryImages { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.CustomerOrders)
                .WithOne(o => o.Customer)
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.DeliveryOrders)
                .WithOne(o => o.Driver)
                .HasForeignKey(o => o.DriverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Bakery)
                .WithOne(b => b.Owner)
                .HasForeignKey<Bakery>(b => b.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Bakery>()
                .HasMany(b => b.Orders)
                .WithOne(o => o.Bakery)
                .HasForeignKey(o => o.BakeryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Bakery>()
                .HasMany(b => b.Cakes)
                .WithOne(c => c.Bakery)
                .HasForeignKey(c => c.BakeryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Bakery>()
                .HasMany(b => b.Images)
                .WithOne(bi => bi.Bakery)
                .HasForeignKey(bi => bi.BakeryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cake>()
                .HasMany(c => c.Images)
                .WithOne(i => i.Cake)
                .HasForeignKey(i => i.CakeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cake>()
                .Property(c => c.Price)
                .HasColumnType("decimal(18,0)");

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Items)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.UnitPrice)
                .HasColumnType("decimal(18,0)");

            base.OnModelCreating(modelBuilder);
        }
    }
}