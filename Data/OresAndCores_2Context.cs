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
        public DbSet<OresAndCores_2.Models.LevelConfiguration> LevelConfiguration { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EnvironmentObject>().HasData(
                new EnvironmentObject 
                { 
                    Id = 1,
                    Name = "rock", 
                    Health = 3,
                    Path = "assets/mine/sprites/objects/rock.png",
                    MaterialType = "stone",
                    RequiredLevel = 1,
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 2, DropChance = 100}
                    }),
                },
                new EnvironmentObject 
                { 
                    Id = 2, 
                    Name = "copper-rock",
                    Health = 5,
                    Path = "assets/mine/sprites/objects/copper-rock.png", 
                    MaterialType = "stone", 
                    RequiredLevel = 1,
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 1, DropChance = 100},
                        new ObjectItem {ItemId = 2, Amount = 2, DropChance = 100},
                    }),
                },
                 new EnvironmentObject 
                { 
                    Id = 3, 
                    Name = "tin-rock",
                    Health = 7,
                    Path = "assets/mine/sprites/objects/tin-rock.png", 
                    MaterialType = "stone", 
                    RequiredLevel = 2,
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 1, DropChance = 100},
                        new ObjectItem {ItemId = 3, Amount = 2, DropChance = 100},
                    }),
                },
                 new EnvironmentObject 
                { 
                    Id = 4, 
                    Name = "iron-rock",
                    Health = 10,
                    Path = "assets/mine/sprites/objects/iron-rock.png", 
                    MaterialType = "stone", 
                    RequiredLevel = 3,
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 1, DropChance = 100},
                        new ObjectItem {ItemId = 4, Amount = 2, DropChance = 100},
                    }),
                },
                new EnvironmentObject 
                { 
                    Id = 5, 
                    Name = "rock-block",
                    Health = 10,
                    Path = "assets/mine/sprites/objects/rock-block.png", 
                    MaterialType = "stone", 
                    RequiredLevel = 5,
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 1, Amount = 5, DropChance = 100},
                    }),
                },
                new EnvironmentObject 
                { 
                    Id = 6, 
                    Name = "log-stump",
                    Health = 3,
                    Path = "assets/mine/sprites/objects/log-stump.png", 
                    MaterialType = "wood", 
                    RequiredLevel = 1,
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 6, Amount = 2, DropChance = 100},
                    }),
                }
            );

            modelBuilder.Entity<Enemy>().HasData(
                new Enemy 
                { 
                    Id = 1,
                    Name = "slime", 
                    Sprite = "assets/mine/sprites/enemies/slime.png",
                    Health = 3,
                    Speed = 20,
                    EnemyType = "standard",
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 5, Amount = 5, DropChance = 50}
                    }),
                },
                   new Enemy 
                { 
                    Id = 2,
                    Name = "spider", 
                    Sprite = "assets/mine/sprites/enemies/spider.png",
                    Health = 5,
                    Speed = 30,
                      EnemyType = "crawler",
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 5, Amount = 8, DropChance = 50}
                    }),
                },
                 new Enemy 
                { 
                    Id = 3,
                    Name = "rocker", 
                    Sprite = "assets/mine/sprites/enemies/rocker.png",
                    Health = 4,
                    Speed = 50,
                      EnemyType = "ambush",
                    Items = JsonSerializer.Serialize(new List<ObjectItem>
                    {
                        new ObjectItem {ItemId = 5, Amount = 3, DropChance = 50},
                        new ObjectItem {ItemId = 1, Amount = 3, DropChance = 50}
                    }),
                }
            );

            modelBuilder.Entity<Item>().HasData(
                new Item { Id = 1, Name = "stone-item", Path = "assets/mine/sprites/items/stone-item.png", Value = 2 },
                new Item { Id = 2, Name = "copper-ore-item", Path = "assets/mine/sprites/items/copper-ore-item.png", Value = 5 },
                new Item { Id = 3, Name = "tin-ore-item", Path = "assets/mine/sprites/items/tin-ore-item.png", Value = 7 },
                new Item { Id = 4, Name = "iron-ore-item", Path = "assets/mine/sprites/items/iron-ore-item.png", Value = 15 },
                new Item { Id = 5, Name = "coin-item", Path = "assets/mine/sprites/items/coin-item.png", Value = 1 },
                new Item { Id = 6, Name = "wood-item", Path = "assets/mine/sprites/items/wood-item.png", Value = 3 }
            );

             modelBuilder.Entity<LevelConfiguration>().HasData(
                new LevelConfiguration 
                { 
                    Id = 1,
                    Amount = 10, 
                    Enemies = JsonSerializer.Serialize(new List<EntityPercentage>
                    {
                        new EntityPercentage {EntityId = 1, Percentage = 100}
                    }),
                    EnvironementObjects = JsonSerializer.Serialize(new List<EntityPercentage>
                    {
                        new EntityPercentage {EntityId = 0, Percentage = 80},
                        new EntityPercentage {EntityId = 1, Percentage = 15, Layer = 2},
                        new EntityPercentage {EntityId = 2, Percentage = 5, Layer = 2},
                        new EntityPercentage {EntityId = 5, Percentage = 100, Layer = 3},
                    }),
                },
                 new LevelConfiguration 
                { 
                    Id = 2,
                    Amount = 12, 
                    Enemies = JsonSerializer.Serialize(new List<EntityPercentage>
                    {
                        new EntityPercentage {EntityId = 1, Percentage = 99},
                        new EntityPercentage {EntityId = 3, Percentage = 1}
                    }),
                    EnvironementObjects = JsonSerializer.Serialize(new List<EntityPercentage>
                    {
                        new EntityPercentage {EntityId = 0, Percentage = 75},
                        new EntityPercentage {EntityId = 1, Percentage = 20, Layer = 2},
                        new EntityPercentage {EntityId = 2, Percentage = 2, Layer = 2},
                        new EntityPercentage {EntityId = 3, Percentage = 2, Layer = 2},
                        new EntityPercentage {EntityId = 5, Percentage = 100, Layer = 3},
                    }),
                },
                   new LevelConfiguration 
                { 
                    Id = 3,
                    Amount = 15, 
                    Enemies = JsonSerializer.Serialize(new List<EntityPercentage>
                    {
                        new EntityPercentage {EntityId = 1, Percentage = 78},
                        new EntityPercentage {EntityId = 2, Percentage = 20},
                        new EntityPercentage {EntityId = 3, Percentage = 2}
                    }),
                    EnvironementObjects = JsonSerializer.Serialize(new List<EntityPercentage>
                    {
                        new EntityPercentage {EntityId = 0, Percentage = 75},
                        new EntityPercentage {EntityId = 1, Percentage = 20, Layer = 2},
                        new EntityPercentage {EntityId = 2, Percentage = 2, Layer = 2},
                        new EntityPercentage {EntityId = 3, Percentage = 2, Layer = 2},
                        new EntityPercentage {EntityId = 4, Percentage = 2, Layer = 2},
                        new EntityPercentage {EntityId = 5, Percentage = 100, Layer = 3},
                    }),
                }
            );
        }
    }
}
