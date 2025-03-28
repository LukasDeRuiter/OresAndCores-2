using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OresAndCores_2.Models;

namespace OresAndCores_2.Data
{
    public class OresAndCores_2Context : DbContext
    {
        public OresAndCores_2Context (DbContextOptions<OresAndCores_2Context> options)
            : base(options)
        {
        }

        public DbSet<OresAndCores_2.Models.Ore> Ore { get; set; } = default!;
        public DbSet<OresAndCores_2.Models.Inventory> Inventory { get; set; } = default!;
        public DbSet<OresAndCores_2.Models.EnvironmentObject> EnvironmentObject { get; set; } = default!;
        public DbSet<OresAndCores_2.Models.Item> Item { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EnvironmentObject>().HasData(
                new EnvironmentObject { Id = 1, Name = "rock", Path = "assets/mine/sprites/objects/rock.png", Items = "test" },
                new EnvironmentObject { Id = 2, Name = "copper-rock", Path = "assets/mine/sprites/objects/copper-rock.png", Items = "test" }
            );

            modelBuilder.Entity<Item>().HasData(
                new Item { Id = 1, Name = "stone-item", Path = "assets/mine/sprites/items/stone-item.png", Value = 10 }
            );
        }
    }
}
