﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OresAndCores_2.Data;

#nullable disable

namespace OresAndCores_2.Migrations
{
    [DbContext(typeof(OresAndCores_2Context))]
    [Migration("20250604214844_TransformUserIdInventory")]
    partial class TransformUserIdInventory
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("OresAndCores_2.Models.Enemy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("EnemyType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Health")
                        .HasColumnType("int");

                    b.Property<string>("Items")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Speed")
                        .HasColumnType("int");

                    b.Property<string>("Sprite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Enemy");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            EnemyType = "standard",
                            Health = 3,
                            Items = "[{\"ItemId\":5,\"Amount\":5,\"DropChance\":50}]",
                            Name = "slime",
                            Speed = 20,
                            Sprite = "assets/mine/sprites/enemies/slime.png"
                        },
                        new
                        {
                            Id = 2,
                            EnemyType = "crawler",
                            Health = 5,
                            Items = "[{\"ItemId\":5,\"Amount\":8,\"DropChance\":50}]",
                            Name = "spider",
                            Speed = 30,
                            Sprite = "assets/mine/sprites/enemies/spider.png"
                        },
                        new
                        {
                            Id = 3,
                            EnemyType = "ambush",
                            Health = 4,
                            Items = "[{\"ItemId\":5,\"Amount\":3,\"DropChance\":50},{\"ItemId\":1,\"Amount\":3,\"DropChance\":50}]",
                            Name = "rocker",
                            Speed = 50,
                            Sprite = "assets/mine/sprites/enemies/rocker.png"
                        });
                });

            modelBuilder.Entity("OresAndCores_2.Models.EnvironmentObject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Health")
                        .HasColumnType("int");

                    b.Property<string>("Items")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaterialType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RequiredLevel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("EnvironmentObject");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Health = 3,
                            Items = "[{\"ItemId\":1,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]",
                            MaterialType = "stone",
                            Name = "rock",
                            Path = "assets/mine/sprites/objects/rock.png",
                            RequiredLevel = 1
                        },
                        new
                        {
                            Id = 2,
                            Health = 5,
                            Items = "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":2,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]",
                            MaterialType = "stone",
                            Name = "copper-rock",
                            Path = "assets/mine/sprites/objects/copper-rock.png",
                            RequiredLevel = 1
                        },
                        new
                        {
                            Id = 3,
                            Health = 7,
                            Items = "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":3,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]",
                            MaterialType = "stone",
                            Name = "tin-rock",
                            Path = "assets/mine/sprites/objects/tin-rock.png",
                            RequiredLevel = 2
                        },
                        new
                        {
                            Id = 4,
                            Health = 10,
                            Items = "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":4,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]",
                            MaterialType = "stone",
                            Name = "iron-rock",
                            Path = "assets/mine/sprites/objects/iron-rock.png",
                            RequiredLevel = 3
                        },
                        new
                        {
                            Id = 5,
                            Health = 10,
                            Items = "[{\"ItemId\":1,\"Amount\":5,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":2},{\"ItemId\":13,\"Amount\":1,\"DropChance\":2},{\"ItemId\":14,\"Amount\":1,\"DropChance\":2},{\"ItemId\":15,\"Amount\":1,\"DropChance\":2}]",
                            MaterialType = "stone",
                            Name = "rock-block",
                            Path = "assets/mine/sprites/objects/rock-block.png",
                            RequiredLevel = 5
                        },
                        new
                        {
                            Id = 6,
                            Health = 3,
                            Items = "[{\"ItemId\":6,\"Amount\":2,\"DropChance\":100}]",
                            MaterialType = "wood",
                            Name = "wood-stump",
                            Path = "assets/mine/sprites/objects/wood-stump.png",
                            RequiredLevel = 1
                        },
                        new
                        {
                            Id = 7,
                            Health = 4,
                            Items = "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":7,\"Amount\":3,\"DropChance\":60},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]",
                            MaterialType = "stone",
                            Name = "coal-rock",
                            Path = "assets/mine/sprites/objects/coal-rock.png",
                            RequiredLevel = 1
                        });
                });

            modelBuilder.Entity("OresAndCores_2.Models.Inventory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PlayerLevel")
                        .HasColumnType("int");

                    b.Property<int>("PlayerMoney")
                        .HasColumnType("int");

                    b.Property<string>("ToolData")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Inventory");
                });

            modelBuilder.Entity("OresAndCores_2.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Item");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "stone-item",
                            Path = "assets/mine/sprites/items/stone-item.png",
                            Value = 2
                        },
                        new
                        {
                            Id = 2,
                            Name = "copper-ore-item",
                            Path = "assets/mine/sprites/items/copper-ore-item.png",
                            Value = 5
                        },
                        new
                        {
                            Id = 3,
                            Name = "tin-ore-item",
                            Path = "assets/mine/sprites/items/tin-ore-item.png",
                            Value = 7
                        },
                        new
                        {
                            Id = 4,
                            Name = "iron-ore-item",
                            Path = "assets/mine/sprites/items/iron-ore-item.png",
                            Value = 15
                        },
                        new
                        {
                            Id = 5,
                            Name = "coin-item",
                            Path = "assets/mine/sprites/items/coin-item.png",
                            Value = 1
                        },
                        new
                        {
                            Id = 6,
                            Name = "wood-item",
                            Path = "assets/mine/sprites/items/wood-item.png",
                            Value = 3
                        },
                        new
                        {
                            Id = 7,
                            Name = "coal-item",
                            Path = "assets/mine/sprites/items/coal-item.png",
                            Value = 7
                        },
                        new
                        {
                            Id = 8,
                            Name = "copper-bar-item",
                            Path = "assets/mine/sprites/items/copper-bar-item.png",
                            Value = 7
                        },
                        new
                        {
                            Id = 9,
                            Name = "bronze-bar-item",
                            Path = "assets/mine/sprites/items/bronze-bar-item.png",
                            Value = 7
                        },
                        new
                        {
                            Id = 10,
                            Name = "iron-bar-item",
                            Path = "assets/mine/sprites/items/iron-bar-item.png",
                            Value = 7
                        },
                        new
                        {
                            Id = 11,
                            Name = "steel-bar-item",
                            Path = "assets/mine/sprites/items/steel-bar-item.png",
                            Value = 7
                        },
                        new
                        {
                            Id = 12,
                            Name = "sapphire-item",
                            Path = "assets/mine/sprites/items/sapphire-item.png",
                            Value = 30
                        },
                        new
                        {
                            Id = 13,
                            Name = "emerald-bar-item",
                            Path = "assets/mine/sprites/items/emerald-item.png",
                            Value = 40
                        },
                        new
                        {
                            Id = 14,
                            Name = "ruby-bar-item",
                            Path = "assets/mine/sprites/items/ruby-item.png",
                            Value = 50
                        },
                        new
                        {
                            Id = 15,
                            Name = "diamond-bar-item",
                            Path = "assets/mine/sprites/items/diamond-item.png",
                            Value = 60
                        });
                });

            modelBuilder.Entity("OresAndCores_2.Models.LevelConfiguration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("Enemies")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EnvironementObjects")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LevelConfiguration");

                    b.HasData(
                        new
                        {
                            Id = 100,
                            Amount = 15,
                            Enemies = "[{\"Id\":0,\"EntityId\":1,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":20,\"Layer\":0}]",
                            EnvironementObjects = "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]"
                        },
                        new
                        {
                            Id = 1,
                            Amount = 10,
                            Enemies = "[{\"Id\":0,\"EntityId\":1,\"Percentage\":100,\"Layer\":0}]",
                            EnvironementObjects = "[{\"Id\":0,\"EntityId\":0,\"Percentage\":80,\"Layer\":0},{\"Id\":0,\"EntityId\":6,\"Percentage\":1,\"Layer\":1},{\"Id\":0,\"EntityId\":1,\"Percentage\":15,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":5,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":5,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]"
                        },
                        new
                        {
                            Id = 2,
                            Amount = 12,
                            Enemies = "[{\"Id\":0,\"EntityId\":1,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":20,\"Layer\":0}]",
                            EnvironementObjects = "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":6,\"Percentage\":5,\"Layer\":1},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]"
                        },
                        new
                        {
                            Id = 3,
                            Amount = 15,
                            Enemies = "[{\"Id\":0,\"EntityId\":1,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":2,\"Percentage\":40,\"Layer\":0},{\"Id\":0,\"EntityId\":3,\"Percentage\":20,\"Layer\":0}]",
                            EnvironementObjects = "[{\"Id\":0,\"EntityId\":0,\"Percentage\":75,\"Layer\":0},{\"Id\":0,\"EntityId\":1,\"Percentage\":20,\"Layer\":2},{\"Id\":0,\"EntityId\":2,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":3,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":4,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":7,\"Percentage\":2,\"Layer\":2},{\"Id\":0,\"EntityId\":5,\"Percentage\":100,\"Layer\":3}]"
                        });
                });

            modelBuilder.Entity("OresAndCores_2.Models.Ore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Value")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("Ore");
                });
#pragma warning restore 612, 618
        }
    }
}
