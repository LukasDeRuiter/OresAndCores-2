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
    [Migration("20250413120200_LevelConfigurations")]
    partial class LevelConfigurations
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
                            Health = 3,
                            Items = "[{\"ItemId\":5,\"Amount\":5,\"DropChance\":50}]",
                            Name = "slime",
                            Speed = 20,
                            Sprite = "assets/mine/sprites/enemies/slime.png"
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

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EnvironmentObject");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Health = 3,
                            Items = "[{\"ItemId\":1,\"Amount\":2,\"DropChance\":100}]",
                            Name = "rock",
                            Path = "assets/mine/sprites/objects/rock.png"
                        },
                        new
                        {
                            Id = 2,
                            Health = 5,
                            Items = "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":2,\"Amount\":2,\"DropChance\":100}]",
                            Name = "copper-rock",
                            Path = "assets/mine/sprites/objects/copper-rock.png"
                        },
                        new
                        {
                            Id = 3,
                            Health = 7,
                            Items = "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":3,\"Amount\":2,\"DropChance\":100}]",
                            Name = "tin-rock",
                            Path = "assets/mine/sprites/objects/tin-rock.png"
                        },
                        new
                        {
                            Id = 4,
                            Health = 10,
                            Items = "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":4,\"Amount\":2,\"DropChance\":100}]",
                            Name = "iron-rock",
                            Path = "assets/mine/sprites/objects/iron-rock.png"
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

                    b.Property<int>("UserId")
                        .HasColumnType("int");

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
