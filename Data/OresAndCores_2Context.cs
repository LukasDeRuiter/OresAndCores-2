using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
        public DbSet<OresAndCores_2.Models.Enemy> Enemy { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EnvironmentObject>().HasData(
                new EnvironmentObject 
                { 
                    Id = 1,
                    Name = "rock", 
                    Path = "assets/mine/sprites/objects/rock.png", 
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 2, DropChance = 100}
                    }),
                },
                new EnvironmentObject 
                { 
                    Id = 2, 
                    Name = "copper-rock",
                    Path = "assets/mine/sprites/objects/copper-rock.png", 
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 1, DropChance = 100},
                        new ObjectItem {ItemId = 2, Amount = 2, DropChance = 100},
                    }),
                }
            );

            modelBuilder.Entity<Enemy>().HasData(
                new Enemy 
                { 
                    Id = 1,
                    Name = "slime", 
                    Sprite = "slime",
                    Health = 3,
                    Speed = 20,
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 1, DropChance = 100},
                        new ObjectItem {ItemId = 2, Amount = 1, DropChance = 100}
                    }),
                }
            );

            modelBuilder.Entity<Item>().HasData(
                new Item { Id = 1, Name = "stone-item", Path = "assets/mine/sprites/items/stone-item.png", Value = 10 },
                new Item { Id = 2, Name = "copper-ore-item", Path = "assets/mine/sprites/items/copper-ore-item.png", Value = 50 }
            );
        }
    }
}
