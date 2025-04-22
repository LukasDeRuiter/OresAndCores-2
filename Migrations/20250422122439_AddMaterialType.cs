using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class AddMaterialType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Layer",
                table: "EnvironmentObject",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MaterialType",
                table: "EnvironmentObject",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "RequiredLevel",
                table: "EnvironmentObject",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Layer", "MaterialType", "RequiredLevel" },
                values: new object[] { 2, "stone", 1 });

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Layer", "MaterialType", "RequiredLevel" },
                values: new object[] { 2, "stone", 1 });

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Layer", "MaterialType", "RequiredLevel" },
                values: new object[] { 2, "stone", 2 });

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Layer", "MaterialType", "RequiredLevel" },
                values: new object[] { 2, "stone", 3 });

            migrationBuilder.InsertData(
                table: "EnvironmentObject",
                columns: new[] { "Id", "Health", "Items", "Layer", "MaterialType", "Name", "Path", "RequiredLevel" },
                values: new object[,]
                {
                    { 5, 10, "[{\"ItemId\":1,\"Amount\":5,\"DropChance\":100}]", 3, "stone", "rock-block", "assets/mine/sprites/objects/rock-block.png", 5 },
                    { 6, 3, "[{\"ItemId\":6,\"Amount\":2,\"DropChance\":100}]", 1, "wood", "log-stump", "assets/mine/sprites/objects/log-stump.png", 1 }
                });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "Name", "Path", "Value" },
                values: new object[] { 6, "wood-item", "assets/mine/sprites/items/wood-item.png", 3 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DropColumn(
                name: "Layer",
                table: "EnvironmentObject");

            migrationBuilder.DropColumn(
                name: "MaterialType",
                table: "EnvironmentObject");

            migrationBuilder.DropColumn(
                name: "RequiredLevel",
                table: "EnvironmentObject");
        }
    }
}
