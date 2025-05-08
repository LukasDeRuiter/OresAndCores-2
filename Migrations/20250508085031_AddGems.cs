using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OresAndCores_2.Migrations
{
    /// <inheritdoc />
    public partial class AddGems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 1,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 2,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":2,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 3,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":3,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 4,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":4,\"Amount\":2,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 5,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":5,\"DropChance\":100},{\"ItemId\":12,\"Amount\":1,\"DropChance\":2},{\"ItemId\":13,\"Amount\":1,\"DropChance\":2},{\"ItemId\":14,\"Amount\":1,\"DropChance\":2},{\"ItemId\":15,\"Amount\":1,\"DropChance\":2}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 7,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":7,\"Amount\":3,\"DropChance\":60},{\"ItemId\":12,\"Amount\":1,\"DropChance\":1},{\"ItemId\":13,\"Amount\":1,\"DropChance\":1},{\"ItemId\":14,\"Amount\":1,\"DropChance\":1},{\"ItemId\":15,\"Amount\":1,\"DropChance\":1}]");

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "Name", "Path", "Value" },
                values: new object[,]
                {
                    { 12, "sapphire-item", "assets/mine/sprites/items/sapphire-item.png", 30 },
                    { 13, "emerald-bar-item", "assets/mine/sprites/items/emerald-item.png", 40 },
                    { 14, "ruby-bar-item", "assets/mine/sprites/items/ruby-item.png", 50 },
                    { 15, "diamond-bar-item", "assets/mine/sprites/items/diamond-item.png", 60 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 1,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":2,\"DropChance\":100}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 2,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":2,\"Amount\":2,\"DropChance\":100}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 3,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":3,\"Amount\":2,\"DropChance\":100}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 4,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":4,\"Amount\":2,\"DropChance\":100}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 5,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":5,\"DropChance\":100}]");

            migrationBuilder.UpdateData(
                table: "EnvironmentObject",
                keyColumn: "Id",
                keyValue: 7,
                column: "Items",
                value: "[{\"ItemId\":1,\"Amount\":1,\"DropChance\":100},{\"ItemId\":7,\"Amount\":3,\"DropChance\":60}]");
        }
    }
}
