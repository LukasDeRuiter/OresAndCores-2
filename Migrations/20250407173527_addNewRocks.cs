using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class addNewRocks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "EnvironmentObject",
                columns: new[] { "Id", "Items", "Name", "Path" },
                values: new object[,]
                {
                    { 3, "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":3,\"Amount\":2,\"DropChance\":100}]", "tin-rock", "assets/mine/sprites/objects/tin-rock.png" },
                    { 4, "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":4,\"Amount\":2,\"DropChance\":100}]", "iron-rock", "assets/mine/sprites/objects/iron-rock.png" }
                });

            migrationBuilder.UpdateData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 2,
                column: "Value",
                value: 5);

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "Name", "Path", "Value" },
                values: new object[,]
                {
                    { 3, "tin-ore-item", "assets/mine/sprites/items/tin-ore-item.png", 7 },
                    { 4, "iron-ore-item", "assets/mine/sprites/items/iron-ore-item.png", 15 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: 10);

            migrationBuilder.UpdateData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 2,
                column: "Value",
                value: 50);
        }
    }
}
